'use client'

import { useState, useRef, useEffect } from 'react'
import { Mail, Github, Linkedin, Globe, Phone, MapPin, Award, BookOpen, Code, Briefcase } from 'lucide-react'

export default function PortfolioTerminal() {
    const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
        {
            command: '/welcome', output: `
████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗██╗   ██╗██╗  ██╗
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██║   ██║╚██╗██╔╝
   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║██║   ██║ ╚███╔╝ 
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██║   ██║ ██╔██╗ 
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║╚██████╔╝██╔╝ ██╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝

[SYSTEM INITIALIZED] - Terminux Portfolio v1.0

Welcome to my interactive resume. Type help to see available commands.` },
    ])
    const [currentCommand, setCurrentCommand] = useState('')
    const [historyIndex, setHistoryIndex] = useState(-1)
    const bottomRef = useRef<HTMLDivElement>(null)
    const terminalRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const commands = {
        'help': () => `
[AVAILABLE_COMMANDS]

about       Personal bio & objective
projects    Deep Reinforcement Learning & CV projects
skills      Technical skill matrix (ML, Cloud, Web)
experience  Work history & internships
education   Academic background
achievements Hackathons & Certificates
contact     Connect with me
clear       Reset terminal
help        Show this manual
    `,
        'about': () => `
[PERSONAL PROFILE]

Name: Sanath Coonani
Role: ML Engineer & Systems Developer
Focus: Reinforcement Learning, Computer Vision, Real-time AI
Status: 3rd Year Student @ University of Hyderabad

Bio: Passionate machine learning engineer focused on building 
autonomous agents and production-grade AI systems. Experienced 
in RL pipelines, CV monitoring, and scalable backend architectures.
    `,
        'projects': () => `
[TECHNICAL PROJECTS]

1. Geometry Dash AI Agent (Deep RL)
   • Goal: Autonomous vision-based agent for jump timing
   • Tech: Python, PyTorch, OpenCV, CNN-DQN
   • Impact: Improved survival time 4.5x vs baseline
   • Features: 100K+ frame training, Experience Replay (50K buffer)

2. Smart Incident Detection (YOLOv8)
   • Goal: Real-time fire, smoke, and crowd detection
   • Tech: YOLOv8, Python, OpenCV, Flask
   • Result: 92% detection accuracy at 30+ FPS
   • Integration: REST API for live CCTV surveillance

3. ML Algorithms from Scratch
   • Goal: Low-level implementation of core AI models
   • Models: Linear/Logistic Regression, Decision Trees
   • Metrics: R2 = 0.96 (Salary Prediction), 96% Acc (Iris)
   • Deep Dive: Manual Gradient Descent & Binary Cross-Entropy
    `,
        'skills': () => `
[TECHNICAL SKILLS MATRIX]

Machine Learning:
  PyTorch/Scikit-learn  ████████████████████ 100%
  Reinforcement Learning ██████████████████   90%
  Deep Learning/CV      ██████████████████   90%

Languages:
  Python                ████████████████████ 100%
  JavaScript/TypeScript  ██████████████       70%
  C++/SQL               ████████████         60%

Cloud & Tools:
  AWS/Azure/Docker      ██████████████       70%
  Flask/Node.js/Next.js ████████████████     80%
  Git/OpenCV/NumPy      ████████████████████ 100%
    `,
        'experience': () => `
[WORK EXPERIENCE]

Temperate Technologies | ML Intern
June 2025 - August 2025 (On-Site)
• Automating Low-cost Cold-Storage using RL
• Designed crop storage suitability prediction system
• Developed RL-based control policy for temp/humidity
• Deployed real-time inference API using Flask & Docker

Freelance Web Developer
December 2024 - January 2025 (Remote)
• Built responsive production website using Next.js
• Optimized performance reducing load time by 40%
• Served 500+ monthly active users
    `,
        'education': () => `
[ACADEMIC BACKGROUND]

Integrated Masters in Computer Science and Engineering
University of Hyderabad, Hyderabad (2023 - 2028)
• Relevant focus on AI/ML and Systems Architecture
    `,
        'achievements': () => `
[HACKATHONS & CERTIFICATIONS]

• Technovista '25: Campus Chaos Grid - ML for power events
• Smart Classroom Hackathon '24: Automated attendance prototype
• IBM Full Stack Software Developer Certificate (Coursera)
• Developing Apps with Django/Node.js (Coursera)
• AI/ML Workshops: Shaastra 2026 (IIT Madras)
    `,
        'contact': () => `
[CONTACT INFORMATION]

Email: snathkumarcoonani@gmail.com
GitHub: https://github.com/Coderzz69
LinkedIn: https://linkedin.com/in/sanath-coonani
LeetCode: https://leetcode.com/Coderzz69
Phone: +91-8309841450
Location: Hyderabad, India

Let's build the future of AI together!
    `,
        'clear': () => {
            setHistory([])
            return ''
        },
    }

    const handleCommand = () => {
        const cmd = currentCommand.trim().toLowerCase()
        const commandFn = (commands as any)[cmd]
        const output = commandFn ? commandFn() : `Command not found: ${cmd}
Type help to see available commands.`

        if (cmd !== 'clear') {
            setHistory(prev => [...prev, { command: currentCommand, output }])
        }

        setCurrentCommand('')
        setHistoryIndex(-1)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand()
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setHistoryIndex(prev => {
                const newIndex = Math.min(prev + 1, history.length - 1)
                if (history.length > 0) {
                    setCurrentCommand(history[history.length - 1 - newIndex]?.command || '')
                }
                return newIndex
            })
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            setHistoryIndex(prev => {
                const newIndex = Math.max(prev - 1, -1)
                setCurrentCommand(newIndex === -1 ? '' : history[history.length - 1 - newIndex]?.command || '')
                return newIndex
            })
        }
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [history])

    useEffect(() => {
        const terminalElement = terminalRef.current;
        const handleClick = () => {
            inputRef.current?.focus()
        }

        if (terminalElement) {
            terminalElement.addEventListener('click', handleClick)
        }

        return () => {
            if (terminalElement) {
                terminalElement.removeEventListener('click', handleClick)
            }
        }
    }, [])

    const renderOutput = (output: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g
        const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g

        let parts = output.split(urlRegex)
        parts = parts.flatMap(part =>
            urlRegex.test(part) ? [part] : part.split(emailRegex)
        )

        return parts.map((part, index) => {
            if (urlRegex.test(part)) {
                return (
                    <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline hover:text-cyan-300 transition-colors inline-flex items-center gap-1">
                        {part.includes('github') ? <Github size={12} /> : part.includes('linkedin') ? <Linkedin size={12} /> : <Globe size={12} />}
                        {part}
                    </a>
                )
            } else if (emailRegex.test(part)) {
                return (
                    <a key={index} href={`mailto:${part}`} className="text-cyan-400 hover:underline hover:text-cyan-300 transition-colors inline-flex items-center gap-1">
                        <Mail size={12} />
                        {part}
                    </a>
                )
            }

            if (part.includes('Email:')) return <span key={index} className="inline-flex items-center gap-2"><Mail size={14} className="text-gray-400" /> Email:</span>
            if (part.includes('GitHub:')) return <span key={index} className="inline-flex items-center gap-2"><Github size={14} className="text-gray-400" /> GitHub:</span>
            if (part.includes('LinkedIn:')) return <span key={index} className="inline-flex items-center gap-2"><Linkedin size={14} className="text-gray-400" /> LinkedIn:</span>
            if (part.includes('LeetCode:')) return <span key={index} className="inline-flex items-center gap-2"><Code size={14} className="text-gray-400" /> LeetCode:</span>
            if (part.includes('Phone:')) return <span key={index} className="inline-flex items-center gap-2"><Phone size={14} className="text-gray-400" /> Phone:</span>
            if (part.includes('Location:')) return <span key={index} className="inline-flex items-center gap-2"><MapPin size={14} className="text-gray-400" /> Location:</span>
            if (part.includes('[PERSONAL PROFILE]')) return <span key={index} className="inline-flex items-center gap-2"><BookOpen size={14} className="text-green-500" /> <strong>{part}</strong></span>
            if (part.includes('[TECHNICAL PROJECTS]')) return <span key={index} className="inline-flex items-center gap-2"><Code size={14} className="text-green-500" /> <strong>{part}</strong></span>
            if (part.includes('[WORK EXPERIENCE]')) return <span key={index} className="inline-flex items-center gap-2"><Briefcase size={14} className="text-green-500" /> <strong>{part}</strong></span>
            if (part.includes('[HACKATHONS')) return <span key={index} className="inline-flex items-center gap-2"><Award size={14} className="text-green-500" /> <strong>{part}</strong></span>

            return <span key={index}>{part}</span>
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-green-400 p-4 font-mono">
            <div className="w-full max-w-5xl bg-black rounded-lg overflow-hidden shadow-2xl border border-green-400">
                <div className="flex items-center gap-2 p-3 bg-gray-800 text-xs text-gray-400 border-none">
                    <div className="flex gap-1.5 border-none">
                        <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer border-none" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer border-none" />
                        <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer border-none" />
                    </div>
                    <div className="flex-1 text-center font-semibold border-none">terminux@portfolio:~$ | Interactive Resume v1.0</div>
                    <div className="text-xs border-none">
                        <span className="text-green-400">●</span> ONLINE
                    </div>
                </div>

                <div
                    ref={terminalRef}
                    className="h-[75vh] overflow-y-auto p-4 space-y-3 bg-black cursor-text"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#10b981 #1f2937'
                    }}
                >
                    {history.map((entry, i) => (
                        <div key={i} className="space-y-2 border-none">
                            <div className="flex gap-2 border-none">
                                <span className="text-cyan-400 font-semibold border-none">terminux@portfolio:~$</span>
                                <span className="text-white border-none">{entry.command}</span>
                            </div>
                            <div className="whitespace-pre-wrap text-gray-300 pl-6 leading-relaxed border-none">
                                {renderOutput(entry.output)}
                            </div>
                        </div>
                    ))}

                    <div className="flex gap-2 items-center border-none">
                        <span className="text-cyan-400 font-semibold border-none">terminux@portfolio:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentCommand}
                            onChange={e => setCurrentCommand(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent outline-none text-white caret-green-400 border-none"
                            autoFocus
                            spellCheck="false"
                        />
                        <span className="text-green-400 animate-pulse border-none">█</span>
                    </div>

                    <div ref={bottomRef} />
                </div>

                <div className="bg-gray-800 px-4 py-2 text-xs text-gray-500 border-t border-gray-700">
                    <div className="flex justify-between items-center border-none">
                        <span>Type help for available commands • terminux@portfolio</span>
                        <span>clear to reset terminal • Status: Ready</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
