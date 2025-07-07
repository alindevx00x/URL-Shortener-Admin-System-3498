import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { FiShare2, FiTwitter, FiLinkedin, FiCopy, FiX } = FiIcons;

const SocialShare = ({ url, onClose }) => {
  const [customMessage, setCustomMessage] = useState('');

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: FiTwitter,
      color: 'bg-blue-500 hover:bg-blue-600',
      getUrl: (url, message) => {
        const text = message || 'Check out this link!';
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
      }
    },
    {
      name: 'Facebook',
      icon: FiShare2,
      color: 'bg-blue-600 hover:bg-blue-700',
      getUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: 'LinkedIn',
      icon: FiLinkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      getUrl: (url, message) => {
        const summary = message || 'Check out this link!';
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(summary)}`;
      }
    },
    {
      name: 'Tumblr',
      icon: FiShare2,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      getUrl: (url, message) => {
        const caption = message || 'Check out this link!';
        return `https://www.tumblr.com/widgets/share/tool?posttype=link&title=${encodeURIComponent(caption)}&content=${encodeURIComponent(url)}&canonicalUrl=${encodeURIComponent(url)}`;
      }
    }
  ];

  const handleShare = (platform) => {
    const shareUrl = platform.getUrl(url, customMessage);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Share URL</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <SafeIcon icon={FiX} className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Copy URL"
            >
              <SafeIcon icon={FiCopy} className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Message (Optional)
          </label>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={3}
            placeholder="Add a custom message to share with your link..."
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {socialPlatforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => handleShare(platform)}
              className={`flex items-center justify-center space-x-2 px-4 py-3 text-white rounded-lg transition-colors ${platform.color}`}
            >
              <SafeIcon icon={platform.icon} className="h-5 w-5" />
              <span>{platform.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Share your shortened URL across social media platforms to reach a wider audience
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SocialShare;