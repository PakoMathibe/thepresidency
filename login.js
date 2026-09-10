// ========================================
// LOGIN — Premium Authentication Logic
// Full validation, 2FA, session management
// ========================================

(function() {
  'use strict';

  // ========================================
  // CONFIG
  // ========================================
  const CONFIG = {
    // Demo credentials (replace with real API call in production)
    demoUsers: [
      { email: 'admin@presidency.gov.za', password: 'admin123', name: 'Admin User', role: 'super_admin' },
      { email: 'editor@presidency.gov.za', password: 'editor123', name: 'Jane Doe', role: 'editor' }
    ],
    maxLoginAttempts: 5,
    lockoutDuration: 300000, // 5 minutes
    otpLength: 6,
    resendCooldown: 30, // seconds
    sessionKey: 'pres_admin_session',
    attemptsKey: 'pres_login_attempts',
    lockoutKey: 'pres_login_lockout'
  };

  // ========================================
  // STATE
  // ========================================
  const state = {
    attempts: 0,
    lockoutUntil: 0,
    resendTimer: 0,
    currentUser: null,
    otp: '',
    isVerifying: false
  };

  // ========================================
  // DOM ELEMENTS
  // ========================================
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  const els = {
    form: $('#loginForm'),
    email: $('#loginEmail'),
    password: $('#loginPassword'),
    emailError: $('#emailError'),
    passwordError: $('#passwordError'),
    emailSuccess: $('#emailSuccess'),
    passwordSuccess: $('#passwordSuccess'),
    passwordStrength: $('#passwordStrength'),
    strengthLabel: $('#strengthLabel'),
    remember: $('#rememberMe'),
    submitBtn: $('#submitBtn'),
    passwordToggle: $('#passwordToggle'),
    forgotLink: $('#forgotLink'),
    twoFAModal: $('#twoFAModal'),
    otpInputs: $$('.otp-inputs input'),
    verifyBtn: $('#verifyBtn'),
    verifyError: $('#verifyError'),
    resendLink: $('#resendLink'),
    resendTimer: $('#resendTimer'),
    close2FA: $('#close2FA'),
    toast: $('#loginToast')
  };

  // ========================================
  // UTILITIES
  // ========================================
  function showToast(message, type = 'info') {
    const toast = els.toast;
    if (!toast) return;
    const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };
    toast.innerHTML = `<span class="icon">${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
    toast.className = `login-toast ${type} show`;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 4000);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePassword(password) {
    return {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      total: password.length
    };
  }

  function getPasswordStrength(password) {
    const checks = validatePassword(password);
    const score = [checks.length, checks.upper, checks.lower, checks.number, checks.special].filter(Boolean).length;
    
    if (password.length === 0) return { level: '', label: '' };
    if (password.length < 6 || score <= 1) return { level: 'weak', label: 'Weak password' };
    if (score === 2) return { level: 'fair', label: 'Fair password' };
    if (score === 3 || score === 4) return { level: 'good', label: 'Good password' };
    return { level: 'strong', label: 'Strong password' };
  }

  // ========================================
  // FIELD VALIDATION
  // ========================================
  function setFieldError(field, errorEl, message) {
    field.classList.add('error');
    if (errorEl) {
      errorEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
      errorEl.classList.add('show');
    }
  }

  function clearFieldError(field, errorEl) {
    field.classList.remove('error');
    if (errorEl) {
      errorEl.classList.remove('show');
    }
  }

  function setFieldSuccess(field, successEl) {
    field.classList.remove('error');
    if (successEl) successEl.classList.add('show');
  }

  function clearFieldSuccess(field, successEl) {
    if (successEl) successEl.classList.remove('show');
  }

  function validateEmailField() {
    const email = els.email.value.trim();
    
    if (!email) {
      setFieldError(els.email, els.emailError, 'Email is required');
      clearFieldSuccess(els.email, els.emailSuccess);
      return false;
    }
    
    if (!validateEmail(email)) {
      setFieldError(els.email, els.emailError, 'Please enter a valid email address');
      clearFieldSuccess(els.email, els.emailSuccess);
      return false;
    }
    
    clearFieldError(els.email, els.emailError);
    setFieldSuccess(els.email, els.emailSuccess);
    return true;
  }

  function validatePasswordField() {
    const password = els.password.value;
    
    if (!password) {
      setFieldError(els.password, els.passwordError, 'Password is required');
      clearFieldSuccess(els.password, els.passwordSuccess);
      return false;
    }
    
    if (password.length < 6) {
      setFieldError(els.password, els.passwordError, 'Password must be at least 6 characters');
      clearFieldSuccess(els.password, els.passwordSuccess);
      return false;
    }
    
    clearFieldError(els.password, els.passwordError);
    setFieldSuccess(els.password, els.passwordSuccess);
    return true;
  }

  // ========================================
  // PASSWORD STRENGTH METER
  // ========================================
  function updatePasswordStrength() {
    const password = els.password.value;
    const strength = getPasswordStrength(password);
    
    if (!password || password.length < 6) {
      els.passwordStrength.classList.remove('show', 'weak', 'fair', 'good', 'strong');
      return;
    }
    
    els.passwordStrength.classList.add('show');
    els.passwordStrength.classList.remove('weak', 'fair', 'good', 'strong');
    els.passwordStrength.classList.add(strength.level);
    els.strengthLabel.textContent = strength.label;
  }

  // ========================================
  // LOGIN ATTEMPTS / LOCKOUT
  // ========================================
  function getStoredAttempts() {
    try {
      const stored = JSON.parse(localStorage.getItem(CONFIG.attemptsKey) || '{}');
      return stored;
    } catch {
      return {};
    }
  }

  function incrementAttempts(email) {
    const attempts = getStoredAttempts();
    const key = email.toLowerCase();
    attempts[key] = (attempts[key] || 0) + 1;
    localStorage.setItem(CONFIG.attemptsKey, JSON.stringify(attempts));
    return attempts[key];
  }

  function resetAttempts(email) {
    const attempts = getStoredAttempts();
    delete attempts[email.toLowerCase()];
    localStorage.setItem(CONFIG.attemptsKey, JSON.stringify(attempts));
  }

  function getAttempts(email) {
    const attempts = getStoredAttempts();
    return attempts[email.toLowerCase()] || 0;
  }

  function isLockedOut() {
    const lockout = parseInt(localStorage.getItem(CONFIG.lockoutKey) || '0');
    return lockout > Date.now();
  }

  function setLockout() {
    localStorage.setItem(CONFIG.lockoutKey, Date.now() + CONFIG.lockoutDuration);
  }

  function getLockoutRemaining() {
    const lockout = parseInt(localStorage.getItem(CONFIG.lockoutKey) || '0');
    return Math.max(0, Math.ceil((lockout - Date.now()) / 60000));
  }

  // ========================================
  // FORM SUBMIT
  // ========================================
  function handleSubmit(e) {
    e.preventDefault();
    
    // Check lockout
    if (isLockedOut()) {
      const mins = getLockoutRemaining();
      showToast(`🔒 Account locked. Try again in ${mins} minute(s).`, 'error');
      return;
    }
    
    // Validate fields
    const emailValid = validateEmailField();
    const passwordValid = validatePasswordField();
    
    if (!emailValid || !passwordValid) {
      // Shake the form
      const form = els.form;
      form.style.animation = 'shake 0.4s ease';
      setTimeout(() => form.style.animation = '', 400);
      return;
    }
    
    // Show loading state
    els.submitBtn.classList.add('loading');
    els.submitBtn.disabled = true;
    
    const email = els.email.value.trim();
    const password = els.password.value;
    
    // Simulate API call
    setTimeout(() => {
      // Find user
      const user = CONFIG.demoUsers.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (!user) {
        // Increment attempts
        const attempts = incrementAttempts(email);
        const remaining = CONFIG.maxLoginAttempts - attempts;
        
        if (remaining <= 0) {
          setLockout();
          showToast('🔒 Too many failed attempts. Account locked for 5 minutes.', 'error');
        } else {
          showToast(`❌ Invalid credentials. ${remaining} attempt(s) remaining.`, 'error');
        }
        
        // Shake the form
        els.form.style.animation = 'shake 0.4s ease';
        setTimeout(() => els.form.style.animation = '', 400);
        
        els.submitBtn.classList.remove('loading');
        els.submitBtn.disabled = false;
        return;
      }
      
      // Success! Store user
      state.currentUser = user;
      resetAttempts(email);
      
      // Show 2FA modal
      els.submitBtn.classList.remove('loading');
      els.submitBtn.disabled = false;
      
      showToast(`👋 Welcome back, ${user.name}! Sending verification code...`, 'success');
      
      // Send OTP
      setTimeout(() => {
        sendOTP();
        els.twoFAModal.classList.add('show');
        setTimeout(() => els.otpInputs[0]?.focus(), 300);
      }, 800);
      
    }, 1200);
  }

  // ========================================
  // 2FA / OTP
  // ========================================
  function sendOTP() {
    // Generate 6-digit OTP
    state.otp = String(Math.floor(100000 + Math.random() * 900000));
    console.log('🔐 DEMO OTP:', state.otp); // For demo purposes only
    
    // Show OTP in toast for demo
    showToast(`🔐 Demo OTP: ${state.otp}`, 'info');
    
    // Start resend cooldown
    startResendCooldown();
  }

  function startResendCooldown() {
    state.resendTimer = CONFIG.resendCooldown;
    els.resendLink.classList.add('disabled');
    
    const updateTimer = () => {
      if (state.resendTimer > 0) {
        els.resendTimer.textContent = `in ${state.resendTimer}s`;
        state.resendTimer--;
      } else {
        els.resendLink.classList.remove('disabled');
        els.resendTimer.textContent = '';
        clearInterval(state._resendInterval);
      }
    };
    
    updateTimer();
    state._resendInterval = setInterval(updateTimer, 1000);
  }

  function handleOTPInput(e, index) {
    const input = e.target;
    const value = input.value.replace(/\D/g, '');
    
    if (value) {
      input.value = value.charAt(0);
      input.classList.add('filled');
      input.classList.remove('error');
      
      // Move to next
      if (index < els.otpInputs.length - 1) {
        els.otpInputs[index + 1].focus();
      }
      
      // Check if all filled
      if (els.otpInputs.every(inp => inp.value)) {
        setTimeout(() => verifyOTP(), 300);
      }
    } else {
      input.classList.remove('filled');
    }
  }

  function handleOTPKeydown(e, index) {
    // Handle backspace
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      els.otpInputs[index - 1].focus();
      els.otpInputs[index - 1].value = '';
      els.otpInputs[index - 1].classList.remove('filled');
    }
    
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const digits = text.replace(/\D/g, '').slice(0, 6).split('');
        digits.forEach((digit, i) => {
          if (els.otpInputs[i]) {
            els.otpInputs[i].value = digit;
            els.otpInputs[i].classList.add('filled');
          }
        });
        if (digits.length === 6) verifyOTP();
      }).catch(() => {});
    }
  }

  function verifyOTP() {
    if (state.isVerifying) return;
    
    const entered = els.otpInputs.map(inp => inp.value).join('');
    
    if (entered.length !== CONFIG.otpLength) {
      showToast('⚠️ Please enter all 6 digits', 'warning');
      return;
    }
    
    state.isVerifying = true;
    els.verifyBtn.classList.add('loading');
    els.verifyBtn.disabled = true;
    
    setTimeout(() => {
      if (entered === state.otp) {
        // Success
        showToast('✅ Verified! Signing you in...', 'success');
        
        // Store session
        const session = {
          user: state.currentUser,
          timestamp: Date.now(),
          expiresAt: Date.now() + (state.remember?.checked ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)
        };
        localStorage.setItem(CONFIG.sessionKey, JSON.stringify(session));
        
        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1200);
        
      } else {
        // Error
        state.isVerifying = false;
        els.verifyBtn.classList.remove('loading');
        els.verifyBtn.disabled = false;
        
        // Shake all inputs
        els.otpInputs.forEach(inp => {
          inp.classList.add('error');
        });
        setTimeout(() => {
          els.otpInputs.forEach(inp => {
            inp.classList.remove('error');
            inp.value = '';
            inp.classList.remove('filled');
          });
          els.otpInputs[0].focus();
        }, 400);
        
        els.verifyError.classList.add('show');
        showToast('❌ Invalid code. Please try again.', 'error');
      }
    }, 1000);
  }

  function resendOTP(e) {
    e.preventDefault();
    if (els.resendLink.classList.contains('disabled')) return;
    
    sendOTP();
    showToast('📧 New verification code sent', 'success');
    
    // Clear inputs
    els.otpInputs.forEach(inp => {
      inp.value = '';
      inp.classList.remove('filled');
    });
    els.otpInputs[0].focus();
  }

  function close2FAModal() {
    els.twoFAModal.classList.remove('show');
    els.otpInputs.forEach(inp => {
      inp.value = '';
      inp.classList.remove('filled', 'error');
    });
    state.isVerifying = false;
  }

  // ========================================
  // PASSWORD VISIBILITY TOGGLE
  // ========================================
  function togglePasswordVisibility() {
    const type = els.password.type === 'password' ? 'text' : 'password';
    els.password.type = type;
    els.passwordToggle.innerHTML = type === 'password' 
      ? '<i class="fas fa-eye"></i>' 
      : '<i class="fas fa-eye-slash"></i>';
  }

  // ========================================
  // FORGOT PASSWORD
  // ========================================
  function handleForgotPassword(e) {
    e.preventDefault();
    const email = els.email.value.trim();
    
    if (!email || !validateEmail(email)) {
      showToast('📧 Please enter your email address first', 'warning');
      els.email.focus();
      return;
    }
    
    showToast(`📧 Password reset link sent to ${email}`, 'success');
  }

  // ========================================
  // SESSION CHECK
  // ========================================
  function checkExistingSession() {
    try {
      const session = JSON.parse(localStorage.getItem(CONFIG.sessionKey) || 'null');
      if (session && session.expiresAt > Date.now()) {
        showToast(`👋 Welcome back, ${session.user.name}!`, 'success');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 800);
        return true;
      }
    } catch {}
    return false;
  }

  // ========================================
  // INIT
  // ========================================
  function init() {
    // Check if already logged in
    if (checkExistingSession()) return;
    
    // Check lockout status
    if (isLockedOut()) {
      const mins = getLockoutRemaining();
      showToast(`🔒 Account locked. Try again in ${mins} minute(s).`, 'error');
    }
    
    // Event listeners
    els.form?.addEventListener('submit', handleSubmit);
    els.passwordToggle?.addEventListener('click', togglePasswordVisibility);
    els.forgotLink?.addEventListener('click', handleForgotPassword);
    els.resendLink?.addEventListener('click', resendOTP);
    els.verifyBtn?.addEventListener('click', verifyOTP);
    els.close2FA?.addEventListener('click', close2FAModal);
    
    // Email validation on blur
    els.email?.addEventListener('blur', validateEmailField);
    els.email?.addEventListener('input', () => {
      if (els.email.classList.contains('error')) {
        validateEmailField();
      }
    });
    
    // Password validation on blur
    els.password?.addEventListener('blur', validatePasswordField);
    els.password?.addEventListener('input', () => {
      updatePasswordStrength();
      if (els.password.classList.contains('error')) {
        validatePasswordField();
      }
    });
    
    // OTP inputs
    els.otpInputs.forEach((input, index) => {
      input.addEventListener('input', (e) => handleOTPInput(e, index));
      input.addEventListener('keydown', (e) => handleOTPKeydown(e, index));
      input.addEventListener('focus', () => input.select());
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && els.twoFAModal?.classList.contains('show')) {
        close2FAModal();
      }
    });
    
    // Close modal on outside click
    els.twoFAModal?.addEventListener('click', (e) => {
      if (e.target === els.twoFAModal) {
        close2FAModal();
      }
    });
    
    // Auto-focus email
    setTimeout(() => els.email?.focus(), 500);
    
    console.log('🔐 Login system initialized');
    console.log('📧 Demo credentials:');
    console.log('   admin@presidency.gov.za / admin123');
    console.log('   editor@presidency.gov.za / editor123');
  }

  // Run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();