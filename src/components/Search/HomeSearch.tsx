import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

const TABS = [
  { key: "comprar", label: "Comprar" },
  { key: "alugar", label: "Alugar" },
  { key: "lancamentos", label: "Lançamentos" },
];

export default function HomeSearch({
  tipos = ["Apartamento", "Casa", "Sobrado", "Terreno"],
  cidades = ["Todas", "Santo André", "São Bernardo", "Mauá"],
  bairros = ["Jardim", "Campestre", "Centro", "Vila Assunção"],
  onSearch,
  onSearchByCode,
}) {
  const [tab, setTab] = useState("comprar");

  const [form, setForm] = useState({
    tipo: "",
    cidade: "Todas",
    bairro: "",
    quartos: "",
    valorMin: "",
    valorMax: "",
    condominio: false,
    codigo: "",
  });

  const isCodeMode = useMemo(
    () => form.codigo.trim().length > 0,
    [form.codigo]
  );

  function handleChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch?.({ tab, ...form });
  }

  function handleSubmitCode(e) {
    e.preventDefault();
    onSearchByCode?.(form.codigo.trim());
  }

  return (
    <div className="md:min-w-[50%]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl bg-white/95 shadow-xl ring-1 ring-black/5 backdrop-blur">
          {/* Tabs */}
          <div className="flex gap-2 p-3">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={[
                  "flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition",
                  tab === t.key
                    ? "bg-[#64080F] text-white shadow"
                    : "bg-black/5 text-black/70 hover:bg-black/10",
                ].join(" ")}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 pt-2">
            <div className="grid gap-3 md:grid-cols-12">
              {/* Tipo */}
              <div className="md:col-span-4">
                <label className="text-xs font-semibold text-black/70">
                  Tipo
                </label>
                <select
                  value={form.tipo}
                  onChange={(e) => handleChange("tipo", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#C20010]/40"
                >
                  <option value="">Todos</option>
                  {tipos.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cidade */}
              <div className="md:col-span-4">
                <label className="text-xs font-semibold text-black/70">
                  Cidade
                </label>
                <select
                  value={form.cidade}
                  onChange={(e) => handleChange("cidade", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#C20010]/40"
                >
                  {cidades.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bairros */}
              <div className="md:col-span-4">
                <label className="text-xs font-semibold text-black/70">
                  Bairros
                </label>
                <select
                  value={form.bairro}
                  onChange={(e) => handleChange("bairro", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#C20010]/40"
                >
                  <option value="">Todos</option>
                  {bairros.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quartos */}
              <div className="md:col-span-4">
                <label className="text-xs font-semibold text-black/70">
                  Quartos
                </label>
                <select
                  value={form.quartos}
                  onChange={(e) => handleChange("quartos", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#C20010]/40"
                >
                  <option value="">Quartos</option>
                  <option value="1">1 Quarto</option>
                  <option value="2">2 Quartos</option>
                  <option value="3">3 Quartos</option>
                  <option value="4+">4+ Quartos</option>
                </select>
              </div>

              {/* Valor */}
              <div className="md:col-start-5 md:col-end-13">
                <label className="text-xs font-semibold text-black/70">
                  Valor
                </label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <input
                    value={form.valorMin}
                    onChange={(e) => handleChange("valorMin", e.target.value)}
                    placeholder="Mín"
                    inputMode="numeric"
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#C20010]/40"
                  />
                  <input
                    value={form.valorMax}
                    onChange={(e) => handleChange("valorMax", e.target.value)}
                    placeholder="Máx"
                    inputMode="numeric"
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#C20010]/40"
                  />
                </div>
              </div>

              {/* Buscar imóveis */}
              <div className="md:col-span-5 flex items-end">
                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C20010] px-4 py-3 text-sm font-semibold text-white shadow hover:brightness-110 transition"
                >
                  <FiSearch />
                  Buscar imóveis
                </button>
              </div>
            </div>

            {/* Buscar por código */}
            <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center">
              <input
                value={form.codigo}
                onChange={(e) => handleChange("codigo", e.target.value)}
                placeholder="Buscar por código"
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#C20010]/40"
              />

              <button
                type="button"
                onClick={handleSubmitCode}
                disabled={!isCodeMode}
                className="w-full md:w-auto rounded-xl bg-black/80 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50 hover:bg-black transition"
              >
                Buscar por código
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
