import "./App.css";
import Layout from "./components/Layout/Layout";
import HomeSearch from "./components/Search/HomeSearch";
import Section from "./components/Section/Section";

function App() {
  return (
    <>
      <Layout>
        <Section
          bg="../public/assets/hero_main_section.jpg"
          className="min-h-160.5 flex items-center"
        >
          <HomeSearch
            onSearch={(payload) => console.log("buscar:", payload)}
            onSearchByCode={(codigo) => console.log("codigo:", codigo)}
          />
        </Section>
        <div className="h-500"></div>
      </Layout>
    </>
  );
}
export default App;
