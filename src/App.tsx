import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import Search from "./pages/Search";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/busca" element={<Search />} />
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}
