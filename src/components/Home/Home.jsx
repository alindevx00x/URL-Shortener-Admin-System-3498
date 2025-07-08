import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { linkService } from '../../services/storage';
import toast from 'react-hot-toast';

const {
  FiLink2,
  FiZap,
  FiBarChart3,
  FiShield,
  FiArrowRight,
  FiCheck,
  FiQrCode,
  FiLock,
  FiTrendingUp,
  FiUsers,
  FiGlobe,
  FiSmartphone,
  FiShare2
} = FiIcons;

const Home = () => {
  const { user } = useAuth();
  const [demoUrl, setDemoUrl] = useState('');
  const [demoShortened, setDemoShortened] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDemo = (e) => {
    e.preventDefault();
    if (demoUrl) {
      setIsLoading(true);
      setTimeout(() => {
        const shortCode = Math.random().toString(36).substring(2, 8);
        setDemoShortened(`${window.location.origin}/${shortCode}`);
        setIsLoading(false);
        toast.success('URL shortened successfully!');
      }, 800);
    } else {
      toast.error('Please enter a URL to shorten');
    }
  };

  const features = [
    {
      icon: FiZap,
      title: 'Lightning Fast URL Shortening',
      description: 'Generate short links instantly with our optimized system. Perfect for Spotify URL shortener, Facebook URL shortener, and any link shortening needs.'
    },
    {
      icon: FiBarChart3,
      title: 'Advanced Analytics & Tracking',
      description: 'Track clicks, geographic data, and user engagement with detailed insights. Best analytics for affiliate marketing and campaign tracking.'
    },
    {
      icon: FiShield,
      title: 'Enterprise Security',
      description: 'Your shortened URLs are protected with enterprise-grade security and encryption. Perfect for business link management.'
    },
    {
      icon: FiQrCode,
      title: 'QR Code Generation',
      description: 'Automatically generate QR codes for every shortened link. Great for offline marketing and mobile accessibility.'
    },
    {
      icon: FiLock,
      title: 'Password Protection',
      description: 'Secure your links with password protection for sensitive content. Enhanced security for your shortened URLs.'
    },
    {
      icon: FiShare2,
      title: 'Social Sharing',
      description: 'Share your shortened URLs directly to platforms like Facebook, Twitter, LinkedIn, and Tumblr with just one click.'
    }
  ];

  const stats = [
    { number: '10M+', label: 'Links Shortened' },
    { number: '500K+', label: 'Active Users' },
    { number: '99.9%', label: 'Uptime' },
    { number: '50+', label: 'Countries' }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '100 links per month',
        'Basic analytics',
        'QR code generation',
        'Standard support'
      ]
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'per month',
      features: [
        'Unlimited links',
        'Advanced analytics',
        'Password protection',
        'Custom domains',
        'Priority support',
        'Team collaboration'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$29',
      period: 'per month',
      features: [
        'Everything in Pro',
        'White-label solution',
        'URL shortener API',
        'Single sign-on',
        'Dedicated support',
        'Custom integrations'
      ]
    }
  ];

  const faqs = [
    {
      question: 'How does our URL shortener work?',
      answer: 'Our URL shortener takes your long URL and creates a shorter, more manageable link that redirects to your original URL. Perfect for social media, email campaigns, and tracking clicks.'
    },
    {
      question: 'Can I shorten Spotify links and Facebook URLs?',
      answer: 'Yes! Our service works as a Spotify URL shortener, Facebook URL shortener, and for any other platform. You can shorten Amazon links, dropbox short links, and more.'
    },
    {
      question: 'Is there a URL shortener API available?',
      answer: 'Yes, we offer a comprehensive URL shortener API for Enterprise users to integrate our link shortening service into their applications and workflows.'
    },
    {
      question: 'How can I decode shortened URLs?',
      answer: 'You can decode shortened URLs by using our analytics dashboard to see where your links redirect. This helps with link management and tracking.'
    },
    {
      question: 'What makes this the best short link service for affiliate marketing?',
      answer: 'Our service provides detailed analytics, custom domains, password protection, and advanced tracking - making it the best bio short link solution for affiliate marketing campaigns.'
    },
    {
      question: 'Can I use this as a HubSpot URL shortener alternative?',
      answer: 'Absolutely! Our service offers more features than basic HubSpot URL shortener functionality, including QR codes, password protection, and advanced analytics.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Professional URL Shortener<br />
              <span className="text-primary-600">For Every Platform</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              The best URL shortener for Spotify, Facebook, Amazon, and all your links. Create short, memorable URLs with QR codes, password protection, and powerful analytics. Perfect for affiliate marketing, social media campaigns, and business link management.
            </motion.p>

            {/* Demo Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-md mx-auto mb-8"
            >
              <form onSubmit={handleDemo} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="Paste your Spotify, Facebook, or any URL here..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  <SafeIcon icon={FiLink2} className="h-5 w-5" />
                  <span>{isLoading ? 'Shortening...' : 'Shorten URL'}</span>
                </button>
              </form>
              {demoShortened && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                >
                  <p className="text-sm text-gray-600 mb-2">Your shortened link:</p>
                  <p className="text-primary-600 font-medium">{demoShortened}</p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Go to Dashboard</span>
                  <SafeIcon icon={FiArrowRight} className="h-5 w-5" />
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Start Shortening URLs Free</span>
                  <SafeIcon icon={FiArrowRight} className="h-5 w-5" />
                </Link>
              )}
              {!user && (
                <Link
                  to="/login"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg border border-primary-600 hover:bg-primary-50 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our URL Shortener?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The most powerful URL shortener for Spotify, Facebook, Amazon, and all your link management needs. Perfect for affiliate marketing and business campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-center p-6 rounded-lg bg-white hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                  <SafeIcon icon={feature.icon} className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your URL shortening needs. From personal use to enterprise solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`relative p-8 rounded-lg border-2 ${
                  plan.popular ? 'border-primary-600 shadow-lg' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-primary-600 mb-1">{plan.price}</div>
                  <div className="text-gray-600">{plan.period}</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <SafeIcon icon={FiCheck} className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                {user ? (
                  <Link
                    to="/dashboard"
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors text-center block ${
                      plan.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/register"
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors text-center block ${
                      plan.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our URL shortener service
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Ready to Start Shortening URLs?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-100 mb-8"
          >
            Join thousands of users who trust our URL shortener for their link management needs. Perfect for Spotify, Facebook, Amazon, and all your URLs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {user ? (
              <Link
                to="/dashboard"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Go to Dashboard</span>
                <SafeIcon icon={FiArrowRight} className="h-5 w-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
                >
                  <span>Create Your Account</span>
                  <SafeIcon icon={FiArrowRight} className="h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
                >
                  Sign In
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;