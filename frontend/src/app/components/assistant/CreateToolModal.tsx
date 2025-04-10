// components/assistant/CreateToolModal.tsx
"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";

interface CreateToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (tool: {
    name: string;
    description: string;
    use: string;
    selectedTools: string[];
  }) => void;
  existingTools: string[];
}

export default function CreateToolModal({
  isOpen,
  onClose,
  onCreate,
  existingTools,
}: CreateToolModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [use, setUse] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleToolToggle = (toolId: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ name, description, use, selectedTools });
    onClose();
    setName("");
    setDescription("");
    setUse("");
    setSelectedTools([]);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xs border border-gray-100 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-3 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">New Tool</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1"
              aria-label="Close"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>
  
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Tool name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
              placeholder="Enter tool name"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
              rows={2}
              placeholder="Brief description"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Combine tools</label>
            <div className="max-h-24 overflow-y-auto border border-gray-200 rounded-lg p-1 space-y-1 text-xs">
              {existingTools.map((toolId) => (
                <label 
                  key={toolId} 
                  className="flex items-center space-x-2 p-1.5 hover:bg-gray-50 rounded-md cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedTools.includes(toolId)}
                    onChange={() => handleToolToggle(toolId)}
                    className="h-3 w-3 text-indigo-500 rounded focus:ring-indigo-400 border-gray-300"
                  />
                  <span className="truncate">{toolId}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 shadow-sm"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}