import { getConversationMessages } from "@/services/api/conversationsService";
import connectSocket from "@/services/api/sockerService";
import GroupChatHeader from "@/components/GroupChatHeader";
import MessageItem from "@/components/MessageItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Client } from "@stomp/stompjs";
import { jwtDecode } from "jwt-decode";
import { Info, MoreHorizontal, Phone, Send, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatWindow = ({ selectedConversation }) => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const nav = useNavigate();

  const senderId = jwtDecode(localStorage.getItem("token")).sub;

  useEffect(() => {
    const connectSocket = (callback) => {
      const client = new Client({
        brokerURL: import.meta.env.VITE_WEB_SOCKET_URL,
        connectHeaders: {},
        reconnectDelay: 5000,
        onConnect: () => {
          client.subscribe(
            `/topic/chat/${selectedConversation.id}`,
            (newMessage) => {
              callback(newMessage.body);
            }
          );
        },
        onDisconnect: () => {
          console.log("Disconnected");
        },
      });
      client.activate();
      return client;
    };

    const handleData = (data) => {
      const parsedData = JSON.parse(data);
      setMessages((prevMessages) => [...prevMessages, parsedData]);

      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    const client = connectSocket(handleData);
    return () => {
      if (client && client.connected) {
        client.deactivate();
      }
    };
  }, []);

  const handleSendMessage = (conversationId, content) => {
    const client = new Client({
      brokerURL: import.meta.env.VITE_WEB_SOCKET_URL,
      connectHeaders: {},
      reconnectDelay: 5000,
      onConnect: () => {
        client.publish({
          destination: "/app/chat",
          body: JSON.stringify({
            senderId,
            conversationId,
            content,
          }),
        });
      },
      onDisconnect: () => {
        console.log("Disconnected");
      },
    });
    client.activate();
  };

  const fetchMessages = async () => {
    try {
      const response = await getConversationMessages(selectedConversation?.id);
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages();
    } else {
      setMessages([]);
      setMessageText("");
      // Optionally navigate back to conversations list if no conversation is selected
      nav("/chats");
    }
  }, [selectedConversation]);

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <GroupChatHeader conversation={selectedConversation} />

        <div className="flex items-center gap-2">
          {/* <Button variant="ghost" size="icon" className="text-gray-600">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Info className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <MoreHorizontal className="w-4 h-4" />
          </Button> */}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500">Chưa có tin nhắn nào</div>
        )}
        {messages.map((message) => (
          <MessageItem
            message={message}
            currentUserId={senderId}
            key={message.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white px-6 py-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          {/*  */}
          <div className="flex-1 relative">
            <Input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type a new message"
              className="pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              {/* <Button variant="ghost" size="icon" className="text-gray-600">
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 h-8 w-8"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 h-8 w-8"
              >
                <Smile className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 h-8 w-8"
              >
                <Mic className="w-4 h-4" />
              </Button> */}
            </div>
          </div>
          <Button
            variant="primary"
            className="h-10 px-4"
            disabled={!messageText.trim()}
            onClick={() => {
              // Handle send message logic here
              if (messageText.trim() === "") return;
              handleSendMessage(selectedConversation.id, messageText.trim());
              setMessageText("");
            }}
          >
            <Send className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
