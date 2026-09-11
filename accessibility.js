// ========================================
// ACCESSIBILITY — Premium Panel v2.0
// Complete a11y suite with 12+ features
// ========================================

(function() {
  'use strict';

  // ========================================
  // DOM ELEMENTS
  // ========================================
  const accessToggle = document.getElementById('accessToggle');
  const accessPanel = document.querySelector('.access-panel');
  const accessMenu = document.querySelector('.access-menu');

  // ========================================
  // STATE
  // ========================================
  const state = {
    fontScale: 1,
    highContrast: false,
    reducedMotion: false,
    dyslexiaFont: false,
    lineHeight: 1.6,
    letterSpacing: 0,
    highlightLinks: false,
    bigCursor: false,
    focusOutline: false,
    readAloud: false,
    isSpeaking: false
  };

  // Configuration
  const CONFIG = {
    MIN_SCALE: 0.85,
    MAX_SCALE: 1.3,
    FONT_STEP: 0.08,
    MIN_LINE_HEIGHT: 1.2,
    MAX_LINE_HEIGHT: 2.2,
    LINE_STEP: 0.1,
    MIN_LETTER_SPACING: 0,
    MAX_LETTER_SPACING: 3,
    LETTER_STEP: 0.5,
    STORAGE_PREFIX: 'pres-a11y-'
  };

  // ========================================
  // UTILITIES
  // ========================================
  function announce(message) {
    // Screen reader announcement using ARIA live region
    let announcer = document.getElementById('a11y-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'a11y-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;';
      document.body.appendChild(announcer);
    }
    announcer.textContent = '';
    setTimeout(() => {
      announcer.textContent = message;
    }, 100);
  }

  function showToast(message, type = 'info') {
    // Use existing toast if available, else create one
    const t = document.querySelector('.toast');
    if (t) {
      const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };
      t.innerHTML = `<span class="icon">${icons[type] || 'ℹ️'}</span> ${message}`;
      t.className = 'toast show';
      clearTimeout(t._timer);
      t._timer = setTimeout(() => t.classList.remove('show'), 3000);
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(CONFIG.STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {}
  }

  function load(key, fallback) {
    try {
      const stored = localStorage.getItem(CONFIG.STORAGE_PREFIX + key);
      return stored !== null ? JSON.parse(stored) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  // ========================================
  // 1. FONT SCALING
  // ========================================
  function setFontScale(value) {
    const clamped = Math.min(Math.max(value, CONFIG.MIN_SCALE), CONFIG.MAX_SCALE);
    state.fontScale = clamped;
    document.documentElement.style.setProperty('--font-scale', clamped);
    save('fontScale', clamped);
    updateFontScaleDisplay();
    return clamped;
  }

  function increaseFont() {
    const newScale = setFontScale(state.fontScale + CONFIG.FONT_STEP);
    const percent = Math.round(newScale * 100);
    showToast(`Text size: ${percent}%`, 'info');
    announce(`Text size increased to ${percent} percent`);
  }

  function decreaseFont() {
    const newScale = setFontScale(state.fontScale - CONFIG.FONT_STEP);
    const percent = Math.round(newScale * 100);
    showToast(`Text size: ${percent}%`, 'info');
    announce(`Text size decreased to ${percent} percent`);
  }

  function resetFont() {
    setFontScale(1);
    showToast('Text size reset to 100%', 'success');
    announce('Text size reset to 100 percent');
  }

  function updateFontScaleDisplay() {
    const display = document.getElementById('fontScaleDisplay');
    if (display) {
      display.textContent = Math.round(state.fontScale * 100) + '%';
    }
  }

  // ========================================
  // 2. HIGH CONTRAST MODE
  // ========================================
  function toggleContrast() {
    state.highContrast = !state.highContrast;
    if (state.highContrast) {
      document.documentElement.setAttribute('data-high-contrast', 'true');
      showToast('🔆 High contrast mode ON', 'success');
      announce('High contrast mode enabled');
    } else {
      document.documentElement.removeAttribute('data-high-contrast');
      showToast('🔆 High contrast mode OFF', 'info');
      announce('High contrast mode disabled');
    }
    save('highContrast', state.highContrast);
    updateToggleState('contrastToggle', state.highContrast);
  }

  // ========================================
  // 3. REDUCED MOTION
  // ========================================
  function toggleReducedMotion() {
    state.reducedMotion = !state.reducedMotion;
    if (state.reducedMotion) {
      document.documentElement.setAttribute('data-reduced-motion', 'true');
      showToast('🎬 Reduced motion ON', 'success');
      announce('Reduced motion enabled. Animations will be minimized.');
    } else {
      document.documentElement.removeAttribute('data-reduced-motion');
      showToast('🎬 Reduced motion OFF', 'info');
      announce('Reduced motion disabled. Animations restored.');
    }
    save('reducedMotion', state.reducedMotion);
    updateToggleState('motionToggle', state.reducedMotion);
  }

  // ========================================
  // 4. DYSLEXIA-FRIENDLY FONT
  // ========================================
  function toggleDyslexiaFont() {
    state.dyslexiaFont = !state.dyslexiaFont;
    if (state.dyslexiaFont) {
      document.documentElement.setAttribute('data-dyslexia-font', 'true');
      showToast('📖 Dyslexia-friendly font ON', 'success');
      announce('Dyslexia-friendly font enabled');
    } else {
      document.documentElement.removeAttribute('data-dyslexia-font');
      showToast('📖 Dyslexia-friendly font OFF', 'info');
      announce('Dyslexia-friendly font disabled');
    }
    save('dyslexiaFont', state.dyslexiaFont);
    updateToggleState('dyslexiaToggle', state.dyslexiaFont);
  }

  // ========================================
  // 5. LINE HEIGHT ADJUSTMENT
  // ========================================
  function setLineHeight(value) {
    const clamped = Math.min(Math.max(value, CONFIG.MIN_LINE_HEIGHT), CONFIG.MAX_LINE_HEIGHT);
    state.lineHeight = clamped;
    document.documentElement.style.setProperty('--line-height-scale', clamped);
    save('lineHeight', clamped);
    updateLineHeightDisplay();
    return clamped;
  }

  function increaseLineHeight() {
    const newValue = setLineHeight(state.lineHeight + CONFIG.LINE_STEP);
    showToast(`Line height: ${newValue.toFixed(1)}`, 'info');
    announce(`Line height increased to ${newValue.toFixed(1)}`);
  }

  function decreaseLineHeight() {
    const newValue = setLineHeight(state.lineHeight - CONFIG.LINE_STEP);
    showToast(`Line height: ${newValue.toFixed(1)}`, 'info');
    announce(`Line height decreased to ${newValue.toFixed(1)}`);
  }

  function updateLineHeightDisplay() {
    const display = document.getElementById('lineHeightDisplay');
    if (display) {
      display.textContent = state.lineHeight.toFixed(1);
    }
  }

  // ========================================
  // 6. LETTER SPACING
  // ========================================
  function setLetterSpacing(value) {
    const clamped = Math.min(Math.max(value, CONFIG.MIN_LETTER_SPACING), CONFIG.MAX_LETTER_SPACING);
    state.letterSpacing = clamped;
    document.documentElement.style.setProperty('--letter-spacing-scale', clamped + 'px');
    save('letterSpacing', clamped);
    updateLetterSpacingDisplay();
    return clamped;
  }

  function increaseLetterSpacing() {
    const newValue = setLetterSpacing(state.letterSpacing + CONFIG.LETTER_STEP);
    showToast(`Letter spacing: ${newValue}px`, 'info');
    announce(`Letter spacing increased to ${newValue} pixels`);
  }

  function decreaseLetterSpacing() {
    const newValue = setLetterSpacing(state.letterSpacing - CONFIG.LETTER_STEP);
    showToast(`Letter spacing: ${newValue}px`, 'info');
    announce(`Letter spacing decreased to ${newValue} pixels`);
  }

  function updateLetterSpacingDisplay() {
    const display = document.getElementById('letterSpacingDisplay');
    if (display) {
      display.textContent = state.letterSpacing + 'px';
    }
  }

  // ========================================
  // 7. LINK HIGHLIGHTING
  // ========================================
  function toggleLinkHighlight() {
    state.highlightLinks = !state.highlightLinks;
    if (state.highlightLinks) {
      document.documentElement.setAttribute('data-highlight-links', 'true');
      showToast('🔗 Link highlighting ON', 'success');
      announce('Link highlighting enabled');
    } else {
      document.documentElement.removeAttribute('data-highlight-links');
      showToast('🔗 Link highlighting OFF', 'info');
      announce('Link highlighting disabled');
    }
    save('highlightLinks', state.highlightLinks);
    updateToggleState('linkToggle', state.highlightLinks);
  }

  // ========================================
  // 8. BIG CURSOR MODE
  // ========================================
  function toggleBigCursor() {
    state.bigCursor = !state.bigCursor;
    if (state.bigCursor) {
      document.documentElement.setAttribute('data-big-cursor', 'true');
      showToast('🖱️ Big cursor ON', 'success');
      announce('Big cursor enabled');
    } else {
      document.documentElement.removeAttribute('data-big-cursor');
      showToast('🖱️ Big cursor OFF', 'info');
      announce('Big cursor disabled');
    }
    save('bigCursor', state.bigCursor);
    updateToggleState('cursorToggle', state.bigCursor);
  }

  // ========================================
  // 9. FOCUS OUTLINE ENHANCEMENT
  // ========================================
  function toggleFocusOutline() {
    state.focusOutline = !state.focusOutline;
    if (state.focusOutline) {
      document.documentElement.setAttribute('data-focus-outline', 'true');
      showToast('🎯 Focus outline ON', 'success');
      announce('Enhanced focus outline enabled');
    } else {
      document.documentElement.removeAttribute('data-focus-outline');
      showToast('🎯 Focus outline OFF', 'info');
      announce('Enhanced focus outline disabled');
    }
    save('focusOutline', state.focusOutline);
    updateToggleState('focusToggle', state.focusOutline);
  }

  // ========================================
  // 10. READ ALOUD (Web Speech API)
  // ========================================
  function toggleReadAloud() {
    state.readAloud = !state.readAloud;
    if (state.readAloud) {
      document.documentElement.setAttribute('data-read-aloud', 'true');
      document.addEventListener('click', handleReadAloudClick);
      showToast('🔊 Read aloud ON — click any element', 'success');
      announce('Read aloud enabled. Click any text to hear it read.');
    } else {
      document.documentElement.removeAttribute('data-read-aloud');
      document.removeEventListener('click', handleReadAloudClick);
      window.speechSynthesis.cancel();
      showToast('🔊 Read aloud OFF', 'info');
      announce('Read aloud disabled');
    }
    save('readAloud', state.readAloud);
    updateToggleState('readToggle', state.readAloud);
  }

  function handleReadAloudClick(e) {
    if (!state.readAloud) return;
    // Skip the accessibility panel itself
    if (accessPanel && accessPanel.contains(e.target)) return;

    const target = e.target.closest('h1, h2, h3, h4, h5, h6, p, a, li, button, label, span, div');
    if (!target) return;

    const text = target.textContent.trim();
    if (!text || text.length < 2 || text.length > 500) return;

    e.preventDefault();
    e.stopPropagation();

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-ZA';

    utterance.onstart = () => {
      state.isSpeaking = true;
      target.style.outline = '3px solid #d4a12a';
      target.style.outlineOffset = '2px';
    };
    utterance.onend = () => {
      state.isSpeaking = false;
      target.style.outline = '';
      target.style.outlineOffset = '';
    };

    window.speechSynthesis.speak(utterance);
  }

  // ========================================
  // 11. TOGGLE STATE HELPER
  // ========================================
  function updateToggleState(elementId, isActive) {
    const el = document.getElementById(elementId);
    if (!el) return;
    if (isActive) {
      el.classList.add('active');
      el.setAttribute('aria-pressed', 'true');
    } else {
      el.classList.remove('active');
      el.setAttribute('aria-pressed', 'false');
    }
  }

  // ========================================
  // 12. PANEL MANAGEMENT
  // ========================================
  let lastFocusedElement = null;

  function openPanel() {
    if (!accessPanel) return;
    lastFocusedElement = document.activeElement;
    accessPanel.classList.add('open');
    accessToggle.setAttribute('aria-expanded', 'true');
    // Focus first focusable element in panel
    setTimeout(() => {
      const firstBtn = accessMenu?.querySelector('button, a, [tabindex="0"]');
      if (firstBtn) firstBtn.focus();
    }, 200);
  }

  function closePanel() {
    if (!accessPanel) return;
    accessPanel.classList.remove('open');
    accessToggle.setAttribute('aria-expanded', 'false');
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function togglePanel() {
    if (accessPanel.classList.contains('open')) {
      closePanel();
    } else {
      openPanel();
    }
  }

  // Focus trap within panel
  function trapFocus(e) {
    if (!accessPanel || !accessPanel.classList.contains('open')) return;
    if (e.key !== 'Tab') return;

    const focusableElements = accessMenu.querySelectorAll(
      'button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]'
    );
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }

  // ========================================
  // 13. RESET ALL SETTINGS
  // ========================================
  function resetAll() {
    // Reset state
    state.fontScale = 1;
    state.highContrast = false;
    state.reducedMotion = false;
    state.dyslexiaFont = false;
    state.lineHeight = 1.6;
    state.letterSpacing = 0;
    state.highlightLinks = false;
    state.bigCursor = false;
    state.focusOutline = false;
    state.readAloud = false;

    // Remove all attributes
    document.documentElement.removeAttribute('data-high-contrast');
    document.documentElement.removeAttribute('data-reduced-motion');
    document.documentElement.removeAttribute('data-dyslexia-font');
    document.documentElement.removeAttribute('data-highlight-links');
    document.documentElement.removeAttribute('data-big-cursor');
    document.documentElement.removeAttribute('data-focus-outline');
    document.documentElement.removeAttribute('data-read-aloud');

    // Reset CSS custom properties
    document.documentElement.style.setProperty('--font-scale', 1);
    document.documentElement.style.setProperty('--line-height-scale', 1.6);
    document.documentElement.style.setProperty('--letter-spacing-scale', '0px');

    // Remove event listeners
    document.removeEventListener('click', handleReadAloudClick);
    window.speechSynthesis.cancel();

    // Clear storage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(CONFIG.STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });

    // Update UI
    updateFontScaleDisplay();
    updateLineHeightDisplay();
    updateLetterSpacingDisplay();
    ['contrastToggle', 'motionToggle', 'dyslexiaToggle', 'linkToggle', 'cursorToggle', 'focusToggle', 'readToggle'].forEach(id => {
      updateToggleState(id, false);
    });

    showToast('♻️ All accessibility settings reset', 'success');
    announce('All accessibility settings have been reset to default');
  }

  // ========================================
  // 14. INITIALIZATION
  // ========================================
  function init() {
    // Restore all settings
    state.fontScale = load('fontScale', 1);
    setFontScale(state.fontScale);

    state.highContrast = load('highContrast', false);
    if (state.highContrast) {
      document.documentElement.setAttribute('data-high-contrast', 'true');
      updateToggleState('contrastToggle', true);
    }

    state.reducedMotion = load('reducedMotion', false);
    if (state.reducedMotion) {
      document.documentElement.setAttribute('data-reduced-motion', 'true');
      updateToggleState('motionToggle', true);
    }

    state.dyslexiaFont = load('dyslexiaFont', false);
    if (state.dyslexiaFont) {
      document.documentElement.setAttribute('data-dyslexia-font', 'true');
      updateToggleState('dyslexiaToggle', true);
    }

    state.lineHeight = load('lineHeight', 1.6);
    setLineHeight(state.lineHeight);

    state.letterSpacing = load('letterSpacing', 0);
    setLetterSpacing(state.letterSpacing);

    state.highlightLinks = load('highlightLinks', false);
    if (state.highlightLinks) {
      document.documentElement.setAttribute('data-highlight-links', 'true');
      updateToggleState('linkToggle', true);
    }

    state.bigCursor = load('bigCursor', false);
    if (state.bigCursor) {
      document.documentElement.setAttribute('data-big-cursor', 'true');
      updateToggleState('cursorToggle', true);
    }

    state.focusOutline = load('focusOutline', false);
    if (state.focusOutline) {
      document.documentElement.setAttribute('data-focus-outline', 'true');
      updateToggleState('focusToggle', true);
    }

    state.readAloud = load('readAloud', false);
    if (state.readAloud) {
      document.documentElement.setAttribute('data-read-aloud', 'true');
      document.addEventListener('click', handleReadAloudClick);
      updateToggleState('readToggle', true);
    }

    // Setup panel toggle
    if (accessToggle && accessPanel) {
      accessToggle.setAttribute('aria-expanded', 'false');
      accessToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        togglePanel();
      });

      // Close on outside click
      document.addEventListener('click', function(e) {
        if (accessPanel.classList.contains('open')) {
          if (!accessPanel.contains(e.target) && e.target !== accessToggle) {
            closePanel();
          }
        }
      });

      // Trap focus within panel
      document.addEventListener('keydown', trapFocus);
    }

    // Setup all buttons
    bindButtons();

    // Update displays
    updateFontScaleDisplay();
    updateLineHeightDisplay();
    updateLetterSpacingDisplay();

    console.log('♿ Accessibility Suite v2.0 initialized');
    console.log(`📏 Font scale: ${Math.round(state.fontScale * 100)}%`);
    console.log(`🔆 High contrast: ${state.highContrast ? 'ON' : 'OFF'}`);
    console.log(`🎬 Reduced motion: ${state.reducedMotion ? 'ON' : 'OFF'}`);
    console.log(`📖 Dyslexia font: ${state.dyslexiaFont ? 'ON' : 'OFF'}`);
    console.log(`🔊 Read aloud: ${state.readAloud ? 'ON' : 'OFF'}`);
  }

  function bindButtons() {
    const bind = (id, fn) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', fn);
    };

    // Font scaling
    bind('fontPlus', increaseFont);
    bind('fontMinus', decreaseFont);
    bind('fontReset', resetFont);

    // Toggles
    bind('contrastToggle', toggleContrast);
    bind('motionToggle', toggleReducedMotion);
    bind('dyslexiaToggle', toggleDyslexiaFont);
    bind('linkToggle', toggleLinkHighlight);
    bind('cursorToggle', toggleBigCursor);
    bind('focusToggle', toggleFocusOutline);
    bind('readToggle', toggleReadAloud);

    // Line height
    bind('lineHeightPlus', increaseLineHeight);
    bind('lineHeightMinus', decreaseLineHeight);

    // Letter spacing
    bind('letterSpacingPlus', increaseLetterSpacing);
    bind('letterSpacingMinus', decreaseLetterSpacing);

    // Reset
    bind('resetAll', resetAll);
  }

  // ========================================
  // KEYBOARD SHORTCUTS
  // ========================================
  document.addEventListener('keydown', function(e) {
    // Escape key to close panel
    if (e.key === 'Escape') {
      if (accessPanel && accessPanel.classList.contains('open')) {
        closePanel();
        e.preventDefault();
      }
      // Stop read aloud
      if (state.isSpeaking) {
        window.speechSynthesis.cancel();
        state.isSpeaking = false;
      }
    }
  });

  // ========================================
  // INITIALIZE
  // ========================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for debugging
  window.AccessibilityApp = {
    state,
    setFontScale,
    toggleContrast,
    toggleReducedMotion,
    resetAll,
    announce
  };

})();