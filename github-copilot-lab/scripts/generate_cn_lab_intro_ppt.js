const fs = require('fs/promises');
const path = require('path');

const pptxgen = require('/Users/qifenghou/.claude/skills/pptx/node_modules/pptxgenjs');
const html2pptx = require('/Users/qifenghou/.claude/skills/pptx/scripts/html2pptx');

const ROOT = '/Users/qifenghou/Codes/github-materials/github-copilot-lab';
const TMP_DIR = path.join(ROOT, '.generated', 'cn-lab-intro-ppt');
const OUTPUT_FILE = path.join(ROOT, 'GitHubCopilotLab-CN-文件介绍.pptx');

const slides = [
  {
    number: '00',
    file: '00.GitHubCopilotLab.md',
    title: 'Labs 总览',
    subtitle: '整个中文 Lab 目录的导航页',
    summary: '汇总 01-09 所有实验文件，帮助读者快速理解学习路径与模块关系。',
    bullets: [
      '列出当前中文目录中的所有实验编号、文件名与内容概述',
      '适合作为培训开场页或课程导航页使用',
      '让读者先建立 GitHub Copilot 功能版图，再进入具体实验'
    ],
    takeaway: '这是目录页，重点价值是建立整体认知和学习顺序。',
    demoSteps: [
      '先展示中文目录结构，说明整个培训将覆盖的主题范围。',
      '再快速浏览 01-09 文件名，建立后续学习路径。'
    ]
  },
  {
    number: '01',
    file: '01.CopilotAgent.md',
    title: 'Copilot Agent',
    subtitle: '用 Agent 模式从 PRD 到项目初始化',
    summary: '介绍 GitHub Copilot 的基础能力，并通过旅游网站案例演示如何生成 PRD、初始化项目与创建组件。',
    bullets: [
      '先用自然语言生成完整 PRD，明确页面功能和技术栈',
      '再根据 PRD 初始化项目结构并创建前端页面骨架',
      '帮助学员理解 Agent 模式如何把需求逐步转为代码成果'
    ],
    takeaway: '这是入门实验，展示 Copilot 从需求描述到项目落地的完整链路。',
    demoSteps: [
      '现场输入一个旅游网站需求，让 Copilot 先生成 PRD。',
      '继续让 Copilot 按 PRD 初始化项目并创建首个页面组件。'
    ]
  },
  {
    number: '02',
    file: '02.PlanMode.md',
    title: 'Plan Mode',
    subtitle: '先规划，再实施的结构化开发流程',
    summary: '说明 Plan Mode 的价值：先探索代码库、识别方案与风险，再确认实施步骤，减少返工。',
    bullets: [
      '强调先理解项目结构和需求范围，再进入编码阶段',
      '适合新增功能、跨文件改动、架构选择等复杂任务',
      '通过“搜索与筛选功能”案例演示如何审阅并确认计划'
    ],
    takeaway: '核心信息是把“直接写代码”升级为“先形成可审阅方案”。',
    demoSteps: [
      '先给一个跨文件需求，触发 Copilot 进入 Plan 模式。',
      '展示计划输出后，再确认并进入实施阶段。'
    ]
  },
  {
    number: '03',
    file: '03.AgentSkill.md',
    title: 'Agent Skills',
    subtitle: '通过技能文件扩展 Copilot 的专门能力',
    summary: '介绍 Agent Skills 的概念、启用方式和技能安装流程，并用社区 pptx 技能作为案例。',
    bullets: [
      'Skill 本质是带有说明、脚本和资源的能力包',
      '支持放在个人目录或项目目录，便于共享和复用',
      '通过实际安装技能，体验自动匹配与调用的工作流'
    ],
    takeaway: '该文件重点说明 Copilot 如何通过模块化技能扩展任务处理范围。',
    demoSteps: [
      '展示一个技能目录结构，说明 SKILL.md 与脚本资源的关系。',
      '再演示安装或触发一次技能，让学员看到自动调用效果。'
    ]
  },
  {
    number: '04',
    file: '04.CustomInstructions.md',
    title: 'Custom Instructions',
    subtitle: '给 Copilot 持续注入项目规范与偏好',
    summary: '讲解 copilot-instructions.md 与语言专用 instruction 文件如何约束生成风格与行为。',
    bullets: [
      '创建全局 instruction 与 TypeScript 专用 instruction 文件',
      '通过 applyTo 前置配置，将规则绑定到特定文件类型',
      '验证解释代码时，Copilot 会自动引用这些规则文件'
    ],
    takeaway: '重点在于让 Copilot 长期遵守团队规范，而不是每次重复输入约束。',
    demoSteps: [
      '先打开 instruction 文件，说明规则如何组织。',
      '再让 Copilot 解释一段代码，验证规则已被自动应用。'
    ]
  },
  {
    number: '05',
    file: '05.CustomAgent.md',
    title: 'Custom Agent',
    subtitle: '封装专用角色、工具和流程',
    summary: '说明如何通过 .agent.md 文件定义自定义 Agent，并结合 Web2MD、Outline 等场景复用能力。',
    bullets: [
      '自定义 Agent 可以绑定角色描述、工具集合与执行步骤',
      '适合把常用工作流沉淀为固定模式，减少重复配置',
      '案例展示了网页转 Markdown 与内容提纲生成等任务'
    ],
    takeaway: '这类文件关注“模式复用”，本质上是在复用一套高频协作流程。',
    demoSteps: [
      '展示一个 .agent.md 文件，讲清角色、工具和步骤定义。',
      '现场调用一次自定义 Agent，完成固定工作流任务。'
    ]
  },
  {
    number: '06',
    file: '06.MCPServer.md',
    title: 'MCP Server',
    subtitle: '为 Copilot 连接外部工具与数据源',
    summary: '介绍 MCP Server 的定位，并通过 GitHub MCP Server 演示 issue 查询、创建和仓库协作。',
    bullets: [
      '解释 MCP 如何按需提供上下文和工具能力，而不是静态提示',
      '演示在 VS Code 中配置 mcp.json 并启动 GitHub MCP Server',
      '案例覆盖 commit、issue 查询、新 issue 创建等常用操作'
    ],
    takeaway: '该文件说明 Copilot 不只是聊天助手，也能通过 MCP 直接操作外部系统。',
    demoSteps: [
      '先展示 mcp.json 配置，说明工具如何被注册。',
      '再调用 GitHub MCP Server 查询 issue 或创建一条记录。'
    ]
  },
  {
    number: '07',
    file: '07.Copilot-CLIAgent.md',
    title: 'Copilot CLI Sessions',
    subtitle: '在后台运行 Agent 会话',
    summary: '介绍 VS Code 中基于 Copilot CLI 的后台 Agent 会话，包括隔离模式、交接机制和终端集成。',
    bullets: [
      '支持 Worktree 与 Workspace 两种隔离模式',
      '可以把本地 Agent 或 Plan 会话交接到后台继续执行',
      '适合范围清晰、耗时较长且无需频繁交互的任务'
    ],
    takeaway: '重点价值是把 Agent 执行从前台对话扩展到后台自治处理。',
    demoSteps: [
      '先发起一个需要较长时间的任务，说明为何适合后台执行。',
      '再展示会话交接到后台后的执行状态与结果查看方式。'
    ]
  },
  {
    number: '08',
    file: '08.ReviewAgent.md',
    title: 'Review Agent',
    subtitle: '让 Copilot 自动审查 Pull Request',
    summary: '说明 Review Agent 如何读取 PR diff 与上下文，输出结构化、可执行的代码审查意见。',
    bullets: [
      '聚焦高风险问题，如安全、性能、可维护性与测试覆盖',
      '通过创建带缺陷代码和 PR，演示 Request review from Copilot',
      '帮助团队把代码评审流程标准化、自动化'
    ],
    takeaway: '这个文件强调 Copilot 在代码质量把关中的协作价值。',
    demoSteps: [
      '准备一个带缺陷的 PR 或 diff，发起 Copilot Review。',
      '重点解读返回意见中的高风险问题和可执行建议。'
    ]
  },
  {
    number: '09',
    file: '09.CopilotCLI.md',
    title: 'Copilot CLI',
    subtitle: '在终端中使用自然语言驱动开发任务',
    summary: '介绍 Copilot CLI 的基本使用方式，重点展示安装、登录、命令列表和 review 文件等能力。',
    bullets: [
      '在终端中通过自然语言完成命令生成与代码审查',
      '演示使用 review @文件路径 对已有代码执行检查',
      '适合喜欢终端工作流的开发者快速接入 Copilot 能力'
    ],
    takeaway: '这一页对应终端场景，突出 Copilot 从编辑器扩展到命令行环境。',
    demoSteps: [
      '在终端中输入自然语言请求，让 Copilot 生成命令。',
      '再用 review @文件路径 演示终端内的代码检查流程。'
    ]
  }
];

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function slideHtml(item) {
  const bullets = item.bullets
    .map((bullet) => `<li>${escapeHtml(bullet)}</li>`)
    .join('');
  const demoSteps = item.demoSteps
    .map((step) => `<li>${escapeHtml(step)}</li>`)
    .join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    html { background: #08111f; }
    body {
      width: 720pt;
      height: 405pt;
      margin: 0;
      padding: 0;
      display: flex;
      background: #08111f;
      color: #f4f7fb;
      font-family: Arial, Helvetica, sans-serif;
    }
    .sidebar {
      width: 170pt;
      height: 405pt;
      background: #0f1f38;
      border-right: 3pt solid #2ad4c7;
      box-sizing: border-box;
      padding: 28pt 20pt 24pt 24pt;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .lab-label {
      font-size: 14pt;
      letter-spacing: 2pt;
      color: #7bded6;
      margin: 0 0 8pt 0;
      text-transform: uppercase;
    }
    .lab-number {
      font-size: 40pt;
      line-height: 1.05;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
    }
    .file-tag {
      background: #153356;
      border-radius: 10pt;
      padding: 10pt 12pt;
      margin-top: 16pt;
    }
    .file-tag p {
      margin: 0;
      font-size: 10.5pt;
      line-height: 1.35;
      color: #cfe4ff;
      word-break: break-word;
    }
    .footer-note {
      border-top: 1pt solid #35567a;
      padding-top: 12pt;
    }
    .footer-note p {
      margin: 0;
      font-size: 10pt;
      line-height: 1.45;
      color: #9fc0df;
    }
    .main {
      width: 550pt;
      height: 405pt;
      box-sizing: border-box;
      padding: 24pt 26pt 18pt 26pt;
      display: flex;
      flex-direction: column;
    }
    .headline {
      margin-bottom: 10pt;
      padding-bottom: 10pt;
      border-bottom: 2pt solid #183557;
    }
    h1 {
      margin: 0 0 8pt 0;
      font-size: 24pt;
      line-height: 1.2;
      color: #ffffff;
    }
    h2 {
      margin: 0;
      font-size: 12pt;
      font-weight: 400;
      color: #76c7ff;
      letter-spacing: 0.4pt;
    }
    .summary {
      margin: 0 0 12pt 0;
      font-size: 12pt;
      line-height: 1.6;
      color: #dfeaff;
    }
    .grid {
      display: flex;
      gap: 12pt;
      flex: 1;
    }
    .panel-left {
      width: 320pt;
      display: flex;
      flex-direction: column;
      gap: 10pt;
    }
    .panel-right {
      width: 188pt;
      display: flex;
      flex-direction: column;
      gap: 10pt;
    }
    .card {
      background: #10243f;
      border-radius: 14pt;
      padding: 12pt 14pt;
      box-sizing: border-box;
      border: 1pt solid #22456e;
    }
    .card-title {
      margin: 0 0 8pt 0;
      font-size: 12pt;
      font-weight: 700;
      color: #2ad4c7;
      text-transform: uppercase;
      letter-spacing: 1pt;
    }
    ul {
      margin: 0;
      padding-left: 18pt;
      font-size: 10.5pt;
      line-height: 1.45;
      color: #e7efff;
    }
    .takeaway {
      background: #1f3d61;
      border-radius: 14pt;
      padding: 14pt;
      box-sizing: border-box;
      border-left: 6pt solid #ffb454;
      flex: 1;
    }
    .takeaway p {
      margin: 0;
      font-size: 11pt;
      line-height: 1.5;
      color: #fff3dd;
    }
    .path {
      background: #0c1a2f;
      border-radius: 12pt;
      padding: 12pt 14pt;
      border: 1pt dashed #356790;
    }
    .path p {
      margin: 0;
      font-size: 10pt;
      line-height: 1.4;
      color: #b9d6f4;
      word-break: break-word;
    }
    .positioning {
      background: #12304f;
      border: 1pt solid #28527f;
      border-radius: 12pt;
      padding: 10pt 12pt;
      margin-bottom: 10pt;
    }
    .positioning-label {
      margin: 0 0 6pt 0;
      font-size: 10pt;
      color: #7bded6;
      letter-spacing: 1.2pt;
      text-transform: uppercase;
      font-weight: 700;
    }
    .positioning-copy {
      margin: 0;
      font-size: 10.8pt;
      line-height: 1.45;
      color: #eef5ff;
    }
    .section-note {
      margin: 0 0 6pt 0;
      font-size: 9pt;
      line-height: 1.35;
      color: #9fc0df;
    }
    .takeaway-label {
      margin: 0 0 8pt 0;
      font-size: 12pt;
      font-weight: 700;
      color: #fff3dd;
      text-transform: uppercase;
      letter-spacing: 1pt;
    }
    .demo {
      background: #10243f;
      border-radius: 14pt;
      padding: 12pt 14pt;
      box-sizing: border-box;
      border: 1pt solid #22456e;
    }
    .demo-title {
      margin: 0 0 6pt 0;
      font-size: 11pt;
      font-weight: 700;
      color: #7bded6;
      text-transform: uppercase;
      letter-spacing: 1pt;
    }
    .demo ol {
      margin: 0;
      padding-left: 16pt;
      font-size: 9.6pt;
      line-height: 1.35;
      color: #dfeaff;
    }
  </style>
</head>
<body>
  <div class="sidebar">
    <div>
      <p class="lab-label">Training Note</p>
      <p class="lab-number">${escapeHtml(item.number)}</p>
      <div class="file-tag">
        <p>${escapeHtml(item.file)}</p>
      </div>
    </div>
    <div class="footer-note">
      <p>GitHub Copilot Lab</p>
      <p>中文实验培训讲稿页</p>
    </div>
  </div>
  <div class="main">
    <div class="headline">
      <h1>${escapeHtml(item.title)}</h1>
      <h2>${escapeHtml(item.subtitle)}</h2>
    </div>
    <div class="positioning">
      <p class="positioning-label">课程定位</p>
      <p class="positioning-copy">${escapeHtml(item.summary)}</p>
    </div>
    <div class="grid">
      <div class="panel-left">
        <div class="card">
          <p class="card-title">建议讲解提纲</p>
          <p class="section-note">建议按以下 3 个重点展开讲解，并结合现场演示说明价值。</p>
          <ul>${bullets}</ul>
        </div>
        <div class="path">
          <p>参考文件</p>
          <p>github-copilot-lab/lab/cn/${escapeHtml(item.file)}</p>
        </div>
      </div>
      <div class="panel-right">
        <div class="takeaway">
          <p class="takeaway-label">讲师提示</p>
          <p>${escapeHtml(item.takeaway)}</p>
        </div>
        <div class="demo">
          <p class="demo-title">演示建议</p>
          <ol>${demoSteps}</ol>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function main() {
  await ensureDir(TMP_DIR);

  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'GitHub Copilot';
  pptx.company = 'GitHub';
  pptx.subject = 'GitHub Copilot Lab 中文文件介绍';
  pptx.title = 'GitHub Copilot Lab 中文文件介绍';
  pptx.lang = 'zh-CN';
  pptx.theme = {
    headFontFace: 'Arial',
    bodyFontFace: 'Arial',
    lang: 'zh-CN'
  };

  for (const item of slides) {
    const htmlPath = path.join(TMP_DIR, `${item.number}-${item.file}.html`);
    await fs.writeFile(htmlPath, slideHtml(item), 'utf8');
    await html2pptx(htmlPath, pptx, { tmpDir: TMP_DIR });
  }

  await pptx.writeFile({ fileName: OUTPUT_FILE });
  console.log(`Created: ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});