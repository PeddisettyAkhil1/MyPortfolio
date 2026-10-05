import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle, Mail, Send, CheckCircle2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { verifyAndLoginAdmin, getOwnerEmail, resetAdminPasscodeWithEmail } from '../auth-service';

interface AdminLockScreenProps {
  onUnlock: () => void;
}

export const AdminLockScreen: React.FC<AdminLockScreenProps> = ({ onUnlock }) => {
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  // Forgot Password Modal State
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmNewPasscode, setConfirmNewPasscode] = useState('');
  const [resetStep, setResetStep] = useState<1 | 2>(1);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [inputOtp, setInputOtp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg('Please enter your passcode');
      return;
    }

    const success = verifyAndLoginAdmin(passcode);
    if (success) {
      toast.success('Admin authentication successful! Access granted.');
      onUnlock();
    } else {
      setErrorMsg('Incorrect passcode. Access denied.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      toast.error('Invalid passcode! Please try again.');
    }
  };

  const handleSendResetEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const ownerEmail = getOwnerEmail();
    if (resetEmail.trim().toLowerCase() !== ownerEmail.trim().toLowerCase()) {
      toast.error(`Email does not match registered owner email address (${ownerEmail}).`);
      return;
    }

    // Generate a random 6-digit security OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setResetStep(2);

    // Open mailto link to simulate direct email delivery to the admin's inbox
    const mailtoUrl = `mailto:${ownerEmail}?subject=Admin%20Passcode%20Reset%20Security%20Code&body=Hello%20Akhil,%0A%0AYour%20admin%20passcode%20reset%20security%20code%20is:%20${otp}%0A%0AUse%20this%20code%20to%20reset%20your%20admin%20passcode.`;
    window.location.href = mailtoUrl;
    toast.success(`Verification security code sent! Code: ${otp}`);
  };

  const handleConfirmReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputOtp.trim() !== generatedOtp) {
      toast.error('Incorrect security code! Please check the code sent to your email.');
      return;
    }
    if (newPasscode !== confirmNewPasscode) {
      toast.error('New passcode and confirm passcode do not match!');
      return;
    }

    const res = resetAdminPasscodeWithEmail(resetEmail, newPasscode);
    if (res.success) {
      toast.success(res.message);
      setIsForgotOpen(false);
      onUnlock();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#111317] text-white flex items-center justify-center p-4 relative overflow-hidden selection:bg-[#E65F2B] selection:text-white">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E65F2B]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Lock Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={isShaking ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: isShaking ? 0.4 : 0.5, ease: 'easeOut' }}
        className="w-full max-w-md bg-[#1B1E23]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 flex flex-col justify-between"
      >
        <div>
          {/* Header Icon Badge */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#E65F2B] to-amber-500 text-white flex items-center justify-center shadow-lg shadow-[#E65F2B]/30">
                <Lock className="w-8 h-8" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-[#1B1E23]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-extrabold font-heading text-white tracking-tight">
              Protected Admin Portal
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Authentication required. Only authorized administrators can access and edit portfolio content.
            </p>
          </div>

          {/* Error Callout (If any) */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center space-x-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {/* Passcode Entry Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
                  Admin Passcode
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotOpen(true);
                    setResetStep(1);
                  }}
                  className="text-xs text-[#E65F2B] hover:underline font-semibold cursor-pointer"
                >
                  Forgot passcode?
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter security passcode..."
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-black/40 border border-white/15 text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#E65F2B] focus:ring-1 focus:ring-[#E65F2B] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#E65F2B] hover:bg-[#d45220] text-white font-bold text-sm shadow-lg shadow-[#E65F2B]/25 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>
        </div>

        {/* Footer Back Link */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to User Portfolio</span>
          </Link>
        </div>
      </motion.div>

      {/* Forgot Password Reset Modal */}
      <AnimatePresence>
        {isForgotOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsForgotOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-[#1B1E23] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl z-10"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E65F2B]/20 text-[#E65F2B] border border-[#E65F2B]/30 flex items-center justify-center shadow-md">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading">Reset Passcode via Email</h3>
                    <p className="text-xs text-zinc-400">Owner Verification & Recovery</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsForgotOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {resetStep === 1 ? (
                <form onSubmit={handleSendResetEmail} className="space-y-4">
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Enter your registered owner email address below to receive a security recovery verification code.
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Registered Owner Email
                    </label>
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="e.g. peddisettyakhil500@gmail.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-[#E65F2B]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#E65F2B] hover:bg-[#d45220] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Verification Code</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleConfirmReset} className="space-y-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Security code sent to {resetEmail}! (Test Code: <strong>{generatedOtp}</strong>)</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Enter 6-Digit Security Code
                    </label>
                    <input
                      type="text"
                      required
                      value={inputOtp}
                      onChange={(e) => setInputOtp(e.target.value)}
                      placeholder="6-digit OTP code"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm font-mono tracking-widest text-center text-amber-400 focus:outline-none focus:border-[#E65F2B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      New Security Passcode
                    </label>
                    <input
                      type="password"
                      required
                      value={newPasscode}
                      onChange={(e) => setNewPasscode(e.target.value)}
                      placeholder="At least 4 characters..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-[#E65F2B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Confirm New Passcode
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmNewPasscode}
                      onChange={(e) => setConfirmNewPasscode(e.target.value)}
                      placeholder="Re-enter new passcode..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-[#E65F2B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#E65F2B] hover:bg-[#d45220] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Reset Passcode & Unlock</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
