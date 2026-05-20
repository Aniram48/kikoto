import { useNavigate } from 'react-router-dom'
import { Anchor, Ship, Briefcase, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import WaveStrip from '../components/WaveStrip'

const kepzesek = [
  {
    path: '/kepzesek/kishajos',
    icon: Anchor,
    cim: 'Kishajós képzés',
    alcim: 'Belvízi kedvtelési célú',
    leiras: 'Szerezd meg a belvízi kishajó-vezető bizonyítványt. Elméleti és gyakorlati képzés, komplett vizsgafelkészítéssel.',
    badge: 'Népszerű',
    accentLine: 'bg-accent',
    badgeStyle: 'bg-yellow-400/10 text-yellow-700 border-yellow-400/30',
  },
  {
    path: '/kepzesek/tengeri',
    icon: Ship,
    cim: 'Tengeri IV. osztályú',
    alcim: 'Kedvtelési célú kishajó-vezető',
    leiras: 'Parttól 3 tengeri mérföldig érvényes képesítés. Max. 24 méteres hajókra, 12 utasig. Távoktatásos elméleti képzés.',
    badge: 'Tengeri',
    accentLine: 'bg-sky',
    badgeStyle: 'bg-sky-400/10 text-sky-700 border-sky-400/30',
  },
  {
    path: '/kepzesek/szolgalati',
    icon: Briefcase,
    cim: 'Szolgálati képzés',
    alcim: 'Kereseti célú kishajó-vezető',
    leiras: 'Szakmai, kereseti célú kishajó-vezető képesítés. Kereskedelmi és személyszállítási célokra jogosít.',
    badge: 'Profi',
    accentLine: 'bg-[#a8d5a2]',
    badgeStyle: 'bg-green-400/10 text-green-700 border-green-400/30',
  },
]

export default function Kepzesek() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-300 text-slate-950 flex flex-col pt-8">
      <Navbar />

      {/* Hero */}
      <div className="relative bg-slate-100 border-b border-slate-900/10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-6 text-center relative">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-slate-700 uppercase mb-5">
            <Anchor className="w-4 h-4 opacity-70" />
            Képzések
          </div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-950 leading-tight mb-4">
            Hajós{' '}
            <span className="font-semibold text-water">Képzések</span>
          </h1>
          <p className="text-slate-600 max-w-md mx-auto text-base leading-relaxed">
            Válaszd ki a számodra megfelelő képzést, és indulj el a vízen való kaland felé.
          </p>
          <div className="mt-8 w-12 h-px bg-slate-400 mx-auto" />
        </div>
      </div>

      {/* Kártyák */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 pt-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {kepzesek.map(({ path, icon: Icon, cim, alcim, leiras, badge, accentLine, badgeStyle }) => (
            <div
              key={path}
              onClick={() => navigate(path)}
              className="group relative cursor-pointer rounded-2xl border border-slate-900/10 bg-slate-50 overflow-hidden flex flex-col hover:bg-slate-900 hover:border-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className={`text-[9px] font-bold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full border ${badgeStyle} group-hover:opacity-40 transition-opacity`}>
                  {badge}
                </span>
              </div>

              {/* Tartalom */}
              <div className="p-8 flex flex-col flex-1">
                {/* Ikon */}
                <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center mb-6 bg-slate-950/5 group-hover:bg-white/10 transition-colors">
                  <Icon className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                </div>

                {/* Szöveg */}
                <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-slate-600 group-hover:text-white/50 mb-2 transition-colors">
                  {alcim}
                </p>
                <h2 className="text-xl font-semibold text-slate-950 group-hover:text-white mb-4 leading-snug transition-colors">
                  {cim}
                </h2>
                <p className="text-slate-600 group-hover:text-white/55 text-sm leading-relaxed flex-1 transition-colors">
                  {leiras}
                </p>

                {/* CTA */}
                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-slate-700 group-hover:text-sky transition-colors">
                  <span>Részletek</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              {/* Alsó accent vonal */}
              <div className={`h-[3px] w-0 group-hover:w-full transition-all duration-500 ${accentLine}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <WaveStrip />
      </div>
    </div>
  )
}