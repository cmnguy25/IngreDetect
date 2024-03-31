# IngreDetect

Ingredetect is a fully responsive web application built using React.js, Express.js, MongoDB, and Node.js by leveraging Gmail API and OpenAI API. Users can get the daily menu served at Dana Dining Hall, Colby College. It offers the added feature of identifying the typical ingredients present in dishes and provides extra details about each dish. The users can also bookmark dishes, ensuring they know exactly what they want and where to find them in the dining hall. No more food FOMO!

## 🆕 Updates

- Food-related events added (Sept. 3, 2023)
- The daily automated menu extraction has been canceled because of the API expense. The code is still available in the GitHub repo (Oct. 13, 2023)

## 📜 Description

React.js and TailwindCSS serve as the frontend libraries, while the backend architecture operates on Express.js with a MongoDB database. All these components operate within a Node.js environment.

The application employs the Gmail API to automatically retrieve the daily menu newsletter. This task is scheduled as a CRON job. Then, it processes the email content, extracting dish information and its corresponding section. Relevant images are retrieved through Google image searches. The OpenAI API is utilized to obtain additional details and ingredients of the dish.

The application employs caching to store saved items and to optimize performance. The cache is refreshed daily. This enhances user experience by eliminating the need for manual deletion of the prior day's saved data before adding new ones.

The integrated contact form features comprehensive validation at both the client-side and server-side. This robust validation ensures proper data formatting and safeguards against malicious input, preventing potential security vulnerabilities. The form also enforces mandatory field completion.

## ☁️ Deployment

I have deployed the MERN app on Render.com.

Here is the link to the
[website](https://ingredetect.me).

## 📐 Architecture

<img width="1165" alt="Architecture" src="https://github.com/BishKhadka/IngreDetect/assets/12107885/01dd4837-fba4-49d5-bf12-0ca91144b8d4">

## 🧰 Languages and Tools

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>
<a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a>
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://brandslogos.com/wp-content/uploads/thumbs/nodejs-logo-vector.svg" alt="nodejs" width="100" height="40"/> </a>
<a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a>
<a href="https://developers.google.com/gmail/api/guides" target="_blank" rel="noreferrer"> <img src="https://seeklogo.com/images/G/google-developers-logo-F8BF3155AC-seeklogo.com.png" alt="Google developers" width="40" height="40"/> </a>
<a href="https://openai.com/blog/openai-api" target="_blank" rel="noreferrer"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/OpenAI_Logo_%282%29.svg/2560px-OpenAI_Logo_%282%29.svg.png" alt="OpenAI api" width="50" height="40"/> </a>
<a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="express" width="120" height="40"/> </a>
<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png" alt="mongodb" width="120" height="40"/> </a>
<a href="https://render.com" target="_blank" rel="noreferrer"> <img src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_477db83f729d63210139ec7cd29c1351/render-render.png" alt="render.com" width="40" height="40"/> </a>

**Front-end**: React.js, Tailwind CSS

**Back-end**: Express.js,

**Database**: MongoDB

**API**: OpenAI API, Gmail API

**Deployment**: Render

**Version Control**: GitHub

## 🛠 Skills

I acquired these skills through this project.

- Full-stack web development skill

- API integration skills

- Version control skills

- Automation skills

## 📱 Responsive Web Design Demo

https://github.com/BishKhadka/IngreDetect/assets/12107885/789d1508-358c-4aff-8596-6801d038c86b

## 🏛️ Other Projects

Check out some of my other projects [here](https://github.com/Khadka-Bishal).

## 🔗 Connect

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/khadka-bishal/)
