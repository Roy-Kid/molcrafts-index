import type { HomeCopy } from "./types";

/**
 * Foundation screen (01) copy. English is the approved source; Chinese and
 * Swedish keep the same hierarchy and claims, said idiomatically. MolCrafts
 * stays untranslated. Banned on this screen: compound, FAIR, reproducible,
 * legacy-free, and the common-ground metaphor.
 */
export const APPROVED_FOUNDATION_COPY = {
  title: "An open-source ecosystem",
  accent: "for molecular science.",
  lead: "A shared scientific foundation where scientists, builders, and AI agents work together.",
  statements: [
    { line: "Built from the ground up.", emphasis: "from the ground up" },
    { line: "Designed for sustainable research.", emphasis: "sustainable research" },
    { line: "AI-assisted throughout.", emphasis: "AI-assisted" },
  ],
  vision:
    "Our vision is for MolCrafts to become the foundation for building, sharing, and advancing molecular and materials science — by people and AI.",
} as const satisfies HomeCopy["approach"];

export const APPROVED_FOUNDATION_COPY_ZH = {
  title: "一个开源生态系统",
  accent: "面向分子科学。",
  lead: "共享的科学根基，让科学家、构建者与 AI 智能体一同工作。",
  statements: [
    { line: "从根基建起。", emphasis: "根基" },
    { line: "为可持续研究而设计。", emphasis: "可持续研究" },
    { line: "全程 AI 辅助。", emphasis: "AI 辅助" },
  ],
  vision:
    "我们的愿景，是让 MolCrafts 成为构建、共享并推进分子与材料科学的根基 —— 由人与 AI 共同完成。",
} as const satisfies HomeCopy["approach"];

export const APPROVED_FOUNDATION_COPY_SV = {
  title: "Ett open source-ekosystem",
  accent: "för molekylär vetenskap.",
  lead: "En gemensam vetenskaplig grund där forskare, utvecklare och AI-agenter arbetar tillsammans.",
  statements: [
    { line: "Byggt från grunden.", emphasis: "från grunden" },
    { line: "Utformat för hållbar forskning.", emphasis: "hållbar forskning" },
    { line: "AI-assisterat genomgående.", emphasis: "AI-assisterat" },
  ],
  vision:
    "Vår vision är att MolCrafts ska bli grunden för att bygga, dela och föra fram molekyl- och materialvetenskap — av människor och AI.",
} as const satisfies HomeCopy["approach"];
