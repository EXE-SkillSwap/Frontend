import logo from "@/assets/newLogo.png"; // Adjust the path as necessary
import ChatItem from "@/components/ChatItem";
import ChatWindow from "@/components/ChatWindow";
import Header from "@/components/common/Header";
import EmtyMessageState from "@/components/EmtyMessageState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getConversations } from "@/services/api/conversationsService";
import { Grid3X3, MoreHorizontal, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const nav = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const conversationId = params.get("cId");

  const fetchConversations = async () => {
    try {
      const reponse = await getConversations();
      setConversations(reponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleConversationClick = (conversation) => {
    nav(`/chats?cId=${conversation.id}`);
    setSelectedConversation(conversation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-purple-300 to-cyan-200 p-6 flex">
      {/* Main Chat Container */}
      <Header />
      <div className="max-w-8xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden h-[calc(100vh-7rem)] flex-1 flex flex-col mt-15">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Logo"
              className="w-6 h-6 rounded-md"
              onClick={() => nav("/chats")}
            />
            <div className="relative"></div>
          </div>
        </div>

        <div className="flex h-[calc(100%-80px)]">
          {/* Sidebar */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {/* Chat Header */}
              <div className="px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2"></div>
              </div>

              {/* Recent Section */}
              <div className="px-4 py-2">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Hiện tại
                </h3>
                <div className="space-y-1">
                  {conversations.map((conversation) => (
                    <ChatItem
                      key={conversation?.id}
                      chat={conversation}
                      onClick={() => handleConversationClick(conversation)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          {conversationId ? (
            <ChatWindow selectedConversation={selectedConversation} />
          ) : (
            <EmtyMessageState />
          )}
        </div>
      </div>
    </div>
  );
}
