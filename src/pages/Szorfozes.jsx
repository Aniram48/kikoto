import Navbar from "../components/Navbar"
import { Waves, Phone, Mail } from "lucide-react"
import WaveStrip from '../components/WaveStrip'

export default function Szorfozes() {
  return (
    <div className="min-h-screen bg-slate-300 text-slate-950 pt-16">
      <Navbar />

      {/* HERO */}
      <div className="relative bg-slate-100 border-b border-slate-900/10">
        <div className="max-w-4xl md2:max-w-lg mx-auto px-6 pt-14 pb-14 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-slate-700 uppercase mb-5">
            <Waves className="w-4 h-4" />
            Vízi sport
          </div>

          <h1 className="  text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight">
            Tiszai szörfözés
          </h1>
          <p className=" mt-5 text-slate-600 max-w-2xl mx-auto leading-relaxed">A szörfözéssel színesedhet a tiszai vízi sportélet!</p>

          

          <div className="mt-8 w-12 h-px bg-slate-400 mx-auto" />
        </div>
        <img
            src="/windsurf.png"
            alt="windserf"
            className="
              absolute
              right-6 sm:right-10 lg:right-20
              top-1/2 -translate-y-1/2
              h-auto
              animate-boat
              pointer-events-none
              w-[clamp(90px,10vw,150px)]
            "
          />
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-8">

        <div className="bg-slate-50 border border-slate-900/10 rounded-2xl p-8 leading-relaxed text-slate-700">
          <p>
            Több mint 30 éve jelentek meg Magyarországon a vitorlás vízi sporteszközök,
            köztük a szörfök, amelyek először a tavakon, majd a folyókon is elterjedtek.
            A sport fejlődésével együtt a használatukra vonatkozó szabályozás is folyamatosan változott.
          </p>

          <p className="mt-4">
            Kezdetben a szörfözést „fürdőeszköz” kategóriába sorolták, ami azonban nem bizonyult
            megfelelőnek, mivel a folyókon és tavakon eltérő körülmények között zajlik a használat.
          </p>

          <p className="mt-4">
            A Tiszán korábban korlátozások voltak érvényben, azonban szakmai szervezetek és
            önkormányzati támogatás segítségével ezek feloldásra kerültek. Ennek köszönhetően
            újra lehetőség nyílt a biztonságos szörfözésre a folyón.
          </p>

          <p className="mt-4">
            A folyóvízi szörfözés sajátosságai eltérnek a tavakon megszokottaktól, ezért
            kiemelten fontos a megfelelő felkészülés és oktatás. A vízi sportok alapvetően
            élménydúsak, de mindig számolni kell a természet változó körülményeivel.
          </p>

          <p className="mt-4 font-medium text-slate-800">
            A Tiszavirág SE várja mindazok jelentkezését, akik szeretnék megismerni,
            megtanulni a szörfözést, vagy csatlakoznának a klub közösségéhez.
          </p>
        </div>

        {/* WARNING / INFO BOX */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-amber-900 text-sm leading-relaxed">
          ⚠️ A vízi sportok – így a szörfözés is – alapvetően veszélyes tevékenységnek számítanak.
          A biztonságos gyakorláshoz ajánlott az oktatáson való részvétel.
        </div>

        {/* CONTACT */}
        <div className="bg-slate-50 border border-slate-900/10 rounded-2xl p-8">
          <h3 className="text-sm font-semibold tracking-widest uppercase mb-4 text-slate-700">
            Jelentkezés
          </h3>

          <div className="space-y-3 text-slate-700">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4" />
              <span>+36-30-978-6313</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <span>kipper.gyorgy@gmail.com</span>
            </div>
          </div>
        </div>

      </div>
      <div className="mt-auto">
        <WaveStrip />
      </div>
    </div>
  )
}