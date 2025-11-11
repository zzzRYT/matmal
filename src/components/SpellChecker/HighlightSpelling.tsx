import React, { useRef, useEffect } from 'react';

type Highlight = { start: number; end: number; id?: string; meta?: unknown };

interface Props {
  value: string;
  onChange?: (v: string) => void;
  highlights?: Highlight[];
  onClickHighlight?: (h: Highlight) => void;
  className?: string;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default function HighlightSpelling({
  value,
  onChange,
  highlights = [],
  onClickHighlight,
  className = '',
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const preRef = useRef<HTMLDivElement | null>(null);
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  const highlightedHtml = React.useMemo(() => {
    if (!highlights || highlights.length === 0) return escapeHtml(value);
    const sorted = [...highlights].sort(
      (a, b) => (a.start ?? 0) - (b.start ?? 0)
    );
    let out = '';
    let idx = 0;
    for (const h of sorted) {
      const start = h.start ?? 0;
      const end = h.end ?? start;
      if (start > idx) out += escapeHtml(value.slice(idx, start));
      const frag = escapeHtml(value.slice(start, end));
      out += `<span data-highlight-id="${
        h.id ?? ''
      }" class="bg-yellow-200/80">${frag}</span>`;
      idx = end;
    }
    if (idx < value.length) out += escapeHtml(value.slice(idx));
    return out;
  }, [value, highlights]);

  useEffect(() => {
    const ta = taRef.current;
    const pre = preRef.current;
    if (!ta || !pre) return;

    const syncScroll = () => {
      pre.scrollTop = ta.scrollTop;
      pre.scrollLeft = ta.scrollLeft;
    };
    ta.addEventListener('scroll', syncScroll);
    return () => ta.removeEventListener('scroll', syncScroll);
  }, []);

  useEffect(() => {
    // if in overlay mode (onChange exists) we update innerHTML for underlay
    if (onChange && preRef.current) {
      preRef.current.innerHTML = highlightedHtml;
    }
  }, [highlightedHtml, onChange]);

  const handleClick = (e: React.MouseEvent) => {
    if (!onClickHighlight) return;
    const target = e.target as HTMLElement;
    const span = target.closest(
      'span[data-highlight-id]'
    ) as HTMLElement | null;
    if (span && span.dataset.highlightId) {
      const id = span.dataset.highlightId;
      const h = highlights.find((x) => (x.id ?? '') === id);
      if (h) onClickHighlight(h);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {onChange ? (
        <>
          <div
            ref={preRef}
            onClick={handleClick}
            aria-hidden
            className="whitespace-pre-wrap wrap-break-word text-black/80 pointer-events-auto"
            style={{
              position: 'absolute',
              inset: 0,
              padding: '0.75rem',
              overflow: 'hidden',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          />
          <textarea
            ref={taRef}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            className="relative bg-transparent w-full h-full resize-none"
            style={{
              color: 'transparent',
              caretColor: 'black',
              padding: '0.75rem',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap',
            }}
            onCompositionStart={() => {}}
            onCompositionEnd={() => {}}
          />
        </>
      ) : (
        <div
          className="w-full h-full overflow-auto whitespace-pre-wrap wrap-break-word text-black/80"
          style={{ padding: '0.75rem', lineHeight: '1.5' }}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            const span = target.closest(
              '[data-highlight-id]'
            ) as HTMLElement | null;
            if (span && span.dataset.highlightId) {
              const id = span.dataset.highlightId;
              const h = highlights.find((x) => (x.id ?? '') === id);
              if (h && onClickHighlight) onClickHighlight(h);
            }
          }}
        >
          {(() => {
            if (!highlights || highlights.length === 0) return value;
            const sorted = [...highlights].sort(
              (a, b) => (a.start ?? 0) - (b.start ?? 0)
            );
            const nodes: React.ReactNode[] = [];
            let idx = 0;
            sorted.forEach((h) => {
              const start = h.start ?? 0;
              const end = h.end ?? start;
              if (start > idx)
                nodes.push(
                  <span key={`plain-${idx}-${start}`} className="text-black">
                    {value.slice(idx, start)}
                  </span>
                );
              nodes.push(
                <span
                  key={`hl-${h.id ?? `${start}-${end}`}`}
                  data-highlight-id={h.id ?? `${start}-${end}`}
                  className="bg-yellow-200/80 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter' || ev.key === ' ') {
                      ev.preventDefault();
                      if (onClickHighlight) onClickHighlight(h);
                    }
                  }}
                >
                  {value.slice(start, end)}
                </span>
              );
              idx = end;
            });
            if (idx < value.length)
              nodes.push(
                <span key={`plain-last-${idx}`}>{value.slice(idx)}</span>
              );
            return nodes;
          })()}
        </div>
      )}
    </div>
  );
}
