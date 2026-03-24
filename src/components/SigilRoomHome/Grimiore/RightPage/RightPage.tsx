import { Link } from 'react-router-dom'
import BackButton from "../../../Parts/BackButton"
import SigiLibrary from './SigiLibrary/SigiLibrary'

export default function RightPage({user}: {user: any}){
  console.log(user)

  return (
    <div className="rightpage">
            <div className={'rightpage'}>
            <SigiLibrary user={user} />
            <Link to="/make-sigil"> 🪶 MakeSigil </Link>
          </div>
        <BackButton name={"Go Back"} />
    </div>
  )
}
