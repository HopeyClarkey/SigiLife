import { useState, useRef, useEffect } from 'react'
import BackButton from '../../Parts/BackButton'
import { useLocation, Link } from "react-router-dom"
import ChangeEmotion from '../ChargeSigil/ChargeComponents/ChangeEmotion'
import EvilEye from './DestroyComponents/EvilEye'
import { useUser } from '@/context/UserContext'
import GhostCursor from './DestroyComponents/GhostCursor.tsx'

export default function DestroySigil() {
  const { state } = useLocation();
  const { sigilData } = state;
  const { user } = useUser()
  const [emotion, setEmotion] = useState("")
  const [isDestroying, setIsDestroying] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);



  const handleDestroy = async () => {
    console.log('destroy clicked, sigilData.id:', sigilData.id)
    try {
      const res = await fetch(`/api/sigils/${sigilData.id}`, { method: 'DELETE' });
      console.log('response status:', res.status)
      if (!res.ok) { throw new Error('Failed to destroy sigil'); }
      setIsDestroying(true)
    } catch (error) {
      console.error('destroy error:', error);
    }
  };


  if (!user) { return null }

  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div className='destroysigil'>
          {isDestroying && (
            <div>
              <div className='evileye' style={{ pointerEvents: 'none' }}>
                <EvilEye
                  eyeColor="#2e0fa9"
                  intensity={3.1}
                  pupilSize={0.75}
                  irisWidth={0.25}
                  glowIntensity={0.65}
                  scale={0.5}
                  noiseScale={1}
                  pupilFollow={1.6}
                  flameSpeed={2.5}
                  backgroundColor="#06000f"
                />
              </div>

              <div style={{ height: 600, position: 'relative' }}>
                <GhostCursor
                  // Visuals
                  color="#bc103b"
                  brightness={4.4}
                  edgeIntensity={0}

                  // Trail and motion
                  trailLength={20}
                  inertia={0.61}

                  // Post-processing
                  grainIntensity={0.24}
                  bloomStrength={2.7}
                  bloomRadius={0.1}
                  bloomThreshold={0.14}

                  // Fade-out behavior
                  fadeDelayMs={1000}
                  fadeDurationMs={1500}
                /></div>
            </div>
          )}
          <h1>Destroy Sigil</h1>
          <ChangeEmotion emotion={emotion} setEmotion={setEmotion} />
          {sigilData.imageData ? (
            <img className="sigilbox" src={sigilData.imageData} alt={sigilData.name} />
          ) : (
            <img className="sigilbox" src="src/assets/dummySigil.svg" alt="Dummy Sigil" />
          )}
          {!isDestroying && (
            <button className="navbutton" onClick={handleDestroy} disabled={!emotion}>
              Destroy Sigil
            </button>
          )}
          {isDestroying && (
            <Link className="navbutton" to='/home'>Go Home</Link>
          )}
          {!isDestroying && (
            <div className='footer'>
              <BackButton name={"Go Back"} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}