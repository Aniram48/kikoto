import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { id: 'szabalyzat', label: 'SZABÁLYZAT', path: '/szabalyzat' },
  { id: 'kepzesek',   label: 'KÉPZÉSEK',   path: '/kepzesek' },
  { id: 'berles',     label: 'BÉRLÉS',     path: '/berles' },
  { id: 'hajoskonyv', label: 'HAJÓSKÖNYV', path: '/hajoskonyv' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  const handleNav = (path) => {
    setMenuOpen(false)
    navigate(path)
  }

  return (
    <nav
      ref={menuRef}
      className="fixed top-0 z-[100] w-full h-16 flex items-center gap-4 px-7
                 bg-navy/95 backdrop-blur-md border-b border-accent/20
                 shadow-[0_2px_24px_rgba(0,0,0,0.4)]"
    >
      {/* Logo + Title */}
      <div
        onClick={() => handleNav('/')}
        className="flex items-center gap-3 cursor-pointer shrink-0"
      >
        <img
          src="/logo.webp"
          alt="Logo"
          className="w-11 h-11 rounded-full border-2 border-accent object-cover transition hover:scale-110 duration-300"
        />
        <div className="flex flex-col leading-tight">
          <span className="font-cormorant text-sail text-[1.4rem] font-bold tracking-[0.04em] whitespace-nowrap">
            Szegedi Vitorláskikötő
          </span>
          <span className="font-barlow text-accent text-[0.8rem] font-light tracking-[0.18em] uppercase">
            Kipper György
          </span>
        </div>
      </div>

      <div className="flex-1" />

      {/* Desktop nav */}
      {!isMobile && (
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.path)}
                className={`font-barlow text-sm font-semibold tracking-[0.18em] uppercase
                            px-[18px] py-1.5 border-b-2 transition-colors duration-200 bg-transparent
                            ${active
                              ? 'text-accent border-accent'
                              : 'text-sail/70 border-transparent hover:text-accent'}`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      )}

      {/* Hamburger gomb */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menü megnyitása"
          className="flex flex-col justify-center gap-[5px] p-2 shrink-0"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-6 h-0.5 rounded-sm transition-all duration-250 origin-center ${
                menuOpen ? 'bg-accent' : 'bg-sail/85'
              }`}
              style={{
                transform:
                  menuOpen && i === 0 ? 'translateY(7px) rotate(45deg)' :
                  menuOpen && i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
                transitionProperty: 'transform, opacity, background',
              }}
            />
          ))}
        </button>
      )}

      {/* Mobile legördülő menü */}
      {isMobile && menuOpen && (
      <div className="absolute top-16 left-0 right-0 z-[200] bg-navy
                      border-b border-accent/20 shadow-[0_8px_24px_rgba(0,0,0,0.5)]
                      flex flex-col py-2">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.path)}
                className={`font-barlow text-[0.72rem] font-semibold tracking-[0.18em] uppercase
                            px-7 py-3.5 text-left border-l-[3px] bg-transparent
                            transition-colors duration-200
                            ${active
                              ? 'text-accent border-accent'
                              : 'text-sail/75 border-transparent hover:text-accent'}`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      )}
    </nav>
  )
}