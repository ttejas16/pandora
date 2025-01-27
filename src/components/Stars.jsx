// import { useEffect, useRef } from "react";
// import { BufferAttribute } from "three";


// const getRandomParticelPos = (particleCount) => {
//     const arr = new Float32Array(particleCount * 3);
//     for (let i = 0; i < particleCount; i++) {
//         arr[i] = (Math.random() - 10) * 10;
//     }
//     return arr;
// };

// function Stars() {
//     const ref = useRef();

//     useEffect(() => {
//         if (!ref.current) {
//             return;
//         }

//         ref.current.setAttribute("position", new BufferAttribute(getRandomParticelPos(20), 3));    
//     }, []);


//     return (
//         <>
//             <points>
//                 <bufferGeometry ref={ref} />
//                 <pointsMaterial size={0.05} />
//             </points>
//         </>
//     )
// }

import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Stars() {
  const numStars = 1000; // Number of stars
  const starsRef = useRef();

  // Create random positions and sizes for stars
  const [positions, sizes] = useMemo(() => {
    const positions = [];
    const sizes = [];
    for (let i = 0; i < numStars; i++) {
      // Random positions between -1 and 1 (this is in normalized device coordinates)
      positions.push(Math.random() * 500 * 2 - 500); // x
      positions.push(Math.random() * 500 * 2 - 500); // y
      positions.push(Math.random() * 500 * 2 - 500); // z

      // Random sizes for stars, just as an example
      sizes.push(5); // Random size between 0.5 and 1
    }

    return [new Float32Array(positions), new Float32Array(sizes)];
  }, [numStars]);

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.1} // Base size for all stars
        sizeAttenuation
        color={new THREE.Color(0xffffff)} // White stars
        transparent
        opacity={0.7}
      />
    </points>
  );
}

export default Stars;