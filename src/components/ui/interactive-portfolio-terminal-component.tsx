import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { about, competitions, courses, otherRepos, profile, projects, skills, work } from '@/data/portfolio'

const NAV = ['about', 'projects', 'work', 'skills', 'achievements', 'contact', 'resume']

// Lets output anywhere in the scrollback run a command when a word is clicked.
const RunContext = createContext<(cmd: string) => void>(() => {})

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- bits of text ---------- */

function Cmd({ name, label }: { name: string; label?: string }) {
    const run = useContext(RunContext)
    return (
        <button
            type="button"
            onClick={e => { e.stopPropagation(); run(name) }}
            className="text-[var(--green)] underline decoration-dotted underline-offset-4 hover:decoration-solid focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--green)]"
        >
            {label ?? name}
        </button>
    )
}

function Link({ href, children }: { href: string; children: ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-[var(--blue)] underline decoration-[var(--blue)]/40 underline-offset-4 hover:decoration-[var(--blue)]"
        >
            {children}
        </a>
    )
}

const Dim = ({ children }: { children: ReactNode }) => <span className="text-[var(--dim)]">{children}</span>
const Comment = ({ children }: { children: ReactNode }) => <div className="mt-4 text-[var(--dim)] first:mt-0"># {children}</div>

function Prompt() {
    return (
        <span className="shrink-0 select-none">
            <span className="text-[var(--green)]">{profile.user}@uoh</span>:<span className="text-[var(--blue)]">~</span>$&nbsp;
        </span>
    )
}

/* ---------- command output ---------- */

function Readme() {
    return (
        <div>
            <div className="text-[var(--yellow)]">{profile.name}</div>
            <p>ML student at the University of Hyderabad. RL, computer vision, and lately Tamil OCR.</p>
            <p className="mt-3">
                Things you can run:{' '}
                {NAV.map(c => <span key={c}><Cmd name={c} />{'  '}</span>)}
            </p>
            <p><Dim>Click one or type it. <Cmd name="help" /> lists everything.</Dim></p>
        </div>
    )
}

function Help() {
    return (
        <div className="grid grid-cols-[13ch_1fr] gap-x-2">
            {Object.entries(COMMANDS).filter(([, c]) => c.desc).map(([name, c]) => (
                <div key={name} className="contents">
                    <div><Cmd name={name} /></div>
                    <div className="text-[var(--dim)]">{c.desc}</div>
                </div>
            ))}
            <div className="col-span-2 mt-3 text-[var(--dim)]">tab completes, up/down for history, ctrl+l clears.</div>
        </div>
    )
}

function About() {
    return (
        <div className="max-w-[72ch] space-y-3">
            {about.map(p => <p key={p}>{p}</p>)}
            <p>Best way to reach me is email: <Link href={`mailto:${profile.email}`}>{profile.email}</Link></p>
        </div>
    )
}

function Projects() {
    return (
        <div className="max-w-[76ch]">
            <Dim>My pinned repos. <span className="text-[var(--fg)]">open 1</span> opens the first one, and so on.</Dim>
            {projects.map((p, i) => (
                <div key={p.repo} className="mt-4 grid grid-cols-[4ch_1fr] gap-x-1">
                    <Dim>[{i + 1}]</Dim>
                    <div className="min-w-0">
                        <div className="flex items-baseline justify-between gap-4">
                            <span className="break-all"><Link href={p.url}>{p.repo}</Link></span>
                            <Dim>{p.year}</Dim>
                        </div>
                        <p>{p.text}</p>
                        <Dim>{p.stack}</Dim>
                    </div>
                </div>
            ))}
            <p className="mt-4"><Dim>Smaller stuff:</Dim> <Cmd name="github" /></p>
        </div>
    )
}

function Github() {
    return (
        <div className="max-w-[76ch] space-y-2">
            {otherRepos.map(p => (
                <div key={p.repo}>
                    <Link href={p.url}>{p.repo}</Link>
                    <div className="pl-4 text-[var(--dim)]">{p.text}</div>
                </div>
            ))}
            <p className="pt-2">The rest: <Link href={profile.github}>github.com/Coderzz69</Link></p>
        </div>
    )
}

function Work() {
    return (
        <div className="max-w-[80ch] space-y-4">
            {work.map(w => (
                <div key={w.what} className="sm:grid sm:grid-cols-[19ch_1fr] sm:gap-x-2">
                    <Dim>{w.when}</Dim>
                    <div>
                        <div className="text-[var(--yellow)]">
                            {w.what}
                            {w.link && <> <Link href={w.link}>(site)</Link></>}
                        </div>
                        <p>{w.text}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

function Skills() {
    return (
        <div className="grid max-w-[76ch] grid-cols-[8ch_1fr] gap-x-2">
            {skills.map(([k, v]) => (
                <div key={k} className="contents">
                    <span className="text-[var(--green)]">{k}</span>
                    <span>{v}</span>
                </div>
            ))}
        </div>
    )
}

function Achievements() {
    return (
        <div className="max-w-[76ch]">
            <Comment>competitions</Comment>
            {competitions.map(([y, t]) => <div key={t} className="grid grid-cols-[6ch_1fr]"><Dim>{y}</Dim><span>{t}</span></div>)}
            <Comment>leadership</Comment>
            <div className="grid grid-cols-[6ch_1fr]"><Dim>2025</Dim><span>Lead organizer, Codosapiens coding club (UoH)</span></div>
            <Comment>courses and workshops</Comment>
            {courses.map(c => <div key={c}>{c}</div>)}
        </div>
    )
}

function Contact() {
    const rows: [string, ReactNode][] = [
        ['email', <Link href={`mailto:${profile.email}`}>{profile.email}</Link>],
        ['github', <Link href={profile.github}>Coderzz69</Link>],
        ['linkedin', <Link href={profile.linkedin}>sanath-coonani</Link>],
        ['leetcode', <Link href={profile.leetcode}>Coderzz69</Link>],
        ['phone', <span>{profile.phone}</span>],
        ['resume', <Link href={profile.resume}>resume.pdf</Link>],
    ]
    return (
        <div className="grid grid-cols-[10ch_1fr] gap-x-2">
            {rows.map(([k, v]) => <div key={k} className="contents"><Dim>{k}</Dim><span className="min-w-0 break-words">{v}</span></div>)}
        </div>
    )
}

function Ls() {
    const files: [string, string][] = [
        ['README', 'cat README'], ['projects/', 'projects'], ['github/', 'github'], ['work.txt', 'work'],
        ['skills.txt', 'skills'], ['achievements.txt', 'achievements'], ['contact.txt', 'contact'], ['resume.pdf', 'resume'],
    ]
    const run = useContext(RunContext)
    return (
        <div className="flex flex-wrap gap-x-5">
            {files.map(([f, cmd]) => (
                <button key={f} type="button" onClick={e => { e.stopPropagation(); run(cmd) }} className={cn(f.endsWith('/') ? 'text-[var(--blue)]' : '', 'hover:underline')}>{f}</button>
            ))}
        </div>
    )
}

const cn = (...c: string[]) => c.filter(Boolean).join(' ')

function NotFound({ name }: { name: string }) {
    const guess = closestCommand(name)
    return (
        <div>
            <div>zsh: command not found: {name}</div>
            {guess ? <div><Dim>did you mean</Dim> <Cmd name={guess} /><Dim>?</Dim></div> : <div><Dim>try</Dim> <Cmd name="help" /></div>}
        </div>
    )
}

/* ---------- commands ---------- */

type Command = { desc?: string; run: (args: string[]) => ReactNode }

const COMMANDS: Record<string, Command> = {
    about: { desc: 'who I am', run: () => <About /> },
    projects: { desc: 'things I built (pinned repos)', run: () => <Projects /> },
    github: { desc: 'smaller repos', run: () => <Github /> },
    work: { desc: 'internships', run: () => <Work /> },
    skills: { desc: 'what I work with', run: () => <Skills /> },
    achievements: { desc: 'hackathons, the club, courses', run: () => <Achievements /> },
    contact: { desc: 'email and links', run: () => <Contact /> },
    resume: {
        desc: 'open my resume (pdf)',
        run: () => {
            window.open(profile.resume, '_blank', 'noopener')
            return <div>opening resume.pdf in a new tab. if nothing happened: <Link href={profile.resume}>resume.pdf</Link></div>
        },
    },
    help: { desc: 'this list', run: () => <Help /> },
    clear: { desc: 'clear the screen', run: () => null },
    experience: { run: () => <Work /> },
    ls: { run: () => <Ls /> },
    cat: {
        run: ([f]) => f?.toLowerCase() === 'readme'
            ? <Readme />
            : <div>cat: {f ?? ''}: No such file or directory</div>,
    },
    open: {
        run: ([n]) => {
            const p = projects[Number(n) - 1]
            if (!p) return <div>usage: open &lt;1-{projects.length}&gt;</div>
            window.open(p.url, '_blank', 'noopener')
            return <div>opening <Link href={p.url}>{p.repo}</Link></div>
        },
    },
    whoami: { run: () => <div>{profile.user}</div> },
    pwd: { run: () => <div>/home/{profile.user}</div> },
    date: { run: () => <div>{new Date().toString()}</div> },
    echo: { run: args => <div>{args.join(' ')}</div> },
    sudo: { run: () => <div>{profile.user} is not in the sudoers file. This incident will be reported.</div> },
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
    let best: string | null = null
    let bestD = 3
    for (const c of COMMAND_NAMES) {
        const d = distance(name.toLowerCase(), c)
        if (d < bestD) { best = c; bestD = d }
    }
    return best
}

/* ---------- terminal ---------- */

type Entry = { id: number; cmd?: string; node: ReactNode }

const lastLogin = () => {
    const d = new Date()
    const day = d.toLocaleDateString('en-US', { weekday: 'short' })
    const mon = d.toLocaleDateString('en-US', { month: 'short' })
    return `Last login: ${day} ${mon} ${d.getDate()} ${d.toTimeString().slice(0, 8)} on ttys001`
}

export default function PortfolioTerminal() {
    const [entries, setEntries] = useState<Entry[]>(() => [
        { id: 0, node: <Dim>{lastLogin()}</Dim> },
        { id: 1, cmd: 'cat README', node: <Readme /> },
    ])
    const [input, setInput] = useState('')
    const [cmdHistory, setCmdHistory] = useState<string[]>([])
    const [histIdx, setHistIdx] = useState<number | null>(null)
    const nextId = useRef(2)
    const typing = useRef(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    const push = (node: ReactNode, cmd: string) => setEntries(prev => [...prev, { id: nextId.current++, cmd, node }])

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

    // Deep links: coderzz69.github.io/#projects runs `projects` on load
    const ranHash = useRef(false)
    useEffect(() => {
        if (ranHash.current) return
        ranHash.current = true
        const cmd = decodeURIComponent(window.location.hash.slice(1))
        if (cmd && COMMANDS[cmd.split(/\s+/)[0].toLowerCase()]) execute(cmd)
        // Runs once on mount; execute only touches state setters.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Show the top of each new output.
    useEffect(() => {
        const last = entries[entries.length - 1]
        if (last?.cmd) document.getElementById(`entry-${last.id}`)?.scrollIntoView({ block: 'start' })
        else scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
    }, [entries])

    const focusInput = () => {
        if (window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus({ preventScroll: true })
    }

    // Clicked commands get typed into the prompt first, like a person would.
    const runTyped = (cmd: string) => {
        if (typing.current) return
        if (reducedMotion()) { execute(cmd); focusInput(); return }
        typing.current = true
        let i = 0
        const tick = () => {
            i++
            setInput(cmd.slice(0, i))
            if (i < cmd.length) window.setTimeout(tick, 20)
            else window.setTimeout(() => { execute(cmd); typing.current = false; focusInput() }, 80)
        }
        tick()
    }

    const suggestion = input && !input.includes(' ')
        ? Object.keys(COMMANDS).find(c => COMMANDS[c].desc && c.startsWith(input.toLowerCase()) && c !== input.toLowerCase())
        : undefined

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (typing.current) { e.preventDefault(); return }
        if (e.key === 'Enter') {
            execute(input)
        } else if (e.key === 'Tab') {
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

    return (
        <RunContext.Provider value={runTyped}>
            <div className="flex h-dvh w-full flex-col bg-[var(--bg)] font-mono text-[13px] leading-relaxed text-[var(--fg)] sm:text-[14px]">
                <header className="flex shrink-0 items-center gap-6 border-b border-[var(--line)] px-4 py-2 sm:px-8">
                    <span className="hidden shrink-0 text-[var(--dim)] sm:inline">{profile.user}@uoh: ~</span>
                    <nav className="flex gap-4 overflow-x-auto [scrollbar-width:none] sm:ml-auto">
                        {NAV.map(c => (
                            <button key={c} type="button" onClick={() => runTyped(c)} className="shrink-0 text-[var(--dim)] hover:text-[var(--fg)] hover:underline underline-offset-4">
                                {c}
                            </button>
                        ))}
                    </nav>
                </header>

                <main
                    ref={scrollRef}
                    onClick={() => { if (!window.getSelection()?.toString()) focusInput() }}
                    className="flex-1 cursor-text overflow-y-auto"
                >
                    <div className="space-y-4 px-4 pb-24 pt-4 sm:px-8">
                        {entries.map(entry => (
                            <section key={entry.id} id={`entry-${entry.id}`} className="scroll-mt-4">
                                {entry.cmd !== undefined && (
                                    <div className="flex"><Prompt /><span>{entry.cmd}</span></div>
                                )}
                                {entry.node}
                            </section>
                        ))}

                        <div className="flex items-center">
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
                                <span className="whitespace-pre">{input}</span>
                                <span className="cursor-blink inline-block h-[1.2em] w-[0.6em] bg-[var(--fg)]" />
                                {suggestion && <span className="whitespace-pre text-[var(--dim)]">{suggestion.slice(input.length)}</span>}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </RunContext.Provider>
    )
}
