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
      <p>{sigilData.name}</p>

      {sigilData.imageData ? (
        <img
          src={sigilData.imageData}
          alt={sigilData.name}
          style={{ width: '100px', height: '100px', objectFit: 'contain' }}
        />
      ) : (
        <p>{sigilData.img}</p>
      )}

      <p>{sigilData.sigilGroups?.map((g: any) => g.groupMember.join(','))}</p>
    </div>
  )
}