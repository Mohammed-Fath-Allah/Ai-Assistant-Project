// "use client";
// import Link from "next/link";
// import { FiPlus } from "react-icons/fi";
// import Navbar from "@/app/components/Navbar";
// import Footer from "@/app/components/Footer";

// export default function AssistantsPage() {
//   // Static example data - replace with your actual data
//   const assistants = [
//     {
//       id: 1,
//       name: "Customer Support Bot",
//       description: "Handles common customer inquiries",
//       lastUpdated: "2 days ago",
//     },
//     // Add more assistants here when you have dynamic data
//   ];

//   return (
//     <section>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-3xl font-bold text-gray-800 mb-8">
//             Your Assistants
//           </h1>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {/* Existing Assistant Cards */}
//             {assistants.map((assistant) => (
//               <div
//                 key={assistant.id}
//                 className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
//               >
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                   {assistant.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-4">
//                   {assistant.description}
//                 </p>
//                 <div className="text-xs text-gray-500">
//                   Last updated: {assistant.lastUpdated}
//                 </div>
//               </div>
//             ))}

//             {/* Create New Assistant Card */}
//             <Link
//               href="/create-assistant"
//               className="bg-white/80 backdrop-blur-lg border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-300 transition-colors flex flex-col items-center justify-center p-6 min-h-[180px] group"
//             >
//               <div className="bg-indigo-100 text-indigo-600 rounded-full p-4 mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
//                 <FiPlus className="w-6 h-6" />
//               </div>
//               <span className="text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">
//                 Create New Assistant
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </section>
//   );
// }

"use client";
import Link from "next/link";
import { FiPlus, FiSettings, FiMessageSquare } from "react-icons/fi";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AIWidget from "../components/AIWidget";


export default function AssistantsPage() {
  // Static example data
  const assistants = [
    {
      id: 1,
      name: "Customer Support Bot",
      description: "Handles common customer inquiries 24/7",
      lastUpdated: "2 days ago",
      interactions: "1,243 conversations"
    },
    // Add more assistants here when ready
  ];

  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Your Assistants</h1>
            <Link 
              href="/create-assistant"
              className="hidden md:flex items-center bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <FiPlus className="mr-2" /> New Assistant
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Existing Assistant Cards */}
            {assistants.map((assistant) => (
              <div
                key={assistant.id}
                className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                      <FiMessageSquare className="w-5 h-5" />
                    </div>
                    <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <FiSettings className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {assistant.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {assistant.description}
                  </p>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Updated: {assistant.lastUpdated}</span>
                      <span>{assistant.interactions}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Create New Assistant Card */}
            <Link
              href="/create-assistant"
              className="bg-white/80 backdrop-blur-lg border-2 border-dashed border-indigo-200 rounded-2xl hover:border-indigo-300 transition-all hover:-translate-y-1 flex flex-col items-center justify-center p-6 min-h-[220px] group"
            >
              <div className="bg-gradient-to-r from-indigo-100 to-pink-100 text-indigo-600 rounded-full p-5 mb-4 group-hover:from-indigo-200 group-hover:to-pink-200 group-hover:text-indigo-700 transition-all">
                <FiPlus className="w-8 h-8" />
              </div>
              <span className="text-lg font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                Create New Assistant
              </span>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Build a custom AI assistant
              </p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <AIWidget />
    </section>
  );
}