import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Wave from '../components/Wave'
import Navbar from '../components/Navbar'
import WaveStrip from '../components/WaveStrip'
import { Eye, EyeOff } from 'lucide-react'

export default function Regisztracio() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [felhasznalonev, setFelhasznalonev] = useState('')
  const [jelszo, setJelszo] = useState('')
  const [jelszoUjra, setJelszoUjra] = useState('')
  const [telefon, setTelefon] = useState('')
  const [jelszoLatszik, setJelszoLatszik] = useState(false)
  const [jelszoUjraLatszik, setJelszoUjraLatszik] = useState(false)
  const [hibak, setHibak] = useState({})

  function jelszoErosseg(j) {
    if (j.length === 0) return null
    let pont = 0
    if (j.length >= 8) pont++
    if (/[A-Z]/.test(j)) pont++
    if (/[0-9]/.test(j)) pont++
    if (/[^A-Za-z0-9]/.test(j)) pont++
    if (pont <= 1) return { szoveg: 'Gyenge', szin: 'bg-red-400', szeles: 'w-1/4' }
    if (pont === 2) return { szoveg: 'Közepes', szin: 'bg-yellow-400', szeles: 'w-2/4' }
    if (pont === 3) return { szoveg: 'Erős', szin: 'bg-green-400', szeles: 'w-3/4' }
    return { szoveg: 'Nagyon erős', szin: 'bg-green-600', szeles: 'w-full' }
  }

  function validal() {
    const uj = {}
    if (!email) uj.email = 'Az email cím megadása kötelező.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) uj.email = 'Érvénytelen email formátum.'
    if (!felhasznalonev) uj.felhasznalonev = 'A felhasználónév megadása kötelező.'
    if (!jelszo) uj.jelszo = 'A jelszó megadása kötelező.'
    else if (jelszo.length < 8) uj.jelszo = 'A jelszó legalább 8 karakter legyen.'
    else if (!/[A-Z]/.test(jelszo)) uj.jelszo = 'A jelszónak tartalmaznia kell legalább egy nagybetűt.'
    else if (!/[0-9]/.test(jelszo)) uj.jelszo = 'A jelszónak tartalmaznia kell legalább egy számot.'
    if (!jelszoUjra) uj.jelszoUjra = 'Kérjük erősítse meg a jelszót.'
    else if (jelszo !== jelszoUjra) uj.jelszoUjra = 'A két jelszó nem egyezik.'
    if (telefon && !/^[+\d\s\-()]+$/.test(telefon)) {
        uj.telefon = 'Csak számokat, kötőjelet és + jelet tartalmazhat.'
      } else if (telefon && telefon.replace(/\D/g, '').length < 8) {
        uj.telefon = 'A telefonszám túl rövid (min. 8 szám).'
      } else if (telefon && telefon.replace(/\D/g, '').length > 15) {
        uj.telefon = 'A telefonszám túl hosszú (max. 15 szám).'
      }
    setHibak(uj)
    return Object.keys(uj).length === 0
  }

  function handleSubmit() {
    if (validal()) {
      navigate('/bejelentkezes')
    }
  }

  const erosseg = jelszoErosseg(jelszo)

  return (
    <div className="min-h-screen bg-sail flex flex-col pt-16">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">

          <div className="bg-white border-2 border-water/30 rounded shadow-sm relative overflow-hidden">

            <div className="absolute w-full z-0 bottom-0">
              <Wave height={45} />
            </div>

            <div className="relative z-10 pt-5 pb-3 text-center">
              <h2 className="text-base font-semibold tracking-[0.2em] text-water uppercase">
                Regisztráció
              </h2>
            </div>

            <div className="relative z-10 px-10 pb-4">

              {/* Email */}
              <label className="block text-xs text-water mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="pelda@gmail.com"
                className={`w-full bg-gray-50 border rounded px-3 py-2 text-xs text-water
                            placeholder:text-water/40 focus:outline-none focus:ring-1
                            transition-all duration-200 mb-1
                            ${hibak.email ? 'border-red-400 focus:ring-red-400' : 'border-water/30 focus:ring-water'}`}
              />
              {hibak.email && <p className="text-red-500 text-xs mb-2">{hibak.email}</p>}
              {!hibak.email && <div className="mb-3" />}

              {/* Felhasználónév */}
              <label className="block text-xs text-water mb-1">Felhasználónév</label>
              <input
                type="text"
                value={felhasznalonev}
                onChange={e => setFelhasznalonev(e.target.value)}
                placeholder="Pelda01"
                className={`w-full bg-gray-50 border rounded px-3 py-2 text-xs text-water
                            placeholder:text-water/40 focus:outline-none focus:ring-1
                            transition-all duration-200 mb-1
                            ${hibak.felhasznalonev ? 'border-red-400 focus:ring-red-400' : 'border-water/30 focus:ring-water'}`}
              />
              {hibak.felhasznalonev && <p className="text-red-500 text-xs mb-2">{hibak.felhasznalonev}</p>}
              {!hibak.felhasznalonev && <div className="mb-3" />}

              {/* Jelszó */}
              <label className="block text-xs text-water mb-1">Jelszó</label>
              <div className="relative mb-1">
                <input
                  type={jelszoLatszik ? 'text' : 'password'}
                  value={jelszo}
                  onChange={e => setJelszo(e.target.value)}
                  placeholder="••••••"
                  className={`w-full bg-gray-50 border rounded px-3 py-2 text-xs text-water
                              placeholder:text-water/40 focus:outline-none focus:ring-1
                              transition-all duration-200 pr-8
                              ${hibak.jelszo ? 'border-red-400 focus:ring-red-400' : 'border-water/30 focus:ring-water'}`}
                />
                <button type="button" onClick={() => setJelszoLatszik(v => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-water/50 hover:text-water transition">
                  {jelszoLatszik ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {erosseg && (
                <div className="mb-2">
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${erosseg.szin} ${erosseg.szeles}`} />
                  </div>
                  <p className="text-xs text-water/60 mt-0.5">{erosseg.szoveg}</p>
                </div>
              )}

              {hibak.jelszo && <p className="text-red-500 text-xs mb-2">{hibak.jelszo}</p>}
              {!hibak.jelszo && !erosseg && <div className="mb-3" />}

              {/* Jelszó újra */}
              <label className="block text-xs text-water mb-1">Jelszó újra</label>
              <div className="relative mb-1">
                <input
                  type={jelszoUjraLatszik ? 'text' : 'password'}
                  value={jelszoUjra}
                  onChange={e => setJelszoUjra(e.target.value)}
                  placeholder="••••••"
                  className={`w-full bg-gray-50 border rounded px-3 py-2 text-xs text-water
                              placeholder:text-water/40 focus:outline-none focus:ring-1
                              transition-all duration-200 pr-8
                              ${hibak.jelszoUjra ? 'border-red-400 focus:ring-red-400' : 'border-water/30 focus:ring-water'}`}
                />
                <button type="button" onClick={() => setJelszoUjraLatszik(v => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-water/50 hover:text-water transition">
                  {jelszoUjraLatszik ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {hibak.jelszoUjra && <p className="text-red-500 text-xs mb-2">{hibak.jelszoUjra}</p>}
              {!hibak.jelszoUjra && <div className="mb-3" />}

              {/* Telefonszám */}
              <label className="block text-xs text-water mb-1">Telefonszám</label>
              <input
                type="tel"
                value={telefon}
                onChange={e => setTelefon(e.target.value)}
                placeholder="+36 20 222 2222"
                className={`w-full bg-gray-50 border rounded px-3 py-2 text-xs text-water
                            placeholder:text-water/40 focus:outline-none focus:ring-1
                            transition-all duration-200 mb-1
                            ${hibak.telefon ? 'border-red-400 focus:ring-red-400' : 'border-water/30 focus:ring-water'}`}
              />
              {hibak.telefon && <p className="text-red-500 text-xs mb-2">{hibak.telefon}</p>}
              {!hibak.telefon && <div className="mb-3" />}

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 border-water/30 accent-water" />
                  <span className="text-xs text-water/70">Emlékezz rám</span>
                </label>
                <button onClick={handleSubmit}
                  className="px-5 py-2 bg-water hover:bg-navy active:scale-[0.98]
                             text-sail text-xs font-medium rounded transition-all duration-200">
                  Regisztráció
                </button>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-4 px-1 space-y-1">
            <p className="text-sm text-water/60">
              <span onClick={() => navigate('/bejelentkezes')}
                className="cursor-pointer hover:text-water hover:underline">Bejelentkezés</span>
              {' | '}
              <span onClick={() => navigate('/uj_jelszo')}
                className="cursor-pointer hover:text-water hover:underline">Elfelejtett jelszó?</span>
            </p>
            <p onClick={() => navigate('/')}
              className="text-sm text-water/60 cursor-pointer hover:text-water hover:underline w-fit">
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