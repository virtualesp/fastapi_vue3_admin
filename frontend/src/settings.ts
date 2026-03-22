import { LayoutMode, ComponentSize, ThemeMode, LanguageEnum } from "./enums";

const env = import.meta.env;
const { pkg } = __APP_INFO__;

// 检查用户的操作系统是否使用深色模式
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

export const defaultSettings: AppSettings = {
  name: pkg.name as string,
  // 系统Title
  title: (env.VITE_APP_TITLE as string) || pkg.name,
  // 系统版本
  version: pkg.version as string,
  // 是否显示设置按钮
  showSettings: true,
  // 桌面端工具项单独控制
  showMenuSearch: true,
  showFullscreen: true,
  showSizeSelect: true,
  showLangSelect: true,
  // 是否显示通知
  showNotification: true,
  // 是否显示标签视图
  showTagsView: true,
  // 是否显示应用Logo
  showAppLogo: true,
  // 布局方式，默认为左侧布局
  layout: LayoutMode.LEFT,
  // 主题，根据操作系统的色彩方案自动选择
  theme: prefersDark ? ThemeMode.DARK : ThemeMode.LIGHT,
  // 组件大小 default | medium | small | large
  size: ComponentSize.DEFAULT,
  // 语言
  language: LanguageEnum.ZH_CN,
  // 主题颜色 - 修改此值时需同步修改 src/styles/variables.scss
  themeColor: "#3b82f6",
  // 是否显示水印 (修改默认开启水印)
  showWatermark: false,
  // 水印内容
  watermarkContent: pkg.name,
  // 项目引导
  guideVisible: false,
  /** 是否启动引导 */
  showGuide: true,
  /** 是否开启AI助手 */
  aiEnabled: false,
  /** 是否开启灰色模式 */
  grayMode: false,
  /** 页面切换动画 */
  pageSwitchingAnimation: "fade-slide",
};

/**
 * 主题色预设 - 现代化配色方案
 *
 * 设计原则：
 * 1. 颜色分类：按色系分组，便于用户选择
 * 2. 深浅搭配：每个色系提供浅、中、深三种选择
 * 3. 视觉协调：所有颜色都经过视觉测试，确保在不同主题下都有良好表现
 *
 * 注意：修改默认主题色时，需要同步修改以下文件：
 * - src/styles/variables.scss
 * - src/styles/theme/element-light.scss
 * - src/styles/theme/element-dark.scss
 */
export const themeColorPresets = [
  // ==================== 精选推荐 - 最受欢迎的颜色 ====================
  "#5dc0ff", // 淡蓝色 - 清新明亮，亮暗主题皆宜
  "#3b82f6", // 现代蓝 - 默认主题色，专业稳重
  "#10b981", // 翡翠绿 - 清新自然，活力健康
  "#8b5cf6", // 紫罗兰 - 创意优雅，现代时尚
  "#f59e0b", // 琥珀橙 - 温暖活力，积极向上
  "#06b6d4", // 青蓝色 - 科技清新，年轻活力
  "#ef4444", // 鲜红色 - 醒目强烈，热情奔放
  "#ec4899", // 玫瑰粉 - 浪漫温馨，时尚个性
  "#14b8a6", // 青绿色 - 清新自然，平和舒适

  // ==================== 蓝色系 - 科技与专业 ====================
  "#60a5fa", // 天空蓝 - 清新明亮，轻松愉悦
  "#3b82f6", // 现代蓝 - 专业稳重，值得信赖
  "#2563eb", // 深蓝色 - 商务专业，稳重大气
  "#1d4ed8", // 皇家蓝 - 高端商务，权威专业
  "#1e40af", // 深海蓝 - 商务精英，深沉内敛

  // ==================== 绿色系 - 自然与活力 ====================
  "#34d399", // 浅绿色 - 清新明亮，生机盎然
  "#10b981", // 翡翠绿 - 清新自然，活力健康
  "#22c55e", // 草绿色 - 健康活力，积极向上
  "#16a34a", // 森林绿 - 生态环保，自然和谐
  "#15803d", // 深绿色 - 稳重大气，成熟稳重

  // ==================== 紫色系 - 创意与优雅 ====================
  "#a78bfa", // 浅紫色 - 时尚现代，温柔浪漫
  "#8b5cf6", // 紫罗兰 - 创意优雅，现代时尚
  "#7c3aed", // 葡萄紫 - 创意无限，神秘优雅
  "#6d28d9", // 深紫色 - 神秘高端，独特个性
  "#5b21b6", // 皇家紫 - 王者风范，尊贵典雅

  // ==================== 橙色系 - 温暖与活力 ====================
  "#fb923c", // 浅橙色 - 温暖亲切，阳光开朗
  "#f59e0b", // 琥珀橙 - 温暖活力，积极向上
  "#f97316", // 火橙色 - 热情奔放，活力四射
  "#ea580c", // 深橙色 - 阳光活力，热情洋溢

  // ==================== 青色系 - 科技与清新 ====================
  "#22d3ee", // 浅青色 - 清新明亮，年轻活力
  "#06b6d4", // 青蓝色 - 科技清新，年轻活力
  "#14b8a6", // 青绿色 - 清新自然，平和舒适
  "#0891b2", // 天蓝色 - 清新自然，专业科技
  "#0e7490", // 深青色 - 专业科技，沉稳内敛

  // ==================== 红色系 - 激情与警示 ====================
  "#f87171", // 浅红色 - 柔和温暖，亲和力强
  "#ef4444", // 鲜红色 - 醒目强烈，热情奔放
  "#dc2626", // 猩红色 - 激情四射，力量感强
  "#b91c1c", // 深红色 - 庄重严肃，权威感强

  // ==================== 粉色系 - 温柔与时尚 ====================
  "#f472b6", // 浅粉色 - 柔美可爱，青春活力
  "#ec4899", // 玫瑰粉 - 浪漫温馨，时尚个性
  "#db2777", // 玫瑰红 - 浪漫优雅，热情奔放
  "#be185d", // 深粉色 - 高贵典雅，成熟魅力

  // ==================== 灰色系 - 简约与现代 ====================
  "#9ca3af", // 浅灰色 - 简约现代，低调内敛
  "#6b7280", // 经典灰 - 中性稳重，专业可靠
  "#4b5563", // 深灰色 - 商务专业，成熟稳重
];
