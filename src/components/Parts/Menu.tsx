import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useUser } from '@/context/UserContext'

const NavMenu = function () {
  const navigate = useNavigate()
  return (
    <nav className='navmenu '>

      <button className='glassbutton' onClick={() => navigate(-1)}>⬅ Go Back</button>
      <Link  className='glassbutton' to="/home">The Office</Link>
      <Link className='glassbutton' to="/library?action=charge">Charge Sigil</Link>
      <Link className='glassbutton' to="/library?action=destroy">Destroy Sigil</Link>
      <Link className='glassbutton' to="/make-sigil">Make Sigil</Link>
      <Link className='glassbutton' to="/library">Sigil Library</Link>
      <Link className='glassbutton' to="/map">SigilMap</Link>
      <Link className='glassbutton' to="/profile">SigiLites</Link>
      <Link className='glassbutton' to="/settings">Settings</Link>


    </nav>
  )
}


export default function Menu() {
  const { user } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!user) { return null }

  return (
    <div className="navmenu glassbutton">
     <button id="navmenu"  onClick={() => setMenuOpen(prev => !prev)}>
        {menuOpen ? '✕ Close' : '☰'}
      </button>
      {menuOpen && <NavMenu />}
    </div>
  )
}