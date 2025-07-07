import bcrypt from 'bcryptjs';

// Mock database service using localStorage
const STORAGE_KEYS = {
  LINKS: 'minilink_links',
  USERS: 'minilink_users',
  ANALYTICS: 'minilink_analytics',
  BLOG_POSTS: 'minilink_blog_posts',
  CONTACT_MESSAGES: 'minilink_contact_messages',
  SEO_SETTINGS: 'minilink_seo_settings',
  EMAIL_SETTINGS: 'minilink_email_settings'
};

// Initialize default admin user
const initializeStorage = () => {
  const users = getUsers();
  if (users.length === 0) {
    const defaultAdmin = {
      id: '1',
      email: 'admin@minilink.at',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date().toISOString(),
      twoFactorEnabled: false
    };
    saveUsers([defaultAdmin]);
  }

  // Initialize SEO settings
  const seoSettings = getSEOSettings();
  if (!seoSettings.siteName) {
    const defaultSEO = {
      siteName: 'Minilink.at',
      siteDescription: 'Professional URL shortener with advanced analytics, QR codes, and password protection. Perfect for businesses and individuals.',
      siteKeywords: 'url shortener, link shortener, qr codes, analytics, password protection, social media, marketing',
      siteUrl: 'https://minilink.at',
      defaultTitle: 'Professional URL Shortener - Minilink.at',
      defaultDescription: 'Shorten URLs with QR codes, password protection, and powerful analytics. Perfect for social media, email campaigns, and marketing.',
      defaultKeywords: 'url shortener, link shortener, qr codes, analytics',
      robotsTxt: '',
      sitemapXml: '',
      googleAnalyticsId: '',
      googleSearchConsole: '',
      facebookPixelId: '',
      twitterHandle: '@minilinkat',
      ogImage: ''
    };
    saveSEOSettings(defaultSEO);
  }
};

const getUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

const getLinks = () => {
  const links = localStorage.getItem(STORAGE_KEYS.LINKS);
  return links ? JSON.parse(links) : [];
};

const saveLinks = (links) => {
  localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(links));
};

const getAnalytics = () => {
  const analytics = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
  return analytics ? JSON.parse(analytics) : [];
};

const saveAnalytics = (analytics) => {
  localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
};

const getBlogPosts = () => {
  const posts = localStorage.getItem(STORAGE_KEYS.BLOG_POSTS);
  return posts ? JSON.parse(posts) : [];
};

const saveBlogPosts = (posts) => {
  localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(posts));
};

const getContactMessages = () => {
  const messages = localStorage.getItem(STORAGE_KEYS.CONTACT_MESSAGES);
  return messages ? JSON.parse(messages) : [];
};

const saveContactMessages = (messages) => {
  localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(messages));
};

const getSEOSettings = () => {
  const settings = localStorage.getItem(STORAGE_KEYS.SEO_SETTINGS);
  return settings ? JSON.parse(settings) : {};
};

const saveSEOSettings = (settings) => {
  localStorage.setItem(STORAGE_KEYS.SEO_SETTINGS, JSON.stringify(settings));
};

// Generate short code
const generateShortCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Mock geolocation and device detection
const getLocationFromIP = () => {
  const countries = ['United States', 'United Kingdom', 'Germany', 'France', 'Canada', 'Australia', 'Japan', 'Brazil'];
  return countries[Math.floor(Math.random() * countries.length)];
};

const getDeviceType = (userAgent) => {
  if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
    return 'Mobile';
  } else if (/Tablet|iPad/.test(userAgent)) {
    return 'Tablet';
  } else {
    return 'Desktop';
  }
};

const getReferrer = (referrer) => {
  if (!referrer) return 'Direct';
  try {
    const url = new URL(referrer);
    return url.hostname;
  } catch {
    return 'Direct';
  }
};

export const authService = {
  login: (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, message: 'Invalid credentials' };
  },

  register: (userData) => {
    const users = getUsers();
    const existingUser = users.find(u => u.email === userData.email);
    
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      role: 'user',
      createdAt: new Date().toISOString(),
      twoFactorEnabled: false
    };

    users.push(newUser);
    saveUsers(users);
    
    const { password: _, ...userWithoutPassword } = newUser;
    return { success: true, user: userWithoutPassword };
  }
};

export const linkService = {
  createLink: (originalUrl, customCode = null, userId, password = null) => {
    const links = getLinks();
    const shortCode = customCode || generateShortCode();

    // Check if custom code already exists
    if (links.find(link => link.shortCode === shortCode)) {
      return { success: false, message: 'Short code already exists' };
    }

    const newLink = {
      id: Date.now().toString(),
      originalUrl,
      shortCode,
      userId,
      clicks: 0,
      createdAt: new Date().toISOString(),
      isActive: true,
      hasPassword: !!password,
      password: password || null
    };

    links.push(newLink);
    saveLinks(links);
    
    return { success: true, link: newLink };
  },

  getLinks: (userId = null) => {
    const links = getLinks();
    return userId ? links.filter(link => link.userId === userId) : links;
  },

  getLinkByShortCode: (shortCode) => {
    const links = getLinks();
    return links.find(link => link.shortCode === shortCode);
  },

  updateLink: (id, updates) => {
    const links = getLinks();
    const index = links.findIndex(link => link.id === id);
    
    if (index !== -1) {
      links[index] = { ...links[index], ...updates };
      saveLinks(links);
      return { success: true, link: links[index] };
    }
    return { success: false, message: 'Link not found' };
  },

  deleteLink: (id) => {
    const links = getLinks();
    const filteredLinks = links.filter(link => link.id !== id);
    saveLinks(filteredLinks);
    return { success: true };
  },

  recordClick: (shortCode) => {
    const links = getLinks();
    const linkIndex = links.findIndex(link => link.shortCode === shortCode);
    
    if (linkIndex !== -1) {
      links[linkIndex].clicks += 1;
      saveLinks(links);

      // Record analytics
      const analytics = getAnalytics();
      const clickData = {
        id: Date.now().toString(),
        linkId: links[linkIndex].id,
        shortCode,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        country: getLocationFromIP(),
        device: getDeviceType(navigator.userAgent),
        referrerDomain: getReferrer(document.referrer)
      };

      analytics.push(clickData);
      saveAnalytics(analytics);
      
      return links[linkIndex];
    }
    return null;
  }
};

export const adminService = {
  getUsers: () => {
    return getUsers().map(user => {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  },

  createUser: (userData) => {
    const users = getUsers();
    const existingUser = users.find(u => u.email === userData.email);
    
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      twoFactorEnabled: false
    };

    users.push(newUser);
    saveUsers(users);
    return newUser;
  },

  updateUser: (userId, updates) => {
    const users = getUsers();
    const index = users.findIndex(user => user.id === userId);
    
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      saveUsers(users);
      return users[index];
    }
    throw new Error('User not found');
  },

  deleteUser: (userId) => {
    const users = getUsers();
    const filteredUsers = users.filter(user => user.id !== userId);
    saveUsers(filteredUsers);
    return { success: true };
  },

  getAnalytics: () => {
    const analytics = getAnalytics();
    const links = getLinks();
    const users = getUsers();

    // Calculate device stats
    const deviceStats = {};
    analytics.forEach(click => {
      deviceStats[click.device] = (deviceStats[click.device] || 0) + 1;
    });

    // Calculate geographic stats
    const geoStats = {};
    analytics.forEach(click => {
      geoStats[click.country] = (geoStats[click.country] || 0) + 1;
    });

    // Calculate referrer stats
    const referrerStats = {};
    analytics.forEach(click => {
      referrerStats[click.referrerDomain] = (referrerStats[click.referrerDomain] || 0) + 1;
    });

    // Calculate today's stats
    const today = new Date().toDateString();
    const todayLinks = links.filter(link => 
      new Date(link.createdAt).toDateString() === today
    ).length;

    const todayClicks = analytics.filter(click =>
      new Date(click.timestamp).toDateString() === today
    ).length;

    // Get most popular URLs
    const urlStats = {};
    analytics.forEach(click => {
      urlStats[click.shortCode] = (urlStats[click.shortCode] || 0) + 1;
    });

    const mostPopularUrls = Object.entries(urlStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([shortCode, clicks]) => {
        const link = links.find(l => l.shortCode === shortCode);
        return {
          shortCode,
          clicks,
          originalUrl: link?.originalUrl || 'Unknown',
          createdAt: link?.createdAt || ''
        };
      });

    return {
      totalLinks: links.length,
      totalClicks: links.reduce((sum, link) => sum + link.clicks, 0),
      totalUsers: users.length,
      urlsAddedToday: todayLinks,
      totalHits: analytics.length,
      recentClicks: analytics.slice(-50).reverse(),
      deviceStats,
      geoStats,
      referrerStats,
      mostPopularUrls,
      recentUrls: links.slice(-10).reverse()
    };
  }
};

export const blogService = {
  getPosts: () => {
    return getBlogPosts().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getPublishedPosts: () => {
    return getBlogPosts()
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getPostBySlug: (slug) => {
    const posts = getBlogPosts();
    return posts.find(post => post.slug === slug);
  },

  createPost: (postData) => {
    const posts = getBlogPosts();
    const newPost = {
      id: Date.now().toString(),
      ...postData,
      author: 'Admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0
    };

    posts.push(newPost);
    saveBlogPosts(posts);
    return newPost;
  },

  updatePost: (id, updates) => {
    const posts = getBlogPosts();
    const index = posts.findIndex(post => post.id === id);
    
    if (index !== -1) {
      posts[index] = { 
        ...posts[index], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      };
      saveBlogPosts(posts);
      return posts[index];
    }
    throw new Error('Post not found');
  },

  deletePost: (id) => {
    const posts = getBlogPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    saveBlogPosts(filteredPosts);
    return { success: true };
  },

  incrementViews: (id) => {
    const posts = getBlogPosts();
    const index = posts.findIndex(post => post.id === id);
    
    if (index !== -1) {
      posts[index].views = (posts[index].views || 0) + 1;
      saveBlogPosts(posts);
    }
  }
};

export const contactService = {
  submitMessage: async (messageData) => {
    const messages = getContactMessages();
    const newMessage = {
      id: Date.now().toString(),
      ...messageData,
      createdAt: new Date().toISOString(),
      status: 'unread'
    };

    messages.push(newMessage);
    saveContactMessages(messages);
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return newMessage;
  },

  getMessages: () => {
    return getContactMessages().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  markAsRead: (id) => {
    const messages = getContactMessages();
    const index = messages.findIndex(msg => msg.id === id);
    
    if (index !== -1) {
      messages[index].status = 'read';
      saveContactMessages(messages);
    }
  },

  deleteMessage: (id) => {
    const messages = getContactMessages();
    const filteredMessages = messages.filter(msg => msg.id !== id);
    saveContactMessages(filteredMessages);
    return { success: true };
  }
};

export const seoService = {
  getSettings: () => {
    return getSEOSettings();
  },

  updateSettings: (settings) => {
    saveSEOSettings(settings);
    return settings;
  }
};

// Initialize storage on import
initializeStorage();