import React from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="relative isolate px-6 pt-20 lg:pt-10 lg:px-8 bg-gray-100 flex justify-center items-center">
      <div className="max-w-3xl p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Privacy Standard Policy</h2>

        <p className="pb-2">
          <strong>Effective Date:</strong> Aug 14, 2023
        </p>

        <p>
          We are pleased to welcome you to
          <span className="font-bold py-4"> IngreDetect</span> ("The App"). This
          Privacy Standard Policy has been developed to transparently
          communicate how we collect, manage, and safeguard data, particularly
          the non-personal information acquired via Google Analytics. By
          engaging with the App, you indicate your acceptance of the terms and
          guidelines outlined in this policy.
        </p>

        <p className="font-bold mt-2">1. Information Collection Purpose</p>
        <p>
          The App integrates Google Analytics, a web analytics service provided
          by Google LLC, to observe and assess user interactions on our
          platform. The following non-personal data is obtained through the
          Google Analytics tracking code:
        </p>
        <ul className="list-disc list-inside">
          <li>
            <span className="font-bold">Page Views:</span> We monitor the
            frequency at which each page within the App is accessed by users.
          </li>
          <li>
            <span className="font-bold">Unique Visitors:</span> We calculate the
            count of distinct devices or users visiting the App. This metric
            aids in understanding the overall reach of our platform.
          </li>
          <li>
            <span className="font-bold">Page Location:</span> The URL of the
            page a user navigates to is recorded for analytical purposes.
          </li>
          <li>
            <span className="font-bold">Page Title:</span> The title of the
            page, as extracted from the HTML document, is logged to assist in
            content analysis.
          </li>
          <span>
            It is essential to emphasize that no sensitive information or
            personally identifiable information (PII) such as names, email
            addresses, physical addresses, or similar data is gathered through
            this process.
          </span>
        </ul>
        <p className="font-bold mt-2">2. Usage of Collected Data</p>
        <p>
          The non-personal information acquired via Google Analytics serves a
          singular purpose: to provide us with insights into user behavior and
          interactions within the App. This data is crucial in facilitating
          informed decisions for enhancing content, refining user experience,
          and optimizing overall performance.
        </p>
        <p className="font-bold mt-2">3. Data Retention</p>
        <p>
          The data gathered via Google Analytics is retained for a specified
          duration of 2 months. Subsequent to this period, the data is
          automatically expunged from our records.
        </p>
        <p className="font-bold mt-2">4. Third-Party Service</p>
        <p>
          The App leverages Google Analytics, a third-party service provided by
          Google LLC, to carry out data collection and analysis. To gain deeper
          insight into the privacy practices of Google Analytics, we strongly
          recommend reviewing their privacy policy
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="text-blue-900"
          >
            <span> here</span>
          </a>
          .
        </p>
        <p className="font-bold mt-2">5. Data Security</p>
        <p>
          Our dedication to preserving your information extends to the data
          acquired through Google Analytics. We implement fitting technical and
          organizational measures to thwart unauthorized access, disclosure,
          alteration, or destruction of this non-personal data.
        </p>
        <p className="font-bold mt-2">6. Data Sharing</p>
        <p>
          We uphold a stringent policy of refraining from sharing the
          non-personal information acquired through Google Analytics with
          external entities. This data remains internal and is solely employed
          to improve our App's performance.
        </p>

        <p className="font-bold mt-2">7. Intent of Data Collection</p>
        <p>
          The purpose of this data collection is exclusively to gain insights
          into the number of visitors utilizing this platform. These insights
          facilicate the decision-making process regarding the continuation of
          this project in the future.
        </p>
        <p className="font-bold mt-2">
          8. Amendments to the Privacy Standard Policy
        </p>
        <p>
          We retain the prerogative to revise or amend this Privacy Standard
          Policy as deemed necessary. Any alterations will be immediately
          effective upon publication within the App. To stay updated on our data
          protection practices, we recommend periodic reviews of this policy.
        </p>

        <p className="font-bold mt-2">9. Contact Information</p>
        <p>
          By engaging with the App, you signal your comprehension of this
          Privacy Standard Policy and your agreement to its provisions. If you
          find the terms unacceptable, we kindly ask you to refrain from using
          the App.
        </p>
        <p>
          Should you require clarifications or wish to voice concerns about this
          Privacy Standard Policy or our data procedures, please don't hesitate
          to reach out to us
          <Link to="/contact" className="text-blue-900">
            <span> here.</span>
          </Link>
        </p>
        <p className="font-bold mt-2">
          Last updated: <span className="mt-2 font-normal">Aug 14, 2023</span>
        </p>
      </div>
    </div>
  );
}
