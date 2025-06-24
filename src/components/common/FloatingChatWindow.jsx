import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import axios from "axios";

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Xin chào tôi có thể giúp gì cho bạn?", isUser: false },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatWindowRef = useRef(null);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const userMessage = { id: Date.now(), text: newMessage, isUser: true };
    setMessages([...messages, userMessage]);
    setNewMessage("");

    try {
      const response = await axios.post(
        import.meta.env.VITE_GEMINI_API_URL +
          "/?key=" +
          import.meta.env.VITE_GEMINI_API_KEY,
        {
          contents: [
            {
              parts: [
                {
                  text: newMessage,
                },
              ],
            },
          ],
        }
      );
      if (response) {
        const botMessage = {
          id: Date.now() + 1,
          text: response.data?.candidates[0]?.content?.parts[0]?.text,
          isUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.log(error);
      const botMessage = {
        id: Date.now() + 1,
        text: "Xin lỗi, tôi không thể trả lời câu hỏi của bạn ngay bây giờ.",
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="absolute bottom-16 left-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 border border-gray-200"
          style={{ maxHeight: "500px" }}
        >
          {/* Chat Header */}
          <div className="bg-indigo-500 text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">Skill Swap</h3>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-3 h-80 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 ${
                  message.isUser ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg max-w-[80%] ${
                    message.isUser
                      ? "bg-indigo-100 text-gray-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-gray-200 p-3 flex"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1"
            />
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`
          p-4 rounded-full shadow-lg focus:outline-none focus:ring-2
          transition-all duration-300 transform hover:scale-110
          ${
            isOpen
              ? "bg-red-500 hover:bg-red-600"
              : "bg-indigo-500 hover:bg-indigo-600 animate-bounce"
          }
          text-white
        `}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default FloatingChatButton;
