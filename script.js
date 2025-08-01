// DECLARE ALL VARIABLES AT THE TOP
let titleIndex = 0;
let lastApiCall = 0;
let conversationHistory = [];
let apiOnline = false;
let isSubmitting = false;
const API_COOLDOWN = 1000; // Reduced cooldown
const responseCache = new Map();

// Dynamic title rotation
const titles = [
    'Python Lead',
    'Data Scientist',
    'Machine Learning Engineer',
    'Teaching Assistant',
    'Volunteer Manager',
    'Tech Entrepreneur',
    'Problem Solver',
    'Badminton Player',
    'Math Tutor',
    'Content Creator'
];

console.log("Script loaded");

// Interactive Grid Animation
class InteractiveGrid {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mouse = { x: -1000, y: -1000 };
        this.lastMoveTime = 0;
        this.fadeTimeout = null;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.globalOpacity = 0;
        this.isFading = false;
        
        // Mouse tracking
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.lastMoveTime = Date.now();
            this.isFading = false;
            this.globalOpacity = 1;
            
            // Clear existing timeout
            if (this.fadeTimeout) {
                clearTimeout(this.fadeTimeout);
            }
            
            // Set new timeout to fade after 2 seconds
            this.fadeTimeout = setTimeout(() => {
                this.isFading = true; 
            }, 200);
        });
        
        this.draw();
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.isFading) {
            this.globalOpacity -= 0.02;
            if (this.globalOpacity <= 0) {
                this.globalOpacity = 0;
                this.mouse.x = -1000;
                this.mouse.y = -1000;
                this.isFading = false;
            }
        }
        // Only draw if mouse is on screen
        if (this.mouse.x > -500 && this.mouse.y > -500) {
            const gridSize = 50;
            const radius = 90;
            
            // Draw shiny dots in grid pattern around mouse
            for (let x = 0; x < this.canvas.width; x += gridSize) {
                for (let y = 0; y < this.canvas.height; y += gridSize) {
                    const dist = Math.sqrt(
                        (this.mouse.x - x) * (this.mouse.x - x) + 
                        (this.mouse.y - y) * (this.mouse.y - y)
                    );
                    
                    if (dist < radius) {
                        const opacity = (1 - (dist / radius)) * this.globalOpacity;
                        const intensity = opacity * opacity;
                        
                        // Draw shiny dot with glow
                        this.ctx.shadowBlur = 20;
                        this.ctx.shadowColor = `rgba(255, 255, 255, ${intensity})`;
                        this.ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.3})`;
                        this.ctx.beginPath();
                        this.ctx.arc(x, y, 5, 0, Math.PI * 2);
                        this.ctx.fill();
                        
                        // Reset shadow for lines
                        this.ctx.shadowBlur = 15;
                        
                        // Draw shiny grid lines
                        this.ctx.strokeStyle = `rgba(255, 255, 255,${opacity * 0.6})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.beginPath();
                        this.ctx.moveTo(x - radius, y);
                        this.ctx.lineTo(x + radius, y);
                        this.ctx.moveTo(x, y - radius);
                        this.ctx.lineTo(x, y + radius);
                        this.ctx.stroke();
                    }
                }
            }
        }
        
        requestAnimationFrame(() => this.draw());
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing...");
    setInterval(rotateTitles, 3000); 
    // Check API status
    checkApiStatus();
    
    // Set up chat inputs (check both possible IDs)
    const chatInput1 = document.getElementById('chatInput');
    const chatInput2 = document.getElementById('chatInterfaceInput');
    
    if (chatInput1) {
        chatInput1.addEventListener('keypress', handleEnterKey);
        console.log("Main chat input listener added");
    }
    
    const gridCanvas = document.getElementById('gridCanvas');
    if (gridCanvas) {
        new InteractiveGrid(gridCanvas);
    }
    
    if (chatInput2) {
        chatInput2.addEventListener('keypress', handleEnterKey);
        console.log("Interface chat input listener added");
    }
    
    // Add hover effects
    const cards = document.querySelectorAll('.stat-card, .project-card, .skill-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-5px)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
    });
    
    // Recalculate on window resize
    window.addEventListener('resize', () => {
        setTimeout(calculateTimelineLines, 100);
    });
    
    console.log("DOM initialization complete");
});

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        console.log("↩️ Enter pressed, calling submitChat");
        submitChat();
    }
}

async function checkApiStatus() {
    const statusElement = document.getElementById('apiStatusText');
    const statusDot = document.getElementById('statusDot');
    const apiStatusIndicator = document.getElementById('apiStatusIndicator');
    
    try {
        apiStatusIndicator.className = "api-status checking";
        statusDot.className = "status-dot";
        statusElement.textContent = "API Status: Checking...";
        
        const response = await fetch('/api/test-groq');
        const result = await response.json();
        
        if (result.keyValid && result.success) {
            apiOnline = true;
            apiStatusIndicator.className = "api-status online";
            statusDot.className = "status-dot online";
            statusElement.textContent = "API Status: Online";
        } else {
            apiOnline = false;
            apiStatusIndicator.className = "api-status offline";
            statusDot.className = "status-dot offline";
            statusElement.textContent = "API Status: Key Invalid";
        }
    } catch (error) {
        apiOnline = false;
        apiStatusIndicator.className = "api-status offline";
        statusDot.className = "status-dot offline";
        statusElement.textContent = "API Status: Connection Failed";
        console.error("Backend Connection Error:", error);
    }
}

function handleChatInputKey(event) {
    if (event.key === 'Enter') {
        submitChat();
    }
}

function getCachedResponse(question) {
    const key = question.toLowerCase().trim();
    return responseCache.get(key);
}

function cacheResponse(question, response) {
    const key = question.toLowerCase().trim();
    responseCache.set(key, response);
}

function rotateTitles() {
    const titleElement = document.getElementById('dynamicTitle');
    
    if (titleElement) {
        titleElement.style.opacity = '0';
        
        setTimeout(() => {
            titleElement.textContent = titles[titleIndex];
            titleElement.style.opacity = '1';
            titleIndex = (titleIndex + 1) % titles.length;
        }, 300);
    } else {
        console.error("dynamicTitle element not found!");
    }
}

// FIXED: Timeline Animation Function
function triggerTimelineAnimations(sectionId) {
    console.log("🎬 triggerTimelineAnimations called for section:", sectionId);
    
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const timelineItems = section.querySelectorAll('.timeline-item');
    if (!timelineItems || timelineItems.length === 0) return;
    
    // Reset all items
    timelineItems.forEach(item => {
        item.classList.remove('animate');
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        const dot = item.querySelector('.timeline-dot');
        if (dot) dot.style.transform = 'scale(0)';
    });
    
    // Force reflow
    void section.offsetHeight;
    
    // Animate with delays
    setTimeout(() => {
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate');
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                
                // Animate dot separately
                const dot = item.querySelector('.timeline-dot');
                if (dot) {
                    setTimeout(() => {
                        dot.style.transform = 'scale(1)';
                    }, 200);
                }
            }, index * 300);
        });
    }, 100);
}

// Theme toggle
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle i');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeToggle.className = 'fas fa-moon';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.className = 'fas fa-sun';
    }
}

function closeChatInterface() {
    document.getElementById('chatInterface').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
    
    // Update active nav link back to home
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('a[href="#home"]').classList.add('active');
}

// Sidebar toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const icon = document.querySelector('.collapse-btn i');

    sidebar.classList.toggle('collapsed');
    
    if (sidebar.classList.contains('collapsed')) {
        icon.className = 'fas fa-bars';
    } else {
        icon.className = 'fas fa-times';
    }
}

// Accent color change
function changeAccentColor(color) {
    document.documentElement.style.setProperty('--primary-color', color);
}

function showInitials() {
    const img = document.querySelector('.profile-image img');
    const initials = document.getElementById('profileInitials');
    
    img.style.display = 'none';
    initials.style.display = 'block';
}

// FIXED: Navigation function
function showSection(sectionName) {
    console.log("🔄 showSection called with:", sectionName);
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Hide chat interface
    document.getElementById('chatInterface').classList.add('hidden');
    
    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    } else {
        console.error("Target section not found:", sectionName);
        return;
    }
    
    // Update active nav link - FIXED: Handle event properly
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and activate the correct nav link
    const navLink = document.querySelector(`a[href="#${sectionName}"]`);
    if (navLink) {
        navLink.classList.add('active');
    }
    
    // Trigger timeline animations for sections that have timelines
    const timelineSections = ['experience', 'education', 'certifications'];
    if (timelineSections.includes(sectionName)) {
        console.log("🎯 Triggering animations for:", sectionName);
        setTimeout(() => {
            triggerTimelineAnimations(sectionName);
            // Calculate lines after animations complete
            setTimeout(() => calculateTimelineLines(), 1000);
        }, 200);
    }
}

// GROQ API CALL - FIXED TO ACTUALLY USE GROQ
async function queryGroqAPI(question) {
    const now = Date.now();
    if (now - lastApiCall < API_COOLDOWN) {
        console.log("⏳ API cooldown active, waiting...");
        await new Promise(resolve => setTimeout(resolve, API_COOLDOWN - (now - lastApiCall)));
    }
    lastApiCall = Date.now();
    
    // Check cache first
    const cached = getCachedResponse(question);
    if (cached) {
        console.log("📋 Using cached response");
        return cached;
    }
    
    try {
        console.log("🚀 Calling Groq API with question:", question);
        showTypingIndicator();
        
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        });
        
        console.log("📡 Response status:", response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ API Error:", response.status, errorText);
            removeTypingIndicator();
            return `Sorry, I'm having trouble connecting to my AI brain right now. Error: ${response.status}`;
        }
        
        const result = await response.json();
        console.log("✅ Groq API Response:", result);
        
        removeTypingIndicator();
        
        // Extract the actual response from Groq
        if (result.choices && result.choices[0] && result.choices[0].message) {
            const answer = result.choices[0].message.content;
            cacheResponse(question, answer);
            return answer;
        } else {
            console.error("❌ Unexpected response format:", result);
            return "I received an unexpected response format from my AI brain.";
        }
        
    } catch (error) {
        console.error("❌ Network error:", error);
        removeTypingIndicator();
        return `Sorry, I couldn't connect to my AI service. Please try again. Error: ${error.message}`;
    }
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">P</div>
        <div class="message-content">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function askQuestion(question) {
    let input = document.getElementById('chatInterfaceInput') || document.getElementById('chatInput');
    if (input) {
        input.value = question;
        submitChat();
    }
}

async function submitChat() {
    console.log("🔄 submitChat() called");
    if (isSubmitting) {
        console.log("⏳ Already submitting, skipping");
        return;
    }
    
    isSubmitting = true;
    
    // Check interface input FIRST (since that's where suggested questions go)
    const input1 = document.getElementById('chatInterfaceInput');
    const input2 = document.getElementById('chatInput');
    
    let input = null;
    let question = '';
    
    // Priority: interface input first, then main input
    if (input1 && input1.value.trim()) {
        input = input1;
        question = input1.value.trim();
        console.log("🎯 Using interface input");
    } else if (input2 && input2.value.trim()) {
        input = input2;
        question = input2.value.trim();
        console.log("🎯 Using main input");
    }
    
    console.log("❓ Question:", `"${question}"`);
    
    if (!question) {
        console.log("❌ Empty question, returning");
        isSubmitting = false;
        return;
    }
    
    showChatInterface();
    addMessage(question, 'user');
    
    try {
        const response = await queryGroqAPI(question);
        addMessage(response, 'ai');
    } catch (error) {
        removeTypingIndicator();
        addMessage("Sorry, I'm experiencing technical difficulties. Please try again.", 'ai');
    }
    
    if (input) input.value = '';
    addToRecentSearches(question);
    isSubmitting = false;
    console.log("✨ submitChat() completed");
}

function showChatInterface() {
    console.log("🖥️ showChatInterface() called");
    
    const chatInterface = document.getElementById('chatInterface');
    
    // If chat is already open, don't do anything
    if (!chatInterface.classList.contains('hidden')) {
        console.log("💬 Chat already open, skipping");
        return;
    }
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show chat interface
    chatInterface.classList.remove('hidden');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    console.log("✅ Chat interface shown");
}

function addMessage(content, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = sender === 'user' ? 'Y' : 'P';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">${content}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Remove conversation starter after first message
    const starter = document.querySelector('.conversation-starter');
    if (starter) {
        starter.remove();
    }
}

function addToRecentSearches(question) {
    const recentSearches = document.querySelector('.recent-searches');
    const newSearch = document.createElement('div');
    newSearch.className = 'recent-search';
    newSearch.textContent = question.length > 40 ? question.substring(0, 37) + '...' : question;
    newSearch.onclick = () => askQuestion(question);
    
    // Add to top (after the h4 header)
    const header = recentSearches.querySelector('h4');
    if (header && header.nextSibling) {
        recentSearches.insertBefore(newSearch, header.nextSibling);
    } else {
        recentSearches.appendChild(newSearch);
    }
    
    // Keep only latest 2 searches (plus the header)
    const searches = recentSearches.querySelectorAll('.recent-search');
    if (searches.length > 2) {
        // Remove oldest searches beyond the 2 most recent
        for (let i = 2; i < searches.length; i++) {
            searches[i].remove();
        }
    }
}

function calculateTimelineLines() {
    // Find the currently visible section that has timeline items
    const visibleSection = document.querySelector('.section:not(.hidden)');
    if (!visibleSection) return;
    
    const timelineItems = visibleSection.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;
    
    timelineItems.forEach((item, index) => {
        const dot = item.querySelector('.timeline-dot');
        if (!dot) return;
        
        // Create unique ID for each section's timeline items
        const sectionId = visibleSection.id;
        const existingStyle = document.getElementById(`timeline-line-${sectionId}-${index}`);
        if (existingStyle) existingStyle.remove();
        
        let lineHeight;
        
        if (index < timelineItems.length - 1) {
            // Calculate distance to next item
            const nextItem = timelineItems[index + 1];
            const currentRect = item.getBoundingClientRect();
            const nextRect = nextItem.getBoundingClientRect();
            lineHeight = nextRect.top - currentRect.top - 35;
        } else {
            // Last item - extend to bottom of its content
            const content = item.querySelector('.timeline-content');
            const itemRect = item.getBoundingClientRect();
            const contentRect = content.getBoundingClientRect();
            lineHeight = contentRect.bottom - itemRect.top - 35;
        }
        
        // Create dynamic style for this specific section and item
        const style = document.createElement('style');
        style.id = `timeline-line-${sectionId}-${index}`;
        style.textContent = `
            #${sectionId} .timeline-item:nth-child(${index + 1}) .timeline-dot::after {
                content: '';
                position: absolute;
                top: 40px; /* Changed from 35px to 40px for larger icons */
                left: 19px; /* Changed from 16.5px to 19px (center of 40px icon) */
                width: 2px;
                height: ${lineHeight}px;
                background: linear-gradient(to bottom, var(--primary-color), rgba(139, 92, 246, 0.3));
                z-index: 1;
            }
        `;
        document.head.appendChild(style);
    });
}
