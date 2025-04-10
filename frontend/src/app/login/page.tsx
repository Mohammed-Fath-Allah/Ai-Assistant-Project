// "use client";
// import { useRef, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { FiMail, FiLock, FiArrowRight, FiArrowLeft } from "react-icons/fi";
// import AIWidget from "../components/AIWidget";

// export default function LoginPage() {
//   const emailIconRef = useRef<HTMLDivElement>(null);
//   const passwordIconRef = useRef<HTMLDivElement>(null);
//   const formRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useGSAP(() => {
//     gsap.from(formRef.current, {
//       opacity: 0,
//       y: 20,
//       duration: 0.6,
//       ease: "power2.out"
//     });

//     const icons = [emailIconRef.current, passwordIconRef.current].filter(Boolean);
//     gsap.from(icons, {
//       opacity: 0,
//       x: -10,
//       stagger: 0.15,
//       duration: 0.5,
//       delay: 0.3,
//       ease: "back.out"
//     });
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("https://localhost:8000/api/login", { // Change URL to match your backend
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//         mode: "cors",  
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Login failed");
//         return;
//       }

//       // Save token in localStorage
//       localStorage.setItem("token", data.token);

//       // Redirect to dashboard or wherever you want
//       router.push("/");

//     } catch (err) {
//       console.error("Login error:", err);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 flex items-center justify-center p-4">
//       <div 
//         ref={formRef}
//         className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-8"
//       >
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
//           <p className="text-gray-500">Sign in to your account</p>
//         </div>

//         <form className="space-y-5" onSubmit={handleSubmit}>
//           <Link 
//             href="/" 
//             className="absolute top-4 left-4 text-gray-600 hover:text-indigo-600 transition-colors"
//           >
//             <FiArrowLeft size={24} />
//           </Link>

//           {/* Email Field */}
//           <div className="relative">
//             <div 
//               ref={emailIconRef}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             >
//               <FiMail className="text-lg" />
//             </div>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 bg-gray-50/50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
//               required
//             />
//           </div>

//           {/* Password Field */}
//           <div className="relative">
//             <div 
//               ref={passwordIconRef}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             >
//               <FiLock className="text-lg" />
//             </div>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 bg-gray-50/50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
//               required
//             />
//           </div>

//           <div className="flex justify-between items-center">
//             <label className="flex items-center text-sm text-gray-500">
//               <input type="checkbox" className="rounded border-gray-300 mr-2" />
//               Remember me
//             </label>
//             <Link 
//               href="/forgot-password" 
//               className="text-sm text-indigo-600 hover:underline"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
//           >
//             Log In <FiArrowRight />
//           </button>
//         </form>

//         <div className="mt-6 text-center text-sm text-gray-500">
//           Don't have an account?{" "}
//           <Link 
//             href="/signup" 
//             className="text-indigo-600 hover:underline font-medium"
//           >
//             Sign up
//           </Link>
//         </div>
//       </div>
//       <AIWidget />
//     </div>
//   );
// }
"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiMail, FiLock, FiArrowRight, FiArrowLeft, FiUser } from "react-icons/fi";
import AIWidget from "../components/AIWidget";

export default function LoginPage() {
  const emailIconRef = useRef<HTMLDivElement>(null);
  const passwordIconRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in on initial load
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  useGSAP(() => {
    gsap.from(formRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out"
    });

    const icons = [emailIconRef.current, passwordIconRef.current].filter(Boolean);
    gsap.from(icons, {
      opacity: 0,
      x: -10,
      stagger: 0.15,
      duration: 0.5,
      delay: 0.3,
      ease: "back.out"
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("https://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        mode: "cors",  
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save token and user info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));  // Store user data

      setIsLoggedIn(true); // Update logged-in state

      // Redirect to home page
      router.push("/");

    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false); // Update logged-in state
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div 
        ref={formRef}
        className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        {!isLoggedIn ? (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Link 
              href="/" 
              className="absolute top-4 left-4 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <FiArrowLeft size={24} />
            </Link>

            {/* Email Field */}
            <div className="relative">
              <div 
                ref={emailIconRef}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <FiMail className="text-lg" />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50/50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div 
                ref={passwordIconRef}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <FiLock className="text-lg" />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50/50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center text-sm text-gray-500">
                <input type="checkbox" className="rounded border-gray-300 mr-2" />
                Remember me
              </label>
              <Link 
                href="/forgot-password" 
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              Log In <FiArrowRight />
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiUser size={24} />
              <span>Welcome, User!</span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-sm text-indigo-600 hover:underline"
            >
              Logout
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link 
            href="/signup" 
            className="text-indigo-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
      <AIWidget />
    </div>
  );
}
