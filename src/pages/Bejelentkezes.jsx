import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Wave from '../components/Wave'
import Navbar from '../components/Navbar'
import WaveStrip from '../components/WaveStrip'
import { Eye, EyeOff } from 'lucide-react'

const DEMO_EMAIL = 'proba@gmail.hu'
const DEMO_JELSZO = 'Proba1234'

export default function Bejelentkezes() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [jelszo, setJelszo] = useState('')
  const [jelszoLatszik, setJelszoLatszik] = useState(false)
  const [hibak, setHibak] = useState({})

  function validal() {
    const uj = {}
    if (!email) uj.email = 'Az email cím megadása kötelező.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) uj.email = 'Érvénytelen email formátum.'
    if (!jelszo) uj.jelszo = 'A jelszó megadása kötelező.'
    else if (jelszo.length < 6) uj.jelszo = 'A jelszó túl rövid.'
    setHibak(uj)
    return Object.keys(uj).length === 0
  }

  function handleSubmit() {
    if (!validal()) return

    if (email === DEMO_EMAIL && jelszo === DEMO_JELSZO) {
      localStorage.setItem('bejelentkezve', 'true')
      localStorage.setItem('email', email)
      localStorage.setItem('nev', 'Próba Felhasználó')
      navigate('/')
    } else {
      setHibak({ altalanos: 'Hibás email cím vagy jelszó.' })
    }
  }

  return (
    <div className="min-h-screen bg-sail flex flex-col pt-16 ">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">

          <div className="bg-white border-2 border-water/30 rounded overflow-hidden shadow-sm relative">
            <div className="absolute w-full z-0 bottom-0">
              <Wave height={45} />
            </div>

            <div className="pt-6 pb-4 text-center">
              <h2 className=" text-sm font-semibold tracking-[0.2em] text-water uppercase">
                Bejelentkezés
              </h2>
            </div>

            <div className="relative px-10 z-10 pb-6">

              {/* Általános hiba */}
              {hibak.altalanos && (
                <p className=" text-red-500 text-sm text-center mb-3">{hibak.altalanos}</p>
              )}

              {/* Email */}
              <label className="block  text-xs tracking-wider uppercase text-water mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="pelda@gmail.com"
                className={` w-full bg-gray-50 border rounded px-4 py-2.5 text-xs text-water
                            placeholder:text-water/40 focus:outline-none focus:ring-1
                            transition-all duration-200 mb-1
                            ${hibak.email ? 'border-red-400 focus:ring-red-400' : 'border-water/30 focus:ring-water'}`}
              />
              {hibak.email && <p className=" text-red-500 text-xs mb-3">{hibak.email}</p>}
              {!hibak.email && <div className="mb-4" />}

              {/* Jelszó */}
              <label className="block  text-xs tracking-wider uppercase text-water mb-1">Jelszó</label>
              <div className="relative mb-1">
                <input
                  type={jelszoLatszik ? 'text' : 'password'}
                  value={jelszo}
                  onChange={e => setJelszo(e.target.value)}
                  placeholder="••••••"
                  className={` w-full bg-gray-50 border rounded px-4 py-2.5 text-xs text-water
                              placeholder:text-water/40 focus:outline-none focus:ring-1
                              transition-all duration-200 pr-10
                              ${hibak.jelszo ? 'border-red-400 focus:ring-red-400' : 'border-water/30 focus:ring-water'}`}
                />
                <button
                  type="button"
                  onClick={() => setJelszoLatszik(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-water/50 hover:text-water text-xs transition"
                >
                  {jelszoLatszik ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {hibak.jelszo && <p className=" text-red-500 text-xs mb-3">{hibak.jelszo}</p>}
              {!hibak.jelszo && <div className="mb-4" />}

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-water/30 accent-water" />
                  <span className=" text-sm text-water/70">Emlékezz rám</span>
                </label>
                <button
                  onClick={handleSubmit}
                  className=" tracking-widest uppercase px-6 py-2.5 bg-water hover:bg-navy active:scale-[0.98]
                             text-sail text-xs font-medium rounded transition-all duration-200">
                  Bejelentkezés
                </button>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-4 px-1 space-y-1">
            <p className=" text-sm text-water/60">
              <span onClick={() => navigate('/regisztracio')}
                className="cursor-pointer hover:text-water hover:underline">Regisztráció</span>
              {' | '}
              <span onClick={() => navigate('/uj_jelszo')}
                className="cursor-pointer hover:text-water hover:underline">Elfelejtett jelszó?</span>
            </p>
            <p onClick={() => navigate('/')}
              className=" text-sm text-water/60 cursor-pointer hover:text-water hover:underline w-fit">
              ← Irány a(z) Szegedi Vitorláskikötő
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <WaveStrip />
      </div>
    </div>
  )
}