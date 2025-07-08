import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import QRCode from 'qrcode';
import SocialShare from './SocialShare';

const {
  FiExternalLink,
  FiCopy,
  FiTrash2,
  FiToggleLeft,
  FiToggleRight,
  FiMousePointer,
  FiQrCode,
  FiDownload,
  FiLock,
  FiShare2
} = FiIcons;

const LinkList = ({ links, onDelete, onToggle, onUpdate }) => {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [shareUrl, setShareUrl] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentLink, setCurrentLink] = useState(null);
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard!');
  };

  const getShortUrl = (shortCode) => {
    return `${window.location.origin}/${shortCode}`;
  };

  const generateQRCode = async (url) => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeData(qrCodeDataUrl);
      setShowQrModal(true);
    } catch (error) {
      toast.error('Failed to generate QR code');
    }
  };

  const downloadQRCode = () => {
    if (qrCodeData) {
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = qrCodeData;
      link.click();
    }
  };
  
  const handleShare = (link) => {
    setCurrentLink(link);
    setShareUrl(getShortUrl(link.shortCode));
    setShowShareModal(true);
  };

  if (links.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 text-center">
        <p className="text-gray-500">No links created yet. Create your first link above!</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Your Links</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {links.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {getShortUrl(link.shortCode)}
                    </h4>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        link.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {link.isActive ? 'Active' : 'Inactive'}
                    </span>
                    {link.hasPassword && (
                      <SafeIcon
                        icon={FiLock}
                        className="h-4 w-4 text-gray-400"
                        title="Password protected"
                      />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate mb-2">{link.originalUrl}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiMousePointer} className="h-3 w-3" />
                      <span>{link.clicks} clicks</span>
                    </div>
                    <span>Created {format(new Date(link.createdAt), 'MMM d, yyyy')}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleShare(link)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Share link"
                  >
                    <SafeIcon icon={FiShare2} className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => generateQRCode(getShortUrl(link.shortCode))}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Generate QR Code"
                  >
                    <SafeIcon icon={FiQrCode} className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => copyToClipboard(getShortUrl(link.shortCode))}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy link"
                  >
                    <SafeIcon icon={FiCopy} className="h-4 w-4" />
                  </button>
                  <a
                    href={link.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Open original link"
                  >
                    <SafeIcon icon={FiExternalLink} className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => onToggle(link.id, !link.isActive)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title={link.isActive ? 'Deactivate' : 'Activate'}
                  >
                    <SafeIcon
                      icon={link.isActive ? FiToggleRight : FiToggleLeft}
                      className="h-4 w-4"
                    />
                  </button>
                  <button
                    onClick={() => onDelete(link.id)}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                    title="Delete link"
                  >
                    <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-sm w-full mx-4"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code</h3>
              {qrCodeData && (
                <img
                  src={qrCodeData}
                  alt="QR Code"
                  className="mx-auto mb-4 border border-gray-200 rounded"
                />
              )}
              <div className="flex space-x-3">
                <button
                  onClick={downloadQRCode}
                  className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiDownload} className="h-4 w-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setShowQrModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <SocialShare 
          url={shareUrl} 
          title={`Check out this link: ${currentLink?.originalUrl?.substring(0, 30)}...`}
          onClose={() => setShowShareModal(false)} 
        />
      )}
    </>
  );
};

export default LinkList;