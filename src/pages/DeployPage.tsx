import React, { useState } from 'react';
import { THEME } from '../lib/theme';
import { TelemetryPanel } from '../components/telemetry/TelemetryPanel';
import { TransducerIcon, ArrowRightIcon } from '../components/telemetry/CustomAcousticIcons';
import { TactileButton } from '../components/ui/TactileButton';
import { FirmwareTerminal } from '../components/ui/FirmwareTerminal';
import { ComplianceHub } from '../components/telemetry/ComplianceHub';

interface DeployPageProps {
  onOpenDevKitModal: () => void;
}

export const DeployPage: React.FC<DeployPageProps> = ({ onOpenDevKitModal }) => {
  const [activeLang, setActiveLang] = useState<'c' | 'rust' | 'python' | 'wasm'>('c');

  const codeSnippets = {
    c: `// WAVELINK Embedded C Transceiver Init
#include "wavelink.h"

int main(void) {
    wavelink_config_t config = {
        .carrier_freq_khz = 20.4f,
        .modulation_mode  = WAVELINK_MOD_2FSK,
        .baud_rate        = 16400,
        .tx_power_dbm     = 88,
        .enable_crc32     = true
    };

    wavelink_handle_t wl = wavelink_init(&config);
    
    // Broadcast 48-byte payload across air gap
    uint8_t payload[48] = { 0x4A, 0x6F, 0x68, 0x6E, 0x20, 0x44, 0x6F, 0x65 };
    wavelink_status_t status = wavelink_transmit_frame(wl, payload, sizeof(payload));

    if (status == WAVELINK_OK) {
        printf("Acoustic packet dispatched successfully\\n");
    }
    return 0;
}`,
    rust: `// WAVELINK Rust Embedded HAL Driver
use wavelink_embedded::{WavelinkTransceiver, Config, Modulation};

fn main() -> Result<(), wavelink_embedded::Error> {
    let config = Config {
        carrier_freq_khz: 20.4,
        modulation: Modulation::ContinuousPhase2FSK,
        bit_rate: 16_400,
        enable_crc32: true,
    };

    let mut transceiver = WavelinkTransceiver::new(config)?;
    
    let payload = b"WAVELINK_AIRGAP_CRYPTOGRAPHIC_TELEMETRY_PAYLOAD";
    transceiver.broadcast_frame(payload)?;

    println!("Acoustic frame emitted on 20.4 kHz carrier");
    Ok(())
}`,
    python: `# WAVELINK Python High-Level DSP Bridge
from wavelink import AcousticTransceiver, Modulation

transceiver = AcousticTransceiver(
    carrier_freq_khz=20.4,
    modulation=Modulation.M_FSK,
    sample_rate_hz=48000
)

# Transmit air-gapped packet
frame_id = transceiver.send_packet(
    data=b"SECURE_DIODE_DIAGNOSTIC_DATA_STREAM",
    verify_checksum=True
)

print(f"Dispatched acoustic frame: {frame_id}")`,
    wasm: `// WAVELINK WebAssembly Browser Bridge
import { WavelinkAudioEngine } from '@wavelink/wasm-bridge';

const engine = new WavelinkAudioEngine({
  carrierFreq: 20.4,
  fftSize: 1024,
  onPacketReceived: (packet) => {
    console.log('Decoded acoustic payload:', packet.data);
    console.log('SNR:', packet.snr, 'dB | Latency:', packet.latencyMs, 'ms');
  }
});

await engine.startAcousticDemodulator();`,
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto w-full z-10">
      
      {/* Page Header */}
      <div className="flex flex-col gap-6 mb-16">
        <div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border w-fit"
          style={{
            backgroundColor: 'rgba(255, 107, 53, 0.08)',
            borderColor: 'rgba(255, 107, 53, 0.25)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#FF6B35] font-bold">
            DEVELOPER SDK & FIRMWARE
          </span>
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
          Integrate in Minutes. <br />
          <span style={{ color: THEME.accent }}>Deploy with Certainty.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
          Comprehensive C, Rust, Python, and WebAssembly drivers for microcontrollers, embedded Linux gateways, and mobile browsers.
        </p>
      </div>

      {/* Code Editor Panel */}
      <TelemetryPanel className="p-0 overflow-hidden mb-16 flex flex-col">
        <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-4 bg-black/40">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500/40" />
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500/40" />
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-500/40" />
            <span className="font-mono text-[11px] sm:text-xs text-slate-400 ml-1 sm:ml-3">wavelink_quickstart</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs">
            {(['c', 'rust', 'python', 'wasm'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg uppercase tracking-wider transition-all cursor-pointer text-[10px] sm:text-xs ${
                  activeLang === lang
                    ? 'bg-[#FF6B35]/20 text-[#FF6B35] font-bold border border-[#FF6B35]/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <pre className="p-4 sm:p-8 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed bg-black/60">
          <code>{codeSnippets[activeLang]}</code>
        </pre>
      </TelemetryPanel>

      {/* Interactive Hardware Firmware CLI Terminal */}
      <div className="flex flex-col gap-4 mb-16">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
            Interactive Hardware CLI REPL
          </h3>
          <span className="font-mono text-xs text-[#FF6B35]">LIVE HARDWARE SERIAL EMULATION</span>
        </div>
        <FirmwareTerminal />
      </div>

      {/* Hardware Register Map */}
      <div className="flex flex-col gap-6 mb-16">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
          Hardware Register Address Map
        </h3>

        <TelemetryPanel className="p-4 sm:p-6 overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-3 px-3 sm:px-4">OFFSET</th>
                <th className="py-3 px-3 sm:px-4">REGISTER NAME</th>
                <th className="py-3 px-3 sm:px-4">R/W</th>
                <th className="py-3 px-3 sm:px-4">RESET</th>
                <th className="py-3 px-3 sm:px-4">DESCRIPTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-3 px-3 sm:px-4 text-[#FF6B35]">0x0000</td>
                <td className="py-3 px-3 sm:px-4 font-bold text-white">WL_CTRL_REG</td>
                <td className="py-3 px-3 sm:px-4">R/W</td>
                <td className="py-3 px-3 sm:px-4">0x00000001</td>
                <td className="py-3 px-3 sm:px-4">Core enable, modulation select, CRC enable</td>
              </tr>
              <tr>
                <td className="py-3 px-3 sm:px-4 text-[#FF6B35]">0x0004</td>
                <td className="py-3 px-3 sm:px-4 font-bold text-white">WL_FREQ_KHZ</td>
                <td className="py-3 px-3 sm:px-4">R/W</td>
                <td className="py-3 px-3 sm:px-4">0x00000148</td>
                <td className="py-3 px-3 sm:px-4">Carrier frequency tuning word (18.0–24.0 kHz)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 sm:px-4 text-[#FF6B35]">0x0008</td>
                <td className="py-3 px-3 sm:px-4 font-bold text-white">WL_TX_DATA</td>
                <td className="py-3 px-3 sm:px-4">W</td>
                <td className="py-3 px-3 sm:px-4">0x00000000</td>
                <td className="py-3 px-3 sm:px-4">Transmit FIFO write buffer (64 bytes depth)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 sm:px-4 text-[#FF6B35]">0x000C</td>
                <td className="py-3 px-3 sm:px-4 font-bold text-white">WL_RX_STATUS</td>
                <td className="py-3 px-3 sm:px-4">R</td>
                <td className="py-3 px-3 sm:px-4">0x00000000</td>
                <td className="py-3 px-3 sm:px-4">SNR metrics, CRC validation flags, latency gauge</td>
              </tr>
            </tbody>
          </table>
        </TelemetryPanel>
      </div>

      {/* Enterprise Security Compliance & Certifications Hub */}
      <ComplianceHub />

      {/* Connected Dev Kit Request Module */}
      <div className="p-6 sm:p-8 rounded-2xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border shrink-0"
            style={{
              backgroundColor: 'rgba(255, 107, 53, 0.08)',
              borderColor: 'rgba(255, 107, 53, 0.25)',
            }}
          >
            <TransducerIcon size={24} color={THEME.accent} />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-display font-bold text-lg">WAVELINK Dev Kit v2</span>
            <span className="text-xs text-slate-400 font-mono">Includes 2x Transceiver Core Modules + C/Rust SDK License</span>
          </div>
        </div>

        <TactileButton
          onClick={onOpenDevKitModal}
          variant="primary"
          icon={<ArrowRightIcon size={14} color="#0E0E12" />}
        >
          REQUEST DEV KIT
        </TactileButton>
      </div>

    </div>
  );
};

export default DeployPage;
