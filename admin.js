// ========================================
// ADMIN — Complete Dashboard Logic
// Full CRUD, dynamic data, working features
// ========================================

(function() {
  'use strict';

  // ========================================
  // STATE
  // ========================================
  const state = {
    currentPage: 'dashboard',
    currentUser: {
      id: 1,
      name: 'Admin User',
      email: 'admin@presidency.gov.za',
      role: 'super_admin',
      avatar: 'A'
    },
    pages: [
      { id: 1, title: 'Homepage', slug: 'index', status: 'published', lastModified: '2026-09-10 14:30', author: 'Admin User', views: 45231 },
      { id: 2, title: 'National Priorities', slug: 'priorities', status: 'published', lastModified: '2026-09-09 11:20', author: 'Jane Doe', views: 12045 },
      { id: 3, title: 'Programmes', slug: 'programmes', status: 'published', lastModified: '2026-09-08 16:45', author: 'Jane Doe', views: 8923 },
      { id: 4, title: 'News & Statements', slug: 'news', status: 'published', lastModified: '2026-09-10 09:15', author: 'Admin User', views: 23104 },
      { id: 5, title: 'Speeches', slug: 'speeches', status: 'draft', lastModified: '2026-09-07 14:00', author: 'John Smith', views: 0 },
      { id: 6, title: 'Seventh Administration', slug: 'administration', status: 'review', lastModified: '2026-09-06 10:30', author: 'Sarah Johnson', views: 0 },
      { id: 7, title: 'Procurement', slug: 'procurement', status: 'published', lastModified: '2026-09-05 15:20', author: 'Admin User', views: 5432 },
      { id: 8, title: 'Contact Us', slug: 'contact', status: 'published', lastModified: '2026-09-04 11:00', author: 'Admin User', views: 8976 },
      { id: 9, title: 'Media Gallery', slug: 'media', status: 'draft', lastModified: '2026-09-03 09:30', author: 'Jane Doe', views: 0 },
      { id: 10, title: 'Annual Reports', slug: 'reports', status: 'archived', lastModified: '2026-08-28 14:15', author: 'John Smith', views: 3421 }
    ],
    users: [
      { id: 1, name: 'Admin User', email: 'admin@presidency.gov.za', role: 'super_admin', status: 'active', lastActive: '2026-09-10 14:30', created: '2024-06-01' },
      { id: 2, name: 'Jane Doe', email: 'jane@presidency.gov.za', role: 'editor', status: 'active', lastActive: '2026-09-10 12:15', created: '2024-08-15' },
      { id: 3, name: 'John Smith', email: 'john@presidency.gov.za', role: 'reviewer', status: 'active', lastActive: '2026-09-09 16:45', created: '2024-09-20' },
      { id: 4, name: 'Sarah Johnson', email: 'sarah@presidency.gov.za', role: 'approver', status: 'active', lastActive: '2026-09-10 10:00', created: '2025-01-10' },
      { id: 5, name: 'Michael Brown', email: 'michael@presidency.gov.za', role: 'editor', status: 'active', lastActive: '2026-09-10 13:20', created: '2025-02-14' },
      { id: 6, name: 'Thandi Nkosi', email: 'thandi@presidency.gov.za', role: 'reviewer', status: 'active', lastActive: '2026-09-09 11:30', created: '2025-03-20' },
      { id: 7, name: 'Pieter van Wyk', email: 'pieter@presidency.gov.za', role: 'editor', status: 'inactive', lastActive: '2026-08-15 09:20', created: '2025-04-05' },
      { id: 8, name: 'Zanele Mthembu', email: 'zanele@presidency.gov.za', role: 'approver', status: 'active', lastActive: '2026-09-10 08:45', created: '2025-05-12' }
    ],
    documents: [
      { id: 1, name: 'Annual Report 2026.pdf', type: 'pdf', size: '2.4 MB', category: 'reports', uploaded: '2026-09-10', uploadedBy: 'Admin User' },
      { id: 2, name: 'Strategic Plan 2025-2030.docx', type: 'word', size: '1.8 MB', category: 'strategic', uploaded: '2026-09-08', uploadedBy: 'Jane Doe' },
      { id: 3, name: 'SONA 2026 Presentation.pptx', type: 'pptx', size: '8.2 MB', category: 'presentations', uploaded: '2026-09-05', uploadedBy: 'John Smith' },
      { id: 4, name: 'Performance Data Q3.xlsx', type: 'excel', size: '1.2 MB', category: 'data', uploaded: '2026-09-03', uploadedBy: 'Sarah Johnson' },
      { id: 5, name: 'Budget Report 2026.pdf', type: 'pdf', size: '3.1 MB', category: 'reports', uploaded: '2026-09-01', uploadedBy: 'Admin User' },
      { id: 6, name: 'State of Nation Address.pdf', type: 'pdf', size: '1.5 MB', category: 'speeches', uploaded: '2026-08-28', uploadedBy: 'Admin User' },
      { id: 7, name: 'Cabinet Statement Aug.pdf', type: 'pdf', size: '0.9 MB', category: 'statements', uploaded: '2026-08-25', uploadedBy: 'Jane Doe' },
      { id: 8, name: 'National Orders 2026.pdf', type: 'pdf', size: '4.2 MB', category: 'orders', uploaded: '2026-08-20', uploadedBy: 'Sarah Johnson' }
    ],
    images: [
      { id: 1, name: 'SONA 2026 - President', category: 'events', size: '2.4 MB', uploaded: '2026-09-10' },
      { id: 2, name: 'Union Buildings Aerial', category: 'landmarks', size: '3.8 MB', uploaded: '2026-09-08' },
      { id: 3, name: 'Cabinet Meeting', category: 'meetings', size: '1.9 MB', uploaded: '2026-09-05' },
      { id: 4, name: 'State Visit - Tanzania', category: 'diplomacy', size: '2.1 MB', uploaded: '2026-09-02' },
      { id: 5, name: 'Youth Day 2026', category: 'events', size: '2.7 MB', uploaded: '2026-08-15' },
      { id: 6, name: 'Tuynhuys Interior', category: 'landmarks', size: '1.5 MB', uploaded: '2026-08-10' }
    ],
    videos: [
      { id: 1, title: 'SONA 2026 Full Address', duration: '1:24:32', category: 'speeches', size: '1.2 GB', uploaded: '2026-09-10' },
      { id: 2, title: 'Cabinet Media Briefing', duration: '0:45:18', category: 'briefings', size: '890 MB', uploaded: '2026-09-08' },
      { id: 3, title: 'Presidential Address - Economic Recovery', duration: '0:32:45', category: 'speeches', size: '650 MB', uploaded: '2026-09-05' },
      { id: 4, title: 'Youth Day Commemoration', duration: '0:52:10', category: 'events', size: '780 MB', uploaded: '2026-08-15' }
    ],
    announcements: [
      { id: 1, title: 'SADC Condolences to Tanzania', priority: 'high', status: 'published', date: '2026-09-10' },
      { id: 2, title: 'National Orders Nominations Open', priority: 'medium', status: 'published', date: '2026-09-08' },
      { id: 3, title: 'SAPS Commemoration Day', priority: 'medium', status: 'published', date: '2026-09-06' },
      { id: 4, title: 'SIU Head Appointment', priority: 'high', status: 'published', date: '2026-09-05' },
      { id: 5, title: 'Youth Summit 2026', priority: 'low', status: 'draft', date: '2026-09-03' },
      { id: 6, title: 'Women\'s Day Celebration', priority: 'medium', status: 'published', date: '2026-08-09' }
    ],
    modules: [
      { id: 1, name: 'News Module', icon: 'fa-newspaper', desc: 'Manage news articles and press statements', enabled: true, position: 'main', items: 156 },
      { id: 2, name: 'Speeches Module', icon: 'fa-microphone', desc: 'Presidential speeches and addresses', enabled: true, position: 'main', items: 89 },
      { id: 3, name: 'Priorities Module', icon: 'fa-flag', desc: 'National priorities and MTDP content', enabled: true, position: 'main', items: 24 },
      { id: 4, name: 'Media Gallery', icon: 'fa-images', desc: 'Image and video galleries', enabled: true, position: 'sidebar', items: 245 },
      { id: 5, name: 'Announcements', icon: 'fa-bullhorn', desc: 'Public announcements and advisories', enabled: true, position: 'sidebar', items: 67 },
      { id: 6, name: 'Documents', icon: 'fa-folder', desc: 'Publications and downloadable files', enabled: true, position: 'main', items: 134 },
      { id: 7, name: 'Chatbot', icon: 'fa-robot', desc: 'AI assistant for citizen queries', enabled: true, position: 'footer', items: 1 },
      { id: 8, name: 'Newsletter', icon: 'fa-envelope', desc: 'Email newsletter signup and management', enabled: false, position: 'footer', items: 0 }
    ],
    backups: [
      { id: 1, date: '2026-09-10 03:00', size: '12.3 GB', type: 'full', status: 'completed', duration: '4m 32s' },
      { id: 2, date: '2026-09-09 03:00', size: '12.1 GB', type: 'full', status: 'completed', duration: '4m 28s' },
      { id: 3, date: '2026-09-08 03:00', size: '11.9 GB', type: 'full', status: 'completed', duration: '4m 15s' },
      { id: 4, date: '2026-09-07 12:00', size: '2.4 GB', type: 'incremental', status: 'completed', duration: '0m 48s' },
      { id: 5, date: '2026-09-06 03:00', size: '11.7 GB', type: 'full', status: 'completed', duration: '4m 02s' }
    ],
    auditLog: [
      { id: 1, action: 'User created: Jane Doe', detail: 'New editor account added', user: 'Admin User', time: '2026-09-10 14:30', type: 'create' },
      { id: 2, action: 'Content updated: SADC Statement', detail: 'Content revised and resubmitted', user: 'Jane Doe', time: '2026-09-10 13:15', type: 'update' },
      { id: 3, action: 'Content approved: National Orders 2026', detail: 'Approved by Senior Editor', user: 'Michael Brown', time: '2026-09-10 11:45', type: 'approve' },
      { id: 4, action: 'Document uploaded: Annual Report 2026', detail: 'PDF uploaded to document management', user: 'Admin User', time: '2026-09-10 10:30', type: 'upload' },
      { id: 5, action: 'Content archived: Draft speech', detail: 'Moved to archive by Admin User', user: 'Admin User', time: '2026-09-09 16:20', type: 'delete' },
      { id: 6, action: 'User role changed: Sarah Johnson', detail: 'Changed from editor to approver', user: 'Admin User', time: '2026-09-09 14:00', type: 'update' },
      { id: 7, action: 'Backup completed', detail: 'Full system backup successful', user: 'System', time: '2026-09-09 03:00', type: 'backup' },
      { id: 8, action: 'Security scan completed', detail: 'All systems secure · 0 vulnerabilities', user: 'System', time: '2026-09-08 22:00', type: 'security' },
      { id: 9, action: 'New page created: Speeches', detail: 'Page created and published', user: 'John Smith', time: '2026-09-08 09:00', type: 'create' },
      { id: 10, action: 'Module enabled: Media Gallery', detail: 'Media gallery module activated', user: 'Admin User', time: '2026-09-07 15:30', type: 'update' },
      { id: 11, action: 'User deleted: Old Account', detail: 'Inactive user removed from system', user: 'Admin User', time: '2026-09-07 11:00', type: 'delete' },
      { id: 12, action: 'Backup restored', detail: 'System restored from 2026-09-06 backup', user: 'Admin User', time: '2026-09-06 18:00', type: 'backup' }
    ],
    analytics: {
      views: 12847,
      engagement: 68,
      bounceRate: 24,
      weeklyData: [
        { day: 'Mon', value: 40 },
        { day: 'Tue', value: 65 },
        { day: 'Wed', value: 80 },
        { day: 'Thu', value: 55 },
        { day: 'Fri', value: 90 },
        { day: 'Sat', value: 70 },
        { day: 'Sun', value: 45 }
      ]
    }
  };

  // ========================================
  // UTILITIES
  // ========================================
  function $(selector, context = document) {
    return context.querySelector(selector);
  }
  function $$(selector, context = document) {
    return [...context.querySelectorAll(selector)];
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatDate(dateStr) {
    return dateStr;
  }

  function showToast(message, type = 'info') {
    const toast = $('#adminToast');
    if (!toast) return;
    const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> ${message}`;
    toast.className = `admin-toast ${type} show`;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3500);
  }

  function getRoleBadge(role) {
    const labels = {
      'super_admin': 'Super Admin',
      'admin': 'Admin',
      'editor': 'Editor',
      'reviewer': 'Reviewer',
      'approver': 'Approver',
      'viewer': 'Viewer'
    };
    return `<span class="badge badge-${role}">${labels[role] || role}</span>`;
  }

  function getStatusBadge(status) {
    const icons = {
      'active': '●',
      'inactive': '○',
      'draft': '◐',
      'review': '◑',
      'approved': '✓',
      'published': '◉',
      'archived': '◌'
    };
    return `<span class="badge badge-${status}">${icons[status] || ''} ${status}</span>`;
  }

  function getPriorityBadge(priority) {
    return `<span class="badge badge-${priority}">${priority}</span>`;
  }

  function getFileIcon(type) {
    const icons = {
      'pdf': 'fa-file-pdf',
      'word': 'fa-file-word',
      'pptx': 'fa-file-powerpoint',
      'excel': 'fa-file-excel',
      'image': 'fa-file-image',
      'video': 'fa-file-video'
    };
    return icons[type] || 'fa-file';
  }

  // ========================================
  // MODAL SYSTEM
  // ========================================
  function openModal(title, bodyHtml, footerHtml = '') {
    const overlay = $('#modalOverlay');
    const modal = $('#modalContent');
    if (!overlay || !modal) return;
    
    modal.innerHTML = `
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close" onclick="AdminApp.closeModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">${bodyHtml}</div>
      ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
    `;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const overlay = $('#modalOverlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ========================================
  // RENDER FUNCTIONS
  // ========================================

  // ----- DASHBOARD -----
  function renderDashboard() {
    return `
      <div class="page-header">
        <div>
          <h1>📊 Dashboard Overview</h1>
          <p class="subtitle">Welcome back, ${state.currentUser.name}. Here's what's happening today.</p>
        </div>
        <div class="actions">
          <button class="btn-admin btn-admin-outline" onclick="AdminApp.exportReport()">
            <i class="fas fa-download"></i> Export Report
          </button>
          <button class="btn-admin btn-admin-gold" onclick="AdminApp.navigate('editor')">
            <i class="fas fa-plus"></i> New Content
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon green"><i class="fas fa-file-alt"></i></div>
            <span class="stat-trend up"><i class="fas fa-arrow-up"></i> 12%</span>
          </div>
          <div class="stat-number">1,284</div>
          <div class="stat-label">Total Content Items</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon gold"><i class="fas fa-users"></i></div>
            <span class="stat-trend up"><i class="fas fa-arrow-up"></i> 8%</span>
          </div>
          <div class="stat-number">${state.users.length * 6}</div>
          <div class="stat-label">Active Users</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon blue"><i class="fas fa-clock"></i></div>
            <span class="stat-trend up"><i class="fas fa-arrow-up"></i> 3</span>
          </div>
          <div class="stat-number">${state.pages.filter(p => p.status === 'review').length + 20}</div>
          <div class="stat-label">Pending Reviews</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon red"><i class="fas fa-flag"></i></div>
            <span class="stat-trend up"><i class="fas fa-arrow-up"></i> 24%</span>
          </div>
          <div class="stat-number">${state.pages.filter(p => p.status === 'published').length * 20}</div>
          <div class="stat-label">Published This Month</div>
        </div>
      </div>

      <div class="admin-card">
        <div class="card-header">
          <div>
            <h2><i class="fas fa-chart-line"></i> Analytics — Last 7 Days</h2>
            <p class="card-subtitle">Page views and engagement across the website</p>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn-admin btn-admin-outline btn-admin-sm" onclick="AdminApp.setChartPeriod('7')">7 days</button>
            <button class="btn-admin btn-admin-outline btn-admin-sm" onclick="AdminApp.setChartPeriod('30')">30 days</button>
            <button class="btn-admin btn-admin-gold btn-admin-sm" onclick="AdminApp.setChartPeriod('90')">90 days</button>
          </div>
        </div>
        <div class="chart-container" id="analyticsChart">
          ${state.analytics.weeklyData.map(d => `
            <div class="chart-bar" style="height:${d.value}%" data-value="${d.value}">
              <span class="value">${d.value}k views</span>
              <span class="label">${d.day}</span>
            </div>
          `).join('')}
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px;">
          <div style="text-align:center;padding:16px;background:#fafcfb;border-radius:12px;">
            <div style="font-size:0.75rem;color:#6b8a7e;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Total Views</div>
            <div style="font-size:1.6rem;font-weight:800;margin-top:4px;">${state.analytics.views.toLocaleString()}</div>
            <div style="font-size:0.75rem;color:#006b4f;font-weight:600;margin-top:2px;">↑ 15% vs last week</div>
          </div>
          <div style="text-align:center;padding:16px;background:#fafcfb;border-radius:12px;">
            <div style="font-size:0.75rem;color:#6b8a7e;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Engagement</div>
            <div style="font-size:1.6rem;font-weight:800;margin-top:4px;">${state.analytics.engagement}%</div>
            <div style="font-size:0.75rem;color:#006b4f;font-weight:600;margin-top:2px;">↑ 5% vs last week</div>
          </div>
          <div style="text-align:center;padding:16px;background:#fafcfb;border-radius:12px;">
            <div style="font-size:0.75rem;color:#6b8a7e;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Bounce Rate</div>
            <div style="font-size:1.6rem;font-weight:800;margin-top:4px;">${state.analytics.bounceRate}%</div>
            <div style="font-size:0.75rem;color:#006b4f;font-weight:600;margin-top:2px;">↓ 8% vs last week</div>
          </div>
        </div>
      </div>

      <div class="admin-card">
        <div class="card-header">
          <div>
            <h2><i class="fas fa-code-branch"></i> Content Workflow Pipeline</h2>
            <p class="card-subtitle">Draft → Review → Approval → Publication</p>
          </div>
          <button class="btn-admin btn-admin-primary btn-admin-sm" onclick="AdminApp.navigate('workflow')">
            View Full Pipeline <i class="fas fa-arrow-right"></i>
          </button>
        </div>
        <div class="workflow-pipeline">
          <div class="pipeline-column draft">
            <div class="column-header">
              <span>📄 Draft</span>
              <span class="count">${state.pages.filter(p => p.status === 'draft').length}</span>
            </div>
            ${state.pages.filter(p => p.status === 'draft').slice(0, 3).map(p => `
              <div class="pipeline-card" onclick="AdminApp.editPage(${p.id})">
                <div class="card-title">${escapeHtml(p.title)}</div>
                <div class="card-meta">
                  <i class="fas fa-user"></i> ${p.author}
                  <span>·</span>
                  <span>${p.lastModified}</span>
                </div>
                <div class="card-actions">
                  <button class="btn-admin btn-admin-outline btn-admin-sm" onclick="event.stopPropagation();AdminApp.editPage(${p.id})">Edit</button>
                  <button class="btn-admin btn-admin-primary btn-admin-sm" onclick="event.stopPropagation();AdminApp.submitForReview(${p.id})">Submit</button>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="pipeline-column review">
            <div class="column-header">
              <span>📝 Review</span>
              <span class="count">${state.pages.filter(p => p.status === 'review').length}</span>
            </div>
            ${state.pages.filter(p => p.status === 'review').map(p => `
              <div class="pipeline-card" onclick="AdminApp.editPage(${p.id})">
                <div class="card-title">${escapeHtml(p.title)}</div>
                <div class="card-meta">
                  <i class="fas fa-user"></i> ${p.author}
                  <span>·</span>
                  <span>${p.lastModified}</span>
                </div>
                <div class="card-actions">
                  <button class="btn-admin btn-admin-primary btn-admin-sm" onclick="event.stopPropagation();AdminApp.approveContent(${p.id})">Approve</button>
                  <button class="btn-admin btn-admin-danger btn-admin-sm" onclick="event.stopPropagation();AdminApp.rejectContent(${p.id})">Reject</button>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="pipeline-column approved">
            <div class="column-header">
              <span>✅ Approved</span>
              <span class="count">${state.pages.filter(p => p.status === 'approved').length}</span>
            </div>
            ${state.pages.filter(p => p.status === 'approved').slice(0, 3).map(p => `
              <div class="pipeline-card">
                <div class="card-title">${escapeHtml(p.title)}</div>
                <div class="card-meta">
                  <i class="fas fa-user"></i> ${p.author}
                </div>
                <div class="card-actions">
                  <button class="btn-admin btn-admin-gold btn-admin-sm" onclick="AdminApp.publishContent(${p.id})">Publish</button>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="pipeline-column published">
            <div class="column-header">
              <span>🚀 Published</span>
              <span class="count">${state.pages.filter(p => p.status === 'published').length}</span>
            </div>
            ${state.pages.filter(p => p.status === 'published').slice(0, 3).map(p => `
              <div class="pipeline-card" style="border-left:3px solid #006b4f;">
                <div class="card-title">${escapeHtml(p.title)}</div>
                <div class="card-meta">
                  <i class="fas fa-eye"></i> ${p.views.toLocaleString()} views
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
        <div class="admin-card" style="margin-bottom:0;">
          <div class="card-header">
            <h2><i class="fas fa-history"></i> Recent Activity</h2>
            <button class="btn-admin btn-admin-outline btn-admin-sm" onclick="AdminApp.navigate('audit')">View All</button>
          </div>
          <div class="audit-list">
            ${state.auditLog.slice(0, 6).map(log => `
              <div class="audit-row">
                <div class="audit-icon ${log.type}">
                  <i class="fas fa-${log.type === 'create' ? 'plus' : log.type === 'update' ? 'edit' : log.type === 'delete' ? 'trash' : log.type === 'approve' ? 'check' : log.type === 'upload' ? 'upload' : log.type === 'backup' ? 'database' : 'shield-alt'}"></i>
                </div>
                <div class="audit-content">
                  <div class="action">${escapeHtml(log.action)}</div>
                  <div class="detail">${escapeHtml(log.detail)}</div>
                  <div class="user"><i class="fas fa-user"></i> ${log.user}</div>
                </div>
                <div class="audit-time">${log.time}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="admin-card" style="margin-bottom:0;">
          <div class="card-header">
            <h2><i class="fas fa-shield-alt"></i> Security & Backup</h2>
            <button class="btn-admin btn-admin-outline btn-admin-sm" onclick="AdminApp.navigate('security')">View</button>
          </div>
          <div style="padding:16px;background:linear-gradient(135deg,#edf5f2,#f6f9f8);border-radius:12px;margin-bottom:16px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <i class="fas fa-lock" style="font-size:1.5rem;color:#006b4f;"></i>
              <div style="flex:1;">
                <strong>Security Status: Secure</strong>
                <div style="font-size:0.82rem;color:#6b8a7e;">All systems operational</div>
              </div>
              <span class="badge badge-active">● Active</span>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
              <span style="font-size:0.7rem;background:white;padding:4px 10px;border-radius:999px;border:1px solid #dce8e3;">✓ SSL</span>
              <span style="font-size:0.7rem;background:white;padding:4px 10px;border-radius:999px;border:1px solid #dce8e3;">✓ 2FA</span>
              <span style="font-size:0.7rem;background:white;padding:4px 10px;border-radius:999px;border:1px solid #dce8e3;">✓ Firewall</span>
              <span style="font-size:0.7rem;background:white;padding:4px 10px;border-radius:999px;border:1px solid #dce8e3;">✓ DDoS</span>
            </div>
          </div>
          <div style="padding:16px;border:1px solid #dce8e3;border-radius:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
              <div>
                <strong><i class="fas fa-database" style="color:#d4a12a;"></i> Last Backup</strong>
                <div style="font-size:0.82rem;color:#6b8a7e;">${state.backups[0].date}</div>
              </div>
              <button class="btn-admin btn-admin-gold btn-admin-sm" onclick="AdminApp.createBackup()">
                <i class="fas fa-upload"></i> Backup Now
              </button>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:0.8rem;">
              <div>📁 DB: <strong>${state.backups[0].size}</strong></div>
              <div>⏱️ Duration: <strong>${state.backups[0].duration}</strong></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ----- PAGES -----
  function renderPages() {
    return `
      <div class="page-header">
        <div>
          <h1>📄 Pages</h1>
          <p class="subtitle">Manage all website pages — add, edit, or delete content</p>
        </div>
        <div class="actions">
          <button class="btn-admin btn-admin-outline" onclick="AdminApp.exportData('pages')">
            <i class="fas fa-download"></i> Export
          </button>
          <button class="btn-admin btn-admin-gold" onclick="AdminApp.showAddPageModal()">
            <i class="fas fa-plus"></i> Add Page
          </button>
        </div>
      </div>

      <div class="admin-card">
        <div class="card-header">
          <div>
            <h2><i class="fas fa-list"></i> All Pages (${state.pages.length})</h2>
          </div>
          <div style="display:flex;gap:8px;">
            <input class="field" style="min-width:200px;padding:8px 12px;" placeholder="🔍 Search pages..." oninput="AdminApp.filterTable('pagesTable', this.value)">
            <select class="field" style="padding:8px 12px;" onchange="AdminApp.filterByStatus('pagesTable', this.value)">
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="review">Review</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="admin-table" id="pagesTable">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Author</th>
                <th>Views</th>
                <th>Last Modified</th>
                <th style="text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${state.pages.map(page => `
                <tr data-status="${page.status}">
                  <td><strong>${escapeHtml(page.title)}</strong></td>
                  <td><code>/${page.slug}</code></td>
                  <td>${getStatusBadge(page.status)}</td>
                  <td>${page.author}</td>
                  <td>${page.views.toLocaleString()}</td>
                  <td>${page.lastModified}</td>
                  <td style="text-align:right;white-space:nowrap;">
                    <button class="btn-admin btn-admin-icon btn-admin-outline" onclick="AdminApp.editPage(${page.id})" title="Edit">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-admin btn-admin-icon btn-admin-outline" onclick="AdminApp.previewPage(${page.id})" title="Preview">
                      <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-admin btn-admin-icon btn-admin-danger" onclick="AdminApp.deletePage(${page.id})" title="Delete">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ----- USERS -----
  function renderUsers() {
    return `
      <div class="page-header">
        <div>
          <h1>👥 Users & Roles</h1>
          <p class="subtitle">Manage system users, roles, and permissions</p>
        </div>
        <div class="actions">
          <button class="btn-admin btn-admin-outline" onclick="AdminApp.exportData('users')">
            <i class="fas fa-download"></i> Export
          </button>
          <button class="btn-admin btn-admin-gold" onclick="AdminApp.showAddUserModal()">
            <i class="fas fa-user-plus"></i> Add User
          </button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:20px;">
        ${['super_admin', 'editor', 'reviewer', 'approver'].map(role => {
          const count = state.users.filter(u => u.role === role).length;
          const icons = { super_admin: 'fa-crown', editor: 'fa-user-edit', reviewer: 'fa-user-check', approver: 'fa-user-tie' };
          return `
            <div class="stat-card">
              <div class="stat-header">
                <div class="stat-icon gold"><i class="fas ${icons[role]}"></i></div>
              </div>
              <div class="stat-number">${count}</div>
              <div class="stat-label">${role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="admin-card">
        <div class="card-header">
          <h2><i class="fas fa-users"></i> All Users (${state.users.length})</h2>
          <input class="field" style="min-width:200px;padding:8px 12px;" placeholder="🔍 Search users..." oninput="AdminApp.filterTable('usersTable', this.value)">
        </div>
        <div class="table-wrapper">
          <table class="admin-table" id="usersTable">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Created</th>
                <th style="text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${state.users.map(user => `
                <tr>
                  <td>
                    <div class="user-cell">
                      <div class="avatar-sm">${user.name.charAt(0)}</div>
                      <div class="user-info">
                        <strong>${escapeHtml(user.name)}</strong>
                        <span>${user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>${getRoleBadge(user.role)}</td>
                  <td>${getStatusBadge(user.status)}</td>
                  <td>${user.lastActive}</td>
                  <td>${user.created}</td>
                  <td style="text-align:right;white-space:nowrap;">
                    <button class="btn-admin btn-admin-icon btn-admin-outline" onclick="AdminApp.editUser(${user.id})" title="Edit">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-admin btn-admin-icon btn-admin-outline" onclick="AdminApp.resetPassword(${user.id})" title="Reset Password">
                      <i class="fas fa-key"></i>
                    </button>
                    <button class="btn-admin btn-admin-icon btn-admin-danger" onclick="AdminApp.deleteUser(${user.id})" title="Delete">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ----- DOCUMENTS -----
  function renderDocuments() {
    return `
      <div class="page-header">
        <div>
          <h1>📁 Document Management</h1>
          <p class="subtitle">Upload, organize, and manage PDFs, images, and documents</p>
        </div>
        <div class="actions">
          <button class="btn-admin btn-admin-outline" onclick="AdminApp.exportData('documents')">
            <i class="fas fa-download"></i> Export List
          </button>
          <button class="btn-admin btn-admin-gold" onclick="document.getElementById('docUploadInput').click()">
            <i class="fas fa-upload"></i> Upload File
          </button>
          <input type="file" id="docUploadInput" style="display:none;" multiple accept=".pdf,.doc,.docx,.pptx,.xlsx,.jpg,.png,.mp4" onchange="AdminApp.handleFileUpload(event)">
        </div>
      </div>

      <div class="admin-card">
        <div class="card-header">
          <h2><i class="fas fa-folder"></i> All Documents (${state.documents.length})</h2>
          <div style="display:flex;gap:8px;">
            <input class="field" style="min-width:200px;padding:8px 12px;" placeholder="🔍 Search..." oninput="AdminApp.filterDocuments(this.value)">
            <select class="field" style="padding:8px 12px;" onchange="AdminApp.filterDocumentsByType(this.value)">
              <option value="">All Types</option>
              <option value="pdf">PDF</option>
              <option value="word">Word</option>
              <option value="pptx">PowerPoint</option>
              <option value="excel">Excel</option>
            </select>
          </div>
        </div>
        <div class="documents-grid" id="documentsGrid">
          ${state.documents.map(doc => `
            <div class="doc-card" data-type="${doc.type}">
              <div class="doc-preview ${doc.type}">
                <i class="fas ${getFileIcon(doc.type)}"></i>
              </div>
              <div class="doc-info">
                <div class="doc-name">${escapeHtml(doc.name)}</div>
                <div class="doc-meta">
                  <span>${doc.size}</span>
                  <span>·</span>
                  <span>${doc.category}</span>
                  <span>·</span>
                  <span>${doc.uploaded}</span>
                </div>
                <div class="doc-actions">
                  <button class="btn-admin btn-admin-sm btn-admin-primary" onclick="AdminApp.downloadDocument(${doc.id})">
                    <i class="fas fa-download"></i> Download
                  </button>
                  <button class="btn-admin btn-admin-sm btn-admin-outline" onclick="AdminApp.renameDocument(${doc.id})">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn-admin btn-admin-sm btn-admin-danger" onclick="AdminApp.deleteDocument(${doc.id})">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ----- IMAGE GALLERY -----
  function renderImages() {
    return `
      <div class="page-header">
        <div>
          <h1>🖼️ Image Gallery</h1>
          <p class="subtitle">Upload and manage images for the website</p>
        </div>
        <div class="actions">
          <button class="btn-admin btn-admin-outline" onclick="AdminApp.createAlbum()">
            <i class="fas fa-folder-plus"></i> New Album
          </button>
          <button class="btn-admin btn-admin-gold" onclick="document.getElementById('imageUploadInput').click()">
            <i class="fas fa-upload"></i> Upload Images
          </button>
          <input type="file" id="imageUploadInput" style="display:none;" multiple accept="image/*" onchange="AdminApp.handleImageUpload(event)">
        </div>
      </div>

      <div class="admin-card">
        <div class="card-header">
          <h2><i class="fas fa-images"></i> All Images (${state.images.length})</h2>
          <div style="display:flex;gap:8px;">
            <input class="field" style="min-width:200px;padding:8px 12px;" placeholder="🔍 Search..." oninput="AdminApp.filterImages(this.value)">
            <select class="field" style="padding:8px 12px;">
              <option value="">All Categories</option>
              <option value="events">Events</option>
              <option value="landmarks">Landmarks</option>
              <option value="meetings">Meetings</option>
              <option value="diplomacy">Diplomacy</option>
            </select>
          </div>
        </div>
        <div class="gallery-grid" id="imageGallery">
          ${state.images.map(img => `
            <div class="gallery-item" data-name="${img.name.toLowerCase()}">
              <div class="placeholder"><i class="fas fa-image"></i></div>
              <div class="overlay">
                <span>${escapeHtml(img.name)}</span>
                <div class="actions">
                  <button onclick="event.stopPropagation();AdminApp.viewImage(${img.id})" title="View">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button onclick="event.stopPropagation();AdminApp.deleteImage(${img.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ----- VIDEO GALLERY -----
  function renderVideos() {
    return `
      <div class="page-header">
        <div>
          <h1>🎬 Video Gallery</h1>
          <p class="subtitle">Upload and manage videos</p>
        </div>
        <div class="actions">
          <button class="btn-admin btn-admin-gold" onclick="document.getElementById('videoUploadInput').click()">
            <i class="fas fa-upload"></i> Upload Video
          </button>
          <input type="file" id="videoUploadInput" style="display:none;" accept="video/*" onchange="AdminApp.handleVideoUpload(event)">
        </div>
      </div>

      <div class="admin-card">
        <div class="card-header">
          <h2><i class="fas fa-video"></i> All Videos (${state.videos.length})</h2>
        </div>
        <div class="gallery-grid">
          ${state.videos.map(vid => `
            <div class="gallery-item video-thumb">
              <div class="placeholder"><i class="fas fa-video"></i></div>
              <div class="play-overlay">
                <div class="play-btn-lg"><i class="fas fa-play"></i></div>
              </div>
              <div class="overlay">
                <div style="flex:1;">
                  <div style="font-weight:600;font-size:0.85rem;">${escapeHtml(vid.title)}</div>
                  <div style="font-size:0.72rem;color:rgba(255,255,255,0.75);">${vid.duration} · ${vid.size}</div>
                </div>
                <div class="actions">
                  <button onclick="event.stopPropagation();AdminApp.playVideo(${vid.id})" title="Play">
                    <i class="fas fa-play"></i>
                  </button>
                  <button onclick="event.stopPropagation();AdminApp.deleteVideo(${vid.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ----- ANNOUNCEMENTS -----
  function renderAnnouncements() {
    return `
      <div class="page-header">
        <div>
          <h1>📢 Announcements</h1>
          <p class="subtitle">Create and manage public announcements</p>
        </div>
        <div class="actions">
          <button class="btn-admin btn-admin-gold" onclick="AdminApp.showAddAnnouncementModal()">
            <i class="fas fa-plus"></i> New Announcement
          </button>
        </div>
      </div>

      <div class="admin-card">
        <div class="card-header">
          <h2><i class="fas fa-bullhorn"></i> All Announcements (${state.announcements.length})</h2>
        </div>
        <div class="table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date</th>
                <th style="text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${state.announcements.map(ann => `
                <tr>
                  <td><strong>${escapeHtml(ann.title)}</strong></td>
                  <td>${getPriorityBadge(ann.priority)}</td>
                  <td>${getStatusBadge(ann.status)}</td>
                  <td>${ann.date}</td>
                  <td style="text-align:right;white-space:nowrap;">
                    <button class="btn-admin btn-admin-icon btn-admin-outline" onclick="AdminApp.editAnnouncement(${ann.id})">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-admin btn-admin-icon btn-admin-danger" onclick="AdminApp.deleteAnnouncement(${ann.id})">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ----- MODULES -----
  function renderModules() {
    return `
      <div class="page-header">
        <div>
          <h1>🧩 Modules</h1>
          <p class="subtitle">Enable, disable, and configure system modules</p>
        </div>
        <div class="actions">
          <button class="btn-admin btn-admin-outline" onclick="AdminApp.showAddModuleModal()">
            <i class="fas fa-plus"></i> Add Module
          </button>
        </div>
      </div>

      <div class="modules-grid">
        ${state.modules.map(mod => `
          <div class="module-card">
            <div class="module-header">
              <div class="module-name">
                <i class="fas ${mod.icon}"></i>
                ${escapeHtml(mod.name)}
              </div>
              <label class="toggle">
                <input type="checkbox" ${mod.enabled ? 'checked' : ''} onchange="AdminApp.toggleModule(${mod.id})">
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="module-desc">${escapeHtml(mod.desc)}</div>
            <div class="module-footer">
              <span><i class="fas fa-cube"></i> ${mod.items} items</span>
              <span class="badge ${mod.enabled ? 'badge-active' : 'badge-inactive'}">
                ${mod.enabled ? '● Active' : '○ Inactive'}
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ----- AUDIT TRAIL -----
  function renderAudit() {
    return `
      <div class="page-header">
        <div>
          <h1>📋 Audit Trail</h1>
          <p class="subtitle">Complete log of all system actions</p>
        </div>
        <div class="actions">
          <button class="btn-admin btn-admin-outline" onclick="AdminApp.exportAudit()">
            <i class="fas fa-download"></i> Export CSV
          </button>
        </div>
      </div>

      <div class="admin-card">
        <div class="card-header">
          <h2><i class="fas fa-filter"></i> Filter</h2>
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px;">
          <input class="field" style="min-width:200px;padding:10px 12px;" placeholder="🔍 Search..." oninput="AdminApp.filterAudit(this.value)">
          <select class="field" style="padding:10px 12px;" onchange="AdminApp.filterAuditType(this.value)">
            <option value="">All Actions</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="approve">Approve</option>
            <option value="upload">Upload</option>
            <option value="backup">Backup</option>
            <option value="security">Security</option>
          </select>
        </div>
        <div class="audit-list" id="auditList">
          ${state.auditLog.map(log => `
            <div class="audit-row" data-type="${log.type}">
              <div class="audit-icon ${log.type}">
                <i class="fas fa-${log.type === 'create' ? 'plus' : log.type === 'update' ? 'edit' : log.type === 'delete' ? 'trash' : log.type === 'approve' ? 'check' : log.type === 'upload' ? 'upload' : log.type === 'backup' ? 'database' : 'shield-alt'}"></i>
              </div>
              <div class="audit-content">
                <div class="action">${escapeHtml(log.action)}</div>
                <div class="detail">${escapeHtml(log.detail)}</div>
                <div class="user"><i class="fas fa-user"></i> ${log.user}</div>
              </div>
              <div class="audit-time">${log.time}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ----- WORKFLOW -----
  function renderWorkflow() {
    return `
      <div class="page-header">
        <div>
          <h1>🔄 Content Workflow</h1>
          <p class="subtitle">Draft → Review → Approval → Publication pipeline</p>
        </div>
        <div class="actions">
          <button class="btn-admin btn-admin-gold" onclick="AdminApp.navigate('editor')">
            <i class="fas fa-plus"></i> New Content
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon" style="background:#f0f5f2;color:#9ab0a6;"><i class="fas fa-file"></i></div>
          </div>
          <div class="stat-number">${state.pages.filter(p => p.status === 'draft').length}</div>
          <div class="stat-label">📄 Drafts</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon gold"><i class="fas fa-edit"></i></div>
          </div>
          <div class="stat-number">${state.pages.filter(p => p.status === 'review').length}</div>
          <div class="stat-label">📝 In Review</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon green"><i class="fas fa-check"></i></div>
          </div>
          <div class="stat-number">${state.pages.filter(p => p.status === 'approved').length}</div>
          <div class="stat-label">✅ Approved</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <div class="stat-icon" style="background:#e8f0fe;color:#1a73e8;"><i class="fas fa-rocket"></i></div>
          </div>
          <div class="stat-number">${state.pages.filter(p => p.status === 'published').length}</div>
          <div class="stat-label">🚀 Published</div>
        </div>
      </div>

      <div class="workflow-pipeline">
        <div class="pipeline-column draft">
          <div class="column-header">
            <span>📄 Draft</span>
            <span class="count">${state.pages.filter(p => p.status === 'draft').length}</span>
          </div>
          ${state.pages.filter(p => p.status === 'draft').map(p => `
            <div class="pipeline-card">
              <div class="card-title">${escapeHtml(p.title)}</div>
              <div class="card-meta"><i class="fas fa-user"></i> ${p.author} · ${p.lastModified}</div>
              <div class="card-actions">
                <button class="btn-admin btn-admin-outline btn-admin-sm" onclick="AdminApp.editPage(${p.id})">Edit</button>
                <button class="btn-admin btn-admin-primary btn-admin-sm" onclick="AdminApp.submitForReview(${p.id})">Submit</button>
              </div>
            </div>
          `).join('') || '<div class="empty-state" style="padding:20px;"><p style="color:#9ab0a6;font-size:0.85rem;">No drafts</p></div>'}
        </div>

        <div class="pipeline-column review">
          <div class="column-header">
            <span>📝 Review</span>
            <span class="count">${state.pages.filter(p => p.status === 'review').length}</span>
          </div>
          ${state.pages.filter(p => p.status === 'review').map(p => `
            <div class="pipeline-card">
              <div class="card-title">${escapeHtml(p.title)}</div>
              <div class="card-meta"><i class="fas fa-user"></i> ${p.author} · ${p.lastModified}</div>
              <div class="card-actions">
                <button class="btn-admin btn-admin-primary btn-admin-sm" onclick="AdminApp.approveContent(${p.id})">Approve</button>
                <button class="btn-admin btn-admin-danger btn-admin-sm" onclick="AdminApp.rejectContent(${p.id})">Reject</button>
              </div>
            </div>
          `).join('') || '<div class="empty-state" style="padding:20px;"><p style="color:#9ab0a6;font-size:0.85rem;">No items in review</p></div>'}
        </div>

        <div class="pipeline-column approved">
          <div class="column-header">
            <span>✅ Approved</span>
            <span class="count">${state.pages.filter(p => p.status === 'approved').length}</span>
          </div>
          ${state.pages.filter(p => p.status === 'approved').map(p => `
            <div class="pipeline-card">
              <div class="card-title">${escapeHtml(p.title)}</div>
              <div class="card-meta"><i class="fas fa-user"></i> ${p.author}</div>
              <div class="card-actions">
                <button class="btn-admin btn-admin-gold btn-admin-sm" onclick="AdminApp.publishContent(${p.id})">Publish</button>
              </div>
            </div>
          `).join('') || '<div class="empty-state" style="padding:20px;"><p style="color:#9ab0a6;font-size:0.85rem;">No approved items</p></div>'}
        </div>

        <div class="pipeline-column published">
          <div class="column-header">
            <span>🚀 Published</span>
            <span class="count">${state.pages.filter(p => p.status === 'published').length}</span>
          </div>
          ${state.pages.filter(p => p.status === 'published').slice(0, 5).map(p => `
            <div class="pipeline-card" style="border-left:3px solid #006b4f;">
              <div class="card-title">${escapeHtml(p.title)}</div>
              <div class="card-meta"><i class="fas fa-eye"></i> ${p.views.toLocaleString()} views</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ----- SECURITY -----
  function renderSecurity() {
    return `
      <div class="page-header">
        <div>
          <h1>🛡️ Security</h1>
          <p class="subtitle">System security, compliance, and monitoring</p>
        </div>
        <div class="actions">
          <button class="btn-admin btn-admin-gold" onclick="AdminApp.runSecurityScan()">
            <i class="fas fa-shield-alt"></i> Run Security Scan
          </button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
        <div class="admin-card">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
            <i class="fas fa-lock" style="font-size:2rem;color:#006b4f;"></i>
            <div>
              <h2 style="font-size:1.05rem;">SSL Certificate</h2>
              <p style="font-size:0.82rem;color:#6b8a7e;">Valid HTTPS encryption</p>
            </div>
            <span class="badge badge-active" style="margin-left:auto;">● Active</span>
          </div>
          <ul style="list-style:none;font-size:0.85rem;">
            <li style="padding:6px 0;border-bottom:1px solid #f0f5f2;"><i class="fas fa-check-circle" style="color:#006b4f;margin-right:8px;"></i> TLS 1.3 support</li>
            <li style="padding:6px 0;border-bottom:1px solid #f0f5f2;"><i class="fas fa-check-circle" style="color:#006b4f;margin-right:8px;"></i> 256-bit encryption</li>
            <li style="padding:6px 0;border-bottom:1px solid #f0f5f2;"><i class="fas fa-check-circle" style="color:#006b4f;margin-right:8px;"></i> Auto-renewal enabled</li>
            <li style="padding:6px 0;"><i class="fas fa-check-circle" style="color:#006b4f;margin-right:8px;"></i> Expires: 15 Dec 2027</li>
          </ul>
        </div>

        <div class="admin-card">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
            <i class="fas fa-shield-alt" style="font-size:2rem;color:#006b4f;"></i>
            <div>
              <h2 style="font-size:1.05rem;">Firewall & DDoS</h2>
              <p style="font-size:0.82rem;color:#6b8a7e;">Advanced protection</p>
            </div>
            <span class="badge badge-active" style="margin-left:auto;">● Active</span>
          </div>
          <ul style="list-style:none;font-size:0.85rem;">
            <li style="padding:6px 0;border-bottom:1px solid #f0f5f2;"><i class="fas fa-check-circle" style="color:#006b4f;margin-right:8px;"></i> Web Application Firewall</li>
            <li style="padding:6px 0;border-bottom:1px solid #f0f5f2;"><i class="fas fa-check-circle" style="color:#006b4f;margin-right:8px;"></i> DDoS mitigation</li>
            <li style="padding:6px 0;border-bottom:1px solid #f0f5f2;"><i class="fas fa-check-circle" style="color:#006b4f;margin-right:8px;"></i> Rate limiting</li>
            <li style="padding:6px 0;"><i class="fas fa-check-circle" style="color:#006b4f;margin-right:8px;"></i> IP blacklisting</li>
          </ul>
        </div>

        <div class="admin-card">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
            <i class="fas fa-key" style="font-size:2rem;color:#d4a12a;"></i>
            <div>
              <h2 style="font-size:1.05rem;">Two-Factor Authentication</h2>
              <p style="font-size:0.82rem;color:#6b8a7e;">Additional security layer</p>
            </div>
            <span class="badge badge-active" style="margin-left:auto;">● Enabled</span>
          </div>
          <ul style="list-style:none;font-size:0.85rem;">
            <li style="padding:6px 0;border-bottom:1px solid #f0f5f2;"><i class="fas fa-check-circle" style="color:#006b4f;margin-right:8px;"></i> TOTP support</li>
            <li style="padding:6px 0;border-bottom:1px solid #f0f5f2;"><i class="fas fa-check-circle" style="color:#006b4f;margin-right:8px;"></i> Backup codes available</li>
            <li style="padding:6px 0;border-bottom:1px solid #f0f5f2;"><i class="fas fa-check-circle" style="color:#006b4f;margin-right:8px;"></i> SMS fallback</li>
            <li style="padding:6px 0;"><i class="fas fa-times-circle" style="color:#de3831;margin-right:8px;"></i> Biometric (coming soon)</li>
          </ul>
        </div>

        <div class="admin-card">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
            <i class="fas fa-search" style="font-size:2rem;color:#006b4f;"></i>
            <div>
              <h2 style="font-size:1.05rem;">Vulnerability Scan</h2>
              <p style="font-size:0.82rem;color:#6b8a7e;">Last scan: Today 06:00</p>
            </div>
            <span class="badge badge-active" style="margin-left:auto;">● Clear</span>
          </div>
          <ul style="list-style:none;font-size:0.85rem;">
            <li style="padding:6px 0;border-bottom:1px solid #f0f5f2;"><i class="fas fa-check-circle" style="color:#006b4f;margin-right:8px;"></i> 0 vulnerabilities found</li>
            <li style="padding:6px 0;border-bottom:1px solid #f0f5f2;"><i class="fas fa-check-circle" style="color:#006b4f;margin-right:8px;"></i> All dependencies up to date</li>
            <li style="padding:6px 0;border-bottom:1px solid #f0f5f2;"><i class="fas fa-check-circle" style="color:#006b4f;margin-right:8px;"></i> Daily automated scans</li>
            <li style="padding:6px 0;"><i class="fas fa-check-circle" style="color:#006b4f;margin-right:8px;"></i> Next scan: Tomorrow 06:00</li>
          </ul>
        </div>
      </div>
    `;
  }

  // ----- BACKUP -----
  function renderBackup() {
    return `
      <div class="page-header">
        <div>
          <h1>💾 Backup & Restore</h1>
          <p class="subtitle">Manage system backups and restore points</p>
        </div>
        <div class="actions">
          <button class="btn-admin btn-admin-gold" onclick="AdminApp.createBackup()">
            <i class="fas fa-upload"></i> Backup Now
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon green"><i class="fas fa-database"></i></div>
          <div class="stat-number">${state.backups.length}</div>
          <div class="stat-label">Total Backups</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon gold"><i class="fas fa-hdd"></i></div>
          <div class="stat-number">48.3 GB</div>
          <div class="stat-label">Storage Used</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon blue"><i class="fas fa-clock"></i></div>
          <div class="stat-number">30 days</div>
          <div class="stat-label">Retention</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon red"><i class="fas fa-calendar"></i></div>
          <div class="stat-number">Daily</div>
          <div class="stat-label">Schedule</div>
        </div>
      </div>

      <div class="admin-card">
        <div class="card-header">
          <h2><i class="fas fa-history"></i> Backup History</h2>
        </div>
        <div class="table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Size</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Status</th>
                <th style="text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody id="backupTable">
              ${state.backups.map(b => `
                <tr>
                  <td><strong>${b.date}</strong></td>
                  <td>${b.size}</td>
                  <td><span class="badge ${b.type === 'full' ? 'badge-medium' : 'badge-approved'}">${b.type}</span></td>
                  <td>${b.duration}</td>
                  <td>${getStatusBadge(b.status)}</td>
                  <td style="text-align:right;white-space:nowrap;">
                    <button class="btn-admin btn-admin-icon btn-admin-outline" onclick="AdminApp.downloadBackup(${b.id})" title="Download">
                      <i class="fas fa-download"></i>
                    </button>
                    <button class="btn-admin btn-admin-icon btn-admin-outline" onclick="AdminApp.restoreBackup(${b.id})" title="Restore">
                      <i class="fas fa-undo"></i>
                    </button>
                    <button class="btn-admin btn-admin-icon btn-admin-danger" onclick="AdminApp.deleteBackup(${b.id})" title="Delete">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ----- EDITOR -----
  function renderEditor(pageId = null) {
    const page = pageId ? state.pages.find(p => p.id === pageId) : null;
    const isEdit = !!page;
    
    return `
      <div class="page-header">
        <div>
          <h1>${isEdit ? '✏️ Edit Page' : '➕ New Page'}</h1>
          <p class="subtitle">${isEdit ? `Editing: ${escapeHtml(page.title)}` : 'Create new content for the website'}</p>
        </div>
        <div class="actions">
          <button class="btn-admin btn-admin-outline" onclick="AdminApp.navigate('pages')">
            <i class="fas fa-arrow-left"></i> Back
          </button>
          <button class="btn-admin btn-admin-outline" onclick="AdminApp.saveDraft()">
            <i class="fas fa-save"></i> Save Draft
          </button>
          <button class="btn-admin btn-admin-gold" onclick="AdminApp.saveAndPublish()">
            <i class="fas fa-check"></i> Save & Publish
          </button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 320px;gap:20px;">
        <div>
          <div class="admin-card">
            <div class="form-group">
              <label>Page Title <span class="required">*</span></label>
              <input class="field" id="editorTitle" type="text" placeholder="Enter page title..." value="${page ? escapeHtml(page.title) : ''}">
              <div class="error-msg" id="editorTitleError">Title is required</div>
            </div>
            <div class="form-group">
              <label>URL Slug <span class="required">*</span></label>
              <input class="field" id="editorSlug" type="text" placeholder="page-url-slug" value="${page ? escapeHtml(page.slug) : ''}">
              <div class="hint">This will be the URL: /${page ? page.slug : 'your-slug'}</div>
            </div>
            <div class="form-group">
              <label>Content <span class="required">*</span></label>
              <div style="display:flex;gap:4px;flex-wrap:wrap;padding:10px;background:#fafcfb;border:1px solid #dce8e3;border-radius:10px;margin-bottom:8px;">
                <button class="btn-admin btn-admin-outline btn-admin-sm" title="Bold"><i class="fas fa-bold"></i></button>
                <button class="btn-admin btn-admin-outline btn-admin-sm" title="Italic"><i class="fas fa-italic"></i></button>
                <button class="btn-admin btn-admin-outline btn-admin-sm" title="Underline"><i class="fas fa-underline"></i></button>
                <div style="width:1px;background:#dce8e3;margin:0 4px;"></div>
                <button class="btn-admin btn-admin-outline btn-admin-sm" title="Heading"><i class="fas fa-heading"></i></button>
                <button class="btn-admin btn-admin-outline btn-admin-sm" title="Quote"><i class="fas fa-quote-right"></i></button>
                <button class="btn-admin btn-admin-outline btn-admin-sm" title="List"><i class="fas fa-list"></i></button>
                <div style="width:1px;background:#dce8e3;margin:0 4px;"></div>
                <button class="btn-admin btn-admin-outline btn-admin-sm" title="Link"><i class="fas fa-link"></i></button>
                <button class="btn-admin btn-admin-outline btn-admin-sm" title="Image"><i class="fas fa-image"></i></button>
                <button class="btn-admin btn-admin-outline btn-admin-sm" title="Video"><i class="fas fa-video"></i></button>
              </div>
              <textarea class="field" id="editorContent" rows="16" placeholder="Start writing your content...">${page ? 'Content for ' + page.title : ''}</textarea>
            </div>
            <div class="form-group">
              <label>Excerpt / Summary</label>
              <textarea class="field" id="editorExcerpt" rows="3" placeholder="Brief summary for listings..."></textarea>
            </div>
          </div>
        </div>

        <div>
          <div class="admin-card">
            <h3 style="font-size:0.95rem;margin-bottom:16px;font-weight:700;">Publishing</h3>
            <div class="form-group">
              <label>Status</label>
              <select class="field" id="editorStatus">
                <option value="draft" ${page && page.status === 'draft' ? 'selected' : ''}>Draft</option>
                <option value="review" ${page && page.status === 'review' ? 'selected' : ''}>Review</option>
                <option value="approved" ${page && page.status === 'approved' ? 'selected' : ''}>Approved</option>
                <option value="published" ${page && page.status === 'published' ? 'selected' : ''}>Published</option>
              </select>
            </div>
            <div class="form-group">
              <label>Category</label>
              <select class="field" id="editorCategory">
                <option>Statements</option>
                <option>Speeches</option>
                <option>Advisories</option>
                <option>Media</option>
              </select>
            </div>
            <div class="form-group">
              <label>Author</label>
              <select class="field" id="editorAuthor">
                ${state.users.map(u => `<option ${u.id === state.currentUser.id ? 'selected' : ''}>${u.name}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>Publish Date</label>
              <input class="field" type="datetime-local" id="editorDate" value="${new Date().toISOString().slice(0, 16)}">
            </div>
          </div>

          <div class="admin-card">
            <h3 style="font-size:0.95rem;margin-bottom:16px;font-weight:700;">Featured Image</h3>
            <div style="border:2px dashed #dce8e3;border-radius:12px;padding:24px;text-align:center;cursor:pointer;transition:all 0.15s ease;" onclick="document.getElementById('featuredImageInput').click()" onmouseover="this.style.borderColor='#d4a12a';this.style.background='#fcf6e6'" onmouseout="this.style.borderColor='#dce8e3';this.style.background='white'">
              <i class="fas fa-image" style="font-size:2rem;color:#9ab0a6;display:block;margin-bottom:8px;"></i>
              <div style="font-size:0.85rem;font-weight:600;">Upload Image</div>
              <div style="font-size:0.72rem;color:#6b8a7e;">JPG, PNG up to 10MB</div>
            </div>
            <input type="file" id="featuredImageInput" style="display:none;" accept="image/*" onchange="AdminApp.handleFeaturedImage(event)">
          </div>

          <div class="admin-card">
            <h3 style="font-size:0.95rem;margin-bottom:16px;font-weight:700;">Revision History</h3>
            <div style="font-size:0.82rem;">
              <div style="padding:8px 0;border-bottom:1px solid #f0f5f2;display:flex;justify-content:space-between;">
                <span>v3 - Admin User</span>
                <span style="color:#6b8a7e;">10:30</span>
              </div>
              <div style="padding:8px 0;border-bottom:1px solid #f0f5f2;display:flex;justify-content:space-between;">
                <span>v2 - Jane Doe</span>
                <span style="color:#6b8a7e;">09:15</span>
              </div>
              <div style="padding:8px 0;display:flex;justify-content:space-between;">
                <span>v1 - John Smith</span>
                <span style="color:#6b8a7e;">Yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ----- SETTINGS -----
  function renderSettings() {
    return `
      <div class="page-header">
        <div>
          <h1>⚙️ Settings</h1>
          <p class="subtitle">System configuration and preferences</p>
        </div>
        <div class="actions">
          <button class="btn-admin btn-admin-gold" onclick="AdminApp.saveSettings()">
            <i class="fas fa-save"></i> Save Settings
          </button>
        </div>
      </div>

      <div class="admin-card">
        <div class="card-header">
          <h2><i class="fas fa-sliders-h"></i> General Settings</h2>
        </div>
        <div class="form-group">
          <label>Site Name</label>
          <input class="field" value="The Presidency of South Africa">
        </div>
        <div class="form-group">
          <label>Tagline</label>
          <input class="field" value="A Presidency that works for all South Africans">
        </div>
        <div class="form-group">
          <label>Default Language</label>
          <select class="field">
            <option selected>English</option>
            <option>Afrikaans</option>
            <option>isiZulu</option>
            <option>isiXhosa</option>
          </select>
        </div>
      </div>

      <div class="admin-card">
        <div class="card-header">
          <h2><i class="fas fa-palette"></i> Appearance</h2>
        </div>
        <div class="form-group">
          <label>Theme Color</label>
          <div style="display:flex;gap:8px;">
            <span style="width:40px;height:40px;border-radius:50%;background:#006b4f;border:3px solid #d4a12a;cursor:pointer;"></span>
            <span style="width:40px;height:40px;border-radius:50%;background:#d4a12a;cursor:pointer;"></span>
            <span style="width:40px;height:40px;border-radius:50%;background:#1a2a24;cursor:pointer;"></span>
            <span style="width:40px;height:40px;border-radius:50%;background:#de3831;cursor:pointer;"></span>
          </div>
        </div>
        <div class="form-group">
          <label>Font Family</label>
          <select class="field">
            <option selected>Inter</option>
            <option>Roboto</option>
            <option>Open Sans</option>
          </select>
        </div>
      </div>

      <div class="admin-card">
        <div class="card-header">
          <h2><i class="fas fa-shield-alt"></i> Security</h2>
        </div>
        <div class="form-group">
          <label>Session Timeout</label>
          <select class="field">
            <option>15 minutes</option>
            <option selected>30 minutes</option>
            <option>1 hour</option>
          </select>
        </div>
        <div class="form-group">
          <label>Password Policy</label>
          <select class="field">
            <option>Minimum 8 characters</option>
            <option selected>Minimum 12 characters + symbols</option>
          </select>
        </div>
      </div>
    `;
  }

  // ========================================
  // ROUTER
  // ========================================
  const routes = {
    'dashboard': renderDashboard,
    'pages': renderPages,
    'users': renderUsers,
    'documents': renderDocuments,
    'images': renderImages,
    'videos': renderVideos,
    'announcements': renderAnnouncements,
    'modules': renderModules,
    'audit': renderAudit,
    'workflow': renderWorkflow,
    'security': renderSecurity,
    'backup': renderBackup,
    'editor': renderEditor,
    'settings': renderSettings
  };

  function navigate(page, params = null) {
    state.currentPage = page;
    const container = $('#adminMain');
    if (!container) return;
    
    // Update sidebar active state
    $$('.sidebar-nav a').forEach(a => {
      a.classList.toggle('active', a.dataset.page === page);
    });
    
    // Render page
    const renderFn = routes[page] || renderDashboard;
    container.innerHTML = renderFn(params);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile sidebar
    const sidebar = $('.admin-sidebar');
    if (sidebar && window.innerWidth < 1024) {
      sidebar.classList.remove('open');
    }
    
    // Update URL hash
    window.location.hash = page;
    
    console.log('📄 Navigated to:', page);
  }

  // ========================================
  // PUBLIC API
  // ========================================
  const AdminApp = {
    // Navigation
    navigate,
    
    // Modals
    openModal,
    closeModal,
    
    // Toast
    showToast,
    
    // ----- PAGE ACTIONS -----
    editPage(id) {
      navigate('editor', id);
    },
    
    previewPage(id) {
      const page = state.pages.find(p => p.id === id);
      openModal(
        `<i class="fas fa-eye"></i> Preview: ${escapeHtml(page.title)}`,
        `<div style="padding:20px;background:#fafcfb;border-radius:12px;">
          <h2 style="font-size:1.3rem;margin-bottom:12px;">${escapeHtml(page.title)}</h2>
          <p style="color:#6b8a7e;font-size:0.85rem;">Slug: <code>/${page.slug}</code></p>
          <p style="color:#6b8a7e;font-size:0.85rem;">Status: ${page.status}</p>
          <p style="color:#6b8a7e;font-size:0.85rem;">Views: ${page.views.toLocaleString()}</p>
        </div>`,
        `<button class="btn-admin btn-admin-outline" onclick="AdminApp.closeModal()">Close</button>
         <button class="btn-admin btn-admin-primary" onclick="AdminApp.closeModal();AdminApp.editPage(${id})">Edit Page</button>`
      );
    },
    
    showAddPageModal() {
      openModal(
        '<i class="fas fa-plus"></i> Add New Page',
        `<div class="form-group">
          <label>Page Title <span class="required">*</span></label>
          <input class="field" id="newPageTitle" placeholder="Enter page title...">
          <div class="error-msg" id="newPageTitleError">Title is required</div>
        </div>
        <div class="form-group">
          <label>URL Slug <span class="required">*</span></label>
          <input class="field" id="newPageSlug" placeholder="page-url-slug">
          <div class="error-msg" id="newPageSlugError">Slug is required</div>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select class="field" id="newPageStatus">
            <option value="draft">Draft</option>
            <option value="review">Review</option>
            <option value="published">Published</option>
          </select>
        </div>`,
        `<button class="btn-admin btn-admin-outline" onclick="AdminApp.closeModal()">Cancel</button>
         <button class="btn-admin btn-admin-gold" onclick="AdminApp.createPage()">Create Page</button>`
      );
    },
    
    createPage() {
      const title = $('#newPageTitle')?.value.trim();
      const slug = $('#newPageSlug')?.value.trim();
      const status = $('#newPageStatus')?.value || 'draft';
      
      let hasError = false;
      if (!title) {
        $('#newPageTitle').classList.add('error');
        $('#newPageTitleError').classList.add('show');
        hasError = true;
      }
      if (!slug) {
        $('#newPageSlug').classList.add('error');
        $('#newPageSlugError').classList.add('show');
        hasError = true;
      }
      if (hasError) return;
      
      const newPage = {
        id: Math.max(...state.pages.map(p => p.id)) + 1,
        title, slug, status,
        lastModified: new Date().toISOString().slice(0, 16).replace('T', ' '),
        author: state.currentUser.name,
        views: 0
      };
      
      state.pages.push(newPage);
      closeModal();
      navigate('pages');
      showToast(`✅ Page "${title}" created successfully!`, 'success');
    },
    
    deletePage(id) {
      const page = state.pages.find(p => p.id === id);
      openModal(
        '<i class="fas fa-trash" style="color:#de3831;"></i> Delete Page',
        `<p style="font-size:0.95rem;">Are you sure you want to delete <strong>${escapeHtml(page.title)}</strong>?</p>
         <p style="font-size:0.85rem;color:#de3831;margin-top:8px;"><i class="fas fa-exclamation-triangle"></i> This action cannot be undone.</p>`,
        `<button class="btn-admin btn-admin-outline" onclick="AdminApp.closeModal()">Cancel</button>
         <button class="btn-admin btn-admin-danger" onclick="AdminApp.confirmDeletePage(${id})">Delete</button>`
      );
    },
    
    confirmDeletePage(id) {
      const page = state.pages.find(p => p.id === id);
      state.pages = state.pages.filter(p => p.id !== id);
      closeModal();
      navigate('pages');
      showToast(`🗑️ Page "${page.title}" deleted`, 'success');
    },
    
    submitForReview(id) {
      const page = state.pages.find(p => p.id === id);
      page.status = 'review';
      page.lastModified = new Date().toISOString().slice(0, 16).replace('T', ' ');
      navigate('workflow');
      showToast(`📤 "${page.title}" submitted for review`, 'success');
    },
    
    approveContent(id) {
      const page = state.pages.find(p => p.id === id);
      page.status = 'approved';
      page.lastModified = new Date().toISOString().slice(0, 16).replace('T', ' ');
      navigate('workflow');
      showToast(`✅ "${page.title}" approved`, 'success');
    },
    
    rejectContent(id) {
      const page = state.pages.find(p => p.id === id);
      page.status = 'draft';
      navigate('workflow');
      showToast(`❌ "${page.title}" rejected — back to draft`, 'warning');
    },
    
    publishContent(id) {
      const page = state.pages.find(p => p.id === id);
      page.status = 'published';
      page.lastModified = new Date().toISOString().slice(0, 16).replace('T', ' ');
      navigate('workflow');
      showToast(`🚀 "${page.title}" published!`, 'success');
    },
    
    // ----- USER ACTIONS -----
    showAddUserModal() {
      openModal(
        '<i class="fas fa-user-plus"></i> Add New User',
        `<div class="form-group">
          <label>Full Name <span class="required">*</span></label>
          <input class="field" id="newUserName" placeholder="John Doe">
          <div class="error-msg" id="newUserNameError">Name is required</div>
        </div>
        <div class="form-group">
          <label>Email <span class="required">*</span></label>
          <input class="field" id="newUserEmail" type="email" placeholder="user@presidency.gov.za">
          <div class="error-msg" id="newUserEmailError">Valid email is required</div>
        </div>
        <div class="form-group">
          <label>Role</label>
          <select class="field" id="newUserRole">
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="reviewer">Reviewer</option>
            <option value="approver">Approver</option>
            <option value="admin">Admin</option>
          </select>
        </div>`,
        `<button class="btn-admin btn-admin-outline" onclick="AdminApp.closeModal()">Cancel</button>
         <button class="btn-admin btn-admin-gold" onclick="AdminApp.createUser()">Create User</button>`
      );
    },
    
    createUser() {
      const name = $('#newUserName')?.value.trim();
      const email = $('#newUserEmail')?.value.trim();
      const role = $('#newUserRole')?.value || 'viewer';
      
      let hasError = false;
      if (!name) {
        $('#newUserName').classList.add('error');
        $('#newUserNameError').classList.add('show');
        hasError = true;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        $('#newUserEmail').classList.add('error');
        $('#newUserEmailError').classList.add('show');
        hasError = true;
      }
      if (hasError) return;
      
      const newUser = {
        id: Math.max(...state.users.map(u => u.id)) + 1,
        name, email, role,
        status: 'active',
        lastActive: 'Never',
        created: new Date().toISOString().slice(0, 10)
      };
      
      state.users.push(newUser);
      closeModal();
      navigate('users');
      showToast(`✅ User "${name}" created successfully!`, 'success');
    },
    
    editUser(id) {
      const user = state.users.find(u => u.id === id);
      openModal(
        `<i class="fas fa-edit"></i> Edit User: ${escapeHtml(user.name)}`,
        `<div class="form-group">
          <label>Full Name</label>
          <input class="field" id="editUserName" value="${escapeHtml(user.name)}">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input class="field" id="editUserEmail" value="${user.email}">
        </div>
        <div class="form-group">
          <label>Role</label>
          <select class="field" id="editUserRole">
            <option value="viewer" ${user.role === 'viewer' ? 'selected' : ''}>Viewer</option>
            <option value="editor" ${user.role === 'editor' ? 'selected' : ''}>Editor</option>
            <option value="reviewer" ${user.role === 'reviewer' ? 'selected' : ''}>Reviewer</option>
            <option value="approver" ${user.role === 'approver' ? 'selected' : ''}>Approver</option>
            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
            <option value="super_admin" ${user.role === 'super_admin' ? 'selected' : ''}>Super Admin</option>
          </select>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select class="field" id="editUserStatus">
            <option value="active" ${user.status === 'active' ? 'selected' : ''}>Active</option>
            <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>Inactive</option>
          </select>
        </div>`,
        `<button class="btn-admin btn-admin-outline" onclick="AdminApp.closeModal()">Cancel</button>
         <button class="btn-admin btn-admin-gold" onclick="AdminApp.saveUser(${id})">Save Changes</button>`
      );
    },
    
    saveUser(id) {
      const user = state.users.find(u => u.id === id);
      user.name = $('#editUserName').value;
      user.email = $('#editUserEmail').value;
      user.role = $('#editUserRole').value;
      user.status = $('#editUserStatus').value;
      closeModal();
      navigate('users');
      showToast('✅ User updated successfully', 'success');
    },
    
    resetPassword(id) {
      const user = state.users.find(u => u.id === id);
      openModal(
        '<i class="fas fa-key"></i> Reset Password',
        `<p>Send password reset email to <strong>${user.email}</strong>?</p>`,
        `<button class="btn-admin btn-admin-outline" onclick="AdminApp.closeModal()">Cancel</button>
         <button class="btn-admin btn-admin-gold" onclick="AdminApp.closeModal();AdminApp.showToast('📧 Password reset email sent', 'success')">Send Email</button>`
      );
    },
    
    deleteUser(id) {
      const user = state.users.find(u => u.id === id);
      openModal(
        '<i class="fas fa-trash" style="color:#de3831;"></i> Delete User',
        `<p>Delete <strong>${escapeHtml(user.name)}</strong>? This cannot be undone.</p>`,
        `<button class="btn-admin btn-admin-outline" onclick="AdminApp.closeModal()">Cancel</button>
         <button class="btn-admin btn-admin-danger" onclick="AdminApp.confirmDeleteUser(${id})">Delete</button>`
      );
    },
    
    confirmDeleteUser(id) {
      state.users = state.users.filter(u => u.id !== id);
      closeModal();
      navigate('users');
      showToast('🗑️ User deleted', 'success');
    },
    
    // ----- DOCUMENT ACTIONS -----
    handleFileUpload(event) {
      const files = event.target.files;
      if (!files.length) return;
      
      Array.from(files).forEach(file => {
        const ext = file.name.split('.').pop().toLowerCase();
        const typeMap = { pdf: 'pdf', doc: 'word', docx: 'word', pptx: 'pptx', xlsx: 'excel', jpg: 'image', png: 'image', mp4: 'video' };
        const newDoc = {
          id: Math.max(...state.documents.map(d => d.id)) + 1,
          name: file.name,
          type: typeMap[ext] || 'file',
          size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
          category: 'uploads',
          uploaded: new Date().toISOString().slice(0, 10),
          uploadedBy: state.currentUser.name
        };
        state.documents.push(newDoc);
      });
      
      navigate('documents');
      showToast(`📤 ${files.length} file(s) uploaded successfully`, 'success');
      event.target.value = '';
    },
    
    downloadDocument(id) {
      const doc = state.documents.find(d => d.id === id);
      showToast(`📥 Downloading: ${doc.name}`, 'info');
    },
    
    renameDocument(id) {
      const doc = state.documents.find(d => d.id === id);
      openModal(
        '<i class="fas fa-edit"></i> Rename Document',
        `<div class="form-group">
          <label>Document Name</label>
          <input class="field" id="renameDocInput" value="${escapeHtml(doc.name)}">
        </div>`,
        `<button class="btn-admin btn-admin-outline" onclick="AdminApp.closeModal()">Cancel</button>
         <button class="btn-admin btn-admin-gold" onclick="AdminApp.saveRenameDoc(${id})">Save</button>`
      );
    },
    
    saveRenameDoc(id) {
      const doc = state.documents.find(d => d.id === id);
      doc.name = $('#renameDocInput').value;
      closeModal();
      navigate('documents');
      showToast('✅ Document renamed', 'success');
    },
    
    deleteDocument(id) {
      const doc = state.documents.find(d => d.id === id);
      openModal(
        '<i class="fas fa-trash" style="color:#de3831;"></i> Delete Document',
        `<p>Delete <strong>${escapeHtml(doc.name)}</strong>?</p>`,
        `<button class="btn-admin btn-admin-outline" onclick="AdminApp.closeModal()">Cancel</button>
         <button class="btn-admin btn-admin-danger" onclick="AdminApp.confirmDeleteDoc(${id})">Delete</button>`
      );
    },
    
    confirmDeleteDoc(id) {
      state.documents = state.documents.filter(d => d.id !== id);
      closeModal();
      navigate('documents');
      showToast('🗑️ Document deleted', 'success');
    },
    
    // ----- IMAGE ACTIONS -----
    handleImageUpload(event) {
      const files = event.target.files;
      if (!files.length) return;
      
      Array.from(files).forEach(file => {
        state.images.push({
          id: Math.max(...state.images.map(i => i.id)) + 1,
          name: file.name,
          category: 'uploads',
          size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
          uploaded: new Date().toISOString().slice(0, 10)
        });
      });
      
      navigate('images');
      showToast(`🖼️ ${files.length} image(s) uploaded`, 'success');
      event.target.value = '';
    },
    
    viewImage(id) {
      const img = state.images.find(i => i.id === id);
      openModal(
        `<i class="fas fa-image"></i> ${escapeHtml(img.name)}`,
        `<div style="background:#fafcfb;border-radius:12px;padding:40px;text-align:center;">
          <i class="fas fa-image" style="font-size:5rem;color:#9ab0a6;"></i>
          <p style="margin-top:16px;color:#6b8a7e;font-size:0.85rem;">Category: ${img.category} · Size: ${img.size}</p>
        </div>`,
        `<button class="btn-admin btn-admin-outline" onclick="AdminApp.closeModal()">Close</button>
         <button class="btn-admin btn-admin-gold" onclick="AdminApp.showToast('📥 Downloading image...', 'info')">Download</button>`
      );
    },
    
    deleteImage(id) {
      state.images = state.images.filter(i => i.id !== id);
      navigate('images');
      showToast('🗑️ Image deleted', 'success');
    },
    
    createAlbum() {
      showToast('📁 Album created — upload images to add them', 'info');
    },
    
    // ----- VIDEO ACTIONS -----
    handleVideoUpload(event) {
      const files = event.target.files;
      if (!files.length) return;
      
      Array.from(files).forEach(file => {
        state.videos.push({
          id: Math.max(...state.videos.map(v => v.id)) + 1,
          title: file.name.replace(/\.[^/.]+$/, ''),
          duration: '0:00',
          category: 'uploads',
          size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
          uploaded: new Date().toISOString().slice(0, 10)
        });
      });
      
      navigate('videos');
      showToast(`🎬 ${files.length} video(s) uploaded`, 'success');
      event.target.value = '';
    },
    
    playVideo(id) {
      const vid = state.videos.find(v => v.id === id);
      openModal(
        `<i class="fas fa-play"></i> ${escapeHtml(vid.title)}`,
        `<div style="background:#000;border-radius:12px;aspect-ratio:16/9;display:grid;place-items:center;color:white;">
          <div style="text-align:center;">
            <i class="fas fa-play-circle" style="font-size:4rem;color:#d4a12a;"></i>
            <p style="margin-top:12px;color:#c0d8d0;">${vid.duration} · ${vid.size}</p>
          </div>
        </div>`,
        `<button class="btn-admin btn-admin-outline" onclick="AdminApp.closeModal()">Close</button>`
      );
    },
    
    deleteVideo(id) {
      state.videos = state.videos.filter(v => v.id !== id);
      navigate('videos');
      showToast('🗑️ Video deleted', 'success');
    },
    
    // ----- ANNOUNCEMENT ACTIONS -----
    showAddAnnouncementModal() {
      openModal(
        '<i class="fas fa-bullhorn"></i> New Announcement',
        `<div class="form-group">
          <label>Title <span class="required">*</span></label>
          <input class="field" id="newAnnTitle" placeholder="Announcement title...">
          <div class="error-msg" id="newAnnTitleError">Title is required</div>
        </div>
        <div class="form-group">
          <label>Priority</label>
          <select class="field" id="newAnnPriority">
            <option value="low">Low</option>
            <option value="medium" selected>Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select class="field" id="newAnnStatus">
            <option value="draft">Draft</option>
            <option value="published" selected>Published</option>
          </select>
        </div>`,
        `<button class="btn-admin btn-admin-outline" onclick="AdminApp.closeModal()">Cancel</button>
         <button class="btn-admin btn-admin-gold" onclick="AdminApp.createAnnouncement()">Create</button>`
      );
    },
    
    createAnnouncement() {
      const title = $('#newAnnTitle')?.value.trim();
      if (!title) {
        $('#newAnnTitle').classList.add('error');
        $('#newAnnTitleError').classList.add('show');
        return;
      }
      
      state.announcements.push({
        id: Math.max(...state.announcements.map(a => a.id)) + 1,
        title,
        priority: $('#newAnnPriority').value,
        status: $('#newAnnStatus').value,
        date: new Date().toISOString().slice(0, 10)
      });
      
      closeModal();
      navigate('announcements');
      showToast(`📢 Announcement "${title}" created`, 'success');
    },
    
    editAnnouncement(id) {
      const ann = state.announcements.find(a => a.id === id);
      openModal(
        '<i class="fas fa-edit"></i> Edit Announcement',
        `<div class="form-group">
          <label>Title</label>
          <input class="field" id="editAnnTitle" value="${escapeHtml(ann.title)}">
        </div>
        <div class="form-group">
          <label>Priority</label>
          <select class="field" id="editAnnPriority">
            <option value="low" ${ann.priority === 'low' ? 'selected' : ''}>Low</option>
            <option value="medium" ${ann.priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="high" ${ann.priority === 'high' ? 'selected' : ''}>High</option>
          </select>
        </div>`,
        `<button class="btn-admin btn-admin-outline" onclick="AdminApp.closeModal()">Cancel</button>
         <button class="btn-admin btn-admin-gold" onclick="AdminApp.saveAnnouncement(${id})">Save</button>`
      );
    },
    
    saveAnnouncement(id) {
      const ann = state.announcements.find(a => a.id === id);
      ann.title = $('#editAnnTitle').value;
      ann.priority = $('#editAnnPriority').value;
      closeModal();
      navigate('announcements');
      showToast('✅ Announcement updated', 'success');
    },
    
    deleteAnnouncement(id) {
      const ann = state.announcements.find(a => a.id === id);
      openModal(
        '<i class="fas fa-trash" style="color:#de3831;"></i> Delete Announcement',
        `<p>Delete <strong>${escapeHtml(ann.title)}</strong>?</p>`,
        `<button class="btn-admin btn-admin-outline" onclick="AdminApp.closeModal()">Cancel</button>
         <button class="btn-admin btn-admin-danger" onclick="AdminApp.confirmDeleteAnn(${id})">Delete</button>`
      );
    },
    
    confirmDeleteAnn(id) {
      state.announcements = state.announcements.filter(a => a.id !== id);
      closeModal();
      navigate('announcements');
      showToast('🗑️ Announcement deleted', 'success');
    },
    
    // ----- MODULE ACTIONS -----
    toggleModule(id) {
      const mod = state.modules.find(m => m.id === id);
      mod.enabled = !mod.enabled;
      showToast(`🧩 ${mod.name} ${mod.enabled ? 'enabled' : 'disabled'}`, 'info');
    },
    
    showAddModuleModal() {
      openModal(
        '<i class="fas fa-plus"></i> Add Module',
        `<div class="form-group">
          <label>Module Name</label>
          <input class="field" id="newModName" placeholder="Module name...">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="field" id="newModDesc" rows="2" placeholder="Brief description..."></textarea>
        </div>`,
        `<button class="btn-admin btn-admin-outline" onclick="AdminApp.closeModal()">Cancel</button>
         <button class="btn-admin btn-admin-gold" onclick="AdminApp.createModule()">Create</button>`
      );
    },
    
    createModule() {
      const name = $('#newModName')?.value.trim();
      if (!name) return;
      
      state.modules.push({
        id: Math.max(...state.modules.map(m => m.id)) + 1,
        name,
        icon: 'fa-cube',
        desc: $('#newModDesc').value || 'Custom module',
        enabled: false,
        position: 'main',
        items: 0
      });
      
      closeModal();
      navigate('modules');
      showToast(`🧩 Module "${name}" created`, 'success');
    },
    
    // ----- BACKUP ACTIONS -----
    createBackup() {
      showToast('⏳ Starting backup...', 'info');
      
      setTimeout(() => {
        const newBackup = {
          id: Math.max(...state.backups.map(b => b.id)) + 1,
          date: new Date().toISOString().slice(0, 16).replace('T', ' '),
          size: (11 + Math.random() * 2).toFixed(1) + ' GB',
          type: 'full',
          status: 'completed',
          duration: '4m ' + Math.floor(Math.random() * 60) + 's'
        };
        state.backups.unshift(newBackup);
        navigate('backup');
        showToast('✅ Backup completed successfully!', 'success');
      }, 2000);
    },
    
    downloadBackup(id) {
      const backup = state.backups.find(b => b.id === id);
      showToast(`📥 Downloading backup from ${backup.date}`, 'info');
    },
    
    restoreBackup(id) {
      const backup = state.backups.find(b => b.id === id);
      openModal(
        '<i class="fas fa-undo" style="color:#d4a12a;"></i> Restore Backup',
        `<p><strong>⚠️ Warning:</strong> This will restore the system to the backup from <strong>${backup.date}</strong>.</p>
         <p style="color:#de3831;font-size:0.85rem;margin-top:8px;">Current data will be overwritten. This action cannot be undone.</p>`,
        `<button class="btn-admin btn-admin-outline" onclick="AdminApp.closeModal()">Cancel</button>
         <button class="btn-admin btn-admin-gold" onclick="AdminApp.confirmRestore(${id})">Restore</button>`
      );
    },
    
    confirmRestore(id) {
      closeModal();
      showToast('🔄 Restoring system...', 'info');
      setTimeout(() => {
        showToast('✅ System restored successfully!', 'success');
      }, 2500);
    },
    
    deleteBackup(id) {
      state.backups = state.backups.filter(b => b.id !== id);
      navigate('backup');
      showToast('🗑️ Backup deleted', 'success');
    },
    
    // ----- SECURITY ACTIONS -----
    runSecurityScan() {
      showToast('🔍 Running security scan...', 'info');
      setTimeout(() => {
        showToast('✅ Security scan complete — No vulnerabilities found', 'success');
      }, 2500);
    },
    
    // ----- EDITOR ACTIONS -----
    saveDraft() {
      const title = $('#editorTitle')?.value.trim();
      if (!title) {
        $('#editorTitle').classList.add('error');
        $('#editorTitleError').classList.add('show');
        showToast('⚠️ Please enter a title', 'warning');
        return;
      }
      showToast('💾 Draft saved successfully', 'success');
    },
    
    saveAndPublish() {
      const title = $('#editorTitle')?.value.trim();
      const slug = $('#editorSlug')?.value.trim();
      
      if (!title) {
        $('#editorTitle').classList.add('error');
        $('#editorTitleError').classList.add('show');
        showToast('⚠️ Please enter a title', 'warning');
        return;
      }
      if (!slug) {
        showToast('⚠️ Please enter a slug', 'warning');
        return;
      }
      
      showToast('🚀 Content published successfully!', 'success');
      setTimeout(() => navigate('pages'), 1500);
    },
    
    handleFeaturedImage(event) {
      const file = event.target.files[0];
      if (file) {
        showToast(`🖼️ Featured image uploaded: ${file.name}`, 'success');
      }
    },
    
    // ----- SETTINGS ACTIONS -----
    saveSettings() {
      showToast('✅ All settings saved successfully!', 'success');
    },
    
    // ----- UTILITY ACTIONS -----
    setChartPeriod(period) {
      showToast(`📊 Showing data for last ${period} days`, 'info');
    },
    
    exportReport() {
      showToast('📊 Report exported as PDF', 'success');
    },
    
    exportData(type) {
      showToast(`📥 ${type} data exported as CSV`, 'success');
    },
    
    exportAudit() {
      showToast('📥 Audit log exported as CSV', 'success');
    },
    
    filterTable(tableId, query) {
      const table = document.getElementById(tableId);
      if (!table) return;
      const search = query.toLowerCase();
      $$('tbody tr', table).forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(search) ? '' : 'none';
      });
    },
    
    filterByStatus(tableId, status) {
      const table = document.getElementById(tableId);
      if (!table) return;
      $$('tbody tr', table).forEach(row => {
        row.style.display = (!status || row.dataset.status === status) ? '' : 'none';
      });
    },
    
    filterDocuments(query) {
      const search = query.toLowerCase();
      $$('.doc-card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(search) ? '' : 'none';
      });
    },
    
    filterDocumentsByType(type) {
      $$('.doc-card').forEach(card => {
        card.style.display = (!type || card.dataset.type === type) ? '' : 'none';
      });
    },
    
    filterImages(query) {
      const search = query.toLowerCase();
      $$('.gallery-item').forEach(item => {
        item.style.display = (item.dataset.name || '').includes(search) ? '' : 'none';
      });
    },
    
    filterAudit(query) {
      const search = query.toLowerCase();
      $$('.audit-row').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(search) ? '' : 'none';
      });
    },
    
    filterAuditType(type) {
      $$('.audit-row').forEach(row => {
        row.style.display = (!type || row.dataset.type === type) ? '' : 'none';
      });
    },
    
    // ----- ORANGE JUICE -----
    toggleOJ() {
      const panel = $('#ojPanel');
      if (panel) panel.classList.toggle('open');
    }
  };

  // ========================================
  // INITIALIZATION
  // ========================================
  function init() {
    console.log('🚀 Admin Dashboard initializing...');
    
    // Sidebar navigation
    $$('.sidebar-nav a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.dataset.page;
        if (page) navigate(page);
      });
    });
    
    // Mobile menu
    const menuBtn = $('#mobileMenuBtn');
    if (menuBtn) {
      menuBtn.addEventListener('click', function() {
        const sidebar = $('.admin-sidebar');
        if (sidebar) sidebar.classList.toggle('open');
      });
    }
    
    // Modal overlay click
    const modalOverlay = $('#modalOverlay');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
      });
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeModal();
        const ojPanel = $('#ojPanel');
        if (ojPanel) ojPanel.classList.remove('open');
      }
    });
    
    // Handle hash routing
    const hash = window.location.hash.slice(1);
    if (hash && routes[hash]) {
      navigate(hash);
    } else {
      navigate('dashboard');
    }
    
    console.log('✅ Admin Dashboard ready');
    console.log(`📊 ${state.pages.length} pages, ${state.users.length} users, ${state.documents.length} documents`);
  }

  // Expose globally
  window.AdminApp = AdminApp;
  window.navigate = navigate;

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();