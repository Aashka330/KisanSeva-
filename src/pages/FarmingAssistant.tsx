import { useState, useRef, useEffect } from 'react';
import { Send, Mic, ImagePlus, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import DemoBadge from '../components/ui/DemoBadge';
import { chatSuggestions, chatResponses } from '../data/synthetic';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('crop') || lower.includes('grow')) return chatResponses.crop;
  if (lower.includes('wheat') || lower.includes('plant')) return chatResponses.wheat;
  if (lower.includes('tree')) return chatResponses.tree;
  if (lower.includes('yellow') || lower.includes('leaf')) return chatResponses.yellow;
  if (lower.includes('market') || lower.includes('price')) return chatResponses.market;
  if (lower.includes('fertilizer')) return chatResponses.fertilizer;
  return chatResponses.default;
}

export default function FarmingAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Namaste! I\'m your KisanSeva AI Assistant. Ask me anything about crops, plants, trees, markets, or farming practices. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: getResponse(text) }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <Layout>
      <div className="bg-beige min-h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col h-[calc(100vh-4rem)]">
          <Breadcrumbs items={[{ label: 'Farming Assistant' }]} />

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-deep-green font-heading">KisanSeva AI Assistant</h1>
              <p className="text-sm text-muted">Your digital farming companion.</p>
            </div>
            <DemoBadge />
          </div>

          <div className="flex-1 bg-surface rounded-2xl border border-border shadow-soft flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'assistant' ? 'bg-leaf-light/20' : 'bg-deep-green'
                  }`}>
                    {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-leaf" /> : <User className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'bg-beige text-deep-green rounded-tl-sm'
                      : 'bg-deep-green text-white rounded-tr-sm'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-leaf-light/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-leaf" />
                  </div>
                  <div className="bg-beige px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          className="w-2 h-2 rounded-full bg-leaf"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="px-4 pb-3">
              <div className="flex flex-wrap gap-2 mb-3">
                {chatSuggestions.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="px-3 py-1.5 bg-beige rounded-full text-xs font-medium text-deep-green hover:bg-leaf-light/20 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-border flex items-center gap-2">
              <button className="p-2.5 rounded-xl hover:bg-beige transition-colors text-muted" title="Upload image">
                <ImagePlus className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask about crops, weather, markets..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-beige text-sm focus:outline-none focus:ring-2 focus:ring-leaf-light/50"
              />
              <button className="p-2.5 rounded-xl hover:bg-beige transition-colors text-muted" title="Voice input">
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={() => sendMessage(input)}
                className="p-2.5 rounded-xl bg-deep-green text-white hover:bg-deep-green-light transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
