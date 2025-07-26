const AudioContextClass =
  window.AudioContext || (window as any).webkitAudioContext;
const audioCtx = new AudioContextClass();

function beep(freq: number, duration: number) {
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  oscillator.frequency.value = freq;
  oscillator.type = "sine";
  oscillator.connect(gain);
  gain.connect(audioCtx.destination);
  oscillator.start();
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioCtx.currentTime + duration,
  );
  oscillator.stop(audioCtx.currentTime + duration);
}

export function playSpinSound() {
  beep(523.25, 0.1);
}

export function playWinSound() {
  beep(1046.5, 0.1);
  setTimeout(() => beep(1046.5, 0.1), 150);
  setTimeout(() => beep(1046.5, 0.1), 300);
}
