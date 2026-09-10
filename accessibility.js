// ========================================
// ACCESSIBILITY — Premium Panel
// Font scaling, contrast, and more
// ========================================

(function() {
  'use strict';

  // ----- DOM Elements -----
  const accessToggle = document.getElementById('accessToggle');
  const accessPanel = document.querySelector('.access-panel');
  const fontPlus = document.getElementById('fontPlus');
  const fontMinus = document.getElementById('fontMinus');

  // ----- State -----
  let currentFontScale = 1;
  const MIN_SCALE = 0.85;
  const MAX_SCALE = 1.3;
  const STEP = 0.08;

  // ----- Font Scaling -----
  function getFontScale() {
    return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-scale')) || 1;
  }

  function setFontScale(value) {
    const clamped = Math.min(Math.max(value, MIN_SCALE), MAX_SCALE);
    currentFontScale = clamped;
    document.documentElement.style.setProperty('--font-scale', clamped);
    localStorage.setItem('pres-font-scale', clamped);
    return clamped;
  }

  function increaseFont() {
    const newScale = setFontScale(currentFontScale + STEP);
    showToast(`Text size: ${Math.round(newScale * 100)}%`, 'info');
  }

  function decreaseFont() {
    const newScale = setFontScale(currentFontScale - STEP);
    showToast(`Text size: ${Math.round(newScale * 100)}%`, 'info');
  }

  // ----- Contrast Mode (Optional) -----
  let isHighContrast = false;

  function toggleContrast() {
    isHighContrast = !isHighContrast;
    if (isHighContrast) {
      document.documentElement.setAttribute('data-high-contrast', 'true');
      showToast('🔆 High contrast mode enabled', 'info');
    } else {
      document.documentElement.removeAttribute('data-high-contrast');
      showToast('🔆 High contrast mode disabled', 'info');
    }
    localStorage.setItem('pres-high-contrast', isHighContrast ? 'true' : 'false');
  }

  // ----- Panel Toggle -----
  if (accessToggle && accessPanel) {
    accessToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      accessPanel.classList.toggle('open');
    });

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
      if (accessPanel.classList.contains('open')) {
        if (!accessPanel.contains(e.target) && e.target !== accessToggle) {
          accessPanel.classList.remove('open');
        }
      }
    });
  }

  // ----- Event Listeners -----
  if (fontPlus) {
    fontPlus.addEventListener('click', increaseFont);
  }

  if (fontMinus) {
    fontMinus.addEventListener('click', decreaseFont);
  }

  // ----- Restore Settings -----
  function restoreSettings() {
    // Font scale
    const savedScale = localStorage.getItem('pres-font-scale');
    if (savedScale) {
      currentFontScale = parseFloat(savedScale);
      setFontScale(currentFontScale);
    }

    // High contrast
    const savedContrast = localStorage.getItem('pres-high-contrast');
    if (savedContrast === 'true') {
      isHighContrast = true;
      document.documentElement.setAttribute('data-high-contrast', 'true');
    }
  }

  // ----- Initialization -----
  restoreSettings();
  console.log('♿ Accessibility panel initialized');
  console.log(`📏 Current font scale: ${Math.round(currentFontScale * 100)}%`);

})();