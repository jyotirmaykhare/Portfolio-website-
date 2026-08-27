import type { Project } from "@/types";

/**
 * Renders an abstract, domain-specific technical diagram for each project.
 * These are illustrative system visualizations (not fake screenshots) —
 * every project gets a distinct visual language matching what it actually is:
 * audio waveforms, market charts, price cards, campus maps, status dots,
 * SQL tables, or a game tile.
 */
export function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  const accent = project.accent;

  switch (project.slug) {
    case "wavebeats":
      return <Waveform accent={accent} className={className} />;
    case "tradescope-pro":
      return <Chart accent={accent} className={className} />;
    case "priceradar":
      return <PriceCards accent={accent} className={className} />;
    case "lpu-navigator":
      return <MapGrid accent={accent} className={className} />;
    case "status-radar":
      return <StatusDots accent={accent} className={className} />;
    case "postgresql-mastery":
      return <Table accent={accent} className={className} />;
    case "game-narcissus":
      return <GameTile accent={accent} className={className} />;
    default:
      return <div className={className} />;
  }
}

function Shell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`glass relative overflow-hidden rounded-2xl ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function Waveform({ accent, className }: { accent: string; className?: string }) {
  const bars = [38, 64, 46, 80, 52, 90, 60, 74, 44, 66, 84, 56, 48, 70, 62, 78, 40, 58];
  return (
    <Shell className={className}>
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
        <span className="font-mono-tag text-[11px] text-[var(--text-faint)]">Now playing</span>
        <span className="font-mono-tag text-[11px]" style={{ color: accent }}>♪ WaveBeats</span>
      </div>
      <div className="flex h-36 items-end justify-between gap-1.5 px-6 py-6">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-1.5 rounded-full"
            style={{
              height: `${h}%`,
              background:
                i % 3 === 0 ? accent : "color-mix(in srgb, var(--text) 22%, transparent)",
              opacity: i % 3 === 0 ? 1 : 0.5,
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2.5 font-mono-tag text-[11px] text-[var(--text-faint)]">
        <span>02:14</span>
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-1 w-4 rounded-full bg-current opacity-60" />
          <i className="h-1 w-8 rounded-full bg-current opacity-40" />
          <i className="h-1 w-5 rounded-full bg-current opacity-60" />
        </span>
        <span>03:42</span>
      </div>
    </Shell>
  );
}

function Chart({ accent, className }: { accent: string; className?: string }) {
  return (
    <Shell className={className}>
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
        <span className="font-mono-tag text-[11px] text-[var(--text-faint)]">NSE · 5D</span>
        <span className="font-mono-tag text-[11px] font-medium" style={{ color: accent }}>▲ +2.4%</span>
      </div>
      <svg viewBox="0 0 220 120" className="h-36 w-full px-4 py-2" aria-hidden="true">
        <defs>
          <linearGradient id="tsg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M4,90 L30,80 L55,85 L82,60 L110,70 L140,42 L170,55 L200,28 L216,20 L216,120 L4,120 Z"
          fill="url(#tsg)"
        />
        <path
          d="M4,90 L30,80 L55,85 L82,60 L110,70 L140,42 L170,55 L200,28 L216,20"
          fill="none"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2.5 font-mono-tag text-[11px] text-[var(--text-faint)]">
        <span>RSI 58 · MACD +</span>
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <i key={i} className="h-3 w-3 rounded-sm border" style={{ borderColor: accent }} />
          ))}
        </span>
      </div>
    </Shell>
  );
}


function PriceCards({ accent, className }: { accent: string; className?: string }) {
  return (
    <Shell className={className}>
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
        <span className="font-mono-tag text-[11px] text-[var(--text-faint)]">Wireless Headphones</span>
        <span className="font-mono-tag text-[11px]" style={{ color: accent }}>Best deal</span>
      </div>
      <div className="grid grid-cols-2 gap-2 p-4">
        {[
          { name: "Amazon", price: "₹9,499" },
          { name: "Flipkart", price: "₹10,799" },
          { name: "Myntra", price: "₹11,200" },
          { name: "Croma", price: "₹9,999" },
        ].map((p, i) => (
          <div
            key={p.name}
            className="rounded-lg border border-[var(--border)] p-2.5"
            style={
              i === 0
                ? { borderColor: accent, background: `color-mix(in srgb, ${accent} 10%, transparent)` }
                : {}
            }
          >
            <p className="text-[11px] text-[var(--text-muted)]">{p.name}</p>
            <p className="font-mono-tag text-sm font-medium text-[var(--text)]">{p.price}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2.5 font-mono-tag text-[11px] text-[var(--text-faint)]">
        <span className="line-through">₹12,999</span>
        <span style={{ color: accent }}>₹9,499 · 27% off</span>
      </div>
    </Shell>
  );
}

function MapGrid({ accent, className }: { accent: string; className?: string }) {
  return (
    <Shell className={className}>
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
        <span className="font-mono-tag text-[11px] text-[var(--text-faint)]">Campus · Route</span>
        <span className="font-mono-tag text-[11px]" style={{ color: accent }}>● 3.2 km</span>
      </div>
      <div className="relative h-36 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-px bg-[var(--border)] p-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded bg-[var(--surface)]" />
          ))}
        </div>
        <svg viewBox="0 0 200 110" className="absolute inset-0 h-full w-full p-3" aria-hidden="true">
          <path
            d="M20,90 C60,80 60,40 100,45 S150,70 180,30"
            fill="none"
            stroke={accent}
            strokeWidth="2.5"
            strokeDasharray="5 4"
            strokeLinecap="round"
          />
          <circle cx="20" cy="90" r="5" fill={accent} />
          <circle cx="180" cy="30" r="5" fill={accent} />
        </svg>
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2.5 font-mono-tag text-[11px] text-[var(--text-faint)]">
        <span>Start → Block B</span>
        <span>12 waypoints</span>
      </div>
    </Shell>
  );
}

function StatusDots({ accent, className }: { accent: string; className?: string }) {
  const statuses = ["ok", "degraded", "ok", "ok", "outage", "ok", "maintenance", "ok", "ok", "degraded"];
  const color: Record<string, string> = {
    ok: accent,
    degraded: "#fbbf24",
    outage: "#f87171",
    maintenance: "#94a3b8",
  };
  return (
    <Shell className={className}>
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
        <span className="font-mono-tag text-[11px] text-[var(--text-faint)]">Infrastructure</span>
        <span className="flex items-center gap-1.5 font-mono-tag text-[11px]" style={{ color: accent }}>
          <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" /> Live
        </span>
      </div>
      <div className="grid grid-cols-5 gap-2 p-4">
        {statuses.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 rounded-lg border border-[var(--border)] p-2">
            <i className="h-2 w-2 rounded-full" style={{ background: color[s] }} />
            <span className="font-mono-tag text-[9px] text-[var(--text-faint)]">#{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2.5 font-mono-tag text-[11px] text-[var(--text-faint)]">
        <span>Up 99.2% · 30s</span>
        <span>2 incidents</span>
      </div>
    </Shell>
  );
}


function Table({ accent, className }: { accent: string; className?: string }) {
  return (
    <Shell className={className}>
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
        <span className="font-mono-tag text-[11px] text-[var(--text-faint)]">Chapter III</span>
        <span className="font-mono-tag text-[11px]" style={{ color: accent }}>SELECT</span>
      </div>
      <div className="px-4 py-3 font-mono-tag text-[11px] leading-relaxed text-[var(--text-muted)]">
        <p style={{ color: accent }}>SELECT id, name, price</p>
        <p>FROM products</p>
        <p>WHERE price {'<'} 1000</p>
        <p style={{ color: "var(--text-faint)" }}>ORDER BY name;</p>
      </div>
      <table className="w-full">
        <tbody>
          {[
            ["1", "WaveHead", "899"],
            ["2", "ArcTech", "749"],
            ["3", "GridSound", "999"],
          ].map((row, i) => (
            <tr key={i} className="border-t border-[var(--border)] font-mono-tag text-[11px]">
              <td className="px-4 py-1.5 text-[var(--text-faint)]">{row[0]}</td>
              <td className="text-[var(--text)]">{row[1]}</td>
              <td className="px-4 text-right text-[var(--text-muted)]">{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Shell>
  );
}

function GameTile({ accent, className }: { accent: string; className?: string }) {
  return (
    <Shell className={className}>
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
        <span className="font-mono-tag text-[11px] text-[var(--text-faint)]">Godot · GDScript</span>
        <span className="font-mono-tag text-[11px]" style={{ color: accent }}>Playing</span>
      </div>
      <div className="grid h-36 grid-cols-3 grid-rows-3 gap-1.5 p-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-[var(--border)]"
            style={
              i === 4
                ? { borderColor: accent, background: `color-mix(in srgb, ${accent} 15%, transparent)` }
                : {}
            }
          />
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2.5 font-mono-tag text-[11px] text-[var(--text-faint)]">
        <span>Scene: Main</span>
        <span style={{ color: accent }}>Narcissus</span>
      </div>
    </Shell>
  );
}

