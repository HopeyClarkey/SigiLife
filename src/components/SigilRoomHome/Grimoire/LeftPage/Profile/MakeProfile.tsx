import { Link } from 'react-router-dom'
import { useState } from 'react';
import GoogleAuth from '@/components/LogInAuth/GoogleAuth';

const avatarChoices = [
  { id: '1', avatar: 'Avatar One', emoji: "🕵️‍♂️", src: '../../../../../assets/Avatar1.png' },
  { id: '2', avatar: 'Avatar Two', emoji: "🕵️‍♀️", src: '../../../../../assets/Avatar2.png' }
]


export default function MakeProfile() {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("0");
  const [theme, setTheme] = useState("0");
  const [homeLatitude, setHomeLatitude] = useState('');
  const [homeLongitude, setHomeLongitude] = useState('');
  const [homeLocation, setHomeLocation] = useState('')
  const [validated, setValidated] = useState(false);


  const handleGoogleSuccess = async (gsiPayload: any) => {
    await fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        credential: gsiPayload.credential,
        clientId: gsiPayload.clientId,
        username,
        avatar,
        theme,
        homeLatitude: parseFloat(homeLatitude),
        homeLongitude: parseFloat(homeLongitude),
      }),
    });

  }

  const handleHomeLocation = ({ latitude, longitude }: { latitude: any, longitude: any }) => {
    console.log('this will set your', homeLatitude, homeLongitude, homeLocation)
    setHomeLatitude(latitude);
    setHomeLongitude(longitude)
    setHomeLocation('set location!')
  }

  // function Submit() {
  //   const status = useFormStatus();
  //   const newProfile = {
  //     username: username,
  //     avatar: avatar,
  //     theme: theme,
  //     homeLatitude: homeLatitude,
  //     homeLongitude: homeLongitude,
  //     homeLocation: homeLocation,
  //   }
  //   console.log(newProfile)
  //   return <button disabled={status.pending}>Submit</button>
  // }

  return (
    <div className='main-container'>
      <div className='makeprofile'>
        <h1>Create Profile</h1>

        <form onSubmit={(e) => { e.preventDefault(); setValidated(true) }}>
          <label>Choose a SigiLife Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>


          <label> Choose a SigiLord:
            <div>
              <img
                src='../../../../../assets/Avatar1.png'
                alt='trench-coat-detective'
                onClick={() => setAvatar("0")}
                style={{ outline: avatar === "0" ? '3px solid purple' : 'none', cursor: 'pointer' }}
              />
              <img
                src='../../../../../assets/Avatar1.png'
                alt='dress-detective'
                onClick={() => setAvatar("1")}
                style={{ outline: avatar === "1" ? '3px solid purple' : 'none', cursor: 'pointer' }}
              />
            </div>
          </label>


          <label>Choose your Home Sigil Location:
            <input value={homeLocation} onChange={() => setHomeLocation} />
          </label>

          <label> Choose a theme:
            <input
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
            choose your theme?
          </label>
          {!validated && <button type='submit'> I have double checked my choices! </button>}
        </form>

        {validated && (<GoogleAuth onSuccess={handleGoogleSuccess}/>)}

        <Link to="/home">Enter SigiLife</Link>
      </div ></div>
  )
}
