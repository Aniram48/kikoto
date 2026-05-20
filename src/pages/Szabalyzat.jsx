import Navbar from "../components/Navbar"
import { Anchor, UserPlus, LogIn, PlayCircle, FileText, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function CsónakvezetesSzabalyai() {
  const navigate = useNavigate()
  const [openVideos, setOpenVideos] = useState({})

  const toggleVideo = (i) => setOpenVideos(prev => ({ ...prev, [i]: !prev[i] }))

  const actions = [
    {
      icon: UserPlus,
      title: "REGISZTRÁCIÓ",
      onClick: () => navigate("/regisztracio"),
      desc: "Új fiók létrehozása a teljes hozzáféréshez",
      disabled: false,
    },
    {
      icon: LogIn,
      title: "BEJELENTKEZÉS",
      onClick: () => navigate("/bejelentkezes"),
      desc: "Lépj be és folytasd a tanulást",
      disabled: false,
    },
    {
      icon: PlayCircle,
      title: "DEMÓ MÓD",
      onClick: () => {},
      desc: "Bejelentkezés nélkül kipróbálható, de nem menti az eredményeket",
      disabled: true,
    },
  ]

  const videos = [
    {
      title: "Csónakvezetés alapvető szabályai",
      videoId: "gpcxfyY9EWA",
    },
    {
      title: "Csónakvezetésre vonatkozó szabályok",
      videoId: "gpcxfyY9EWA",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-300 text-slate-950 pt-8">
      <Navbar />

      {/* HERO */}
      <div className="relative bg-slate-100 border-b border-slate-900/10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-6 text-center relative">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-slate-700 uppercase mb-5">
            <Anchor className="w-4 h-4 opacity-70" />
            Hajózási szabályzat
          </div>

          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-950 leading-tight mb-4">
            Csónakvezetés{" "}
            <span className="font-semibold text-water">szabályai</span>
          </h1>

          <p className="text-slate-600 max-w-md mx-auto text-base leading-relaxed">
            Regisztráció után elérhető a teljes tananyag, videók és vizsgakérdések.
          </p>

          <div className="mt-8 w-12 h-px bg-slate-400 mx-auto" />
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-6 pb-6">
        <div className="grid md:grid-cols-3 gap-4">
          {actions.map((a, i) => (
            <div
              key={i}
              onClick={a.onClick}
              className={`rounded-2xl p-5 flex items-start gap-4 border transition ${
                a.disabled
                  ? "bg-slate-50 border-slate-900/10 cursor-default"
                  : "cursor-pointer bg-slate-50 border-slate-900/10 hover:bg-slate-900 hover:border-slate-900 group"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  a.disabled
                    ? "bg-slate-950/5"
                    : "bg-slate-950/5 group-hover:bg-white/10"
                }`}
              >
                <a.icon
                  className={`w-5 h-5 ${
                    a.disabled
                      ? "text-slate-700"
                      : "text-slate-700 group-hover:text-white"
                  }`}
                />
              </div>

              <div>
                <div
                  className={`text-sm font-semibold tracking-widest uppercase ${
                    a.disabled
                      ? "text-slate-700"
                      : "text-slate-700 group-hover:text-slate-300"
                  }`}
                >
                  {a.title}
                </div>

                <div
                  className={`text-sm leading-relaxed mt-1 ${
                    a.disabled
                      ? "text-slate-600"
                      : "text-slate-600 group-hover:text-slate-300"
                  }`}
                >
                  {a.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-6 space-y-4">

        {/* VIDEÓK */}
        {videos.map((video, i) => (
          <div
            key={i}
            className="bg-slate-50 border border-slate-900/10 rounded-2xl overflow-hidden"
          >
            {/* Fejléc – kattintható */}
            <button
              onClick={() => toggleVideo(i)}
              className="w-full flex items-center justify-between px-8 py-5 hover:bg-slate-900 hover:text-white transition group"
            >
              <div className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-slate-700 group-hover:text-white" />
                <span className="text-sm font-semibold tracking-widest uppercase text-slate-700 group-hover:text-slate-300">
                  Videó {i + 1} — {video.title}
                </span>
              </div>

              <ChevronDown
                className={`w-5 h-5 text-slate-500 group-hover:text-white transition-transform duration-300 ${
                  openVideos[i] ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Videó – csak nyitva látszik */}
            {openVideos[i] && (
              <div className="px-8 pb-8">
                <div className="aspect-video w-[50%] mx-auto rounded-xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* VIZSGAKÉRDÉS */}
        <div className="bg-slate-50 border border-slate-900/10 rounded-2xl p-8 hover:bg-slate-900 hover:border-slate-900 transition group">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-slate-700 group-hover:text-white" />
            <h3 className="text-sm font-semibold tracking-widest uppercase text-slate-700 group-hover:text-slate-300">
              Vizsgakérdések
            </h3>
          </div>

          <p className="text-slate-700 group-hover:text-slate-300">
            középhaladó hajózási szabályzat vizsgakérdések regisztráltaknak
          </p>

          <button
            onClick={() => navigate("/vizsgakerdessor/szabalyzat")}
            className="mt-5 bg-slate-900 text-white px-5 py-3 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-slate-800 transition"
          >
            Kérdéssor kezdése
          </button>
        </div>

      </div>
    </div>
  )
}