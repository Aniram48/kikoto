import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Wave from '../components/Wave'
import Navbar from '../components/Navbar'
import WaveStrip from '../components/WaveStrip'

export default function UjJelszo() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [hiba, setHiba] = useState('')
  const [siker, setSiker] = useState(false)

  function validal() {
    if (!email) {
      setHiba('Az email cím megadása kötelező.')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setHiba('Érvénytelen email formátum.')
      return false
    }
    setHiba('')
    return true
  }

  function handleSubmit() {
    if (validal()) {
      setSiker(true)
    }
  }

  return (
    <div className="min-h-screen bg-sail flex flex-col pt-16">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">

          <div className="bg-white border-2 border-water/30 rounded shadow-sm relative overflow-hidden">

            {/* Wave – alul, mint a regisztrációnál */}
            <div className="absolute w-full z-0 bottom-0">
              <Wave height={45} />
            </div>

            {/* Fejléc */}
            <div className="relative z-10 pt-5 pb-3 text-center">
              <h2 className="text-base font-semibold tracking-[0.2em] text-water uppercase">
                Új jelszó kérése
              </h2>
            </div>

            {/* Form */}
            <div className="relative z-10 px-10 pb-6">
              {siker ? (
                <p className="text-sm text-green-600 text-center py-4 leading-relaxed">
                  Elküldtük az emailt! Ellenőrizd a postaládádat.
                </p>
              ) : (
                <>
                  <p className="text-xs text-water/70 mb-4 leading-relaxed">
                    Adjuk meg a felhasználónevünket, vagy e-mail
                    címünket. Kapni fogunk egy emailt a jelszó
                    visszaállításról szóló instrukciókkal.
                  </p>

                  <label className="block text-xs text-water mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="pelda@gmail.com"
                    className={`w-full bg-gray-50 border rounded px-3 py-2 text-xs text-water
                                placeholder:text-water/40 focus:outline-none focus:ring-1
                                transition-all duration-200 mb-1
                                ${hiba ? 'border-red-400 focus:ring-red-400' : 'border-water/30 focus:ring-water'}`}
                  />
                  {hiba && <p className="text-red-500 text-xs mb-2">{hiba}</p>}
                  {!hiba && <div className="mb-3" />}

                  <div className="flex items-center justify-end">
                    <button
                      onClick={handleSubmit}
                      className="px-5 py-2 bg-water hover:bg-navy active:scale-[0.98]
                                 text-sail text-xs font-medium rounded transition-all duration-200">
                      Új jelszó kérése
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Linkek */}
          <div className="relative z-10 mt-4 px-1 space-y-1">
            <p className="text-sm text-water/60">
              <span onClick={() => navigate('/regisztracio')}
                className="cursor-pointer hover:text-water hover:underline">Regisztráció</span>
              {' | '}
              <span onClick={() => navigate('/bejelentkezes')}
                className="cursor-pointer hover:text-water hover:underline">Bejelentkezés</span>
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