export interface Project {
  title: string
  tagline: string
  highlights: string[]
  metrics: string[]
  tech: string[]
  repo: string
}

export interface Job {
  company: string
  role: string
  period: string
  mode: string
  summary?: string
  points: string[]
}

const gh = (repo: string) => `https://github.com/Coderzz69/${repo}`

export const profile = {
  name: 'Sanath Coonani',
  handle: 'sanath',
  role: 'ML Engineer & Systems Developer',
  status: '3rd year · Integrated Masters, CSE · University of Hyderabad',
  location: 'Hyderabad, India',
  focus: ['Reinforcement Learning', 'Computer Vision', 'Real-time AI', 'Entity Resolution'],
  bio: [
    'I build learning systems that act in the real world: RL agents that control hardware and traffic, vision models that watch live video, and ML pipelines that hold up on tens of millions of noisy records.',
    'Lately: multi-agent RL, self-supervised vision-language models, and OCR for Dravidian scripts.',
  ],
  stats: [
    { value: '0.9714', label: 'F0.5 · ML Challenge 2026' },
    { value: '57.7%', label: 'less traffic wait (MARL)' },
    { value: '30+ FPS', label: 'real-time CV inference' },
    { value: '35+', label: 'public repos' },
  ],
  contact: {
    email: 'snathkumarcoonani@gmail.com',
    phone: '+91-8309841450',
    github: 'https://github.com/Coderzz69',
    linkedin: 'https://linkedin.com/in/sanath-coonani',
    leetcode: 'https://leetcode.com/Coderzz69',
  },
  resume: '/Sanath_Coonani_Resume.pdf',
}

export const projects: Project[] = [
  {
    title: 'Business Entity Resolution',
    tagline: 'ML Challenge 2026 · Team Chaicopath — matching businesses across 20M+ noisy, multilingual records.',
    metrics: ['F0.5 0.9714', 'ROC AUC 0.9996', '97.8% blocking recall'],
    highlights: [
      'Conjunction-key sparse blocking keeps 97.8% of true pairs in a top-15 candidate set',
      'Synonym & transliteration tables learned from labels alone (praivet→private, mharastr→maharashtra)',
      'Two-stage XGBoost matcher with partition-aware features and per-entity expected-F0.5 decoding',
    ],
    tech: ['Python', 'XGBoost', 'CUDA', 'Pandas', 'sparse_dot_topn'],
    repo: gh('Business_Entity_Resolution_ML'),
  },
  {
    title: 'IntelliSignal-AI',
    tagline: 'SSS Hackathon · decentralized multi-agent RL for Indian urban traffic control.',
    metrics: ['−57.7% wait / vehicle', '−79.8% total wait', '~0s emergency wait'],
    highlights: [
      'Hierarchical MARL (DQN) trained on SUMO simulations with mixed vehicle classes',
      'Green corridor gives ambulances near-zero wait',
      'React dashboard with YOLO-based traffic video analysis',
    ],
    tech: ['Python', 'PyTorch', 'SUMO', 'YOLO', 'React'],
    repo: gh('Intellisense-AI'),
  },
  {
    title: 'DroneFleet',
    tagline: 'Master/slave drone coordination that decides whether a mission is possible before takeoff.',
    metrics: ['plain-English missions', 'fault injection'],
    highlights: [
      'Describe drones and missions in plain English; the master explains exactly what is missing',
      'MQTT messaging, local LLM support and pluggable domain packs',
      'Retro GBA-style overworld as the operator interface',
    ],
    tech: ['Python', 'MQTT', 'LLMs'],
    repo: gh('DroneFleet'),
  },
  {
    title: 'PaddleOCR Dravidian',
    tagline: 'PaddleOCR fork for Tamil and Dravidian script recognition.',
    metrics: ['355-token Akshara dict'],
    highlights: [
      'PP-OCRv5 recognition retrained with Akshara (Unicode grapheme cluster) tokenization',
      'Fine-tunes from the Tamil PP-OCRv5 mobile model',
    ],
    tech: ['Python', 'PaddlePaddle', 'PP-OCRv5'],
    repo: gh('PaddleOCR_Dravidian_Rep'),
  },
  {
    title: 'Geometry Dash AI Agent',
    tagline: 'Vision-based deep RL agent that learns jump timing from raw pixels.',
    metrics: ['4.5× survival', '−35% variance', '3× faster training'],
    highlights: [
      'CNN-DQN trained on 100K+ frames from a 30+ FPS screen-capture environment',
      'Experience replay (50K), epsilon decay and target networks',
      'Custom reward shaping for sparse-reward stability',
    ],
    tech: ['Python', 'PyTorch', 'OpenCV', 'DQN'],
    repo: gh('Geometry-Dash-Automation-using-Image-Processing-and-DQN'),
  },
  {
    title: 'Smart Incident Detection',
    tagline: 'Real-time fire, smoke, unconscious-person and crowd-surge detection on live video.',
    metrics: ['92% accuracy', '30+ FPS'],
    highlights: [
      'YOLOv8 pipeline built for live CCTV integration',
      'Flask REST inference service for automated alerts',
    ],
    tech: ['Python', 'YOLOv8', 'OpenCV', 'Flask'],
    repo: gh('Smart-Incident-Detection-with-YOLOv8'),
  },
]

export const moreProjects = [
  { title: 'ML Algorithms from Scratch', note: 'Regression & trees without ML libs — R² 0.96, 96% on Iris', repo: gh('ml_projects_from_scratch') },
  { title: 'VL-JEPA', note: 'JEPA-style vision-language SSL on a single 4GB GPU', repo: gh('VL-JEPA') },
  { title: 'AgriEnv', note: 'Greenhouse-control RL environment · OpenEnv, FastAPI, PPO', repo: gh('my-openenv') },
  { title: 'ShopLens', note: 'Synthetic clickstreams for journey-friction detection', repo: gh('shoplens') },
  { title: 'Hackify', note: 'Developer skill verification · Next.js, Prisma, GitHub OAuth', repo: gh('Hackify') },
  { title: 'Budget Buddy', note: 'Cross-platform finance app · React Native, Expo, Clerk', repo: gh('Budget-Buddy-Frontend') },
  { title: 'n8n Cold Email', note: 'AI-personalized outreach with Gemini, Gmail & Sheets', repo: gh('n8n-workflows') },
]

export const experience: Job[] = [
  {
    company: 'Temperate Technologies',
    role: 'ML Intern',
    period: 'Jun – Aug 2025',
    mode: 'On-site',
    summary: 'Automating low-cost cold storage with ML & reinforcement learning',
    points: [
      'Built an environmental suitability predictor (Pandas, Scikit-learn) for optimal crop storage',
      'Developed an RL control policy for temperature & humidity under energy constraints',
      'Validated decision stability across conditions with NumPy, Matplotlib & Jupyter',
      'Shipped a real-time inference API (Flask, REST, Docker) driving sensor-based control',
    ],
  },
  {
    company: 'Freelance',
    role: 'Web Developer',
    period: 'Dec 2024 – Jan 2025',
    mode: 'Remote',
    points: [
      'Built a responsive Next.js + Tailwind site serving 500+ monthly users',
      'Delivered end to end in 2 weeks, from requirements to deployment',
      'Cut page load time by 40% through asset optimization',
    ],
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'SQL', 'PostgreSQL'] },
  { group: 'Machine Learning', items: ['PyTorch', 'Scikit-learn', 'XGBoost', 'Reinforcement Learning', 'Computer Vision', 'Deep Learning'] },
  { group: 'Cloud & Deploy', items: ['AWS (EC2, S3)', 'Azure Web Apps', 'Docker', 'REST APIs', 'Model Deployment'] },
  { group: 'Frameworks & Tools', items: ['Flask', 'FastAPI', 'OpenCV', 'NumPy', 'Pandas', 'Matplotlib', 'Git', 'Jupyter'] },
  { group: 'Web', items: ['React', 'Next.js', 'React Native', 'Node.js', 'Express', 'Firebase'] },
]

export const achievements = {
  competitions: [
    { title: 'ML Challenge 2026', note: 'Business Entity Resolution with Team Chaicopath — held-out F0.5 0.9714' },
    { title: "Technovista '25 · Campus Chaos Grid", note: 'Power-grid event classification from sensor graph features' },
    { title: 'SSS Hackathon', note: 'IntelliSignal-AI multi-agent RL traffic control' },
    { title: 'Smart Classroom Hackathon 2024', note: 'Automated attendance & classroom safety prototype' },
  ],
  certifications: [
    'IBM Full Stack Software Developer Professional Certificate',
    'Developing Applications with Django and SQL',
    'Developing Back-End Apps with Node.js and Express',
    'Python for Data Science, AI & Development',
  ],
  workshops: ['Deep Learning using YOLO', 'AI & Machine Learning', 'Ethical Web Hacking'],
}
