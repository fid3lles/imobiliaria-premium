import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow bg-linear-to-r from-[#64080F] via-[#91040F] via-[#9A030F] to-[#C20010]">
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
        <a href="/" className="flex items-center h-full w-25">
          <img
            src="../../../../public/assets/logo_premium.png"
            alt="Premium imobiliária Logo"
            className=" object-contain h-100"
          />
        </a>

        <nav className="hidden md:flex gap-6 text-sm uppercase text-[#FCE257] font-semibold">
          <a
            href="#"
            className="hover:drop-shadow-[0_0_6px_rgba(255,214,214,0.6)]"
          >
            Comprar
          </a>
          <a
            href="#"
            className="hover:drop-shadow-[0_0_6px_rgba(255,214,214,0.6)]"
          >
            Alugar
          </a>
          <a
            href="#"
            className="hover:drop-shadow-[0_0_6px_rgba(255,214,214,0.6)]"
          >
            Anunciar meu imóvel
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="text-[#FCE257] md:mr-0 mr-6 cursor-pointer"
        >
          {!open ? <FiMenu size={28} /> : <RxCross2 size={28} />}
        </button>
      </div>

      {open && (
        <div className="bg-[#64080F] text-white px-4 py-4 space-y-3 shadow-lg">
          <a className="block" href="#">
            Comprar
          </a>
          <a className="block" href="#">
            Alugar
          </a>
          <a className="block" href="#">
            Anunciar meu imóvel
          </a>
        </div>
      )}
    </header>
  );
}
