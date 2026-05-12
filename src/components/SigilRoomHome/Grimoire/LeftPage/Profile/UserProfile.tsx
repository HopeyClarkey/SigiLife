import { useUser } from '@/context/UserContext'
import UserFriends from './UserFriends'
import Menu from '../../../../Parts/Menu'
import { useRef, useEffect, useState } from 'react'

export default function UserProfile() {
  const { user } = useUser()
  const scrollRef = useRef<HTMLDivElement>(null)

  const [dims, setDims] = useState({ width: 2160, height: 1260 })

  useEffect(() => {
    const calculate = () => {
      const scale = window.innerHeight / 1260
      setDims({ width: Math.round(2160 * scale), height: window.innerHeight })
    }
    calculate()
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    setTimeout(() => { el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2 }, 50)
  }, [dims])

  if (!user) return;

  const AvatarFace = () =>
  (
    <div className="avatarfacebox">
      <img className="avatarface" src={`Avatar${user.avatar + 1}face.png`} />
    </div>
  )



  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div className="profilepage usersettings-page art-page-base"
          style={{ width: `${dims.width}px`, height: `${dims.height}px` }}>
          <Menu />
          <h1 className='profilepagename'>
            <AvatarFace /> {user.username}</h1>
          <UserFriends />

        </div>
      </div>
    </div>
  )
}