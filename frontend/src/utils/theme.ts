import { ThemeMode } from "@/enums";

function hexToRgb(hex: string): [number, number, number] {
  // 处理带alpha通道的颜色值，去除alpha部分
  const cleanHex = hex.length === 9 ? hex.slice(0, 7) : hex;
  const bigint = parseInt(cleanHex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  const [r, g, b] = rgb.map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isLightColor(hex: string): boolean {
  return getLuminance(hex) > 0.5;
}

function getDarkColor(color: string, level: number): string {
  const rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level));
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

function getLightColor(color: string, level: number): string {
  const rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

function blendTwoColors(baseColor: string, mixColor: string, ratio: number): string {
  const rgb1 = hexToRgb(baseColor);
  const rgb2 = hexToRgb(mixColor);
  const w = ratio * 2 - 1;
  const w1 = (w + 1) / 2;
  const w2 = 1 - w1;
  const r = Math.round(rgb1[0] * w2 + rgb2[0] * w1);
  const g = Math.round(rgb1[1] * w2 + rgb2[1] * w1);
  const b = Math.round(rgb1[2] * w2 + rgb2[2] * w1);
  return rgbToHex(r, g, b);
}

interface ColorVariants {
  light: string[];
  dark: string;
}

function generateColorVariants(baseColor: string): ColorVariants {
  const lightLevels = [0.08, 0.16, 0.24, 0.32, 0.4, 0.52, 0.64, 0.76, 0.88];
  const light = lightLevels.map((level) => getLightColor(baseColor, level));
  const dark = getDarkColor(baseColor, 0.15);
  return { light, dark };
}

function generateDarkModeVariants(baseColor: string): ColorVariants {
  const darkLevels = [0.08, 0.16, 0.24, 0.32, 0.4, 0.52, 0.64, 0.76, 0.88];
  const light = darkLevels.map((level) => getDarkColor(baseColor, level));
  const dark = getLightColor(baseColor, 0.15);
  return { light, dark };
}

interface ColorScheme {
  bg: {
    primary: string;
    secondary: string;
    tertiary: string;
    overlay?: string;
  };
  fill: {
    base: string;
    light: string;
    lighter: string;
    extraLight: string;
    dark: string;
    darker: string;
  };
  shadow: {
    base: string;
    light: string;
    lighter: string;
    dark: string;
  };
  border: {
    base: string;
    light: string;
    lighter: string;
    extraLight: string;
    dark: string;
    darker: string;
  };
  table: {
    bg: string;
    trBg: string;
    headerBg: string;
    hoverBg: string;
    border: string;
  };
  sidebar: {
    background: string;
    text: string;
    activeText: string;
    activeBg: string;
    activeHoverBg: string;
    hover: string;
  };
  menu: {
    background: string;
    text: string;
    activeText: string;
    activeBg: string;
    hover: string;
  };
}

function generateLightThemeScheme(primary: string, isLightPrimary: boolean): ColorScheme {
  if (isLightPrimary) {
    return {
      bg: {
        primary: getLightColor(primary, 0.92),
        secondary: "#ffffff",
        tertiary: "#ffffff",
      },
      fill: {
        base: getLightColor(primary, 0.88),
        light: getLightColor(primary, 0.92),
        lighter: getLightColor(primary, 0.96),
        extraLight: "#ffffff",
        dark: getLightColor(primary, 0.8),
        darker: getLightColor(primary, 0.7),
      },
      shadow: {
        base: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`,
        light: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`,
        lighter: `0 1px 1px 0 rgba(0, 0, 0, 0.03)`,
        dark: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
      },
      border: {
        base: getLightColor(primary, 0.85),
        light: getLightColor(primary, 0.9),
        lighter: getLightColor(primary, 0.94),
        extraLight: "#ffffff",
        dark: getLightColor(primary, 0.75),
        darker: getLightColor(primary, 0.65),
      },
      table: {
        bg: "#ffffff",
        trBg: "#ffffff",
        headerBg: getLightColor(primary, 0.92),
        hoverBg: getLightColor(primary, 0.88),
        border: getLightColor(primary, 0.85),
      },
      sidebar: {
        background: getLightColor(primary, 0.92),
        text: "#1e293b",
        activeText: getDarkColor(primary, 0.15),
        activeBg: getLightColor(primary, 0.88),
        activeHoverBg: getLightColor(primary, 0.65),
        hover: "#fafafa",
      },
      menu: {
        background: getLightColor(primary, 0.92),
        text: "#1e293b",
        activeText: getDarkColor(primary, 0.15),
        activeBg: getLightColor(primary, 0.88),
        hover: "#fafafa",
      },
    };
  }
  return {
    bg: {
      primary: getLightColor(primary, 0.75),
      secondary: "#ffffff",
      tertiary: "#ffffff",
    },
    fill: {
      base: "#f1f5f9",
      light: "#f8fafc",
      lighter: "#ffffff",
      extraLight: "#ffffff",
      dark: "#e2e8f0",
      darker: "#cbd5e1",
    },
    shadow: {
      base: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`,
      light: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`,
      lighter: `0 1px 1px 0 rgba(0, 0, 0, 0.03)`,
      dark: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
    },
    border: {
      base: blendTwoColors("#cbd5e1", primary, 0.2),
      light: blendTwoColors("#e2e8f0", primary, 0.15),
      lighter: blendTwoColors("#f1f5f9", primary, 0.1),
      extraLight: "#ffffff",
      dark: blendTwoColors("#94a3b8", primary, 0.25),
      darker: blendTwoColors("#64748b", primary, 0.3),
    },
    table: {
      bg: blendTwoColors("#ffffff", primary, 0.02),
      trBg: blendTwoColors("#ffffff", primary, 0.02),
      headerBg: blendTwoColors("#f8fafc", primary, 0.15),
      hoverBg: blendTwoColors("#f1f5f9", primary, 0.1),
      border: blendTwoColors("#cbd5e1", primary, 0.2),
    },
    sidebar: {
      background: blendTwoColors("#ffffff", primary, 0.05),
      text: "#1e293b",
      activeText: getDarkColor(primary, 0.1),
      activeBg: getLightColor(primary, 0.88),
      activeHoverBg: getLightColor(primary, 0.65),
      hover: blendTwoColors("#fafafa", primary, 0.1),
    },
    menu: {
      background: blendTwoColors("#ffffff", primary, 0.05),
      text: "#1e293b",
      activeText: getDarkColor(primary, 0.1),
      activeBg: getLightColor(primary, 0.88),
      hover: blendTwoColors("#fafafa", primary, 0.1),
    },
  };
}

function generateDarkThemeScheme(primary: string, isLightPrimary: boolean): ColorScheme {
  if (isLightPrimary) {
    return {
      bg: {
        primary: getLightColor(primary, 0.85),
        secondary: getLightColor(primary, 0.95),
        tertiary: getLightColor(primary, 0.97),
        overlay: getLightColor(primary, 0.95),
      },
      fill: {
        base: blendTwoColors("#0f172a", primary, 0.1),
        light: blendTwoColors("#1e293b", primary, 0.15),
        lighter: blendTwoColors("#0f172a", primary, 0.05),
        extraLight: blendTwoColors("#020617", primary, 0.02),
        dark: blendTwoColors("#334155", primary, 0.2),
        darker: blendTwoColors("#475569", primary, 0.25),
      },
      shadow: {
        base: `0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.24)`,
        light: `0 1px 2px 0 rgba(0, 0, 0, 0.2)`,
        lighter: `0 1px 1px 0 rgba(0, 0, 0, 0.12)`,
        dark: `0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.24)`,
      },
      border: {
        base: getLightColor(primary, 0.85),
        light: getLightColor(primary, 0.9),
        lighter: getLightColor(primary, 0.94),
        extraLight: getLightColor(primary, 0.97),
        dark: getLightColor(primary, 0.78),
        darker: getLightColor(primary, 0.68),
      },
      table: {
        bg: blendTwoColors("#020617", primary, 0.02),
        trBg: blendTwoColors("#020617", primary, 0.02),
        headerBg: blendTwoColors("#1e293b", primary, 0.15),
        hoverBg: blendTwoColors("#0f172a", primary, 0.1),
        border: blendTwoColors("#1e293b", primary, 0.12),
      },
      sidebar: {
        background: getLightColor(primary, 0.92),
        text: "#e2e8f0",
        activeText: primary,
        activeBg: getLightColor(primary, 0.9),
        activeHoverBg: getLightColor(primary, 0.65),
        hover: getLightColor(primary, 0.88),
      },
      menu: {
        background: getLightColor(primary, 0.92),
        text: "#e2e8f0",
        activeText: primary,
        activeBg: getLightColor(primary, 0.9),
        hover: getLightColor(primary, 0.88),
      },
    };
  }
  return {
    bg: {
      primary: blendTwoColors("#020617", primary, 0.05),
      secondary: blendTwoColors("#0f172a", primary, 0.08),
      tertiary: blendTwoColors("#1e293b", primary, 0.1),
      overlay: blendTwoColors("#0f172a", primary, 0.08),
    },
    fill: {
      base: blendTwoColors("#0f172a", primary, 0.1),
      light: blendTwoColors("#1e293b", primary, 0.15),
      lighter: blendTwoColors("#0f172a", primary, 0.05),
      extraLight: blendTwoColors("#020617", primary, 0.02),
      dark: blendTwoColors("#334155", primary, 0.2),
      darker: blendTwoColors("#475569", primary, 0.25),
    },
    shadow: {
      base: `0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.24)`,
      light: `0 1px 2px 0 rgba(0, 0, 0, 0.2)`,
      lighter: `0 1px 1px 0 rgba(0, 0, 0, 0.12)`,
      dark: `0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.24)`,
    },
    border: {
      base: blendTwoColors("#1e293b", primary, 0.12),
      light: blendTwoColors("#334155", primary, 0.15),
      lighter: blendTwoColors("#475569", primary, 0.2),
      extraLight: blendTwoColors("#64748b", primary, 0.25),
      dark: blendTwoColors("#0f172a", primary, 0.08),
      darker: blendTwoColors("#020617", primary, 0.05),
    },
    table: {
      bg: blendTwoColors("#020617", primary, 0.02),
      trBg: blendTwoColors("#020617", primary, 0.02),
      headerBg: blendTwoColors("#1e293b", primary, 0.15),
      hoverBg: blendTwoColors("#0f172a", primary, 0.1),
      border: blendTwoColors("#1e293b", primary, 0.12),
    },
    sidebar: {
      background: blendTwoColors("#0f172a", primary, 0.08),
      text: "#e2e8f0",
      activeText: getLightColor(primary, 0.15),
      activeBg: getLightColor(primary, 0.9),
      activeHoverBg: getLightColor(primary, 0.65),
      hover: blendTwoColors("#1e293b", primary, 0.15),
    },
    menu: {
      background: blendTwoColors("#0f172a", primary, 0.08),
      text: "#e2e8f0",
      activeText: getLightColor(primary, 0.15),
      activeBg: getLightColor(primary, 0.9),
      hover: blendTwoColors("#1e293b", primary, 0.15),
    },
  };
}

const SEMANTIC_COLORS = {
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#64748b",
} as const;

export function generateThemeColors(primary: string, theme: ThemeMode) {
  // 处理带alpha通道的颜色值，去除alpha部分
  const cleanPrimary = primary.length === 9 ? primary.slice(0, 7) : primary;
  const colors: Record<string, string> = {
    primary: cleanPrimary,
    ...SEMANTIC_COLORS,
  };

  const isLight = isLightColor(cleanPrimary);
  const rgb = hexToRgb(cleanPrimary);

  const isDarkMode = theme === ThemeMode.DARK;
  const primaryVariants = isDarkMode
    ? generateDarkModeVariants(cleanPrimary)
    : generateColorVariants(cleanPrimary);

  primaryVariants.light.forEach((color, i) => {
    colors[`primary-light-${i + 1}`] = color;
  });
  colors["primary-dark-2"] = primaryVariants.dark;

  Object.entries(SEMANTIC_COLORS).forEach(([name, color]) => {
    const variants = isDarkMode ? generateDarkModeVariants(color) : generateColorVariants(color);
    variants.light.forEach((c, i) => {
      colors[`${name}-light-${i + 1}`] = c;
    });
    colors[`${name}-dark-2`] = variants.dark;
  });

  colors["brand-primary-rgb"] = `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;
  Object.entries(SEMANTIC_COLORS).forEach(([name, color]) => {
    const c = hexToRgb(color);
    colors[`brand-${name}-rgb`] = `${c[0]}, ${c[1]}, ${c[2]}`;
  });

  const scheme = isDarkMode
    ? generateDarkThemeScheme(cleanPrimary, isLight)
    : generateLightThemeScheme(cleanPrimary, isLight);

  colors["custom-bg-primary"] = scheme.bg.primary;
  colors["custom-bg-secondary"] = scheme.bg.secondary;
  colors["custom-bg-tertiary"] = scheme.bg.tertiary;

  colors["el-bg-color"] = scheme.bg.primary;
  colors["el-bg-color-page"] = scheme.bg.primary;
  colors["el-bg-color-overlay"] = scheme.bg.overlay ?? scheme.bg.secondary;

  if (isDarkMode) {
    colors["el-text-color-primary"] = "#f8fafc";
    colors["el-text-color-regular"] = "#e2e8f0";
    colors["el-text-color-secondary"] = "#94a3b8";
    colors["el-text-color-placeholder"] = "#64748b";
    colors["el-disabled-bg-color"] = "#0f172a";
    colors["el-disabled-text-color"] = "#475569";
    colors["el-disabled-border-color"] = "#1e293b";
    colors["el-overlay-color"] = "rgba(0, 0, 0, 0.7)";
    colors["el-overlay-color-light"] = "rgba(0, 0, 0, 0.5)";
    colors["el-overlay-color-lighter"] = "rgba(0, 0, 0, 0.3)";
    colors["el-scrollbar-bg-color"] = "#0f172a";
    colors["el-scrollbar-thumb-color"] = "#334155";
    colors["el-scrollbar-thumb-hover-color"] = "#475569";
  } else {
    colors["el-text-color-primary"] = "#0f172a";
    colors["el-text-color-regular"] = "#334155";
    colors["el-text-color-secondary"] = "#64748b";
    colors["el-text-color-placeholder"] = "#94a3b8";
    colors["el-disabled-bg-color"] = "#f1f5f9";
    colors["el-disabled-text-color"] = "#94a3b8";
    colors["el-disabled-border-color"] = "#e2e8f0";
    colors["el-overlay-color"] = "rgba(15, 23, 42, 0.5)";
    colors["el-overlay-color-light"] = "rgba(15, 23, 42, 0.3)";
    colors["el-overlay-color-lighter"] = "rgba(15, 23, 42, 0.15)";
    colors["el-scrollbar-bg-color"] = "#f1f5f9";
    colors["el-scrollbar-thumb-color"] = "#cbd5e1";
    colors["el-scrollbar-thumb-hover-color"] = "#94a3b8";
  }

  colors["el-border-color"] = scheme.border.base;
  colors["el-border-color-light"] = scheme.border.light;
  colors["el-border-color-lighter"] = scheme.border.lighter;
  colors["el-border-color-extra-light"] = scheme.border.extraLight;
  colors["el-border-color-dark"] = scheme.border.dark;
  colors["el-border-color-darker"] = scheme.border.darker;

  colors["el-fill-color"] = scheme.fill.base;
  colors["el-fill-color-light"] = scheme.fill.light;
  colors["el-fill-color-lighter"] = scheme.fill.lighter;
  colors["el-fill-color-extra-light"] = scheme.fill.extraLight;
  colors["el-fill-color-dark"] = scheme.fill.dark;
  colors["el-fill-color-darker"] = scheme.fill.darker;

  colors["el-box-shadow"] = scheme.shadow.base;
  colors["el-box-shadow-light"] = scheme.shadow.light;
  colors["el-box-shadow-lighter"] = scheme.shadow.lighter;
  colors["el-box-shadow-dark"] = scheme.shadow.dark;

  colors["el-table-bg-color"] = scheme.table.bg;
  colors["el-table-tr-bg-color"] = scheme.table.trBg;
  colors["el-table-header-bg-color"] = scheme.table.headerBg;
  colors["el-table-row-hover-bg-color"] = scheme.table.hoverBg;
  colors["el-table-border-color"] = scheme.table.border;

  // 抽屉背景色 - 使用主题填充色
  colors["el-drawer-bg-color"] = scheme.fill.base;

  // 侧边栏和菜单相关变量
  colors["sidebar-background"] = scheme.sidebar.background;
  colors["sidebar-text-color"] = scheme.sidebar.text;
  colors["sidebar-active-text-color"] = scheme.sidebar.activeText;
  colors["sidebar-active-bg"] = scheme.sidebar.activeBg;
  colors["sidebar-active-hover-bg"] = scheme.sidebar.activeHoverBg;
  colors["sidebar-hover"] = scheme.sidebar.hover;

  // Logo 相关变量
  colors["sidebar-logo-background"] = scheme.sidebar.background;
  colors["sidebar-logo-text-color"] = scheme.sidebar.activeText;

  // 布局菜单变量 - 确保与布局文件兼容
  colors["menu-background"] = scheme.menu.background;
  colors["menu-text"] = scheme.menu.text;
  colors["menu-active-text"] = scheme.menu.activeText;
  colors["menu-active-bg"] = scheme.menu.activeBg;
  colors["menu-hover"] = scheme.menu.hover;

  return colors;
}

export function applyTheme(colors: Record<string, string>) {
  const el = document.documentElement;

  Object.entries(colors).forEach(([key, value]) => {
    if (key.startsWith("el-")) {
      el.style.setProperty(`--${key}`, value);
    } else if (key.startsWith("sidebar-") || key.startsWith("menu-")) {
      el.style.setProperty(`--${key}`, value);
    } else {
      el.style.setProperty(`--el-color-${key}`, value);
    }
  });

  requestAnimationFrame(() => {
    el.style.setProperty("--theme-update-trigger", Date.now().toString());
  });
}

export function toggleDarkMode(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add(ThemeMode.DARK);
  } else {
    document.documentElement.classList.remove(ThemeMode.DARK);
  }
}

export function getThemeColorInfo(hex: string) {
  const luminance = getLuminance(hex);
  const rgb = hexToRgb(hex);
  return {
    hex,
    rgb,
    luminance,
    isLight: luminance > 0.5,
    isDark: luminance <= 0.5,
    contrast: luminance > 0.5 ? "light" : "dark",
  };
}

export { getDarkColor, getLightColor, blendTwoColors };
