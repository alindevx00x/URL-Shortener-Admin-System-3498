import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiChevronDown, FiChevronUp } = FiIcons;

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How does URL shortening work?',
      answer: 'Our service takes your long URL and creates a shorter, more manageable link that redirects to your original URL. This makes sharing easier and provides tracking capabilities.'
    },
    {
      question: 'Are shortened links permanent?',
      answer: 'Yes, your shortened links are permanent and will continue to work indefinitely. You can also deactivate them at any time from your dashboard.'
    },
    {
      question: 'Can I customize my short links?',
      answer: 'Absolutely! You can create custom short codes for your links, making them more memorable and brand-friendly.'
    },
    {
      question: 'What analytics do you provide?',
      answer: 'We provide detailed analytics including click counts, geographic data, referrer information, device types, and time-based statistics.'
    },
    {
      question: 'How do I generate QR codes?',
      answer: 'QR codes are automatically available for all your shortened links. Simply click the QR code icon in your dashboard to generate and download them.'
    },
    {
      question: 'Can I password protect my links?',
      answer: 'Yes! When creating a link, you can enable password protection to ensure only authorized users can access your content.'
    },
    {
      question: 'Is there an API available?',
      answer: 'Yes, we offer a comprehensive API for Enterprise users to integrate our URL shortening service into their applications.'
    },
    {
      question: 'How secure are my links?',
      answer: 'We use enterprise-grade security measures including HTTPS encryption, password protection options, and regular security audits.'
    },
    {
      question: 'What are the usage limits?',
      answer: 'Free accounts get 100 links per month. Pro accounts have unlimited links, and Enterprise accounts include additional features like API access.'
    },
    {
      question: 'Can I track click locations?',
      answer: 'Yes, our analytics include geographic data showing where your clicks are coming from, including country and city information.'
    },
    {
      question: 'How do I delete a shortened link?',
      answer: 'You can delete any of your links from your dashboard. Once deleted, the link will no longer work and cannot be recovered.'
    },
    {
      question: 'Do you offer team collaboration features?',
      answer: 'Yes, Pro and Enterprise accounts include team collaboration features, allowing multiple users to manage links together.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about Minilink.at
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <SafeIcon 
                  icon={openIndex === index ? FiChevronUp : FiChevronDown} 
                  className="h-5 w-5 text-gray-500" 
                />
              </button>
              
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 pb-4"
                >
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Please chat with our friendly team.
            </p>
            <a
              href="mailto:support@minilink.at"
              className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;