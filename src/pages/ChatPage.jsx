import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Bot, User } from 'lucide-react';
import productsData from '../data/mockProducts.json';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { addToCart } = useCart();
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    simulateAIResponse(input);
    setInput('');
  };

  const simulateAIResponse = (userInput) => {
    setIsTyping(true);

    setTimeout(() => {
      const lower = userInput.toLowerCase();
      let aiMessage;

      if (lower.includes('hi') || lower.includes('hello')) {
        aiMessage = { text: 'Hi there! 👋 How can I assist you today?', sender: 'ai' };
      } else if (lower.includes('help')) {
        aiMessage = {
          text: 'Sure! You can ask me for product recommendations, add items to cart, or get assistance with checkout.',
          sender: 'ai',
        };
      } else if (lower.includes('recommend') || lower.includes('suggest') || lower.includes('product')) {
        const recommendedProducts = productsData.slice(0, 2);
        aiMessage = {
          text: 'Here are some products you might like:',
          sender: 'ai',
          recommendations: recommendedProducts,
        };
      } else if (lower.includes('cart')) {
        aiMessage = {
          text: 'You can add products to your cart using the "Add to Cart" button, and view your cart anytime from the navigation bar.',
          sender: 'ai',
        };
      } else {
        aiMessage = {
          text: "I'm here to assist you with anything you need. Try asking for help or product suggestions!",
          sender: 'ai',
        };
      }

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickMessage = (text) => {
    const userMessage = { text, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    simulateAIResponse(text);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🧠 Smart Chat Assistant</h2>

      <div className="bg-white p-4 rounded-xl shadow h-[500px] overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-xl max-w-[75%] ${msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'} shadow`}>
              <div className="flex items-center gap-2 mb-1">
                {msg.sender === 'ai' ? <Bot size={16} className="text-gray-500" /> : <User size={16} className="text-blue-500" />}
                <span className="font-semibold text-sm">{msg.sender === 'ai' ? 'Assistant' : 'You'}</span>
              </div>
              <p className="text-sm">{msg.text}</p>

              {msg.recommendations && (
                <div className="mt-2 space-y-2">
                  {msg.recommendations.map((prod) => (
                    <div key={prod._id} className="border p-2 rounded-lg bg-white shadow-sm">
                      <div className="font-semibold">{prod.name}</div>
                      <div className="text-sm text-gray-600">{prod.description}</div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-green-600 font-bold">₹ {prod.price}</span>
                        <div className="space-x-2">
                          <button
                            className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
                            onClick={() => navigate(`/product/${prod._id}`)}
                          >
                            View Product
                          </button>
                          <button
                            className="text-sm bg-green-600 text-white px-2 py-1 rounded"
                            onClick={() => addToCart(prod)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="p-3 bg-gray-100 rounded-xl shadow text-sm font-medium">
              <span className="animate-pulse">Assistant is typing...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded-xl shadow"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-600"
        >
          Send
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => handleQuickMessage('Show me some products')}
          className="px-3 py-1 bg-gray-200 text-sm rounded-full hover:bg-gray-300"
        >
          Show Products
        </button>
        <button
          onClick={() => handleQuickMessage('Help')}
          className="px-3 py-1 bg-gray-200 text-sm rounded-full hover:bg-gray-300"
        >
          Help
        </button>
        <button
          onClick={() => handleQuickMessage('What’s in my cart?')}
          className="px-3 py-1 bg-gray-200 text-sm rounded-full hover:bg-gray-300"
        >
          View Cart
        </button>
        <button
          onClick={() => handleQuickMessage('Hi')}
          className="px-3 py-1 bg-gray-200 text-sm rounded-full hover:bg-gray-300"
        >
          Say Hi
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
