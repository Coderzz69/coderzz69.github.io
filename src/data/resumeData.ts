import type { ResumeData } from "../types";

export const resumeData: ResumeData = {
    personal: {
        name: "Sanath Coonani",
        role: "Machine Learning Engineer / Software Developer",
        education: "Integrated Masters in Computer Science and Engineering",
        university: "University of Hyderabad",
        location: "Hyderabad, India",
        contact: {
            email: "snathkumarcoonani@gmail.com",
            phone: "+91-8309841450",
            github: "https://github.com/Coderzz69",
            linkedin: "https://linkedin.com/in/sanath-coonani",
            leetcode: "https://leetcode.com",
        },
    },
    about: "Machine learning engineer and systems developer focused on reinforcement learning, computer vision, and real-time AI systems.\nExperienced in building ML pipelines, RL agents, and production APIs for automated decision systems.",
    projects: [
        {
            title: "Geometry Dash AI Agent",
            tech: ["Python", "PyTorch", "OpenCV", "Deep Reinforcement Learning"],
            description: [
                "Built a vision-based RL agent using Deep Q Networks",
                "Processed 30+ FPS screen capture environment",
                "Trained CNN-DQN on 100K+ frames",
                "Improved survival time 4.5× vs random baseline",
                "Implemented experience replay and target networks",
            ],
        },
        {
            title: "Smart Incident Detection System",
            tech: ["YOLOv8", "Python", "OpenCV", "Flask"],
            description: [
                "Real-time fire, smoke, and crowd detection system",
                "92% detection accuracy",
                "30+ FPS inference",
                "Designed REST inference API for live CCTV integration",
            ],
        },
        {
            title: "ML Algorithms From Scratch",
            tech: ["Python", "NumPy", "Pandas"],
            description: [
                "Implemented Linear Regression, Logistic Regression, Decision Trees",
                "Derived gradient descent and entropy mathematically",
                "Achieved R2 = 0.96 on salary dataset",
                "96% accuracy on Iris dataset",
            ],
        },
    ],
    experience: [
        {
            company: "Temperate Technologies",
            role: "Machine Learning Intern",
            period: "Jun–Aug 2025",
            contributions: [
                "Designed ML model predicting optimal crop storage conditions",
                "Developed reinforcement learning control system for temperature and humidity",
                "Built real-time inference API using Flask",
                "Deployed system using Docker",
                "Used sensor-driven environmental data for automated control",
            ],
        },
        {
            company: "Freelance Web Developer",
            role: "Full Stack Developer",
            period: "Dec 2024 – Jan 2025",
            contributions: [
                "Built a production website using Next.js and TailwindCSS",
                "Served 500+ monthly users",
                "Reduced page load time by 40%",
            ],
        },
    ],
    skills: [
        {
            category: "Languages",
            items: ["Python", "JavaScript", "C++", "SQL"],
        },
        {
            category: "Machine Learning",
            items: ["PyTorch", "Scikit-learn", "Deep Learning", "Reinforcement Learning", "Computer Vision"],
        },
        {
            category: "Backend / APIs",
            items: ["Node.js", "Express", "Flask", "REST APIs"],
        },
        {
            category: "Cloud & DevOps",
            items: ["AWS (EC2, S3)", "Azure Web Apps", "Docker"],
        },
        {
            category: "Tools",
            items: ["Git", "OpenCV", "NumPy", "Pandas", "Matplotlib", "Jupyter"],
        },
    ],
    education: {
        degree: "Integrated Masters in Computer Science and Engineering",
        university: "University of Hyderabad",
        period: "2023–2028",
    },
    achievements: [
        {
            title: "Technovista 2025 — Campus Chaos Grid",
            description: "Built ML model for power grid event classification.",
        },
        {
            title: "Smart Classroom Hackathon 2024",
            description: "Built automated attendance + safety monitoring system.",
        },
        {
            title: "Shaastra 2026 Workshops (IIT Madras)",
            description: "YOLO Deep Learning, AI & ML, and Ethical Web Hacking.",
        },
    ],
};
