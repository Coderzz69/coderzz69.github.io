import React from 'react';

export interface Project {
  title: string;
  tech: string[];
  description: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  contributions: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Achievement {
  title: string;
  description: string;
}

export interface ResumeData {
  personal: {
    name: string;
    role: string;
    education: string;
    university: string;
    location: string;
    contact: {
      email: string;
      phone: string;
      github: string;
      linkedin: string;
      leetcode: string;
    };
  };
  about: string;
  projects: Project[];
  experience: Experience[];
  skills: SkillGroup[];
  education: {
    degree: string;
    university: string;
    period: string;
  };
  achievements: Achievement[];
}

export interface CommandHistory {
  command: string;
  output: React.ReactNode;
}
