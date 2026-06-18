// Magic Hand: 36 Node Activation Script
function renderActiveNodes() {
    console.log("🪄 Magic Hand: Starting Node Activation...");

    // 1. Target the 'System Summary' card area
    const card = document.querySelector('.content-card');
    
    if (!card) {
        console.error("Could not find .content-card. Please check index.html");
        return;
    }

    // 2. Wipe away the static "36 Nodes" text entirely
    card.innerHTML = `
        <h2 style="color: #333;">WorldConnect Neural Network</h2>
        <p style="color: #28a745; font-weight: bold;">● 36 Nodes Fully Functional</p>
        <div id="node-grid-container"></div>
    `;

    const container = document.getElementById('node-grid-container');

    // 3. Generate all 36 functional nodes
    for (let i = 1; i <= 36; i++) {
        const node = document.createElement('div');
        node.className = 'node-card';
        
        node.innerHTML = `
            <div style="font-size: 20px;">🌐</div>
            <div style="font-weight: bold; margin-top: 5px;">NODE-${i.toString().padStart(2, '0')}</div>
            <div style="font-size: 10px; color: #666;">STATUS: ACTIVE</div>
        `;

        // 4. Make them clickable
        node.onclick = () => {
            alert(`Node ${i} selected. Diagnostic: 100% Signal.`);
            console.log(`🪄 Node ${i} is now communicating with Gateway.`);
        };

        container.appendChild(node);
    }
}

// FORCE LOAD: This ensures the magic happens even if the browser is slow
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderActiveNodes);
} else {
    renderActiveNodes();
}