import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

export default function DishHover() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };

  const selectedDish =
    location.state && location.state.dishClicked
      ? location.state.dishClicked
      : null;

  //404 error if not a valid url
  if (!selectedDish) {
    return <ErrorPage />;
  }

  const obviousInformation = () => {
    return (
      <h2 className="my-20  md:mx-20 lg:mx-20 md:my-36 lg:my-36  text-center">
        <pre className="whitespace-normal min-h-full">
          <span className="lg:text-lg max-sm:text-md">
            Sorry, we can't reveal the ancient secrets of this dish. It's so
            incredibly obvious that even the forks and knives know what's in
            this!
          </span>
        </pre>
      </h2>
    );
  };

  const renderInformation = (content) => {
    const paragraphs = content
      .split("\n")
      .map((paragraph, index) => <div key={index}>{paragraph}</div>);

    return (
      <h2 className="mt-6 text-left">
        <pre className="whitespace-normal">
          <span>{paragraphs}</span>
        </pre>
      </h2>
    );
  };

  return (
    <div>
      {selectedDish && (
        <section className="overflow-hidden rounded-lg shadow-2xl md:grid md:grid-cols-3 relative isolate mx-10 mt-24 mb-0 px-10  lg:px-8 ">
          <img
            alt=""
            src={selectedDish[0].imageUrl}
            className="h-32 w-full object-cover md:h-full"
          />

          <div className="p-4  sm:p-6 md:col-span-2 lg:p-8">
            <p className="text-lg text-center font-semibold uppercase tracking-widest ">
              Informational
            </p>

            <div>
              {selectedDish[0].information != null
                ? renderInformation(selectedDish[0].information)
                : obviousInformation()}
            </div>

            <div
              onClick={() => {
                handleClose();
              }}
              className="my-5 flex items-center justify-center gap-x-6"
            >
              <div className="mt-8 inline-block rounded-full border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none  active:bg-indigo-500 lg:mb-8 md:mb-8">
                Close
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
