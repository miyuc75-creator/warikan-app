export function playRegisterSound(): void {
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioContextClass();

    const playTone = (
      frequency: number,
      startTime: number,
      duration: number,
      volume = 0.15
    ) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    playTone(880, now, 0.08);
    playTone(1174.66, now + 0.08, 0.15);
    playTone(1567.98, now + 0.18, 0.25, 0.12);

    setTimeout(() => {
      void ctx.close();
    }, 600);
  } catch {
    // Audio not available — silently ignore
  }
}
