const path = require('path');
const PptxGenJS = require('pptxgenjs');

const outputPath = path.join(
  __dirname,
  '..',
  'github-copilot-lab',
  'GPT-5.4-能力优势一页说明.pptx'
);

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'GitHub Copilot';
pptx.company = 'OpenAI summary';
pptx.subject = 'GPT-5.4 capability summary';
pptx.title = 'GPT-5.4 能力优势';
pptx.lang = 'zh-CN';

const colors = {
  bg: 'F5F1E8',
  ink: '1F2937',
  subInk: '475569',
  accent: 'C65D2E',
  accentDark: '8D3E1E',
  soft: 'E9D8C7',
  panel: 'FFF9F2',
  teal: '3D7A78',
  gold: 'C08B2C',
  line: 'D8C7B7'
};

function addText(slide, text, options) {
  slide.addText(text, {
    fontFace: 'Arial',
    color: colors.ink,
    margin: 0,
    breakLine: false,
    ...options
  });
}

function addMetricCard(slide, box, value, label, fill, valueColor) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: box.x,
    y: box.y,
    w: box.w,
    h: box.h,
    rectRadius: 0.08,
    line: { color: fill, transparency: 100 },
    fill: { color: fill }
  });

  addText(slide, value, {
    x: box.x + 0.14,
    y: box.y + 0.12,
    w: box.w - 0.28,
    h: 0.34,
    fontSize: 19,
    bold: true,
    color: valueColor,
    align: 'left'
  });

  addText(slide, label, {
    x: box.x + 0.14,
    y: box.y + 0.52,
    w: box.w - 0.28,
    h: 0.38,
    fontSize: 9.5,
    color: colors.subInk,
    fit: 'shrink'
  });
}

function addSectionTitle(slide, text, x, y, w) {
  addText(slide, text, {
    x,
    y,
    w,
    h: 0.24,
    fontSize: 12,
    bold: true,
    color: colors.teal
  });
}

function addTag(slide, text, x, y, w, fill, color = colors.ink) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.34,
    rectRadius: 0.08,
    line: { color: fill, transparency: 100 },
    fill: { color: fill }
  });

  addText(slide, text, {
    x: x + 0.12,
    y: y + 0.08,
    w: w - 0.24,
    h: 0.16,
    fontSize: 9.5,
    bold: true,
    color,
    align: 'center'
  });
}

function addCompareRow(slide, row, leftTitle, leftText, rightTitle, rightText, highlight) {
  const top = 2.05 + row * 1.06;

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.7,
    y: top,
    w: 5.48,
    h: 0.86,
    rectRadius: 0.05,
    line: { color: 'E6DBCF', width: 1 },
    fill: { color: 'FFFCF7' }
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.37,
    y: top,
    w: 5.48,
    h: 0.86,
    rectRadius: 0.05,
    line: { color: highlight, width: 1 },
    fill: { color: 'FFF7F1' }
  });

  addText(slide, leftTitle, {
    x: 0.92,
    y: top + 0.12,
    w: 1.55,
    h: 0.18,
    fontSize: 10,
    bold: true,
    color: colors.subInk
  });

  addText(slide, leftText, {
    x: 0.92,
    y: top + 0.34,
    w: 4.95,
    h: 0.32,
    fontSize: 9.6,
    color: colors.ink,
    fit: 'shrink'
  });

  addText(slide, rightTitle, {
    x: 6.6,
    y: top + 0.12,
    w: 1.85,
    h: 0.18,
    fontSize: 10,
    bold: true,
    color: colors.accentDark
  });

  addText(slide, rightText, {
    x: 6.6,
    y: top + 0.34,
    w: 4.9,
    h: 0.32,
    fontSize: 9.6,
    color: colors.ink,
    fit: 'shrink'
  });
}

function addScenarioCard(slide, box, title, text, fill, accentColor) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: box.x,
    y: box.y,
    w: box.w,
    h: box.h,
    rectRadius: 0.05,
    line: { color: fill, width: 1 },
    fill: { color: 'FFFDFC' }
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: box.x + 0.14,
    y: box.y + 0.12,
    w: 1.38,
    h: 0.28,
    rectRadius: 0.05,
    line: { color: fill, transparency: 100 },
    fill: { color: fill }
  });

  addText(slide, title, {
    x: box.x + 0.24,
    y: box.y + 0.18,
    w: 1.18,
    h: 0.12,
    fontSize: 9.2,
    bold: true,
    color: accentColor,
    align: 'center'
  });

  addText(slide, text, {
    x: box.x + 1.7,
    y: box.y + 0.16,
    w: box.w - 1.94,
    h: box.h - 0.22,
    fontSize: 9.7,
    color: colors.ink,
    fit: 'shrink'
  });
}

async function main() {
  const slide = pptx.addSlide();
  slide.background = { color: colors.bg };

  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 0.28,
    line: { color: colors.accent, transparency: 100 },
    fill: { color: colors.accent }
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: 8.98,
    y: 0.55,
    w: 3.8,
    h: 6.25,
    line: { color: colors.soft, transparency: 100 },
    fill: { color: colors.panel }
  });

  slide.addShape(pptx.ShapeType.line, {
    x: 8.98,
    y: 0.55,
    w: 0,
    h: 6.25,
    line: { color: colors.line, width: 1.2 }
  });

  addText(slide, 'GPT-5.4', {
    x: 0.65,
    y: 0.55,
    w: 3.3,
    h: 0.55,
    fontSize: 26,
    bold: true,
    color: colors.accentDark
  });

  addText(slide, '能力优势一页说明', {
    x: 0.65,
    y: 1.02,
    w: 4.6,
    h: 0.4,
    fontSize: 22,
    bold: true
  });

  addText(slide, '定位：面向专业工作负载的高质量通用推理模型，融合推理、编码、视觉与智能体工具调用能力。', {
    x: 0.68,
    y: 1.5,
    w: 7.7,
    h: 0.65,
    fontSize: 12,
    color: colors.subInk,
    valign: 'mid'
  });

  slide.addText([
    { text: '核心优势', options: { bold: true, color: colors.teal } },
    { text: '\n1. 专业知识工作更稳：在 GDPval 中达到 83.0% 胜出或持平，输出更精炼，适合表格、演示文稿、文档等交付物。\n2. 计算机使用与视觉更强：原生支持计算机使用，OSWorld-Verified 达到 75.0%，超过 GPT-5.2 与人类平均水平。\n3. 编码与长流程执行更实用：整合 GPT-5.3-Codex 编程优势，在 SWE-Bench Pro 上达到 57.7%，更适合复杂开发任务。\n4. 工具与联网搜索更高效：Toolathlon 54.6%，BrowseComp 82.7%，支持工具搜索，在大型 MCP 场景中可显著降低 Token 开销。\n5. 事实准确率更高：相对 GPT-5.2，单项陈述错误率降低 33%，整条回复含错概率降低 18%。', options: { color: colors.ink } }
  ], {
    x: 0.68,
    y: 2.05,
    w: 7.7,
    h: 2.95,
    fontFace: 'Arial',
    fontSize: 11.5,
    breakLine: false,
    margin: 0,
    valign: 'top',
    paraSpaceAfterPt: 6,
    bullet: { indent: 0 }
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.68,
    y: 5.25,
    w: 7.7,
    h: 1.05,
    rectRadius: 0.08,
    line: { color: colors.gold, transparency: 100 },
    fill: { color: 'F3E4CB' }
  });

  addText(slide, '适用场景', {
    x: 0.9,
    y: 5.43,
    w: 1.4,
    h: 0.25,
    fontSize: 11,
    bold: true,
    color: colors.accentDark
  });

  addText(slide, '咨询与分析报告、自动化网页/桌面操作、复杂编码迭代、多工具智能体编排、深度联网检索。', {
    x: 1.95,
    y: 5.4,
    w: 6.1,
    h: 0.38,
    fontSize: 11,
    color: colors.ink
  });

  addText(slide, '结论：GPT-5.4 的优势不只是更强，而是更适合真实工作流中的“长任务、跨工具、高质量交付”。', {
    x: 0.9,
    y: 5.78,
    w: 7.1,
    h: 0.28,
    fontSize: 10.5,
    italic: true,
    color: colors.subInk
  });

  addText(slide, '关键基准', {
    x: 9.35,
    y: 0.82,
    w: 2.0,
    h: 0.35,
    fontSize: 16,
    bold: true,
    color: colors.accentDark
  });

  addText(slide, 'OpenAI 公布的代表性指标', {
    x: 9.35,
    y: 1.16,
    w: 2.8,
    h: 0.22,
    fontSize: 9.5,
    color: colors.subInk
  });

  addMetricCard(slide, { x: 9.35, y: 1.58, w: 1.45, h: 0.9 }, '83.0%', 'GDPval\n知识工作胜出或持平', 'F7E0D6', colors.accentDark);
  addMetricCard(slide, { x: 10.98, y: 1.58, w: 1.45, h: 0.9 }, '57.7%', 'SWE-Bench Pro\n公开编码基准', 'E4F0EE', colors.teal);
  addMetricCard(slide, { x: 9.35, y: 2.68, w: 1.45, h: 0.9 }, '75.0%', 'OSWorld-Verified\n计算机使用', 'F3E4CB', colors.gold);
  addMetricCard(slide, { x: 10.98, y: 2.68, w: 1.45, h: 0.9 }, '54.6%', 'Toolathlon\n工具调用', 'F7E0D6', colors.accentDark);
  addMetricCard(slide, { x: 9.35, y: 3.78, w: 1.45, h: 0.9 }, '82.7%', 'BrowseComp\n联网搜索', 'E4F0EE', colors.teal);
  addMetricCard(slide, { x: 10.98, y: 3.78, w: 1.45, h: 0.9 }, '-33%', '事实错误率\n相对下降', 'F3E4CB', colors.gold);

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 9.35,
    y: 5.05,
    w: 3.1,
    h: 1.12,
    rectRadius: 0.08,
    line: { color: colors.line, width: 1 },
    fill: { color: 'FFFDF9' }
  });

  addText(slide, '产品含义', {
    x: 9.57,
    y: 5.22,
    w: 1.4,
    h: 0.22,
    fontSize: 11,
    bold: true,
    color: colors.teal
  });

  addText(slide, '更少往返沟通，更强长上下文与中途可控性，适合企业级智能体和高价值知识工作。', {
    x: 9.57,
    y: 5.5,
    w: 2.65,
    h: 0.45,
    fontSize: 10,
    color: colors.ink,
    fit: 'shrink'
  });

  addText(slide, '来源：OpenAI《Introducing GPT-5.4》中文页，2026-03-05。', {
    x: 0.68,
    y: 6.7,
    w: 6.2,
    h: 0.18,
    fontSize: 8.5,
    color: colors.subInk
  });

  const slide2 = pptx.addSlide();
  slide2.background = { color: colors.bg };

  slide2.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 0.28,
    line: { color: colors.teal, transparency: 100 },
    fill: { color: colors.teal }
  });

  addText(slide2, 'GPT-5.4', {
    x: 0.88,
    y: 0.56,
    w: 2.3,
    h: 0.34,
    fontSize: 24,
    bold: true,
    color: colors.accentDark
  });

  addText(slide2, '应用场景', {
    x: 0.88,
    y: 1.0,
    w: 3.4,
    h: 0.34,
    fontSize: 21,
    bold: true
  });

  addText(slide2, '这一页只回答“GPT-5.4 适合落地在哪些高价值工作流”，避免与竞品信息混排导致结构拥挤。', {
    x: 0.9,
    y: 1.42,
    w: 10.8,
    h: 0.3,
    fontSize: 10.8,
    color: colors.subInk
  });

  slide2.addShape(pptx.ShapeType.roundRect, {
    x: 0.88,
    y: 1.88,
    w: 11.3,
    h: 4.34,
    rectRadius: 0.06,
    line: { color: colors.line, width: 1 },
    fill: { color: 'FFFDF8' }
  });

  addSectionTitle(slide2, '高价值应用场景', 1.1, 2.08, 2.3);
  addScenarioCard(slide2, { x: 1.06, y: 2.45, w: 10.96, h: 0.68 }, '咨询 / 行研', '适合报告、方案、演示稿、结构化分析等高标准知识工作，直接生成结果更接近最终交付物。', 'F7E0D6', colors.accentDark);
  addScenarioCard(slide2, { x: 1.06, y: 3.25, w: 10.96, h: 0.68 }, '软件研发', '覆盖需求拆解、编码、调试与验证，更适合跨文件、多轮次、长链路的软件开发任务。', 'E4F0EE', colors.teal);
  addScenarioCard(slide2, { x: 1.06, y: 4.05, w: 10.96, h: 0.68 }, '计算机使用', '网页、桌面、表单和工具协同更强，适合需要真实执行动作的自动化与操作型 Agent。', 'F3E4CB', colors.gold);
  addScenarioCard(slide2, { x: 1.06, y: 4.85, w: 10.96, h: 0.68 }, '智能体编排', '多工具调用、MCP 集成、联网检索场景更省 token，利于企业级复杂工作流和流程编排。', 'F7E0D6', colors.accentDark);

  slide2.addShape(pptx.ShapeType.roundRect, {
    x: 1.06,
    y: 5.72,
    w: 10.96,
    h: 0.28,
    rectRadius: 0.04,
    line: { color: colors.gold, transparency: 100 },
    fill: { color: 'F8ECD8' }
  });

  addText(slide2, '选型建议：任务越偏“长流程执行 + 工具协同 + 最终交付”，GPT-5.4 的收益越明显。', {
    x: 1.38,
    y: 5.8,
    w: 10.6,
    h: 0.12,
    fontSize: 9.2,
    italic: true,
    color: colors.accentDark,
    align: 'center'
  });

  addText(slide2, '来源：OpenAI《Introducing GPT-5.4》中文页，2026-03-05。', {
    x: 0.9,
    y: 6.72,
    w: 6.2,
    h: 0.18,
    fontSize: 8.5,
    color: colors.subInk
  });

  const slide3 = pptx.addSlide();
  slide3.background = { color: colors.bg };

  slide3.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 0.28,
    line: { color: colors.teal, transparency: 100 },
    fill: { color: colors.teal }
  });

  addText(slide3, 'GPT-5.4', {
    x: 0.88,
    y: 0.56,
    w: 2.3,
    h: 0.34,
    fontSize: 24,
    bold: true,
    color: colors.accentDark
  });

  addText(slide3, '竞品对比', {
    x: 0.88,
    y: 1.0,
    w: 3.4,
    h: 0.34,
    fontSize: 21,
    bold: true
  });

  addText(slide3, '这一页只比较“上一代 / 通用同类模型”和 GPT-5.4 在真实工作流中的差异，结构上保留完整的对照阅读空间。', {
    x: 0.9,
    y: 1.42,
    w: 11.2,
    h: 0.3,
    fontSize: 10.8,
    color: colors.subInk
  });

  addSectionTitle(slide3, '竞品对比', 0.92, 1.94, 1.8);
  addTag(slide3, '上一代 / 通用同类', 6.42, 1.94, 2.1, 'EFE7DE', colors.subInk);
  addTag(slide3, 'GPT-5.4', 8.72, 1.94, 1.28, 'F7E0D6', colors.accentDark);

  addCompareRow(slide3, 0, '知识工作输出', '通常需要更多提示修正，成品一致性一般。', '交付质量', '更擅长直接生成可交付物，减少润色与补救。', colors.accent);
  addCompareRow(slide3, 1, '编码与调试', '能写代码，但长链路任务中更容易丢上下文。', '开发任务', '更适合复杂工程流程，SWE-Bench Pro 达到 57.7%。', colors.teal);
  addCompareRow(slide3, 2, '工具与联网', '工具调用可用，但大规模编排成本更高。', 'Agent 场景', '支持工具搜索，MCP 大场景下更省 token。', colors.gold);
  addCompareRow(slide3, 3, '准确率与稳定性', '事实性与过程控制更依赖人工校验。', '可靠性', '相对 GPT-5.2，单项陈述错误率下降 33%。', colors.accent);

  addText(slide3, '注：此页基于 OpenAI 公布信息，强调业务可用性与工作流收益，不做泛化榜单比较。', {
    x: 0.92,
    y: 6.0,
    w: 11.2,
    h: 0.16,
    fontSize: 8.6,
    color: colors.subInk,
    italic: true,
    align: 'center'
  });

  addText(slide3, '来源：OpenAI《Introducing GPT-5.4》中文页，2026-03-05。', {
    x: 0.9,
    y: 6.72,
    w: 6.2,
    h: 0.18,
    fontSize: 8.5,
    color: colors.subInk
  });

  await pptx.writeFile({ fileName: outputPath });
  console.log(`Created: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});