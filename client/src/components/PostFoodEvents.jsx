import axios from "axios";
import { useState } from "react";

export default function PostFoodEvent() {
  const [submitted, setSubmitted] = useState("");
  const [statusCode, setStatusCode] = useState(0);
  const [formData, setFormData] = useState({
    eventType: "",
    date: "",
    time: "",
    venue: "",
    note: "",
    link: "",
  });

  //clear the form data after successful submit
  const closeAtSuccess = () => {
    setFormData({
      password: "",
      eventType: "",
      date: "",
      time: "",
      venue: "",
      note: "",
      link: "",
    });
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
      !formData.eventType.trim() ||
      !formData.date.trim() ||
      !formData.time.trim() ||
      !formData.venue.trim()
    ) {
      setSubmitted("invalid");
      return;
    }

    try {
      const eventURL =
        "https://ingredetect-server.onrender.com/admin/post-food-event";
      const response = await axios.post(eventURL, formData);
      setStatusCode(response.status);
      setSubmitted("true");
      alert("Submission Successful");

      //commented for faster input time
      // closeAtSuccess();
    } catch (error) {
      if (error.response.status !== 200) {
        console.log("Error Status Code : ", error.response.status);
        setStatusCode(error.response.status);
        alert("Submission Failed");
      }
    }
  };

  return (
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1481391564276-da6fcacaee31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb2QlMjB0aGVtZXxlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&w=900&q=60"
        alt="Food"
        className="w-full h-[1400px]  object-cover inset-0"
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 px-6 py-32 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Post Food Events
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
                htmlFor="eventType"
                className="block text-base font-semibold leading-6 text-gray-900"
              >
                Secret
              </label>
              <div className="mt-2.5">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {submitted === "invalid" &&
                  (!formData.password.trim() || !formData.password) && (
                    <span className="text-xs text-red-500">
                      Please enter your secret key
                    </span>
                  )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="eventType"
                className="block text-base font-semibold leading-6 text-gray-900"
              >
                Event
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="eventType"
                  id="eventType"
                  value={formData.eventType}
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {submitted === "invalid" &&
                  (!formData.eventType.trim() || !formData.eventType) && (
                    <span className="text-xs text-red-500">
                      Please enter a valid event type
                    </span>
                  )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="date"
                className="block text-base font-semibold leading-6 text-gray-900"
              >
                Date
              </label>
              <div className="mt-2.5">
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {submitted === "invalid" &&
                  (!formData.date.trim() || !formData.date) && (
                    <span className="text-xs text-red-500">
                      Please enter a valid date
                    </span>
                  )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="time"
                className="block text-base font-semibold leading-6 text-gray-900"
              >
                Time
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="time"
                  id="time"
                  value={formData.time}
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {submitted === "invalid" &&
                  (!formData.time.trim() || !formData.time) && (
                    <span className="text-xs text-red-500">
                      Please enter a valid time
                    </span>
                  )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="venue"
                className="block text-base font-semibold leading-6 text-gray-900"
              >
                Venue
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="venue"
                  id="venue"
                  autoComplete="given-name"
                  value={formData.venue}
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {submitted === "invalid" &&
                  (!formData.venue.trim() || !formData.venue) && (
                    <span className="text-xs text-red-500">
                      Please enter a valid venue
                    </span>
                  )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="note"
                className="block text-base font-semibold leading-6 text-gray-900"
              >
                Note
              </label>
              <div className="mt-2.5">
                <textarea
                  onChange={(e) => handleChange(e)}
                  name="note"
                  id="note"
                  rows={3}
                  value={formData.note}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="link"
                className="block text-base font-semibold leading-6 text-gray-900"
              >
                Link
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="link"
                  id="link"
                  autoComplete="given-name"
                  value={formData.link}
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
