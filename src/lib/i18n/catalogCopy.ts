/**
 * Locale overlay for the ecosystem catalog (`src/lib/ecosystem.ts`).
 * The catalog itself stays English-canonical; this module localizes the
 * visitor-facing strings (group titles, blurbs, roles, descriptions, statuses)
 * at render time, falling back to English for anything missing.
 */

import { type EcosystemCategory, type EcosystemItem, ecosystemCategories } from "@/lib/ecosystem";
import { useMemo } from "react";
import { useLocale } from "./LocaleProvider";
import type { Locale } from "./locale";

interface CatalogItemCopy {
  readonly role: string;
  readonly description: string;
}

interface CatalogGroupCopy {
  readonly title: string;
  readonly blurb: string;
}

/** Keyed by the canonical English `title` in ecosystem.ts. */
const ITEMS: Readonly<Record<Exclude<Locale, "en">, Readonly<Record<string, CatalogItemCopy>>>> = {
  zh: {
    MolPy: { role: "分子工具包", description: "构建、定型并导出分子体系。" },
    MolPack: { role: "填充工具", description: "把分子填充进模拟盒。" },
    MolNex: { role: "机器学习框架", description: "训练并组合原子间势。" },
    MolExp: { role: "工作流平台", description: "运行实验并追踪每一个产物。" },
    MolVis: { role: "3D 查看器", description: "在浏览器、VS Code 与 Jupyter 中查看、测量、回放。" },
    MolPlot: { role: "绘图库", description: "一份图表定义，同时用于网页与出版。" },
    Atomiverse: { role: "模拟引擎", description: "分子动力学与电子结构，支持 CPU 与 GPU。" },
    MolRs: { role: "计算内核", description: "MolPy 底层的数据结构、文件 I/O 与计算内核。" },
    MolQ: { role: "作业队列", description: "一个提交 API，通用于本地、SLURM、PBS 与 LSF。" },
    MolCfg: { role: "配置层", description: "每个配置值都可追溯来源。" },
    MolLog: { role: "日志层", description: "开箱即用的结构化日志。" },
    MolMCP: { role: "agent 接口", description: "让 AI agent 结构化访问 MolCrafts 的包与文档。" },
    MolHub: { role: "数据集访问", description: "下载基准数据集，上传你自己的。" },
    MolRec: { role: "记录规范", description: "一种格式，让工具互读彼此的输出。" },
  },
  sv: {
    MolPy: {
      role: "molekylverktygslåda",
      description: "Bygger, typar och exporterar molekylära system.",
    },
    MolPack: { role: "packningsverktyg", description: "Packar molekyler i en simuleringsbox." },
    MolNex: { role: "ML-ramverk", description: "Tränar och komponerar interatomära potentialer." },
    MolExp: {
      role: "arbetsflödesplattform",
      description: "Kör experiment och spårar varje artefakt.",
    },
    MolVis: {
      role: "3D-visare",
      description: "Inspektera, mät och spela upp i webbläsaren, VS Code och Jupyter.",
    },
    MolPlot: {
      role: "diagrambibliotek",
      description: "En diagramdefinition, för webb och för tryck.",
    },
    Atomiverse: {
      role: "simuleringsmotor",
      description: "Molekyldynamik och elektronstruktur, på CPU och GPU.",
    },
    MolRs: {
      role: "beräkningskärna",
      description: "Datastrukturer, fil-I/O och beräkningskärnor under MolPy.",
    },
    MolQ: { role: "jobbkö", description: "Ett inlämnings-API för lokalt, SLURM, PBS och LSF." },
    MolCfg: { role: "konfigurationslager", description: "Varje värde spårar var det kom ifrån." },
    MolLog: {
      role: "logglager",
      description: "Strukturerad loggning, redo att användas.",
    },
    MolMCP: {
      role: "agent-API:er",
      description: "Ger AI-agenter strukturerad åtkomst till MolCrafts paket och dokumentation.",
    },
    MolHub: {
      role: "datasetåtkomst",
      description: "Ladda ner referensdataset, ladda upp dina egna.",
    },
    MolRec: {
      role: "postkontrakt",
      description: "Ett format, så att verktyg läser varandras utdata.",
    },
  },
};

/** Keyed by the canonical English group `title`. */
const GROUPS: Readonly<Record<Exclude<Locale, "en">, Readonly<Record<string, CatalogGroupCopy>>>> =
  {
    zh: {
      Application: { title: "应用层", blurb: "你直接调用的部分。" },
      Infrastructure: { title: "基础设施层", blurb: "支撑技术栈的底座。" },
      Specification: { title: "规范层", blurb: "所有层共同遵守的约定。" },
    },
    sv: {
      Application: { title: "Applikation", blurb: "Det du anropar direkt." },
      Infrastructure: { title: "Infrastruktur", blurb: "Det som bär upp stacken." },
      Specification: { title: "Specifikation", blurb: "Det alla lager är överens om." },
    },
  };

/** Keyed by the canonical English `status`. */
const STATUSES: Readonly<Record<Exclude<Locale, "en">, Readonly<Record<string, string>>>> = {
  zh: {
    "In development": "开发中",
    "Preparing release": "准备发布",
  },
  sv: {
    "In development": "Under utveckling",
    "Preparing release": "Förbereder release",
  },
};

function localizeItem(item: EcosystemItem, locale: Locale): EcosystemItem {
  if (locale === "en") return item;
  const copy = ITEMS[locale][item.title];
  const status = item.status ? (STATUSES[locale][item.status] ?? item.status) : undefined;
  return {
    ...item,
    role: copy?.role ?? item.role,
    description: copy?.description ?? item.description,
    ...(status !== undefined && { status }),
  };
}

function localizeCategory(category: EcosystemCategory, locale: Locale): EcosystemCategory {
  if (locale === "en") return category;
  const group = GROUPS[locale][category.title];
  return {
    ...category,
    title: group?.title ?? category.title,
    blurb: group?.blurb ?? category.blurb,
    items: category.items.map((item) => localizeItem(item, locale)),
  };
}

/** The ecosystem catalog in the active locale. English is returned as-is. */
export function useLocalizedEcosystem(): EcosystemCategory[] {
  const { locale } = useLocale();
  return useMemo(
    () => ecosystemCategories.map((category) => localizeCategory(category, locale)),
    [locale],
  );
}
