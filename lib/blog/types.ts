// 博客文章多语言文案：id 1–20，title + summary
// 说明：文章正文仍为英文（诚实回退）；此处保证列表与详情页的标题、摘要在对应语言下显示母语。

export type BlogEntry = { title: string; summary: string };
export type BlogPack = Record<string, BlogEntry>;
