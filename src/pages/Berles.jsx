import { useState } from "react"
import Navbar from "../components/Navbar"
import { Anchor, Sailboat, Ship } from "lucide-react"
import WaveStrip from '../components/WaveStrip'

const BOATS = [
  {
    Icon: Anchor,
    title: "Csónak",
    desc: [
      "Ideális belvízi kiránduláshoz",
      "Max. 4 személy",
      "Könnyű kezelhetőség",
      "Alapfelszereltség biztosítva",
    ],
    price: 3500,
    featured: false,
  },
  {
    Icon: Sailboat,
    title: "Vitorlás Kaland",
    desc: [
      "Klasszikus vitorlás élmény",
      "Max. 6 személy",
      "Oktatóval vagy önállóan",
      "Mentőmellény biztosítva",
    ],
    price: 8900,
    featured: true,
  },
  {
    Icon: Ship,
    title: "Családi Motorcsónak",
    desc: [
      "Kényelmes és gyors",
      "Max. 8 személy",
      "Légkondicionált kabin",
      "Horgonyzókészlet mellékelt",
    ],
    price: 12500,
    featured: false,
  },
]

export default function Berles() {
  const [hours, setHours] = useState({})

  const changeHours = (i, delta) => {
    setHours((h) => ({
      ...h,
      [i]: Math.max(1, (h[i] || 1) + delta),
    }))
  }

  return (
    <div className="min-h-screen bg-slate-300 text-slate-950 pt-8">
      <Navbar />

      {/* HERO  */}
    
       <div className="relative bg-slate-100 border-b border-slate-900/10 overflow-hidden">
    
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-6 text-center relative">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-slate-700 uppercase mb-5">
            <Anchor className="w-4 h-4 opacity-70" />
            Hajóbérlés
          </div>

          <h1 className="text-4xl text-3xl sm:text-4xl font-light tracking-tight text-slate-950 leading-tight mb-4">
            Vízre fel!{' '}
            <span className="font-semibold  text-water">Csónak- és hajóbérlés</span>
          </h1>

          <p className="text-slate-600 max-w-md mx-auto text-base leading-relaxed">
             Válassz hajót, állítsd be az időtartamot, és indulhat a vízi élmény.
          </p>

          <div className="mt-8 w-12 h-px bg-slate-400 mx-auto" />
        </div>
      </div>

      

      {/* CARDS */}
      
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-6 pb-14">
        <div className="grid md:grid-cols-3 gap-6">
        {BOATS.map((boat, i) => {
          const h = hours[i] || 1

          return (
            <div
              key={i}
              className={`relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 group ${
                boat.featured
                  ? "bg-slate-50 border-slate-900/10"
                  : "bg-slate-50 border-slate-900/10"
              }`}
            >
              {/* FEATURED TAG */}
              {boat.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-3 py-1 rounded-full font-bold tracking-widest uppercase">
                  Legnépszerűbb
                </div>
              )}

              {/* ICON */}
              <div className="w-12 h-12 rounded-xl bg-slate-950/5 flex items-center justify-center mb-5 group-hover:bg-slate-900 transition-colors">
                <boat.Icon className="w-6 h-6 text-slate-900 group-hover:text-white transition-colors" />
              </div>

              {/* TITLE */}
              <h3 className="text-sm font-semibold tracking-widest text-slate-700 uppercase mb-3">
                {boat.title}
              </h3>

              {/* DESC */}
              <div className="space-y-2 text-sm text-slate-600 mb-6">
                {boat.desc.map((d, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2" />
                    {d}
                  </div>
                ))}
              </div>

              {/* HOURS */}
              <div className="flex items-center justify-between bg-slate-950/5 rounded-xl px-4 py-2 mb-6">
                <span className="text-xs text-slate-600">Órák</span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => changeHours(i, -1)}
                    className="w-7 h-7 rounded-full bg-slate-900/10 text-slate-900 font-bold"
                  >
                    −
                  </button>

                  <span className="font-semibold text-slate-900">{h}</span>

                  <button
                    onClick={() => changeHours(i, 1)}
                    className="w-7 h-7 rounded-full bg-slate-900/10 text-slate-900 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* PRICE */}
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">
                  {(boat.price * h).toLocaleString("hu-HU")} Ft
                </div>
                <div className="text-xs text-slate-500">/ {h} óra</div>
              </div>

              {/* BUTTON */}
              <a
                href="tel:+36309786313"
                className="block mt-6 text-center bg-slate-900 text-white py-3 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-slate-800 transition"
              >
                Foglalás
              </a>
            </div>
          )
        })}
      </div>
      </div>

      {/* INFO */}
      <div className="max-w-xl mx-auto mb-16 bg-slate-50 border border-slate-900/10 rounded-2xl p-8 text-center">
        <h3 className="text-slate-900 font-bold tracking-widest uppercase mb-4">
          Nyitvatartás
        </h3>

        <p className="text-sm text-slate-600">Minden nap: 0:00 – 24:00</p>
        <p className="text-sm text-slate-600">Szeged, Vitorláskikötő</p>

        <a
          href="tel:+36309786313"
          className="text-slate-900 font-bold block mt-3"
        >
          +36 30 978 6313
        </a>
      </div>
      <div className="mt-auto">
              <WaveStrip />
            </div>
    </div>
  )
}