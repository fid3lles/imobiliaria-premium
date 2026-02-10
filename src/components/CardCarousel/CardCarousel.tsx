import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function CardCarousel({
  title = "Destaques",
  items = [],
  renderItem,
  className = "",
  cardClassName = "",
  gapClass = "gap-4",
}) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const itemCount = items?.length ?? 0;

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft < maxScrollLeft - 2);
  };

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => updateArrows());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [itemCount]);

  const scrollByCards = (dir) => {
    const el = trackRef.current;
    if (!el) return;

    // Avança ~1 "viewport" menos um pouco, fica natural no desktop
    const amount = Math.floor(el.clientWidth * 0.9) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  // Drag to scroll (desktop)
  const drag = useMemo(() => {
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    const onPointerDown = (e) => {
      const el = trackRef.current;
      if (!el) return;

      isDown = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;

      el.setPointerCapture?.(e.pointerId);
      el.style.scrollBehavior = "auto";
      el.classList.add("cursor-grabbing");
    };

    const onPointerMove = (e) => {
      const el = trackRef.current;
      if (!el || !isDown) return;

      const dx = e.clientX - startX;
      el.scrollLeft = startScroll - dx;
    };

    const onPointerUp = (e) => {
      const el = trackRef.current;
      if (!el) return;

      isDown = false;
      el.releasePointerCapture?.(e.pointerId);
      el.style.scrollBehavior = "";
      el.classList.remove("cursor-grabbing");
      updateArrows();
    };

    return {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    };
  }, []);

  if (!itemCount) return null;

  return (
    <section className={`w-full ${className}`}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Setas só no desktop */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={!canLeft}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-sm transition
              ${
                canLeft ? "hover:bg-gray-50" : "opacity-40 cursor-not-allowed"
              }`}
            aria-label="Voltar"
          >
            <FiChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={!canRight}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-sm transition
              ${
                canRight ? "hover:bg-gray-50" : "opacity-40 cursor-not-allowed"
              }`}
            aria-label="Avançar"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          {...drag}
          className={`
            flex ${gapClass}
            overflow-x-auto scroll-smooth
            snap-x snap-mandatory
            pb-3
            cursor-grab select-none
            [scrollbar-width:none]
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
          `}
          role="region"
          aria-label={`${title} - carrossel`}
        >
          {items.map((item, idx) => (
            <div
              key={item?.id ?? idx}
              className={`
                snap-start
                shrink-0
                w-[80%] sm:w-[60%] md:w-[40%] lg:w-[28%]
                ${cardClassName}
              `}
            >
              {renderItem ? renderItem(item, idx) : <DefaultCard item={item} />}
            </div>
          ))}
        </div>

        {/* Indicadores simples (mobile) */}
        <MobileProgress trackRef={trackRef} />
      </div>
    </section>
  );
}

function DefaultCard({ item }) {
  return (
    <div className="h-full rounded-2xl border bg-white p-4 shadow-sm">
      <div className="text-sm text-gray-500">{item?.tag ?? "Categoria"}</div>
      <div className="mt-1 text-base font-semibold">
        {item?.title ?? "Título do card"}
      </div>
      <p className="mt-2 text-sm text-gray-600 line-clamp-3">
        {item?.description ??
          "Descrição do card. Coloque aqui o conteúdo do seu card."}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium">{item?.price ?? "R$ 0,00"}</span>
        <button className="rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50">
          Ver
        </button>
      </div>
    </div>
  );
}

function MobileProgress({ trackRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max <= 0 ? 0 : el.scrollLeft / max;
      setProgress(clamp(p, 0, 1));
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [trackRef]);

  return (
    <div className="md:hidden mt-1 h-1 w-full rounded-full bg-gray-200">
      <div
        className="h-1 rounded-full bg-gray-900 transition-[width]"
        style={{ width: `${Math.round(progress * 100)}%` }}
      />
    </div>
  );
}
