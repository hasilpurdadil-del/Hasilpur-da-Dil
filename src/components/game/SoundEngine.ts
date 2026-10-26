// Web Audio API engine for BUSSID realistic engine, air brakes, and Telolet Basuri horns
export class BussidSoundEngine {
  private ctx: AudioContext | null = null;
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private isRunning: boolean = false;
  private isMuted: boolean = false;
  private hornTimeout: any = null;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      this.ctx = new AudioCtx();
    }
  }

  public resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public startEngine() {
    if (this.isRunning || this.isMuted) return;
    this.resume();
    if (!this.ctx) return;

    try {
      // Dual oscillator diesel idle rumble
      this.engineOsc = this.ctx.createOscillator();
      this.engineGain = this.ctx.createGain();

      this.engineOsc.type = 'sawtooth';
      this.engineOsc.frequency.setValueAtTime(45, this.ctx.currentTime); // 45 Hz low diesel rumble

      // Low pass filter for warm engine body
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.engineGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      this.engineOsc.connect(filter);
      filter.connect(this.engineGain);
      this.engineGain.connect(this.ctx.destination);

      this.engineOsc.start();
      this.isRunning = true;
    } catch {
      // Audio fallback
    }
  }

  public updateEngine(speedKmh: number, isAccelerating: boolean) {
    if (!this.ctx || !this.engineOsc || !this.engineGain || this.isMuted) return;

    try {
      const baseFreq = 42;
      const targetFreq = baseFreq + (speedKmh * 1.8) + (isAccelerating ? 15 : 0);
      const targetGain = 0.04 + (speedKmh / 140) * 0.06 + (isAccelerating ? 0.02 : 0);

      this.engineOsc.frequency.setTargetAtTime(Math.min(targetFreq, 220), this.ctx.currentTime, 0.1);
      this.engineGain.gain.setTargetAtTime(Math.min(targetGain, 0.15), this.ctx.currentTime, 0.1);
    } catch {
      // Ignore
    }
  }

  public stopEngine() {
    if (this.engineOsc) {
      try {
        this.engineOsc.stop();
        this.engineOsc.disconnect();
      } catch {}
      this.engineOsc = null;
    }
    this.isRunning = false;
  }

  // Air brake "psssssht" release sound
  public playAirBrake() {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    try {
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.35);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.38);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {}
  }

  // Iconic Indonesian Basuri Telolet Melody V3 ("Do Re Mi Fa Sol...")
  public playBasuriTelolet() {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    // Notes: C5, D5, E5, F5, G5, A5, G5, F5, E5, D5, C5
    const notes = [
      { freq: 523.25, dur: 0.12 },
      { freq: 587.33, dur: 0.12 },
      { freq: 659.25, dur: 0.14 },
      { freq: 698.46, dur: 0.14 },
      { freq: 783.99, dur: 0.22 },
      { freq: 880.00, dur: 0.16 },
      { freq: 783.99, dur: 0.25 },
      { freq: 659.25, dur: 0.18 },
      { freq: 587.33, dur: 0.18 },
      { freq: 523.25, dur: 0.40 }
    ];

    let startTime = this.ctx.currentTime;
    notes.forEach((note) => {
      this.playNote(note.freq, startTime, note.dur);
      startTime += note.dur + 0.02;
    });
  }

  // Classic Om Telolet Om 3-tone horn
  public playOmTelolet() {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    const notes = [
      { freq: 440, dur: 0.18 },
      { freq: 554.37, dur: 0.18 },
      { freq: 659.25, dur: 0.35 }
    ];

    let startTime = this.ctx.currentTime;
    notes.forEach((note) => {
      this.playNote(note.freq, startTime, note.dur);
      startTime += note.dur + 0.03;
    });
  }

  // Heavy Pakistani Truck Air Horn (Dual tone loud brass)
  public playPakistaniAirHorn() {
    if (!this.ctx || this.isMuted) return;
    this.resume();

    try {
      const now = this.ctx.currentTime;
      [311.13, 370.00, 466.16].forEach((f) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now);
        osc.stop(now + 0.65);
      });
    } catch {}
  }

  private playNote(freq: number, time: number, duration: number) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, time);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, time);

      gain.gain.setValueAtTime(0.12, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + duration);
      osc2.start(time);
      osc2.stop(time + duration);
    } catch {}
  }

  public playIndicatorClick() {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {}
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopEngine();
    } else {
      this.startEngine();
    }
    return this.isMuted;
  }
}

export const gameSound = new BussidSoundEngine();
