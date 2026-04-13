

import { Link } from 'react-router-dom'
import { useUser } from '@/context/UserContext'
import { useEffect, useRef, useState } from 'react';
import Menu from '../Parts/Menu'
import destroyButton from '../../assets/DestroyButton.svg'
import chargeButton from '../../assets/AltarButton.svg'
import grimoireButton from '../../assets/GrimoireButton.svg'
import makesigilButton from '../../assets/WritingButton.svg'import TutorialOverlay from '../ui/TutorialOverlay'


export default function HomeRoom() {
  const { user } = useUser();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  useEffect(() => {
    if (user && !user.hasCompletedTutorial) {
      setShowTutorial(true);
    }
  }, [user]);

  if (!user) { return null; }
  console.log(user)

  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div className='homeroom'>
          <Menu />

          <nav>
            <Link className='destroybutton' to="/library?action=destroy">
            <img src={destroyButton} alt="Destroy Sigil" /></Link>
            <Link className='chargebutton' to="/library?action=charge">
            <img src={chargeButton} alt="Charge Sigil" /></Link>
            <Link className='grimoirebutton' to="/grimoire"> 
            <img src={grimoireButton} alt="Grimoire" /></Link>
            <Link className='makesigilbutton' to="/make-sigil">
            <img src={makesigilButton} alt="Write Sigil" /></Link>
          </nav>

          <div className='footer'>
          </div>
        </div>
      </div>
      {showTutorial && <TutorialOverlay onComplete={() => setShowTutorial(false)} />}
    </div>
  )

}

