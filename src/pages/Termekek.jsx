import Navbar from "../components/Navbar"
import WitchAnimation from "../components/WitchAnimation"
import { Anchor } from "lucide-react"

function AppButton({ children, href = "#" }) {
  return (
    <div className="block bg-navy text-white text-[11px]  font-semibold tracking-widest uppercase px-4 py-2 rounded-lg hover:bg-navy transition">
      {children}
    </div>
  )
}

function ImageSlot({ src, alt = "Kép" }) {
  if (src) {
    return (
      <img src={src} alt={alt} className="w-full aspect-[4/3] object-cover rounded-lg" />
    )
  }
  return (
    <div className="bg-sail border border-water/20 flex items-center justify-center aspect-[4/3] text-water text-[10px]  font-bold tracking-widest uppercase rounded-lg">
      {alt}
    </div>
  )
}

export default function Termekek() {
  return (
    <div className="relative min-h-screen bg-slate-300 text-navy overflow-hidden pt-16">
      <WitchAnimation />
      <Navbar />

      {/* HERO */}
      <div className="relative bg-slate-100 border-b border-navy/10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-14 text-center relative">
          <div className="inline-flex items-center gap-2 text-xs  font-semibold tracking-[0.3em] text-water uppercase mb-5">
            <Anchor className="w-4 h-4 opacity-70" />
            TERMÉKEK
          </div>
          <h1 className=" text-3xl sm:text-4xl font-light tracking-tight text-navy leading-tight mb-4">
            Termékek{' '}
            <span className="font-semibold text-water">falióra, alkalmazás</span>
          </h1>
          <p className=" text-water/70 max-w-md mx-auto text-base leading-relaxed">
            Modern hajós és alkalmazás alapú rendszerek, egy helyen.
          </p>
          <div className="mt-8 w-12 h-px bg-water/40 mx-auto" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">

        {/* BLOKK 1 – BOSZORKÁNY KÖR */}
        <div className="relative rounded-2xl border border-navy/10 bg-slate-100 overflow-hidden shadow-sm">
          <div className="bg-navy text-white px-6 py-5 text-center">
            <h2 className=" text-lg font-semibold tracking-widest uppercase">
              Boszorkány Kör
            </h2>
            <p className=" text-white/60 text-xs mt-1 tracking-widest uppercase">
              Android alkalmazás
            </p>
          </div>

          <div className="relative overflow-hidden grid grid-cols-3 gap-2 p-3 bg-slate-100">
            <ImageSlot src="boszi1.png" alt="Alkalmazás kép 1" />
            <ImageSlot src="boszi2.png" alt="Alkalmazás kép 2" />
            <ImageSlot src="boszi3.png" alt="Alkalmazás kép 3" />
          </div>

          <div className=" grid grid-cols-2 gap-2 p-4">
            <div className="space-y-2 ">
              <AppButton>Leírás</AppButton>
              <AppButton>Eredmények</AppButton>
              <AppButton>Regatta információ</AppButton>
              <AppButton>MapEdit letöltése</AppButton>
            </div>
            <div className="space-y-2">
              <AppButton>Fotók</AppButton>
              <AppButton>Nevezés</AppButton>
              <AppButton>Adatfeltöltés</AppButton>
              <AppButton>Alkalmazás letöltése</AppButton>
            </div>
          </div>
        </div>

        {/* BLOKK 2 – FALIÓRA */}
        <div className="rounded-2xl border border-navy/10 bg-slate-100 overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-[160px_1fr] bg-deepnavy text-white">
            <div className="bg-navy flex items-center justify-center p-4">
              <div className="w-28 h-28 rounded-full bg-sail flex items-center justify-center">
                <img src="ora.png" alt="óra" className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
            <div className="p-5 flex flex-col justify-center bg-navy">
              <h2 className=" text-lg font-semibold tracking-widest uppercase">
                Kódlobogós Falióra
              </h2>
              <div className="text-white/70 text-xs mt-3 leading-5">
                <p className=" font-semibold text-white">AUTOINFO HUNGARY EC.</p>
                <p className="">6720 Szeged, Kazinczy u. 12.</p>
                <p className="">+36 30 978 6313</p>
                <p className="">+36 62 547 000</p>
              </div>
            </div>
          </div>

          <div className="p-6 text-sm text-water leading-relaxed space-y-3">
            <p className="">
              A Ködlobogós Falióra egy tengeri inspirációjú, egyedi kialakítású analóg kvarc óra.
            </p>
            <ul className="space-y-2 list-disc pl-5">
              <li className="">5 az 1-ben dizájn koncepció</li>
              <li className="">Tengeri navigációs elemekkel kombinált számlap</li>
              <li className="">Kárdinális irányjelölések</li>
              <li className="">Falra szerelhető dekorációs kivitel</li>
            </ul>
            <p className="">
              Ideális klubhelyiségekbe, irodákba és otthoni dekorációnak.
            </p>
            <p className=" font-semibold">
              Méret: 31,5 cm átmérő — Ár: 7 900 Ft
            </p>
            <div className="pt-3 border-t border-water/20 text-xs text-water/60">
              <p className=" font-semibold text-water">Kapcsolat:</p>
              <p className="">+36 30 978 6313</p>
              <p className="">kipper@autoinfo.hu</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-deepnavy text-sail/60 py-5 text-center">
        <p className=" text-[10px] tracking-widest uppercase">
          © 2026 Szegedi Vitorláskikötő
        </p>
      </footer>
    </div>
  )
}