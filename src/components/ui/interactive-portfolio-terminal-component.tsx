import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight, FileDown, Github, Linkedin, Mail, MapPin, Phone, Code2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { achievements, experience, moreProjects, profile, projects, skills } from '@/data/portfolio'

const BANNER = `███████╗ █████╗ ███╗   ██╗ █████╗ ████████╗██╗  ██╗     ██████╗ ██████╗  ██████╗ ███╗   ██╗ █████╗ ███╗   ██╗██╗
██╔════╝██╔══██╗████╗  ██║██╔══██╗╚══██╔══╝██║  ██║    ██╔════╝██╔═══██╗██╔═══██╗████╗  ██║██╔══██╗████╗  ██║██║
███████╗███████║██╔██╗ ██║███████║   ██║   ███████║    ██║     ██║   ██║██║   ██║██╔██╗ ██║███████║██╔██╗ ██║██║
╚════██║██╔══██║██║╚██╗██║██╔══██║   ██║   ██╔══██║    ██║     ██║   ██║██║   ██║██║╚██╗██║██╔══██║██║╚██╗██║██║
███████║██║  ██║██║ ╚████║██║  ██║   ██║   ██║  ██║    ╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║██║  ██║██║ ╚████║██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝     ╚═════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝`

const BOOT_LINES = [
    'Loading kernel modules: pytorch, opencv, xgboost',
    'Mounting /home/sanath/projects',
    'Starting reinforcement-learning.service',
    'Reached target Portfolio',
]

const QUICK = ['about', 'projects', 'experience', 'skills', 'achievements', 'contact', 'resume']

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Lets output rendered anywhere in the history run another command when clicked.
const RunContext = createContext<(cmd: string) => void>(() => {})

/* ---------- small building blocks ---------- */

function Heading({ children }: { children: ReactNode }) {
    return (
        <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-400">
            <span className="h-px w-6 bg-emerald-400/60" />
            {children}
        </div>
    )
}

function Ext({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className={cn('group/link inline-flex items-center gap-1 text-cyan-400 transition-colors hover:text-cyan-300', className)}
        >
            <span className="underline decoration-cyan-400/30 underline-offset-4 group-hover/link:decoration-cyan-300">{children}</span>
            <ArrowUpRight size={13} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>
    )
}

function Tag({ children }: { children: ReactNode }) {
    return <span className="rounded-md border border-slate-700/80 bg-slate-800/50 px-2 py-0.5 text-[11px] text-slate-300">{children}</span>
}

function Metric({ children }: { children: ReactNode }) {
    return <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[11px] font-semibold text-amber-300">{children}</span>
}

function Cmd({ name, className }: { name: string; className?: string }) {
    const run = useContext(RunContext)
    return (
        <button
            type="button"
            onClick={e => { e.stopPropagation(); run(name) }}
            className={cn(
                'rounded-md border border-emerald-400/30 bg-emerald-400/5 px-2 py-0.5 text-emerald-300 transition-all',
                'hover:border-emerald-400/70 hover:bg-emerald-400/15 hover:shadow-[0_0_12px_rgba(52,211,153,0.25)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60',
                className,
            )}
        >
            {name}
        </button>
    )
}

function Prompt() {
    return (
        <span className="shrink-0 select-none">
            <span className="hidden sm:inline">
                <span className="text-emerald-400">{profile.handle}</span>
                <span className="text-slate-500">@</span>
                <span className="text-cyan-400">portfolio</span>
                <span className="text-slate-500">:</span>
                <span className="text-violet-400">~</span>
            </span>
            <span className="text-slate-400 sm:ml-0.5">{'❯ '}</span>
        </span>
    )
}

/* ---------- command outputs ---------- */

function BootLog({ lines }: { lines: string[] }) {
    return (
        <div className="space-y-0.5 text-xs text-slate-500">
            {lines.map(l => <div key={l}><span className="text-emerald-400">[  OK  ]</span> {l}</div>)}
        </div>
    )
}

function Welcome() {
    return (
        <div className="py-2">
            <pre
                aria-label={profile.name}
                className="banner-gradient overflow-hidden leading-none font-bold"
                style={{ fontSize: 'min(13px, calc((min(100vw, 1024px) - 64px) / 70))' }}
            >
                {BANNER}
            </pre>
            <p className="mt-5 text-base text-slate-200 sm:text-lg">
                {profile.role} <span className="text-slate-500">·</span>{' '}
                <span className="text-slate-400">{profile.focus.slice(0, 3).join(' · ')}</span>
            </p>
            <p className="mt-1 text-sm text-slate-500">{profile.status}</p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {profile.stats.map(s => (
                    <div key={s.label} className="rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3">
                        <div className="text-xl font-bold text-amber-300 sm:text-2xl">{s.value}</div>
                        <div className="mt-1 text-[11px] leading-snug text-slate-400">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-slate-400">Start here:</span>
                {['about', 'projects', 'experience', 'contact'].map(c => <Cmd key={c} name={c} />)}
                <span className="text-slate-500">or type <span className="text-emerald-300">help</span></span>
            </div>
        </div>
    )
}

function Help() {
    return (
        <div>
            <Heading>Available commands</Heading>
            <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {Object.entries(COMMANDS).filter(([, c]) => !c.hidden).map(([name, c]) => (
                    <div key={name} className="flex items-baseline gap-3">
                        <Cmd name={name} className="w-28 shrink-0 text-left" />
                        <span className="text-sm text-slate-400">{c.desc}</span>
                    </div>
                ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">
                Tip: <kbd className="text-slate-300">Tab</kbd> autocompletes, <kbd className="text-slate-300">↑ ↓</kbd> browse history,{' '}
                <span className="text-slate-300">open 1</span> opens a project repo. There may be a few hidden commands too.
            </p>
        </div>
    )
}

function About() {
    return (
        <div className="max-w-3xl">
            <Heading>whoami --verbose</Heading>
            <h2 className="text-2xl font-bold text-slate-100">{profile.name}</h2>
            <p className="mt-1 text-cyan-400">{profile.role}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500"><MapPin size={13} />{profile.location} · {profile.status}</p>
            {profile.bio.map(p => <p key={p} className="mt-4 leading-relaxed text-slate-300">{p}</p>)}
            <div className="mt-5 flex flex-wrap gap-2">{profile.focus.map(f => <Tag key={f}>{f}</Tag>)}</div>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-slate-500">Next:</span>
                <Cmd name="projects" /><Cmd name="experience" /><Cmd name="resume" />
            </div>
        </div>
    )
}

function Projects() {
    return (
        <div>
            <Heading>Featured projects</Heading>
            <div className="grid gap-4 lg:grid-cols-2">
                {projects.map((p, i) => (
                    <article
                        key={p.title}
                        style={{ animationDelay: `${i * 70}ms` }}
                        className="rise-in group relative flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_8px_30px_-12px_rgba(52,211,153,0.35)]"
                    >
                        <div className="flex items-baseline justify-between gap-3">
                            <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-300">
                                <span className="mr-2 text-slate-600">{String(i + 1).padStart(2, '0')}</span>
                                {p.title}
                            </h3>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.tagline}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">{p.metrics.map(m => <Metric key={m}>{m}</Metric>)}</div>
                        <ul className="mt-4 space-y-1.5 text-sm text-slate-300">
                            {p.highlights.map(h => (
                                <li key={h} className="flex gap-2"><span className="text-emerald-400">›</span><span>{h}</span></li>
                            ))}
                        </ul>
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                            <div className="flex flex-wrap gap-1.5">{p.tech.map(t => <Tag key={t}>{t}</Tag>)}</div>
                            <Ext href={p.repo} className="text-sm"><Github size={13} className="mr-1 inline" />source</Ext>
                        </div>
                    </article>
                ))}
            </div>
            <p className="mt-4 text-sm text-slate-500">More builds: <Cmd name="github" /></p>
        </div>
    )
}

function GithubList() {
    return (
        <div className="max-w-3xl">
            <Heading>More on GitHub</Heading>
            <ul className="divide-y divide-slate-800/80">
                {moreProjects.map(p => (
                    <li key={p.title} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                        <div>
                            <span className="font-semibold text-slate-100">{p.title}</span>
                            <p className="text-sm text-slate-400">{p.note}</p>
                        </div>
                        <Ext href={p.repo} className="shrink-0 text-sm">repo</Ext>
                    </li>
                ))}
            </ul>
            <p className="mt-3 text-sm"><Ext href={profile.contact.github}>All repositories on github.com/Coderzz69</Ext></p>
        </div>
    )
}

function Experience() {
    return (
        <div className="max-w-3xl">
            <Heading>Experience</Heading>
            <ol className="relative space-y-8 border-l border-slate-800 pl-6">
                {experience.map(job => (
                    <li key={job.company} className="relative">
                        <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-emerald-400 bg-[#07090d] shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                            <h3 className="text-base font-bold text-slate-100">{job.role} <span className="text-cyan-400">@ {job.company}</span></h3>
                            <span className="text-xs text-slate-500">{job.period} · {job.mode}</span>
                        </div>
                        {job.summary && <p className="mt-1 text-sm italic text-slate-400">{job.summary}</p>}
                        <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                            {job.points.map(pt => <li key={pt} className="flex gap-2"><span className="text-emerald-400">›</span><span>{pt}</span></li>)}
                        </ul>
                    </li>
                ))}
            </ol>
        </div>
    )
}

function Skills() {
    return (
        <div className="max-w-3xl">
            <Heading>Skills</Heading>
            <div className="space-y-4">
                {skills.map(s => (
                    <div key={s.group} className="sm:flex sm:gap-6">
                        <div className="mb-2 w-40 shrink-0 text-sm text-cyan-400 sm:mb-0">{s.group}</div>
                        <div className="flex flex-wrap gap-1.5">{s.items.map(i => <Tag key={i}>{i}</Tag>)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Education() {
    return (
        <div className="max-w-3xl">
            <Heading>Education</Heading>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
                <h3 className="font-bold text-slate-100">Integrated Masters in Computer Science and Engineering</h3>
                <p className="mt-1 text-cyan-400">University of Hyderabad</p>
                <p className="mt-1 text-sm text-slate-500">2023 – 2028 · currently in 3rd year</p>
            </div>
        </div>
    )
}

function Achievements() {
    return (
        <div className="max-w-3xl space-y-7">
            <div>
                <Heading>Competitions & hackathons</Heading>
                <ul className="space-y-3">
                    {achievements.competitions.map(a => (
                        <li key={a.title} className="flex gap-3">
                            <span className="text-amber-300">★</span>
                            <div><div className="font-semibold text-slate-100">{a.title}</div><div className="text-sm text-slate-400">{a.note}</div></div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <Heading>Certifications · Coursera, Jan 2025</Heading>
                <ul className="space-y-1.5 text-sm text-slate-300">
                    {achievements.certifications.map(c => <li key={c} className="flex gap-2"><span className="text-emerald-400">✓</span>{c}</li>)}
                </ul>
            </div>
            <div>
                <Heading>Workshops · Shaastra 2026, IIT Madras</Heading>
                <div className="flex flex-wrap gap-1.5">{achievements.workshops.map(w => <Tag key={w}>{w}</Tag>)}</div>
            </div>
        </div>
    )
}

function Contact() {
    const c = profile.contact
    const rows = [
        { icon: <Mail size={15} />, label: 'email', node: <Ext href={`mailto:${c.email}`}>{c.email}</Ext> },
        { icon: <Github size={15} />, label: 'github', node: <Ext href={c.github}>Coderzz69</Ext> },
        { icon: <Linkedin size={15} />, label: 'linkedin', node: <Ext href={c.linkedin}>sanath-coonani</Ext> },
        { icon: <Code2 size={15} />, label: 'leetcode', node: <Ext href={c.leetcode}>Coderzz69</Ext> },
        { icon: <Phone size={15} />, label: 'phone', node: <a href={`tel:${c.phone}`} className="text-slate-300 hover:text-cyan-300">{c.phone}</a> },
        { icon: <MapPin size={15} />, label: 'location', node: <span className="text-slate-300">{profile.location}</span> },
    ]
    return (
        <div className="max-w-3xl">
            <Heading>Get in touch</Heading>
            <p className="mb-4 text-slate-300">Open to ML / AI internships, research collaborations and interesting problems.</p>
            <div className="space-y-2.5">
                {rows.map(r => (
                    <div key={r.label} className="flex items-center gap-3 text-sm">
                        <span className="text-slate-500">{r.icon}</span>
                        <span className="w-20 text-slate-500">{r.label}</span>
                        {r.node}
                    </div>
                ))}
            </div>
            <ResumeButton className="mt-6" />
        </div>
    )
}

function ResumeButton({ className }: { className?: string }) {
    return (
        <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className={cn('inline-flex items-center gap-2 rounded-lg border border-emerald-400/50 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300 transition-all hover:bg-emerald-400/20 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]', className)}
        >
            <FileDown size={15} /> Download resume (PDF)
        </a>
    )
}

function Neofetch() {
    const info: [string, string][] = [
        ['OS', 'Portfolio Linux x86_64'],
        ['Host', 'University of Hyderabad'],
        ['Uptime', '3rd year of 5'],
        ['Shell', 'zsh + python3'],
        ['Kernel', 'PyTorch · OpenCV · XGBoost'],
        ['Focus', 'RL · Computer Vision · Real-time AI'],
        ['Projects', `${projects.length} pinned · 35+ public repos`],
        ['Best score', 'F0.5 0.9714 (ML Challenge 2026)'],
    ]
    return (
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <pre className="banner-gradient text-xs leading-tight font-bold">{`   ▄▄▄▄▄▄▄▄▄▄▄
  █ ▄▄▄▄▄▄▄▄▄ █
  █ █ >_    █ █
  █ █       █ █
  █ ▀▀▀▀▀▀▀▀▀ █
   ▀▀▀▀█▀█▀▀▀▀
     ▄▄█▄█▄▄`}</pre>
            <div className="text-sm">
                <div><span className="font-bold text-emerald-400">{profile.handle}</span><span className="text-slate-500">@</span><span className="font-bold text-cyan-400">portfolio</span></div>
                <div className="text-slate-600">----------------</div>
                {info.map(([k, v]) => <div key={k}><span className="font-semibold text-cyan-400">{k}</span><span className="text-slate-500">: </span><span className="text-slate-300">{v}</span></div>)}
                <div className="mt-2 flex gap-1">
                    {['bg-slate-700', 'bg-red-400', 'bg-emerald-400', 'bg-amber-300', 'bg-cyan-400', 'bg-violet-400', 'bg-pink-400', 'bg-slate-200'].map(c => <span key={c} className={cn('h-3 w-5', c)} />)}
                </div>
            </div>
        </div>
    )
}

function Ls() {
    const files: [string, string][] = [
        ['about.txt', 'about'], ['projects/', 'projects'], ['github/', 'github'], ['experience.log', 'experience'],
        ['skills.json', 'skills'], ['education.md', 'education'], ['achievements.md', 'achievements'], ['contact.vcf', 'contact'], ['resume.pdf', 'resume'],
    ]
    const run = useContext(RunContext)
    return (
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            {files.map(([f, cmd]) => (
                <button key={f} type="button" onClick={e => { e.stopPropagation(); run(cmd) }} className={cn('hover:underline', f.endsWith('/') ? 'font-bold text-violet-400' : 'text-slate-300')}>{f}</button>
            ))}
        </div>
    )
}

function NotFound({ name }: { name: string }) {
    const guess = closestCommand(name)
    return (
        <div className="text-sm">
            <span className="text-red-400">zsh: command not found: </span><span className="text-slate-200">{name}</span>
            <div className="mt-1 text-slate-400">
                {guess ? <>Did you mean <Cmd name={guess} />?</> : <>Try <Cmd name="help" /> to see what you can do.</>}
            </div>
        </div>
    )
}

/* ---------- command table ---------- */

type Command = { desc: string; hidden?: boolean; run: (args: string[]) => ReactNode }

const COMMANDS: Record<string, Command> = {
    help: { desc: 'List all commands', run: () => <Help /> },
    about: { desc: 'Who I am and what I work on', run: () => <About /> },
    projects: { desc: 'Featured projects (pinned on GitHub)', run: () => <Projects /> },
    github: { desc: 'More projects from my GitHub', run: () => <GithubList /> },
    experience: { desc: 'Internships & freelance work', run: () => <Experience /> },
    skills: { desc: 'Languages, ML, cloud & web stack', run: () => <Skills /> },
    education: { desc: 'Academic background', run: () => <Education /> },
    achievements: { desc: 'Competitions, certifications, workshops', run: () => <Achievements /> },
    contact: { desc: 'Ways to reach me', run: () => <Contact /> },
    resume: {
        desc: 'Open my resume (PDF)',
        run: () => {
            window.open(profile.resume, '_blank', 'noopener')
            return <div className="text-sm text-slate-300">Opening resume in a new tab… <ResumeButton className="ml-2 mt-2 sm:mt-0" /></div>
        },
    },
    neofetch: { desc: 'System info, portfolio edition', run: () => <Neofetch /> },
    clear: { desc: 'Clear the terminal', run: () => null },
    ls: { desc: '', hidden: true, run: () => <Ls /> },
    whoami: { desc: '', hidden: true, run: () => <span className="text-slate-300">{profile.handle} — teaches agents to play games, steer traffic and fly drones.</span> },
    open: {
        desc: '',
        hidden: true,
        run: ([n]) => {
            const p = projects[Number(n) - 1]
            if (!p) return <span className="text-sm text-slate-400">usage: open &lt;1-{projects.length}&gt; — opens a project from <span className="text-emerald-300">projects</span></span>
            window.open(p.repo, '_blank', 'noopener')
            return <span className="text-sm text-slate-300">Opening <Ext href={p.repo}>{p.title}</Ext></span>
        },
    },
    sudo: { desc: '', hidden: true, run: () => <span className="text-sm text-red-400">{profile.handle} is not in the sudoers file. This incident will be reported. 🚨</span> },
    date: { desc: '', hidden: true, run: () => <span className="text-sm text-slate-300">{new Date().toString()}</span> },
    echo: { desc: '', hidden: true, run: args => <span className="text-sm text-slate-300">{args.join(' ')}</span> },
    hire: { desc: '', hidden: true, run: () => <span className="text-sm text-emerald-300">Great choice. → <Ext href={`mailto:${profile.contact.email}`}>{profile.contact.email}</Ext></span> },
}

const COMMAND_NAMES = Object.keys(COMMANDS)

function distance(a: string, b: string) {
    const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
    for (let j = 1; j <= b.length; j++) dp[0][j] = j
    for (let i = 1; i <= a.length; i++)
        for (let j = 1; j <= b.length; j++)
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    return dp[a.length][b.length]
}

function closestCommand(name: string) {
    const lower = name.toLowerCase()
    let best: string | null = null
    let bestD = 3
    for (const c of COMMAND_NAMES) {
        const d = distance(lower, c)
        if (d < bestD) { best = c; bestD = d }
    }
    return best
}

/* ---------- terminal ---------- */

type Entry = { id: number; cmd?: string; node: ReactNode }

export default function PortfolioTerminal() {
    const [entries, setEntries] = useState<Entry[]>([])
    const [input, setInput] = useState('')
    const [booted, setBooted] = useState(false)
    const [cmdHistory, setCmdHistory] = useState<string[]>([])
    const [histIdx, setHistIdx] = useState<number | null>(null)
    const [clock, setClock] = useState('')
    const nextId = useRef(0)
    const typing = useRef(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    const push = (node: ReactNode, cmd?: string) => setEntries(prev => [...prev, { id: nextId.current++, cmd, node }])

    // Boot sequence
    useEffect(() => {
        const finish = () => {
            setBooted(true)
            // Deep links: coderzz69.github.io/#projects runs that command on load
            const hashCmd = decodeURIComponent(window.location.hash.slice(1))
            if (hashCmd && COMMANDS[hashCmd.split(/\s+/)[0].toLowerCase()]) execute(hashCmd)
        }
        if (reducedMotion()) {
            setEntries([{ id: nextId.current++, node: <BootLog lines={BOOT_LINES} /> }, { id: nextId.current++, node: <Welcome /> }])
            finish()
            return
        }
        const timers = BOOT_LINES.map((_, i) => window.setTimeout(() => setEntries([{ id: 0, node: <BootLog lines={BOOT_LINES.slice(0, i + 1)} /> }]), 150 + i * 160))
        const done = 150 + BOOT_LINES.length * 160
        nextId.current = 1
        timers.push(window.setTimeout(() => push(<Welcome />), done))
        timers.push(window.setTimeout(finish, done + 200))
        return () => {
            timers.forEach(clearTimeout)
            setEntries([])
        }
        // Runs once on mount; execute only touches state setters.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const tick = () => setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
        tick()
        const t = window.setInterval(tick, 1000)
        return () => clearInterval(t)
    }, [])

    // Show the top of a command's output; follow the bottom during boot.
    useEffect(() => {
        const last = entries[entries.length - 1]
        if (!last) return
        const behavior = reducedMotion() ? 'auto' : 'smooth'
        if (last.cmd !== undefined) document.getElementById(`entry-${last.id}`)?.scrollIntoView({ block: 'start', behavior })
        else scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior })
    }, [entries])

    const focusInput = () => {
        if (window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus({ preventScroll: true })
    }

    const execute = (raw: string) => {
        const line = raw.trim()
        setInput('')
        setHistIdx(null)
        if (!line) return push(null, '')
        setCmdHistory(h => (h[h.length - 1] === line ? h : [...h, line]))
        const [name, ...args] = line.split(/\s+/)
        const key = name.toLowerCase()
        if (key === 'clear') return setEntries([])
        const command = COMMANDS[key]
        push(command ? command.run(args) : <NotFound name={name} />, line)
    }

    // Clicked commands are "typed" into the prompt before running.
    const runTyped = (cmd: string) => {
        if (typing.current) return
        if (reducedMotion()) { execute(cmd); focusInput(); return }
        typing.current = true
        let i = 0
        const tick = () => {
            i++
            setInput(cmd.slice(0, i))
            if (i < cmd.length) window.setTimeout(tick, 28)
            else window.setTimeout(() => { execute(cmd); typing.current = false; focusInput() }, 110)
        }
        tick()
    }

    const suggestion = input && !input.includes(' ')
        ? COMMAND_NAMES.find(c => !COMMANDS[c].hidden && c.startsWith(input.toLowerCase()) && c !== input.toLowerCase())
        : undefined

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (typing.current) { e.preventDefault(); return }
        if (e.key === 'Enter') {
            execute(input)
        } else if (e.key === 'Tab' || (e.key === 'ArrowRight' && suggestion && e.currentTarget.selectionStart === input.length)) {
            e.preventDefault()
            if (suggestion) setInput(suggestion)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (!cmdHistory.length) return
            const idx = histIdx === null ? cmdHistory.length - 1 : Math.max(0, histIdx - 1)
            setHistIdx(idx)
            setInput(cmdHistory[idx])
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (histIdx === null) return
            const idx = histIdx + 1
            if (idx >= cmdHistory.length) { setHistIdx(null); setInput('') }
            else { setHistIdx(idx); setInput(cmdHistory[idx]) }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault()
            setEntries([])
        }
    }

    const onTerminalClick = () => {
        if (window.getSelection()?.toString()) return
        focusInput()
    }

    return (
        <RunContext.Provider value={runTyped}>
            <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-[#07090d] font-mono text-slate-300">
                <div aria-hidden className="crt-overlay pointer-events-none absolute inset-0 z-30" />
                <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

                {/* Title bar */}
                <header className="relative z-10 flex shrink-0 items-center gap-3 border-b border-slate-800/80 bg-[#0b0f15]/90 px-4 py-2.5 text-xs backdrop-blur">
                    <div className="flex gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 truncate text-center text-slate-400">
                        {profile.handle}@portfolio: ~ <span className="hidden text-slate-600 sm:inline">— zsh — {profile.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <span className="tabular-nums hidden sm:inline">{clock}</span>
                        <span className="flex items-center gap-1.5 text-emerald-400"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />online</span>
                    </div>
                </header>

                {/* Quick commands */}
                <nav className="relative z-10 shrink-0 border-b border-slate-800/60 bg-[#090c11]/80 backdrop-blur">
                    <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-2 text-xs [scrollbar-width:none] sm:px-6">
                        {QUICK.map(c => <Cmd key={c} name={c} className="shrink-0 py-1" />)}
                        <Cmd name="help" className="shrink-0 border-slate-700 bg-transparent py-1 text-slate-400" />
                    </div>
                </nav>

                {/* Output */}
                <main ref={scrollRef} onClick={onTerminalClick} className="relative z-10 flex-1 cursor-text overflow-y-auto">
                    <div className="mx-auto max-w-5xl space-y-6 px-4 pb-24 pt-5 sm:px-6">
                        {entries.map(entry => (
                            <section key={entry.id} id={`entry-${entry.id}`} className="rise-in scroll-mt-4">
                                {entry.cmd !== undefined && (
                                    <div className="mb-3 flex text-sm">
                                        <Prompt />
                                        <span className="text-slate-100">{entry.cmd}</span>
                                    </div>
                                )}
                                {entry.node}
                            </section>
                        ))}

                        {booted && (
                            <div className="relative flex items-center text-sm">
                                <Prompt />
                                <div className="relative flex min-w-0 flex-1 items-center">
                                    <input
                                        ref={inputRef}
                                        value={input}
                                        onChange={e => { if (!typing.current) setInput(e.target.value) }}
                                        onKeyDown={onKeyDown}
                                        aria-label="Terminal command"
                                        autoFocus
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        spellCheck={false}
                                        className="absolute inset-0 z-10 w-full bg-transparent text-transparent caret-transparent outline-none"
                                    />
                                    <span className="whitespace-pre text-slate-100">{input}</span>
                                    <span className="cursor-blink inline-block h-[1.15em] w-[0.6em] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                    {suggestion && <span className="whitespace-pre text-slate-600">{suggestion.slice(input.length)}</span>}
                                    {!input && <span className="ml-3 hidden text-slate-600 sm:inline">type a command or click one above</span>}
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                {/* Status bar */}
                <footer className="relative z-10 flex shrink-0 items-center justify-between gap-4 border-t border-slate-800/80 bg-[#0b0f15]/90 px-4 py-1.5 text-[11px] text-slate-500">
                    <span className="hidden sm:inline"><kbd className="text-slate-300">tab</kbd> complete · <kbd className="text-slate-300">↑↓</kbd> history · <kbd className="text-slate-300">ctrl+l</kbd> clear</span>
                    <span className="sm:hidden">tap a command above</span>
                    <span className="flex items-center gap-3">
                        <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-slate-200"><Github size={13} /></a>
                        <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-slate-200"><Linkedin size={13} /></a>
                        <a href={`mailto:${profile.contact.email}`} aria-label="Email" className="hover:text-slate-200"><Mail size={13} /></a>
                    </span>
                </footer>
            </div>
        </RunContext.Provider>
    )
}
