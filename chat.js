// ========================================
// CHAT — Intelligent Chatbot
// Context-aware, data-driven assistant
// ========================================

(function() {
  'use strict';

  // ----- DOM Elements -----
  const chatToggle = document.getElementById('chatToggle');
  const chatWindow = document.getElementById('chatWindow');
  const chatClose = document.getElementById('chatClose');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatMessages = document.getElementById('chatMessages');
  const suggestions = document.querySelectorAll('.suggestion');
  const navChatBtn = document.getElementById('navChatToggle');
  const mobileChatBtn = document.getElementById('mobileChatToggle');

  // ----- Chat State -----
  let chatHistory = [];
  let isChatOpen = false;
  let isTyping = false;

  // ----- Helper Functions -----
  function getChatResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Merge all knowledge bases
    const allData = {};
    Object.values(PRESIDENCY_DATA.chatbot).forEach(category => {
      Object.assign(allData, category);
    });

    // Check for exact matches
    if (allData[message]) {
      return allData[message];
    }

    // Check for partial matches with priority scoring
    let bestMatch = null;
    let bestScore = 0;

    for (const [key, response] of Object.entries(allData)) {
      if (key === 'default') continue;
      
      // Calculate match score
      let score = 0;
      const words = message.split(' ');
      const keyWords = key.split(' ');
      
      words.forEach(word => {
        if (key.includes(word)) score += 2;
      });
      
      keyWords.forEach(word => {
        if (message.includes(word)) score += 1;
      });
      
      // Bonus for exact phrase match
      if (message.includes(key)) score += 5;
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = response;
      }
    }

    if (bestMatch && bestScore > 0) {
      return bestMatch;
    }

    // Check keywords
    const keywords = {
      'president': 'President Cyril Ramaphosa is the Head of State of South Africa. He was inaugurated on 19 June 2024 for the Seventh Administration. He is a former trade union leader and played a key role in South Africa\'s transition to democracy.',
      'deputy': 'Deputy President Paul Mashatile supports the President in executive leadership and government coordination. He was appointed on 7 March 2023.',
      'priority': 'The three national priorities are: 1️⃣ Inclusive growth & job creation, 2️⃣ Reduce poverty & the cost of living, 3️⃣ A capable, ethical & developmental state.',
      'programme': 'Key programmes include Operation Vulindlela (economic reform), District Development Model (integrated planning), and Presidential Employment Stimulus (job creation).',
      'hotline': 'The Presidential Hotline is 17737. It\'s toll-free and available Monday–Friday, 08:00–16:00.',
      'contact': 'Call the Presidential Hotline at 17737, email president@presidency.gov.za, or use the contact form.',
      'speech': 'Speeches by the President and Deputy President are available on the Speeches page.',
      'news': 'Visit the News page for official statements, advisories, and announcements from The Presidency.',
      'tender': 'View current procurement opportunities on the Procurement page.',
      'service': 'For service-delivery matters, call the Presidential Hotline at 17737.',
      'help': 'I can help with information about The Presidency, priorities, programmes, contact details, news, speeches, and procurement. What would you like to know?',
      'thanks': 'You\'re welcome! 🇿🇦 Is there anything else I can help you with?',
      'thank you': 'You\'re welcome! 🇿🇦 Is there anything else I can help you with?',
      'bye': 'Goodbye! 🇿🇦 Feel free to come back if you have more questions.',
      'goodbye': 'Goodbye! 🇿🇦 Feel free to come back if you have more questions.',
      'who': 'I can tell you about the President, Deputy President, and the Seventh Administration. Who would you like to know about?',
      'what': 'I can explain the national priorities, programmes, and the role of The Presidency. What specific topic interests you?',
      'where': 'The Presidency is located at the Union Buildings in Pretoria and Tuynhuys in Cape Town.',
      'when': 'The Seventh Administration began on 19 June 2024 with President Ramaphosa\'s inauguration.',
      'why': 'The Seventh Administration focuses on three priorities to address South Africa\'s challenges: inclusive growth, poverty reduction, and building state capacity.',
    };

    for (const [key, response] of Object.entries(keywords)) {
      if (message.includes(key)) {
        return response;
      }
    }

    return PRESIDENCY_DATA.chatbot.default;
  }

  // ----- Message Handling -----
  function addMessage(type, content) {
    if (!chatMessages) return;
    
    const div = document.createElement('div');
    div.className = `message ${type}`;
    div.innerHTML = `<div class="bubble">${content}</div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Save to history
    chatHistory.push({ type, content, timestamp: new Date() });
  }

  function sendMessage() {
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message || isTyping) return;

    // Add user message
    addMessage('user', message);
    chatInput.value = '';
    isTyping = true;

    // Get response with typing delay
    const response = getChatResponse(message);
    
    // Simulate thinking
    const thinkingDelay = 300 + Math.random() * 400;
    
    setTimeout(() => {
      addMessage('bot', response);
      isTyping = false;
    }, thinkingDelay);
  }

  // ----- Chat Window Controls -----
  function openChat() {
    if (!chatWindow) return;
    chatWindow.classList.add('open');
    isChatOpen = true;
    
    // Hide scroll button when chat is open
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.pointerEvents = 'none';
    }
    
    setTimeout(() => {
      if (chatInput) chatInput.focus();
    }, 300);
  }

  function closeChat() {
    if (!chatWindow) return;
    chatWindow.classList.remove('open');
    isChatOpen = false;
    
    // Restore scroll button visibility
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn && window.scrollY > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.pointerEvents = 'auto';
    }
  }

  function toggleChat() {
    if (isChatOpen) {
      closeChat();
    } else {
      openChat();
    }
  }

  // ----- Event Listeners -----
  
  // Chat toggle button
  if (chatToggle) {
    chatToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleChat();
    });
  }

  // Close button
  if (chatClose) {
    chatClose.addEventListener('click', closeChat);
  }

  // Send button
  if (chatSend) {
    chatSend.addEventListener('click', sendMessage);
  }

  // Enter key
  if (chatInput) {
    chatInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Suggestion buttons
  suggestions.forEach(function(suggestion) {
    suggestion.addEventListener('click', function() {
      if (chatInput) {
        chatInput.value = this.textContent;
        sendMessage();
      }
    });
  });

  // Close chat on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isChatOpen) {
      closeChat();
    }
  });

  // Close chat when clicking outside
  document.addEventListener('click', function(e) {
    if (isChatOpen) {
      const container = document.querySelector('.chatbot-container');
      if (container && !container.contains(e.target)) {
        closeChat();
      }
    }
  });

  // Navigation chat buttons
  if (navChatBtn) {
    navChatBtn.addEventListener('click', function(e) {
      e.preventDefault();
      toggleChat();
      
      // Close mobile nav if open
      const mobileNav = document.querySelector('.mobile-nav');
      const menuBtn = document.querySelector('.menu-btn');
      if (mobileNav && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        if (menuBtn) {
          menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
          menuBtn.setAttribute('aria-label', 'Open menu');
        }
        document.body.style.overflow = '';
      }
    });
  }

  if (mobileChatBtn) {
    mobileChatBtn.addEventListener('click', function(e) {
      e.preventDefault();
      toggleChat();
    });
  }

  // ----- Initialization -----
  console.log('💬 Chatbot initialized with ' + Object.keys(PRESIDENCY_DATA.chatbot).length + ' knowledge categories');
  console.log('📚 Total search items: ' + PRESIDENCY_DATA.search.length);

})();