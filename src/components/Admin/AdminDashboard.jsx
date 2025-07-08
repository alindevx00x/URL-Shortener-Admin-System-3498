import React, { useState, useEffect } from 'react';
import { adminService, linkService } from '../../services/storage';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import ReactECharts from 'echarts-for-react';
import { format, subDays } from 'date-fns';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const {
  FiUsers,
  FiLink,
  FiMousePointer,
  FiActivity,
  FiTrash2,
  FiTrendingUp,
  FiGlobe,
  FiSmartphone,
  FiMonitor,
  FiBarChart3,
  FiRefreshCw,
  FiPlusCircle,
  FiCalendar
} = FiIcons;

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalLinks: 0,
    totalClicks: 0,
    totalUsers: 0,
    urlsAddedToday: 0,
    totalHits: 0,
    recentClicks: [],
    deviceStats: {},
    geoStats: {},
    referrerStats: {},
    mostPopularUrls: [],
    recentUrls: []
  });
  const [users, setUsers] = useState([]);
  const [links, setLinks] = useState([]);
  const [timeRange, setTimeRange] = useState('7d');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
    
    // Set up real-time updates
    const interval = setInterval(() => {
      loadData(true);
    }, 60000);
    
    return () => clearInterval(interval);
  }, [timeRange]);

  const loadData = (silent = false) => {
    if (!silent) {
      setRefreshing(true);
    }
    
    setTimeout(() => {
      const analyticsData = adminService.getAnalytics();
      const usersData = adminService.getUsers();
      const linksData = linkService.getLinks();
      
      setStats(analyticsData);
      setUsers(usersData);
      setLinks(linksData);
      
      if (!silent) {
        setRefreshing(false);
        toast.success('Dashboard data refreshed');
      }
    }, 800);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      adminService.deleteUser(userId);
      toast.success('User deleted successfully!');
      loadData();
    }
  };

  const handleDeleteLink = (linkId) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      linkService.deleteLink(linkId);
      toast.success('Link deleted successfully!');
      loadData();
    }
  };

  const getClicksChartOption = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const dateRange = [];
    const clicksData = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, 'MMM dd');
      dateRange.push(dateStr);

      const dayClicks = stats.recentClicks.filter(click => {
        const clickDate = new Date(click.timestamp);
        return clickDate.toDateString() === date.toDateString();
      }).length;

      clicksData.push(dayClicks);
    }

    return {
      title: {
        text: `Clicks Over Last ${days} Days`,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: dateRange
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: clicksData,
          type: 'line',
          smooth: true,
          itemStyle: {
            color: '#3b82f6'
          },
          areaStyle: {
            color: 'rgba(59,130,246,0.1)'
          }
        }
      ]
    };
  };

  const getDeviceChartOption = () => {
    const deviceData = Object.entries(stats.deviceStats || {}).map(([device, count]) => ({
      value: count,
      name: device
    }));

    return {
      title: {
        text: 'Device Distribution',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '0%'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          data: deviceData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0,0,0.5)'
            }
          }
        }
      ]
    };
  };

  const getGeoChartOption = () => {
    const geoData = Object.entries(stats.geoStats || {}).map(([country, count]) => ({
      value: count,
      name: country
    }));

    return {
      title: {
        text: 'Geographic Distribution',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: '70%',
          data: geoData.slice(0, 10), // Top 10 countries
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0,0,0.5)'
            }
          }
        }
      ]
    };
  };

  const statsCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: FiUsers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12.5%'
    },
    {
      title: 'Total Links',
      value: stats.totalLinks,
      icon: FiLink,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8.2%'
    },
    {
      title: 'Total Clicks',
      value: stats.totalClicks,
      icon: FiMousePointer,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+23.1%'
    },
    {
      title: 'Total Hits',
      value: stats.totalHits || 0,
      icon: FiBarChart3,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      change: '+18.4%'
    },
    {
      title: 'URLs Added Today',
      value: stats.urlsAddedToday || 0,
      icon: FiPlusCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: '+5.7%'
    },
    {
      title: 'Recent Activity',
      value: stats.recentClicks.length,
      icon: FiActivity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '+15.3%'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage users, links, and view detailed analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => loadData()} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center space-x-2"
            disabled={refreshing}
          >
            <SafeIcon 
              icon={FiRefreshCw} 
              className={`h-5 w-5 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} 
            />
            <span className="text-sm text-gray-600">Refresh Data</span>
          </button>
          <Link 
            to="/admin/users" 
            className="px-4 py-2 bg-primary-600 text-white rounded flex items-center space-x-2"
          >
            <SafeIcon icon={FiUsers} className="h-4 w-4" />
            <span>User Management</span>
          </Link>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : 'Last 90 days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <SafeIcon icon={stat.icon} className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium text-green-600">{stat.change}</span>
                <p className="text-xs text-gray-500">vs last period</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Clicks Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <ReactECharts option={getClicksChartOption()} height={300} />
        </motion.div>

        {/* Device Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <ReactECharts option={getDeviceChartOption()} height={300} />
        </motion.div>
      </div>

      {/* Geographic Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8"
      >
        <ReactECharts option={getGeoChartOption()} height={400} />
      </motion.div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Top Referrers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <SafeIcon icon={FiGlobe} className="h-5 w-5 mr-2 text-primary-600" />
              Top Referrers
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {Object.entries(stats.referrerStats || {})
                .slice(0, 5)
                .map(([referrer, count]) => (
                  <div key={referrer} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 truncate">{referrer}</span>
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <SafeIcon icon={FiActivity} className="h-5 w-5 mr-2 text-primary-600" />
              Recent Clicks
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {stats.recentClicks.slice(0, 10).map((click, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">/{click.shortCode}</span>
                  <span className="text-gray-400">{format(new Date(click.timestamp), 'MMM d, HH:mm')}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Most Popular URLs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <SafeIcon icon={FiTrendingUp} className="h-5 w-5 mr-2 text-primary-600" />
              Most Popular URLs
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {(stats.mostPopularUrls || []).slice(0, 5).map((url, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex-1 min-w-0 mr-2">
                    <p className="font-medium text-gray-900 truncate">/{url.shortCode}</p>
                    <p className="text-xs text-gray-500 truncate">{url.originalUrl}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{url.clicks} clicks</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Users Management Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Users</h3>
            <Link to="/admin/users" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {users.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400">
                      {user.role} • Joined {format(new Date(user.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 text-red-400 hover:text-red-600 transition-colors"
                      title="Delete user"
                    >
                      <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recently Added Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Recently Added Links</h3>
            <Link to="/admin/links" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {(stats.recentUrls || []).map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">/{link.shortCode}</p>
                    <p className="text-sm text-gray-500 truncate">{link.originalUrl}</p>
                    <p className="text-xs text-gray-400">
                      {link.clicks} clicks • {format(new Date(link.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteLink(link.id)}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors ml-2"
                    title="Delete link"
                  >
                    <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;