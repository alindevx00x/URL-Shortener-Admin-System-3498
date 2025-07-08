import bcrypt from 'bcryptjs';

// Mock database service using localStorage
const STORAGE_KEYS = {
  LINKS: 'minilink_links',
  USERS: 'minilink_users',
  ANALYTICS: 'minilink_analytics',
  BLOG_POSTS: 'minilink_blog_posts',
  CONTACT_MESSAGES: 'minilink_contact_messages',
  SEO_SETTINGS: 'minilink_seo_settings',
  EMAIL_SETTINGS: 'minilink_email_settings',
  NOTIFICATIONS: 'minilink_notifications'
};

// Initialize default admin user
const initializeStorage = () => {
  const users = getUsers();
  if (users.length === 0) {
    const defaultAdmin = {
      id: '1',
      email: 'admin@shortlink.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date().toISOString(),
      twoFactorEnabled: false,
      lastPasswordChange: new Date().toISOString()
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
      robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /dashboard\nDisallow: /settings\nSitemap: https://minilink.at/sitemap.xml',
      sitemapXml: '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n<url>\n<loc>https://minilink.at/</loc>\n<lastmod>2023-01-01</lastmod>\n<changefreq>daily</changefreq>\n<priority>1.0</priority>\n</url>\n</urlset>',
      googleAnalyticsId: '',
      googleSearchConsole: '',
      facebookPixelId: '',
      twitterHandle: '@minilinkat',
      ogImage: ''
    };
    saveSEOSettings(defaultSEO);
  }
  
  // Initialize email settings
  const emailSettings = getEmailSettings();
  if (!emailSettings.smtpHost) {
    const defaultEmailSettings = {
      smtpHost: 'smtp.example.com',
      smtpPort: '587',
      smtpUser: 'notifications@minilink.at',
      smtpPassword: '',
      fromName: 'Minilink.at',
      fromEmail: 'notifications@minilink.at',
      replyToEmail: 'support@minilink.at',
      enableEmailNotifications: true,
      templates: {
        welcome: {
          subject: 'Welcome to Minilink.at',
          body: 'Welcome to Minilink.at! Your account has been created successfully.'
        },
        passwordReset: {
          subject: 'Password Reset Request',
          body: 'You have requested to reset your password. Click the link below to reset it.'
        },
        linkClick: {
          subject: 'Link Click Notification',
          body: 'Your link {{shortUrl}} has been clicked {{count}} times.'
        },
        newLink: {
          subject: 'New Link Created',
          body: 'Your new link {{shortUrl}} has been created successfully.'
        }
      }
    };
    saveEmailSettings(defaultEmailSettings);
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

const getEmailSettings = () => {
  const settings = localStorage.getItem(STORAGE_KEYS.EMAIL_SETTINGS);
  return settings ? JSON.parse(settings) : {};
};

const saveEmailSettings = (settings) => {
  localStorage.setItem(STORAGE_KEYS.EMAIL_SETTINGS, JSON.stringify(settings));
};

const getNotifications = () => {
  const notifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  return notifications ? JSON.parse(notifications) : [];
};

const saveNotifications = (notifications) => {
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
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

// Mock email sending
const sendEmail = async (to, subject, body) => {
  const emailSettings = getEmailSettings();
  
  // Simulate email sending
  console.log(`Sending email to ${to}`);
  console.log(`From: ${emailSettings.fromName} <${emailSettings.fromEmail}>`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return { success: true, message: 'Email sent successfully' };
};

export const authService = {
  login: (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Create login notification
      notificationService.sendNotification({
        userId: user.id,
        type: 'login',
        title: 'New Login',
        message: `New login detected from ${getLocationFromIP()} on ${new Date().toLocaleString()}`
      });
      
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
      twoFactorEnabled: false,
      lastPasswordChange: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    
    // Send welcome email
    const emailSettings = getEmailSettings();
    if (emailSettings.enableEmailNotifications) {
      const welcomeTemplate = emailSettings.templates.welcome;
      sendEmail(
        userData.email,
        welcomeTemplate.subject,
        welcomeTemplate.body.replace('{{name}}', userData.name)
      );
    }
    
    // Create welcome notification
    notificationService.sendNotification({
      userId: newUser.id,
      type: 'welcome',
      title: 'Welcome to Minilink.at',
      message: 'Thank you for creating an account. Start shortening your URLs now!'
    });
    
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
    
    // Send notification
    if (userId) {
      const users = getUsers();
      const user = users.find(u => u.id === userId);
      
      if (user) {
        // Send email notification
        const emailSettings = getEmailSettings();
        if (emailSettings.enableEmailNotifications) {
          const newLinkTemplate = emailSettings.templates.newLink;
          sendEmail(
            user.email,
            newLinkTemplate.subject,
            newLinkTemplate.body
              .replace('{{shortUrl}}', `${window.location.origin}/${shortCode}`)
              .replace('{{originalUrl}}', originalUrl)
          );
        }
      }
    }
    
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
      
      // Send notification if clicks threshold is reached
      const clicksCount = links[linkIndex].clicks;
      if (clicksCount === 10 || clicksCount === 50 || clicksCount === 100 || clicksCount % 500 === 0) {
        const userId = links[linkIndex].userId;
        if (userId) {
          const users = getUsers();
          const user = users.find(u => u.id === userId);
          
          if (user) {
            // Create notification
            notificationService.sendNotification({
              userId,
              type: 'link_milestone',
              title: `Link Milestone Reached`,
              message: `Your link ${window.location.origin}/${shortCode} has reached ${clicksCount} clicks!`,
              linkId: links[linkIndex].id
            });
            
            // Send email notification
            const emailSettings = getEmailSettings();
            if (emailSettings.enableEmailNotifications) {
              const linkClickTemplate = emailSettings.templates.linkClick;
              sendEmail(
                user.email,
                linkClickTemplate.subject,
                linkClickTemplate.body
                  .replace('{{shortUrl}}', `${window.location.origin}/${shortCode}`)
                  .replace('{{count}}', clicksCount.toString())
              );
            }
          }
        }
      }
      
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
      twoFactorEnabled: false,
      lastPasswordChange: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    
    // Send welcome email
    const emailSettings = getEmailSettings();
    if (emailSettings.enableEmailNotifications) {
      const welcomeTemplate = emailSettings.templates.welcome;
      sendEmail(
        userData.email,
        welcomeTemplate.subject,
        welcomeTemplate.body.replace('{{name}}', userData.name)
      );
    }
    
    return newUser;
  },

  updateUser: (userId, updates) => {
    const users = getUsers();
    const index = users.findIndex(user => user.id === userId);
    
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      
      // If password is being updated, update lastPasswordChange
      if (updates.password) {
        users[index].lastPasswordChange = new Date().toISOString();
      }
      
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
    
    // Send notification to all users about new post if it's published
    if (newPost.status === 'published') {
      const users = getUsers();
      users.forEach(user => {
        notificationService.sendNotification({
          userId: user.id,
          type: 'new_post',
          title: 'New Blog Post',
          message: `Check out our new post: ${newPost.title}`,
          postId: newPost.id
        });
      });
      
      // Send email to subscribers
      const emailSettings = getEmailSettings();
      if (emailSettings.enableEmailNotifications) {
        // This would typically use a separate subscribers list
        users.forEach(user => {
          if (user.role === 'user') {
            sendEmail(
              user.email,
              `New Blog Post: ${newPost.title}`,
              `We've published a new blog post that you might find interesting: ${newPost.title}. Read it now at ${window.location.origin}/blog/${newPost.slug}`
            );
          }
        });
      }
    }
    
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
    
    // Send notification about new contact message to admins
    const users = getUsers();
    const admins = users.filter(user => user.role === 'admin');
    
    admins.forEach(admin => {
      notificationService.sendNotification({
        userId: admin.id,
        type: 'contact_message',
        title: 'New Contact Message',
        message: `New message from ${messageData.name}: ${messageData.subject}`,
        messageId: newMessage.id
      });
    });
    
    // Send confirmation email to the sender
    const emailSettings = getEmailSettings();
    if (emailSettings.enableEmailNotifications) {
      await sendEmail(
        messageData.email,
        'We received your message',
        `Dear ${messageData.name},\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nBest regards,\nThe Minilink.at Team`
      );
    }
    
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
  },
  
  generateSitemap: () => {
    const baseUrl = getSEOSettings().siteUrl || 'https://minilink.at';
    const today = new Date().toISOString().split('T')[0];
    
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add static pages
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/about', priority: '0.8', changefreq: 'weekly' },
      { url: '/contact', priority: '0.7', changefreq: 'monthly' },
      { url: '/faq', priority: '0.7', changefreq: 'weekly' },
      { url: '/terms', priority: '0.5', changefreq: 'monthly' },
      { url: '/privacy', priority: '0.5', changefreq: 'monthly' }
    ];
    
    staticPages.forEach(page => {
      sitemap += '<url>\n';
      sitemap += `<loc>${baseUrl}${page.url}</loc>\n`;
      sitemap += `<lastmod>${today}</lastmod>\n`;
      sitemap += `<changefreq>${page.changefreq}</changefreq>\n`;
      sitemap += `<priority>${page.priority}</priority>\n`;
      sitemap += '</url>\n';
    });
    
    // Add blog posts
    const posts = getBlogPosts().filter(post => post.status === 'published');
    posts.forEach(post => {
      sitemap += '<url>\n';
      sitemap += `<loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      sitemap += `<lastmod>${new Date(post.updatedAt).toISOString().split('T')[0]}</lastmod>\n`;
      sitemap += '<changefreq>weekly</changefreq>\n';
      sitemap += '<priority>0.6</priority>\n';
      sitemap += '</url>\n';
    });
    
    sitemap += '</urlset>';
    
    const settings = getSEOSettings();
    settings.sitemapXml = sitemap;
    saveSEOSettings(settings);
    
    return sitemap;
  },
  
  generateRobotsTxt: () => {
    const baseUrl = getSEOSettings().siteUrl || 'https://minilink.at';
    
    let robotsTxt = 'User-agent: *\n';
    robotsTxt += 'Allow: /\n\n';
    robotsTxt += '# Disallow admin areas\n';
    robotsTxt += 'Disallow: /admin\n';
    robotsTxt += 'Disallow: /dashboard\n';
    robotsTxt += 'Disallow: /settings\n';
    robotsTxt += 'Disallow: /profile\n\n';
    robotsTxt += '# Sitemap\n';
    robotsTxt += `Sitemap: ${baseUrl}/sitemap.xml\n\n`;
    robotsTxt += '# Crawl delay\n';
    robotsTxt += 'Crawl-delay: 1\n';
    
    const settings = getSEOSettings();
    settings.robotsTxt = robotsTxt;
    saveSEOSettings(settings);
    
    return robotsTxt;
  }
};

export const emailService = {
  getSettings: () => {
    return getEmailSettings();
  },

  updateSettings: (settings) => {
    saveEmailSettings(settings);
    return settings;
  },

  sendEmail: async (to, subject, body) => {
    return await sendEmail(to, subject, body);
  },
  
  sendBulkEmail: async (recipients, subject, body) => {
    const results = [];
    
    for (const recipient of recipients) {
      const result = await sendEmail(recipient, subject, body);
      results.push({ email: recipient, ...result });
    }
    
    return results;
  },
  
  sendNewsletterToAllUsers: async (subject, body) => {
    const users = getUsers();
    const emailSettings = getEmailSettings();
    
    if (!emailSettings.enableEmailNotifications) {
      return { success: false, message: 'Email notifications are disabled' };
    }
    
    const recipients = users.map(user => user.email);
    return await emailService.sendBulkEmail(recipients, subject, body);
  }
};

export const notificationService = {
  getNotifications: (userId = null) => {
    const notifications = getNotifications();
    return userId ? notifications.filter(n => n.userId === userId) : notifications;
  },
  
  sendNotification: (notificationData) => {
    const notifications = getNotifications();
    
    const newNotification = {
      id: Date.now().toString(),
      ...notificationData,
      createdAt: new Date().toISOString(),
      read: false
    };
    
    notifications.push(newNotification);
    saveNotifications(notifications);
    
    return newNotification;
  },
  
  markAsRead: (notificationId) => {
    const notifications = getNotifications();
    const index = notifications.findIndex(n => n.id === notificationId);
    
    if (index !== -1) {
      notifications[index].read = true;
      saveNotifications(notifications);
      return { success: true };
    }
    
    return { success: false, message: 'Notification not found' };
  },
  
  markAllAsRead: (userId) => {
    const notifications = getNotifications();
    const updated = notifications.map(n => {
      if (n.userId === userId) {
        return { ...n, read: true };
      }
      return n;
    });
    
    saveNotifications(updated);
    return { success: true };
  },
  
  deleteNotification: (notificationId) => {
    const notifications = getNotifications();
    const filtered = notifications.filter(n => n.id !== notificationId);
    
    saveNotifications(filtered);
    return { success: true };
  }
};

// Initialize storage on import
initializeStorage();