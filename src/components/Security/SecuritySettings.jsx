import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';
import TwoFactorAuth from '../Auth/TwoFactorAuth';

const { FiShield, FiLock, FiKey, FiRefreshCw, FiAlertCircle, FiCheck, FiMail, FiSmartphone } = FiIcons;

const SecuritySettings = () => {
  const { user } = useAuth();
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: user?.twoFactorEnabled || false,
    loginNotifications: true,
    newDeviceAlerts: true,
    passwordExpiryDays: 90,
    lastPasswordChange: user?.lastPasswordChange || new Date().toISOString()
  });

  const handleToggleSetting = (setting) => {
    if (setting === 'twoFactorEnabled' && !securitySettings.twoFactorEnabled) {
      setShowTwoFactorModal(true);
      return;
    }
    
    setSecuritySettings({
      ...securitySettings,
      [setting]: !securitySettings[setting]
    });
    
    toast.success(`Setting updated successfully!`);
  };

  const handleTwoFactorSetup = (success) => {
    setShowTwoFactorModal(false);
    if (success) {
      setSecuritySettings({
        ...securitySettings,
        twoFactorEnabled: true
      });
      toast.success('Two-factor authentication enabled successfully!');
    }
  };

  // Calculate days since last password change
  const daysSincePasswordChange = () => {
    const lastChange = new Date(securitySettings.lastPasswordChange);
    const today = new Date();
    const diffTime = Math.abs(today - lastChange);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const passwordStatus = () => {
    const days = daysSincePasswordChange();
    if (days > securitySettings.passwordExpiryDays) {
      return { status: 'expired', message: 'Your password has expired. Please change it immediately.' };
    } else if (days > securitySettings.passwordExpiryDays - 15) {
      return { status: 'warning', message: `Your password will expire in ${securitySettings.passwordExpiryDays - days} days.` };
    }
    return { status: 'good', message: 'Your password is up to date.' };
  };

  const securityScore = () => {
    let score = 0;
    if (securitySettings.twoFactorEnabled) score += 40;
    if (securitySettings.loginNotifications) score += 20;
    if (securitySettings.newDeviceAlerts) score += 20;
    if (passwordStatus().status === 'good') score += 20;
    return score;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Security Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account security and two-factor authentication</p>
      </div>

      {/* Security Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-600">{securityScore()}%</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Security Score</h2>
            <p className="text-gray-600">
              {securityScore() < 60
                ? 'Your account security needs improvement'
                : securityScore() < 80
                ? 'Your account security is good'
                : 'Your account security is excellent'}
            </p>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              securityScore() < 60
                ? 'bg-red-500'
                : securityScore() < 80
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
            style={{ width: `${securityScore()}%` }}
          ></div>
        </div>
      </motion.div>

      {/* Password Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
      >
        <div className="flex items-center space-x-3 mb-6">
          <SafeIcon icon={FiLock} className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Password Security</h2>
        </div>

        <div
          className={`p-4 mb-6 rounded-lg flex items-start space-x-3 ${
            passwordStatus().status === 'expired'
              ? 'bg-red-50 text-red-700'
              : passwordStatus().status === 'warning'
              ? 'bg-yellow-50 text-yellow-700'
              : 'bg-green-50 text-green-700'
          }`}
        >
          <SafeIcon
            icon={
              passwordStatus().status === 'expired'
                ? FiAlertCircle
                : passwordStatus().status === 'warning'
                ? FiRefreshCw
                : FiCheck
            }
            className="h-5 w-5 mt-0.5"
          />
          <div>
            <p className="font-medium">{passwordStatus().message}</p>
            <p className="text-sm mt-1">
              Last changed: {new Date(securitySettings.lastPasswordChange).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => toast.success('Password change feature will be implemented!')}
            className="px-4 py-2 border border-primary-600 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiRefreshCw} className="h-4 w-4" />
            <span>Change Password</span>
          </button>
          <button
            onClick={() => toast.success('Recovery options feature will be implemented!')}
            className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiKey} className="h-4 w-4" />
            <span>Manage Recovery Options</span>
          </button>
        </div>
      </motion.div>

      {/* Two-Factor Authentication */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
      >
        <div className="flex items-center space-x-3 mb-6">
          <SafeIcon icon={FiShield} className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Two-Factor Authentication</h2>
        </div>

        <div className="space-y-4">
          <div
            className={`p-4 rounded-lg border ${
              securitySettings.twoFactorEnabled
                ? 'border-green-200 bg-green-50'
                : 'border-yellow-200 bg-yellow-50'
            }`}
          >
            <div className="flex items-start">
              <div
                className={`p-2 rounded-full ${
                  securitySettings.twoFactorEnabled ? 'bg-green-100' : 'bg-yellow-100'
                } mr-4`}
              >
                <SafeIcon
                  icon={securitySettings.twoFactorEnabled ? FiCheck : FiAlertCircle}
                  className={`h-5 w-5 ${
                    securitySettings.twoFactorEnabled ? 'text-green-600' : 'text-yellow-600'
                  }`}
                />
              </div>
              <div className="flex-1">
                <h3
                  className={`font-medium ${
                    securitySettings.twoFactorEnabled ? 'text-green-700' : 'text-yellow-700'
                  }`}
                >
                  {securitySettings.twoFactorEnabled
                    ? 'Two-factor authentication is enabled'
                    : 'Two-factor authentication is not enabled'}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    securitySettings.twoFactorEnabled ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  {securitySettings.twoFactorEnabled
                    ? 'Your account has an extra layer of security.'
                    : 'Protect your account with an additional security layer.'}
                </p>
              </div>
              <div className="ml-4">
                <button
                  onClick={() => handleToggleSetting('twoFactorEnabled')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    securitySettings.twoFactorEnabled ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      securitySettings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div
              className={`p-4 border rounded-lg ${
                securitySettings.twoFactorEnabled ? 'border-gray-200' : 'border-gray-200 opacity-50'
              } flex items-center space-x-3`}
            >
              <SafeIcon icon={FiMail} className="h-5 w-5 text-primary-600" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Email Authentication</h4>
                <p className="text-sm text-gray-600">Receive verification codes via email</p>
              </div>
            </div>
            
            <div
              className={`p-4 border rounded-lg ${
                securitySettings.twoFactorEnabled ? 'border-gray-200' : 'border-gray-200 opacity-50'
              } flex items-center space-x-3`}
            >
              <SafeIcon icon={FiSmartphone} className="h-5 w-5 text-primary-600" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Authenticator App</h4>
                <p className="text-sm text-gray-600">Use Google Authenticator or similar</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Login Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <SafeIcon icon={FiKey} className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Login Security</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Login Notifications</h3>
              <p className="text-sm text-gray-500">
                Get notified when someone logs into your account
              </p>
            </div>
            <button
              onClick={() => handleToggleSetting('loginNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securitySettings.loginNotifications ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securitySettings.loginNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">New Device Alerts</h3>
              <p className="text-sm text-gray-500">
                Receive alerts when your account is accessed from a new device
              </p>
            </div>
            <button
              onClick={() => handleToggleSetting('newDeviceAlerts')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securitySettings.newDeviceAlerts ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securitySettings.newDeviceAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Two-Factor Auth Modal */}
      {showTwoFactorModal && (
        <TwoFactorAuth user={user} onClose={() => handleTwoFactorSetup(false)} onSuccess={() => handleTwoFactorSetup(true)} />
      )}
    </div>
  );
};

export default SecuritySettings;