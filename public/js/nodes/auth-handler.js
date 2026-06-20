// === WORLDCONNECT MODERN AUTHENTICATION ENGINE ===
document.addEventListener("DOMContentLoaded", () => {
  console.log("[Auth Engine] Booting modern pipeline handlers...");

  const databaseClient = window.supabase || window.SUPABASE;
  if (!databaseClient) {
    console.error("[Auth Engine] Fatal: Supabase is not globally bound.");
    return;
  }

  // --- Element Selectors Matching Your New HTML Layout ---
  const authContainer      = document.getElementById('auth-container');
  const mainDashboard      = document.getElementById('main-dashboard');
  const workspaceContainer = document.getElementById('workspace-container');
  const sidebarNavigation  = document.getElementById('sidebar');
  const controlDeckElement = document.getElementById('layout-toggle-wrapper');

  const identifierField    = document.getElementById('user-identifier');
  const passwordField      = document.getElementById('password');
  const submitBtn          = document.getElementById('submit-btn');
  const toggleModeText     = document.getElementById('toggle-mode');
  const forgotPasswordBtn  = document.getElementById('forgot-password-btn');

  // Track the interface mode state ('signup', 'login', or 'forgot')
  let internalAuthMode = 'signup'; 

  // --- Layout Visibility Switcher ---
  function applyUIVisibility(session) {
    if (session) {
      console.log("[Auth Engine] Valid session confirmed. Rendering platform dashboard panels.");
      if (authContainer) authContainer.style.setProperty('display', 'none', 'important');
      if (mainDashboard) mainDashboard.style.setProperty('display', 'block', 'important');
      if (workspaceContainer) workspaceContainer.style.setProperty('display', 'block', 'important');
      if (sidebarNavigation) sidebarNavigation.style.setProperty('display', 'block', 'important');
      if (controlDeckElement) controlDeckElement.style.setProperty('display', 'block', 'important');
    } else {
      console.log("[Auth Engine] No session discovered. Forcing authentication container mask.");
      if (authContainer) authContainer.style.setProperty('display', 'block', 'important');
      if (mainDashboard) mainDashboard.style.setProperty('display', 'none', 'important');
      if (workspaceContainer) workspaceContainer.style.setProperty('display', 'none', 'important');
      if (sidebarNavigation) sidebarNavigation.style.setProperty('display', 'none', 'important');
      if (controlDeckElement) controlDeckElement.style.setProperty('display', 'none', 'important');
      
      // Default back to signup display parameters when unauthenticated
      switchAuthView(internalAuthMode);
    }
  }

  // --- View Form Mode Controller ---
  function switchAuthView(targetMode) {
    internalAuthMode = targetMode;
    if (!authContainer || authContainer.style.display === 'none') return;

    if (internalAuthMode === 'signup') {
      if (passwordField) passwordField.style.display = 'block';
      if (submitBtn) {
        submitBtn.textContent = 'Sign Up';
        submitBtn.className = 'btn-signup';
      }
      if (toggleModeText) toggleModeText.innerHTML = "Already have an account? <span>Login</span>";
    } 
    else if (internalAuthMode === 'login') {
      if (passwordField) passwordField.style.display = 'block';
      if (submitBtn) {
        submitBtn.textContent = 'Login';
        submitBtn.className = 'btn-login';
      }
      if (toggleModeText) toggleModeText.innerHTML = "Don't have an account? <span>Sign Up</span>";
    } 
    else if (internalAuthMode === 'forgot') {
      if (passwordField) passwordField.style.display = 'none'; // Hide password layout input during reset request
      if (submitBtn) {
        submitBtn.textContent = 'Send Reset Link';
        submitBtn.className = 'btn-forgot';
      }
      if (toggleModeText) toggleModeText.innerHTML = "Return to <span>Login</span>";
    }
  }

  // --- Navigation Click Listeners ---
  if (toggleModeText) {
    toggleModeText.onclick = (e) => {
      e.preventDefault();
      if (internalAuthMode === 'signup' || internalAuthMode === 'forgot') {
        switchAuthView('login');
      } else {
        switchAuthView('signup');
      }
    };
  }

  if (forgotPasswordBtn) {
    forgotPasswordBtn.onclick = (e) => {
      e.preventDefault();
      switchAuthView('forgot');
    };
  }

  // --- Form Action Submission Engine ---
  if (submitBtn) {
    submitBtn.onclick = async (e) => {
      e.preventDefault();
      
      const identifier = identifierField ? identifierField.value.trim() : '';
      const password = passwordField ? passwordField.value : '';

      if (!identifier) return alert("Please enter your email or phone number!");
      if (internalAuthMode !== 'forgot' && !password) return alert("Please enter your password!");

      try {
        const isEmail = identifier.includes('@');
        const authPayload = isEmail ? { email: identifier, password } : { phone: identifier, password };

        if (internalAuthMode === 'login') {
          console.log("[Auth Engine] dispatching credential login payload...");
          const { data, error } = await databaseClient.auth.signInWithPassword(authPayload);
          if (error) throw error;
          alert("Login Successful!");
        } 
        else if (internalAuthMode === 'signup') {
          console.log("[Auth Engine] dispatching new account registration payload...");
          const { data, error } = await databaseClient.auth.signUp(authPayload);
          if (error) throw error;
          alert("Sign Up Successful! Check your email to verify your account.");
          switchAuthView('login');
        } 
        else if (internalAuthMode === 'forgot') {
          console.log("[Auth Engine] broadcasting password reset email request...");
          if (!isEmail) throw new Error("Please provide a valid email format address to receive recovery tokens.");

          const { data, error } = await databaseClient.auth.resetPasswordForEmail(identifier, {
            redirectTo: 'https://worldconnect-main.vercel.app/update-password',
          });
          if (error) throw error;
          alert("Password reset channel broadcasted! Check your email for your recovery authorization token.");
          switchAuthView('login');
        }
      } catch (err) {
        alert(err.message);
      }
    };
  }

  // --- Real-time Session Gating Subscriptions ---
  databaseClient.auth.getSession().then(({ data: { session } }) => {
    applyUIVisibility(session);
  }).catch(err => console.error("[Auth Engine] Error reading session token storage:", err));

  databaseClient.auth.onAuthStateChange((event, session) => {
    console.log("[Auth Engine] Global status shift detected:", event);
    applyUIVisibility(session);
  });
});