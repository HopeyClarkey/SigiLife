
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MapSearchBox from '../../LeftPage/Map/MapSearchBox'
import Menu from '../../../../Parts/Menu'
import { useUser } from '@/context/UserContext'


const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

export default function SigilPage() {
  const [searchParams] = useSearchParams()
  const sigilId = searchParams.get('sigilId')
  const [sigilData, setSigilData] = useState<any>(null);
  const [isSavingLocation, setIsSavingLocation] = useState(false);
  const { user } = useUser()
  useEffect(() => {
    if (!sigilId) { return }
    fetch(`/api/sigils/${sigilId}`)
      .then(res => res.json())
      .then(data => setSigilData(data))
      .catch(err => console.error(err))
  }, [sigilId])

  if (!sigilData) { return <p>Loading sigil...</p> }

  const handleLocationRetrieve = async (res: any) => {
    if (res.features && res.features.length > 0) {
      const feature = res.features[0];
      const [lng, lat] = feature.geometry.coordinates;
      const locationName = feature.properties.name || feature.properties.full_address || "Unknown Location";
      setIsSavingLocation(true);
      try {
        const response = await axios.patch(`/api/sigils/${sigilData.id}/location`, {
          locationName,
          latitude: lat,
          longitude: lng
        });
        setSigilData(response.data);
      } catch (error) {
        console.error("Failed to save location:", error);
        alert("Failed to save location");
      } finally {
        setIsSavingLocation(false);
      }
    }
  };

  return (
    <div className="maincontainer">
      <div className="scrollcontainer">
        <div className="sigilpage">
          <Menu />
          <div className="flex flex-col bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto border border-white/20 transition-all duration-500 animate-in fade-in zoom-in slide-in-from-bottom-8"
            style={{
              width: "88dvw",
              height: "88dvh",
              gap: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflowY: "auto"
            }}>

            {/* Sigil image */}
            {sigilData.imageData && (
              <img
                src={sigilData.imageData}
                alt={sigilData.name}
                style={{
                  width: 'min(100%, 50vh)',
                  aspectRatio: '1 / 1',
                  objectFit: 'contain',
                  borderRadius: '1rem',
                }}
              />
            )}

            {/* Name + status */}
            <h1 style={{ fontSize: "clamp(20px, 5vw, 36px)", textAlign: "center" }}>
              {sigilData.name}
            </h1>
            <p style={{ fontSize: "clamp(12px, 2vw, 16px)", opacity: 0.7 }}>
              Created: {new Date(sigilData.createdAt).toLocaleDateString()}
            </p>
            {sigilData.isCharged && (
              <p style={{ color: "gold", fontSize: "clamp(13px, 2vw, 17px)" }}>⚡ Charged</p>
            )}

            {/* Group */}
            {sigilData.sigilGroups && sigilData.sigilGroups.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.75rem', width: '100%', textAlign: 'center' }}>
                <h3 style={{ fontSize: "clamp(13px, 2vw, 17px)", marginBottom: "0.25rem" }}>Group</h3>
                <p style={{ fontSize: "clamp(12px, 2vw, 15px)", opacity: 0.8 }}>
                  {sigilData.sigilGroups.map((g: any) => g.groupMember?.join(', ')).join(' · ')}
                </p>
              </div>
            )}

            {/* Location */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.75rem', width: '100%', textAlign: 'center' }}>
              {sigilData.locationName ? (
                <p style={{ fontSize: "clamp(12px, 2vw, 16px)" }}>📍 {sigilData.locationName}</p>
              ) : (
                <div>
                  <p style={{ fontSize: "clamp(12px, 2vw, 15px)", marginBottom: "0.5rem" }}>Set a location:</p>
                  {isSavingLocation ? <p>Saving...</p> : (
                    <div style={{ maxWidth: "320px", margin: "0 auto" }}>
                      <MapSearchBox accessToken={MAPBOX_TOKEN} onRetrieve={handleLocationRetrieve} />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="sigilbuttonstack" style={{ width: '100%' }}>
              {!sigilData.isCharged && (
                <Link className="btn" to={`/charge-sigil?sigilId=${sigilData.id}`}
                  style={{ backgroundColor: '#9e38fd', fontSize: "clamp(14px, 2.5vw, 20px)", padding: "10px 32px", textAlign: 'center' }}>
                  ⚡ Charge Sigil
                </Link>
              )}
              <Link className="btn" to={`/destroy-sigil?sigilId=${sigilData.id}`}
                style={{ backgroundColor: '#9e38fd', fontSize: "clamp(14px, 2.5vw, 20px)", padding: "10px 32px", textAlign: 'center' }}>
                💀 Destroy Sigil
              </Link>
              {user?.isAdmin && (
                <Link className="btn" to="/place-sigil-world" state={{ sigilData }}
                  style={{ backgroundColor: '#9e38fd', fontSize: "clamp(14px, 2.5vw, 20px)", padding: "10px 32px", textAlign: 'center' }}>
                  🌍 View in AR
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}