
"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiUser, FiMail, FiLock, FiCheck, FiArrowLeft } from "react-icons/fi";
import AIWidget from "../components/AIWidget";



export default function SignUpPage() {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useGSAP(() => {
    if (iconRefs.current) {
      gsap.from(iconRefs.current, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out"
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
  
    // Validate all fields
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
  
    // Password complexity validation
    if (formData.password) {
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one uppercase letter";
      } else if (!/[@#$%^&+=]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one special character (@#$%^&+=)";
      }
    }
  
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
  
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
  
    setErrors(newErrors);
  
    // Submit if no errors
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('https://localhost:8000/api/register', { // Relative URL
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });
        
          
        const data = await response.json();
  
        if (response.ok) {
          alert('Account created successfully!');
          // Redirect or further actions here (e.g., navigate to login page)
        } else {
          // Handle backend errors
          setErrors({
            general: data.error || 'An unexpected error occurred. Please try again.',
          });
        }
      } catch (error) {
        console.error('Error during signup:', error);
        setErrors({
          general: 'An error occurred while trying to sign up. Please try again.',
        });
      }
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        {/* Back arrow to home */}
        <Link 
          href="/" 
          className="absolute top-4 left-4 text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <FiArrowLeft size={24} />
        </Link>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Join Us
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Create your account in seconds
        </p>

        {/* Error message container */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {Object.values(errors)[0]}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div 
              ref={el => iconRefs.current[0] = el}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <FiUser className="text-lg" />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50/50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all ${
                errors.name ? 'border-red-500' : 'border-transparent'
              }`}
              required
            />
          </div>

          <div className="relative">
            <div 
              ref={el => iconRefs.current[1] = el}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <FiMail className="text-lg" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50/50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all ${
                errors.email ? 'border-red-500' : 'border-transparent'
              }`}
              required
            />
          </div>

          <div className="relative">
            <div 
              ref={el => iconRefs.current[2] = el}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <FiLock className="text-lg" />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50/50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all ${
                errors.password ? 'border-red-500' : 'border-transparent'
              }`}
              required
              minLength={8}
            />
          </div>

          <div className="relative">
            <div 
              ref={el => iconRefs.current[3] = el}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <FiCheck className="text-lg" />
            </div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50/50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all ${
                errors.confirmPassword ? 'border-red-500' : 'border-transparent'
              }`}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all hover:scale-[1.01]"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline font-medium">
            Log in
          </Link>
        </div>
      </div>
      <AIWidget />
    </div>
  );
}