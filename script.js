// ========================================
// THE PRESIDENCY — INTERACTIONS v3.0
// Production-ready with working chatbot
// ========================================

(function() {
  'use strict';

  // ----- DOM Helpers -----
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // ----- Toast System -----
  function showToast(message, type = 'info') {
    const t = $('.toast');
    if (!t) return;
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };
    t.innerHTML = `<span class="icon">${icons[type] || 'ℹ️'}</span> ${message}`;
    t.className = 'toast show';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 3000);
  }

  // ========================================
  // CHATBOT — Working AI-like assistant
  // ========================================
  
  // Knowledge base for the chatbot
  const knowledgeBase = {
    // General greetings
    'hello': 'Hello! 👋 Welcome to The Presidency of South Africa. How can I assist you today?',
    'hi': 'Hi there! 🇿🇦 I\'m here to help you with information about The Presidency.',
    'hey': 'Hey! How can I help you with information about The Presidency?',
    'good morning': 'Good morning! 🌅 How can I assist you with The Presidency today?',
    'good afternoon': 'Good afternoon! ☀️ What can I help you find?',
    'good evening': 'Good evening! 🌙 How can I assist you with The Presidency?',
    
    // About the Presidency
    'what is the presidency': 'The Presidency is the apex of the executive system of government in South Africa. It supports the President and Deputy President in leading a government that works for all South Africans. The Presidency coordinates Cabinet, national planning, and government-wide oversight.',
    'what does the presidency do': 'The Presidency coordinates government action across South Africa. Key functions include: supporting the President and Deputy President, coordinating Cabinet, national planning and oversight, and public communication through speeches, statements, and media services.',
    'who is the president': 'President Cyril Ramaphosa is the Head of State and Government of the Republic of South Africa. He was inaugurated for the Seventh Administration on 19 June 2024.',
    'who is cyril ramaphosa': 'Cyril Ramaphosa is the President of South Africa, inaugurated on 19 June 2024 for the Seventh Administration. He is a former trade union leader, businessman, and played a key role in South Africa\'s transition to democracy.',
    'who is the deputy president': 'Deputy President Paul Mashatile serves alongside President Ramaphosa in the Seventh Administration, supporting the President in executive leadership and government coordination.',
    'seventh administration': 'The Seventh Administration began with the inauguration of President Cyril Ramaphosa on 19 June 2024. It is focused on three strategic priorities: inclusive growth and job creation, reducing poverty and the cost of living, and building a capable, ethical developmental state.',

    // Priorities
    'what are the priorities': 'The Seventh Administration has three strategic priorities: 1️⃣ Inclusive growth and job creation — accelerate economic reform, infrastructure investment, and pathways to work. 2️⃣ Reduce poverty and the cost of living — strengthen the social wage, support households, and improve access to essential services. 3️⃣ A capable, ethical, and developmental state — build institutions that are professional, accountable, and effective.',
    'national priorities': 'The national priorities are: 1️⃣ Inclusive growth & job creation, 2️⃣ Reduce poverty & the cost of living, and 3️⃣ A capable, ethical & developmental state. These are outlined in the Medium-Term Development Plan (MTDP) 2025–2030.',
    'mtdp': 'The Medium-Term Development Plan (MTDP) 2025–2030 sets out the three strategic priorities for the Seventh Administration: inclusive growth and job creation, reducing poverty and the cost of living, and building a capable, ethical developmental state.',
    'medium term development plan': 'The MTDP 2025–2030 is the government\'s strategic framework for the Seventh Administration, focusing on three priorities: inclusive growth and job creation, reducing poverty and the cost of living, and building a capable, ethical developmental state.',
    
    // Programmes
    'programmes': 'Key flagship programmes coordinated by The Presidency include: Operation Vulindlela (economic reform), District Development Model (integrated planning), Presidential Infrastructure Coordinating Commission (infrastructure investment), Presidential Employment Stimulus (job creation), Government-Business Partnership, Climate coordination, State-owned enterprise reform, and Youth development coordination.',
    'operation vulindlela': 'Operation Vulindlela is a joint reform programme focused on overcoming binding constraints to economic growth. It is coordinated by The Presidency and National Treasury to accelerate structural economic reforms.',
    'what is operation vulindlela': 'Operation Vulindlela is a reform programme aimed at accelerating structural economic reforms in South Africa. It addresses constraints to growth and is coordinated by The Presidency and National Treasury.',
    'district development model': 'The District Development Model (DDM) is an integrated planning and delivery approach across the three spheres of government, centred on districts as the primary locus of service delivery.',
    'ddm': 'DDM stands for District Development Model. It coordinates government planning and delivery across national, provincial, and local government, with districts as the focus for service delivery.',
    'presidential employment stimulus': 'The Presidential Employment Stimulus (PES) supports public employment, livelihoods, and pathways into work for unemployed South Africans, particularly young people.',
    'employment stimulus': 'The Presidential Employment Stimulus creates opportunities for unemployed South Africans through public employment, livelihood support, and pathways to work.',
    'picc': 'The Presidential Infrastructure Coordinating Commission (PICC) supports strategic infrastructure investment and implementation across the economy.',
    'government business partnership': 'The Government-Business Partnership mobilises business capability alongside government to address priority constraints and accelerate economic recovery.',
    'soe reform': 'State-owned enterprise reform strengthens the governance, performance, and strategic role of public enterprises, with a focus on energy, logistics, and transport.',
    'youth development': 'Youth development coordination creates opportunities for learning, employment, entrepreneurship, and participation across government, business, and civil society.',
    'climate coordination': 'Climate coordination supports a just transition and coherent national responses to climate change, including adaptation, mitigation, and green growth.',

    // Contact & Hotline
    'contact': 'You can contact The Presidency through: 📞 Presidential Hotline: 17737 (toll-free, Mon–Fri, 08:00–16:00), 📧 Use the enquiry form on our contact page, or visit the official website for more information.',
    'hotline': 'The Presidential Hotline is 17737. It gives citizens a route to escalate unresolved government service-delivery matters. It\'s toll-free and available Monday–Friday, 08:00–16:00.',
    '17737': '17737 is the Presidential Hotline. It\'s toll-free and available Monday–Friday, 08:00–16:00 for service-delivery matters.',
    'phone number': 'The Presidential Hotline number is 17737. It\'s toll-free and available Monday–Friday, 08:00–16:00.',
    'email': 'You can use the enquiry form on our contact page to send an email to The Presidency. For urgent service-delivery matters, call the Presidential Hotline at 17737.',

    // News & Media
    'news': 'The Presidency publishes official statements, advisories, and speeches. Visit the News & Statements page for the latest communications from the President, Deputy President, and The Presidency.',
    'statements': 'Official statements from The Presidency include press statements, advisories, and announcements from the President, Deputy President, and Cabinet. Visit the News page for all statements.',
    'speeches': 'Speeches by the President and Deputy President are available on the Speeches page. They include keynotes, addresses, and public remarks on national issues.',
    'media room': 'The Media Room contains statements, advisories, speeches, multimedia resources, publications, and the diary of the Principals.',
    'publications': 'Publications from The Presidency include the Annual Performance Plan, Strategic Plan, and other official documents. Find them in the Media Room resources section.',

    // Procurement
    'procurement': 'Procurement opportunities at The Presidency are published on the Procurement page. View open tenders for cleaning services, software systems, stationery, and more.',
    'tenders': 'Tenders and procurement opportunities at The Presidency are listed on the Procurement page. Current opportunities include cleaning services, GRC software, stationery supplies, and catering services.',
    'tender': 'View all current tenders on the Procurement page. Open opportunities include cleaning and hygiene consumables, GRC system software, and stationery and office supplies.',

    // Service delivery
    'service delivery': 'For unresolved service-delivery matters, call the Presidential Hotline at 17737 (toll-free, Mon–Fri, 08:00–16:00). You can also use the contact form on our website.',
    'complaint': 'To escalate a service-delivery complaint, call the Presidential Hotline at 17737. It\'s toll-free and available Monday–Friday, 08:00–16:00.',
    'help': 'I\'m here to help! You can ask me about: • The Presidency and its role • National priorities and programmes • Contact information and the hotline • News, statements, and speeches • Procurement opportunities • Service delivery support',
    'information': 'I can provide information about The Presidency, national priorities, programmes, speeches, news, procurement, and how to contact us. What would you like to know?',

    // Default responses
    'default': 'I\'m here to help with information about The Presidency of South Africa. You can ask me about: 🇿🇦 The Presidency and its role 📋 National priorities and programmes 📞 Contact information and the hotline 📰 News, statements, and speeches 📑 Procurement opportunities 🏛️ Service delivery support'
  };

  // Chatbot response function
  function getChatResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Check for exact matches first
    if (knowledgeBase[message]) {
      return knowledgeBase[message];
    }
    
    // Check for partial matches
    for (const [key, response] of Object.entries(knowledgeBase)) {
      if (key !== 'default' && message.includes(key)) {
        return response;
      }
    }
    
    // Check for keywords
    const keywords = {
      'president': 'President Cyril Ramaphosa is the Head of State of South Africa, inaugurated on 19 June 2024 for the Seventh Administration. The Presidency supports him in leading government.',
      'deputy': 'Deputy President Paul Mashatile supports the President in executive leadership and government coordination.',
      'priority': 'The three national priorities are: 1️⃣ Inclusive growth & job creation, 2️⃣ Reduce poverty & the cost of living, 3️⃣ A capable, ethical & developmental state.',
      'programme': 'Key programmes include Operation Vulindlela, District Development Model, Presidential Infrastructure Coordinating Commission, and Presidential Employment Stimulus.',
      'hotline': 'The Presidential Hotline is 17737. It\'s toll-free and available Monday–Friday, 08:00–16:00.',
      'contact': 'Call the Presidential Hotline at 17737 or use the contact form on our website.',
      'speech': 'Speeches by the President and Deputy President are available on the Speeches page.',
      'news': 'Visit the News page for official statements, advisories, and announcements from The Presidency.',
      'tender': 'View current procurement opportunities on the Procurement page.',
      'service': 'For service-delivery matters, call the Presidential Hotline at 17737.',
      'help': 'I can help with information about The Presidency, priorities, programmes, contact details, news, speeches, and procurement. What would you like to know?',
      'thanks': 'You\'re welcome! 🇿🇦 Is there anything else I can help you with?',
      'thank you': 'You\'re welcome! 🇿🇦 Is there anything else I can help you with?',
      'bye': 'Goodbye! 🇿🇦 Feel free to come back if you have more questions about The Presidency.',
      'goodbye': 'Goodbye! 🇿🇦 Feel free to come back if you have more questions about The Presidency.'
    };
    
    for (const [key, response] of Object.entries(keywords)) {
      if (message.includes(key)) {
        return response;
      }
    }
    
    return knowledgeBase['default'];
  }

  // ========================================
  // CHATBOT UI - FIXED WITH PROPER ERROR HANDLING
  // ========================================
  
  // Get elements - with null checks
  const chatToggle = document.getElementById('chatToggle');
  const chatWindow = document.getElementById('chatWindow');
  const chatClose = document.getElementById('chatClose');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatMessages = document.getElementById('chatMessages');
  const suggestions = document.querySelectorAll('.suggestion');

  // LOG TO CONSOLE FOR DEBUGGING
  console.log('Chat elements found:', {
    chatToggle: !!chatToggle,
    chatWindow: !!chatWindow,
    chatClose: !!chatClose,
    chatInput: !!chatInput,
    chatSend: !!chatSend,
    chatMessages: !!chatMessages
  });

  // Only set up chat if ALL required elements exist
  if (chatToggle && chatWindow && chatMessages) {
    console.log('✅ Chat elements found, setting up chat...');
    
    // Toggle chat window on button click
    chatToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      console.log('Chat toggle clicked');
      chatWindow.classList.toggle('open');
      console.log('Chat window open class:', chatWindow.classList.contains('open'));
    });

    // Close chat button
    if (chatClose) {
      chatClose.addEventListener('click', function() {
        console.log('Chat close clicked');
        chatWindow.classList.remove('open');
      });
    }

    // Close chat when clicking outside
    document.addEventListener('click', function(e) {
      if (chatWindow.classList.contains('open')) {
        const container = document.querySelector('.chatbot-container');
        if (container && !container.contains(e.target)) {
          chatWindow.classList.remove('open');
        }
      }
    });

    // Send message function
    function sendMessage() {
      if (!chatInput || !chatMessages) return;
      
      const message = chatInput.value.trim();
      if (!message) return;

      // Add user message
      const userDiv = document.createElement('div');
      userDiv.className = 'message user';
      userDiv.innerHTML = `<div class="bubble">${message}</div>`;
      chatMessages.appendChild(userDiv);

      // Clear input
      chatInput.value = '';

      // Get bot response
      const response = getChatResponse(message);

      // Add bot message with typing effect
      setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'message bot';
        botDiv.innerHTML = `<div class="bubble">${response}</div>`;
        chatMessages.appendChild(botDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 300);

      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message on click
    if (chatSend) {
      chatSend.addEventListener('click', sendMessage);
    }

    // Send message on Enter key
    if (chatInput) {
      chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendMessage();
        }
      });
    }

    // Suggestion clicks
    suggestions.forEach(function(suggestion) {
      suggestion.addEventListener('click', function() {
        const text = this.textContent;
        if (chatInput) {
          chatInput.value = text;
          sendMessage();
        }
      });
    });

  } else {
    console.warn('⚠️ Chat elements not found. Chat will not work.');
  }

  // ========================================
  // SEARCH SYSTEM
  // ========================================

  const searchData = [
    ['SADC Chairperson President Ramaphosa extends condolences to President Hassan of Tanzania', 'Statement', '08 Sep 2026', 'news.html'],
    ['The Presidency invites nominations for National Orders', 'Advisory', '08 Sep 2026', 'news.html'],
    ['Keynote address at the SAPS National Commemoration Day', 'Speech', '06 Sep 2026', 'speeches.html'],
    ['Inaugural Nokuthula Simelane Memorial Lecture', 'Speech', '03 Sep 2026', 'speeches.html'],
    ['President appoints new head of Special Investigating Unit', 'Statement', '31 Aug 2026', 'news.html'],
    ['Inclusive growth and job creation', 'Priority', 'Seventh Administration', 'priorities.html'],
    ['Operation Vulindlela', 'Programme', 'Economic reform', 'programmes.html'],
    ['Presidential Hotline: 17737', 'Public Service', 'Citizen support', 'contact.html'],
    ['Procurement opportunities', 'Tenders', 'The Presidency', 'procurement.html'],
    ['District Development Model', 'Programme', 'Integrated planning', 'programmes.html'],
    ['Presidential Employment Stimulus', 'Programme', 'Job creation', 'programmes.html'],
    ['Government–Business Partnership', 'Programme', 'Collaboration', 'programmes.html'],
    ['State-owned enterprise reform', 'Programme', 'Governance', 'programmes.html'],
    ['Youth development coordination', 'Programme', 'Empowerment', 'programmes.html'],
    ['Annual Performance Plan 2026/27', 'Publication', 'Strategic', 'index.html'],
    ['President Cyril Ramaphosa', 'Leadership', 'Seventh Administration', 'administration.html'],
    ['Deputy President Paul Mashatile', 'Leadership', 'Seventh Administration', 'administration.html'],
    ['Medium-Term Development Plan 2025–2030', 'Planning', 'National priorities', 'priorities.html'],
    ['Presidential Infrastructure Coordinating Commission', 'Programme', 'Infrastructure', 'programmes.html'],
    ['Cabinet statements', 'Media', 'Latest news', 'news.html']
  ];

  function performSearch(query) {
    if (!query || query.length < 2) {
      return searchData.slice(0, 6);
    }
    const q = query.toLowerCase().trim();
    return searchData
      .filter(item => item.join(' ').toLowerCase().includes(q))
      .slice(0, 10);
  }

  const searchToggle = document.querySelector('[data-search]');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', function() {
      searchOverlay.classList.add('open');
      setTimeout(function() {
        if (searchInput) searchInput.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    });
  }

  if (searchOverlay) {
    searchOverlay.addEventListener('click', function(e) {
      if (e.target === searchOverlay) {
        closeSearch();
      }
    });
  }

  document.getElementById('closeSearch')?.addEventListener('click', closeSearch);

  function closeSearch() {
    if (searchOverlay) searchOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    if (searchResults) {
      searchResults.innerHTML = '<div class="search-result" style="color:var(--text-muted);padding:var(--space-3) 0;">Start typing to search across this site.</div>';
    }
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay?.classList.contains('open')) {
      closeSearch();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (searchToggle) searchToggle.click();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const results = performSearch(e.target.value);
      if (!searchResults) return;
      if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result" style="color:var(--text-muted);padding:var(--space-3) 0;">No results found.</div>';
        return;
      }
      searchResults.innerHTML = results.map(function(item) {
        return `
          <a class="search-result" href="${item[3]}">
            <strong>${item[0]}</strong>
            <div class="meta">
              <span class="tag">${item[1]}</span>
              <span>${item[2]}</span>
            </div>
          </a>
        `;
      }).join('');
    });
  }

  // ========================================
  // DROPDOWN MENUS
  // ========================================

  document.querySelectorAll('.drop-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const drop = this.closest('.drop');
      const isOpen = drop.classList.contains('open');
      document.querySelectorAll('.drop.open').forEach(function(d) {
        if (d !== drop) d.classList.remove('open');
      });
      drop.classList.toggle('open');
      this.setAttribute('aria-expanded', !isOpen);
    });

    btn.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const drop = this.closest('.drop');
        if (drop) drop.classList.remove('open');
        this.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('click', function(e) {
    document.querySelectorAll('.drop.open').forEach(function(drop) {
      if (!drop.contains(e.target)) {
        drop.classList.remove('open');
        const btn = drop.querySelector('.drop-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ========================================
  // MOBILE NAV
  // ========================================

  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function() {
      const isOpen = mobileNav.classList.toggle('open');
      this.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      this.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.addEventListener('click', function(e) {
      if (e.target.tagName === 'A' || e.target.closest('button')) {
        mobileNav.classList.remove('open');
        if (menuBtn) {
          menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
          menuBtn.setAttribute('aria-label', 'Open menu');
        }
        document.body.style.overflow = '';
      }
    });
  }

  // ========================================
  // ACCESSIBILITY PANEL
  // ========================================

  const accessToggle = document.getElementById('accessToggle');
  const accessPanel = document.querySelector('.access-panel');

  if (accessToggle && accessPanel) {
    accessToggle.addEventListener('click', function() {
      accessPanel.classList.toggle('open');
    });
  }

  // Font scaling
  function getFontScale() {
    return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-scale')) || 1;
  }

  function setFontScale(value) {
    const clamped = Math.min(Math.max(value, 0.85), 1.3);
    document.documentElement.style.setProperty('--font-scale', clamped);
    localStorage.setItem('pres-font-scale', clamped);
    return clamped;
  }

  document.getElementById('fontPlus')?.addEventListener('click', function() {
    const newScale = setFontScale(getFontScale() + 0.08);
    showToast(`Text size: ${Math.round(newScale * 100)}%`, 'info');
  });

  document.getElementById('fontMinus')?.addEventListener('click', function() {
    const newScale = setFontScale(getFontScale() - 0.08);
    showToast(`Text size: ${Math.round(newScale * 100)}%`, 'info');
  });

  // Restore font scale
  const savedScale = localStorage.getItem('pres-font-scale');
  if (savedScale) {
    setFontScale(parseFloat(savedScale));
  }

  // ========================================
  // FILTER SYSTEM
  // ========================================

  function setupFilters() {
    const searchField = document.getElementById('filterSearch');
    const typeField = document.getElementById('filterType');

    function applyFilters() {
      const searchTerm = searchField?.value?.toLowerCase() || '';
      const typeFilter = typeField?.value || 'all';
      const cards = document.querySelectorAll('.listcard');

      cards.forEach(function(card) {
        const text = card.textContent.toLowerCase();
        const type = card.dataset.type || '';
        const matchesSearch = text.includes(searchTerm);
        const matchesType = typeFilter === 'all' || type === typeFilter;
        card.style.display = (matchesSearch && matchesType) ? 'grid' : 'none';
      });

      const visible = document.querySelectorAll('.listcard[style*="grid"]');
      const countEl = document.getElementById('resultCount');
      if (countEl) {
        countEl.textContent = visible.length + ' results';
      }
    }

    if (searchField) searchField.addEventListener('input', applyFilters);
    if (typeField) typeField.addEventListener('change', applyFilters);
  }

  setupFilters();

  // ========================================
  // SCROLL REVEAL
  // ========================================

  if ('IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.section, .card, .priority, .program, .admin, .cta, .listcard, .feature-card, .issue-card, .announcement-item');

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry, index) {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.opacity = '0';
          el.style.transform = 'translateY(30px)';
          el.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ' + (index * 0.04) + 's, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ' + (index * 0.04) + 's';
          requestAnimationFrame(function() {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          });
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // ========================================
  // ACTIVE NAV LINK
  // ========================================

  function setActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a, .mobile-nav a').forEach(function(link) {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  setActiveNav();

  // ========================================
  // SMOOTH ANCHOR SCROLL
  // ========================================

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // FORM HANDLING
  // ========================================

  document.querySelectorAll('form[data-demo]').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const message = this.dataset.message || '✅ Your request has been received.';
      showToast(message, 'success');
      this.reset();
    });
  });

  // ========================================
  // SCROLL TO TOP
  // ========================================
  
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });

    scrollBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========================================
  // NAV CHAT TOGGLE (Menu buttons) - FIXED
  // ========================================
  
  const navChatBtn = document.getElementById('navChatToggle');
  const mobileChatBtn = document.getElementById('mobileChatToggle');

  function openChatFromMenu() {
    console.log('Opening chat from menu...');
    if (!chatWindow) {
      console.warn('Chat window not found');
      showToast('💬 Chat feature loading...', 'info');
      return;
    }
    chatWindow.classList.add('open');
    console.log('Chat opened');

    // Close mobile nav if open
    if (mobileNav && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      if (menuBtn) {
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        menuBtn.setAttribute('aria-label', 'Open menu');
      }
      document.body.style.overflow = '';
    }
  }

  if (navChatBtn) {
    navChatBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Nav chat button clicked');
      if (chatWindow && chatWindow.classList.contains('open')) {
        chatWindow.classList.remove('open');
        console.log('Chat closed');
      } else {
        openChatFromMenu();
      }
    });
  }

  if (mobileChatBtn) {
    mobileChatBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Mobile chat button clicked');
      if (chatWindow && chatWindow.classList.contains('open')) {
        chatWindow.classList.remove('open');
        console.log('Chat closed');
      } else {
        openChatFromMenu();
      }
    });
  }

  // ========================================
  // KEYBOARD SHORTCUTS
  // ========================================
  
  document.addEventListener('keydown', function(e) {
    // Ctrl+Shift+U to scroll to top
    if (e.ctrlKey && e.shiftKey && e.key === 'U') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });

  // ========================================
  // INITIALIZATION
  // ========================================

  console.log('🇿🇦 The Presidency — Modern Redesign v3.0');
  console.log('Built with ❤️ for the Republic of South Africa');
  console.log('💬 Chatbot ready — ask me anything about The Presidency!');
  console.log('⬆️ Scroll to top button active');
  console.log('⌨️ Shortcut: Ctrl+Shift+U to scroll to top');

})();