'use client'

import { useState, useRef, useEffect } from 'react'
import { Mail, Github, Linkedin, Globe, Phone, MapPin, Award, BookOpen, Code, Briefcase } from 'lucide-react'
import { cn } from "@/lib/utils"

export default function PortfolioTerminal() {
    const [history, setHistory] = useState<Array<{ command: string; output: string }>>([
        {
            command: '/welcome', output: `
 ███████╗ █████╗ ███╗   ██╗ █████╗ ████████╗██╗  ██╗     ██████╗ ██████╗  ██████╗ ███╗   ██╗ █████╗ ███╗   ██╗██╗
 ██╔════╝██╔══██╗████╗  ██║██╔══██╗╚══██╔══╝██║  ██║    ██╔════╝██╔═══██╗██╔═══██╗████╗  ██║██╔══██╗████╗  ██║██║
 ███████╗███████║██╔██╗ ██║███████║   ██║   ███████║    ██║     ██║   ██║██║   ██║██╔██╗ ██║███████║██╔██╗ ██║██║
 ╚════██║██╔══██║██║╚██╗██║██╔══██║   ██║   ██╔══██║    ██║     ██║   ██║██║   ██║██║╚██╗██║██╔══██║██║╚██╗██║██║
 ███████║██║  ██║██║ ╚████║██║  ██║   ██║   ██║  ██║    ╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║██║  ██║██║ ╚████║██║
 ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝     ╚═════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝

[SYSTEM INITIALIZED] - Terminux Portfolio v1.0

Welcome to my interactive resume. Type help to see available commands.` },
    ])
    const [currentCommand, setCurrentCommand] = useState('')
    const [_, setHistoryIndex] = useState(-1)
    const bottomRef = useRef<HTMLDivElement>(null)
    const terminalRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const commands = {
        'help': () => `
[AVAILABLE_COMMANDS]

about        Personal bio & objective
projects     Featured RL, CV & ML projects
github       More recent work from my GitHub
skills       Technical skills (ML, Cloud, Web)
experience   Work history & internships
education    Academic background
achievements Hackathons, certifications & workshops
contact      Connect with me
clear       Reset terminal
help        Show this manual
    `,
        'about': () => `
[PERSONAL PROFILE]

Name: Sanath Coonani
Role: ML Engineer & Systems Developer
Focus: Reinforcement Learning, Computer Vision, Real-time AI
Status: 3rd Year Student @ University of Hyderabad

Bio: Machine learning engineer focused on building autonomous
agents and production-grade AI systems. Experienced in RL
pipelines, computer vision, and deploying real-time inference
APIs. Currently exploring multi-agent RL, self-supervised
vision-language models, and OCR for Dravidian scripts.

Type projects or github to see what I've been building.
    `,
        'projects': () => `
[TECHNICAL PROJECTS]

1. Geometry Dash AI Agent — Deep RL Controller
   Autonomous vision-based agent that learns jump timing with DQN.
   • RL environment from screen capture + automated input at 30+ FPS
   • CNN-based DQN trained on 100K+ frames: 4.5x survival vs random
   • Experience replay (50K buffer), epsilon decay & target networks
     cut training variance by 35%
   • 3x faster training via grayscale downsampling, frame
     preprocessing & parallel environment instances
   • Custom reward shaping for stability in sparse-reward settings
   • Tech: Python, PyTorch, OpenCV, DQN
   https://github.com/Coderzz69/Geometry-Dash-Automation-using-Image-Processing-and-DQN

2. Smart Incident Detection with YOLOv8
   Real-time detection of fire, smoke & crowd density in CCTV feeds.
   • YOLOv8 pipeline: 92% detection accuracy at 30+ FPS
   • Flask REST inference service for automated alert generation
   • Built for integration with live CCTV streams
   • Tech: Python, OpenCV, Flask, Ultralytics YOLOv8
   https://github.com/Coderzz69/Smart-Incident-Detection-with-YOLOv8

3. ML Algorithms from Scratch
   Core ML algorithms built without high-level ML libraries.
   • Linear Regression: R2 = 0.96 on Salary Prediction
   • Logistic Regression: 88% accuracy on Heart Disease Prediction
   • Decision Tree: 96% accuracy on Iris
   • Gradient Descent, BCE loss, Entropy & Information Gain
     derived and coded from first principles
   • Tech: Python, NumPy, Pandas, Matplotlib
   https://github.com/Coderzz69/ml_projects_from_scratch

Type github for more recent projects.
    `,
        'github': () => `
[GITHUB PROJECTS]

• IntelliSignal-AI — AI Traffic Management (SSS Hackathon)
  Hierarchical multi-agent RL (DQN) on SUMO for Indian urban
  traffic; cut avg wait per vehicle by 57.7% vs fixed timers,
  plus a green corridor for emergency vehicles & YOLO dashboard.
  https://github.com/Coderzz69/Intellisense-AI

• DroneFleet — Master/slave drone coordination over MQTT
  Feasibility engine checks whether a mission described in plain
  English is possible before takeoff; local LLM, fault injection.
  https://github.com/Coderzz69/DroneFleet

• PaddleOCR Dravidian — Tamil / Dravidian text recognition
  Adapts PP-OCRv5 with Akshara (Unicode grapheme cluster)
  tokenization and a 355-token dictionary.
  https://github.com/Coderzz69/PaddleOCR_Dravidian_Rep

• VL-JEPA — Vision-language self-supervised learning
  JEPA-style masked latent prediction (ViT + BERT, EMA targets),
  trained on a single 4GB consumer GPU.
  https://github.com/Coderzz69/VL-JEPA

• AgriEnv — Precision agriculture RL environment (OpenEnv)
  Greenhouse control under water, nutrient, pest & energy
  tradeoffs; FastAPI server, SB3 PPO training, Docker.
  https://github.com/Coderzz69/my-openenv

• ShopLens — E-commerce journey friction detection
  Synthetic clickstream generator with hidden ground-truth
  friction causes for training detection models.
  https://github.com/Coderzz69/shoplens

• Hackify — Developer skill verification platform
  Next.js, Prisma/PostgreSQL, GitHub OAuth; SkillGraph from
  GitHub activity + AI-evaluated coding challenges.
  https://github.com/Coderzz69/Hackify

• Budget Buddy — Cross-platform personal finance app
  React Native + Expo, Clerk auth, NativeWind; Python backend.
  https://github.com/Coderzz69/Budget-Buddy-Frontend

• n8n Cold Email Automation
  AI-personalized outreach (Gemini), Gmail, Google Sheets lead
  tracking & Discord reply notifications.
  https://github.com/Coderzz69/n8n-workflows

All repositories: https://github.com/Coderzz69
    `,
        'skills': () => `
[TECHNICAL SKILLS]

Languages:
  Python, JavaScript, TypeScript, C++, SQL, PostgreSQL

Machine Learning:
  PyTorch, Scikit-learn, Deep Learning, Reinforcement Learning,
  Computer Vision, Model Evaluation

Cloud & Deployment:
  AWS (EC2, S3), Azure Web Apps, Docker, REST APIs,
  Model Deployment

Frameworks & Tools:
  Flask, FastAPI, OpenCV, NumPy, Pandas, Matplotlib, Git, Jupyter

Web & Backend:
  Node.js, Express.js, Next.js, React, React Native, Firebase
    `,
        'experience': () => `
[WORK EXPERIENCE]

Temperate Technologies | ML Intern
June 2025 - August 2025 (On-Site)
Automating Low-cost Cold-Storage Using ML & Reinforcement Learning
• Designed an environmental suitability prediction system
  (Python, Pandas, Scikit-learn) for optimal crop storage
• Developed an RL-based control policy to optimize temperature
  and humidity under energy constraints
• Analyzed performance with NumPy, Matplotlib & Jupyter and
  validated decision stability across environmental conditions
• Deployed a real-time inference API (Flask, REST, Docker)
  enabling sensor-driven automated control

Freelance Web Developer
December 2024 - January 2025 (Remote)
• Built a responsive production website with Next.js,
  TailwindCSS & Node.js serving 500+ monthly users
• Gathered requirements directly with the client and delivered
  the complete solution within 2 weeks
• Improved page load speed by 40% via asset optimization
• Owned end-to-end delivery: development, cloud deployment and
  post-launch maintenance
    `,
        'education': () => `
[ACADEMIC BACKGROUND]

Integrated Masters in Computer Science and Engineering
University of Hyderabad, Hyderabad (2023 - 2028)
• Relevant focus on AI/ML and Systems Architecture
    `,
        'achievements': () => `
[HACKATHONS, CERTIFICATIONS & WORKSHOPS]

Hackathons:
• Technovista '25 – Campus Chaos Grid: ML system classifying
  power grid events using sensor graph features
• SSS Hackathon: IntelliSignal-AI multi-agent RL traffic control
• Smart Classroom Management Hackathon '24: web prototype for
  automated attendance & classroom safety monitoring

Certifications (Coursera, Jan 2025):
• IBM Full Stack Software Developer Professional Certificate
• Developing Applications with Django and SQL
• Developing Back-End Apps with Node.js and Express
• Python for Data Science, AI & Development

Workshops — Shaastra 2026, IIT Madras:
• Deep Learning using YOLO
• AI & Machine Learning
• Ethical Web Hacking
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
            if (part.includes('[GITHUB PROJECTS]')) return <span key={index} className="inline-flex items-center gap-2"><Github size={14} className="text-green-500" /> <strong>{part}</strong></span>
            if (part.includes('[TECHNICAL PROJECTS]')) return <span key={index} className="inline-flex items-center gap-2"><Code size={14} className="text-green-500" /> <strong>{part}</strong></span>
            if (part.includes('[WORK EXPERIENCE]')) return <span key={index} className="inline-flex items-center gap-2"><Briefcase size={14} className="text-green-500" /> <strong>{part}</strong></span>
            if (part.includes('[HACKATHONS')) return <span key={index} className="inline-flex items-center gap-2"><Award size={14} className="text-green-500" /> <strong>{part}</strong></span>

            return <span key={index}>{part}</span>
        })
    }

    return (
        <div className="flex flex-col h-screen w-screen bg-black text-green-400 font-mono overflow-hidden">
            <div className="flex items-center gap-2 p-3 bg-gray-800 text-xs text-gray-400 border-none shrink-0">
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
                className="flex-1 overflow-y-auto p-4 space-y-3 bg-black cursor-text"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#10b981 #1f2937'
                }}
            >
                {history.map((entry, i) => (
                    <div key={i} className="space-y-2 border-none">
                        <div className="flex gap-2 border-none">
                            <span className="text-cyan-400 font-semibold border-none">sanath@portfolio:~$</span>
                            <span className="text-white border-none">{entry.command}</span>
                        </div>
                        <div className={cn(
                            "whitespace-pre-wrap leading-relaxed border-none",
                            entry.command === '/welcome' ? "text-center pl-0" : "text-left pl-6 text-gray-300"
                        )}>
                            {renderOutput(entry.output)}
                        </div>
                    </div>
                ))}

                <div className="flex gap-2 items-center border-none relative">
                    <span className="text-cyan-400 font-semibold border-none shrink-0">sanath@portfolio:~$</span>
                    <div className="relative flex-1 flex items-center border-none overflow-hidden">
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentCommand}
                            onChange={e => setCurrentCommand(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="absolute inset-0 bg-transparent outline-none text-white caret-transparent border-none w-full"
                            style={{ opacity: 1, zIndex: 10 }}
                            autoFocus
                            spellCheck="false"
                        />
                        <div className="flex items-center pointer-events-none border-none whitespace-pre">
                            <span className="text-white border-none opacity-100">{currentCommand}</span>
                            <span className="w-2.5 h-5 bg-green-400 animate-pulse border-none ml-0.5"></span>
                        </div>
                    </div>
                </div>

                <div ref={bottomRef} />
            </div>

            <div className="bg-gray-800 px-4 py-2 text-xs text-gray-500 border-t border-gray-700 shrink-0">
                <div className="flex justify-between items-center border-none">
                    <span>Type help for available commands • sanath@portfolio</span>
                    <span>clear to reset terminal • Status: Ready</span>
                </div>
            </div>
        </div>
    )
}
