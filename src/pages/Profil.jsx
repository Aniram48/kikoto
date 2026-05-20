import { useNavigate } from 'react-router-dom'
import Wave from '../components/Wave'
import Navbar from '../components/Navbar'
import { User, Mail, LogOut } from 'lucide-react'

export default function Profil() {
  const navigate = useNavigate()

  const nev = localStorage.getItem('nev') || 'Ismeretlen felhasználó'
  const email = localStorage.getItem('email') || 'Nincs megadva'

  const handleKijelentkezes = () => {
    localStorage.removeItem('bejelentkezve')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-sail flex flex-col pt-16">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">

          {/* Kártya */}
          <div className="bg-white border-2 border-water/30 rounded overflow-hidden shadow-sm relative">
            <div className="absolute w-full z-0">
              <Wave height={670} />
            </div>

            {/* Fejléc */}
            <div className="pt-6 pb-4 text-center">
              <h2 className="text-base font-semibold tracking-[0.2em] text-water uppercase">
                Profil
              </h2>
            </div>

            {/* Adatok */}
            <div className="relative px-10 z-10 pb-8 space-y-5">

              {/* Avatar */}
              <div className="flex justify-center mb-2">
                <div className="w-16 h-16 rounded-full bg-water/10 border-2 border-water/30
                                flex items-center justify-center">
                  <User size={32} className="text-water/60" />
                </div>
              </div>

              {/* Név */}
              <div>
                <label className="block text-sm text-water mb-1">Név</label>
                <div className="w-full bg-gray-50 border border-water/30 rounded
                               px-4 py-2.5 text-sm text-water">
                  {nev}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-water mb-1">Email</label>
                <div className="w-full bg-gray-50 border border-water/30 rounded
                               px-4 py-2.5 text-sm text-water flex items-center gap-2">
                  <Mail size={14} className="text-water/50 shrink-0" />
                  {email}
                </div>
              </div>

              {/* Kijelentkezés gomb */}
              <div className="flex items-center justify-end pt-2">
                <button
                  onClick={handleKijelentkezes}
                  className="flex items-center gap-2 px-6 py-2.5 bg-water hover:bg-navy
                             active:scale-[0.98] text-sail text-sm font-medium rounded
                             transition-all duration-200"
                >
                  <LogOut size={14} />
                  Kijelentkezés
                </button>
              </div>
            </div>
          </div>

          {/* Linkek */}
          <div className="relative z-10 mt-4 px-1 space-y-1">
            <p onClick={() => navigate('/')}
              className="text-sm text-water/60 cursor-pointer hover:text-water hover:underline w-fit">
              ← Irány a(z) Szegedi Vitorláskikötő
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}