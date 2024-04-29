// index.js
const tabSection = document.querySelector(".section");
const tabBar = document.querySelector("#tab-bar");
const contentFrame = document.getElementById("iframe-content");

// Array to hold tab URLs
const tabUrls = [];

// Variable to keep track of active tab
let activeTabIndex = -1;

function addTab() {
    // Create tab element
    const newTab = document.createElement("div");
    newTab.classList.add("tab");

    // Create input field for URL
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Enter URL");
    input.classList.add("input");

    // Create button to close tab
    const closeButton = document.createElement("button");
    closeButton.textContent = "x";
    closeButton.addEventListener("click", function() {
        // Find the parent tab element of the close button
        const tab = this.parentNode;
        closeTab(tab); // Close tab when clicked
    });

    // Append input and close button to tab
    newTab.appendChild(input);
    newTab.appendChild(closeButton);

    // Append tab to tab bar
    tabBar.appendChild(newTab);

    // Push empty string to tabUrls array (initially no URL)
    tabUrls.push("");

    // Add event listener to input field for URL entry
    input.addEventListener("change", function() {
        const index = Array.from(tabBar.children).indexOf(newTab);
        tabUrls[index] = input.value;
        updateContent(index);
    });

    // Add event listener to tab to switch content
    newTab.addEventListener("click", function() {
        const index = Array.from(tabBar.children).indexOf(newTab);
        setActiveTab(index);
    });

    // Set focus on input field
    input.focus();
}

function closeTab(tab) {
    const index = Array.from(tabBar.children).indexOf(tab);
    tabBar.removeChild(tab); // Corrected line
    tabUrls.splice(index, 1);
    if (index === activeTabIndex) {
        activeTabIndex = -1; // Reset active tab index
    }
    updateContent();
}


function setActiveTab(index) {
    activeTabIndex = index;
    updateContent();
}

function updateContent(index = activeTabIndex) {
    if (index === -1) return; // No active tab

    const url = tabUrls[index];

    // Change iframe content
    contentFrame.src = url;

    // Update tab colors
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab, idx) => {
        if (idx === index) {
            tab.style.backgroundColor = '#cccccc'; // Active tab color
        } else {
            tab.style.backgroundColor = '#f0f0f0'; // Inactive tab color
        }
    });
}
