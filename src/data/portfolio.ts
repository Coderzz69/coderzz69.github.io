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
  link?: string
  points: string[]
}

const gh = (repo: string) => `https://github.com/Coderzz69/${repo}`

export const profile = {
  name: 'Sanath Coonani',
  handle: 'sanath',
  role: 'ML Engineer & Systems Developer',
  status: '3rd year · Integrated Masters (M.Tech), CSE · University of Hyderabad',
  location: 'Hyderabad, India',
  focus: ['Reinforcement Learning', 'Computer Vision & OCR', 'Explainable ML', 'MLOps'],
  bio: [
    'ML engineering student with OCR research experience at C-DAC. I take models from data pipeline and training to Dockerised inference APIs, across deep learning, reinforcement learning and explainable ML.',
    'I like learning systems that act in the real world: RL agents that steer traffic and cold-storage climate, vision models that read Tamil script or watch live video, and pipelines that hold up on tens of millions of noisy records.',
    'I also lead the Codosapiens Coding Club at the University of Hyderabad.',
  ],
  stats: [
    { value: '0.9714', label: 'F0.5 · ML Challenge 2026' },
    { value: '93.6%', label: 'Tamil OCR accuracy · C-DAC' },
    { value: '57.7%', label: 'less traffic wait (MARL)' },
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
      'Independent DQN agents per intersection, trained on SUMO (14.7s → 6.2s avg wait)',
      'Hierarchical master controller creates green corridors for emergency vehicles',
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
    tagline: 'C-DAC research · akshara-level Tamil OCR built on PaddleOCR.',
    metrics: ['93.6% seq accuracy', '−40% target length', '99.8% label coverage'],
    highlights: [
      'Akshara (Unicode grapheme cluster) tokenization cut targets from 7.94 to 4.76 tokens per word',
      'Integrated into PaddleOCR CTC & NRTR paths; fine-tuned PP-OCRv5 on a SLURM GPU cluster',
      '355-token akshara dictionary covering 99.8% of 80K labels',
    ],
    tech: ['Python', 'PaddlePaddle', 'PP-OCRv5', 'SLURM'],
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
  { title: 'ShopLens', note: 'TCS Hackathon · LightGBM finds the cause of 83.7% of cart abandonments; 0.94 AUC live drop-risk with SHAP nudges', repo: gh('shoplens') },
  { title: 'Hackify', note: 'Developer skill verification · Next.js, Prisma, GitHub OAuth', repo: gh('Hackify') },
  { title: 'Budget Buddy', note: 'Cross-platform finance app · React Native, Expo, Clerk', repo: gh('Budget-Buddy-Frontend') },
  { title: 'n8n Cold Email', note: 'AI-personalized outreach with Gemini, Gmail & Sheets', repo: gh('n8n-workflows') },
]

export const experience: Job[] = [
  {
    company: 'C-DAC',
    role: 'AI/ML Research Intern',
    period: 'May – Jul 2026',
    mode: 'Chennai, on-site',
    summary: 'Tamil OCR research · IndicOCR initiative',
    points: [
      'Shortened OCR target sequences by 40% (7.94 → 4.76 tokens/word) with akshara-level tokenization using Unicode grapheme clusters',
      'Reached 93.6% validation sequence accuracy (0.986 normalised edit distance) by fine-tuning PP-OCRv5 on a SLURM GPU cluster',
      'Built a word recognizer from scratch (SwinV2, BiLSTM, CTC / Transformer decoders); error analysis on dropped combining marks drove the tokenizer redesign',
      'Built a 355-token akshara dictionary covering 99.8% of 80K labels by auditing and NFC-normalising the corpus',
    ],
  },
  {
    company: 'Temperate Technologies',
    role: 'ML Intern',
    period: 'Jun – Aug 2025',
    mode: 'On-site',
    summary: 'Cold-storage climate control',
    points: [
      'Built a Scikit-learn model predicting environmental suitability for crop storage from cleaned sensor data',
      'Trained an RL control policy regulating temperature & humidity under energy constraints',
      'Served real-time inference and automated control via a containerised Flask REST API on Docker',
    ],
  },
  {
    company: 'Client Project',
    role: 'Software Development Intern',
    period: 'Dec 2025 – Feb 2026',
    mode: 'Hybrid',
    summary: 'Next.js, Node.js, TailwindCSS',
    link: 'https://Flyholisticschools.com',
    points: [
      'Built and deployed a production website serving 5,000+ monthly users with Next.js and Node.js REST APIs',
      'Improved page load speed by 40% through asset optimisation and performance tuning',
    ],
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'ML / Deep Learning', items: ['PyTorch', 'Scikit-learn', 'LightGBM', 'XGBoost', 'Transformers', 'CNNs', 'LSTMs', 'RL (DQN, MARL)', 'Fine-tuning', 'SHAP'] },
  { group: 'Vision & OCR', items: ['OpenCV', 'YOLOv8', 'PaddleOCR (PP-OCRv5)', 'SwinV2'] },
  { group: 'Data', items: ['Pandas', 'NumPy', 'Matplotlib', 'Feature Engineering', 'Imbalanced Data', 'Model Evaluation'] },
  { group: 'MLOps & Deploy', items: ['Docker', 'Flask', 'FastAPI', 'REST APIs', 'SLURM GPU training', 'AWS', 'Azure', 'Git'] },
  { group: 'Languages & Web', items: ['Python', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Node.js', 'Next.js', 'React', 'Django'] },
]

export const achievements = {
  leadership: [
    { title: 'Lead Organizer, Codosapiens Coding Club', note: 'University of Hyderabad, 2025 – present · revived the club; runs coding contests, workshops and hackathons' },
  ],
  competitions: [
    { title: 'ML Challenge 2026', note: 'Business Entity Resolution with Team Chaicopath — held-out F0.5 0.9714' },
    { title: "Technovista '25 · Campus Chaos Grid", note: 'Power-grid event classification from sensor graph features' },
    { title: 'TCS Hackathon', note: 'ShopLens — e-commerce friction detection & recovery with LightGBM + SHAP' },
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
