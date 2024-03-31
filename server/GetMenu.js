const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const base64 = require("js-base64");
const dotenv = require("dotenv");
const SENDER_EMAIL = process.env.SENDER_EMAIL;

dotenv.config();

const SCOPES = process.env.SCOPES;
const TOKEN_PATH = path.join(process.cwd(), process.env.TOKEN_PATH);
const CREDENTIALS_PATH = path.join(process.cwd(), process.env.CREDENTIALS_PATH);

async function loadSavedCredentialsIfExist() {
  try {
    const token = JSON.parse(process.env.TOKEN_JSON);
    return google.auth.fromJSON(token);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  const content = await fs.promises.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

//get the most recent email message from a specific email address
async function listMessages(auth) {
  const gmail = google.gmail({ version: "v1", auth });

  try {
    const res = await gmail.users.messages.list({
      userId: "me",
      q: `from:${SENDER_EMAIL}`,
      maxResults: 1,
    });

    if (!res.data.messages || res.data.messages.length === 0) {
      return null;
    }

    const messageId = res.data.messages[0].id;
    const mailData = await getMail(messageId, auth);
    return mailData;
  } catch (error) {
    throw error;
  }
}

//read the email and perform some cleanup
async function getMail(msgId, auth) {
  const gmail = google.gmail({ version: "v1", auth });

  return new Promise((resolve, reject) => {
    gmail.users.messages.get(
      {
        userId: "me",
        id: msgId,
      },
      (err, res) => {
        if (err) {
          reject(err);
          return;
        }

        var body = res.data.payload.parts[0].body.data;

        //decoding and cleaning the body
        var textBody = base64.decode(
          body.replace(/-/g, "+").replace(/_/g, "/")
        );
        const lines = textBody.split("\n").map((line) => line.trim());
        var nonEmptyLines = lines.filter((line) => line.length > 0);
        textBody = nonEmptyLines.join("\n");
        resolve(textBody);
      }
    );
  });
}

//returns clean, readable data
async function getCleanMenu() {
  try {
    const authData = await authorize();
    const messageData = await listMessages(authData);
    return messageData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getCleanMenu,
};
