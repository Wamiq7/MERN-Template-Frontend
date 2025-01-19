export default function index() {
  return (
    <div className="bg-gray-50/90 py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Effective Date: August 26, 2024
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Data Collection</h2>
            <p className="mt-2">
              We collect the following types of personal information from our
              users:
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="font-medium">Account Information:</span> Your
                name, email address, and any other information you provide when
                you create an account with us.
              </li>
              <li>
                <span className="font-medium">Usage Information:</span>{" "}
                Information about how you use our website or app, including your
                IP address, browser type, and device information.
              </li>
              <li>
                <span className="font-medium">Location Information:</span> Your
                approximate location based on your IP address or GPS data (if
                you've granted us permission to access your location).
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Data Usage</h2>
            <p className="mt-2">
              We use the personal information we collect for the following
              purposes:
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="font-medium">Account Management:</span> To
                create and maintain your user account, and to provide you with
                the services and features you request.
              </li>
              <li>
                <span className="font-medium">Personalization:</span> To
                personalize your experience on our website or app, such as by
                showing you content or offers that are relevant to your
                interests.
              </li>
              <li>
                <span className="font-medium">Communication:</span> To
                communicate with you about your account, to respond to your
                inquiries, and to send you updates and information about our
                products and services.
              </li>
              <li>
                <span className="font-medium">Improvement:</span> To analyze how
                our website or app is used, and to improve and enhance our
                products and services.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Data Sharing</h2>
            <p className="mt-2">
              We may share your personal information with the following third
              parties:
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="font-medium">Service Providers:</span> We may
                share your information with third-party service providers who
                perform services on our behalf, such as hosting, data analysis,
                and customer support.
              </li>
              <li>
                <span className="font-medium">Affiliates:</span> We may share
                your information with our affiliated companies, who may use it
                for similar purposes as described in this policy.
              </li>
              <li>
                <span className="font-medium">Legal Compliance:</span> We may
                share your information if we believe it is necessary to comply
                with applicable laws, regulations, or legal processes.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Data Security</h2>
            <p className="mt-2">
              We take reasonable measures to protect your personal information
              from unauthorized access, use, or disclosure. This includes using
              encryption, access controls, and other security measures to
              protect your data.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">User Rights</h2>
            <p className="mt-2">
              You have the following rights with respect to your personal
              information:
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="font-medium">Access:</span> You can request
                access to the personal information we hold about you.
              </li>
              <li>
                <span className="font-medium">Correction:</span> You can request
                that we correct any inaccurate or incomplete personal
                information we hold about you.
              </li>
              <li>
                <span className="font-medium">Deletion:</span> You can request
                that we delete your personal information, subject to certain
                exceptions.
              </li>
              <li>
                <span className="font-medium">Opt-Out:</span> You can opt-out of
                certain data processing activities, such as targeted advertising
                or the sale of your personal information.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <p className="mt-2">
              If you have any questions or concerns about our privacy policy,
              please contact us at:
            </p>
            <p className="mt-2">privacy@acme.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
