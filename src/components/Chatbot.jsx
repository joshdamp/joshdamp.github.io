import { useState, useEffect } from 'react'

export default function Chatbot() {
  const [isMinimized, setIsMinimized] = useState(true)

  return (
    <div>
      <div id="chatbot-widget" className="chatbot-widget" style={{ display: isMinimized ? 'none' : 'flex' }}>
        <div className="chatbot-header">
          <button 
            id="minimize-btn" 
            className="chatbot-btn" 
            onClick={() => setIsMinimized(true)}
            title="Minimize chatbot"
          >
            −
          </button>
        </div>
        <div id="chatbot-messages" className="chatbot-messages">
          <div className="chatbot-message bot-message">
            <p>Hi! 👋 I'm Joshua's chatbot. Feel free to ask me anything about Joshua, his skills, projects, or background!</p>
          </div>
        </div>
        <div className="chatbot-input-area">
          <input type="text" id="chatbot-input" className="chatbot-input" placeholder="Ask me something..." />
          <button id="send-btn" className="chatbot-send-btn">Send</button>
        </div>
      </div>

      <button 
        id="chatbot-toggle" 
        className="chatbot-toggle-btn" 
        onClick={() => setIsMinimized(false)}
        title="Open chatbot"
        style={{ display: isMinimized ? 'block' : 'none' }}
      >
        💬
      </button>
    </div>
  )
}
