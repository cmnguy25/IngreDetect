import axios from "axios";
import { useState } from "react";
import ContactSuccess from "./ContactSubmit";

export default function Contact() {
  const [submitted, setSubmitted] = useState("false");
  const [statusCode, setStatusCode] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  //check if text is not alpha (contains only alphabets and spaces)
  const isAlpha = (text) => {
    let res = /^[a-zA-Z\s]+$/.test(text);
    return res;
  };

  //check if valid email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //clear the form data after successful submit
  const closeAtSuccess = () => {
    setSubmitted("false");

    if (statusCode === 200) {
      setFormData({
        fullName: "",
        email: "",
        message: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.fullName.trim() ||
      !isAlpha(formData.fullName.trim()) ||
      !isValidEmail(formData.email.trim()) ||
      !formData.message.trim()
    ) {
      setSubmitted("invalid");
      return;
    }

    try {
      const contactURL =
        "https://ingredetect-server.onrender.com/api/send-email";
      const response = await axios.post(contactURL, formData);
      setStatusCode(response.status);
      setSubmitted("true");
    } catch (error) {
      if (error.response.status !== 200) {
        console.log("Error Status Code : ", error.response.status);
        setStatusCode(error.response.status);
        setSubmitted("true");
      }
    }
  };

  return (
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1501959915551-4e8d30928317?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80"
        alt="Food"
        className="w-full  max-h-screen max-sm:h-[800px] object-cover inset-0"
      />

      <div className="absolute top-0 left-0 right-0 bottom-0 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600"></p>
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="fullName"
                className="block text-base font-semibold leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  autoComplete="given-name"
                  value={formData.fullName}
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {submitted === "invalid" &&
                  (!formData.fullName.trim() ||
                    !isAlpha(formData.fullName.trim())) && (
                    <span className="text-xs text-red-500">
                      Please enter a valid name
                    </span>
                  )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-base font-semibold leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  onChange={(e) => handleChange(e)}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={formData.email}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {submitted === "invalid" &&
                  !isValidEmail(formData.email.trim()) && (
                    <span className="text-xs text-red-500">
                      Please enter a valid email
                    </span>
                  )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-base font-semibold leading-6 text-gray-900"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  onChange={(e) => handleChange(e)}
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {submitted === "invalid" && !formData.message.trim() && (
                  <span className="text-xs text-red-500">
                    Please enter a valid message
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Let's Talk
            </button>
          </div>
        </form>
      </div>
      {submitted === "true" && (
        <div className="overlay">
          <div className="popup">
            <ContactSuccess
              formData={formData}
              closeAtSuccess={closeAtSuccess}
              statusCode={statusCode}
            />
          </div>
        </div>
      )}
    </div>
  );
}
