// ========================================
// CONTACT PAGE — DEDICATED JAVASCRIPT
// Premium interactive contact page
// ========================================

(function() {
  'use strict';

  // ========================================
  // 1. EXPANDABLE SECTIONS
  // ========================================
  window.toggleExpandable = function(btn) {
    const content = btn.nextElementSibling;
    const isOpen = content.classList.toggle('open');
    const icon = btn.querySelector('.toggle-icon');
    if (icon) {
      icon.textContent = isOpen ? '▾' : '▸';
    }
    const text = btn.querySelector('.toggle-text');
    if (text) {
      text.textContent = isOpen
        ? 'Hide Minister & Deputy Minister offices'
        : 'Show Minister & Deputy Minister offices';
    }
  };

  // ========================================
  // 2. MAP DIRECTIONS — SIMPLIFIED VERSION
  // ========================================
  
  // DOM Elements
  const directionsPanel = document.getElementById('directionsPanel');
  const directionsStatus = document.getElementById('directionsStatus');
  const directionsResult = document.getElementById('directionsResult');

  // Get directions with user location
  window.getUserDirections = function() {
    if (!directionsPanel || !directionsStatus || !directionsResult) return;

    directionsPanel.classList.add('show');
    directionsStatus.style.display = 'flex';
    directionsResult.style.display = 'none';
    directionsStatus.querySelector('.status-text').textContent = '📍 Getting your location...';

    if (!navigator.geolocation) {
      directionsStatus.querySelector('.status-text').textContent = 'Geolocation is not supported by your browser.';
      directionsResult.style.display = 'block';
      directionsResult.innerHTML = `
        <p><a href="https://www.google.com/maps/dir//-25.743300,28.211169/" target="_blank" rel="noreferrer">
          Click here for directions in Google Maps →
        </a></p>
        <p style="font-size:0.8rem;color:var(--text-muted);">Or search for "Union Buildings, Pretoria" in Google Maps.</p>
      `;
      directionsStatus.style.display = 'none';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      function(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const dest = '-25.743300,28.211169';
        const url = `https://www.google.com/maps/dir/${lat},${lng}/${dest}/`;

        directionsStatus.style.display = 'none';
        directionsResult.style.display = 'block';
        directionsResult.innerHTML = `
          <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3);background:rgba(212,161,42,0.08);border-radius:8px;margin-bottom:var(--space-3);">
            <span style="font-size:1.5rem;">📍</span>
            <div>
              <strong style="color:#006b4f;">Your Location Found</strong>
              <p style="margin:0;font-size:0.85rem;color:var(--text-muted);">
                ${lat.toFixed(6)}, ${lng.toFixed(6)}
              </p>
            </div>
          </div>
          <a href="${url}" target="_blank" rel="noreferrer" style="
            display:flex;
            align-items:center;
            justify-content:center;
            gap:var(--space-2);
            padding:var(--space-3) var(--space-5);
            background:#006b4f;
            color:white;
            border-radius:30px;
            text-decoration:none;
            font-weight:700;
            font-size:1.05rem;
            transition:all 0.2s;
          " onmouseover="this.style.background='#00563f';this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#006b4f';this.style.transform='none'">
            🚗 Get Turn-by-Turn Directions →
          </a>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2);margin-top:var(--space-3);">
            <a href="https://www.google.com/maps/dir//${dest}/" target="_blank" rel="noreferrer" style="
              padding:var(--space-2);
              text-align:center;
              background:var(--bg-alt);
              border-radius:8px;
              text-decoration:none;
              font-size:0.85rem;
              color:var(--text-primary);
              font-weight:500;
            ">📌 Directions from any location</a>
            <a href="https://www.google.com/maps/place/Union+Buildings,+Pretoria/" target="_blank" rel="noreferrer" style="
              padding:var(--space-2);
              text-align:center;
              background:var(--bg-alt);
              border-radius:8px;
              text-decoration:none;
              font-size:0.85rem;
              color:var(--text-primary);
              font-weight:500;
            ">📍 View on Google Maps</a>
          </div>
          <div style="padding:var(--space-2) var(--space-3);background:#f5f1e8;border-radius:8px;font-size:0.85rem;color:var(--text-muted);margin-top:var(--space-2);">
            🚶 <strong>Public Transport:</strong> Gautrain to Pretoria Station, then taxi or bus to Union Buildings
          </div>
        `;
      },
      function(error) {
        let msg = 'Could not get your location.';
        if (error.code === 1) msg = '⚠️ Location access was denied. Please enable location services.';
        if (error.code === 2) msg = '📡 Location unavailable. Please check your connection.';
        if (error.code === 3) msg = '⏱️ Location request timed out. Please try again.';

        directionsStatus.querySelector('.status-text').textContent = msg;
        directionsResult.style.display = 'block';
        directionsResult.innerHTML = `
          <div style="padding:var(--space-3);background:#fff5f0;border-radius:8px;border-left:4px solid #de3831;margin-bottom:var(--space-3);">
            <p style="margin:0;font-weight:600;color:#de3831;">${msg}</p>
          </div>
          <a href="https://www.google.com/maps/dir//-25.743300,28.211169/" target="_blank" rel="noreferrer" style="
            display:flex;
            align-items:center;
            justify-content:center;
            gap:var(--space-2);
            padding:var(--space-3);
            background:#006b4f;
            color:white;
            border-radius:30px;
            text-decoration:none;
            font-weight:600;
          ">
            🗺️ Get Directions on Google Maps
          </a>
        `;
        directionsStatus.style.display = 'none';
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // ========================================
  // 3. FORM VALIDATION
  // ========================================
  const form = document.getElementById('contactForm');
  if (form) {
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');

    const fields = {
      fullName: { el: document.getElementById('fullName'), error: document.getElementById('nameError') },
      email: { el: document.getElementById('email'), error: document.getElementById('emailError') },
      enquiryType: { el: document.getElementById('enquiryType'), error: document.getElementById('typeError') },
      subject: { el: document.getElementById('subject'), error: document.getElementById('subjectError') },
      message: { el: document.getElementById('message'), error: document.getElementById('messageError') }
    };

    function validateField(name) {
      const field = fields[name];
      if (!field) return true;

      const value = field.el.value.trim();
      let isValid = true;
      let errorMsg = '';

      switch (name) {
        case 'fullName':
          isValid = value.length >= 2;
          errorMsg = 'Please enter your full name (minimum 2 characters)';
          break;
        case 'email':
          isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          errorMsg = 'Please enter a valid email address';
          break;
        case 'enquiryType':
          isValid = value !== '';
          errorMsg = 'Please select an enquiry type';
          break;
        case 'subject':
          isValid = value.length >= 3;
          errorMsg = 'Please enter a subject (minimum 3 characters)';
          break;
        case 'message':
          isValid = value.length >= 10;
          errorMsg = 'Please enter your message (minimum 10 characters)';
          break;
      }

      field.el.classList.toggle('error', !isValid);
      field.error.textContent = errorMsg;
      field.error.classList.toggle('show', !isValid);

      return isValid;
    }

    function validateAll() {
      const names = ['fullName', 'email', 'enquiryType', 'subject', 'message'];
      let allValid = true;
      names.forEach(name => {
        if (!validateField(name)) allValid = false;
      });
      return allValid;
    }

    // Real-time validation
    Object.keys(fields).forEach(name => {
      const field = fields[name];
      field.el.addEventListener('blur', function() {
        validateField(name);
      });
      field.el.addEventListener('input', function() {
        this.classList.remove('error');
        field.error.classList.remove('show');
      });
    });

    fields.enquiryType.el.addEventListener('change', function() {
      validateField('enquiryType');
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      if (!validateAll()) {
        const firstError = document.querySelector('.field.error');
        if (firstError) firstError.focus();
        // Use the main toast if available
        if (typeof showToast === 'function') {
          showToast('Please fix the errors before submitting.', 'error');
        }
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      setTimeout(function() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Enquiry';
        formSuccess.classList.add('show');
        form.reset();

        Object.keys(fields).forEach(name => {
          fields[name].el.classList.remove('error');
          fields[name].error.classList.remove('show');
        });

        setTimeout(function() {
          formSuccess.classList.remove('show');
        }, 5000);

        if (typeof showToast === 'function') {
          showToast('✅ Your enquiry has been submitted successfully!', 'success');
        }
      }, 1200);
    });
  }

  // ========================================
  // 4. KEYBOARD SHORTCUTS
  // ========================================
  document.addEventListener('keydown', function(e) {
    // Escape to close directions panel
    if (e.key === 'Escape') {
      if (directionsPanel && directionsPanel.classList.contains('show')) {
        directionsPanel.classList.remove('show');
      }
    }
    // Ctrl+Shift+M to open map directions
    if (e.ctrlKey && e.shiftKey && e.key === 'M') {
      e.preventDefault();
      window.getUserDirections();
    }
  });

  // ========================================
  // 5. INITIALIZATION
  // ========================================
  console.log('📞 Contact page loaded with premium features');
  console.log('📍 Map directions ready');
  console.log('📝 Form validation active');
  console.log('💡 Shortcut: Ctrl+Shift+M for directions');
  console.log('⌨️ Shortcut: Escape to close directions panel');

})();