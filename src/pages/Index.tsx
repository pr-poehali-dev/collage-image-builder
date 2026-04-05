import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "editor" | "library" | "templates" | "gallery" | "tools" | "export";

interface Layer {
  id: string;
  name: string;
  type: "shape" | "text" | "image" | "group";
  visible: boolean;
  locked: boolean;
  opacity: number;
  grouped?: boolean;
}

const INITIAL_LAYERS: Layer[] = [
  { id: "l1", name: "Фоновый градиент", type: "shape", visible: true, locked: false, opacity: 100 },
  { id: "l2", name: "Группа: Заголовки", type: "group", visible: true, locked: false, opacity: 100, grouped: false },
  { id: "l3", name: "Заголовок", type: "text", visible: true, locked: false, opacity: 100, grouped: true },
  { id: "l4", name: "Подзаголовок", type: "text", visible: true, locked: false, opacity: 90, grouped: true },
  { id: "l5", name: "Круг декоративный", type: "shape", visible: true, locked: true, opacity: 60 },
  { id: "l6", name: "Логотип", type: "image", visible: true, locked: false, opacity: 100 },
];

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "editor", label: "Редактор", icon: "PenTool" },
  { id: "library", label: "Библиотека", icon: "LayoutGrid" },
  { id: "templates", label: "Шаблоны", icon: "Sparkles" },
  { id: "gallery", label: "Галерея", icon: "Images" },
  { id: "tools", label: "Инструменты", icon: "Wrench" },
  { id: "export", label: "Экспорт", icon: "Download" },
];

const TOOL_ITEMS = [
  { icon: "MousePointer2", label: "Выбор" },
  { icon: "Move", label: "Перемещение" },
  { icon: "Square", label: "Прямоугольник" },
  { icon: "Circle", label: "Эллипс" },
  { icon: "Type", label: "Текст" },
  { icon: "Image", label: "Изображение" },
  { icon: "Pen", label: "Перо" },
  { icon: "Hand", label: "Рука" },
  { icon: "ZoomIn", label: "Масштаб" },
];

const LIBRARY_ITEMS = [
  { emoji: "🌅", name: "Закат", category: "Фоны" },
  { emoji: "🌌", name: "Космос", category: "Фоны" },
  { emoji: "🌊", name: "Океан", category: "Фоны" },
  { emoji: "⭐", name: "Звезда", category: "Фигуры" },
  { emoji: "💫", name: "Спираль", category: "Фигуры" },
  { emoji: "🔶", name: "Ромб", category: "Фигуры" },
  { emoji: "🌸", name: "Цветок", category: "Элементы" },
  { emoji: "🏔️", name: "Горы", category: "Природа" },
  { emoji: "🦋", name: "Бабочка", category: "Природа" },
];

const TEMPLATE_ITEMS = [
  { name: "Постер фестиваля", colors: ["#7c3aed", "#06b6d4"], icon: "Music" },
  { name: "Обложка альбома", colors: ["#ec4899", "#f97316"], icon: "Disc3" },
  { name: "Бизнес-карточка", colors: ["#10b981", "#06b6d4"], icon: "CreditCard" },
  { name: "Анонс события", colors: ["#7c3aed", "#ec4899"], icon: "Calendar" },
  { name: "Сторис Instagram", colors: ["#f97316", "#eab308"], icon: "Smartphone" },
  { name: "YouTube превью", colors: ["#ef4444", "#7c3aed"], icon: "Play" },
];

const GALLERY_ITEMS = [
  { name: "Постер лета", date: "02 апр", colors: ["#7c3aed", "#06b6d4"] },
  { name: "Логотип студии", date: "01 апр", colors: ["#ec4899", "#7c3aed"] },
  { name: "Обложка книги", date: "30 мар", colors: ["#10b981", "#06b6d4"] },
  { name: "Баннер акции", date: "29 мар", colors: ["#f97316", "#eab308"] },
];

const FILTER_ITEMS = [
  { name: "Яркость", value: 80, icon: "Sun" },
  { name: "Контраст", value: 65, icon: "Contrast" },
  { name: "Насыщенность", value: 90, icon: "Droplets" },
  { name: "Размытие", value: 20, icon: "Blend" },
];

const EXPORT_FORMATS = [
  { name: "PNG", desc: "Высокое качество, прозрачность", icon: "FileImage", hot: true },
  { name: "JPG", desc: "Сжатый формат, для веба", icon: "FileImage", hot: false },
  { name: "SVG", desc: "Векторный, масштабируемый", icon: "FileCode2", hot: false },
  { name: "PDF", desc: "Для печати", icon: "FileText", hot: false },
  { name: "WebP", desc: "Современный формат", icon: "Globe", hot: false },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("editor");
  const [activeTool, setActiveTool] = useState(0);
  const [layers, setLayers] = useState<Layer[]>(INITIAL_LAYERS);
  const [selectedLayer, setSelectedLayer] = useState<string>("l3");
  const [zoom, setZoom] = useState(100);

  const toggleVisibility = (id: string) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  };
  const toggleLock = (id: string) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, locked: !l.locked } : l));
  };
  const updateOpacity = (id: string, opacity: number) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, opacity } : l));
  };

  const selectedLayerData = layers.find(l => l.id === selectedLayer);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      {/* Top Bar */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-border/50 glass z-10 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(265,90%,65%)] to-[hsl(195,100%,55%)] flex items-center justify-center glow-purple">
            <Icon name="Layers" size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight shimmer-text">CONSTRUCTOR</span>
        </div>

        {/* Nav tabs */}
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`nav-tab flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${activeSection === item.id
                  ? "active text-foreground bg-[rgba(124,58,237,0.12)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
            >
              <Icon name={item.icon} size={15} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all">
            <Icon name="Undo2" size={15} />
          </button>
          <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all">
            <Icon name="Redo2" size={15} />
          </button>
          <div className="w-px h-5 bg-border mx-1" />
          <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-[hsl(265,90%,65%)] to-[hsl(195,100%,55%)] text-white hover:opacity-90 transition-all glow-purple">
            <Icon name="Save" size={14} />
            Сохранить
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ===== EDITOR SECTION ===== */}
        {activeSection === "editor" && (
          <>
            {/* Left toolbar */}
            <aside className="w-14 flex flex-col items-center py-3 gap-1 border-r border-border/50 bg-[hsl(220,18%,9%)] animate-slide-in-left">
              {TOOL_ITEMS.map((tool, i) => (
                <button
                  key={i}
                  title={tool.label}
                  onClick={() => setActiveTool(i)}
                  className={`tool-btn w-10 h-10 rounded-xl flex items-center justify-center transition-all
                    ${activeTool === i ? "active" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Icon name={tool.icon} size={18} />
                </button>
              ))}
              <div className="flex-1" />
              <div className="w-8 h-px bg-border/50 my-1" />
              <button title="Сетка" className="tool-btn w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground">
                <Icon name="Grid3x3" size={18} />
              </button>
              <button title="Линейки" className="tool-btn w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground">
                <Icon name="Ruler" size={18} />
              </button>
            </aside>

            {/* Canvas area */}
            <main className="flex-1 flex flex-col overflow-hidden">
              <div className="h-10 flex items-center justify-between px-4 border-b border-border/30 bg-[rgba(220,18%,9%,0.5)]" style={{ background: "hsl(220 18% 9% / 0.5)" }}>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                  <span>1920 × 1080 px</span>
                  <span>·</span>
                  <span>RGB</span>
                  <span>·</span>
                  <span style={{ color: "hsl(195,100%,55%)" }}>x: 420  y: 320</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setZoom(z => Math.max(25, z - 25))} className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="Minus" size={12} />
                  </button>
                  <span className="text-xs font-mono text-muted-foreground w-12 text-center">{zoom}%</span>
                  <button onClick={() => setZoom(z => Math.min(400, z + 25))} className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="Plus" size={12} />
                  </button>
                </div>
              </div>

              {/* Canvas */}
              <div className="flex-1 overflow-hidden flex items-center justify-center canvas-grid p-8">
                <div
                  className="relative rounded-xl overflow-hidden shadow-2xl animate-scale-in"
                  style={{
                    width: `${Math.round(640 * zoom / 100)}px`,
                    height: `${Math.round(360 * zoom / 100)}px`,
                    background: "linear-gradient(135deg, #0f0825 0%, #1a0a3d 40%, #0d1f3c 100%)",
                    boxShadow: "0 0 60px rgba(124,58,237,0.2), 0 30px 80px rgba(0,0,0,0.6)",
                    transition: "width 0.3s ease, height 0.3s ease",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute top-8 right-12 w-24 h-24 rounded-full opacity-30 animate-float"
                      style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
                    <div className="absolute bottom-12 left-8 w-32 h-32 rounded-full opacity-20 animate-float delay-200"
                      style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }} />
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/4 w-16 h-16 rounded-full opacity-25"
                      style={{ background: "radial-gradient(circle, #ec4899, transparent)" }} />

                    <div className="text-center z-10 animate-fade-in">
                      <div
                        className="font-black tracking-tighter mb-2 shimmer-text"
                        style={{ fontSize: `${Math.round(36 * zoom / 100)}px` }}
                      >
                        CREATIVE STUDIO
                      </div>
                      <div
                        className="text-white/60 font-mono tracking-widest"
                        style={{ fontSize: `${Math.round(12 * zoom / 100)}px` }}
                      >
                        DESIGN · CREATE · INSPIRE
                      </div>
                    </div>

                    <div className="absolute inset-0" style={{
                      backgroundImage: "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)",
                      backgroundSize: "40px 40px"
                    }} />
                  </div>

                  {/* Selection box */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dashed rounded pointer-events-none animate-pulse-glow"
                    style={{
                      borderColor: "hsl(265,90%,65%)",
                      width: `${Math.round(300 * zoom / 100)}px`,
                      height: `${Math.round(80 * zoom / 100)}px`,
                      transition: "width 0.3s ease, height 0.3s ease",
                    }}
                  />
                </div>
              </div>
            </main>

            {/* Right panel: Layers */}
            <aside className="w-72 flex flex-col border-l border-border/50 bg-[hsl(220,18%,9%)] animate-slide-in-right">
              <div className="p-3 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="Layers" size={15} style={{ color: "hsl(265,90%,65%)" }} />
                  <span className="text-sm font-semibold">Слои</span>
                  <span className="text-xs text-muted-foreground bg-secondary rounded-full px-2 py-0.5">{layers.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button title="Добавить слой" className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all">
                    <Icon name="Plus" size={14} />
                  </button>
                  <button title="Группировать" className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all">
                    <Icon name="FolderPlus" size={14} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-1">
                {layers.map((layer, i) => (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayer(layer.id)}
                    className={`layer-item flex items-center gap-2 px-3 py-2 cursor-pointer
                      ${layer.grouped ? "pl-7" : ""}
                      ${selectedLayer === layer.id ? "active" : ""}`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        color: layer.type === "group" ? "hsl(195,100%,55%)" :
                          layer.type === "text" ? "hsl(265,90%,65%)" :
                          layer.type === "image" ? "hsl(145,90%,55%)" : "hsl(320,90%,65%)"
                      }}>
                      <Icon
                        name={layer.type === "group" ? "Folder" : layer.type === "text" ? "Type" : layer.type === "image" ? "ImageIcon" : "Square"}
                        size={13}
                      />
                    </div>

                    <span className={`flex-1 text-xs truncate ${!layer.visible ? "opacity-40 line-through" : ""} ${layer.locked ? "text-muted-foreground" : ""}`}>
                      {layer.name}
                    </span>

                    <div className="flex items-center gap-1" style={{ opacity: selectedLayer === layer.id ? 1 : 0.4 }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleVisibility(layer.id); }}
                        className="w-5 h-5 rounded flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <Icon name={layer.visible ? "Eye" : "EyeOff"} size={11} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleLock(layer.id); }}
                        className="w-5 h-5 rounded flex items-center justify-center transition-colors"
                        style={{ color: layer.locked ? "hsl(320,90%,65%)" : undefined }}
                      >
                        <Icon name={layer.locked ? "Lock" : "Unlock"} size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Layer properties */}
              {selectedLayerData && (
                <div className="border-t border-border/50 p-3 animate-fade-in">
                  <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Свойства слоя</div>
                  <div className="text-sm font-medium mb-3 text-foreground">{selectedLayerData.name}</div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Прозрачность</span>
                      <span className="text-xs font-mono" style={{ color: "hsl(195,100%,55%)" }}>{selectedLayerData.opacity}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={selectedLayerData.opacity}
                      onChange={(e) => updateOpacity(selectedLayerData.id, parseInt(e.target.value))}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, hsl(265,90%,65%) 0%, hsl(195,100%,55%) ${selectedLayerData.opacity}%, hsl(220,15%,16%) ${selectedLayerData.opacity}%)`,
                      }}
                    />
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 h-7 text-xs rounded-md bg-secondary hover:bg-[rgba(124,58,237,0.2)] text-muted-foreground hover:text-foreground transition-all">
                      Дублировать
                    </button>
                    <button className="flex-1 h-7 text-xs rounded-md bg-secondary hover:bg-[rgba(239,68,68,0.15)] text-muted-foreground hover:text-red-400 transition-all">
                      Удалить
                    </button>
                  </div>
                </div>
              )}
            </aside>
          </>
        )}

        {/* ===== LIBRARY SECTION ===== */}
        {activeSection === "library" && (
          <div className="flex-1 p-6 animate-fade-in overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Библиотека</h2>
                  <p className="text-sm text-muted-foreground">Готовые элементы для вашей композиции</p>
                </div>
                <div className="flex items-center gap-2 bg-secondary/50 rounded-xl px-3 py-2">
                  <Icon name="Search" size={15} className="text-muted-foreground" />
                  <input className="bg-transparent text-sm outline-none w-40 placeholder:text-muted-foreground" placeholder="Поиск элементов..." />
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                {["Все", "Фоны", "Фигуры", "Элементы", "Природа"].map((cat, i) => (
                  <button key={cat} className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                    style={i === 0
                      ? { background: "linear-gradient(to right, hsl(265,90%,65%), hsl(195,100%,55%))", color: "white" }
                      : {}
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {LIBRARY_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="gradient-border rounded-xl p-4 cursor-pointer hover:glow-purple transition-all group animate-scale-in"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <div className="text-4xl mb-3 group-hover:animate-float">{item.emoji}</div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.category}</div>
                    <button className="mt-3 w-full h-7 text-xs rounded-lg bg-secondary/80 text-muted-foreground hover:text-foreground transition-all opacity-0 group-hover:opacity-100">
                      Добавить на холст
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== TEMPLATES SECTION ===== */}
        {activeSection === "templates" && (
          <div className="flex-1 p-6 animate-fade-in overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">Шаблоны</h2>
                <p className="text-sm text-muted-foreground">Начните с готовой композиции</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {TEMPLATE_ITEMS.map((tmpl, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all group animate-scale-in"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div
                      className="h-40 flex items-center justify-center relative"
                      style={{ background: `linear-gradient(135deg, ${tmpl.colors[0]}, ${tmpl.colors[1]})` }}
                    >
                      <Icon name={tmpl.icon} size={40} className="text-white/80 group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-all"
                        style={{ background: "rgba(0,0,0,0.1)" }}>
                        <span className="text-xs text-white font-medium px-3 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.4)" }}>Использовать</span>
                      </div>
                    </div>
                    <div className="p-3 bg-[hsl(220,15%,12%)] border border-border/50">
                      <div className="text-sm font-medium">{tmpl.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">6 слоёв · 1920×1080</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== GALLERY SECTION ===== */}
        {activeSection === "gallery" && (
          <div className="flex-1 p-6 animate-fade-in overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Галерея</h2>
                  <p className="text-sm text-muted-foreground">Ваши сохранённые работы</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all"
                  style={{ background: "linear-gradient(to right, hsl(265,90%,65%), hsl(195,100%,55%))" }}>
                  <Icon name="Plus" size={16} />
                  Новый проект
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {GALLERY_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden border border-border/50 cursor-pointer transition-all group animate-fade-in"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div
                      className="h-48 flex items-center justify-center relative"
                      style={{ background: `linear-gradient(135deg, ${item.colors[0]}40, ${item.colors[1]}40)` }}
                    >
                      <div className="w-16 h-16 rounded-2xl opacity-60"
                        style={{ background: `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})` }} />
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-white hover:opacity-80 transition-all"
                          style={{ background: "rgba(0,0,0,0.5)" }}>
                          <Icon name="Edit3" size={12} />
                        </button>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-white hover:opacity-80 transition-all"
                          style={{ background: "rgba(0,0,0,0.5)" }}>
                          <Icon name="Trash2" size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="p-3 bg-[hsl(220,15%,12%)]">
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== TOOLS SECTION ===== */}
        {activeSection === "tools" && (
          <div className="flex-1 p-6 animate-fade-in overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">Инструменты</h2>
                <p className="text-sm text-muted-foreground">Фильтры, трансформация и эффекты</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="gradient-border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Sliders" size={16} style={{ color: "hsl(265,90%,65%)" }} />
                    <span className="text-sm font-semibold">Цветокоррекция</span>
                  </div>
                  <div className="space-y-4">
                    {FILTER_ITEMS.map((filter, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">{filter.name}</span>
                          <span className="text-xs font-mono" style={{ color: "hsl(195,100%,55%)" }}>{filter.value}</span>
                        </div>
                        <input type="range" min={0} max={100} defaultValue={filter.value}
                          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                          style={{ background: `linear-gradient(to right, hsl(265,90%,65%) ${filter.value}%, hsl(220,15%,16%) ${filter.value}%)` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="gradient-border rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="RotateCcw" size={16} style={{ color: "hsl(195,100%,55%)" }} />
                    <span className="text-sm font-semibold">Трансформация</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "X", value: "420" },
                      { label: "Y", value: "320" },
                      { label: "W", value: "300" },
                      { label: "H", value: "80" },
                      { label: "Поворот", value: "0°" },
                      { label: "Масштаб", value: "100%" },
                    ].map((field, i) => (
                      <div key={i} className="bg-secondary/50 rounded-lg p-2">
                        <div className="text-xs text-muted-foreground mb-1">{field.label}</div>
                        <div className="text-sm font-mono text-foreground">{field.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 h-8 text-xs rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-all flex items-center justify-center gap-1">
                      <Icon name="FlipHorizontal" size={12} /> По гориз.
                    </button>
                    <button className="flex-1 h-8 text-xs rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-all flex items-center justify-center gap-1">
                      <Icon name="FlipVertical" size={12} /> По верт.
                    </button>
                  </div>
                </div>

                <div className="gradient-border rounded-xl p-4 col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Sparkles" size={16} style={{ color: "hsl(320,90%,65%)" }} />
                    <span className="text-sm font-semibold">Эффекты</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {["Тень", "Свечение", "Блюр", "Хроматика", "Виньетка", "Шум", "Пикселизация", "Рельеф"].map((effect, i) => (
                      <button key={i} className="h-16 rounded-xl bg-secondary/50 border border-border/50 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                        {effect}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== EXPORT SECTION ===== */}
        {activeSection === "export" && (
          <div className="flex-1 p-6 animate-fade-in overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">Экспорт</h2>
                <p className="text-sm text-muted-foreground">Сохраните изображение в нужном формате</p>
              </div>

              <div className="rounded-xl overflow-hidden mb-6 border border-border/50">
                <div className="h-32 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #0f0825 0%, #1a0a3d 40%, #0d1f3c 100%)" }}>
                  <span className="text-xl font-black shimmer-text">CREATIVE STUDIO</span>
                </div>
                <div className="p-3 bg-[hsl(220,15%,12%)] flex items-center justify-between">
                  <div className="text-sm text-muted-foreground font-mono">1920 × 1080 px · 72 dpi</div>
                  <div className="text-xs" style={{ color: "hsl(145,90%,55%)" }}>● Готово к экспорту</div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {EXPORT_FORMATS.map((fmt, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all animate-fade-in"
                    style={{
                      animationDelay: `${i * 0.07}s`,
                      borderColor: i === 0 ? "rgba(124,58,237,0.5)" : undefined,
                      background: i === 0 ? "rgba(124,58,237,0.08)" : "hsl(220,15%,12%)",
                    }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: i === 0 ? "rgba(124,58,237,0.2)" : "hsl(220,15%,16%)" }}>
                      <Icon name={fmt.icon} size={18} style={{ color: i === 0 ? "hsl(265,90%,65%)" : undefined }} className={i !== 0 ? "text-muted-foreground" : ""} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{fmt.name}</span>
                        {fmt.hot && (
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(124,58,237,0.2)", color: "hsl(265,90%,65%)" }}>
                            Рекомендуем
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">{fmt.desc}</div>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: i === 0 ? "hsl(265,90%,65%)" : undefined }}>
                      {i === 0 && <div className="w-2 h-2 rounded-full" style={{ background: "hsl(265,90%,65%)" }} />}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full h-12 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-all glow-purple flex items-center justify-center gap-3"
                style={{ background: "linear-gradient(to right, hsl(265,90%,65%), hsl(195,100%,55%))" }}>
                <Icon name="Download" size={18} />
                Скачать PNG · 1920×1080
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <footer className="h-7 flex items-center justify-between px-4 border-t border-border/30" style={{ background: "hsl(220 18% 9% / 0.5)" }}>
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "hsl(145,90%,55%)" }} />
            Готов
          </span>
          <span>·</span>
          <span>{layers.length} слоёв</span>
          <span>·</span>
          <span>Инструмент: {TOOL_ITEMS[activeTool]?.label}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
          <span>Холст: 1920×1080</span>
          <span>·</span>
          <span>{zoom}%</span>
          <span>·</span>
          <span style={{ color: "hsl(265,90%,65%)" }}>CONSTRUCTOR v1.0</span>
        </div>
      </footer>
    </div>
  );
}
