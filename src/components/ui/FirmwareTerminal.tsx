import React, { useState, useRef, useEffect } from 'react';
import { soundEngine } from '../../lib/soundEngine';
import { useWavelinkStore } from '../../store/useWavelinkStore';

interface LogEntry {
  type: 'cmd' | 'resp' | 'err' | 'success';
  text: string;
}

export const FirmwareTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: 'resp', text: 'WAVELINK ACOUSTIC TRANSCEIVER FIRMWARE v2.4.1' },
    { type: 'resp', text: 'PHY: Near-Ultrasonic 18.0–24.0 kHz | DSP: Dual-Core RV32IMC' },
    { type: 'resp', text: 'Type "help" or "wavelink --status" to inspect transceiver.' },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);
  const setCarrierFreq = useWavelinkStore((s) => s.setCarrierFreq);
  const startSimulation = useWavelinkStore((s) => s.startSimulation);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    soundEngine.playClick();
    const newLogs: LogEntry[] = [...logs, { type: 'cmd', text: `$ ${trimmed}` }];
    const lower = trimmed.toLowerCase();

    if (lower === 'help') {
      newLogs.push(
        { type: 'resp', text: 'AVAILABLE WAVELINK HARDWARE COMMANDS:' },
        { type: 'resp', text: '  wavelink --status            Inspect live ASIC core & register state' },
        { type: 'resp', text: '  wavelink --ping              Run acoustic air-gap roundtrip latency test' },
        { type: 'resp', text: '  wavelink --set-freq <18-24>  Tune piezoelectric carrier center frequency' },
        { type: 'resp', text: '  wavelink --tx <payload>      Transmit acoustic data packet across air-gap' },
        { type: 'resp', text: '  wavelink --read-registers    Dump memory mapped register hex values' },
        { type: 'resp', text: '  clear                        Clear terminal screen' }
      );
    } else if (lower === 'clear') {
      setLogs([]);
      setInputVal('');
      return;
    } else if (lower === 'wavelink --status') {
      newLogs.push(
        { type: 'resp', text: `[ASIC CORE] RV32IMC @ 120 MHz | State: ACTIVE_LOCK` },
        { type: 'resp', text: `[CARRIER]   ${carrierFreq.toFixed(1)} kHz | Bandwidth: 3.2 kHz | Modulation: 2-FSK` },
        { type: 'resp', text: `[LINK SNR]  +32.4 dB | Bit Error Probability: < 10⁻¹¹` },
        { type: 'success', text: `[DIAGNOSTIC] All hardware self-tests passed (100% OK)` }
      );
    } else if (lower === 'wavelink --ping') {
      newLogs.push(
        { type: 'resp', text: 'Emitting 20.4 kHz acoustic sync chirp...' },
        { type: 'resp', text: 'Receiver node detected echo in 14.2 ms' },
        { type: 'success', text: 'Air-gap acoustic ping: 14.2 ms (0% packet drop)' }
      );
      soundEngine.playPiezoChirp(carrierFreq);
    } else if (lower.startsWith('wavelink --set-freq')) {
      const parts = trimmed.split(' ');
      const freq = parseFloat(parts[2]);
      if (isNaN(freq) || freq < 18.0 || freq > 24.0) {
        newLogs.push({ type: 'err', text: 'ERROR: Frequency out of range. Must be between 18.0 and 24.0 kHz.' });
      } else {
        setCarrierFreq(freq);
        soundEngine.playPiezoChirp(freq);
        newLogs.push({ type: 'success', text: `Piezo tuning word updated: Carrier set to ${freq.toFixed(1)} kHz` });
      }
    } else if (lower.startsWith('wavelink --tx')) {
      const payload = trimmed.substring(13).replace(/["']/g, '').trim() || 'CLI_PAYLOAD_0x9F';
      startSimulation(payload);
      soundEngine.playPacketBurst();
      newLogs.push(
        { type: 'resp', text: `Modulating 2-FSK frame for payload: "${payload}"` },
        { type: 'resp', text: `Dispatched 64-byte frame across air-gap with CRC-32 checksum` },
        { type: 'success', text: `Transmission complete · 0 errors acknowledged` }
      );
    } else if (lower === 'wavelink --read-registers') {
      newLogs.push(
        { type: 'resp', text: '0x0000 [WL_CTRL_REG] : 0x00000001 (CORE_EN | CRC_EN)' },
        { type: 'resp', text: `0x0004 [WL_FREQ_KHZ]  : 0x${Math.round(carrierFreq * 10).toString(16).toUpperCase()} (${carrierFreq} kHz)` },
        { type: 'resp', text: '0x0008 [WL_TX_DATA]   : 0x48454C4C (FIFO_IDLE)' },
        { type: 'resp', text: '0x000C [WL_RX_STATUS] : 0x00000020 (SNR_LOCKED | 32dB)' }
      );
    } else {
      newLogs.push({ type: 'err', text: `Command not recognized: "${trimmed}". Type "help" for available commands.` });
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <div className="flex flex-col rounded-2xl bg-black/85 border border-white/15 overflow-hidden font-mono text-xs shadow-2xl">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/60" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <span className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="text-[11px] text-slate-400 ml-2">wavelink_cli_terminal — /dev/ttyAcoustic0</span>
        </div>
        <span className="text-[10px] text-[#FF6B35] font-bold">120 MHz RISC-V DSP</span>
      </div>

      {/* Terminal Output Log Area */}
      <div className="p-4 sm:p-5 flex flex-col gap-1.5 max-h-64 overflow-y-auto leading-relaxed">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className={`${
              log.type === 'cmd'
                ? 'text-white font-bold'
                : log.type === 'err'
                ? 'text-red-400'
                : log.type === 'success'
                ? 'text-[#10B981] font-bold'
                : 'text-slate-300'
            }`}
          >
            {log.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick Action Chips Bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border-t border-white/10 overflow-x-auto text-[10px]">
        <span className="text-slate-500 shrink-0">PRESETS:</span>
        <button
          type="button"
          onClick={() => executeCommand('wavelink --status')}
          className="px-2 py-1 rounded bg-white/5 hover:bg-[#FF6B35]/20 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer shrink-0"
        >
          --status
        </button>
        <button
          type="button"
          onClick={() => executeCommand('wavelink --ping')}
          className="px-2 py-1 rounded bg-white/5 hover:bg-[#FF6B35]/20 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer shrink-0"
        >
          --ping
        </button>
        <button
          type="button"
          onClick={() => executeCommand('wavelink --tx "ALPHA_PACKET_0x99"')}
          className="px-2 py-1 rounded bg-white/5 hover:bg-[#FF6B35]/20 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer shrink-0"
        >
          --tx "ALPHA"
        </button>
        <button
          type="button"
          onClick={() => executeCommand('wavelink --read-registers')}
          className="px-2 py-1 rounded bg-white/5 hover:bg-[#FF6B35]/20 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer shrink-0"
        >
          --read-registers
        </button>
      </div>

      {/* Terminal Input Line */}
      <form onSubmit={handleCommand} className="flex items-center px-4 py-3 bg-black/60 border-t border-white/10">
        <span className="text-[#FF6B35] font-bold mr-2 select-none">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type command (e.g. wavelink --status)..."
          className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-slate-500"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-white/10 hover:bg-[#FF6B35]/20 hover:text-[#FF6B35] text-slate-300 rounded text-[11px] font-mono transition-colors cursor-pointer ml-2"
        >
          EXECUTE
        </button>
      </form>
    </div>
  );
};

export default FirmwareTerminal;
