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
  'cyber-light': [
    '#e9edf5', // --theme-bg-1 (light base)
    '#d8e0ef', // --theme-bg-2
    '#4b5563', // --theme-accent (UI neutral layer)
    '#00d4ff', // --theme-glow / cyber accent
  ],

  'cyber-dark': [
    '#0f1117', // --theme-bg-1 (dark base)
    '#1a1d26', // --theme-bg-2
    '#9ca3af', // muted accent
    '#00d4ff', // neon glow
  ],

  'foliage-light': [
    '#e4efe0', // --theme-bg-1
    '#cfe3c8', // --theme-bg-2
    '#4f6f52', // --theme-accent
    '#66bb6a', // --theme-glow
  ],

  'foliage-dark': [
    '#081c0c', // --theme-bg-1
    '#0f2a14', // --theme-bg-2
    '#66bb6a', // accent
    '#a5d6a7', // glow highlight
  ],
}
    const key = `${colorTheme}-${isDark ? 'dark' : 'light'}` as keyof typeof swatches
    return (
      <div className="themebox">
        {labels[key]}
        <div className="flex gap-2 mt-2">
          {swatches[key].map((color, i) => (
            <div key={i} style={{ backgroundColor: color, width: 32, height: 32, borderRadius: 6, borderWidth: "2px", borderColor: "black", alignSelf: "center"}} />
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