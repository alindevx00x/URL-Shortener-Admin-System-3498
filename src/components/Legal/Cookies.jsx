import React from 'react';
import { motion } from 'framer-motion';

const Cookies = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-lg max-w-none"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
            <p className="text-gray-700 mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Cookies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies for several purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Essential cookies: Required for the website to function properly</li>
              <li>Analytics cookies: Help us understand how visitors interact with our website</li>
              <li>Functional cookies: Enable enhanced functionality and personalization</li>
              <li>Advertising cookies: Used to deliver relevant advertisements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Essential Cookies</h3>
              <p className="text-gray-700 mb-2">
                These cookies are necessary for the website to function and cannot be switched off:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Authentication cookies to remember your login status</li>
                <li>Security cookies to protect against fraud</li>
                <li>Session cookies to maintain your preferences</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
              <p className="text-gray-700 mb-2">
                These cookies help us understand how visitors use our website:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Google Analytics to track website usage</li>
                <li>Performance monitoring cookies</li>
                <li>Error tracking cookies</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Functional Cookies</h3>
              <p className="text-gray-700 mb-2">
                These cookies enable enhanced functionality:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Language preference cookies</li>
                <li>Theme preference cookies</li>
                <li>User interface customization cookies</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
            <p className="text-gray-700 mb-4">
              We may use third-party services that set cookies on your device:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Google Analytics for website analytics</li>
              <li>Social media platforms for sharing functionality</li>
              <li>Content delivery networks for performance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Managing Your Cookie Preferences</h2>
            <p className="text-gray-700 mb-4">
              You can control and manage cookies in several ways:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Browser settings: Most browsers allow you to block or delete cookies</li>
              <li>Opt-out tools: Use industry opt-out tools for advertising cookies</li>
              <li>Privacy settings: Adjust privacy settings on social media platforms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Browser-Specific Instructions</h2>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chrome</h3>
              <p className="text-gray-700 mb-2">
                Settings → Advanced → Privacy and security → Site settings → Cookies
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Firefox</h3>
              <p className="text-gray-700 mb-2">
                Options → Privacy & Security → Cookies and Site Data
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Safari</h3>
              <p className="text-gray-700 mb-2">
                Preferences → Privacy → Cookies and website data
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Edge</h3>
              <p className="text-gray-700 mb-2">
                Settings → Site permissions → Cookies and site data
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Impact of Disabling Cookies</h2>
            <p className="text-gray-700 mb-4">
              Disabling cookies may affect your experience on our website:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>You may need to log in repeatedly</li>
              <li>Some features may not work properly</li>
              <li>Personalization settings may be lost</li>
              <li>Analytics data may be incomplete</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Updates to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this cookie policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
            <p className="text-gray-700">
              If you have any questions about our use of cookies, please contact us at cookies@minilink.at
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Cookies;