import BackButton from '../../Parts/BackButton'
import { Link, useLocation } from "react-router-dom"
import SigilChargeEffect from './ChargeComponents/SigilChargeEffect'
import ChangeEmotion from './ChargeComponents/ChangeEmotion'
import { useState } from 'react'
import { useUser } from '@/context/UserContext'
import SplashCursor from './ChargeComponents/SplashCursor'

export default function ChargeSigil() {
  const { state } = useLocation();
  const { sigilData } = state;
  const { user } = useUser()
  const [emotion, setEmotion] = useState("")
  const [isCharging, setIsCharging] = useState(false)

  if (!user) { return null }

  const handleCharge = async () => {
    setIsCharging(true);
    try {
      const res = await fetch(`/api/sigils/${sigilData.id}/charge`, { method: 'PATCH' });
      if (!res.ok) { throw new Error('Failed to charge sigil'); }
      //const updatedSigil = await res.json();
      //navigate('/sigil-page', { state: { sigilData: updatedSigil } });
    } catch (error) {
      console.error(error);
      setIsCharging(false);
    }
  }


  return (
    <div className='maincontainer'>
      {isCharging && (
        <SplashCursor
          BACK_COLOR={{ r: 0, g: 0, b: 0 }}
          TRANSPARENT={true}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
        />
      )}
      <div className='chargesigil'>
        <h1>ChargeSigil</h1>

        <ChangeEmotion emotion={emotion} setEmotion={setEmotion} />
        <SigilChargeEffect />

        {sigilData.imageData ? (
          <img className="sigilbox" src={sigilData.imageData} alt={sigilData.name} />
        ) : (
          <img className="sigilbox" src="src/assets/dummySigil.svg" alt="placeholderSigil" />
        )}

        <button
        className='navbutton'
          onClick={handleCharge}
          disabled={!emotion || isCharging}>
          {isCharging ? "Charging..." : "Charge Sigil"}
        </button>

        <Link className="navbutton" to="/sigil-page" state={{ sigilData }}>
          Save your Sigil!</Link>

        <Link className="navbutton" to="/destroy-sigil" state={{ sigilData }}>
          Destroy Your Charged Sigil!</Link>

        <div className='footer'>
          <BackButton name={"Go Back"} />
        </div>
      </div>
    </div>
  )
};