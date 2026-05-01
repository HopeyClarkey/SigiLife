import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useUser } from '@/context/UserContext'

const NavMenu = function () {
  const navigate = useNavigate()
  return (
    <nav className='menu'>

      <button className="pinkbutton" onClick={() => navigate(-1)}>⬅ Go Back</button>
      <Link className="pinkbutton" to="/home">Home Room</Link>
      <Link className="pinkbutton" to="/library?action=charge">Charge Sigil</Link>
      <Link className="pinkbutton" to="/library?action=destroy">Destroy Sigil</Link>
      <Link className="pinkbutton" to="/make-sigil">Make Sigil</Link>
      <Link className="pinkbutton" to="/library">Sigil Library</Link>
      <Link className="pinkbutton" to="/map">SigilMap</Link>
      <Link className="pinkbutton" to="/settings">Settings</Link>
      <Link className="pinkbutton" to="/profile">SigiLites</Link>

    </nav>
  )
}


export default function Menu() {
  const { user } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!user) { return null }

  return (
    <div className="navmenu">
     <button id="menu-btn" className="pinkbutton" onClick={() => setMenuOpen(prev => !prev)}>
        {menuOpen ? '✕ Close' : '☰'}
      </button>
      {menuOpen && <NavMenu />}
    </div>
  )
}