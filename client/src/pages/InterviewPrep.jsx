import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Code,
  Layers,
  ChevronDown,
  Sparkles,
  Search,
  CheckCircle2,
  Building2,
  HelpCircle,
  Award,
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    category: 'React & Frontend',
    difficulty: 'Medium',
    company: 'Infosys / Tech Mahindra',
    question: 'What is the Virtual DOM in React, and how does Reconciliation work?',
    answer:
      'The Virtual DOM is an in-memory representation of the real DOM elements. When state changes in a React component, React creates a new virtual DOM tree and compares it with the previous one (Diffing algorithm). Only the node differences are batched and updated in the real DOM, which optimizes rendering performance.',
  },
  {
    id: 2,
    category: 'React & Frontend',
    difficulty: 'Easy',
    company: 'TCS / Wipro',
    question: 'What is the difference between state and props in React?',
    answer:
      'Props (properties) are passed into a component from its parent and are read-only (immutable). State represents data managed internally by the component that can change over time via setState or useState hook triggers, causing a re-render.',
  },
  {
    id: 3,
    category: 'Node.js & Backend',
    difficulty: 'Medium',
    company: 'Razorpay / Startups',
    question: 'How does Node.js handle asynchronous operations with the Event Loop?',
    answer:
      'Node.js uses a single-threaded Event Loop backed by the libuv C++ library. Synchronous tasks run on the Call Stack. Asynchronous tasks (I/O, database queries, timers) are delegated to the operating system or worker threads. When completed, callbacks are queued in microtask/macrotask queues and executed when the stack clears.',
  },
  {
    id: 4,
    category: 'Data Structures & Algorithms',
    difficulty: 'Medium',
    company: 'Accenture / TCS Digital',
    question: 'Explain the difference between BFS (Breadth-First) and DFS (Depth-First) graph traversals.',
    answer:
      'BFS explores all neighbors at the present depth level before moving on to nodes at the next depth level, typically implemented using a Queue (FIFO). DFS explores as deep as possible along each branch before backtracking, typically implemented using Recursion or a Stack (LIFO).',
  },
  {
    id: 5,
    category: 'Python & AI',
    difficulty: 'Easy',
    company: 'Wipro / Analytics',
    question: 'What is the difference between deep copy and shallow copy in Python?',
    answer:
      'A shallow copy constructs a new compound object and inserts references into it to the objects found in the original. A deep copy constructs a new compound object and recursively inserts copies into it of the objects found in the original, meaning nested elements are fully duplicated.',
  },
  {
    id: 6,
    category: 'HR & Campus Behavioral',
    difficulty: 'Easy',
    company: 'Universal Campus HR',
    question: 'How do you answer: "Tell me about a challenging technical bug you resolved in your college project?"',
    answer:
      'Use the STAR Method: Situation (project context), Task (what was broken or needed), Action (how you isolated the issue using debuggers/logs and implemented the fix), and Result (the metric outcome, e.g. latency decreased or app stopped crashing).',
  },
];

const CATEGORIES = ['All', 'React & Frontend', 'Node.js & Backend', 'Data Structures & Algorithms', 'Python & AI', 'HR & Campus Behavioral'];

const InterviewPrep = () => {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(1);

  const filteredQuestions = QUESTIONS.filter((q) => {
    const matchesCat = selectedCat === 'All' || q.category === selectedCat;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold shadow-xs">
          <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Campus Interview Prep Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Curated Campus Interview Q&A
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Master the most frequently asked technical, coding, and HR interview questions from top recruiting enterprises and high-growth startups.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by topic, keyword, or company (e.g. React, Event Loop, TCS)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950 text-sm text-slate-800 dark:text-slate-100 outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden transition-all hover:border-indigo-300 dark:hover:border-indigo-600"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
                      <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40">
                        {item.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md ${
                          item.difficulty === 'Easy'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/40'
                            : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-900/40'
                        }`}
                      >
                        {item.difficulty}
                      </span>
                      <span className="text-slate-400 dark:text-slate-400 font-normal flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {item.company}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {item.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 transition-transform ${
                      isExpanded ? 'rotate-180 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-slate-800"
                    >
                      <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                        <div className="font-bold text-indigo-700 dark:text-indigo-400 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Recommended Answer Strategy:
                        </div>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
            No questions match your search. Try another category!
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPrep;
