"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiMessageSquare, FiSend, FiUser, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AIWidget from "../components/AIWidget";

export default function ChatPage() {
  // Mock data
  const mockAssistants = [
    { id: "1", name: "Translation Bot", avatar: "🤖" },
    { id: "2", name: "Code Assistant", avatar: "👩‍💻" },
  ];

  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const assistantRefs = useRef<(HTMLDivElement | null)[]>([]);

  // State
  const [selectedAssistant, setSelectedAssistant] = useState(mockAssistants[0]);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // GSAP Animations
  useGSAP(() => {
    // Initial animations
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(assistantRefs.current, {
      opacity: 50,
      x: -20,
      stagger: 0.1,
      duration: 0.5,
      delay: 0.3,
    });

    gsap.from(inputRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.8,
      ease: "back.out",
    });
  }, []);

  // Animate new messages
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messageRefs.current[messages.length - 1];
      if (lastMessage) {
        gsap.from(lastMessage, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "back.out",
        });
      }
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        role: "assistant",
        content: `This is a mock response from ${selectedAssistant.name}. In a real app, this would be the AI's reply to: "${input}"`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div
          ref={containerRef}
          className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl w-full max-w-4xl h-[80vh] flex overflow-hidden"
        >
          {/* Sidebar */}
          <div className="w-64 bg-indigo-50/50 border-r border-white/20 p-4">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors mb-6"
            >
              <FiArrowLeft className="mr-2" />
              <span>Back</span>
            </Link>

            <h2 className="font-bold text-lg text-gray-800 mb-4">
              Your Assistants
            </h2>

            <div className="ml-4 space-y-2">
              {mockAssistants.map((asst, index) => (
                <div
                  key={asst.id}
                  ref={(el) => (assistantRefs.current[index] = el)}
                  onClick={() => setSelectedAssistant(asst)}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                    selectedAssistant.id === asst.id
                      ? "bg-indigo-100 border border-indigo-200 shadow-sm"
                      : "hover:bg-white/50"
                  }`}
                >
                  <div className="text-2xl mr-3">{asst.avatar}</div>
                  <div>
                    <h3 className="font-medium">{asst.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/20 flex items-center">
              <div className="text-2xl mr-3">{selectedAssistant.avatar}</div>
              <div>
                <h1 className="font-bold text-gray-800">
                  {selectedAssistant.name}
                </h1>
                <p className="text-sm text-gray-500">Active now</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  ref={(el) => (messageRefs.current[i] = el)}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-white border border-gray-200 rounded-bl-none shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 bg-white border border-gray-200 rounded-2xl rounded-bl-none shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div ref={inputRef} className="p-4 border-t border-white/20">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiMessageSquare />
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="w-full pl-10 pr-12 py-3 bg-gray-50/50 rounded-full focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all border-transparent focus:border-transparent"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${
                    input.trim()
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <AIWidget />
    </section>
  );
}
