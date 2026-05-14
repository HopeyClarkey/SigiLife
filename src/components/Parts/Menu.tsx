import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useUser } from '@/context/UserContext'

function NavMenu({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()

  return (
    <div
      className="glasscard"
      style={{
        width: 'fit-content',
        minWidth: '160px',
        padding: '1rem',
        gap: '0.4rem',
        margin: 0,
        alignSelf: 'flex-start',
        position: 'relative',
        left: 0,
        top: 0,
      }}
    >
      <button
        className="pinkbutton"
        style={{ border: '0px',  width: '100%', textAlign: 'left', fontFamily: 'Pompiere' }}
        onClick={onClose}
      >
        ✕ Close
      </button>
      <button
        className="pinkbutton"
        style={{ border: '0px',  width: '100%', textAlign: 'left',fontFamily: 'Pompiere' }}
        onClick={() => { navigate(-1); onClose() }}
      >
        ← Go Back
      </button>
      <Link className="pinkbutton " style={{ border: '0px',  width: '100%', textAlign: 'left', fontFamily: 'Pompiere' }} to="/home" onClick={onClose}>The Office</Link>
      <Link className="pinkbutton " style={{ border: '0px',  width: '100%', textAlign: 'left',fontFamily: 'Pompiere' }} to="/make-sigil" onClick={onClose}>Write Sigil</Link>
      <Link className="pinkbutton " style={{ border: '0px',  width: '100%', textAlign: 'left',fontFamily: 'Pompiere' }} to="/library?action=charge" onClick={onClose}>Charge Sigil</Link>
      <Link className="pinkbutton " style={{ border: '0px',   width: '100%', textAlign: 'left',fontFamily: 'Pompiere' }} to="/library?action=destroy" onClick={onClose}>Destroy Sigil</Link>
      <Link className="pinkbutton " style={{ border: '0px',  width: '100%', textAlign: 'left',fontFamily: 'Pompiere' }} to="/grimoire" onClick={onClose}>Bookshelf</Link>
      <Link className="pinkbutton " style={{ border: '0px',   width: '100%', textAlign: 'left',fontFamily: 'Pompiere' }} to="/settings" onClick={onClose}>Settings</Link>
    </div>
  )
}

export default function Menu() {
  const { user } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!user) return null

  return (
    <div
      className="navmenu"
      id='menu-btn'
      style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        zIndex: 10000,
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
        pointerEvents: 'auto',
      }}
    >
      {!menuOpen && (
        <button
          className="glassbutton"
          style={{ padding: '0.4rem 0.75rem' }}
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
      )}
      {menuOpen && <NavMenu onClose={() => setMenuOpen(false)} />}
    </div>
  )
}