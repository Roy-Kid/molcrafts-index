import { APPROVED_APPLICATIONS_HEADING } from "./applications";
import { APPROVED_ASSIST_COPY } from "./assist";
import { APPROVED_COLLABORATION_COPY } from "./collaboration";
import { APPROVED_FOUNDATION_COPY_ZH } from "./foundation";
import type { HomeCopy } from "./types";

/** Simplified Chinese is the primary voice of the commercial homepage. */
export const zh: HomeCopy = {
  sectionLabels: {
    hero: "首页",
    about: "根基",
    solutions: "能力",
    assist: "AI",
    applications: "应用",
    collaboration: "合作",
    trust: "支持",
  },
  brandHero: {
    kicker: "塑造 AI 时代的分子模拟",
    title: "MolCrafts",
    subtitle: "我们为分子科学构建 AI 辅助基础设施。",
  },
  hero: {
    title: "让复杂分子研究",
    accent: "走向可用的答案。",
    subtitle:
      "MolCrafts 将科学计算、AI 与研发经验带进真实问题：从材料性质预测到模拟研究，再到长期技术合作。",
    primaryCta: "查看应用",
    secondaryCta: "讨论合作",
    scrollHint: "继续了解",
  },
  approach: APPROVED_FOUNDATION_COPY_ZH,
  whatWeDo: {
    title: "把研究难题，变成可以推进的工作。",
    lead: "根据问题选择方法，把模拟、预测与研发协作连成一条清晰路径。",
    pillars: [
      {
        title: "分子与材料模拟",
        body: "围绕结构、行为与性质，建立适合研究问题的计算路径。",
      },
      {
        title: "AI 驱动的预测",
        body: "把数据、模型与科学判断放在一起，支持材料筛选与性质研究。",
      },
      {
        title: "定制研发协作",
        body: "从方法验证到工作方式落地，与团队共同推进长期课题。",
      },
    ],
  },
  assist: APPROVED_ASSIST_COPY,
  projects: {
    ...APPROVED_APPLICATIONS_HEADING,
    cta: "了解详情",
    stageLabel: "MolCrafts 应用",
    items: {
      molpy: {
        applicationTitle: "体系构建",
        short: "构建并定型分子体系",
        long: "把一个结构变成引擎可以直接运行的定型体系，运行之前先看清楚。",
      },
      molpack: {
        applicationTitle: "装填准备",
        short: "把分子装进模拟盒",
        long: "按你指定的组成填满盒子，每一次运行都得到相同的结果。",
      },
      molvis: {
        applicationTitle: "可视检查",
        short: "查看结构与轨迹",
        long: "在浏览器、编辑器或 notebook 里查看一个结构，或者一整条轨迹。",
      },
      molexp: {
        applicationTitle: "实验追踪",
        short: "运行并追踪实验",
        long: "把流程描述一次就可以运行，每个输入与结果都留在它名下。",
      },
      molnex: {
        applicationTitle: "势函数训练",
        short: "训练并组合势函数",
        long: "用你自己的数据训练势函数，再与你已经信任的物理组合起来。",
      },
      atomiverse: {
        applicationTitle: "模拟运行",
        short: "运行动力学与电子结构",
        long: "通过同一个接口触及分子动力学与电子结构，在 CPU 与 GPU 上运行。",
      },
    },
  },
  participate: APPROVED_COLLABORATION_COPY,
  sponsors: {
    title: "赞助者",
    lead: "感谢下列开源计划与 MolCrafts 同行。",
  },
  footer: {
    tagline: "为分子与材料研发，做能真正进入现场的科学计算。",
    github: "GitHub",
    credit: "Built with ❤️",
    backToTop: "回到顶部",
  },
};
