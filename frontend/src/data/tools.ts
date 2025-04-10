// src/data/tools.ts
export  interface ToolConfigOption {
    type: 'boolean' | 'number' | 'select' | 'text';
    label: string;
    defaultValue: any;
    options?: string[];
    description?: string;
  }
  
  export interface Tool {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: 'productivity' | 'technical' | 'communication';
    configOptions: Record<string, ToolConfigOption>;
  }
  
  export const availableTools: Tool[] = [
    {
        id: 'openai-api',
        name: 'OpenAI API',
        description: 'Use OpenAI’s API for language processing, code generation, and more.',
        icon: '🤖',
        category: 'technical',
        configOptions: {
          model: {
            type: 'select',
            label: 'Model',
            defaultValue: 'text-davinci-003',
            options: ['text-davinci-003', 'gpt-4', 'davinci-002'],
            description: 'Choose which OpenAI model to use'
          },
          temperature: {
            type: 'number',
            label: 'Temperature',
            defaultValue: 0.7,
            description: 'Controls randomness in responses (0.0 to 1.0)'
          },
          max_tokens: {
            type: 'number',
            label: 'Max Tokens',
            defaultValue: 150,
            description: 'Maximum number of tokens for the output response'
          }
        }
      },
    {
      id: 'doc-search',
      name: 'Document Search',
      description: 'Full-text search across uploaded documents',
      icon: '🔍',
      category: 'productivity',
      configOptions: {
        search_depth: {
          type: 'select',
          label: 'Search Depth',
          defaultValue: 'standard',
          options: ['basic', 'standard', 'deep'],
          description: 'Determines how thoroughly to search documents'
        },
        highlight_matches: {
          type: 'boolean',
          label: 'Highlight Matches',
          defaultValue: true,
          description: 'Show visual highlights in search results'
        }
      }
    },
    {
      id: 'data-calculator',
      name: 'Data Calculator',
      description: 'Perform calculations on numeric data',
      icon: '🧮',
      category: 'technical',
      configOptions: {
        decimal_places: {
          type: 'number',
          label: 'Decimal Places',
          defaultValue: 2,
          description: 'Number of decimal places to display'
        },
        auto_round: {
          type: 'boolean',
          label: 'Auto-round Results',
          defaultValue: true
        }
      }
    },
    {
      id: 'polyglot',
      name: 'Polyglot Translator',
      description: 'Real-time language translation',
      icon: '🌐',
      category: 'communication',
      configOptions: {
        default_language: {
          type: 'select',
          label: 'Default Language',
          defaultValue: 'english',
          options: ['english', 'spanish', 'french', 'german', 'japanese']
        },
        detect_language: {
          type: 'boolean',
          label: 'Auto-detect Language',
          defaultValue: true
        }
      }
    },
    {
      id: 'code-helper',
      name: 'Code Helper',
      description: 'Explain and generate code snippets',
      icon: '💻',
      category: 'technical',
      configOptions: {
        language: {
          type: 'select',
          label: 'Default Language',
          defaultValue: 'javascript',
          options: ['javascript', 'python', 'java', 'c#', 'php']
        },
        explain_complexity: {
          type: 'boolean',
          label: 'Explain Complexity',
          defaultValue: true
        }
      }
    },
    {
      id: 'meeting-miner',
      name: 'Meeting Miner',
      description: 'Summarize meeting transcripts',
      icon: '🎙️',
      category: 'productivity',
      configOptions: {
        summary_length: {
          type: 'select',
          label: 'Summary Length',
          defaultValue: 'medium',
          options: ['short', 'medium', 'detailed']
        },
        extract_actions: {
          type: 'boolean',
          label: 'Extract Action Items',
          defaultValue: true
        }
      }
    },
    {
      id: 'content-crafter',
      name: 'Content Crafter',
      description: 'Generate written content drafts',
      icon: '✍️',
      category: 'productivity',
      configOptions: {
        tone: {
          type: 'select',
          label: 'Default Tone',
          defaultValue: 'professional',
          options: ['professional', 'casual', 'friendly', 'authoritative']
        },
        max_length: {
          type: 'number',
          label: 'Max Length (words)',
          defaultValue: 300
        }
      }
    },
    {
      id: 'research-assistant',
      name: 'Research Assistant',
      description: 'Find and summarize online sources',
      icon: '🔬',
      category: 'productivity',
      configOptions: {
        sources: {
          type: 'number',
          label: 'Max Sources',
          defaultValue: 3,
          description: 'Maximum references to include'
        },
        include_links: {
          type: 'boolean',
          label: 'Include Source Links',
          defaultValue: true
        }
      }
    },
    {
      id: 'workflow-automator',
      name: 'Workflow Automator',
      description: 'Create custom automation rules',
      icon: '⚙️',
      category: 'technical',
      configOptions: {
        trigger_conditions: {
          type: 'text',
          label: 'Trigger Conditions',
          defaultValue: '',
          description: 'Describe when this should run'
        },
        notify_on_complete: {
          type: 'boolean',
          label: 'Notify on Completion',
          defaultValue: true
        }
      }
    }
  ];