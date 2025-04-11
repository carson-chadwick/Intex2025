import React from 'react';
import './PrivacyInfo.css';

const PrivacyInfo: React.FC = () => {
  return (
    <div className="privacy-container">
      <h2 className="privacy-title">Privacy Policy</h2>
      <p className="effective-date">
        <strong>Effective Date:</strong> April 1, 2025
      </p>

      <section>
        <p>
          <strong>Welcome to CineNiche!</strong>
        </p>
        <p>
          At CineNiche, your privacy and trust are our top priorities. This
          Privacy Policy explains how we collect, use, disclose, and safeguard
          your personal data in compliance with the General Data Protection
          Regulation (GDPR) and other applicable privacy laws. By using our
          streaming services, you consent to the practices described herein.
        </p>
      </section>

      <section>
        <h3>1. Information We Collect</h3>
        <p>
          We collect the following types of personal information to provide and
          improve our services:
        </p>
        <ul>
          <li>
            <strong>Account Information:</strong> Your name, email address,
            password, payment information, and preferences when you register for
            an account.
          </li>
          <li>
            <strong>Viewing Activity:</strong> Your watch history, content
            ratings, interactions with our platform, and search queries.
          </li>
          <li>
            <strong>Device and Technical Information:</strong> IP address,
            device type, browser type, operating system, unique device
            identifiers, and diagnostic logs.
          </li>
          <li>
            <strong>Location Data:</strong> Approximate location derived from
            your IP address to provide localized content.
          </li>
          <li>
            <strong>Communication Data:</strong> Feedback, customer support
            queries, and email communications.
          </li>
        </ul>
      </section>

      <section>
        <h3>2. Legal Basis for Processing</h3>
        <p>
          Under GDPR, we process your personal data based on one or more of the
          following legal bases:
        </p>
        <ul>
          <li>
            <strong>Consent:</strong> When you give us explicit permission to
            collect or use your data.
          </li>
          <li>
            <strong>Contract:</strong> To fulfill our contractual obligations to
            you as a user of our platform.
          </li>
          <li>
            <strong>Legal Obligation:</strong> To comply with laws and legal
            processes.
          </li>
          <li>
            <strong>Legitimate Interests:</strong> For business purposes such as
            improving our platform, preventing fraud, and marketing, provided
            they are not overridden by your rights.
          </li>
        </ul>
      </section>

      <section>
        <h3>3. How We Use Your Information</h3>
        <p>Your personal data is used to:</p>
        <ul>
          <li>Create and manage your user account</li>
          <li>
            Stream and recommend personalized content based on your preferences
          </li>
          <li>
            Send service updates, support notifications, and marketing messages
          </li>
          <li>Analyze usage trends and performance metrics</li>
          <li>
            Comply with legal obligations and enforce our terms of service
          </li>
        </ul>
      </section>

      <section>
        <h3>4. Sharing Your Information</h3>
        <p>We only share your data in limited circumstances:</p>
        <ul>
          <li>
            <strong>Service Providers:</strong> Trusted vendors who assist us in
            operating our platform under data processing agreements.
          </li>
          <li>
            <strong>Legal Requirements:</strong> Government authorities or other
            entities when required by law or subpoena.
          </li>
          <li>
            <strong>Corporate Transactions:</strong> In connection with a
            merger, acquisition, or sale of company assets.
          </li>
        </ul>
        <p>
          <strong>We do not sell your personal data to third parties.</strong>
        </p>
      </section>

      <section>
        <h3>5. International Data Transfers</h3>
        <p>
          Your personal data may be transferred and processed outside the
          European Economic Area (EEA) where data protection laws may differ. In
          such cases, we ensure appropriate safeguards are in place, such as
          Standard Contractual Clauses approved by the European Commission.
        </p>
      </section>

      <section>
        <h3>6. Cookies and Tracking Technologies</h3>
        <p>
          We use cookies and similar technologies to enhance your browsing
          experience, analyze usage, and deliver personalized ads. You may
          manage your cookie preferences through our cookie consent banner or
          your browser settings.
        </p>
      </section>

      <section>
        <h3>7. Your Rights Under GDPR</h3>
        <ul>
          <li>
            <strong>Right to Access:</strong> Request a copy of your personal
            data.
          </li>
          <li>
            <strong>Right to Rectification:</strong> Correct inaccurate or
            incomplete information.
          </li>
          <li>
            <strong>Right to Erasure:</strong> Request deletion of your data
            under certain conditions.
          </li>
          <li>
            <strong>Right to Restriction:</strong> Request limited processing of
            your data.
          </li>
          <li>
            <strong>Right to Data Portability:</strong> Receive your data in a
            structured, machine-readable format.
          </li>
          <li>
            <strong>Right to Object:</strong> Object to processing based on
            legitimate interests or direct marketing.
          </li>
          <li>
            <strong>Right to Withdraw Consent:</strong> Withdraw your consent at
            any time, without affecting the lawfulness of processing based on
            prior consent.
          </li>
          <li>
            <strong>Right to Lodge a Complaint:</strong> File a complaint with
            your local Data Protection Authority.
          </li>
        </ul>
      </section>

      <section>
        <h3>8. Data Retention</h3>
        <p>
          We retain your personal information only for as long as necessary to
          fulfill the purposes described in this policy, including satisfying
          legal, accounting, or reporting requirements. When no longer required,
          your data will be securely deleted or anonymized.
        </p>
      </section>

      <section>
        <h3>9. Data Security</h3>
        <p>
          We implement appropriate technical and organizational security
          measures to protect your data from unauthorized access, loss, misuse,
          or alteration. While no method is 100% secure, we follow best
          practices including encryption, secure servers, and regular audits.
        </p>
      </section>

      <section>
        <h3>10. Third-Party Links</h3>
        <p>
          Our platform may include links to third-party sites or services. We
          are not responsible for their content or privacy practices. Please
          review their policies before submitting personal data.
        </p>
      </section>

      <section>
        <h3>11. Updates to This Policy</h3>
        <p>
          We may revise this Privacy Policy from time to time. Material changes
          will be communicated via email or our platform. We encourage you to
          review this page periodically. The latest version will always be
          accessible with the effective date at the top.
        </p>
      </section>

      <section>
        <h3>12. Contact Us</h3>
        <p>
          If you have any questions, requests, or concerns regarding this
          Privacy Policy or your data, please contact us:
        </p>
        <p>
          Email:{' '}
          <a href="mailto:cineniche@hotmail.com">cineniche@hotmail.com</a>
          <br />
          Phone: (801) 123-4567
          <br />
          Mail: 1574 S 800 E, Orem, UT 84097
        </p>
      </section>
    </div>
  );
};

export default PrivacyInfo;
