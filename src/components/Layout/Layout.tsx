import Footer from "./Footer/Footer";
import Header from "./Header/Header";

//TODO: Corrigir essas props
export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-24">{children}</main>
      <Footer />
    </>
  );
}
