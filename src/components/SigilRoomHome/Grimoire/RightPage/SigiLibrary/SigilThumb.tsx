export default function SigilThumb({
  sigilData,
  onClick,
  isCharged
}: {
  sigilData: any,
  onClick?: () => void,
  isCharged?: boolean
}) {
  return (
    <div className={`sigilthumb ${isCharged ? 'charged' : ''}`} onClick={onClick}>
      <p>{sigilData.name.length > 6 ? sigilData.name.slice(0, 6) + "..." : sigilData.name}</p>

      {sigilData.imageData ? (
        <img
          src={sigilData.imageData}
          alt={sigilData.name}
          style={{ width: '100%', height: '100px', objectFit: 'contain', borderRadius: "12px"}}
        />
      ) : (
        <p>{sigilData.img}</p>
      )}

      <p>{sigilData.sigilGroups?.map((g: any) => g.groupMember.join(','))}</p>
    </div>
  )
}