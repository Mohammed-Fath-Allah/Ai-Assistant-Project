"use client";
import { useState } from 'react';
import { FiSend, FiMail, FiX, FiMessageSquare, FiChevronLeft } from 'react-icons/fi';

export default function AIWidget() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [showWidget, setShowWidget] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const faqs = [
    {
      question: "How do I create an assistant?",
      answer: "Navigate to your dashboard and click 'Create New Assistant'. Give it a name, select its personality traits, and connect it to your knowledge base."
    },
    {
      question: "What file types can I upload?",
      answer: "We support PDFs, CSV/Excel files, Word documents, PowerPoint presentations, and plain text files up to 50MB each."
    },
    {
      question: "How do I embed in my website?",
      answer: "Copy our JavaScript snippet from the Integration tab and paste it before your </body> tag. You can customize colors and position in the settings."
    },
    {
      question: "Is there an Android SDK?",
      answer: "Yes! Our Android SDK is available on Maven Central. Just add 'com.yourplatform:assistant-sdk:1.0.0' to your build.gradle dependencies."
    },
    {
      question: "Is there an iOS SDK?",
      answer: "Absolutely. Our iOS SDK is available through CocoaPods and Swift Package Manager. Search for 'YourPlatformAssistant' in your package manager."
    },
    {
      question: "Can I have multiple assistants?",
      answer: "Yes, premium plans allow up to 10 assistants. Each can have unique knowledge bases and personalities for different use cases."
    },
    {
      question: "How do I train my assistant?",
      answer: "Upload documents to its knowledge base, provide example Q&A pairs, and use our training playground to refine responses."
    },
    {
      question: "What languages are supported?",
      answer: "We currently support English, Spanish, French, German, and Japanese, with more languages coming soon."
    },
    {
      question: "Is my data secure?",
      answer: "All data is encrypted in transit and at rest. We're SOC 2 compliant and offer enterprise-grade security features."
    },
    {
      question: "How much does it cost?",
      answer: "We offer a free tier with basic features. Paid plans start at $29/month with advanced capabilities and higher usage limits."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = faqs.find(faq => 
      faq.question.toLowerCase().includes(question.toLowerCase())
    );
    
    if (found) {
      setAnswer(found.answer);
      setShowAllQuestions(false);
    } else {
      const mailtoLink = `mailto:support@yourapp.com?subject=New Question: ${encodeURIComponent(question)}&body=I couldn't find an answer to: ${encodeURIComponent(question)}`;
      window.location.href = mailtoLink;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
      {showWidget ? (
        <div className={`bg-white rounded-t-lg shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 ${isMinimized ? 'h-12' : 'h-[32rem] w-80'}`}>
          {/* Header */}
          <div 
            className="bg-gradient-to-r from-indigo-600 to-pink-500 p-3 text-white flex justify-between items-center cursor-pointer"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <div className="flex items-center gap-2">
              <FiMessageSquare />
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowWidget(false);
                }} 
                className="text-white hover:text-gray-200"
              >
                <FiX />
              </button>
            </div>
          </div>
          
          {/* Content - Only visible when not minimized */}
          {!isMinimized && (
            <div className="p-4 h-[calc(100%-110px)] overflow-y-auto">
              {answer && !showAllQuestions ? (
                <div className="mb-4">
                  <button 
                    onClick={() => {
                      setAnswer('');
                      setQuestion('');
                    }}
                    className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 mb-3"
                  >
                    <FiChevronLeft className="mr-1" /> Back to questions
                  </button>
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <p className="font-medium mb-2">{question}</p>
                    <p>{answer}</p>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-3">Frequently Asked Questions:</h4>
                  <ul className="space-y-2">
                    {faqs.map((faq, i) => (
                      <li 
                        key={i}
                        className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer p-2 hover:bg-indigo-50 rounded"
                        onClick={() => {
                          setQuestion(faq.question);
                          setAnswer(faq.answer);
                          setShowAllQuestions(false);
                        }}
                      >
                        • {faq.question}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Input - Only visible when not minimized */}
          {!isMinimized && (
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 absolute bottom-0 left-0 right-0 bg-white">
              <div className="flex">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <button 
                  type="submit"
                  className="bg-indigo-600 text-white px-3 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
                >
                  <FiSend />
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <button
          onClick={() => setShowWidget(true)}
          className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center"
        >
          <FiMessageSquare size={24} />
        </button>
      )}
    </div>
  );
}