const IntelModules = {
    "Summary": () => {
        const isActive = localStorage.getItem('worldconnect_ai_active') === 'true';
        
        if (!isActive) {
            return `<div class="content-card">
                <h3>System Summary</h3>
                <div class="ai-note gray"><strong>🔒 LOCKED:</strong> Activate AI Intelligence Key in the Admin Center to view node logs.</div>
            </div>`;
        }

        return `
            <div class="content-card">
                <h3>System Summary</h3>
                <div class="ai-note blue"><strong>🤖 AI NOTE:</strong> Node 2994-WC is active. 36 logic nodes synced.</div>
            </div>`;
    },

    "World AI Update": () => {
        const isActive = localStorage.getItem('worldconnect_ai_active') === 'true';

        if (!isActive) {
            return `<div class="content-card">
                <h3>Neural Feed</h3>
                <div class="ai-note gray"><strong>🔒 LOCKED:</strong> Global trend monitoring requires an active AI Key.</div>
            </div>`;
        }

        return `
            <div class="content-card">
                <h3>Neural Feed</h3>
                <div class="ai-note pink"><strong>🤖 AI STATUS:</strong> Monitoring global oil trends and energy prices.</div>
            </div>`;
    }
};

export default IntelModules;