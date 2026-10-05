export interface Project {
  id: string;
  title: string;
  displayTitle?: string;
  subCategory?: string;
  badgeTopLeft?: string;
  badgeTopRight?: string;
  tagline: string;
  category: 'UI/UX' | 'Game Dev' | 'Vibe Coding';
  description: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  impact: string;
  coverImage: string;
  gallery: string[];
  tags: string[];
  metrics: { label: string; value: string }[];
  deliverables: string[];
  interactiveDemoType?: 'block-dash' | 'link';
  demoUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: { name: string; level: number; highlight?: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description: string;
  highlights: string[];
  gpa?: string;
  location?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export const PERSONAL_INFO = {
  name: 'Peddisetty Akhil',
  role: 'UX Designer & Game Developer',
  tagline:
    'Creative and user-centered UX Designer and Game Developer passionate about crafting intuitive, engaging digital experiences and interactive game mechanics.',
  aboutShort:
    'Skilled in wireframing, high-fidelity prototyping, and component-based UI design with a strong foundation in design thinking and interactive systems.',
  bio: `Creative and user-centered UX Designer and Game Developer passionate about crafting intuitive, engaging digital experiences and interactive game mechanics. Skilled in wireframing, high-fidelity prototyping, and component-based UI design, with a strong foundation in design thinking and interactive systems. Proficient in Unity, Figma, Adobe Photoshop, and Java with a keen eye for clean aesthetics and usability.`,
  location: 'Vijayawada, India',
  email: 'akhilpeddisetty@gmail.com',
  phone: '6305485553',
  social: {
    linkedin: 'https://www.linkedin.com/in/akhil-peddisetty/',
    github: 'https://github.com/PeddisettyAkhil1',
  },
  languages: ['English', 'Telugu'],
  images: {
    logo: '/images/logo.png',
    portrait: '/images/portrait.png',
    delegate: '/images/delegate.jpg',
  },
};

export const PROJECTS: Project[] = [
  {
    id: 'foodie-go',
    title: 'FoodieGo (Food Delivery App)',
    displayTitle: 'FoodieGo — Food Delivery App — UX/UI',
    subCategory: 'UX/UI DESIGN',
    badgeTopLeft: 'UX CASE STUDY',
    tagline: 'End-to-end ordering ecosystem & modular Figma design system',
    category: 'UI/UX',
    description:
      'Designed a seamless end-to-end food ordering and delivery flow in Figma, covering dish discovery, restaurant menus, cart review, and live delivery status.',
    fullDescription:
      'Designed a seamless end-to-end food ordering and delivery flow in Figma, covering dish discovery, restaurant menus, cart review, and live delivery status. Built a modular design system utilizing Figma auto-layout, variants, and reusable components to ensure cross-device consistency and responsive mobile UI.',
    challenge:
      'Ensuring cross-device consistency and responsive mobile UI across complex food ordering workflows.',
    solution:
      'Built a modular design system utilizing Figma auto-layout, variants, and reusable component libraries.',
    impact: 'Delivered an intuitive food ordering prototype covering dish discovery to live delivery tracking.',
    coverImage:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1000',
    ],
    tags: ['Figma', 'UI/UX Design System'],
    metrics: [
      { label: 'Tool', value: 'Figma' },
      { label: 'UI Flow', value: 'End-to-End' },
      { label: 'Architecture', value: 'Modular Variants' },
    ],
    deliverables: [
      'Dish Discovery & Menu Screens',
      'Cart Review & Order Checkout Flow',
      'Live Delivery Status UI',
      'Figma Auto-Layout & Component System',
    ],
    interactiveDemoType: 'link',
    featured: true,
  },
  {
    id: 'cine-wave',
    title: 'CineWave (Movie & Ticket Booking Platform)',
    displayTitle: 'CineWave — Movie & Ticket Booking — UX/UI',
    subCategory: 'UX/UI DESIGN',
    badgeTopLeft: 'PRODUCT DESIGN',
    tagline: 'Cinema discovery, dynamic seat matrices & micro-interaction checkout',
    category: 'UI/UX',
    description:
      'Designed an interactive booking platform in Figma featuring intuitive movie discovery, seat selection matrices, and a streamlined checkout journey.',
    fullDescription:
      'Designed an interactive booking platform in Figma featuring intuitive movie discovery, seat selection matrices, and a streamlined checkout journey. Focused on friction-free conversion by simplifying seat tier selection and ticket confirmation screens.',
    challenge:
      'Eliminating friction during seat tier selection and ticket confirmation checkout steps.',
    solution:
      'Simplified seat selection matrices and designed visual confirmation screens for seamless user conversion.',
    impact: 'Created a friction-free booking journey with clean visual hierarchy and intuitive seat mapping.',
    coverImage:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1000',
    ],
    tags: ['Figma', 'Wireframing', 'High-Fidelity Prototyping'],
    metrics: [
      { label: 'Tool', value: 'Figma' },
      { label: 'User Flow', value: 'Streamlined Checkout' },
      { label: 'UX Focus', value: 'Friction-Free' },
    ],
    deliverables: [
      'Intuitive Movie Discovery UI',
      'Interactive Seat Selection Matrix',
      'Ticket Confirmation Screens',
      'Streamlined Checkout Prototype',
    ],
    interactiveDemoType: 'link',
    featured: true,
  },
  {
    id: 'block-dash-2d',
    title: 'BlockDash (2D Endless Platformer)',
    displayTitle: 'BlockDash — 2D Endless Platformer — Game Dev',
    subCategory: 'GAME DEVELOPMENT',
    badgeTopLeft: 'GAME DEV & PHYSICS',
    badgeTopRight: 'PLAYABLE DEMO INSIDE',
    tagline: 'Dynamic obstacle spawning, single-touch mechanics & real-time HUD',
    category: 'Game Dev',
    description:
      'Developed a fast-paced 2D runner in Unity with responsive single-touch jumping controls, dynamic obstacle spawning, and progressive difficulty scaling.',
    fullDescription:
      'Developed a fast-paced 2D runner in Unity with responsive single-touch jumping controls, dynamic obstacle spawning, and progressive difficulty scaling. Built a lightweight UI overlay for real-time score tracking, pause/resume states, and local high-score persistence.',
    challenge:
      'Implementing responsive single-touch jump physics alongside dynamic obstacle spawning and progressive difficulty scaling.',
    solution:
      'Engineered C# single-touch jump logic, dynamic hazard spawning algorithms, and local storage state persistence.',
    impact: 'Achieved a fast-paced, highly responsive 2D platformer runner game with local high-score persistence.',
    coverImage:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
    ],
    tags: ['Unity', 'C# / Game Mechanics'],
    metrics: [
      { label: 'Engine', value: 'Unity 2D' },
      { label: 'Controls', value: 'Single-Touch' },
      { label: 'Persistence', value: 'Local High-Score' },
    ],
    deliverables: [
      'Playable 2D Engine Demo',
      'Single-Touch Jump Physics Mechanics',
      'Dynamic Obstacle Spawning Logic',
      'Score Overlay & High-Score System',
    ],
    interactiveDemoType: 'block-dash',
    featured: true,
  },
];

export interface CapabilityColumn {
  title: string;
  proficiency: number;
  iconName: string;
  chips: string[];
}

export const CAPABILITY_MATRIX: CapabilityColumn[] = [
  {
    title: 'Game Dev & Interactive',
    proficiency: 85,
    iconName: 'Gamepad2',
    chips: [
      'Unity Game Development',
      'Game Design Principles',
      'Interactive Systems',
      'Physics & Collision',
      'Procedural Generation',
    ],
  },
  {
    title: 'UX/UI & Prototyping',
    proficiency: 92,
    iconName: 'PenTool',
    chips: [
      'Figma (Auto-Layout, Design Systems, Variants)',
      'Sketch',
      'Canva',
      'Wireframing',
      'User Flows & Research',
    ],
  },
  {
    title: 'Visual Design & Assets',
    proficiency: 80,
    iconName: 'Palette',
    chips: [
      'Adobe Photoshop',
      'Visual Hierarchy',
      'Color Theory',
      'Typography Systems',
      'Micro-Interactions',
    ],
  },
  {
    title: 'Engineering & Other',
    proficiency: 78,
    iconName: 'Code',
    chips: [
      'Java',
      'VibeCoding',
      'Component-Based UI',
      'Database & SQL',
      'Git Version Control',
    ],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Bachelor of Computer Science',
    institution: 'KL University',
    period: '2023 — Present',
    description:
      'Specialization: Game Development & UX Design. Relevant Coursework: Game Design, UI/UX Principles.',
    highlights: [
      'Specialization in Game Development & UX Design',
      'Relevant Coursework: Game Design, UI/UX Principles',
      'Academic Record CGPA: 8.65 / 10.0',
    ],
    gpa: '8.65 / 10.0',
    location: 'Vijayawada, India',
  },
  {
    degree: 'Intermediate MPC',
    institution: 'Narayana Junior College',
    period: '2021 — 2023',
    description:
      'Completed Intermediate curriculum in Mathematics, Physics, and Chemistry.',
    highlights: [
      'Completed Mathematics, Physics, and Chemistry (MPC) Stream',
      'Strong analytical and logical problem-solving foundation',
    ],
    location: 'Vijayawada, Andhra Pradesh',
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    title: 'Salesforce Certification',
    issuer: 'Salesforce',
    year: 'Official Credential',
    credentialUrl: '#',
  },
  {
    title: 'Oracle Certification (Java & Database Management)',
    issuer: 'Oracle Corporation',
    year: 'Official Credential',
    credentialUrl: '#',
  },
  {
    title: 'Linguaskill Certification',
    issuer: 'Cambridge Linguaskill',
    year: 'Official Credential',
    credentialUrl: '#',
  },
  {
    title: 'Unity Certification',
    issuer: 'Unity Technologies',
    year: 'Official Credential',
    credentialUrl: '#',
  },
];

export const STATS = [
  { value: '8.65 / 10', label: 'CGPA @ KL University' },
  { value: '3', label: 'Resume Projects' },
  { value: '4', label: 'Official Certifications' },
  { value: '2', label: 'Languages (English, Telugu)' },
];
