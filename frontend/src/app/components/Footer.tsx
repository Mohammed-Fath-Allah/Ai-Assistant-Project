"use client";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-lg border-t border-white/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Branding */}
          <div className="mb-4 md:mb-0">
            <Link 
              href="/" 
              className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors"
            >
              Ai Assistant
            </Link>
            <p className="text-gray-500 text-sm mt-1">
              Building beautiful digital experiences
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <Link 
              href="https://github.com/yourusername" 
              target="_blank"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
              aria-label="GitHub"
            >
              <FiGithub className="h-5 w-5" />
            </Link>
            <Link 
              href="https://linkedin.com/in/yourusername" 
              target="_blank"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="h-5 w-5" />
            </Link>
            <Link 
              href="mailto:your@email.com" 
              className="text-gray-700 hover:text-indigo-600 transition-colors"
              aria-label="Email"
            >
              <FiMail className="h-5 w-5" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="mt-4 md:mt-0 text-sm text-gray-500">
            © {new Date().getFullYear()} Ai Assistant. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}