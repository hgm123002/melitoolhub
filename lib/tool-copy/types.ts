// 工具名称 / 描述 / 分类名的 16 语言文案
// zh 与 en 在 LanguageContext 字典内；这里覆盖其余 16 种语言。

export type ToolEntry = { name: string; desc: string };
export type ToolPack = Record<string, ToolEntry>;
export type CatPack = Record<string, string>;
