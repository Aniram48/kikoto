import { useState } from "react"
import {
  List, Anchor, Ship,
  Users,
  Navigation,
  FileDown,
  Play,
  CheckSquare,
  Trophy, Briefcase,
  ArrowLeft, Phone, Mail, MapPin,
  ChevronDown, ChevronUp
} from "lucide-react"
import WaveStrip from '../components/WaveStrip'

import Navbar from "../components/Navbar"

// ── Adatok ────────────────────────────────────────────────

const DOCS = [
  {
    label: "Tájékoztató letöltése",
    href: "https://autoinfo.hu/szvk/wp-content/uploads/2026/02/tajekoztato_szolg_ker_kishajovezeto_iktatoszamos_2026_01.doc",
  },
  {
    label: "Megállapodás letöltése",
    href: "https://autoinfo.hu/szvk/wp-content/uploads/2026/02/megallapodas_szolg_ker_kishajos_kepzes_2026_01_iktatoszamos.doc",
  },
]

const CERT_DETAILS = [
  { icon: Navigation, label: "Érvényesség", value: "Belvízi és parti vizek" },
  { icon: Ship, label: "Felhasználás", value: "Kereskedelmi és személyszállítás" },
  { icon: Users, label: "Jogosultság", value: "Szolgálati / kereseti célú" },
  { icon: Briefcase, label: "Képesítés", value: "Hivatásos kishajó-vezető" },
]

const DATES = [
  { label: "Elméleti képzés kezdete", value: "2026. 04. 01." },
  { label: "17. hét", value: "Gyakorlati oktatás" },
  { label: "18. hét", value: "Gyakorlati oktatás" },
  { label: "Vizsga", value: "2026. 05. 07." },
]

const REQUIREMENTS = [
  "18. életév betöltése",
  "Belvízi kedvtelési célú kishajó-vezető képesítés megléte",
  "Tengerész-orvosi vagy gépjárművezetői egészségi alkalmasság igazolása",
  "Vizsgadíj befizetésének igazolása",
  "Akkreditált képzőszerv tanfolyamán való részvétel",
  "Előírt gyakorlati idő teljesítése",
]

const TESTS = [
  { title: "Hajózási szabályzat, IV. szint", sub: "Szolgálati / hivatalos kérdéssor", route: "/vizsgakerdessor/szabalyzat" },
  { title: "Hajóvezetéstan, IV. szint", sub: "Szolgálati / hivatalos kérdéssor", route: "/vizsgakerdessor/hajovezetestan" },
  { title: "Hajózási földrajz, vízrajz, meteorológia", sub: "Szolgálati / hivatalos kérdéssor", route: "/vizsgakerdessor/meteorologia" },
  { title: "Hajóelmélet és hajógéptan", sub: "Szolgálati / hivatalos kérdéssor", route: "/vizsgakerdessor/hajogeptan" },
  { title: "Jog és rendeletismeret", sub: "Szolgálati / hivatalos kérdéssor", route: "/vizsgakerdessor/jog" },
  { title: "Elsősegély és tűzvédelem", sub: "Szolgálati / hivatalos kérdéssor", route: "/vizsgakerdessor/elsosegely" },
]

const TABS = [
  { id: "tajekoztato", label: "Tájékoztató", Icon: List },
  { id: "videok", label: "Videók", Icon: Play },
  { id: "feltetelek", label: "Feltételek", Icon: CheckSquare },
  { id: "tesztek", label: "Tesztkérdések", Icon: Trophy },
  { id: "bizonyitvany", label: "Bizonyítvány", Icon: Ship },
  { id: "dokumentumok", label: "Dokumentumok", Icon: FileDown },
]

const VIDEO_GROUPS = [
  {
    title: "I. RÉSZ - ÁLTALÁNOS BELVÍZI HAJÓZÁSI SZABÁLYOK",
    videoId: "gpcxfyY9EWA",
    chapters: [],
  },
  {
    title: "II. RÉSZ - MAGYARORSZÁG TERÜLETÉN LÉVŐ BELVÍZI UTAKRA VONATKOZÓ KIEGÉSZÍTŐ RENDELKEZÉSEK",
    videoId: "gpcxfyY9EWA",
    chapters: [],
  },
  {
    title: "ELSŐSEGÉLYNYÚJTÁS VIZSGAKÉRDÉSEK",
    videoId: "gpcxfyY9EWA",
    chapters: [],
  },
]

// ── Kisebb komponensek ─────────────────────────────────────

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

function TestRow({ item, navigate }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between gap-4 mb-2">
      <div>
        <p className="text-sm font-medium text-slate-800">{item.title}</p>
        {item.sub && <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>}
      </div>
      <button
        onClick={() => navigate(item.route)}
        className="flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer bg-deepnavy text-accent"
      >
        Kezdés
      </button>
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

// ── Díjtáblázat ───────────────────────────────────────────

function DijTablazat() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-slate-100 text-slate-600 text-xs uppercase tracking-widest">
            <th className="text-left px-4 py-3 rounded-tl-xl">Képzés</th>
            <th className="text-right px-4 py-3">Tanfolyamdíj</th>
            <th className="text-right px-4 py-3">Vizsgadíj</th>
            <th className="text-right px-4 py-3 rounded-tr-xl">Okmánykiadás</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-t border-slate-100">
            <td className="px-4 py-3 text-slate-700">Szolgálati / kereseti célú kishajó-vezető</td>
            <td className="px-4 py-3 text-right font-medium text-slate-800 whitespace-nowrap">Egyedi tájékoztatás alapján</td>
            <td className="px-4 py-3 text-right font-medium text-slate-800 whitespace-nowrap">Hatósági díjszabás szerint</td>
            <td className="px-4 py-3 text-right font-medium text-slate-800 whitespace-nowrap">14 800 Ft</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

// ── Fő komponens ──────────────────────────────────────────

export default function SzolgalatiKepzes() {
  const navigate = (route) => { window.location.href = route }
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
            <Anchor className="w-4 h-4" /> Szolgálati képzés
          </div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-950 leading-tight">
            Szolgálati, kereseti célú{' '}
            <span className="font-semibold italic text-water">kishajó-vezető képzés</span>
          </h1>
          <p className="mt-4 text-slate-600 max-w-xl text-base leading-relaxed">
            Hivatásos kishajó-vezető képesítés kereskedelmi és személyszállítási tevékenységhez.
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
                  ? "border-accent text-water"
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
              <p><span className="font-semibold text-slate-900">Szolgálati, kereseti célú kishajó-vezető képzés indul.</span></p>
              <p>A Szolgálati, kereseti célú kishajós bizonyítvány megszerzése érdekében az AUTOINFO HUNGARY EC az ÉKM által KÖFÁT / 26101-1/2024/HHF. számon engedélyezett képzés keretében elméleti, gyakorlati oktatást és vizsgát szervez.</p>
              <p>Az előadások témái: navigáció, hajózási szabályzat, hajóvezetéstan, meteorológia, hajóelmélet, hajógéptan, elsősegélynyújtás, környezetvédelem, tűzvédelem, valamint a kapcsolódó jogszabályok.</p>
              <p>Az elméleti képzés <span className="font-semibold">távoktatással</span> történik.</p>
              <p>A vizsga papír alapú tesztvizsgából és gyakorlati vizsgából áll, amelyek – a kedvtelési célú képzéstől eltérően – ugyanazon a napon kerülnek lebonyolításra.</p>
              <p>Sikeres vizsga esetén a résztvevők <span className="font-semibold">szolgálati / kereseti célú kishajó-vezető bizonyítványt</span> kapnak.</p>
            </div>

            <div>
              <SectionLabel>Díjak</SectionLabel>
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <DijTablazat />
              </div>
            </div>

            <div>
              <SectionLabel>Időpontok</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {DATES.map((d, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">{d.label}</p>
                    <p className="text-sm font-semibold text-water">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-sm text-slate-700 leading-relaxed space-y-4">
              <p>Azok akik már regisztráltak az oldalra, sportcélú vagy kompetencia vizsga kapcsán, nekik nem kell ismételten regisztrálni, csupán jelezni, hogy szeretnének foglalkozni a szolgálati, kereseti célú vizsgára való felkészüléssel.</p>
              <p>Terveink szerint a vizsgák időpontjai a havonta meghirdetett kishajós gyakorlati vizsgák időpontjával egyezőek lesznek.</p>
              <p>A gyakorlati oktatás és vizsga a Szegedi Vitorlás-kikötőben történik.</p>
              <p>Érdeklődés esetén letölthető a tervezett megállapodás, melynek E-mailben történő megküldése után az oktató videó elérhetővé válik, így az elméleti felkészülés azonnal elkezdhető.</p>
            </div>


            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-sm text-slate-700 space-y-2">
              <p className="font-semibold text-slate-900 mb-3">Kapcsolat és jelentkezés</p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-water" />
                <a href="tel:+36309786313" className="hover:underline">+36 30 978 6313</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-water" />
                <a href="mailto:kipper@kipper.hu" className="hover:underline text-water">kipper@kipper.hu</a>
              </p>
              <p className="flex items-center gap-2 text-xs mt-2">
                <MapPin className="w-4 h-4 text-water" />
                AUTOINFO HUNGARY EC · 6720 Szeged, Kazinczy u. 12.
              </p>
            </div>
          </div>
        )}

        {/* VIDEÓK */}
        {activeTab === "videok" && (
          <div className="w-full">
            {VIDEO_GROUPS.map((g, i) => <VideoAccordion key={i} group={g} />)}
          </div>
        )}

        {/* FELTÉTELEK */}
        {activeTab === "feltetelek" && (
          <div className="space-y-6">
            <SectionLabel>Vizsgára bocsátás feltételei</SectionLabel>
            <div className="space-y-2">
              {REQUIREMENTS.map((req, i) => (
                <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 bg-deepnavy text-accent">
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
              <SectionLabel>Kérdéssorok</SectionLabel>
              {TESTS.map((t, i) => <TestRow key={i} item={t} navigate={navigate} />)}
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
                <p>Az okmánykiadási kérelem benyújtása az eredményes elméleti és gyakorlati vizsga után a Szegedi Vitorlás-kikötőben történhet.</p>
                <ul className="space-y-1 text-slate-600">
                  <li>• Okmánykiadási díj: <span className="font-semibold">14 800 Ft</span></li>
                  <li>• 2 db szabványos <span className="font-semibold">35×45 mm-es</span> színes igazolványkép szükséges</li>
                  <li>• Legyártási idő: <span className="font-semibold">30 nap</span></li>
                  <li>• Normál esetben a kártyás okmány 2–3 héten belül postázásra kerül</li>
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
                <a key={i} href={d.href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 hover:bg-slate-50 transition-colors group">
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