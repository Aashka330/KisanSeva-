import { useState, useRef, useEffect } from 'react';
import { Send, Mic, ImagePlus, Bot, User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { sendGeminiChat, type ChatMessage } from '../lib/api';
import { chatSuggestions } from '../data/synthetic';

interface DisplayMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function FarmingAssistant() {
  const [messages, setMessages] = useState<DisplayMessage[]>([
    {
      role: 'assistant',
      content:
        "Namaste! I'm your KisanSeva AI Agricultural Companion. Ask me anything about crop planning, sowing dates, pest diagnosis, fertilizer dosage, mandi market prices, or government schemes. How can I help you today?",
    },
  ]);

  // Conversation history (model format)
  const [geminiHistory, setGeminiHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || typing) return;

    const userMsg: DisplayMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setError(null);

    try {
      const reply = await sendGeminiChat(geminiHistory, text);

      setGeminiHistory(prev => [
        ...prev,
        { role: 'user', parts: [{ text }] },
        { role: 'model', parts: [{ text: reply }] },
      ]);

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e: unknown) {
      const errMsg = e instanceof Error ? e.message : 'Failed to get response';
      setError(errMsg);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `Apologies, I encountered an issue: ${errMsg}. Please try again.`,
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <Layout>
      <div className="bg-beige min-h-[calc(100vh-4rem)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col h-[calc(100vh-4rem)]">
          <Breadcrumbs items={[{ label: 'Farming Assistant' }]} />

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-deep-green font-heading">KisanSeva AI Assistant</h1>
              <p className="text-sm text-muted">Your digital farming companion — powered by KisanSeva Agricultural Intelligence.</p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 bg-green-100 text-green-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-green-600" />
              AI Assistant Active
            </span>
          </div>

          {error && (
            <div className="mb-3 p-3 bg-red-50 rounded-xl border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}

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
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
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
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          className="w-2 h-2 rounded-full bg-leaf"
                        />
                      ))}
                      <span className="ml-2 text-xs text-muted">KisanSeva AI thinking...</span>
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
                    disabled={typing}
                    className="px-3 py-1.5 bg-beige rounded-full text-xs font-medium text-deep-green hover:bg-leaf-light/20 transition-colors disabled:opacity-50"
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
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                placeholder="Ask about crops, pests, fertilizers, sowing, market prices..."
                disabled={typing}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-beige text-sm focus:outline-none focus:ring-2 focus:ring-leaf-light/50 disabled:opacity-50"
              />
              <button className="p-2.5 rounded-xl hover:bg-beige transition-colors text-muted" title="Voice input">
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={() => sendMessage(input)}
                disabled={typing || !input.trim()}
                className="p-2.5 rounded-xl bg-deep-green text-white hover:bg-deep-green/90 transition-colors disabled:opacity-50"
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
