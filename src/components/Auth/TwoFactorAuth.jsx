import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { FiShield, FiSmartphone, FiMail, FiKey, FiCheck, FiX } = FiIcons;

const TwoFactorAuth = ({ user, onClose }) => {
  const [step, setStep] = useState('setup'); // setup, verify, success
  const [method, setMethod] = useState('email'); // email, authenticator
  const [code, setCode] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [backupCodes, setBackupCodes] = useState([]);

  const handleSetup = () => {
    if (method === 'email') {
      // Simulate sending email
      toast.success('Verification code sent to your email!');
      setStep('verify');
    } else {
      // Generate QR code for authenticator app
      const secret = 'JBSWY3DPEHPK3PXP';
      const qrData = `otpauth://totp/Minilink.at:${user.email}?secret=${secret}&issuer=Minilink.at`;
      setQrCode(qrData);
      setStep('verify');
    }
  };

  const handleVerify = () => {
    if (code.length === 6) {
      // Simulate verification
      const codes = Array.from({ length: 8 }, () => 
        Math.random().toString(36).substr(2, 8).toUpperCase()
      );
      setBackupCodes(codes);
      setStep('success');
      toast.success('Two-factor authentication enabled successfully!');
    } else {
      toast.error('Please enter a valid 6-digit code');
    }
  };

  const handleDownloadBackupCodes = () => {
    const content = `Minilink.at 2FA Backup Codes\n\nGenerated: ${new Date().toLocaleString()}\nUser: ${user.email}\n\n${backupCodes.join('\n')}\n\nKeep these codes safe and secure!`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minilink-backup-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
      >
        {step === 'setup' && (
          <>
            <div className="text-center mb-6">
              <SafeIcon icon={FiShield} className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Enable Two-Factor Authentication
              </h2>
              <p className="text-gray-600">
                Add an extra layer of security to your account
              </p>
            </div>

            <div className="space-y-4">
              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  method === 'email' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                }`}
                onClick={() => setMethod('email')}
              >
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiMail} className="h-6 w-6 text-primary-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email Verification</h3>
                    <p className="text-sm text-gray-600">Receive codes via email</p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  method === 'authenticator' ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                }`}
                onClick={() => setMethod('authenticator')}
              >
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiSmartphone} className="h-6 w-6 text-primary-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Authenticator App</h3>
                    <p className="text-sm text-gray-600">Use Google Authenticator or similar</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSetup}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {step === 'verify' && (
          <>
            <div className="text-center mb-6">
              <SafeIcon icon={FiKey} className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Verify Your Setup
              </h2>
              {method === 'email' ? (
                <p className="text-gray-600">
                  Enter the 6-digit code sent to your email
                </p>
              ) : (
                <p className="text-gray-600">
                  Scan the QR code with your authenticator app and enter the code
                </p>
              )}
            </div>

            {method === 'authenticator' && (
              <div className="text-center mb-6">
                <div className="bg-gray-100 p-4 rounded-lg inline-block">
                  <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 text-sm">QR Code</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Scan with Google Authenticator, Authy, or similar app
                </p>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="w-full px-4 py-3 text-center text-2xl font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                maxLength={6}
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep('setup')}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleVerify}
                disabled={code.length !== 6}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                Verify
              </button>
            </div>
          </>
        )}

        {step === 'success' && (
          <>
            <div className="text-center mb-6">
              <SafeIcon icon={FiCheck} className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                2FA Enabled Successfully!
              </h2>
              <p className="text-gray-600">
                Your account is now protected with two-factor authentication
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-yellow-800 mb-2">
                Save Your Backup Codes
              </h3>
              <p className="text-sm text-yellow-700 mb-3">
                Store these codes in a safe place. You can use them to access your account if you lose your device.
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                {backupCodes.map((code, index) => (
                  <div key={index} className="bg-white p-2 rounded border">
                    {code}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleDownloadBackupCodes}
                className="flex-1 px-4 py-2 text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
              >
                Download Codes
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Done
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default TwoFactorAuth;