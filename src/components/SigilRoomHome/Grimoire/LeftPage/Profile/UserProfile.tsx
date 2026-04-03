
//import { useState } from "react"
import BackButton from "../../../../Parts/BackButton"



const AvatarSelector = ({ avatarId }: { avatarId: string }) => {
  return (
    <div className="useravatar">
        <img className="avatar"
          src={`public/Avatar${parseInt(avatarId)}.png`}/>
    </div>
  )
}





export default function UserProfile({ user }: { user: any }) {






  console.log(user)
  return (
    <div className="maincontainer">
      <div>
        <br />
        <h1> UserProfile </h1>
        <img className="avatar border-4 rounded-full" src={user.picture} />
        {user.username}
        <br />
        <AvatarSelector avatarId={user.avatarId}  />
        <br />
        {user.theme}
        <br />

        <BackButton name={"Grimiore"} />
      </div>
    </div>
  )
};