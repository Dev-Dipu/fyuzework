'use client';

import { useState, useRef, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // ⭐ ADDED
import apiClient from '@/lib/axiosInstance'; // ⭐ CHANGED from axios
import { authService } from '@/lib/authService'; // ⭐ ADDED
import ChatHistorySection from "@/components/ChatHistory";

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(`session-${Date.now()}`);
  const chatContainerRef = useRef(null);
  const router = useRouter(); // ⭐ ADDED

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num?.toString() || '0';
  };

  // ⭐ ADDED - Auth check on mount
  useEffect(() => {
    authService.initialize();
    
    if (!authService.isAuthenticated()) {
      router.push('/auth');
    }
  }, [router]);

  // Auto-scroll to bottom when chat history changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', text: message };
    const currentMessage = message;
    
    // Clear input immediately
    setMessage('');
    
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await apiClient.post('/functions/v1/find-influencers', {
        session_id: sessionId,
        message: currentMessage,
        user_id: authService.getUserId()
      });

      if (response.data.success) {
        const assistantMessage = {
          role: 'assistant',
          text: response.data.data.text,
          influencers: response.data.data.influencers_found || []
        };
        setChatHistory(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Error:', error);
      
      // ⭐ ADDED - Handle 401 unauthorized
      if (error.response?.status === 401) {
        authService.logout();
        return;
      }
      
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        text: 'Sorry, there was an error processing your request. Please try again.',
        influencers: []
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQueries = [
    {
      img: "/starsgroup.svg",
      text: "Find top 10 influencers on Instagram in Dubai",
    },
    {
      img: "/usermark.svg",
      text: "Help me with crypto launch campaign",
    },
    {
      img: "/crossHair.svg",
      text: "Find fashion influencers who speak french",
    },
  ];

  return (
    <div className="h-screen w-full flex justify-between bg-[#0D0D0D] relative p-6">
      <div className="absolute top-0 left-0 h-full w-full z-0">
        <Image
          src="/assets/gradientEdited.svg"
          fill
          className="h-full w-full"
          alt="gradient"
        />
      </div>

      {/* Left Sidebar */}
      <div className="h-full bg-[linear-gradient(244.85deg,rgba(255,255,255,0.2)_-16.54%,rgba(255,255,255,0)_-1.98%,rgba(255,255,255,0.2)_61.94%)] backdrop-blur-[500px] z-10 inter w-[20vw] p-6 border-[.5px] rounded-3xl flex flex-col justify-between">
        <div className="space-y-6">
          <Image
            src="/assets/fyuze-logo.svg"
            alt="fyuze logo"
            height={80}
            width={80}
          />
          <button 
            onClick={() => {
              setChatHistory([]);
              setMessage('');
            }}
            className="text-white uppercase text-sm tracking-tighter bg-black w-full gap-2 justify-center py-3 rounded-full flex items-center hover:bg-gray-900 transition"
          >
            <Image
              src="./assets/ChatCircleText.svg"
              height={20}
              width={20}
              alt="chatIcon"
            />
            New chat
          </button>
          <div>
            <ChatHistorySection />
          </div>
          <div>
            <h1 className="text-[#E2E1DC] flex items-center gap-2 cursor-pointer hover:text-white transition">
              <Image
                src="./assets/dashBoard.svg"
                height={24}
                width={24}
                alt="dashBoard"
              />
              Dashboard
            </h1>
          </div>
        </div>
        <div>
          <div className="space-y-4">
            <h1 className="text-white flex items-center gap-2 cursor-pointer">
              <Image
                src="./assets/settings.svg"
                height={24}
                width={24}
                alt="settings"
              />
              Settings
            </h1>
            <hr />
            <h1 className="text-white text-sm">Profile</h1>
            <div className="flex items-center gap-2">
              <Image
                src="/assets/profile.png"
                alt="profile"
                height={40}
                width={40}
                className="rounded-full"
              />
              <div>
                <h1 className="text-white">Jenny Wilson</h1>
                <p className="text-xs text-[#C1C1C1]">
                  jennywilson@fyuze.com
                </p>
              </div>
            </div>
            {/* ⭐ ADDED onClick handler for logout */}
            <button 
              onClick={() => authService.logout()}
              className="text-white text-sm tracking-tighter border-[.5px] w-full gap-2 justify-center py-2 rounded-full flex items-center hover:bg-white/10 transition"
            >
              <Image
                src="./assets/logOut.svg"
                height={20}
                width={20}
                alt="chatIcon"
              />
              Log out
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="h-full relative text-white w-[72vw] z-10 flex flex-col">
        {chatHistory.length === 0 ? (
          // Empty State
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col justify-center items-center font-[inter]">
              <Image
                className="invert"
                height={1}
                width={30}
                src={"/MONOGRAM.svg"}
                alt="logo"
              />
              <h3 className="text-3xl font-archivo font-semibold mt-2">
                Ask Fyuze to find your next Influencer
              </h3>
              <p className="w-[56%] text-center text-sm leading-tight mt-5">
                AI-powered influencer discovery that filters by niche,
                authenticity & ROI so you spend less time searching and
                more time growing.
              </p>
              <div className="w-[70%] flex gap-5 mt-8 font-light">
                {suggestedQueries.map((card, index) => (
                  <div
                    key={index}
                    onClick={() => setMessage(card.text)}
                    className="w-1/3 px-6 py-4 rounded-4xl cursor-pointer hover:scale-105 transition
                     bg-[linear-gradient(244.85deg,rgba(255,255,255,0.2)_-16.54%,rgba(255,255,255,0)_-1.98%,rgba(255,255,255,0.2)_61.94%)]
                     border border-transparent backdrop-blur-[500px]"
                  >
                    <Image
                      height={1}
                      width={20}
                      src={card.img}
                      alt="icon"
                    />
                    <p className="text-sm mt-1.5 leading-tight">
                      {card.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Chat Messages
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-8 pt-6 pb-16 space-y-6 scroll-smooth w-6/7 mx-auto"
          >
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className='flex flex-wrap w-full'>
                  {msg.influencers && msg.influencers.length > 0 && (
                  msg.influencers.map((influ, i) => (
                    <div key={i} className="relative h-80 w-56 rounded-3xl overflow-hidden group cursor-pointer transition-transform hover:scale-105">
      {/* Background Image */}
      <div className="absolute h-full w-full top-0 left-0"
      style={{
        backgroundImage: "url('https://instagram.fudi1-2.fna.fbcdn.net/v/t51.2885-19/535115009_18524271448007147_4000120314538915707_n.jpg?stp=dst-jpg_s320x320_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDQyLmMyIn0&_nc_ht=instagram.fudi1-2.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2QHA5Yw6uOM3IFmsBOm9cn_Qp1lp61I8Nnisq9beX5zVEYB99bGPZzkVZQiFc1KOlgo&_nc_ohc=4FYGdg8ZNAQQ7kNvwH6F_3D&_nc_gid=7IEn-cgoKpj-zKrxVUp4iw&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Afe85Rt32r3_-pEeUY4AL5z7j1UdrP5zfbAyIRhA0uxZFA&oe=68F9089D&_nc_sid=8b3546')"
      }}>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
      </div>

      {/* Verified Badge - Top Left */}
      {influ.is_verified && (
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full p-1.5">
          <CheckCircle className="w-5 h-5 text-blue-500" fill="currentColor" />
        </div>
      )}

      {/* Content at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
        {/* Name */}
        <h3 className="text-white font-bold text-lg leading-tight line-clamp-1">
          {influ.full_name}
        </h3>

        {/* Bio */}
        <p className="text-gray-300 text-xs leading-tight line-clamp-2 mb-1">
          {influ.bio}
        </p>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-white text-sm">
          <div className="flex flex-col">
            <span className="font-semibold">{formatNumber(influ.followers)}</span>
            <span className="text-gray-400 text-xs">Followers</span>
          </div>
          
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="text-xs">@{influ.username}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-70">
              <path d="M10 4L6 8L2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-3xl transition-all pointer-events-none" />
    </div>
                  ))
                )}
                </div>
                <div className={`max-w-[80%] px-6 py-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-white/10 backdrop-blur-md' 
                    : 'bg-[linear-gradient(244.85deg,rgba(255,255,255,0.2)_-16.54%,rgba(255,255,255,0)_-1.98%,rgba(255,255,255,0.2)_61.94%)] backdrop-blur-[500px] border border-white/10'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  {msg.influencers && msg.influencers.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs text-[#C1C1C1]">Found {msg.influencers.length} influencers</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-6 py-4 rounded-2xl bg-[linear-gradient(244.85deg,rgba(255,255,255,0.2)_-16.54%,rgba(255,255,255,0)_-1.98%,rgba(255,255,255,0.2)_61.94%)] backdrop-blur-[500px] border border-white/10">
                  <p className="text-sm">Searching for influencers...</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input Area */}
        <div className="w-4/5 mx-auto mb-6 pointer-events-auto" style={{ willChange: "opacity, transform" }}>
          <div className="absolute w-full bg-[#060606] h-20 -translate-y-10 rounded-4xl flex justify-end px-6 py-2.5 font-[inter] font-medium">
            <div className="flex h-fit items-center gap-1 cursor-pointer hover:text-white transition">
              <Image height={1} width={20} src={'/faders.svg'} alt="faders" />
              <h4 className="text-base font-medium text-[#C5C5C5]">Search with advanced filters</h4>
            </div>
          </div>
          <input
            type="text"
            placeholder="Ask for... Food related Influencers in India"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="w-[70%] h-full absolute z-90 outline-none text-white bg-transparent placeholder:text-[#5D5D5D] placeholder:font-[inter] ml-20"
            style={{ willChange: "opacity, transform" }}
          />
          <div className="relative bg-[#0D0D0D] w-full flex justify-between items-center p-5 h-full rounded-[28px] backdrop-blur-[120px] z-80" style={{ willChange: "opacity, filter, transform" }}>
            <div>
              <Image height={1} width={40} src={'/circlemonologo.svg'} alt="logo" />
            </div>
            <div className="w-px h-4 absolute left-18 z-20 bg-white"></div>
            <div className="flex items-center gap-3" style={{ willChange: "opacity, transform" }}>
              <div className="relative flex items-center justify-center p-3 rounded-2xl icon-gradient cursor-pointer hover:scale-105 transition" style={{ willChange: "opacity, transform" }}>
                <div className="relative w-5 h-5" style={{ willChange: "opacity, transform" }}>
                  <Image
                    src="/assets/clip.svg"
                    alt="logo"
                    fill
                    className="object-contain"
                    style={{ willChange: "opacity, transform" }}
                  />
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !message.trim()}
                className="relative flex items-center justify-center p-3 rounded-2xl icon-gradient cursor-pointer hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ willChange: "opacity, transform" }}
              >
                <div className="relative w-5 h-5" style={{ willChange: "opacity, transform" }}>
                  <Image
                    src="/assets/arrow.svg"
                    alt="logo"
                    fill
                    className="object-contain"
                    style={{ willChange: "opacity, transform" }}
                  />
                </div>
              </button>
            </div>
          </div>
          <div className="w-full absolute top-0 left-0 overflow-hidden custom-border h-full z-90 pointer-events-none" style={{ willChange: "opacity, transform" }}></div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="h-full z-10 w-[8vw] flex flex-col justify-between items-end">
        <div className="flex flex-col gap-4">
          <button className="hover:scale-110 transition">
            <Image
              src="./assets/linkIcon.svg"
              height={50}
              width={50}
              alt="chatIcon"
            />
          </button>
          <button className="hover:scale-110 transition">
            <Image
              src="./assets/linkMagnifying.svg"
              height={50}
              width={50}
              alt="chatIcon"
            />
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ChatPage;