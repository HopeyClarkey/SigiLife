import BackButton from "../../../../Parts/BackButton"


export default function UserSettings({ user }: { user: any }) {
  console.log(user)
  const [isDark, setIsDark] = useState(user.theme === 1)
  const [avatarId, setAvatarId] = useState(user.avatar)
  
  const AvatarSelector = ({ avatarId, onSelect }: { avatarId: string, onSelect: (id: string) => void }) => {
  return (
    <div className="flex gap-4">
      {["0", "1"].map((id) => (
        <img
          key={id}
          src={`public/Avatar${parseInt(id) + 1}.png`}
          className={`avatar cursor-pointer border-4 rounded-full ${avatarId === id ? "border-purple-500" : "border-transparent"}`}
          onClick={() => onSelect(id)}
        />
      ))}
    </div>
  )
}

  const handleThemeChange = async (checked: boolean) => {
    setIsDark(checked)
    document.documentElement.classList.toggle("dark", checked)
    await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme: checked ? 1 : 0 })
    })
  }

  const handleAvatarChange = async (id: string) => {
    setAvatarId(id)
    await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatar: id })
    })
  }

  return (
    <div className="maincontainer">
      <div>

      <h1>User Settings</h1>
      <br />
      <br /> This is where you can Log Out
      <br />
      <br />
      <br />
            This is where you can delete your account

      <BackButton name={"Go Back"}/>
    </div>
    </div>
  )
}
