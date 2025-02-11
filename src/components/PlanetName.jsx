import { Html } from "@react-three/drei";

function PlanetName({ name,intoView }) {
    return (
        <Html>
            <div onClick={intoView} className="text-xs m-2 tracking-[0.15em] glow hover:text-primary no-select">{ name.toUpperCase() }</div>
        </Html>
    )
}

export default PlanetName;