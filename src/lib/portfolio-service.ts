import { useState, useEffect } from 'react';
import {
  PERSONAL_INFO as DEFAULT_PERSONAL_INFO,
  PROJECTS as DEFAULT_PROJECTS,
  CAPABILITY_MATRIX as DEFAULT_CAPABILITY_MATRIX,
  EDUCATION_DATA as DEFAULT_EDUCATION_DATA,
  CERTIFICATIONS_DATA as DEFAULT_CERTIFICATIONS_DATA,
  type Project,
  type CapabilityColumn,
  type EducationItem,
  type CertificationItem,
} from './portfolio-data';

const STORAGE_KEYS = {
  PERSONAL_INFO: 'portfolio_personal_info_v1',
  PROJECTS: 'portfolio_projects_v1',
  SKILLS: 'portfolio_skills_v1',
  EDUCATION: 'portfolio_education_v1',
  CERTIFICATIONS: 'portfolio_certifications_v1',
};

// Data Getters
export const getStoredPersonalInfo = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PERSONAL_INFO);
    return data ? JSON.parse(data) : DEFAULT_PERSONAL_INFO;
  } catch {
    return DEFAULT_PERSONAL_INFO;
  }
};

export const getStoredProjects = (): Project[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return data ? JSON.parse(data) : DEFAULT_PROJECTS;
  } catch {
    return DEFAULT_PROJECTS;
  }
};

export const getStoredCapabilityMatrix = (): CapabilityColumn[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SKILLS);
    return data ? JSON.parse(data) : DEFAULT_CAPABILITY_MATRIX;
  } catch {
    return DEFAULT_CAPABILITY_MATRIX;
  }
};

export const getStoredEducation = (): EducationItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.EDUCATION);
    return data ? JSON.parse(data) : DEFAULT_EDUCATION_DATA;
  } catch {
    return DEFAULT_EDUCATION_DATA;
  }
};

export const getStoredCertifications = (): CertificationItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CERTIFICATIONS);
    return data ? JSON.parse(data) : DEFAULT_CERTIFICATIONS_DATA;
  } catch {
    return DEFAULT_CERTIFICATIONS_DATA;
  }
};

// Data Setters
const notifyDataChanged = () => {
  window.dispatchEvent(new Event('portfolio-data-updated'));
};

export const savePersonalInfo = (info: typeof DEFAULT_PERSONAL_INFO) => {
  localStorage.setItem(STORAGE_KEYS.PERSONAL_INFO, JSON.stringify(info));
  notifyDataChanged();
};

export const saveProjects = (projects: Project[]) => {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  notifyDataChanged();
};

export const saveCapabilityMatrix = (skills: CapabilityColumn[]) => {
  localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  notifyDataChanged();
};

export const saveEducation = (education: EducationItem[]) => {
  localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(education));
  notifyDataChanged();
};

export const resetAllToDefaults = () => {
  localStorage.removeItem(STORAGE_KEYS.PERSONAL_INFO);
  localStorage.removeItem(STORAGE_KEYS.PROJECTS);
  localStorage.removeItem(STORAGE_KEYS.SKILLS);
  localStorage.removeItem(STORAGE_KEYS.EDUCATION);
  localStorage.removeItem(STORAGE_KEYS.CERTIFICATIONS);
  notifyDataChanged();
};

// Custom React Hook for live reactivity
export const usePortfolioData = () => {
  const [personalInfo, setPersonalInfoState] = useState(getStoredPersonalInfo);
  const [projects, setProjectsState] = useState(getStoredProjects);
  const [skills, setSkillsState] = useState(getStoredCapabilityMatrix);
  const [education, setEducationState] = useState(getStoredEducation);
  const [certifications, setCertificationsState] = useState(getStoredCertifications);

  useEffect(() => {
    const handleUpdate = () => {
      setPersonalInfoState(getStoredPersonalInfo());
      setProjectsState(getStoredProjects());
      setSkillsState(getStoredCapabilityMatrix());
      setEducationState(getStoredEducation());
      setCertificationsState(getStoredCertifications());
    };

    window.addEventListener('portfolio-data-updated', handleUpdate);
    return () => window.removeEventListener('portfolio-data-updated', handleUpdate);
  }, []);

  return {
    personalInfo,
    projects,
    skills,
    education,
    certifications,
    savePersonalInfo,
    saveProjects,
    saveCapabilityMatrix,
    saveEducation,
    resetAllToDefaults,
  };
};
