 // Enhanced search functionality
document.getElementById('searchBox').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    // Remove previous highlights and tab indicators
    document.querySelectorAll('.highlight').forEach(el => {
        el.outerHTML = el.innerHTML;
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.style.backgroundColor = '';
    });
    
    if (searchTerm.length < 2) {
        // Show all sections and reset tabs if search is empty
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'block';
        });
        return;
    }
    
    let foundInTabs = new Set();
    let firstMatchTab = null;
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const content = section.textContent.toLowerCase();
        const tabContent = section.closest('.tab-content');
        const tabId = tabContent.id;
        
        if (content.includes(searchTerm)) {
            section.style.display = 'block';
            foundInTabs.add(tabId);
            
            // Highlight matching text
            const regex = new RegExp(searchTerm, 'gi');
            section.innerHTML = section.innerHTML.replace(regex, 
                match => `<span class="highlight">${match}</span>`);
            
            // Track the first tab with matches
            if (!firstMatchTab) {
                firstMatchTab = tabId;
            }
        } else {
            section.style.display = 'none';
        }
    });
    
    // Highlight tabs with matches
    document.querySelectorAll('.tab').forEach(tab => {
        const tabId = tab.getAttribute('onclick').match(/'(.*?)'/)[1];
        if (foundInTabs.has(tabId)) {
            tab.style.backgroundColor = 'rgba(255, 235, 59, 0.3)';
        }
    });
    
    // Automatically switch to the first tab with matches
    if (firstMatchTab) {
        const tabToActivate = document.querySelector(`.tab[onclick*="${firstMatchTab}"]`);
        if (tabToActivate) {
            tabToActivate.click(); // Programmatically click the tab
            // Smooth scroll to the first matching section
            const firstMatchSection = document.querySelector(`#${firstMatchTab} .section[style*="block"]`);
            if (firstMatchSection) {
                setTimeout(() => {
                    firstMatchSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        }
    }
});

// Keep your existing showTab function
function showTab(tabId) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}