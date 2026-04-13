import { Link } from 'react-router-dom'
import { useUser } from '@/context/UserContext'
import { useEffect, useRef } from 'react';
import Menu from "@/components/Parts/Menu";
import mapButton from '../../../assets/MapButton.svg'
import profileButton from '../../../assets/ProfileButton.svg'
import sigilbookButton from '../../../assets/SigilBook.svg'

export default function Grimoire() {
  const { user } = useUser();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  if (!user) { return null; }

  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div className='grimoire'>
          <Menu />
          <nav>
            <Link
              className="grimoiremaplink"
              to="/map"
              onTouchStart={(e) => e.currentTarget.classList.add('touched')}
              onTouchEnd={(e) => e.currentTarget.classList.remove('touched')}
            >
              <img src={mapButton} alt="Map Book" />
            </Link>
            <Link
              className="grimoireprofilelink"
              to="/profile"
              onTouchStart={(e) => e.currentTarget.classList.add('touched')}
              onTouchEnd={(e) => e.currentTarget.classList.remove('touched')}
            >
              <img src={profileButton} alt="Profile Book" />
            </Link>
            <Link
              className="grimoireliblink"
              to="/right-page"
              onTouchStart={(e) => e.currentTarget.classList.add('touched')}
              onTouchEnd={(e) => e.currentTarget.classList.remove('touched')}
            >
              <img src={sigilbookButton} alt="Sigil Book" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}