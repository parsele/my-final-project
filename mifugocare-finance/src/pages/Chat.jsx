import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am Mifugo AI Agent. How can I help you with your animal health or finance needs today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Thank you for your message! (This is a simulated response.)' }
      ]);
    }, 800);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow p-6 flex flex-col h-[70vh]">
      <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">Mifugo AI Agent</h1>
      <div className="flex-1 overflow-y-auto mb-4 space-y-2 bg-gray-50 p-3 rounded">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2 rounded-lg max-w-xs text-sm ${msg.sender === 'user' ? 'bg-green-100 text-green-900' : 'bg-gray-200 text-gray-700'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat; 