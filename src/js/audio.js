const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContextClass();
function beep(freq, duration) {
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
// export function playSpinSound() {
//   beep(523.25, 0.1);
// }

export function playSpinSound() {
  const endAudio = new Audio("/mp3/start.mp3");
  endAudio.play();
}
// export function playEndSound() {
//   beep(1046.5, 0.1);
//   setTimeout(() => beep(1046.5, 0.1), 150);
//   setTimeout(() => beep(1046.5, 0.1), 300);
// }

export function playEndSound() {
  const endAudio = new Audio("/mp3/slot_machine_bet_04.mp3");
  endAudio.play();
}
