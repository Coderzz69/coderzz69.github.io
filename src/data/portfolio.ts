const gh = (repo: string) => `https://github.com/Coderzz69/${repo}`

export const profile = {
  name: 'Sanath Kumar Coonani',
  user: 'sanath',
  email: 'snathkumarcoonani@gmail.com',
  phone: '+91-8309841450',
  github: 'https://github.com/Coderzz69',
  linkedin: 'https://www.linkedin.com/in/sanath-coonani/',
  leetcode: 'https://leetcode.com/Coderzz69',
  resume: '/Sanath_Coonani_Resume.pdf',
}

export const about = [
  "I'm Sanath, a 3rd year integrated M.Tech (CSE) student at the University of Hyderabad.",
  'Most of what I build is reinforcement learning or computer vision. This summer I was a research intern at C-DAC Chennai working on Tamil OCR. The summer before, I trained an RL controller for cold-storage rooms at Temperate Technologies.',
  'I also run Codosapiens, the coding club at UoH. It had gone quiet, so we restarted it in 2025 and now run contests, workshops and hackathons.',
]

// The six repos pinned on github.com/Coderzz69
export const projects = [
  {
    repo: 'Business_Entity_Resolution_ML',
    year: '2026',
    text: 'ML Challenge 2026 with team Chaicopath. About 20M business records from three sources, some written in Devanagari or Tamil, and the job is to work out which ones are the same company. The transliteration fixes (praivet -> private, mharastr -> maharashtra) are learned from the labelled pairs instead of written by hand. Sparse key blocking keeps the candidate set small, then a two-stage XGBoost model does the matching. Held-out F0.5 was 0.9714.',
    stack: 'python, xgboost, pandas',
  },
  {
    repo: 'Intellisense-AI',
    year: '2025',
    text: 'Traffic signals for Indian intersections, one DQN agent per junction, trained in SUMO. Against fixed timers, average wait per vehicle dropped from 14.7s to 6.2s. A master controller on top opens a green corridor when an ambulance shows up. Built for the SSS Hackathon.',
    stack: 'python, pytorch, sumo',
  },
  {
    repo: 'DroneFleet',
    year: '2026',
    text: "Describe your drones and a mission in plain English and the master node works out, over MQTT, whether the fleet can actually do it. If it can't, it tells you what's missing. Supports fault injection and a local LLM, and the operator screen looks like a GBA game.",
    stack: 'python, mqtt',
  },
  {
    repo: 'PaddleOCR_Dravidian_Rep',
    year: '2026',
    text: 'My C-DAC work. PaddleOCR reads Tamil one Unicode code point at a time, and most of our recognition errors were dropped combining marks. Switching to akshara (grapheme cluster) tokens made targets 40% shorter with a 355-token dictionary, and fine-tuned PP-OCRv5 reached 93.6% sequence accuracy.',
    stack: 'python, paddlepaddle, slurm',
  },
  {
    repo: 'Geometry-Dash-Automation-using-Image-Processing-and-DQN',
    year: '2025',
    text: 'A DQN that plays Geometry Dash from screen pixels. Captures the game at 30+ FPS, uses a CNN with experience replay and a target network, and after 100K+ frames survives 4.5x longer than random jumping.',
    stack: 'python, pytorch, opencv',
  },
  {
    repo: 'Smart-Incident-Detection-with-YOLOv8',
    year: '2025',
    text: 'YOLOv8 watching CCTV feeds for fire, smoke, people who have collapsed and crowd surges. 92% accuracy at 30+ FPS, with a small Flask API that sends the alerts.',
    stack: 'python, yolov8, flask',
  },
].map(p => ({ ...p, url: gh(p.repo) }))

export const otherRepos = [
  { repo: 'shoplens', text: 'TCS Hackathon. Figures out why shoppers abandon carts (right cause 83.7% of the time) and flags at-risk sessions live.' },
  { repo: 'ml_projects_from_scratch', text: 'Linear/logistic regression and decision trees with just numpy.' },
  { repo: 'VL-JEPA', text: 'JEPA-style vision-language pretraining squeezed onto a 4GB GPU.' },
  { repo: 'my-openenv', text: 'AgriEnv, a greenhouse-control RL environment for OpenEnv.' },
  { repo: 'Hackify', text: 'Skill verification for developers from GitHub activity and graded coding tasks.' },
  { repo: 'Budget-Buddy-Frontend', text: 'Expense tracker in React Native.' },
  { repo: 'n8n-workflows', text: 'Cold email automation in n8n with Gemini and Google Sheets.' },
].map(p => ({ ...p, url: gh(p.repo) }))

export const work: { when: string; what: string; link?: string; text: string }[] = [
  {
    when: 'May-Jul 2026',
    what: 'AI/ML research intern, C-DAC Chennai',
    text: 'Tamil OCR for the IndicOCR project. Wrote an akshara tokenizer (7.94 -> 4.76 tokens per word) and fine-tuned PP-OCRv5 on a SLURM cluster to 93.6% sequence accuracy. I also built a recognizer from scratch (SwinV2 + BiLSTM, CTC and transformer decoders), and its mistakes are what pointed us at the tokenizer.',
  },
  {
    when: 'Dec 2025-Feb 2026',
    what: 'Software dev intern, client project',
    link: 'https://Flyholisticschools.com',
    text: 'Next.js and Node site with around 5,000 users a month. Cut page load time by 40%.',
  },
  {
    when: 'Jun-Aug 2025',
    what: 'ML intern, Temperate Technologies',
    text: 'RL controller for temperature and humidity in cold storage, working under an energy budget, plus a model that predicts whether conditions suit a given crop. Shipped as a Flask API in Docker reading live sensor data.',
  },
]

export const skills: [string, string][] = [
  ['ml', 'pytorch, scikit-learn, lightgbm, xgboost, transformers, rl (dqn, marl), shap'],
  ['vision', 'opencv, yolov8, paddleocr, swinv2'],
  ['data', 'pandas, numpy, matplotlib'],
  ['infra', 'docker, flask, fastapi, slurm, aws, azure, git'],
  ['langs', 'python, c++, java, javascript, typescript'],
  ['web', 'node, next.js, react, django'],
]

export const competitions: [string, string][] = [
  ['2026', 'ML Challenge, team Chaicopath (entity resolution, F0.5 0.9714)'],
  ['2026', 'TCS Hackathon (ShopLens)'],
  ['2025', 'Technovista, Campus Chaos Grid (power grid event classification)'],
  ['2025', 'SSS Hackathon (IntelliSignal)'],
  ['2024', 'Smart Classroom hackathon (attendance and safety monitoring)'],
]

export const courses = [
  'IBM Full Stack Software Developer certificate (Coursera, 2025)',
  'Django and SQL, Node.js and Express, Python for Data Science (Coursera, 2025)',
  'Shaastra 2026 workshops at IIT Madras: YOLO, AI/ML, ethical web hacking',
]
