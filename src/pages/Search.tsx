import { useState } from "react";
import FiltersPanel from "../components/Results/FiltersPanel/FiltersPanel";
import PropertyResultsGrid from "../components/Results/PropertyList/PropertyResultGrid";

function Search() {
  const [searchResult, setSearchResult] = useState<any>(null);

  // ✅ página atual (0-based) — vem do backend em searchResult.number
  const [page, setPage] = useState(0);

  // ✅ recebe o retorno da busca e sincroniza a página
  function handleResult(data: any) {
    setSearchResult(data);
    setPage(data?.number ?? 0);
  }

  return (
    <div className="flex">
      {/* ✅ FiltersPanel vai buscar quando externalPage mudar */}
      <FiltersPanel onResult={handleResult} externalPage={page} />

      <section className="px-6 py-8 w-full">
        <h1 className="text-2xl font-bold mb-6 text-zinc-900">
          Resultados da busca
        </h1>

        <PropertyResultsGrid
          data={
            searchResult ?? {
              content: [],
              empty: true,
              first: true,
              last: true,
              number: 0,
              numberOfElements: 0,
              size: 0,
              totalElements: 0,
              totalPages: 0,
            }
          }
          onCardClick={(imovel) => console.log("clicou", imovel.id)}
          // ✅ AQUI: paginação dispara troca de página
          onPageChange={(nextPage) => {
            // evita negativo e evita passar do totalPages quando já existe resultado
            if (nextPage < 0) return;
            if (
              searchResult?.totalPages != null &&
              nextPage > searchResult.totalPages - 1
            )
              return;

            setPage(nextPage);
            // o fetch acontece dentro do FiltersPanel via externalPage effect
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </section>
    </div>
  );
}

export default Search;
