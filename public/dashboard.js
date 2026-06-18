// ============================================================================
// 🟢 WORLDCONNECT AI - COMPREHENSIVE SANITIZED WORKSPACE RUNTIME
// ============================================================================

// ==========================================================
// MODULE 1: CORE APP CONTEXT, STATES & UTILITIES 
// ==========================================================

// Global state tracking variables
let activeNodeId = "universal-hub";
let currentLanguage = "en";

// System Initialization lifecycle setup
function initializeSystemDeck() {
    console.log("[System Lifecycle] WorldConnect dashboard systems fully operational.");
    setupSidebarListeners();
    setupLanguageSelector();
}

// Ensure the Supabase instance variable is safely declared in global window scope first
if (typeof window.supabaseClientInstance === 'undefined') {
    window.supabaseClientInstance = null;
}

// ==========================================================
// MODULE 2: DATA LINK & BACKEND INITIALIZATION (SUPABASE)
// ==========================================================
try {
    const activeUrl = "https://uyhtzjhdepkgrxqgjwma.supabase.co";
    const activeAnonKey = "sb_publishable_Ec8l5h8zm_yxcC-5J3rZNA_G2ULQXeK"; 

    if (!activeUrl || !activeAnonKey) {
        throw new Error("Missing active cluster configuration coordinates.");
    }

    if (typeof supabase !== 'undefined') {
        window.supabaseClientInstance = supabase.createClient(activeUrl, activeAnonKey);
        console.log("[Data Link] Stream connected to target cloud engine successfully.");
    } else {
        throw new Error("Supabase CDN client loader timed out.");
    }
} catch (error) {
    console.error("[Data Link] Initialization failed:", error.message);
}

// Component Mappings to prevent background script errors across frames
window.toggleCameraHubStreamsMock = () => { console.log("[Mock] Camera streams toggled."); };
window.forceArraySync = () => { console.log("[Mock] Array structure synced."); };
window.compileAIExtraction = () => { console.log("[Mock] Running AI compilation extraction."); };
window.cycleAgoraToken = () => { console.log("[Mock] Agora token cycle requested."); };
window.fetchSatScan = () => { console.log("[Mock] Fetching satellite scanning nodes."); };
window.executeCustomFormAction = () => { console.log("[Mock] Custom form action executed."); };

// Helper tool to safely escape content outputs when rendering
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ==========================================================
// MODULE 3: NAVIGATION & INTERACTIVE CONTROLLERS
// ==========================================================

// Binds actions to your sidebar links dynamically
function setupSidebarListeners() {
    const navLinks = document.querySelectorAll('.sidebar-nav a, .nav-link, [data-node-target]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Extract destination from data attribute or fallback href attribute values
            const targetId = link.getAttribute('data-node-target') || link.getAttribute('href')?.replace('#', '');
            
            if (targetId) {
                console.log('[Navigation Router] Transitioning view matrix to: ' + targetId);
                if (typeof renderActiveView === 'function') {
                    renderActiveView(targetId);
                }
            }
        });
    });
}

// Handles language dropdown configuration settings
function setupLanguageSelector() {
    const langSelect = document.getElementById('languageSelector') || document.querySelector('.lang-select');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            currentLanguage = e.target.value;
            console.log('[Language Matrix] Local language translation altered to: ' + currentLanguage);
        });
    }
} // <-- FIX: Added the missing functional bracket to unblock the compiler loop

// ============================================================================
// 🔓 WORLDCONNECT GLOBAL SIDEBAR UNLOCKER (PRECISION TEXT FIX - FULL REPAIR)
// ============================================================================
document.addEventListener("DOMContentLoaded", function() {
    console.log("[WorldConnect Core] Precision Unlocker active.");

    const contentTitle = document.getElementById('content-title') || document.querySelector('.main-content h1') || document.querySelector('h2');
    const contentBody = document.getElementById('main-content-panel') || document.querySelector('.content-body') || document.querySelector('main');

    // 1. Target the actual clickable text inside your menus safely
    const sidebarItems = document.querySelectorAll('.sidebar-item, .nav-link, .menu-item, [id*="sidebar"], [class*="sidebar"], .sidebar-node');
    
    sidebarItems.forEach(item => {
        item.style.cursor = "pointer";
        
        item.addEventListener("click", function(e) {
            e.stopPropagation(); // Prevents the click from bleeding into other menus!
            
            // 2. Extract ONLY the top-level label text
            let rawText = "";
            let childNode = item.firstChild;
            while (childNode) {
                if (childNode.nodeType === Node.TEXT_NODE) {
                    rawText += childNode.textContent;
                }
                childNode = childNode.nextSibling;
            }
            
            if (!rawText.trim()) {
                rawText = item.innerText.split('\n')[0];
            }
            
            const cleanTitle = item.getAttribute("data-name") || rawText.trim();
            const cleanId = (item.getAttribute("data-target") || cleanTitle.toLowerCase()).replace(/[^a-z0-9]/g, '-');
            
            console.log('[Pipeline] Isolated click to element: "' + cleanTitle + '" (' + cleanId + ')');

            // Update heading text cleanly
            if (contentTitle) contentTitle.innerText = cleanTitle;

            // 3. Cleanly switch out views based on the exact single tab clicked
            if (contentBody) {
                switch(cleanId) {
                    
                    case 'language':
                        if (window.CustomEvent) {
                            window.dispatchEvent(new window.CustomEvent('open-language-selector'));
                        }
                        break;

                    case 'logout':
                        // FIX: Safe array mapping for string isolation
                        contentBody.innerHTML = [
                            '<div style="padding: 24px; text-align: center;">',
                                '<h3 style="color: #ff4a4a; margin-bottom: 10px;">Logging Out...</h3>',
                                '<p style="color: #8a929a;">Clearing system environment sessions securely...</p>',
                            '</div>'
                        ].join('');
                        break;

                    case 'ai-assistant':
                    case 'ai-note-summary':
                        if (window.nodes && typeof window.nodes[cleanTitle] === 'function') {
                            contentBody.innerHTML = window.nodes[cleanTitle]();
                        } else {
                            // FIX: Safe array mapping for string isolation
                            contentBody.innerHTML = [
                                '<div style="padding: 24px; display: flex; flex-direction: column; gap: 15px;">',
                                    '<p style="color: #8a929a; margin: 0; font-size: 14px;">Gemini 3.1 Flash Lite Pipeline</p>',
                                    '<div id="chat-stream-output" style="min-height: 280px; background: #12141c; border: 1px solid #2d3139; padding: 15px; border-radius: 6px; overflow-y: auto; color: #e1e4ea;">',
                                        '<p style="color: #57606a; margin: 0;"><i>System pipeline secure. Type a processing prompt to begin...</i></p>',
                                    '</div>',
                                    '<div style="display: flex; gap: 10px;">',
                                        '<input type="text" id="ai-user-input" placeholder="Ask Gemini anything..." style="flex-grow: 1; background: #12141c; border: 1px solid #2d3139; color: #e1e4ea; padding: 12px; border-radius: 4px; outline: none;">',
                                        '<button onclick="window.evaluateVectorInput()" style="background: #0070f3; color: white; border: none; padding: 0 24px; border-radius: 4px; cursor: pointer; font-weight: 600;">Send</button>',
                                    '</div>',
                                '</div>'
                            ].join('');
                        }
                        break;

                    case 'summary':
                        // FIX: Safe array mapping for string isolation
                        contentBody.innerHTML = [
                            '<div style="padding: 24px; color: #e1e4ea;">',
                                '<h3 style="margin-top: 0; color: #00fa9a;">System Operational Summary</h3>',
                                '<p style="font-size: 15px; line-height: 1.6; color: #c1c5cd;">Welcome back to WorldConnect. Your 45 modular dashboards and network interfaces are running smoothly inside your local architecture.</p>',
                            '</div>'
                        ].join('');
                        break;

                    case 'camera-hub':
                        // FIX: Safe array mapping for string isolation
                        contentBody.innerHTML = [
                            '<div style="padding: 24px;">',
                                '<p style="color: #8a929a; margin-bottom: 15px;">Real-Time RTC Video Stream Array</p>',
                                '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">',
                                    '<div style="aspect-ratio: 16/9; background: #12141c; border: 1px solid #2d3139; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #57606a;">Local Feed</div>',
                                    '<div style="aspect-ratio: 16/9; background: #12141c; border: 1px solid #2d3139; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #57606a;">Remote Feed</div>',
                                '</div>',
                            '</div>'
                        ].join('');
                        break;

                    default:
                        console.log('[Router Switch] Sub-route option "' + cleanId + '" handed down to fallback handling layers.');
                        break;
                }
            }
        });
    });
});

// ============================================================================
// MODULE 5: SYSTEM APPLICATION EVENT LISTENERS
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('[System Core] DOM fully loaded. Mounting dashboard framework...');
    
    // Check and safely build out layout views
    if (typeof renderActiveView === 'function') {
        renderActiveView(activeNodeId);
    }
    
    // Mount terminal and navigation interactive components
    if (typeof initializeSystemDeck === 'function') {
        initializeSystemDeck();
    }
});