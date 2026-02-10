import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiYoutube,
  FiLinkedin,
  FiFacebook,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a href={href} className="text-sm text-white/80 hover:text-white transition">
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-[#0f0f10] text-white w-full">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4 flex flex-col">
          <img
            src="../../../../public/assets/logo_premium.png"
            alt="Imobiliária Premium"
            className="h-25 object-contain"
          />
          <p className="text-sm text-white/80">
            Especialista em imóveis à venda e para alugar na região de São
            Paulo!
          </p>
        </div>

        {/* Coluna 1 */}
        <div className="space-y-3">
          <h3 className="font-semibold">A Imobiliária Premium</h3>
          <div className="flex flex-col gap-2">
            <FooterLink href="/quem-somos">Quem Somos</FooterLink>
            <FooterLink href="/contato">Fale Conosco</FooterLink>
            <FooterLink href="/equipe">Nossa equipe</FooterLink>
            <FooterLink href="/documentos">Documentos</FooterLink>
            <FooterLink href="/politica-de-privacidade">
              Política de Privacidade
            </FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
          </div>
        </div>

        {/* Coluna 2 */}
        <div className="space-y-3">
          <h3 className="font-semibold">Imóveis</h3>
          <div className="flex flex-col gap-2">
            <FooterLink href="/comprar">Imóveis para comprar</FooterLink>
            <FooterLink href="/alugar">Imóveis para alugar</FooterLink>
            <FooterLink href="/lancamentos">Lançamentos</FooterLink>
            <FooterLink href="/condominios">Condomínios</FooterLink>
            <FooterLink href="/anunciar">Anunciar seu imóvel</FooterLink>
            <FooterLink href="/favoritos">Favoritos</FooterLink>
          </div>
        </div>

        {/* Coluna 3 */}
        <div className="space-y-3">
          <h3 className="font-semibold">Cliente</h3>
          <div className="flex flex-col gap-2">
            <FooterLink href="/area-do-cliente">Área do cliente</FooterLink>
            <FooterLink href="/ouvidoria">Ouvidoria</FooterLink>
            <FooterLink href="/trabalhe-conosco">Trabalhe conosco</FooterLink>
          </div>
        </div>
      </div>

      {/* Unidades */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-2">
          {/* Unidade 1 */}
          <div className="space-y-3">
            <h4 className="font-semibold">Unidade do Bairro Matriz</h4>

            <div className="flex items-start gap-3 text-sm text-white/80">
              <FiMail className="mt-0.5 shrink-0" />
              <span>contato@premiumimobiliaria.com</span>
            </div>

            <div className="flex items-start gap-3 text-sm text-white/80">
              <FiMapPin className="mt-0.5 shrink-0" />
              <span>Rua Avaré, 15 Sala 24 - Matriz - Mauá - CEP 09370-200</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-white/80">
              <FiPhone className="shrink-0" />
              <span>(11) 92374-9516</span>
            </div>

            <a
              className="inline-flex items-center gap-2 text-sm text-white hover:text-white/90 transition"
              href="https://api.whatsapp.com/send?phone=5511940070547"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp />
              <span>(11) 92374-9516</span>
            </a>
          </div>
          {/* Mapa */}
          <div className="space-y-3">
            <h4 className="font-semibold mb-4">Localização da unidade:</h4>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <iframe
                title="Mapa - Imobiliária Premium (Matriz)"
                className="w-full h-80 md:h-60"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Rua%20Avar%C3%A9%2C%2015%20Sala%2024%20Mau%C3%A1%20SP%2009370-200&output=embed"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4 text-white/80">
            <a
              className="hover:text-white transition"
              href="#"
              aria-label="Instagram"
            >
              <FiInstagram size={18} />
            </a>
            <a
              className="hover:text-white transition"
              href="#"
              aria-label="YouTube"
            >
              <FiYoutube size={18} />
            </a>
            <a
              className="hover:text-white transition"
              href="#"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              className="hover:text-white transition"
              href="#"
              aria-label="Facebook"
            >
              <FiFacebook size={18} />
            </a>
          </div>

          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} | Imobiliária & Construtora Premium |
            CRECI: 112835 - Arlindo José de Lima | Made with 💛 by{" "}
            <a href="https://www.instagram.com/luccaaudiovisual">
              Lucca Audiovisual
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
