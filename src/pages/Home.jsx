import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MessageCircle, CheckCircle2  } from 'lucide-react'
import WaveStrip from '../components/WaveStrip'

const SECTIONS = [
  { id: 'szabalyzat', label: 'Szabályzat', path: '/szabalyzat', img: 'zaszlo_1.webp' },
  { id: 'kepzesek',   label: 'Képzések',   path: '/kepzesek',   img: 'zaszlo_2.webp' },
  { id: 'berles',     label: 'Bérlés',     path: '/berles',     img: 'zaszlo_3.webp' },
  { id: 'hajoskonyv', label: 'Hajóskönyv', path: '/hajoskonyv', img: 'zaszlo_4.webp' },
  { id: 'termekek',   label: 'Termékek',   path: '/termekek',   img: 'zaszlo_5.webp' },
  { id: 'kurzus',     label: 'Kurzus',     path: '/kurzus',     img: 'zaszlo_6.webp' },
  { id: 'szorfozes',  label: 'Szörfözés',  path: '/szorfozes',  img: 'zaszlo_7.webp' },
]
const IMAGES = ['/kep1.jpg', '/kep2.jpg', '/kep3.jpg', '/kep4.jpg', '/kep5.jpg']

function ImageSlider() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCurrent(i => (i + 1) % IMAGES.length), 3500)
    return () => clearInterval(t)
  }, [])
  return (
    <section id="kepek" className="relative w-full bg-navy h-[560px] pt-12 scroll-mt-24">
      <div className="absolute inset-0 flex items-center justify-center px-4 py-8">
        {IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute w-auto h-full object-contain transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-10">
        {IMAGES.map((_, i) => (
          <button
            aria-label={`${i + 1}. kép`}
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-accent' : 'bg-white/40'}`}
          />
        ))}
      </div>
      {['←', '→'].map((arrow, dir) => (
        <button
          key={arrow}
          onClick={() => setCurrent(i => (i + (dir ? 1 : -1) + IMAGES.length) % IMAGES.length)}
          className={`absolute top-1/2 -translate-y-1/2 text-white text-2xl px-4 py-2 z-10 bg-black/35 rounded ${dir ? 'right-3' : 'left-3'}`}
        >
          {arrow}
        </button>
      ))}
      <div className="absolute bottom-0 left-0 right-0">
        <WaveStrip />
      </div>
    </section>
  )
}

function VideoSection() {
  const trackRef = useRef(null)
  const videos = [
    'https://www.youtube.com/embed/GOI8QW_p0nI',
    'https://www.youtube.com/embed/hUIeRUluQ78',
    'https://www.youtube.com/embed/zKOGKEnIiM8',
    'https://www.youtube.com/embed/SP6Q2yRsg4o',
    'https://www.youtube.com/embed/E1bdk7X6JV0',
    'https://www.youtube.com/embed/0Chx3bqrjo0',
    'https://www.youtube.com/embed/qfN-I7_k50Q',
    'https://www.youtube.com/embed/obw7k7Pl0vE',
    'https://www.youtube.com/embed/w7aD0uonRsQ',
    'https://www.youtube.com/embed/t6_NEnAH2dY',
    'https://www.youtube.com/embed/SH5QiO3iwsI',
    'https://www.youtube.com/embed/mo0FIU77w78',
    'https://www.youtube.com/embed/5h4mQEEJzRw',
    'https://www.youtube.com/embed/kALiuX7Sd2Y',
  ]

  return (
    <section id="videok" className="bg-navy relative py-12 px-6 pb-36 scroll-mt-28">
      <h2 className="text-center text-sail text-2xl font-cormorant font-bold tracking-widest mb-8 uppercase">
        Videók
      </h2>
      <button
        onClick={() => trackRef.current.scrollBy({ left: -292, behavior: 'smooth' })}
        className="absolute left-2 z-10 text-white text-2xl px-3 py-2 top-1/2 -translate-y-1/2 bg-black/35 rounded"
      >←</button>

      <div ref={trackRef} className="overflow-hidden">
        <div
          className="flex gap-3 w-max"
          style={{ animation: 'ticker 25s linear infinite' }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
        >
          {[...videos, ...videos].map((v, i) => (
            <div key={i} className="relative flex-shrink-0 rounded-xl overflow-hidden shadow-xl w-[280px] h-[158px]">
              <iframe src={v} title="Videók" className="absolute inset-0 w-full h-full" allowFullScreen />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => trackRef.current.scrollBy({ left: 292, behavior: 'smooth' })}
        className="absolute right-2 z-10 text-white text-2xl px-3 py-2 top-1/2 -translate-y-1/2 bg-black/35 rounded"
      >→</button>

      <div className="absolute bottom-0 left-0 right-0">
        <WaveStrip />
      </div>
    </section>
  )
}

function ContactSection() {
  const [msg, setMsg] = useState("")
  const [status, setStatus] = useState("idle")

  function handleSend() {
    if (!msg.trim()) return
    setStatus("loading")
    setTimeout(() => setStatus("done"), 1200)
  }

  function handleReset() {
    setMsg("")
    setStatus("idle")
  }

  return (
    <section id="kapcsolat" className="bg-white py-16 px-6 text-center scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-widest uppercase mb-2 text-water">
        Kapcsolat
      </h2>
      <p className="text-gray-500 mb-10">
        Készen állsz, hogy csatlakozz a kikötői közösségünkhöz?<br />
        Lépj velünk kapcsolatba még ma!
      </p>

      {status === "done" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-6 flex flex-col items-center gap-4 max-w-sm w-full mx-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            <p className="text-lg font-semibold text-slate-800">Üzenet elküldve!</p>
            <p className="text-sm text-slate-500 text-center">
              Üzenetedet sikeresen elküldtük. Hamarosan felvesszük veled a kapcsolatot.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-water text-white text-sm font-semibold rounded-lg hover:bg-water/80 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-10 justify-center items-center md:items-start text-left">
        <div className="flex flex-col gap-4 text-gray-700 text-sm">
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-water" />
            <span>+36-30-978-6313</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-water" />
            <span>kipper.gyorgy@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <MessageCircle size={18} className="text-water" />
            <span>kippergyorgy</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 flex-1 min-w-[220px] w-full">
          <label className="text-sm text-gray-500 font-medium">Üzenet</label>
          <textarea
            rows={4}
            value={msg}
            onChange={e => setMsg(e.target.value)}
            placeholder="Írja meg üzenetét..."
           className="border border-gray-300 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 text-gray-800 bg-water/10"
          />
          <button
            onClick={handleSend}
            disabled={status === "loading"}
            className={`self-end mt-2 px-5 py-3 text-white text-xs font-bold tracking-widest uppercase rounded-xl transition
              ${status === "loading" ? "bg-slate-600 scale-95 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-800 active:scale-95"}`}
          >
            {status === "loading" ? "Küldés..." : "Küldés"}
          </button>
        </div>
      </div>
    </section>
  )
}

function Footer({ scrollTo }) {
  const navigate = useNavigate()

  const PAGE_LINKS = [
    { id: 'szabalyzat', label: 'Szabályzat', path: '/szabalyzat' },
    { id: 'kepzesek',   label: 'Képzések',   path: '/kepzesek' },
    { id: 'berles',     label: 'Bérlés',     path: '/berles' },
    { id: 'termekek',   label: 'Termékek',   path: '/termekek' },
  ]

  const SCROLL_LINKS = [
    { id: 'hero',      label: 'Kezdőlap' },
    { id: 'kepek',     label: 'Képek' },
    { id: 'videok',    label: 'Videók' },
    { id: 'kapcsolat', label: 'Kapcsolat' },
  ]

  return (
    <footer className="bg-deepnavy pt-10 px-8">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center justify-center text-center">
      <div className="flex-shrink-0">
        <img src="/logo.webp" alt="Logo" className="w-20 h-20 rounded-full cursor-pointer mx-auto"
          onClick={() => scrollTo('hero')} />
      </div>

      <div>
        <h4 className="text-accent text-sm tracking-widest uppercase mb-3">Menü</h4>
        {PAGE_LINKS.map(({ id, label, path }) => (
          <button key={id} onClick={() => navigate(path)}
            className="block w-full text-white text-sm tracking-widest uppercase hover:text-accent mb-2">
            {label}
          </button>
        ))}
      </div>

      <div>
        <h4 className="text-accent text-sm tracking-widest uppercase mb-3">Oldalak</h4>
        {SCROLL_LINKS.map(({ id, label }) => (
          <button key={id} onClick={() => scrollTo(id)}
            className="block w-full text-white text-sm tracking-widest uppercase hover:text-accent mb-2">
            {label}
          </button>
        ))}
      </div>

      <div>
        <h4 className="text-accent text-base tracking-widest uppercase mb-3">Kapcsolat</h4>
        <p className="text-white text-base mb-2">+36-30-978-6313</p>
        <p className="text-white text-base mb-2">kipper.gyorgy@gmail.com</p>
        <p className="text-white text-base">kippergyorgy</p>
      </div>
    </div>

    <div className="mt-8 -mx-8">
      <WaveStrip />
    </div>
  </footer>
    
  )
}

export default function App() {
  const navigate = useNavigate()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-navy">

      <section id="hero" className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover brightness-75 saturate-90 z-0"
          autoPlay muted loop playsInline
        >
          <source src="/drone.mp4" type="video/mp4" />
        </video>

        {/* Navbar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-4 px-7 py-3 anim-fade-down bg-gradient-to-b from-navy/85 to-transparent">
          <img
            src="/logo.webp" alt="Logo"
            className="rounded-full border-2 border-yellow-400 cursor-pointer flex-shrink-0 w-[52px] h-[52px]"
            onClick={() => scrollTo('hero')}
          />
          <div className="flex flex-col leading-tight">
            <h1 className="font-cormorant text-sail text-2xl sm:text-3xl md:text-5xl font-bold tracking-wide">
              Szegedi Vitorláskikötő
            </h1>
            <span className="text-yellow-400 text-xs sm:text-sm md:text-base font-light tracking-[0.18em] uppercase">
              Kipper György
            </span>
          </div>
        </div>

        {/* Jobb oldali zászlók */}
        <nav className="absolute top-2 right-0 z-10 flex flex-col gap-2 scale-75 sm:scale-90 md:scale-100 origin-top-right">
          {SECTIONS.slice(0, 4).map((s) => (
            <div
              key={s.id}
              onClick={() => navigate(s.path)}
              className="cursor-pointer hover:-translate-x-1 transition-transform duration-300 relative overflow-hidden anim-slide-right w-[120px] h-[48px] sm:w-[150px] sm:h-[56px] md:w-[180px] md:h-[64px]"
            >
              <img src={s.img} alt={s.label} className="w-full h-full object-fill brightness-[0.45]" />
              <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.15em] uppercase [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]">
                {s.label}
              </span>
            </div>
          ))}

          <div className="h-20" />

          {SECTIONS.slice(4).map((s) => (
            <div
              key={s.id}
              onClick={() => navigate(s.path)}
              className="cursor-pointer hover:-translate-x-1 transition-transform duration-300 relative overflow-hidden anim-slide-right w-[120px] h-[48px] sm:w-[150px] sm:h-[56px] md:w-[180px] md:h-[64px]"
            >
              <img src={s.img} alt={s.label} className="w-full h-full object-fill brightness-[0.45]" />
              <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.15em] uppercase [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]">
                {s.label}
              </span>
            </div>
          ))}
        </nav>

        {/* Bejelentkezés / Kijelentkezés + Profil */}
        <div className="absolute left-0 z-10 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {localStorage.getItem('bejelentkezve') === 'true' ? (
            <>
              <div
                className="cursor-pointer px-5 py-4 max-w-[280px] transition-all duration-300 hover:translate-x-1 anim-slide-left bg-navy/55 backdrop-blur-sm border-l-[3px] border-accent"
                style={{ clipPath: 'polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%)' }}
                onClick={() => navigate("/profil")}
              >
                <h3 className="text-yellow-400 text-sm md:text-base tracking-[0.22em] uppercase mb-1">Profil</h3>
                <p className="text-white/85 text-sm md:text-base leading-relaxed font-light">
                  Tekintsd meg és szerkeszd adataidat.
                </p>
              </div>

              <div
                className="cursor-pointer px-5 py-4 max-w-[280px] transition-all duration-300 hover:translate-x-1 anim-slide-left-slow bg-navy/55 backdrop-blur-sm border-l-[3px] border-accent"
                style={{ clipPath: 'polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%)' }}
                onClick={() => {
                  localStorage.removeItem('bejelentkezve')
                  window.location.reload()
                }}
              >
                <h3 className="text-yellow-400 text-sm md:text-base tracking-[0.22em] uppercase mb-1">Kijelentkezés</h3>
                <p className="text-white/85 text-sm md:text-base leading-relaxed font-light">
                  Kattints a kijelentkezéshez.
                </p>
              </div>
            </>
          ) : (
            <div
              className="cursor-pointer px-5 py-4 max-w-[280px] transition-all duration-300 hover:translate-x-1 anim-slide-left bg-navy/55 backdrop-blur-sm border-l-[3px] border-accent"
              style={{ clipPath: 'polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%)' }}
              onClick={() => navigate("/bejelentkezes")}
            >
              <h3 className="text-yellow-400 text-sm md:text-base tracking-[0.22em] uppercase mb-1">Bejelentkezés</h3>
              <p className="text-white/85 text-sm md:text-base leading-relaxed font-light">
                Bejelentkezés után elérheted a tanfolyam videókat, tesztkérdéseket és próba vizsgákat.
              </p>
            </div>
          )}
        </div>

        {/* Regisztráció */}
        {localStorage.getItem('bejelentkezve') !== 'true' && (
          <div className="absolute bottom-32 left-0 z-10">
            <div
              className="cursor-pointer px-5 py-4 max-w-[220px] transition-all duration-300 hover:translate-x-1 anim-slide-left bg-navy/55 backdrop-blur-sm border-l-[3px] border-accent"
              style={{ clipPath: 'polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%)' }}
              onClick={() => navigate("/regisztracio")}
            >
              <h3 className="text-yellow-400 text-sm md:text-base tracking-[0.22em] uppercase mb-1">Regisztráció</h3>
              <p className="text-white/85 text-sm md:text-base leading-relaxed font-light">
                Regisztrálj most, és kezd el a tanfolyamokat!
              </p>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 z-20">
          <WaveStrip />
        </div>
      </section>

      <ImageSlider />
      <VideoSection />
      <ContactSection />
      <Footer scrollTo={scrollTo} />

    </div>
  )
}