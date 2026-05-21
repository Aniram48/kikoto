import { useState, useRef, useEffect, useMemo  } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CheckCircle, XCircle, SkipForward, Eye, BarChart2, ChevronLeft, ChevronRight } from "lucide-react"
import Navbar from "./Navbar"

// ── KÉRDÉSEK típusonként ──────────────────────────────────
const OSSZES_KERDES = {
  szabalyzat: [
    { kerdes: "Mit értünk hajón a Szabályzat I. része alapján? Hajó", valaszok: ["a nagyhajó, a kishajó, a vízi sporteszköz és az úszómű.", "minden vízijármű és úszómunkagép.", "a belvízi hajó, beleértve a kishajót és kompot, továbbá a tengeri hajó és az úszómunkagép."], helyes: 2 },
    { kerdes: "Szabályzat 2. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Szabályzat 3. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Szabályzat 4. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Szabályzat 5. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Szabályzat 6. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Szabályzat 7. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Szabályzat 8. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Szabályzat 9. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Szabályzat 10. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
  ],
  hajovezetestan: [
    { kerdes: "Hajóvezetéstan 1. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Hajóvezetéstan 2. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Hajóvezetéstan 3. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Hajóvezetéstan 4. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Hajóvezetéstan 5. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Hajóvezetéstan 6. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Hajóvezetéstan 7. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Hajóvezetéstan 8. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Hajóvezetéstan 9. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Hajóvezetéstan 10. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
  ],
  meteorologia: [
    { kerdes: "Meteorológia 1. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Meteorológia 2. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Meteorológia 3. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Meteorológia 4. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Meteorológia 5. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Meteorológia 6. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Meteorológia 7. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Meteorológia 8. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Meteorológia 9. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Meteorológia 10. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
  ],
  hajogeptan: [
    { kerdes: "Hajógéptan 1. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Hajógéptan 2. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Hajógéptan 3. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Hajógéptan 4. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Hajógéptan 5. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Hajógéptan 6. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Hajógéptan 7. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Hajógéptan 8. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Hajógéptan 9. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Hajógéptan 10. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
  ],
  jog: [
    { kerdes: "Jog 1. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Jog 2. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Jog 3. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Jog 4. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Jog 5. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Jog 6. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Jog 7. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Jog 8. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Jog 9. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Jog 10. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
  ],
  elsosegely: [
    { kerdes: "Elsősegély 1. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Elsősegély 2. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Elsősegély 3. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Elsősegély 4. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Elsősegély 5. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Elsősegély 6. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Elsősegély 7. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Elsősegély 8. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Elsősegély 9. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Elsősegély 10. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
  ],
  tengeri: [
    { kerdes: "Mit nevezünk hosszúsági köröknek?", valaszok: ["Az egyenlítővel párhuzamosak köröket, amelyek Greenwich-ben egy pontba futnak össze.", "Az Egyenlítővel párhuzamosak köröket, amelyek a pólusokon egy pontba futnak össze.", "Az Egyenlítő síkjára merőleges és a pólusokon áthaladó köröket."], helyes: 2 },
    { kerdes: "Elsősegély 3. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Mennyi egy tengeri mérföld hossza méterben?", valaszok: ["1528 méter.", "1528 méter.", "1852 méter."], helyes: 2 },
    { kerdes: "Elsősegély 5. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Elsősegély 6. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Elsősegély 7. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Elsősegély 8. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Elsősegély 9. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Elsősegély 10. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Elsősegély 10. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
  ],
  kisgephajo: [
    { kerdes: "Elsősegély 1. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Elsősegély 2. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Elsősegély 3. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Elsősegély 4. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Elsősegély 5. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Elsősegély 6. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Elsősegély 7. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Elsősegély 8. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Elsősegély 9. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Elsősegély 10. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
  ],
  vitorlas: [
    { kerdes: "Elsősegély 1. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Elsősegély 2. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Elsősegély 3. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Elsősegély 4. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Elsősegély 5. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Elsősegély 6. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Elsősegély 7. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
    { kerdes: "Elsősegély 8. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 1 },
    { kerdes: "Elsősegély 9. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 0 },
    { kerdes: "Elsősegély 10. kérdés", valaszok: ["Válasz A", "Válasz B", "Válasz C"], helyes: 2 },
  ],
}

const CIMEK = {
  szabalyzat: "Hajózási szabályzat, IV. szint",
  hajovezetestan: "Hajóvezetéstan, IV. szint",
  meteorologia: "Hajózási földrajz, vízrajz, meteorológia",
  hajogeptan: "Hajóelmélet és hajógéptan",
  jog: "Jog és rendeletismeret",
  elsosegely: "Elsősegély és tűzvédelem",
  tengeri: "Tengeri IV. osztályú kishajós kérdéssor",
  kisgephajo: "Hajózási ismeretek – Kisgéphajó",
  vitorlas: "Hajózási ismeretek – Vitorlás kishajó",
}

function saveTestResult(type, correct, wrong) {
  const progress = getProgress()

  progress[type] = {
    answered: correct + wrong,
    correct,
    wrong,
    lastScore: Math.round((correct / (correct + wrong)) * 100),
    lastPlayed: new Date().toISOString()
  }

  saveProgress(progress)
}
const LS_KEY = "kishajos_progress"

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "{}")
  } catch {
    return {}
  }
}

function saveProgress(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data))
}

export default function VizsgaKerdessor({ tipus: tiusProp, proba }) {
  const { tipus: tipusParam } = useParams()
  const tipus = tiusProp ?? tipusParam
  const navigate = useNavigate()
  const [kilepesMegerosites, setKilepesMegerosites] = useState(false)
  const OSSZES = OSSZES_KERDES[tipus] ?? OSSZES_KERDES["szabalyzat"]
  const KERDESEK = useMemo(() => {
    if (!proba) return OSSZES
    const shuffled = [...OSSZES].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5)
  }, [tipus, proba])
  const CIM = CIMEK[tipus] ?? "Kérdéssor"

  const [aktualis, setAktualis] = useState(0)
  const [valasztott, setValasztott] = useState({})
  const [allapot, setAllapot] = useState({})
  const [ellenorzott, setEllenorzott] = useState({})
  const [osszesito, setOsszesito] = useState(false)

  const k = KERDESEK[aktualis]
  const kiVan = valasztott[aktualis] !== undefined
  const ellenőrizveVan = !!ellenorzott[aktualis]

  const [ido, setIdo] = useState(60)
  const timerRef = useRef(null)
  const aktualasRef = useRef(0) 

      useEffect(() => {
      aktualasRef.current = aktualis
    }, [aktualis])

    useEffect(() => {
      setIdo(60)
      if (timerRef.current) clearInterval(timerRef.current)

      timerRef.current = setInterval(() => {
        setIdo((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            const idx = aktualasRef.current
            setAllapot((prevState) => ({
              ...prevState,
              [idx]: prevState[idx] ?? "atugort"
            }))
            setAktualis((p) => (p < KERDESEK.length - 1 ? p + 1 : p))
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timerRef.current)
    }, [aktualis])


  function ugrasKerdesre(i) {
    if (timerRef.current) clearInterval(timerRef.current) 
    setOsszesito(false)
    setAllapot((prev) => ({ ...prev, [aktualis]: prev[aktualis] ?? "atugort" }))
    setAktualis(i)
  }

  function valasszon(vi) {
    if (ellenőrizveVan) return
    setValasztott((prev) => ({ ...prev, [aktualis]: vi }))
    setAllapot((prev) =>
      prev[aktualis] === "helyes" || prev[aktualis] === "hibas"
        ? prev
        : { ...prev, [aktualis]: undefined }
    )
  }

  function ellenorzes() {
    if (!kiVan) return
    const jo = valasztott[aktualis] === k.helyes
    setAllapot((prev) => ({ ...prev, [aktualis]: jo ? "helyes" : "hibas" }))
    setEllenorzott((prev) => ({ ...prev, [aktualis]: true }))
  }

  function helyes() {
    setValasztott((prev) => ({ ...prev, [aktualis]: k.helyes }))
    setAllapot((prev) => ({ ...prev, [aktualis]: "megtekintett" }))
    setEllenorzott((prev) => ({ ...prev, [aktualis]: true }))
  }

  function kihagy() {
  if (timerRef.current) clearInterval(timerRef.current) 
  setAllapot((prev) => ({ ...prev, [aktualis]: "atugort" }))
  setAktualis((p) => (p < KERDESEK.length - 1 ? p + 1 : p))
  }


  function elozo() {
    if (timerRef.current) clearInterval(timerRef.current) 
    if (aktualis > 0) setAktualis((p) => p - 1)
  }

  const helyes_db = Object.values(allapot).filter((v) => v === "helyes").length
  const hibas_db = Object.values(allapot).filter((v) => v === "hibas").length
  const valasz_db = helyes_db + hibas_db

    useEffect(() => {
    if (osszesito) {
      saveTestResult(tipus, helyes_db, hibas_db)
    }
  }, [osszesito])

  return (
    <div className="min-h-screen bg-slate-300 text-slate-950">
      <Navbar />
      <div className="max-w-4xl mx-auto space-y-6 pt-20 px-4">

        {/* Fejléc */}
            <div className="bg-slate-50 border border-slate-900/10 rounded-2xl px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setKilepesMegerosites(true)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition font-semibold">
                  <ChevronLeft className="w-4 h-4" /> Kilépés
                </button>
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase text-slate-500">{CIM}</div>
                  <div className="text-sm text-slate-700 mt-0.5">
                    Kérdés: <span className="font-bold text-slate-950">{aktualis + 1} / {KERDESEK.length}</span>
                  </div>
                  <div className={`text-xs font-bold ${ido <= 10 ? "text-red-600" : "text-slate-700"}`}>
                    Idő: {ido}mp
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-1 text-blue-600"><span className="w-2.5 h-2.5 rounded-sm bg-blue-400 inline-block" /> Megtekintett</span>
                <span className="flex items-center gap-1 text-yellow-600"><span className="w-2.5 h-2.5 rounded-sm bg-yellow-400 inline-block" /> Kihagyott</span>
                <span className="flex items-center gap-1 text-red-600"><span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block" /> Hibás</span>
                <span className="flex items-center gap-1 text-green-600"><span className="w-2.5 h-2.5 rounded-sm bg-green-400 inline-block" /> Helyes</span>
              </div>
            </div>

            {kilepesMegerosites && (
              <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl space-y-4">
                  <p className="text-slate-800 font-semibold text-base">Biztosan ki szeretnél lépni?</p>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setKilepesMegerosites(false)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold tracking-widest uppercase transition"
                    >
                      Maradok
                    </button>
                    <button
                      onClick={() => navigate(-1)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 text-white hover:bg-slate-800 text-xs font-bold tracking-widest uppercase transition"
                    >
                      Kilépés
                    </button>
                  </div>
                </div>
              </div>
            )}
        {/* Kérdésrács */}
        <div className="bg-slate-50 border border-slate-900/10 rounded-2xl p-4">
          <div className="flex flex-wrap gap-1.5">
            {KERDESEK.map((_, i) => {
              const a = allapot[i]
              const aktiv = i === aktualis
              const base =
                a === "helyes" ? "bg-green-400 text-white border-green-500" :
                a === "hibas" ? "bg-red-500 text-white border-red-600" :
                a === "atugort" ? "bg-yellow-400 text-slate-900 border-yellow-500" :
                valasztott[i] !== undefined ? "bg-blue-400 text-white border-blue-500" :
                "bg-slate-200 text-slate-700 border-slate-300"
              return (
                <button key={i} onClick={() => ugrasKerdesre(i)}
                  className={`w-9 h-9 rounded-lg text-xs font-semibold border transition ${base} ${aktiv ? "ring-2 ring-slate-950 ring-offset-1" : "hover:opacity-80"}`}>
                  {i + 1}
                </button>
              )
            })}
          </div>
        </div>

        {/* Kérdés panel */}
        {!osszesito ? (
          <div className="bg-slate-50 border border-slate-900/10 rounded-2xl p-8 space-y-6">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">
                {aktualis + 1}. kérdés
              </div>
              <p className="text-base text-slate-800 leading-relaxed">{k.kerdes}</p>
            </div>

            <div className="space-y-3">
              {k.valaszok.map((v, vi) => {
                const kivalasztva = valasztott[aktualis] === vi
                let stilus = "w-full text-left px-5 py-3.5 rounded-xl border text-sm transition flex items-center gap-3 "
                if (ellenőrizveVan) {
                  if (vi === k.helyes) stilus += "bg-green-50 border-green-400 text-green-800 font-semibold"
                  else if (kivalasztva) stilus += "bg-red-50 border-red-400 text-red-700"
                  else stilus += "bg-slate-100 border-slate-200 text-slate-500"
                } else {
                  stilus += kivalasztva
                    ? "bg-slate-900 border-slate-900 text-white"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                }
                return (
                  <button key={vi} onClick={() => valasszon(vi)} className={stilus}>
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                      ${ellenőrizveVan && vi === k.helyes ? "border-green-500" :
                        ellenőrizveVan && kivalasztva ? "border-red-400" :
                        kivalasztva ? "border-white" : "border-slate-300"}`}>
                      {kivalasztva && !ellenőrizveVan && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
                      {ellenőrizveVan && vi === k.helyes && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {ellenőrizveVan && kivalasztva && vi !== k.helyes && <XCircle className="w-4 h-4 text-red-400" />}
                    </span>
                    {v}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
              <div className="flex gap-2">
                <button onClick={kihagy} disabled={ellenőrizveVan}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 disabled:opacity-40 text-xs font-bold tracking-widest uppercase transition">
                  <SkipForward className="w-4 h-4" /> Kihagyás
                </button>
                <button onClick={() => setOsszesito(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-xs font-bold tracking-widest uppercase transition">
                  <BarChart2 className="w-4 h-4" /> Összesítő
                </button>
              </div>
              <div className="flex gap-2">
                <button onClick={helyes} disabled={ellenőrizveVan}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-40 text-xs font-bold tracking-widest uppercase transition">
                  <Eye className="w-4 h-4" /> Helyes válasz
                </button>
                <button onClick={ellenorzes} disabled={!kiVan || ellenőrizveVan}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 text-white hover:bg-slate-800 disabled:opacity-40 text-xs font-bold tracking-widest uppercase transition">
                  Ellenőrzés
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-1">
              <button onClick={elozo} disabled={aktualis === 0}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 disabled:opacity-30 transition font-semibold">
                <ChevronLeft className="w-4 h-4" /> Előző
              </button>
              <button
                onClick={() => {
                  if (timerRef.current) clearInterval(timerRef.current) 
                  setAllapot((prev) => ({
                    ...prev,
                    [aktualis]: prev[aktualis] ?? "atugort"
                  }))
                  setAktualis((p) => (p < KERDESEK.length - 1 ? p + 1 : p))
                }}
                disabled={aktualis === KERDESEK.length - 1}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 disabled:opacity-30 transition font-semibold">
                Következő <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-900/10 rounded-2xl p-8 space-y-6">
            <div className="text-sm font-semibold tracking-widest uppercase text-slate-500">Kérdés összesítő</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Összes", value: KERDESEK.length, color: "text-slate-800" },
                { label: "Megválaszolt", value: valasz_db, color: "text-blue-600" },
                { label: "Helyes", value: helyes_db, color: "text-green-600" },
                { label: "Hibás", value: hibas_db, color: "text-red-600" },
              ].map((s) => (
                <div key={s.label} className="bg-slate-100 rounded-xl p-4 text-center border border-slate-200">
                  <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-slate-500 mt-1 font-semibold tracking-widest uppercase">{s.label}</div>
                </div>
              ))}
            </div>
            {valasz_db > 0 && (
              <div>
                <div className="text-xs text-slate-500 mb-2 font-semibold tracking-widest uppercase">Eredmény</div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-green-400 transition-all" style={{ width: valasz_db ? `${(helyes_db / valasz_db) * 100}%` : '0%'}} />
                </div>
                <div className="text-right text-xs text-slate-500 mt-1">{Math.round((helyes_db / valasz_db) * 100)}% helyes</div>
              </div>
            )}
            <button onClick={() => setOsszesito(false)}
              className="mt-2 bg-slate-950 text-white px-5 py-3 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-slate-800 transition">
              Vissza a kérdésekhez
            </button>
          </div>
        )}
      </div>
    </div>
  )
}