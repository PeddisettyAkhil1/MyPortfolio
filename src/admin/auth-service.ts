import { getStoredPersonalInfo } from '../lib/portfolio-service';

// Admin Authentication & Passcode Management Service

const STORAGE_KEYS = {
  PASSCODE: 'admin_passcode_v1',
  SESSION: 'admin_session_auth_v1',
};

const DEFAULT_PASSCODE = 'admin123';

/**
 * Returns the currently set admin passcode (defaults to 'admin123')
 */
export const getAdminPasscode = (): string => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PASSCODE);
    return saved ? saved : DEFAULT_PASSCODE;
  } catch {
    return DEFAULT_PASSCODE;
  }
};

/**
 * Checks if the active session is authenticated
 */
export const isAdminAuthenticated = (): boolean => {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.SESSION) === 'true';
  } catch {
    return false;
  }
};

/**
 * Verifies entered passcode and sets session state if valid
 */
export const verifyAndLoginAdmin = (inputPasscode: string): boolean => {
  const currentPass = getAdminPasscode();
  if (inputPasscode === currentPass) {
    sessionStorage.setItem(STORAGE_KEYS.SESSION, 'true');
    window.dispatchEvent(new Event('admin-auth-changed'));
    return true;
  }
  return false;
};

/**
 * Logs out / locks the admin portal
 */
export const lockAdminPortal = (): void => {
  sessionStorage.removeItem(STORAGE_KEYS.SESSION);
  window.dispatchEvent(new Event('admin-auth-changed'));
};

/**
 * Updates the admin passcode
 */
export const changeAdminPasscode = (oldPass: string, newPass: string): { success: boolean; message: string } => {
  const currentPass = getAdminPasscode();
  if (oldPass !== currentPass) {
    return { success: false, message: 'Current password does not match!' };
  }
  if (!newPass || newPass.length < 4) {
    return { success: false, message: 'New password must be at least 4 characters long.' };
  }
  localStorage.setItem(STORAGE_KEYS.PASSCODE, newPass);
  return { success: true, message: 'Password updated successfully!' };
};

/**
 * Returns registered owner email address
 */
export const getOwnerEmail = (): string => {
  try {
    const info = getStoredPersonalInfo();
    return info.email || 'peddisettyakhil500@gmail.com';
  } catch {
    return 'peddisettyakhil500@gmail.com';
  }
};

/**
 * Resets passcode if the entered email matches the registered owner email
 */
export const resetAdminPasscodeWithEmail = (emailInput: string, newPasscode: string): { success: boolean; message: string } => {
  const ownerEmail = getOwnerEmail();
  if (emailInput.trim().toLowerCase() !== ownerEmail.trim().toLowerCase()) {
    return {
      success: false,
      message: `Access Denied: Entered email does not match registered owner email (${ownerEmail}).`,
    };
  }
  if (!newPasscode || newPasscode.length < 4) {
    return {
      success: false,
      message: 'New password must be at least 4 characters long.',
    };
  }

  localStorage.setItem(STORAGE_KEYS.PASSCODE, newPasscode);
  sessionStorage.setItem(STORAGE_KEYS.SESSION, 'true');
  window.dispatchEvent(new Event('admin-auth-changed'));
  return {
    success: true,
    message: 'Passcode reset successfully! You are now logged in.',
  };
};
