// Web Audio API Synthesized Harmonic Carrier Tone (Sub-harmonic audible tone matching 18–24 kHz carrier)

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private gain: GainNode | null = null;
  private isMuted: boolean = true;

  public init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      this.osc = this.ctx.createOscillator();
      this.gain = this.ctx.createGain();

      this.osc.type = 'sine';
      // Sub-harmonic tone (e.g. 20.4 kHz / 40 = 510 Hz soft hum)
      this.osc.frequency.setValueAtTime(510, this.ctx.currentTime);

      this.gain.gain.setValueAtTime(0, this.ctx.currentTime);

      this.osc.connect(this.gain);
      this.gain.connect(this.ctx.destination);
      this.osc.start();
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  public toggleMute(): boolean {
    if (!this.ctx) this.init();
    if (!this.ctx || !this.gain) return true;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      this.gain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
    } else {
      this.gain.gain.setTargetAtTime(0.045, this.ctx.currentTime, 0.1);
    }

    return this.isMuted;
  }

  public setFrequency(freqKHz: number) {
    if (!this.ctx || !this.osc) return;
    // Map 18–24 kHz down to 450–600 Hz harmonic
    const subHarmonic = (freqKHz / 20.4) * 510;
    this.osc.frequency.setTargetAtTime(subHarmonic, this.ctx.currentTime, 0.08);
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const audioSynth = new AudioSynthesizer();
