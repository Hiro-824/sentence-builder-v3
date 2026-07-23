let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  const AudioContextClass =
    window.AudioContext
    ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  audioContext ??= new AudioContextClass();
  if (audioContext.state === "suspended") void audioContext.resume();
  return audioContext;
};

const playTone = (
  frequency: number,
  startOffset: number,
  duration: number,
  volume: number,
  type: OscillatorType = "sine",
) => {
  const context = getAudioContext();
  if (!context) return;
  const start = context.currentTime + startOffset;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
};

const playMechanicalClick = () => {
  const context = getAudioContext();
  if (!context) return;
  const duration = 0.045;
  const frameCount = Math.ceil(context.sampleRate * duration);
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let index = 0; index < frameCount; index += 1) {
    const decay = 1 - index / frameCount;
    samples[index] = (Math.random() * 2 - 1) * decay * decay;
  }

  const source = context.createBufferSource();
  const highpass = context.createBiquadFilter();
  const gain = context.createGain();
  const start = context.currentTime;
  highpass.type = "highpass";
  highpass.frequency.setValueAtTime(1800, start);
  gain.gain.setValueAtTime(0.075, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.buffer = buffer;
  source.connect(highpass);
  highpass.connect(gain);
  gain.connect(context.destination);
  source.start(start);
};

export const playBlockConnectSound = () => {
  playMechanicalClick();
  playTone(760, 0, 0.045, 0.055, "square");
  playTone(1280, 0.012, 0.035, 0.03, "triangle");
};

export const playNextQuestionSound = () => {
  playTone(659.25, 0, 0.2, 0.045);
  playTone(783.99, 0.11, 0.28, 0.05);
};

export const playLessonCompleteSound = () => {
  playTone(523.25, 0, 0.3, 0.042);
  playTone(659.25, 0.1, 0.36, 0.047);
  playTone(783.99, 0.2, 0.42, 0.052);
  playTone(1046.5, 0.34, 0.58, 0.045);
};
