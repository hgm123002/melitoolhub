export default function ToolsSection() {
  const tools = [
    { title: "选品分析", desc: "挖掘热门搜索关键词" },
    { title: "费用计算", desc: "核算物流与平台成本" },
    { title: "汇率换算", desc: "实时外币换算参考" },
    { title: "Listing优化", desc: "标题五点描述优化工具" },
    { title: "物流运费", desc: "多渠道运费预估对比" },
    { title: "数据处理", desc: "批量处理和分析数据" },
  ];

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl text-[#f59e0b] text-center mb-10">工具分类</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((item, idx) => (
            <div key={idx} className="bg-slate-800 p-6 rounded-xl">
              <h3 className="text-white text-xl mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}