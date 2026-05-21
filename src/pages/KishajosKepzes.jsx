import { useState, useEffect } from "react"
import {
  BookOpen, Monitor, Award, Trophy, Phone, Mail, MessageSquare,
  Shield, Ship, Users, Anchor, Navigation, ArrowLeft, Play,
  CheckSquare, BarChart2, FileDown, List, ChevronDown, ChevronUp,
  CheckCircle2,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import WaveStrip from '../components/WaveStrip'


//  Adatok 

const DATES = [
  { label: "Kezdés",           value: "2026. 04. 24. péntek",   highlight: true },
  { label: "Befejezés",        value: "2026. 05. 04. hétfő",    highlight: true },
  { label: "Elméleti vizsga",  value: "2026. 05. 05. kedd",     highlight: false },
  { label: "Gyakorlati vizsga",value: "2026. 05. 09. csütörtök",highlight: false },
  { label: "Javítóvizsga",     value: "2026. 05. 19. kedd",     highlight: false },
]

const STEPS = [
  { title: "Tájékoztató",                    desc: "A tanfolyammal kapcsolatos összes tudnivaló áttekintése", internal: false, href: "https://autoinfo.hu/szvk/wp-content/uploads/2025/03/tajekoztato_2025_03.doc" },
  { title: "Megállapodás és adminisztráció", desc: "Szerződéskötés, adatlapok kitöltése",                    internal: true },
  { title: "Orvosi alkalmassági igazolás",   desc: "Gépjármű-vezető egészségi alkalmasság igazolása",       internal: true },
  { title: "Nyilatkozat úszni tudásról",     desc: "Alapfokú úszástudás igazolása",                         internal: true },
  { title: "Vizsgadíj átutalás",             desc: "",                                                       internal: true },
  { title: "Tanfolyamdíj fizetés",           desc: "",                                                       internal: true },
  { title: "Elméleti vizsga",                desc: "Számítógépes tesztvizsga a KAVK vizsgatermében",         internal: true },
  { title: "Gyakorlati vizsga",              desc: "A Tiszán, időjárástól függő ütemezésben",                internal: true },
]

const VIDEO_GROUPS = [
  {
    title: "Hajózási szabályzat – I. rész",
    videoId: "gpcxfyY9EWA",
    chapters: [
      "1. fejezet: Általános rendelkezések",
      "2. fejezet: Azonosító- és merülési jelek, mércék",
      "3. fejezet: Hajók látható jelzései",
      "4. fejezet: Hangjelzések, rádiótelefon, navigációs készülékek",
    ],
  },
  {
    title: "Hajózási szabályzat – II. rész",
    videoId: "gpcxfyY9EWA",
    href: "https://autoinfo.hu/szvk/index.php/hajozasi-szabalyzat-oktato-videok-ii/",
    chapters: [
      "5. fejezet: Veszteglés szabályai",
      "6. fejezet: Általános rendelkezések",
      "7. fejezet: Veszteglés általános szabályai, kikötés",
      "8. fejezet: Vízszennyezés megelőzése és a hulladék eltávolítása",
    ],
  },
  {
    title: "Hajózási szabályzat – III. rész",
    videoId: "gpcxfyY9EWA",
    href: "https://autoinfo.hu/szvk/index.php/hajozasi-szabalyzat-oktato-videok-iii/",
    chapters: [
      "II/1. fejezet: Általános rendelkezések",
      "II/2. fejezet: Úszólétesítmények jelei, látható jelzések",
      "II/3. fejezet: Hajózási szabályok",
      "II/4. fejezet: Különleges szabályok (hajóhíd, zsilip, vitorlás)",
      "II/5. fejezet: Veszteglés szabályai",
    ],
  },
  {
    title: "Hajózási szabályzat – IV. rész",
    videoId: "gpcxfyY9EWA",
    href: "https://autoinfo.hu/szvk/index.php/hajozasi-szabalyzat-oktato-videok-iv/",
    chapters: [
      "II/6. fejezet: Csónak, komp, úszómű veszteglése",
      "II/7. fejezet: Egyes vízi utak részletes szabályai",
      "II/8–9. fejezet: Tavakra vonatkozó szabályok",
    ],
  },
  {
    title: "Vitorlás oktató videók – I.",
    videoId: "gpcxfyY9EWA",
    href: "https://autoinfo.hu/szvk/index.php/vitorlas-oktato-videok/",
    chapters: [
      "Általános tudnivalók",
      "Sporthajók általános jellemzése",
      "Vitorlás hajók szerkezete",
    ],
  },
  {
    title: "Vitorlás oktató videók – II.",
    videoId: "gpcxfyY9EWA",
    href: "https://autoinfo.hu/szvk/index.php/vitorlas-oktato-videok-ii/",
    chapters: [
      "Kormányelmélet",
      "Megállás és elindulás",
    ],
  },
]

const TESTS = [
  { title: "Hajózási szabályzat", sub: "Teljes kérdéssor kishajóvezetőknek · 536 kérdés", route: "/vizsgakerdessor/szabalyzat" },
  { title: "Hajózási ismeretek – Kisgéphajó", sub: "326 kérdés", route: "/vizsgakerdessor/kisgephajo" },
  { title: "Hajózási ismeretek – Vitorlás kishajó", sub: "416 kérdés", route: "/vizsgakerdessor/vitorlas" },
]

const PROBA = [
  { title: "Hajózási szabályzat – Próba vizsga", sub: "20 véletlenszerű kérdés", route: "/probavizsga/szabalyzat" },
  { title: "Kisgéphajó – Próba vizsga",          sub: "20 véletlenszerű kérdés", route: "/probavizsga/kisgephajo" },
  { title: "Vitorlás kishajó – Próba vizsga",    sub: "20 véletlenszerű kérdés", route: "/probavizsga/vitorlas" },
]

const DOCS = [
  { label: "Vizsgaidőpontok 2026", href: "https://autoinfo.hu/szvk/wp-content/uploads/2026/01/vizsgarend_tervezet_2026.xls" },
  { label: "Megállapodás",         href: "https://autoinfo.hu/szvk/wp-content/uploads/2025/04/megallapodas_kishajos_kepzes_2025_03.doc" },
  { label: "Orvosi igazolás",      href: "https://autoinfo.hu/szvk/wp-content/uploads/2022/05/kishajos_orvosi_igazolas.pdf" },
  { label: "Nyilatkozat úszni tudásról", href: "https://autoinfo.hu/szvk/wp-content/uploads/2020/02/nyilatkozat_uszni_tudasrol.doc" },
  { label: "Hatályos hajózási szabályzat", href: "https://autoinfo.hu/szvk/wp-content/uploads/2020/02/57_2011_nfm_20200106_hatalyos_hajozasi-szabalyzat.doc" },
  { label: "Vitorlás szakszavak jelentése", href: "https://autoinfo.hu/szvk/wp-content/uploads/2020/02/vitorlas_szakszavak_jelentese.pdf" },
]

//  localStorage 

const LS_KEY = "kishajos_lepesek_kesz"
const LS_PROGRESS = "kishajos_progress"

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(LS_PROGRESS) || "{}")
  } catch {
    return {}
  }
}

function saveProgress(data) {
  localStorage.setItem(LS_PROGRESS, JSON.stringify(data))
}

function getCompleted() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]")
  } catch {
    return []
  }
}

//  Kisebb komponensek 

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mt-6 mb-3">
      {children}
    </p>
  )
}

function VideoAccordion({ group }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white border border-slate-200 rounded-xl mb-2 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
      >
        <Play className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <span className="flex-1 text-sm font-medium text-slate-800">
          {group.title}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {open && (
        <div className="border-t border-slate-100 p-4">
          <div className="grid md:grid-cols-2 gap-4 items-start">
            <ul className="space-y-1">
              {group.chapters.map((ch, i) => (
                <li
                  key={i}
                  className="text-xs text-slate-500 py-1 border-b border-slate-100 last:border-0"
                >
                  {ch}
                </li>
              ))}
            </ul>
            {group.videoId && (
              <div className="w-full flex justify-center">
                <div className="w-full max-w-md aspect-video rounded-xl overflow-hidden">
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
        </div>
      )}
    </div>
  )
}

function TestRow({ item, btnLabel = "Kezdés" }) {
  const navigate = useNavigate()
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
        {btnLabel}
      </button>
    </div>
  )
}

//  Lépés sor 

function StepRow({ step, index, completed, navigate }) {
  const stepNum = index + 1
  const isInternal = step.internal
  const isDone = completed.includes(stepNum + 1)
  const checkDone = index === 0 ? false : isDone

  function handleClick(e) {
    if (isInternal) {
      e.preventDefault()
      navigate(`/kepzesek/kishajos/lepesek/${stepNum + 1}`)
    }
  }

  return (
    <div className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3">
      {checkDone ? (
        <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
        </span>
      ) : (
        <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 bg-deepnavy text-accent">
          {stepNum}
        </span>
      )}

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${checkDone ? "text-emerald-700" : "text-slate-800"}`}>
          {step.title}
        </p>
        {step.desc && <p className="text-xs text-slate-400 mt-0.5">{step.desc}</p>}
      </div>

      {checkDone && (
        <span className="flex-shrink-0 text-xs font-semibold text-emerald-500 self-center whitespace-nowrap">
          Elolvasva ✓
        </span>
      )}
    </div>
  )
}

//  Fő oldal 

const TABS = [
  { id: "menet",  label: "Tájékoztató",   Icon: List },
  { id: "videok", label: "Videók",         Icon: Play },
  { id: "tesztek",label: "Tesztkérdések", Icon: CheckSquare },
  { id: "vizsga", label: "Próba vizsga",  Icon: Trophy },
  { id: "naplo",  label: "Fejlődésnapló", Icon: BarChart2 },
  { id: "dok",    label: "Dokumentumok",  Icon: FileDown },
]

export default function KishajoKepzes() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("menet")
  const [completed, setCompleted] = useState([])
  const [progress, setProgress] = useState({})

  useEffect(() => {
    setCompleted(getCompleted())
    setProgress(getProgress())
  }, [])

  useEffect(() => {
    if (activeTab === "menet") {
      setCompleted(getCompleted())
    }
  }, [activeTab])

  useEffect(() => {
    const refresh = () => {
      setCompleted(getCompleted())
      setProgress(getProgress())
    }
    window.addEventListener("focus", refresh)
    return () => window.removeEventListener("focus", refresh)
  }, [])

  const NAPLO_CARDS = [
    { key: "szabalyzat", title: "Hajózási szabályzat" },
    { key: "kisgephajo", title: "Kisgéphajó" },
    { key: "vitorlas",   title: "Vitorlás kishajó" },
    { key: "probavizsga", title: "Próba vizsgák", staticDesc: "Eredmények időrendben" },
  ]

  const totalInternal = 7
  const doneCount = completed.filter(n => n >= 2 && n <= 8).length
  const allDone = doneCount === totalInternal

  return (
    <div className="min-h-screen bg-slate-300 text-slate-950 pt-16 flex flex-col">
      <Navbar />

      {/* Fejléc */}
      <div className="relative bg-slate-100 border-b border-slate-900/10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 pt-10 pb-14">
          <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-widest text-slate-700 uppercase mb-4">
            <ArrowLeft
              className="w-6 h-6 cursor-pointer text-water hover:opacity-70 transition-opacity -ml-1"
              onClick={() => navigate('/kepzesek')}
              title="Vissza"
            />
            <Anchor className="w-4 h-4" /> Belvízi képzés
          </div>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-950 leading-tight">
            Kishajós{' '}
            <span className="font-semibold italic text-water">képzés</span>
          </h1>
          <p className="mt-4 text-slate-600 max-w-xl text-base leading-relaxed">
            Kedvtelési célú vitorlás, kisgéphajó és jetski vezető képzés akkreditált képzőszervünkkel.
          </p>
        </div>
      </div>

      {/* Tab sáv */}
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

      {/* Tartalom */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-20 flex-1 w-full">

        {/* TANFOLYAM MENETE */}
        {activeTab === "menet" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {DATES.map((d, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-3">
                  <p className="text-xs text-slate-400 mb-1">{d.label}</p>
                  <p className={`text-sm font-semibold ${d.highlight ? "text-deepnavy" : "text-slate-700"}`}>
                    {d.value}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <SectionLabel>Lépések</SectionLabel>
              <div className="space-y-2">
                {STEPS.map((s, i) => (
                  <StepRow
                    key={i}
                    step={s}
                    index={i}
                    completed={completed}
                    navigate={navigate}
                  />
                ))}
              </div>
            </div>

            {/* DÍJAK */}
            <div>
              <SectionLabel>Díjak</SectionLabel>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-xs bg-white">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left px-4 py-3 text-slate-500 font-semibold tracking-widest uppercase">Tanfolyam</th>
                      <th className="text-right px-4 py-3 text-slate-500 font-semibold tracking-widest uppercase">Tanfolyamdíj</th>
                      <th className="text-right px-4 py-3 text-slate-500 font-semibold tracking-widest uppercase">Vizsga + Okmány</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        nev: "Kisgéphajó-vezető",
                        tandij: "21.000 + 21.000 + 2×4.000",
                        tandijOsszeg: "50.000 Ft",
                        vizsga: "2×10.900 + 28.300 + 16.100",
                        vizsgaOsszeg: "66.200 Ft",
                      },
                      {
                        nev: "Vitorlás kishajó-vezető",
                        tandij: "31.000 + 31.000 + 2×4.000",
                        tandijOsszeg: "70.000 Ft",
                        vizsga: "2×10.900 + 28.300 + 16.100",
                        vizsgaOsszeg: "66.200 Ft",
                      },
                      {
                        nev: "Kisgéphajó + Vitorlás együtt",
                        tandij: "56.000 + 56.000 + 2×4.000",
                        tandijOsszeg: "120.000 Ft",
                        vizsga: "3×10.900 + 2×28.300 + 16.100",
                        vizsgaOsszeg: "105.400 Ft",
                      },
                      {
                        nev: "Tanfolyam diákoknak",
                        tandij: "17.000 + 23.000",
                        tandijOsszeg: "40.000 Ft",
                        vizsga: "—",
                        vizsgaOsszeg: "vizsga nélkül",
                      },
                    ].map((r, i) => (
                      <tr key={i} className={`border-b border-slate-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-slate-800">{r.nev}</p>
                          <p className="text-slate-400 mt-0.5">{r.tandij}</p>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <p className="font-bold text-deepnavy">{r.tandijOsszeg}</p>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <p className="text-slate-400 mb-0.5">{r.vizsga}</p>
                          <p className="font-bold text-deepnavy">{r.vizsgaOsszeg}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIDEÓK */}
        {activeTab === "videok" && (
          <div>
            <SectionLabel>Hajózási szabályzat</SectionLabel>
            {VIDEO_GROUPS.slice(0, 4).map((g, i) => <VideoAccordion key={i} group={g} />)}
            <SectionLabel>Vitorlás</SectionLabel>
            {VIDEO_GROUPS.slice(4).map((g, i) => <VideoAccordion key={i} group={g} />)}
          </div>
        )}

        {/* TESZTKÉRDÉSEK */}
        {activeTab === "tesztek" && (
          <div>
            <p className="text-sm text-slate-500 mb-4">
              Teljes kérdéssorok – bármikor korlátlanul gyakorolható, okostelefonról is.
            </p>
            {TESTS.map((t, i) => <TestRow key={i} item={t} />)}
          </div>
        )}

        {/* PRÓBA VIZSGA */}
        {activeTab === "vizsga" && (
          <div>
            <p className="text-sm text-slate-500 mb-4">
              A hivatalos számítógépes vizsgát élethűen szimuláló házivizsga.
              20 véletlenszerű kérdés, 1 perc/kérdés.
              Értékelés: 5 hibáig <em>megfelelt</em>, fölötte <em>nem felelt meg</em>.
            </p>
            {PROBA.map((t, i) => <TestRow key={i} item={t} btnLabel="Indítás" />)}
          </div>
        )}

        {/* FEJLŐDÉSNAPLÓ */}
        {activeTab === "naplo" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {NAPLO_CARDS.map((c) => {
                const p = progress[c.key]
                return (
                  <div key={c.key} className="bg-white border border-slate-200 rounded-xl p-5">
                    <BarChart2 className="w-5 h-5 mb-3 text-deepnavy" />
                    <p className="text-sm font-semibold text-slate-800">{c.title}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {c.staticDesc
                        ? c.staticDesc
                        : p
                          ? `${p.answered} kérdés · ${p.lastScore}% helyes`
                          : "0% teljesítve"}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* DOKUMENTUMOK */}
        {activeTab === "dok" && (
          <div>
            <SectionLabel>Letölthető dokumentumok</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DOCS.map((d, i) => (
                <a key={i} href={d.href} target="_blank" rel="noreferrer"
                  className="group relative flex items-center gap-3 bg-slate-50 border border-slate-900/10 rounded-xl px-4 py-3 overflow-hidden hover:bg-slate-900 hover:border-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                  <FileDown className="w-4 h-4 flex-shrink-0 text-deepnavy group-hover:text-accent transition-colors duration-300" />
                  <span className="text-sm text-slate-700 group-hover:text-white transition-colors duration-300">{d.label}</span>
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