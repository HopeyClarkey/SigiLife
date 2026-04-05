import { useLocation } from "react-router-dom"

export default function SigilDestroyEffect() {
  const { state } = useLocation();
  const { sigilData } = state;

  console.log(sigilData)

  return (
    <div>
    </div>
  )
};