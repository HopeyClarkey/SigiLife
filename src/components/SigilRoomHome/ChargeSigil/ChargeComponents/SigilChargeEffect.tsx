import { useLocation } from "react-router-dom"

export default function SigilChargeEffect() {
  const { state } = useLocation();
  const { sigilData } = state;

  console.log(sigilData)
  return (
    <div>

    </div>
  )
};