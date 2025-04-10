
"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiArrowRight, FiMenu, FiX, FiUser } from "react-icons/fi";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", current: pathname === "/" },
    {
      href: "/create-assistant",
      label: "Create Assistant",
      current: pathname === "/create-assistant",
    },
    { href: "/assistant", label: "Assistants", current: pathname === "/assistant" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Reload to reflect logout
  };

  // Check if the user is logged in (i.e., if there's a token)
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Hamburger on mobile, links on desktop */}
          <div className="flex items-center">
            {/* Mobile menu button (left) */}
            <button
              className="md:hidden mr-4 text-gray-700 hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Desktop links (left) */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-gray-700 hover:text-indigo-600 px-2 py-2 text-sm font-medium transition-colors ${
                    link.current ? "text-indigo-600 font-semibold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Centered Logo/Brand (always middle) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Ai Assistant
            </Link>
          </div>

          {/* Right CTA Button (always right) */}
          <div>
            {isLoggedIn ? (
              // User icon and logout
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-indigo-600"
              >
                <FiUser size={24} className="mr-2" />
                Logout
              </button>
            ) : (
              // Get Started button for logged-out users
              <Link
                href="/signup"
                className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <span className="hidden md:inline">Get Started</span>
                <FiArrowRight className="text-sm" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu (slides down) */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    link.current
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="px-5 mb-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  <span>Get Started</span>
                  <FiArrowRight className="text-sm" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
