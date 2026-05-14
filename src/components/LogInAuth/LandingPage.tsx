import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SigiLifeLogo from '../../assets/SigilifeLogo.svg';
import GoogleAuth from './GoogleAuth';
import { useUser } from '@/context/UserContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"


export default function LandingPage() {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const handleSlideClick = useCallback(() => {
    carouselApi?.scrollNext();
  }, [carouselApi]);

  useEffect(() => {
    if (!isLoading && user) {
      const needsProfile = !user.username || user.avatar === null || user.theme === null || !user.homeLocation;
      if (needsProfile) {
        navigate('/create-profile');
      } else {
        navigate('/home');
      }
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (!carouselApi) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 8000);

    return () => clearInterval(interval)
  }, [carouselApi]);

const slides = [
  <><br />You ever feel something<br />in a place that doesn’t belong to you?<br /><br />A strange sadness.<br />A sudden certainty.<br />A memory that isn’t yours.</>,

  <>For decades, The Office<br />has documented emotional imprints<br />appearing across the world.<br /><br />Symbols tied to human intention<br />that somehow remain behind.</>,

  <>They’re called Sigils.<br /><br />And if you’re here now,<br />it means you noticed one.</>,

  <><br /><br />SigiLife is a map of hidden intentions.<br />Yours.<br />And everyone else’s.</>,

  <>Every sigil begins with a statement.<br />A want.<br />A fear.<br />A promise.<br />A thing you cannot let go of.</>,

  <>You do not simply write it down.<br />You reduce it.<br />Distill it.<br />Strip it to its meaning.</>,

  <>Then the system transforms it<br />into something symbolic.<br />Abstract.<br />Unique.<br />Entirely yours.</>,

  <>Next comes the Charge.<br /><br />Hope.<br />Grief.<br />Obsession.<br />Relief.<br />Anger.<br />Longing.</>,

  <>Emotion leaves residue.<br />That residue gives the sigil weight.</>,

  <>Then you place it somewhere real.<br /><br />A street corner.<br />Your apartment.<br />A graveyard.<br />A bar you should not return to.</>,

  <>Some people use sigils to manifest.<br />Some use them to remember.<br />Others use them to bury things.</>,

  <>Over time, the world fills with traces.<br />Invisible layers of human intention<br />hidden beneath ordinary places.</>,

  <>You can discover sigils left by others.<br />Strengthen your own.<br />Or simply observe what lingers.</>,

  <>Nothing lasts forever.</>,

  <>When the time comes,<br />you may destroy your sigil.<br /><br />Not delete.<br />Destroy.</>,

  <>The charge breaks.<br />The symbol collapses.<br />The intention dissolves.<br /><br />And that matters.</>,

  <>Right now, sigils can be shared<br />between trusted contacts.<br />Soon, The Office will expand access.</>,

  <><br />The world is already full<br />of invisible meaning.<br /><br />SigiLife just makes it visible.</>,
];

  return (
    <>
      <div className='maincontainer'>
        <div className='scrollcontainer'>
          <div className="landingpage">
            <>

              <img src={SigiLifeLogo} className="logo" alt="Sigil-Life-Logo" style={{ width: "min(70dvh, 88dvw)" }} />
              <div className="logo" style={{
                height: "fit-content",
                color: "white",
                padding: "5px",
                margin: "5px",
                borderRadius: "12px",
                width: "min(70dvh, 88dvw)",
                textWrap: "wrap",
                minWidth: "300px"
              }}><p style={{color: "black"}}>
                  SigiLife is an augmented reality, location-based, social, ritualized lifestyle game where emotional intention becomes digitally visible.
                </p>
              </div>
              <div className='displaypitch' style={{ height: "30vh", margin: "0", width: "min(70dvh, 88dvw)", paddingTop: ".3rem" }}>
                <Carousel setApi={setCarouselApi}
                  opts={{ loop: true }}
                  orientation="vertical"
                  className="slidebox"
                  style={{ height: "28vh", margin: "0", width: "min(70dvh, 88dvw)" }}>
                  <CarouselContent style={{
                    height: "25vh",
                    fontSize: "clamp(18px, 5vw, 42px)",
                    fontFamily: "Pompiere",
                    textAlign: "center",
                    alignSelf: "center",
                    color: "white",
                  }}>
                    {slides.map((content, i) => (
                      <CarouselItem key={i} onClick={handleSlideClick} className="cursor-pointer select-none" >
                        {content}
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              <GoogleAuth />
            </>
          </div>
        </div>
      </div>
    </>
  );
}