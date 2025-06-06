// Basic interactivity for the ChatGPT interface

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const chatInput = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    const suggestionCards = document.querySelectorAll('.suggestion-card');
    const menuItems = document.querySelectorAll('.menu-item');
    const historyItems = document.querySelectorAll('.history-item');
    const newChatBtn = document.querySelector('.new-chat-btn');
    const newProjectBtn = document.querySelector('.new-project-btn');
    const chatGptHomeBtn = document.querySelector('.chatgpt-home-btn');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const chatMessages = document.getElementById('chatMessages');

    // Handle input changes
    chatInput.addEventListener('input', function() {
        if (this.value.trim()) {
            sendBtn.style.opacity = '1';
            sendBtn.style.cursor = 'pointer';
        } else {
            sendBtn.style.opacity = '0.7';
            sendBtn.style.cursor = 'default';
        }
    });

    // Handle Enter key in input
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            handleSendMessage();
        }
    });

    // Send button click
    sendBtn.addEventListener('click', function() {
        if (chatInput.value.trim()) {
            handleSendMessage();
        }
    });

    // Handle suggestion card clicks
    suggestionCards.forEach(card => {
        card.addEventListener('click', function() {
            const text = this.querySelector('p').textContent;
            chatInput.value = text;
            chatInput.focus();
            sendBtn.style.opacity = '1';
            showChatView(); // Switch to chat view when suggestion is clicked
        });
    });

    // Handle menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            menuItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Simulate page change (you can expand this)
            console.log('Switched to:', this.textContent.trim());
        });
    });

    // Handle history item clicks
    historyItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Loading conversation:', this.textContent.trim());
            // Here you could load conversation history
        });
    });



    // New project button
    newProjectBtn.addEventListener('click', function() {
        console.log('Creating new project');
    });

    // ChatGPT button - ALWAYS goes to HOMEPAGE with cleared input
    if (chatGptHomeBtn) {
        chatGptHomeBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent any default behavior
            console.log('🔄 ChatGPT button clicked from CHAT PAGE - GOING TO HOMEPAGE');
            showWelcomeScreen(); // This will clear input and show Canva intro
        });
        console.log('✅ ChatGPT button event listener attached successfully');
    } else {
        console.error('❌ ChatGPT button not found! Check selector: .chatgpt-home-btn');
    }

    // New chat button - goes to HOMEPAGE (same as ChatGPT button)
    newChatBtn.addEventListener('click', function() {
        console.log('🆕 New chat clicked - GOING TO HOMEPAGE');
        showWelcomeScreen(); // This handles all the clearing and resetting
    });

    // Function to show HOMEPAGE (welcome screen with Canva intro)
    function showWelcomeScreen() {
        console.log('🏠 NAVIGATING TO HOMEPAGE - Canva introduction page');
        console.log('🧹 Clearing input field and resetting state...');
        
        // Show homepage, hide chat
        if (welcomeScreen) welcomeScreen.style.display = 'flex';
        if (chatMessages) chatMessages.style.display = 'none';
        
        // Reset input field and button
        if (chatInput) {
            chatInput.value = ''; // Always clear input when going to homepage
            chatInput.placeholder = 'Ask anything';
            chatInput.focus(); // Focus on input for immediate typing
        }
        if (sendBtn) {
            sendBtn.style.opacity = '0.7'; // Reset send button
        }
        
        console.log('✅ Successfully navigated to HOMEPAGE with cleared input');
    }

    // Function to show CHAT PAGE (conversation interface)
    function showChatView() {
        console.log('💬 NAVIGATING TO CHAT PAGE - Conversation interface');
        welcomeScreen.style.display = 'none';
        chatMessages.style.display = 'flex';
        chatInput.placeholder = 'Continue the conversation...';
        chatInput.focus(); // Focus on input for continued conversation
    }

    // Function to handle sending messages - TRANSITIONS FROM HOMEPAGE TO CHAT PAGE
    function handleSendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            console.log('📨 Sending message from HOMEPAGE:', message);
            console.log('🚀 TRANSITIONING TO CHAT PAGE...');
            
            // Add the user message to chat
            addUserMessage(message);
            
            // Generate and add assistant response
            addAssistantResponse(message);
            
            // NAVIGATE TO CHAT PAGE
            showChatView();
            
            // Clear input for next message
            chatInput.value = '';
            sendBtn.style.opacity = '0.7';
        }
    }

    // Function to add user message to chat
    function addUserMessage(message) {
        const chatContainer = document.getElementById('chatMessages');
        chatContainer.innerHTML = ''; // Clear existing messages
        
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'user-message';
        userMessageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        chatContainer.appendChild(userMessageDiv);
    }

    // Function to add assistant response
    function addAssistantResponse(userMessage) {
        const chatContainer = document.getElementById('chatMessages');
        
        const assistantMessageDiv = document.createElement('div');
        assistantMessageDiv.className = 'assistant-message';
        
        // Generate response based on user message
        let response = generateResponse(userMessage);
        
        assistantMessageDiv.innerHTML = `
            <div class="message-content">
                ${response}
                <div class="message-actions">
                    <button class="action-btn"><i class="fas fa-copy"></i></button>
                    <button class="action-btn"><i class="fas fa-thumbs-up"></i></button>
                    <button class="action-btn"><i class="fas fa-thumbs-down"></i></button>
                    <button class="action-btn"><i class="fas fa-redo"></i></button>
                    <button class="action-btn"><i class="fas fa-share"></i></button>
                </div>
            </div>
        `;
        chatContainer.appendChild(assistantMessageDiv);
    }

    // Function to generate appropriate response based on user input
    function generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('csv') || lowerMessage.includes('data') || lowerMessage.includes('product')) {
            return `
                <p>Hello! Excited to bring your visions to life? Start your creative journey with Canva. What will we design together today?</p>
                <p><strong>You've asked for: Product social media posts from CSV data.</strong></p>
                <p>I can help you transform your product data into stunning social media designs! Please paste your CSV data or describe the columns you have (like product name, price, description, image URLs). I'll automatically map this to design templates like product cards, carousel posts, or promotional graphics.</p>
                <p>I can create up to 2 custom designs for you right here in our chat. For bulk creation or advanced editing, I'll guide you to complete the full project in Canva.</p>
            `;
        } else if (lowerMessage.includes('quote') || lowerMessage.includes('inspirational')) {
            return `
                <p>Perfect! I'd love to help you create an inspirational quote graphic for social media.</p>
                <p><strong>You've asked for: Inspirational quote graphic for social media.</strong></p>
                <p>I can design beautiful quote posts with custom typography, backgrounds, and layouts. Please share the quote you'd like to feature, or I can suggest some inspiring options. What theme or mood are you going for?</p>
                <p>I can create up to 2 design variations for you right here. For additional customization options, I'll guide you to complete the design in Canva.</p>
            `;
        } else if (lowerMessage.includes('poster') || lowerMessage.includes('sale') || lowerMessage.includes('promotion')) {
            return `
                <p>Great choice! Let's create an eye-catching promotional poster for your business.</p>
                <p><strong>You've asked for: Promotional poster design.</strong></p>
                <p>I can help you design compelling sale posters with attention-grabbing layouts. Please share details about your promotion - what products/services, discount percentage, sale dates, and your brand colors or style preferences.</p>
                <p>I can generate up to 2 poster designs for you in our chat. For bulk variations or advanced editing, I'll show you how to continue in Canva.</p>
            `;
        } else if (lowerMessage.includes('instagram') || lowerMessage.includes('facebook') || lowerMessage.includes('social media')) {
            return `
                <p>Excellent! Social media posts are perfect for engaging your audience.</p>
                <p><strong>You've asked for: Social media post design.</strong></p>
                <p>I can create stunning posts optimized for different platforms. Tell me more about your content - is it for a business, personal brand, or specific campaign? What's the main message or theme you want to convey?</p>
                <p>I can design up to 2 post variations for you here. For creating multiple posts or platform-specific sizes, I'll help you expand your project in Canva.</p>
            `;
        } else {
            return `
                <p>Hello! Excited to bring your visions to life? Start your creative journey with Canva. What will we design together today?</p>
                <p><strong>You've asked for: ${userMessage}</strong></p>
                <p>I can help you create amazing designs for any purpose! Whether it's social media posts, presentations, logos, flyers, or any other visual content, I'm here to assist.</p>
                <p>Please share more details about what you'd like to create, and I'll provide specific guidance and generate designs for you. I can create up to 2 custom designs right here in our chat!</p>
            `;
        }
    }

    // Add some hover effects for better UX
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Initialize send button state
    sendBtn.style.opacity = '0.7';
    
    // Initialize the page to show welcome screen by default
    showWelcomeScreen();
    
    // Add keyboard shortcut for testing (Ctrl/Cmd + H = Homepage)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
            e.preventDefault();
            console.log('🔄 Keyboard shortcut triggered - GOING TO HOMEPAGE');
            showWelcomeScreen();
        }
    });
});

// Add some smooth animations
const style = document.createElement('style');
style.textContent = `
    button {
        transition: transform 0.1s ease;
    }
    
    .suggestion-card {
        transition: transform 0.2s ease, background-color 0.2s ease;
    }
    
    .suggestion-card:hover {
        transform: translateY(-2px);
    }
    
    .menu-item, .history-item {
        transition: all 0.2s ease;
    }
`;
document.head.appendChild(style); 