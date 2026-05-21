import { useState } from "react"
import { List, Anchor, Ship, Users, Navigation, FileDown, Play, CheckSquare, Trophy, ArrowLeft,
  Phone, Mail, MapPin, MessageSquare, Shield, ChevronDown, ChevronUp
 } from "lucide-react"
import Navbar from "../components/Navbar"
import WaveStrip from '../components/WaveStrip'

//  Adatok 

const DOCS = [
  {
    label: "Tájékoztató letöltése",
    href: "https://autoinfo.hu/szvk/...",
  },
  {
    label: "Megállapodás letöltése",
    href: "https://autoinfo.hu/szvk/wp-content/uploads/2026/03/megallapodas_tengeri_iv_kishajos_kepzes_2026_01.doc",
  },
  {
    label: "Egészségügyi alkalmassági igazolás",
    href: "https://autoinfo.hu/szvk/wp-content/uploads/2024/11/orvosi_igazolas_kedvtelesi_celu_okmany_kiallitashoz_2024_b_t.xlsx",
  },
]

const CERT_DETAILS = [
  { icon: Navigation, label: "Érvényesség", value: "Parttól 3 tengeri mérföld távolságig" },
  { icon: Ship,       label: "Hajóméret",   value: "Max. 24 m (tengeri) / 20 m (belvízi)" },
  { icon: Users,      label: "Utasok",      value: "Maximum 12 fő" },
  { icon: Anchor,     label: "Hajótípus",   value: "Kisgéphajó és vitorlás kishajó" },
]

const DATES = [
  { label: "Elméleti képzés kezdete",  value: "2026. 05. 01." },
  { label: "Elméleti vizsga (1. időpont)", value: "2026. 05. 05." },
  { label: "Elméleti vizsga (2. időpont)", value: "2026. 05. 19." },
]

const REQUIREMENTS = [
  "18. életév betöltése",
  "Belvízi kedvtelési célú kisgéphajó vagy vitorlás kishajó-vezetői képesítés megléte",
  "Tengerész-orvosi vagy gépjármű-vezetői egészségi alkalmasság igazolás bemutatása",
  "A vizsgadíj befizetésének igazolása",
  "Hajózási hatóság által jóváhagyott képzőszerv tanfolyamán való részvétel igazolása",
]

const TESTS = [
  {
    title: "Tengeri IV. osztályú kishajós kérdéssor",
    sub: "Teljes kérdéssor – korlátlanul gyakorolható",
    route: "/vizsgakerdessor/tengeri",
  },
]

const PROBA = [
  {
    title: "Tengeri IV. osztályú kishajó – Próba vizsga",
    sub: "20 véletlenszerű kérdés · 1 perc/kérdés",
    route: "/probavizsga/tengeri",
  },
]

const NAVY = "bg-deepnavy"
const TABS = [
  { id: "tajekoztato", label: "Tájékoztató",   Icon: List  },
  { id: "videok",      label: "Videók",          Icon: Play },
  { id: "feltetelek",  label: "Feltételek",      Icon: CheckSquare },
  { id: "tesztek",     label: "Tesztkérdések",          Icon: Trophy },
  { id: "bizonyitvany",label: "Bizonyítvány",    Icon: Ship },
  { id: "dokumentumok",label: "Dokumentumok",    Icon: FileDown },
]

const VIDEO_GROUPS = [
  {
    title: "Kedvtelési célú IV. osztályú tengeri kishajó vezető tanfolyam – 1. rész",
    videoId: "gpcxfyY9EWA",
  },
  {
    title: "Kedvtelési célú IV. osztályú tengeri kishajó vezető tanfolyam – 2. rész",
    videoId: "gpcxfyY9EWA",
  },
]

//  Kisebb komponensek 

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mt-6 mb-3">
      {children}
    </p>
  )
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <Icon className="w-5 h-5 mb-3 text-water" />
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className="text-sm font-semibold text-slate-800">{value}</div>
    </div>
  )
}

function TestRow({ item, btnLabel = "Kezdés", navigate }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between gap-4 mb-2">
      <div>
        <p className="text-sm font-medium text-slate-800">{item.title}</p>
        {item.sub && <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>}
      </div>
      <button
        onClick={() => navigate(item.route)}
        className="flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer bg-navy text-accent"
      >
        {btnLabel}
      </button>
    </div>
  )
}

//  Díjtáblázat 

function DijTablazat() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-slate-100 text-slate-600 text-xs uppercase tracking-widest">
            <th className="text-left px-4 py-3 rounded-tl-xl">Tanfolyam</th>
            <th className="text-right px-4 py-3">Tanfolyamdíj</th>
            <th className="text-right px-4 py-3">KAV vizsgadíj</th>
            <th className="text-right px-4 py-3 rounded-tr-xl">Okmánykiadás</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-t border-slate-100">
            <td className="px-4 py-3 text-slate-700">Kisgéphajó-vezető és/vagy vitorlás kishajó vezető</td>
            <td className="px-4 py-3 text-right font-medium text-slate-800 whitespace-nowrap">
              Elmélet: 36 000 Ft<br />
              <span className="text-xs text-slate-500">Vizsgaeljárás: 4 000 Ft</span>
            </td>
            <td className="px-4 py-3 text-right font-medium text-slate-800 whitespace-nowrap">10 900 Ft</td>
            <td className="px-4 py-3 text-right font-medium text-slate-800 whitespace-nowrap">16 100 Ft</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
function VideoAccordion({ group }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white border border-slate-200 rounded-xl mb-2 overflow-hidden w-full">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
      >
        <Play className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <span className="flex-1 text-sm font-medium text-slate-800">{group.title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      {open && (
        <div className="border-t border-slate-100 p-4">
          <div className="w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${group.videoId}`}
              title={group.title}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}

//  Fő oldal 

export default function TengeriKepzes() {
  
  const navigate = (route) => window.location.href = route

  const [activeTab, setActiveTab] = useState("tajekoztato")

  return (
    <div className="min-h-screen bg-slate-300 text-slate-950 pt-16 flex flex-col">
      <Navbar />

      {/* HERO */}
      <div className="relative bg-slate-100 border-b border-slate-900/10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 pt-10 pb-14">
          <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-widest text-slate-700 uppercase mb-4">
            <ArrowLeft
              className="w-6 h-6 cursor-pointer text-water hover:opacity-70 transition-opacity -ml-1"
              onClick={() => navigate('/kepzesek')}
              title="Vissza"
            />
            <Anchor className="w-4 h-4" /> Tengeri képzés
          </div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-950 leading-tight">
             Tengeri IV. osztályú{' '}
            <span className="font-semibold italic text-water">kishajós képzés</span>
          </h1>
          <p className="mt-4 text-slate-600 max-w-xl text-base leading-relaxed">
            Kedvtelési célú IV. osztályú tengeri vitorlás és kisgéphajó vezető képzés.
          </p>
        </div>
      </div>

      {/* TAB SÁV */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold tracking-wide whitespace-nowrap border-b-2 transition-all duration-150 ${
                activeTab === id
                  ? "border-accent"
                  : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* TARTALOM */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-20 flex-1 w-full">

        {/* TÁJÉKOZTATÓ */}
        {activeTab === "tajekoztato" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 leading-relaxed text-slate-700 space-y-4 text-sm">
              <p>
                <span className="font-semibold text-slate-900">Kedvtelési célú IV. osztályú tengeri vitorlás és kisgéphajó vezető képzés indul.</span>
              </p>
              <p>
                Az előadások témái: Navigáció, térképek, menetszabályok, jelzések, rádiózás, vízből mentés, tűzoltás, meteorológia, környezetvédelem.
              </p>
              <p>
                Az elméleti képzés <span className="font-semibold">távoktatással</span> történik.
              </p>
              <p>
                A tanfolyam végén a résztvevők a{" "}
                <span className="font-semibold">Közlekedési Alkalmassági és Vizsgaközpont</span>{" "}
                számítógépes vizsgatermében vizsgáznak, és sikeres vizsga esetén{" "}
                <span className="font-semibold">kedvtelési célú IV. osztályú tengeri kishajó-vezető bizonyítványt</span> kapnak.
              </p>
              <p>
                A képesítés tengeren a parttól <span className="font-semibold">3 tengeri mérföld</span> távolságon belül, illetve belvízen történő kishajó vezetésére jogosít. 
                A tengeri kisgéphajó és vitorlás kishajó teljes hossza a  24 métert, a belvízi kisgéphajó és vitorlás kishajó teljes hossza a  20 métert nem érheti el, utas befogadó képessége legfeljebb  12 fő lehet.
              </p>
            </div>

            {/* Díjtáblázat */}
            <div>
              <SectionLabel>Díjak</SectionLabel>
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <DijTablazat />
              </div>
            </div>

            {/* Kapcsolat */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-sm text-slate-700 space-y-2">
            <p className="font-semibold text-slate-900 mb-3">Kapcsolat és jelentkezés</p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-water flex-shrink-0" />
              <a href="tel:+36309786313" className="hover:underline">+36 30 978 6313</a>
              <span className="text-slate-400">·</span>
              <a href="tel:+3662547000" className="hover:underline">+36 62 547 000</a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-water flex-shrink-0" />
              <a href="mailto:kipper@kipper.hu" className="hover:underline text-water">kipper@kipper.hu</a>
              <span className="text-slate-400">·</span>
              <MessageSquare className="w-4 h-4 text-water flex-shrink-0" />
              <span>Kipper György</span>
            </p>
            <p className="flex items-center gap-2 text-xs text-slate-500 mt-2">
              <MapPin className="w-4 h-4 text-water flex-shrink-0" />
              AUTOINFO HUNGARY EC · 6720 Szeged, Kazinczy u. 12.
            </p>
            <p className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-water flex-shrink-0" />
              Engedélyszám: KÖFÁT/61765-1/2024/HHF.
            </p>
          </div>
          </div>
        )}

        {/* AKTUÁLIS KÉPZÉS */}
        {activeTab === "videok" && (
          <div className="space-y-6">
            {/* Időpontok */}
            <div>
              <SectionLabel>Időpontok</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DATES.map((d, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">{d.label}</p>
                    <p className="text-sm font-semibold text-water">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Leírás */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-sm text-slate-700 leading-relaxed space-y-4">
              <p>
                
               Azok akik már regisztráltak az oldalra, (sportcélú, vagy kompetencia vizsga, vagy szolgálati, kereseti célú vizsga kapcsán), nekik <span className="font-semibold">nem kell mégegyszer regisztrálni</span>, csupán jelezni, hogy szeretnének foglalkozni a tengeri IV. osztályú kishajós vizsgára felkészüléssel.
              A számítógépes tesztvizsgák időpontjai a havonta meghirdetett KAV kishajós vizsgaidőpontjai szerinti ütemezésben választhatók.
              ( Budapesten, Győrött, Siófokon, Mohácson, Szegeden, Miskolcon )
              A vizsgára jelentkezés minimum  5 munkanappal a vizsga előtt esedékes.
              Részletes tájékoztató megtalálható a tájékoztató menüpontban.
              Érdeklődés esetén letölthető a tervezett megállapodás, melynek E-mailben történő megküldése után az oktató videót elérhetővé teszem számodra, így az elméleti felkészülés már azonnal elkezdhető.
                            
              </p>
              <p>
                A vizsgára jelentkezés minimum <span className="font-semibold">5 munkanappal</span> a vizsga előtt esedékes.
              </p>
            </div>

            {/* Oktató videók */}
            <div>
              <SectionLabel>Oktató videók</SectionLabel>
              {VIDEO_GROUPS.map((g, i) => <VideoAccordion key={i} group={g} />)}
            </div>
            </div>
        )}

        {/* FELTÉTELEK */}
        {activeTab === "feltetelek" && (
          <div className="space-y-6">
            <SectionLabel>Vizsgára bocsátás feltételei</SectionLabel>
            <div className="space-y-2">
              {REQUIREMENTS.map((req, i) => (
                <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 bg-navy text-accent"
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-700">{req}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TESZTEK */}
        {activeTab === "tesztek" && (
          <div className="space-y-6">
            <div>
              <SectionLabel>Kérdéssor</SectionLabel>
              {TESTS.map((t, i) => <TestRow key={i} item={t} navigate={navigate} />)}
            </div>
            <div>
              <SectionLabel>Próba vizsga</SectionLabel>
              <p className="text-xs text-slate-500 mb-3">
                20 véletlenszerű kérdés · 1 perc/kérdés · 5 hibáig megfelelt, fölötte nem felelt meg.
              </p>
              {PROBA.map((t, i) => <TestRow key={i} item={t} btnLabel="Indítás" navigate={navigate} />)}
            </div>
          </div>
        )}

        {/* BIZONYÍTVÁNY */}
        {activeTab === "bizonyitvany" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERT_DETAILS.map((c, i) => <InfoCard key={i} {...c} />)}
            </div>

            <div>
              <SectionLabel>Okmány kiváltása</SectionLabel>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  Az okmánykiadási kérelem benyújtása az eredményes elméleti vizsga után történhet. Szegeden minden héten <span className="font-semibold">kedden, 13:00–15:00</span> között a Kormányablakban van lehetőség a kérelem benyújtására.
                </p>
                <ul className="space-y-1 text-slate-600">
                  <li>• Okmánykiadási díj: <span className="font-semibold">16 100 Ft</span> átutalás igazolása</li>
                  <li>• 2 db szabványos <span className="font-semibold">35×45 mm-es</span> színes igazolványkép (névvel és születési dátummal a hátoldalon)</li>
                  <li>• Legyártási idő: <span className="font-semibold">30 nap</span> (általában 2–3 héten belül postázva)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* DOKUMENTUMOK */}
        {activeTab === "dokumentumok" && (
          <div>
            <SectionLabel>Letölthető dokumentumok</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DOCS.map((d, i) => (
                <a
                  key={i}
                  href={d.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 hover:bg-slate-50 transition-colors group"
                >
                  <FileDown className="w-4 h-4 flex-shrink-0 text-water" />
                  <span className="text-sm text-slate-700 group-hover:text-water">{d.label}</span>
                </a>
              ))}
            </div>
    
          </div>
        )}

      </div>
      <div className="mt-auto">
        <WaveStrip />
      </div>
    </div>
  )
}