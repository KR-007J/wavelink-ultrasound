import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME } from '../../lib/theme';
import { TransducerIcon, ArrowRightIcon } from '../telemetry/CustomAcousticIcons';
import { TactileButton } from './TactileButton';

interface DevKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DevKitModal: React.FC<DevKitModalProps> = ({ isOpen, onClose }) => {
  const [formFactor, setFormFactor] = useState<'module' | 'qfn'>('module');
  const [targetSdk, setTargetSdk] = useState<'c' | 'rust' | 'python' | 'wasm'>('rust');
  const [email, setEmail] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const evalKey = `WL-EVAL-${formFactor.toUpperCase()}-${targetSdk.toUpperCase()}-9F41-2026`;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(evalKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.92, y: 20, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl w-full telemetry-glass p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Top Glow Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent" />

          {/* Modal Header */}
          <div className="flex justify-between items-start border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: 'rgba(255, 107, 53, 0.08)',
                  borderColor: 'rgba(255, 107, 53, 0.25)',
                }}
              >
                <TransducerIcon size={22} color={THEME.accent} />
              </div>
              <div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                  Request WAVELINK Dev Kit v2
                </h3>
                <span className="font-mono text-xs text-[#FF6B35]">
                  Hardware Evaluation & SDK License Package
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center justify-center cursor-pointer transition-colors"
            >
              ✕
            </button>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* 1. Form Factor Selector */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-slate-300">1. CHOOSE HARDWARE FORM FACTOR:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setFormFactor('module')}
                    className={`p-3.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      formFactor === 'module'
                        ? 'bg-[#FF6B35]/15 border-[#FF6B35] text-white shadow-[0_0_15px_rgba(255,107,53,0.3)]'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <strong className="text-white">IP68 Monolithic Module (2x)</strong>
                    <span className="text-[11px] text-slate-400">Pre-calibrated titanium chassis with SMA & USB-C bridge</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormFactor('qfn')}
                    className={`p-3.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      formFactor === 'qfn'
                        ? 'bg-[#FF6B35]/15 border-[#FF6B35] text-white shadow-[0_0_15px_rgba(255,107,53,0.3)]'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <strong className="text-white">QFN-32 ASIC IC Samples (5x)</strong>
                    <span className="text-[11px] text-slate-400">Surface-mount chips for custom PCB integration</span>
                  </button>
                </div>
              </div>

              {/* 2. Target Firmware Selector */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-slate-300">2. SELECT PRIMARY SDK TARGET:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                  {[
                    { id: 'c', label: 'Embedded C' },
                    { id: 'rust', label: 'Rust (no_std)' },
                    { id: 'python', label: 'Python Linux' },
                    { id: 'wasm', label: 'WebAssembly' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTargetSdk(item.id as any)}
                      className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        targetSdk === item.id
                          ? 'bg-[#FF6B35]/20 border-[#FF6B35] text-[#FF6B35] font-bold'
                          : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Generated Evaluation Key with Copy */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between font-mono text-xs">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500">GENERATED EVALUATION LICENSE KEY:</span>
                  <span className="text-[#FF6B35] font-bold tracking-wider">{evalKey}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] cursor-pointer transition-colors"
                >
                  {copiedKey ? 'COPIED ✓' : 'COPY KEY'}
                </button>
              </div>

              {/* 4. Enterprise Email Input & Submit */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-slate-300">
                  3. ENTERPRISE WORK EMAIL (FOR SHIPPING & NDA CONFIRMATION):
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engineer@company.com"
                    className="flex-1 px-4 py-3 rounded-xl bg-black/50 border border-white/15 font-mono text-xs sm:text-sm text-white focus:outline-none focus:border-[#FF6B35] transition-colors"
                  />

                  <TactileButton type="submit" variant="primary" icon={<ArrowRightIcon size={14} color="#0E0E12" />}>
                    SUBMIT REQUEST
                  </TactileButton>
                </div>
              </div>

              {/* Estimated Lead Time Footer */}
              <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 pt-2 border-t border-white/10">
                <span>ESTIMATED DISPATCH: <strong className="text-white">WITHIN 48 HOURS</strong></span>
                <span className="text-[#10B981] font-bold">IN STOCK · GLOBAL AIR SHIPPING</span>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center gap-4 py-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center text-[#10B981] text-2xl font-bold">
                ✓
              </div>
              <h4 className="font-display font-bold text-2xl text-white">
                Dev Kit Request Dispatched
              </h4>
              <p className="text-sm text-slate-300 max-w-md">
                Confirmation sent to <strong className="text-white">{email}</strong>. Our hardware logistics team will dispatch your Dev Kit v2 package within 48 hours.
              </p>
              <TactileButton onClick={onClose} variant="glass">
                RETURN TO PLATFORM
              </TactileButton>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DevKitModal;
