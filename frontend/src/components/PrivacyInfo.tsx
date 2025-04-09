import React from 'react';
import './PrivacyInfo.css';

const PrivacyInfo: React.FC = () => {
  return (
    <div className="privacy-container">
      <h2 className="privacy-title">Privacy Policy</h2>
      <p className="effective-date"><strong>Effective Date:</strong> [Insert Date]</p>

      <section>
        <p><strong>Welcome to CineNiche!</strong></p>
        <p>Your privacy is important to us. This policy explains how we collect, use, share, and safeguard your data while using our movie streaming services.</p>
      </section>

      <section>
        <h3>1. Information We Collect</h3>
        <ul>
          <li><strong>Personal Information:</strong> Name, email, billing info, etc.</li>
          <li><strong>Usage Data:</strong> Viewing history, preferences, search queries, etc.</li>
          <li><strong>Device Info:</strong> IP address, browser, OS, and identifiers.</li>
          <li><strong>Location Data:</strong> Based on your IP address.</li>
        </ul>
      </section>

      <section>
        <h3>2. How We Use Your Information</h3>
        <ul>
          <li>Personalize your experience</li>
          <li>Manage subscriptions and payments</li>
          <li>Analyze usage to improve services</li>
          <li>Send updates and customer support</li>
          <li>Ensure platform security</li>
        </ul>
      </section>

      <section>
        <h3>3. Sharing Your Information</h3>
        <p>We don’t sell your data. We may share it:</p>
        <ul>
          <li>With trusted service providers</li>
          <li>To comply with legal obligations</li>
          <li>During business transactions</li>
        </ul>
      </section>

      <section>
        <h3>4. Cookies and Tracking</h3>
        <p>We use cookies to remember preferences and analyze behavior. You can adjust browser settings to manage cookies.</p>
      </section>

      <section>
        <h3>5. Your Rights</h3>
        <ul>
          <li>Access or update personal data</li>
          <li>Request deletion</li>
          <li>Opt out of marketing</li>
          <li>Contact us at [Insert Contact Info]</li>
        </ul>
      </section>

      <section>
        <h3>6. Data Security</h3>
        <p>We use strong safeguards to protect data but encourage caution online.</p>
      </section>

      <section>
        <h3>7. Third-Party Links</h3>
        <p>We may link to third-party sites. Their privacy policies apply.</p>
      </section>

      <section>
        <h3>8. Changes to This Policy</h3>
        <p>We may update this policy and will post the new effective date on our website.</p>
      </section>

      <section>
        <h3>9. Contact Us</h3>
        <p>Email: [Insert Email Address]<br />
           Phone: [Insert Phone Number]<br />
           Mail: [Insert Mailing Address]</p>
      </section>

      <section className="disclaimer">
        <p><strong>Note:</strong> In addition to the above, we own all rights to your data. We may collect and sell any and all data including your credit card info, social, and so forth.</p>
      </section>
    </div>
  );
};

export default PrivacyInfo;



// function PrivacyInfo() {

//     return (
//         <>
//             <p>
//             ---

//             ### Privacy Policy

//             **Effective Date:** [Insert Date]

//             **Welcome to [Your Company Name]!**  
//             Your privacy is important to us, and we are committed to protecting your personal information. This policy explains how we collect, use, share, and safeguard your data while using our movie streaming services.

//             ---

//             #### 1. **Information We Collect**
//             We may collect the following types of information:  
//             - **Personal Information:** Name, email address, billing information, and payment details when you create an account or make purchases.  
//             - **Usage Data:** Viewing history, preferences, search queries, and interactions with our platform.  
//             - **Device Information:** IP address, browser type, operating system, and device identifiers.  
//             - **Location Data:** General geographic location based on your IP address.

//             ---

//             #### 2. **How We Use Your Information**
//             We use your information to:  
//             - Provide and personalize your streaming experience.  
//             - Process payments and manage subscriptions.  
//             - Improve our services through analytics.  
//             - Communicate with you about updates, offers, and customer support.  
//             - Ensure security and prevent fraud.

//             ---

//             #### 3. **Sharing Your Information**
//             We do not sell your personal information. However, we may share it:  
//             - With trusted service providers for payment processing, analytics, or customer support.  
//             - If required by law, to comply with legal obligations or protect our rights.  
//             - In connection with business transactions like mergers or acquisitions.

//             ---

//             #### 4. **Cookies and Tracking Technologies**
//             We use cookies and similar technologies to:  
//             - Remember your preferences and enhance your experience.  
//             - Analyze user behavior to improve our services.  
//             You can adjust your browser settings to manage cookies.

//             ---

//             #### 5. **Your Rights**
//             You have the right to:  
//             - Access or update your personal information.  
//             - Request deletion of your data, subject to legal or operational requirements.  
//             - Opt out of receiving promotional communications.  
//             To exercise your rights, contact us at [Insert Contact Info].

//             ---

//             #### 6. **Data Security**
//             We implement robust security measures to protect your personal information. However, no system is 100% secure, so we encourage you to take precautions when using online services.

//             ---

//             #### 7. **Third-Party Links**
//             Our platform may include links to third-party websites or services. We are not responsible for their privacy practices—please review their policies.

//             ---

//             #### 8. **Changes to This Policy**
//             We may update this privacy policy occasionally to reflect changes in our practices or legal requirements. Updates will be posted on our website with the effective date.

//             ---

//             #### 9. **Contact Us**
//             If you have any questions or concerns about this policy, contact us at:  
//             **Email:** [Insert Email Address]  
//             **Phone:** [Insert Phone Number]  
//             **Mail:** [Insert Mailing Address]

//             ---

//             In addition to whatever was said above, we own all the rights to your data. We may collect and sell any and all data
//             including your credit card information, social, and so forth.
//             </p>
//         </>
//     );
// }

// export default PrivacyInfo;