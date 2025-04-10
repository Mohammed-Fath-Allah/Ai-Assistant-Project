"use client";
import { useState } from "react";
import {
  FiPlus,
  FiTrash2,
  FiUpload,
  FiChevronDown,
  FiX,
  FiInfo,
} from "react-icons/fi";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { availableTools, Tool } from "@/data/tools";
import AIWidget from "../components/AIWidget";


export default function CreateAssistantForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    personality: "professional",
    knowledgeSources: [] as File[],
  });


  const personalityOptions = [
    { value: "professional", label: "Professional" },
    { value: "friendly", label: "Friendly" },
    { value: "technical", label: "Technical" },
    { value: "humorous", label: "Humorous" },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData({
        ...formData,
        knowledgeSources: [...formData.knowledgeSources, ...newFiles],
      });
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...formData.knowledgeSources];
    updatedFiles.splice(index, 1);
    setFormData({ ...formData, knowledgeSources: updatedFiles });
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", formData.name);
    formData.append("description", formData.description);
    formData.append("personality", formData.personality);
    
    // Append files to FormData
    formData.knowledgeSources.forEach((file) => {
      formData.append("knowledgeSources[]", file);
    });
  
    try {
      const response = await fetch("http://localhost:8000/api/assistants", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // If you're using a token for auth
        },
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Assistant created:", result);
      } else {
        console.error("Error creating assistant:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <section>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 m-5 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Create New Assistant
        </h2>
        <p className="text-gray-600 mb-8">
          Configure your AI assistant in just a few steps
        </p>

        <div className="flex mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex-1">
              <div
                className={`flex flex-col items-center ${
                  stepNumber < step
                    ? "text-indigo-600"
                    : stepNumber === step
                    ? "text-pink-500"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    stepNumber < step
                      ? "bg-indigo-100"
                      : stepNumber === step
                      ? "bg-pink-100"
                      : "bg-gray-100"
                  }`}
                >
                  {stepNumber < step ? (
                    <span className="text-indigo-600">✓</span>
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
                <span className="text-sm font-medium">
                  {stepNumber === 1 && "Basic Info"}
                  {stepNumber === 2 && "Knowledge"}
                  {stepNumber === 3 && "Deployment"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Assistant Name*
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Customer Support Bot"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="What does this assistant do?"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Personality*</label>
                <div className="relative">
                  <select
                    value={formData.personality}
                    onChange={(e) =>
                      setFormData({ ...formData, personality: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {personalityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Upload Knowledge Sources
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Supported formats: PDF, CSV, DOCX, PPTX, TXT (Max 50MB each)
                  </p>
                  <label className="cursor-pointer bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
                    Select Files
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileUpload}
                      accept=".pdf,.csv,.docx,.pptx,.txt"
                    />
                  </label>
                </div>
              </div>

              {formData.knowledgeSources.length > 0 && (
                <div>
                  <h4 className="text-gray-700 mb-3">Selected Files:</h4>
                  <ul className="space-y-2">
                    {formData.knowledgeSources.map((file, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                      >
                        <span className="text-sm text-gray-700 truncate max-w-xs">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-indigo-700 font-medium mb-2">
                  Ready to create your assistant?
                </h4>
                <p className="text-indigo-600 text-sm">
                  Review your settings and click "Create Assistant" to finish.
                </p>
              </div>
            </div>
          )}

          <div className="mt-10 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <a href="/prompt-page">Create Assistant</a>
              </button>
            )}
          </div>
        </form>
      </div>
      <Footer />
      <AIWidget />
    </section>
  );
}
