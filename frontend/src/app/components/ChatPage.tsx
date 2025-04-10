"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiMessageSquare, FiSend, FiUser, FiArrowLeft, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import { sendChatMessage, getLocalConversations, saveLocalConversation } from "@/services/chatService";

interface Message {
    role: string;
    content: string;
    timestamp?: number;
}

interface Assistant {
    id: string;
    name: string;
    avatar: string;
    systemPrompt: string;
}

export default function ChatPage() {
    const assistants: Assistant[] = [
        { id: "1", name: "General Assistant", avatar: "🤖", systemPrompt: "You are a helpful assistant." },
        { id: "2", name: "Code Expert", avatar: "👩‍💻", systemPrompt: "You are an expert programmer. Provide clean, efficient code solutions with explanations." },
        { id: "3", name: "Language Translator", avatar: "🌍", systemPrompt: "You are a professional translator. Translate text accurately while maintaining original meaning and tone." },
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const messageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const assistantRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [selectedAssistant, setSelectedAssistant] = useState<Assistant>(assistants[0]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [rateLimit, setRateLimit] = useState<{ remaining: number; reset: number } | null>(null);

    // Load conversation history when assistant changes
    useEffect(() => {
        const conversations = getLocalConversations();
        if (conversationId && conversations[conversationId]) {
            setMessages(conversations[conversationId]);
        } else {
            setMessages([]);
        }
    }, [conversationId]);

    // Animation effects (keep your existing GSAP code)
    useGSAP(() => { /* ... */ }, []);
    useEffect(() => { /* ... */ }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
      
        // Add user message
        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);
      
        try {
            const response = await fetch('https://localhost:8000/api/groq/chat', {  // ✅ Add full URL
              method: 'POST',  // ← Explicit POST
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                prompt: input,
                systemPrompt: selectedAssistant.systemPrompt,
              }),
            });

            
      
          if (!response.ok) throw new Error("API request failed");
      
          const data = await response.json();
          
          // Add AI response
          const aiMessage = { role: "assistant", content: data.response };
          setMessages((prev) => [...prev, aiMessage]);
      
        } catch (error) {
          console.error("Error:", error);
          setMessages((prev) => [...prev, {
            role: "assistant",
            content: "⚠️ Failed to get a response. Please try again.",
          }]);
        } finally {
          setIsLoading(false);
        }
      };

    const handleNewConversation = () => {
        setConversationId(null);
        setMessages([]);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div ref={containerRef} className="max-w-6xl mx-auto p-4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="flex h-[80vh]">
                        {/* Sidebar */}
                        <div className="w-64 bg-indigo-50 border-r p-4 flex flex-col">
                            <Link href="/" className="flex items-center text-gray-600 hover:text-indigo-600 mb-6">
                                <FiArrowLeft className="mr-2" />
                                <span>Back</span>
                            </Link>

                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-bold text-lg">Assistants</h2>
                                <button 
                                    onClick={handleNewConversation}
                                    className="text-sm text-indigo-600 hover:text-indigo-800"
                                >
                                    New Chat
                                </button>
                            </div>

                            <div className="space-y-2 flex-1 overflow-y-auto">
                                {assistants.map((asst, index) => (
                                    <div
                                        key={asst.id}
                                        ref={(el) => (assistantRefs.current[index] = el)}
                                        onClick={() => setSelectedAssistant(asst)}
                                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                                            selectedAssistant.id === asst.id
                                                ? "bg-indigo-100 border border-indigo-200"
                                                : "hover:bg-white"
                                        }`}
                                    >
                                        <div className="text-2xl mr-3">{asst.avatar}</div>
                                        <div className="truncate">
                                            <h3 className="font-medium truncate">{asst.name}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Main Chat Area */}
                        <div className="flex-1 flex flex-col">
                            {/* Header */}
                            <div className="p-4 border-b flex items-center">
                                <div className="text-2xl mr-3">{selectedAssistant.avatar}</div>
                                <div>
                                    <h1 className="font-bold">{selectedAssistant.name}</h1>
                                    <p className="text-sm text-gray-500">
                                        {rateLimit ? `${rateLimit.remaining} requests remaining` : "Ready"}
                                    </p>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        ref={(el) => (messageRefs.current[i] = el)}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-2xl ${
                                                msg.role === "user"
                                                    ? "bg-indigo-600 text-white rounded-br-none"
                                                    : "bg-gray-100 rounded-bl-none"
                                            }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="max-w-[80%] p-3 bg-gray-100 rounded-2xl rounded-bl-none">
                                            <div className="flex space-x-2">
                                                {[0, 1, 2].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                        style={{ animationDelay: `${i * 0.2}s` }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {error && (
                                    <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                                        {error}
                                    </div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div ref={inputRef} className="p-4 border-t">
                                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type your message..."
                                        className="w-full pl-4 pr-12 py-3 border rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading || !input.trim()}
                                        className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                                            input.trim() && !isLoading
                                                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                                : "bg-gray-200 text-gray-400"
                                        }`}
                                    >
                                        <FiSend />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}