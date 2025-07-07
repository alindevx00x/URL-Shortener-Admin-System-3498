import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';
import { seoService } from '../../services/storage';

const { FiSearch, FiGlobe, FiCode, FiFileText, FiSettings } = FiIcons;

const SEOManager = () => {
  const [seoSettings, setSeoSettings] = useState({
    siteName: '',
    siteDescription: '',
    siteKeywords: '',
    siteUrl: '',
    defaultTitle: '',
    defaultDescription: '',
    defaultKeywords: '',
    robotsTxt: '',
    sitemapXml: '',
    googleAnalyticsId: '',
    googleSearchConsole: '',
    facebookPixelId: '',
    twitterHandle: '',
    ogImage: ''
  });

  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    loadSEOSettings();
  }, []);

  const loadSEOSettings = () => {
    const settings = seoService.getSettings();
    setSeoSettings(settings);
  };

  const handleSave = () => {
    seoService.updateSettings(seoSettings);
    toast.success('SEO settings updated successfully!');
  };

  const handleChange = (field, value) => {
    setSeoSettings({ ...seoSettings, [field]: value });
  };

  const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${seoSettings.siteUrl || 'https://minilink.at'}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${seoSettings.siteUrl || 'https://minilink.at'}/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${seoSettings.siteUrl || 'https://minilink.at'}/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${seoSettings.siteUrl || 'https://minilink.at'}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${seoSettings.siteUrl || 'https://minilink.at'}/faq</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;
    
    handleChange('sitemapXml', sitemap);
    toast.success('Sitemap generated successfully!');
  };

  const generateRobotsTxt = () => {
    const robotsTxt = `User-agent: *
Allow: /

# Disallow admin areas
Disallow: /admin
Disallow: /dashboard
Disallow: /settings

# Sitemap
Sitemap: ${seoSettings.siteUrl || 'https://minilink.at'}/sitemap.xml

# Crawl delay
Crawl-delay: 1`;
    
    handleChange('robotsTxt', robotsTxt);
    toast.success('Robots.txt generated successfully!');
  };

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'general', label: 'General Settings', icon: FiSettings },
    { id: 'meta', label: 'Meta Tags', icon: FiCode },
    { id: 'files', label: 'SEO Files', icon: FiFileText },
    { id: 'analytics', label: 'Analytics', icon: FiSearch }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">SEO Management</h1>
        <p className="mt-2 text-gray-600">Optimize your website for search engines</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <SafeIcon icon={tab.icon} className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={seoSettings.siteName}
                    onChange={(e) => handleChange('siteName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Minilink.at"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site URL
                  </label>
                  <input
                    type="url"
                    value={seoSettings.siteUrl}
                    onChange={(e) => handleChange('siteUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="https://minilink.at"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Description
                </label>
                <textarea
                  value={seoSettings.siteDescription}
                  onChange={(e) => handleChange('siteDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder="Professional URL shortener with advanced analytics..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Keywords
                </label>
                <input
                  type="text"
                  value={seoSettings.siteKeywords}
                  onChange={(e) => handleChange('siteKeywords', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="url shortener, link shortener, analytics, qr codes"
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'meta' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Page Title
                </label>
                <input
                  type="text"
                  value={seoSettings.defaultTitle}
                  onChange={(e) => handleChange('defaultTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Professional URL Shortener - Minilink.at"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Meta Description
                </label>
                <textarea
                  value={seoSettings.defaultDescription}
                  onChange={(e) => handleChange('defaultDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder="Shorten URLs with QR codes, password protection, and powerful analytics..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Keywords
                </label>
                <input
                  type="text"
                  value={seoSettings.defaultKeywords}
                  onChange={(e) => handleChange('defaultKeywords', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="url shortener, link shortener, qr codes, analytics"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter Handle
                  </label>
                  <input
                    type="text"
                    value={seoSettings.twitterHandle}
                    onChange={(e) => handleChange('twitterHandle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="@minilinkat"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Graph Image URL
                  </label>
                  <input
                    type="url"
                    value={seoSettings.ogImage}
                    onChange={(e) => handleChange('ogImage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="https://minilink.at/og-image.jpg"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'files' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Sitemap.xml
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={generateSitemap}
                      className="px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors"
                    >
                      Generate
                    </button>
                    <button
                      onClick={() => downloadFile(seoSettings.sitemapXml, 'sitemap.xml')}
                      className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                    >
                      Download
                    </button>
                  </div>
                </div>
                <textarea
                  value={seoSettings.sitemapXml}
                  onChange={(e) => handleChange('sitemapXml', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                  rows={10}
                  placeholder="<?xml version='1.0' encoding='UTF-8'?>..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Robots.txt
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={generateRobotsTxt}
                      className="px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors"
                    >
                      Generate
                    </button>
                    <button
                      onClick={() => downloadFile(seoSettings.robotsTxt, 'robots.txt')}
                      className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                    >
                      Download
                    </button>
                  </div>
                </div>
                <textarea
                  value={seoSettings.robotsTxt}
                  onChange={(e) => handleChange('robotsTxt', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                  rows={8}
                  placeholder="User-agent: *..."
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={seoSettings.googleAnalyticsId}
                    onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Search Console
                  </label>
                  <input
                    type="text"
                    value={seoSettings.googleSearchConsole}
                    onChange={(e) => handleChange('googleSearchConsole', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Verification code"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook Pixel ID
                </label>
                <input
                  type="text"
                  value={seoSettings.facebookPixelId}
                  onChange={(e) => handleChange('facebookPixelId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="123456789012345"
                />
              </div>
            </motion.div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOManager;