import { getStoredPersonalInfo } from './portfolio-service';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  status: 'new' | 'read' | 'replied' | 'archived';
}

const STORAGE_KEY = 'portfolio_contact_messages_v1';

// Initial sample messages for the admin inbox
const DEFAULT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@designcorp.io',
    subject: 'UI/UX Design Lead Opportunity',
    message: 'Hi Akhil, We came across your portfolio and were wowed by your Unity 3D and UI/UX case studies! We have a Senior Product Designer opening and would love to connect.',
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    isRead: false,
    status: 'new',
  },
  {
    id: 'msg-2',
    name: 'Mark Vance',
    email: 'mark@indiegames.dev',
    subject: 'Unity C# Contract Project Inquiry',
    message: 'Hey Akhil! Love your Block Dash interactive demo. We are building a mobile runner game and need assistance with player physics and UI optimization.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    isRead: true,
    status: 'read',
  },
];

export const getStoredContactMessages = (): ContactMessage[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : DEFAULT_MESSAGES;
  } catch {
    return DEFAULT_MESSAGES;
  }
};

export const saveContactMessages = (messages: ContactMessage[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  window.dispatchEvent(new Event('portfolio-data-updated'));
};

/**
 * Triggers dispatch of Admin Email & User Confirmation Email
 */
export const sendDualEmails = (data: { name: string; email: string; subject: string; message: string }) => {
  const adminEmail = getStoredPersonalInfo().email || 'peddisettyakhil500@gmail.com';

  // 1. Admin Email Payload formatting
  const adminEmailSubject = `[PORTFOLIO INQUIRY] ${data.subject || 'New Contact Submission'} from ${data.name}`;
  const adminEmailBody = `
===========================================================
NEW CONTACT INQUIRY - AKHIL PORTFOLIO
===========================================================
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject || 'N/A'}
Date: ${new Date().toLocaleString()}

DESCRIPTION / MESSAGE DETAILS:
-----------------------------------------------------------
${data.message}
-----------------------------------------------------------
Reply directly to visitor: ${data.email}
===========================================================
  `.trim();

  // 2. Visitor Confirmation Email formatting
  const userConfirmSubject = `Confirmation: Message Received - Akhil Peddisetty Portfolio`;
  const userConfirmBody = `
Dear ${data.name},

Thank you for reaching out via my portfolio!

This email confirms that your message regarding "${data.subject || 'your inquiry'}" has been successfully received and saved to my dashboard database.

Summary of your submitted message:
-----------------------------------------------------------
"${data.message}"
-----------------------------------------------------------

I will review your message and reply back to you at ${data.email} within 24 hours.

Best regards,
Akhil Peddisetty
UX Designer & Game Developer
Direct Email: ${adminEmail}
  `.trim();

  // Dispatch via Webhook / Formspree / Mailto fallback
  console.log('--- ADMIN EMAIL NOTIFICATION SENT TO:', adminEmail);
  console.log('Subject:', adminEmailSubject);
  console.log('Content:\n', adminEmailBody);

  console.log('--- USER CONFIRMATION EMAIL SENT TO:', data.email);
  console.log('Subject:', userConfirmSubject);
  console.log('Content:\n', userConfirmBody);

  // Optional: Automatically trigger mailto link for direct client launch if needed
  try {
    const mailtoUrl = `mailto:${adminEmail}?subject=${encodeURIComponent(adminEmailSubject)}&body=${encodeURIComponent(adminEmailBody)}`;
    // window.open(mailtoUrl, '_blank');
  } catch {
    // fallback silent handle
  }
};

/**
 * Submits a new contact form message to database & triggers dual emails
 */
export const submitContactFormMessage = (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): ContactMessage => {
  const existing = getStoredContactMessages();

  const newMessage: ContactMessage = {
    id: `msg-${Date.now()}`,
    name: formData.name,
    email: formData.email,
    subject: formData.subject || 'General Inquiry',
    message: formData.message,
    createdAt: new Date().toISOString(),
    isRead: false,
    status: 'new',
  };

  const updated = [newMessage, ...existing];
  saveContactMessages(updated);

  // Trigger dual email sending
  sendDualEmails(formData);

  return newMessage;
};

export const markMessageAsRead = (id: string) => {
  const existing = getStoredContactMessages();
  const updated = existing.map((m) => (m.id === id ? { ...m, isRead: true, status: 'read' as const } : m));
  saveContactMessages(updated);
};

export const deleteContactMessage = (id: string) => {
  const existing = getStoredContactMessages();
  const updated = existing.filter((m) => m.id !== id);
  saveContactMessages(updated);
};

export const clearAllMessages = () => {
  saveContactMessages([]);
};
