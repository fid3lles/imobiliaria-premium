import { FaBed, FaBath, FaCar, FaRulerCombined } from "react-icons/fa";

export type Property = {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  area: number;
  imageUrl: string;
  code: string;
};

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-zinc-200 overflow-hidden">
      <img
        src={property.imageUrl}
        alt={property.title}
        className="w-full h-70 object-cover"
      />

      <div className="p-4">
        <div className="text-sm text-zinc-500 mb-1">
          Código: {property.code}
        </div>

        <h3 className="text-lg font-bold text-zinc-900">{property.title}</h3>

        <div className="mt-1 text-xl font-extrabold text-zinc-900">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(property.price)}
        </div>

        {/* Ícones */}
        <div className="mt-3 flex gap-4 text-sm text-zinc-700">
          <div className="flex items-center gap-1">
            <FaBed className="text-zinc-500" />
            <span>{property.bedrooms}</span>
          </div>

          <div className="flex items-center gap-1">
            <FaBath className="text-zinc-500" />
            <span>{property.bathrooms}</span>
          </div>

          <div className="flex items-center gap-1">
            <FaCar className="text-zinc-500" />
            <span>{property.parking}</span>
          </div>

          <div className="flex items-center gap-1">
            <FaRulerCombined className="text-zinc-500" />
            <span>{property.area} m²</span>
          </div>
        </div>

        <button className="mt-4 w-full bg-[#64080F] text-white text-sm font-semibold py-2 rounded-md hover:opacity-95">
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}
