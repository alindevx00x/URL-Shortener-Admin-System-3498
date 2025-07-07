import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { linkService } from '../../services/storage';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiExternalLink, FiAlertCircle, FiLock, FiEye, FiEyeOff } = FiIcons;

const RedirectHandler = () => {
  const { shortCode } = useParams();
  const [link, setLink] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const foundLink = linkService.getLinkByShortCode(shortCode);
    setLink(foundLink);
    
    if (foundLink && foundLink.isActive) {
      if (foundLink.hasPassword) {
        setShowPasswordForm(true);
      } else {
        handleRedirect(foundLink);
      }
    }
  }, [shortCode]);

  const handleRedirect = (linkData) => {
    setIsRedirecting(true);
    // Record the click
    linkService.recordClick(shortCode);
    
    // Redirect after a short delay
    setTimeout(() => {
      window.location.href = linkData.originalUrl;
    }, 1500);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === link.password) {
      setShowPasswordForm(false);
      handleRedirect(link);
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  if (!link) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full"
        >
          <SafeIcon icon={FiAlertCircle} className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Link Not Found</h1>
          <p className="text-gray-600 mb-6">
            The short link you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/"
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <span>Go to Homepage</span>
          </a>
        </motion.div>
      </div>
    );
  }

  if (!link.isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full"
        >
          <SafeIcon icon={FiAlertCircle} className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Link Deactivated</h1>
          <p className="text-gray-600 mb-6">
            This link has been temporarily deactivated by its owner.
          </p>
          <a
            href="/"
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <span>Go to Homepage</span>
          </a>
        </motion.div>
      </div>
    );
  }

  if (showPasswordForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full"
        >
          <SafeIcon icon={FiLock} className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Password Protected</h1>
          <p className="text-gray-600 mb-6">
            This link is password protected. Please enter the password to continue.
          </p>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                placeholder="Enter password"
                className="w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <SafeIcon icon={FiLock} className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={showPassword ? FiEyeOff : FiEye} />
              </button>
            </div>
            
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            
            <button
              type="submit"
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Continue
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <SafeIcon icon={FiExternalLink} className="h-16 w-16 text-primary-600" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Redirecting...</h1>
          <p className="text-gray-600 mb-4">
            You will be redirected to your destination shortly.
          </p>
          <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p className="font-medium">Destination:</p>
            <p className="truncate">{link.originalUrl}</p>
          </div>
          <div className="mt-6">
            <a
              href={link.originalUrl}
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <span>Click here if not redirected automatically</span>
              <SafeIcon icon={FiExternalLink} className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default RedirectHandler;