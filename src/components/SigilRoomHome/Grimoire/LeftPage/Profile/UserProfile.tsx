import { useUser } from '@/context/UserContext'
import UserFriends from './UserFriends'
import Menu from '../../../../Parts/Menu'
import { useRef, useEffect } from 'react'

export default function UserProfile() {
  const { user } = useUser()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  if (!user) { return null }
  const theme = user.theme;

  const AvatarPicture = () => (
    <div className="useravatar">
      <img className="avatar" src={`Avatar${user.avatar + 1}.png`} />
    </div>
  )

  const AvatarFace = () => (
    <div className="avatarfacebox">
      <img className="avatarface" src={`Avatar${user.avatar + 1}face.png`} />
    </div>
  )

  const Themebox = () => {
    const colorTheme = user.color_theme ?? 'cyber'
    const isDark = theme === 1
    const labels = {
      'cyber-light': 'You have theme: Cyber · Setting: Light',
      'cyber-dark': 'You have theme: Cyber · Setting: Dark',
      'foliage-light': 'You have theme: Foliage · Setting: Light',
      'foliage-dark': 'You have theme: Foliage · Setting: Dark',
    }
    const swatches = {
      'cyber-light': ['#c8d8f0', '#a0bcee', '#1a4fc4', '#4d9fff'],
      'cyber-dark': ['#0a0f2e', '#0d1a4a', '#4d9fff', '#00d4ff'],
      'foliage-light': ['#d4ebd0', '#b2d9a8', '#2d7a3a', '#66bb6a'],
      'foliage-dark': ['#0a1f0d', '#122b14', '#66bb6a', '#a5d6a7'],
    }
    const key = `${colorTheme}-${isDark ? 'dark' : 'light'}` as keyof typeof swatches
    return (
      <div className="themebox">
        {labels[key]}
        <div className="flex gap-2 mt-2">
          {swatches[key].map((color, i) => (
            <div key={i} style={{ backgroundColor: color, width: 32, height: 32, borderRadius: 6 }} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="maincontainer">
      <div ref={scrollRef} className='scrollcontainer'>
        <div className="profilepage">
          <Menu />
          <div className='profilepagebox'>
            <h1 className='profilepagename'><AvatarFace /> {user.username}</h1>
            <UserFriends />
            <div className='avatarandtheme'>
              <AvatarPicture />
              <Themebox />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}