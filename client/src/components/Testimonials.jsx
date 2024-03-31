import { Quote } from "lucide-react";
import React from "react";

const reviews = [
  {
    name: "Aleksandra Avramenko",
    imageUrl:
      "https://media.licdn.com/dms/image/D4E03AQGc4flPmjDlFg/profile-displayphoto-shrink_800_800/0/1687821862030?e=2147483647&v=beta&t=K0k19Zvc6tbjf0DKeWgnnO6M0Att3xzYIDz1L8vzRTk",
    linkedinUrl: "https://www.linkedin.com/in/aavram28/",
    classYear: "Colby '26",
    message:
      "This website is literally the best! I like the way every dish is explicitly explained. It's very convenient how the menu is presented: more visualised and structured than the original app with dining menu. I can also save my favourite foods, which is actually cool and new! And it just looks nice, I really appreciate the visual part of the website.",
  },
  {
    name: "Christian Okyere",
    imageUrl:
      "https://media.licdn.com/dms/image/D4E03AQFy4OWsxY4bbw/profile-displayphoto-shrink_800_800/0/1696351724729?e=2147483647&v=beta&t=-sP8_zr6t38pxLj735-82b4kBoO4R7xKVI7zx7mWzYk", 
    linkedinUrl: "https://www.linkedin.com/in/christianokyere07/",
    classYear: "Colby '26",
    message:
      "My favorite feature about this app is its save button at the top right. This feature organizes your favorite meals in a simple and accessible manner. It saves time of having to go through all the options in the menu to ultimately realize that your favorite meal is not on the menu.",
  },
  {
    name: "Yelaman Moldagali",
    imageUrl:
      "https://media.licdn.com/dms/image/D5603AQHJClEkXKmpXg/profile-displayphoto-shrink_800_800/0/1685948584735?e=2147483647&v=beta&t=H52IBSsIbY1PMojehZjSwVIB_q2CDDV0qBBGnWXV35A",
    linkedinUrl: "https://www.linkedin.com/in/yelaman-moldagali/",
    classYear: "Colby '25",
    message:
      "Thanks to this website, I not only learned the ingredients behind my favorite dishes but also gained access to a catalog of carefully written recipes. Thank you for this resource!",
  },
];

export default function Testimonial() {
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen px-4 pt-36 pb-8 max-sm:px-1 lg:px-8">
          <h2 className="text-center font-serif text-4xl max-md:text-base text-gray-700 font-semibold tracking-tight ">
            Reviews
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            {reviews.map((review) => (
              <blockquote
                key={review.name}
                className="rounded-lg bg-gray-100 p-8"
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={review.linkedinUrl}
                  className="flex items-center gap-4"
                >
                  <img
                    alt=""
                    src={review.imageUrl}
                    className="max-md:h-8 max-md:w-8 h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="mt-1 text-xl max-md:text-sm font-medium text-gray-700 hover:text-gray-500">
                      {review.name}

                      <div className="px-2 max-md:text-xs text-sm text-gray-500">
                        {review.classYear}
                      </div>
                    </p>
                  </div>
                </a>
                <p className="line-clamp-2 sm:line-clamp-none mt-4 text-black-500">
                  <div className="flex items-center">
                    <div className="rounded-full bg-transparent p-2 self-start">
                      <Quote
                        strokeWidth={2}
                        fill="lightgray"
                        className="h-6 w-6 max-md:h-4 max-md:w-4 transform scale-x-[-1] scale-y-[-1] self-start"
                      />
                    </div>
                    <p className="mt-4 max-md:mt-3 max-md:text-sm text-gray-500 ">
                      {review.message}
                    </p>
                  </div>
                </p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
