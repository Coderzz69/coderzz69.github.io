import React, { useState, useEffect, useRef } from 'react';
import { resumeData } from '../data/resumeData';
import type { CommandHistory } from '../types';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';

const Terminal: React.FC = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<CommandHistory[]>([
        {
            command: 'welcome',
            output: (
                <div className="mb-4">
                    <p className="text-[#00ff00] font-bold text-xl mb-2">Welcome to Sanath's Terminal Portfolio v1.0.0</p>
                    <p className="text-[#008000]">Type <span className="text-[#00ff00] font-bold">'help'</span> to see all available commands.</p>
                </div>
            ),
        },
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const scrollToBottom = () => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        };
        const timeoutId = setTimeout(scrollToBottom, 50);
        return () => clearTimeout(timeoutId);
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.toLowerCase().trim();
        let output: React.ReactNode = null;

        if (trimmedCmd === '') return;

        setCommandHistory((prev) => [cmd, ...prev]);
        setHistoryIndex(-1);

        switch (trimmedCmd) {
            case 'help':
                output = (
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 max-w-xs text-sm">
                        {['help', 'about', 'projects', 'experience', 'skills', 'education', 'achievements', 'resume', 'contact', 'github', 'clear'].map((c) => (
                            <div key={c} className="text-[#00ff00] font-bold">{c}</div>
                        ))}
                    </div>
                );
                break;

            case 'about':
                output = <p className="leading-relaxed text-sm whitespace-pre-wrap">{resumeData.about}</p>;
                break;

            case 'projects':
                output = (
                    <div className="space-y-6">
                        {resumeData.projects.map((p, i) => (
                            <div key={i} className="border-l-2 border-[#008000] pl-4">
                                <p className="text-[#00ff00] font-bold text-base">{p.title}</p>
                                <p className="text-[#008000] text-xs mb-2">{p.tech.join(' | ')}</p>
                                <ul className="list-disc list-outside ml-4 space-y-1 text-xs">
                                    {p.description.map((d, j) => (
                                        <li key={j}>{d}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                );
                break;

            case 'experience':
                output = (
                    <div className="space-y-6">
                        {resumeData.experience.map((e, i) => (
                            <div key={i} className="border-l-2 border-[#008000] pl-4">
                                <p className="text-[#00ff00] font-bold text-base">{e.company}</p>
                                <p className="text-[#008000] italic text-xs">{e.role} ({e.period})</p>
                                <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-xs">
                                    {e.contributions.map((c, j) => (
                                        <li key={j}>{c}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                );
                break;

            case 'skills':
                output = (
                    <div className="space-y-3">
                        {resumeData.skills.map((s, i) => (
                            <div key={i}>
                                <p className="text-[#00ff00] font-bold underline text-sm mb-1">{s.category}:</p>
                                <p className="text-xs text-[#008000]">{s.items.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                );
                break;

            case 'education':
                output = (
                    <div className="border-l-2 border-[#008000] pl-4">
                        <p className="text-[#00ff00] font-bold text-base">{resumeData.education.university}</p>
                        <p className="text-sm">{resumeData.education.degree}</p>
                        <p className="text-xs text-[#008000]">({resumeData.education.period})</p>
                    </div>
                );
                break;

            case 'achievements':
                output = (
                    <ul className="space-y-4">
                        {resumeData.achievements.map((a, i) => (
                            <li key={i} className="border-l-2 border-[#008000] pl-4">
                                <p className="text-[#00ff00] font-bold text-sm">{a.title}</p>
                                <p className="text-xs text-[#008000]">{a.description}</p>
                            </li>
                        ))}
                    </ul>
                );
                break;

            case 'resume':
                output = (
                    <div className="space-y-2 border-2 border-[#008000] p-3">
                        <p className="text-[#00ff00] font-bold text-lg border-b border-[#008000] mb-2 uppercase tracking-widest text-center">Career Highlights</p>
                        <div className="text-xs space-y-2">
                            <p><span className="text-[#00ff00]">■</span> {resumeData.personal.role}</p>
                            <p><span className="text-[#00ff00]">■</span> Expert in {resumeData.skills.find(s => s.category === 'Machine Learning')?.items.slice(0, 3).join(', ')}</p>
                            <p><span className="text-[#00ff00]">■</span> Lead ML Developer for {resumeData.projects.length} major automation projects</p>
                            <p><span className="text-[#00ff00]">■</span> Published RL research and production-grade computer vision APIs</p>
                        </div>
                    </div>
                );
                break;

            case 'contact':
                output = (
                    <div className="space-y-2 text-sm">
                        <p className="text-[#008000]">Email: <a href={`mailto:${resumeData.personal.contact.email}`} className="text-[#00ff00] underline hover:text-white transition-colors">{resumeData.personal.contact.email}</a></p>
                        <p className="text-[#008000]">GitHub: <a href={resumeData.personal.contact.github} target="_blank" rel="noreferrer" className="text-[#00ff00] underline hover:text-white transition-colors">github.com/Coderzz69</a></p>
                        <p className="text-[#008000]">LinkedIn: <a href={resumeData.personal.contact.linkedin} target="_blank" rel="noreferrer" className="text-[#00ff00] underline hover:text-white transition-colors">linkedin.com/in/sanath-coonani</a></p>
                        <p className="text-[#008000]">Phone: <span className="text-[#00ff00]">{resumeData.personal.contact.phone}</span></p>
                    </div>
                );
                break;

            case 'github':
                window.open(resumeData.personal.contact.github, '_blank');
                output = <p className="animate-pulse">Opening GitHub secure connection...</p>;
                break;

            case 'clear':
                setHistory([]);
                return;

            default:
                output = <p className="text-red-500 font-bold">ERROR: Command not recognized: '{trimmedCmd}'. Execute 'help' for valid protocols.</p>;
        }

        setHistory((prev) => [...prev, { command: cmd, output }]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
                const nextIndex = historyIndex + 1;
                setHistoryIndex(nextIndex);
                setInput(commandHistory[nextIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const nextIndex = historyIndex - 1;
                setHistoryIndex(nextIndex);
                setInput(commandHistory[nextIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black text-[#00ff00] font-mono p-4 md:p-8 flex flex-col overflow-hidden"
            onClick={() => inputRef.current?.focus()}
            style={{ textShadow: '0 0 5px rgba(0, 255, 0, 0.5)' }}
        >
            <div className="flex items-center gap-2 mb-6 border-b border-[#004400] pb-2 opacity-70 shrink-0">
                <TerminalIcon size={18} />
                <span className="text-[10px] md:text-sm font-bold tracking-[0.2em]">{resumeData.personal.name.toUpperCase()}_v1.0.root</span>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto mb-4 scroll-smooth">
                {history.map((item, i) => (
                    <div key={i} className="mb-6 opacity-0 animate-[fade-in_0.3s_forwards]">
                        {item.command !== 'welcome' && (
                            <div className="flex items-center gap-2 mb-1 text-[#006600]">
                                <ChevronRight size={14} />
                                <span className="font-bold text-xs">{item.command}</span>
                            </div>
                        )}
                        <div className={`${item.command === 'welcome' ? '' : 'pl-4'}`}>
                            {item.output}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 border-t border-[#004400] pt-4 shrink-0">
                <ChevronRight size={16} className="text-[#00ff00]" />
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="flex-1 bg-transparent border-none outline-none text-[#00ff00] p-0 placeholder-[#004400] text-sm"
                    spellCheck={false}
                    autoComplete="off"
                />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-4px); }
          to { opacity: 1; transform: translateX(0); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #004400; border-radius: 2px; }
      `}} />
        </div>
    );
};

export default Terminal;
