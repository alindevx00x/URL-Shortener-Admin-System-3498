import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { linkService } from '../../services/storage';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';
import LinkForm from './LinkForm';
import LinkList from './LinkList';

const { FiLink, FiMousePointer, FiClock, FiPlus } = FiIcons;

const Dashboard = () => {
  const { user } = useAuth();
  const [links, setLinks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({
    totalLinks: 0,
    totalClicks: 0,
    recentLinks: 0
  });

  useEffect(() => {
    loadLinks();
  }, [user]);

  const loadLinks = () => {
    const userLinks = linkService.getLinks(user.id);
    setLinks(userLinks);

    const totalClicks = userLinks.reduce((sum, link) => sum + link.clicks, 0);
    const recentLinks = userLinks.filter(link => {
      const created = new Date(link.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return created > weekAgo;
    }).length;

    setStats({
      totalLinks: userLinks.length,
      totalClicks,
      recentLinks
    });
  };

  const handleCreateLink = (linkData) => {
    const result = linkService.createLink(
      linkData.originalUrl, 
      linkData.customCode, 
      user.id,
      linkData.hasPassword ? linkData.password : null
    );
    
    if (result.success) {
      toast.success('Link created successfully!');
      loadLinks();
      setShowForm(false);
    } else {
      toast.error(result.message);
    }
  };

  const handleDeleteLink = (linkId) => {
    linkService.deleteLink(linkId);
    toast.success('Link deleted successfully!');
    loadLinks();
  };

  const handleToggleLink = (linkId, isActive) => {
    linkService.updateLink(linkId, { isActive });
    toast.success(`Link ${isActive ? 'activated' : 'deactivated'} successfully!`);
    loadLinks();
  };

  const statsCards = [
    {
      title: 'Total Links',
      value: stats.totalLinks,
      icon: FiLink,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Clicks',
      value: stats.totalClicks,
      icon: FiMousePointer,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Recent Links',
      value: stats.recentLinks,
      icon: FiClock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {user.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <SafeIcon icon={stat.icon} className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Link Button */}
      <div className="mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="h-5 w-5" />
          <span>Create New Link</span>
        </motion.button>
      </div>

      {/* Link Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8"
        >
          <LinkForm 
            onSubmit={handleCreateLink} 
            onCancel={() => setShowForm(false)} 
          />
        </motion.div>
      )}

      {/* Links List */}
      <LinkList 
        links={links} 
        onDelete={handleDeleteLink} 
        onToggle={handleToggleLink} 
      />
    </div>
  );
};

export default Dashboard;