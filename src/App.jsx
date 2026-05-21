import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Bejelentkezes from "./pages/Bejelentkezes"
import Regisztracio from "./pages/Regisztracio"
import Szabalyzat from "./pages/Szabalyzat"
import Kepzesek from "./pages/Kepzesek"
import KishajoKepzes from './pages/KishajosKepzes'
import TengeriKepzes from './pages/TengeriKepzes'
import SzolgalatiKepzes from './pages/SzolgalatiKepzes'
import Berles from "./pages/Berles"
import Termekek from "./pages/Termekek"
import Szorfozes from "./pages/Szorfozes"
import Hajoskonyv from "./pages/Hajoskonyv"
import Kurzus from "./pages/Kurzus"
import VizsgaKerdessor from "./components/VizsgaKerdessor"
import UjJelszo from "./pages/Uj_jelszo"
import Profil from './pages/Profil'



function VedettOldal({ children }) {
  const bejelentkezve = localStorage.getItem('bejelentkezve') === 'true'
  if (!bejelentkezve) return <Navigate to="/bejelentkezes" />
  return children
}

export default function App() {
  return (
    <Routes>
      {/* Home és menüpontok */}
      <Route path="/" element={<Home />} />
      <Route path="/bejelentkezes" element={<Bejelentkezes />} />
      <Route path="/regisztracio" element={<Regisztracio />} />
      <Route path="/szabalyzat" element={<Szabalyzat />} />
      <Route path="/kepzesek" element={<Kepzesek />} />
      <Route path="/berles" element={<Berles />} />
      <Route path="/termekek" element={<Termekek />} />
      <Route path="/szorfozes" element={<Szorfozes />} />
      <Route path="/kurzus" element={<Kurzus />} />
      <Route path="/hajoskonyv" element={<Hajoskonyv />} />
      <Route path="/uj_jelszo" element={<UjJelszo />} />
      <Route path="/profil" element={<Profil />} />

      {/* Védett oldalak */}
      <Route path="/kepzesek/kishajos" element={<VedettOldal><KishajoKepzes /></VedettOldal>} />
      <Route path="/kepzesek/tengeri" element={<VedettOldal><TengeriKepzes /></VedettOldal>} />
      <Route path="/kepzesek/szolgalati" element={<VedettOldal><SzolgalatiKepzes /></VedettOldal>} />

      {/* Tesztkérdéssorok */}
      <Route path="/vizsgakerdessor/:tipus" element={<VedettOldal><VizsgaKerdessor /></VedettOldal>} />

      {/* Próbavizsgák */}
      <Route path="/probavizsga/szabalyzat" element={<VedettOldal><VizsgaKerdessor tipus="szabalyzat" proba /></VedettOldal>} />
      <Route path="/probavizsga/kisgephajo" element={<VedettOldal><VizsgaKerdessor tipus="kisgephajo" proba /></VedettOldal>} />
      <Route path="/probavizsga/vitorlas" element={<VedettOldal><VizsgaKerdessor tipus="vitorlas" proba /></VedettOldal>} />
      <Route path="/probavizsga/tengeri" element={<VedettOldal><VizsgaKerdessor tipus="tengeri" proba /></VedettOldal>} />
    </Routes>
  )
}