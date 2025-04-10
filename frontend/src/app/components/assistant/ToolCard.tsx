// src/components/assistant/ToolCard.tsx
"use client";
import { Tool } from "@/data/tools";

interface ToolCardProps {
  tool: Tool;
  isSelected: boolean;
  config: any;
  onToggle: () => void;
  onConfigChange: (config: any) => void;
}

export default function ToolCard({
  tool,
  isSelected,
  config,
  onToggle,
  onConfigChange
}: ToolCardProps) {
  const handleConfigChange = (key: string, value: any) => {
    onConfigChange({ ...config, [key]: value });
  };

  return (
    <div className={`p-4 border rounded-lg transition-all ${
      isSelected ? 'border-indigo-500 bg-indigo-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'
    }`}>
      <div className="flex items-start gap-3 cursor-pointer" onClick={onToggle}>
        <span className="text-2xl p-2 rounded-lg bg-white shadow-sm">{tool.icon}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">{tool.name}</h3>
              <p className="text-sm text-gray-600">{tool.description}</p>
            </div>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onToggle}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          {isSelected && (
            <div className="mt-4 space-y-3 pl-11">
              {Object.entries(tool.configOptions).map(([key, option]) => (
                <div key={key} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {option.label}
                    {option.description && (
                      <span className="text-xs text-gray-500 ml-2">
                        {option.description}
                      </span>
                    )}
                  </label>
                  {option.type === 'boolean' ? (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={config[key] ?? option.defaultValue}
                        onChange={(e) => handleConfigChange(key, e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                  ) : option.type === 'select' ? (
                    <select
                      value={config[key] ?? option.defaultValue}
                      onChange={(e) => handleConfigChange(key, e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-1.5"
                    >
                      {option.options?.map(opt => (
                        <option key={opt} value={opt}>
                          {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={option.type === 'number' ? 'number' : 'text'}
                      value={config[key] ?? option.defaultValue}
                      onChange={(e) => handleConfigChange(
                        key, 
                        option.type === 'number' 
                          ? parseInt(e.target.value) 
                          : e.target.value
                      )}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-1.5"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}