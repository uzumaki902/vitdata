export const COLORS = {
  // 60% — Deep blue-black base
  base: "#0F1117",
  // 30% — Cool slate surfaces
  surface: "#1A1D27",
  // 10% — Warm amber accent
  accent: "#E8A55D",
  accentLight: "#1F1B15",
  text: "#E4E4E7",
  textSecondary: "#A1A1AA",
  muted: "#6B7280",
  border: "#252830",
  borderStrong: "#363B47",
  danger: "#F87171",
  dangerBg: "#2D1B1B",
  inputBg: "#141620",
  success: "#4ADE80",
  successBg: "#132215",
  focusBlue: "#E8A55D",
};

export default {
  light: {
    text: COLORS.text,
    background: COLORS.base,
    tint: COLORS.accent,
    tabIconDefault: COLORS.muted,
    tabIconSelected: COLORS.accent,
  },
};
