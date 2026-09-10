// ========================================
// SEARCH — Intelligent Search Engine
// Fuzzy matching, autocomplete, smart ranking
// ========================================

(function() {
  'use strict';

  // ----- DOM Elements -----
  const searchToggle = document.querySelector('[data-search]');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const closeSearchBtn = document.getElementById('closeSearch');

  // ----- Search State -----
  let searchHistory = [];
  let searchIndex = 0;

  // ----- Search Functions -----
  function performSearch(query) {
    if (!query || query.length < 2) {
      return PRESIDENCY_DATA.search.slice(0, 6);
    }

    const q = query.toLowerCase().trim();
    const results = [];
    
    // Score and sort results
    PRESIDENCY_DATA.search.forEach(item => {
      const searchableText = (item.title + ' ' + item.type + ' ' + item.date).toLowerCase();
      let score = 0;
      
      // Exact match bonus
      if (searchableText.includes(q)) {
        score += 10;
        // Bonus for title match
        if (item.title.toLowerCase().includes(q)) {
          score += 15;
        }
      }
      
      // Word-by-word matching
      const words = q.split(' ');
      words.forEach(word => {
        if (searchableText.includes(word)) {
          score += 3;
          if (item.title.toLowerCase().includes(word)) {
            score += 5;
          }
        }
      });
      
      // Fuzzy matching - character by character
      let charMatches = 0;
      const searchChars = q.split('');
      const textChars = searchableText.replace(/\s/g, '').split('');
      
      searchChars.forEach(char => {
        if (textChars.includes(char)) {
          charMatches++;
        }
      });
      
      if (charMatches > 0) {
        score += charMatches * 0.5;
      }
      
      // Type bonus
      if (q.includes('news') && item.type === 'Statement') score += 2;
      if (q.includes('speech') && item.type === 'Speech') score += 2;
      if (q.includes('priority') && item.type === 'Priority') score += 2;
      if (q.includes('programme') && item.type === 'Programme') score += 2;
      
      if (score > 0) {
        results.push({ ...item, score });
      }
    });
    
    // Sort by score descending
    results.sort((a, b) => b.score - a.score);
    
    // Return top 10 results
    return results.slice(0, 10);
  }

  // ----- UI Rendering -----
  function renderResults(results) {
    if (!searchResults) return;
    
    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-result" style="color:var(--text-muted);padding:var(--space-4) 0;text-align:center;">
          <i class="fas fa-search" style="font-size:1.5rem;display:block;margin-bottom:var(--space-2);"></i>
          No results found. Try different keywords.
        </div>
      `;
      return;
    }

    searchResults.innerHTML = results.map(function(item) {
      const iconMap = {
        'Statement': 'fas fa-file-alt',
        'Speech': 'fas fa-microphone-alt',
        'Priority': 'fas fa-flag',
        'Programme': 'fas fa-rocket',
        'Tenders': 'fas fa-clipboard',
        'Public Service': 'fas fa-headset',
        'Leadership': 'fas fa-user-tie',
        'Planning': 'fas fa-road',
        'Media': 'fas fa-newspaper',
        'Publication': 'fas fa-book',
        'Location': 'fas fa-map-marker-alt',
        'Government': 'fas fa-university',
        'Policy': 'fas fa-gavel',
      };
      
      const icon = iconMap[item.type] || 'fas fa-circle';
      
      // Highlight matching text
      let title = item.title;
      if (item.score > 5) {
        // Add highlight for strong matches
        title = `<mark style="background:rgba(212,161,42,0.2);padding:0 2px;">${title}</mark>`;
      }
      
      return `
        <a class="search-result" href="${item.url}" style="display:flex;align-items:flex-start;gap:var(--space-3);padding:var(--space-3) var(--space-4);border-bottom:1px solid var(--line);transition:all 0.2s;border-radius:var(--radius-sm);">
          <div style="width:36px;height:36px;border-radius:50%;background:var(--gold-50);color:var(--gold-500);display:grid;place-items:center;flex-shrink:0;font-size:0.85rem;">
            <i class="${icon}"></i>
          </div>
          <div style="flex:1;">
            <strong style="display:block;font-size:0.95rem;">${title}</strong>
            <div style="display:flex;gap:var(--space-3);font-size:0.75rem;color:var(--text-muted);margin-top:var(--space-1);flex-wrap:wrap;">
              <span class="tag" style="background:var(--gold-50);color:var(--gold-500);padding:0 var(--space-2);border-radius:var(--radius-full);font-weight:600;">${item.type}</span>
              <span>${item.date}</span>
            </div>
          </div>
          <div style="color:var(--gold-500);font-size:0.8rem;align-self:center;">
            <i class="fas fa-arrow-right"></i>
          </div>
        </a>
      `;
    }).join('');
  }

  // ----- Search Controls -----
  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function() {
      if (searchInput) searchInput.focus();
    }, 100);
  }

  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    if (searchResults) {
      searchResults.innerHTML = '<div class="search-result" style="color:var(--text-muted);padding:var(--space-3) 0;">Start typing to search across this site.</div>';
    }
  }

  // ----- Event Listeners -----
  
  // Toggle search
  if (searchToggle) {
    searchToggle.addEventListener('click', openSearch);
  }

  // Close overlay
  if (searchOverlay) {
    searchOverlay.addEventListener('click', function(e) {
      if (e.target === searchOverlay) {
        closeSearch();
      }
    });
  }

  if (closeSearchBtn) {
    closeSearchBtn.addEventListener('click', closeSearch);
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('open')) {
      closeSearch();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (searchOverlay && searchOverlay.classList.contains('open')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value;
      const results = performSearch(query);
      renderResults(results);
    });

    // Keyboard navigation through results
    searchInput.addEventListener('keydown', function(e) {
      const results = document.querySelectorAll('.search-result');
      if (results.length === 0) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        searchIndex = Math.min(searchIndex + 1, results.length - 1);
        results.forEach((el, i) => {
          el.style.background = i === searchIndex ? 'var(--gold-50)' : 'transparent';
        });
        if (results[searchIndex]) {
          results[searchIndex].scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        searchIndex = Math.max(searchIndex - 1, 0);
        results.forEach((el, i) => {
          el.style.background = i === searchIndex ? 'var(--gold-50)' : 'transparent';
        });
        if (results[searchIndex]) {
          results[searchIndex].scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'Enter') {
        const activeResult = results[searchIndex];
        if (activeResult) {
          window.location.href = activeResult.getAttribute('href');
        }
      }
    });
  }

  // ----- Initialization -----
  console.log('🔍 Search engine initialized with ' + PRESIDENCY_DATA.search.length + ' items');
  console.log('⌨️ Shortcut: Ctrl+K to toggle search');

})();