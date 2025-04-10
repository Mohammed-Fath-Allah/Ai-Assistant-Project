"use client";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiArrowRight, FiCheckCircle, FiUpload, FiSettings, FiBarChart2, FiSmile } from "react-icons/fi";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  
  useGSAP(() => {
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.from(titleRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6
    })
    .from(descRef.current, {
      opacity: 0,
      y: 15,
      duration: 0.5
    }, "-=0.3")
    .from(cardsRef.current, {
      opacity: 0,
      y: 20,
      stagger: 0.15,
      duration: 0.5
    })
  }, []);

  return (
    <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        
        <h1 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
        >
          Transform Your Workflow
        </h1>
        
        
        <p 
          ref={descRef}
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
        >
         Embed intelligent chat & voice assistants into your websites and mobile apps with our powerful SDKs
        </p>
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: <FiCheckCircle className="w-6 h-6 text-indigo-600" />,
              title: "Sign Up",
              desc: "Create your free account in seconds"
            },
            {
              icon: <FiUpload className="w-6 h-6 text-pink-500" />,
              title: "Upload Data",
              desc: "Import your existing information"
            },
            {
              icon: <FiSettings className="w-6 h-6 text-purple-500" />,
              title: "Configure Build Assistants",
              desc: "Customize to your needs and Create multiple AI assistants"
            },
            {
                icon: <FiSmile className="w-6 h-6 text-indigo-400" />,
                title: "Enjoy Results",
                desc: "Watch your productivity soar"
              }
          ].map((step, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-indigo-50 rounded-full mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
               
        <Link
          ref={buttonRef}
          href="/signup"
          className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:shadow-lg transition-all hover:scale-[1.02]"
        >
          Start Building <FiArrowRight className="ml-2" />
        </Link>
      </div>
    </section>
  );
}