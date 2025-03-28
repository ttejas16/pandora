import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Camera from "./Camera";
import { Html, OrbitControls, useTexture } from "@react-three/drei";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import infoMap from "../utils/planetDetails";
import { useEffect, useRef, useState } from "react";
import { Asterisk, Atom, Cloud, Earth, Moon, Orbit, Shell, Spline, TentTree, TreeDeciduous } from "lucide-react";
import { AdditiveBlending, SRGBColorSpace } from "three";
import { planetRenderProperties } from "../utils/planetInfo";

function PlanetInfo() {
    const navigate = useNavigate();
    const { planetName } = useParams();
    const [info, setInfo] = useState(null);
    const [renderInfo, setRenderInfo] = useState(null);

    useEffect(() => {
        if (!infoMap[planetName]) {
            navigate("/error");
            return;
        }

        setInfo(infoMap[planetName]);
        const renderProps = planetRenderProperties.filter(obj => obj.name == planetName)[0] || null;
        setRenderInfo(renderProps)
    }, []);
    console.log(renderInfo);
    
    return (
        <div className="flex h-screen">
            <div className="w-1/2 h-full p-6">
                <Canvas>
                    <Html as="div" center fullscreen style={{ top: 0, left: 0, position: "absolute" }}>
                        <div className="text-xl text-neutral-200 tracking-wider font-light">
                            {info && planetName.toUpperCase()}
                        </div>
                    </Html>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} />
                    <OrbitControls/>
                    {
                        renderInfo && <PlanetModel renderInfo={renderInfo}/>
                    }
                </Canvas>
            </div>
            <div className="w-1/2 flex flex-col bg-neutral-950 border-l-[1px] border-neutral-900 overflow-y-auto">
                {
                    info != null ?
                        <>
                            <div className="px-14 py-10 border-b-[1px] border-dashed border-neutral-700 flex flex-col">
                                <span className="text-3xl tracking-wider font-medium flex gap-x-4 items-center">
                                    <Earth className="text-sky-300" />
                                    {info["Title"]}.
                                </span>
                                <span className="text-neutral-200 mt-2 tracking-wider text-lg font-light ">
                                    {info["basic description"]}
                                </span>
                            </div>

                            <div className="px-14 py-10 border-b-[1px] border-dashed border-neutral-700 flex flex-col">
                                <span className="text-3xl tracking-wider font-medium flex gap-x-4 items-center">
                                    <Cloud className="text-sky-300" />
                                    Atmosphere.
                                </span>
                                <span className="text-neutral-200 mt-2 tracking-wider text-lg font-light ">
                                    {info["atmosphere"]}
                                </span>
                            </div>

                            <div className="px-14 py-10 border-b-[1px] border-dashed border-neutral-700 flex flex-col">
                                <span className="text-3xl tracking-wider font-medium flex gap-x-4 items-center">
                                    <Orbit className="text-sky-300" />
                                    Orbit And Rotation.
                                </span>
                                <span className="text-neutral-200 mt-2 tracking-wider text-lg font-light ">
                                    {info["orbit and rotation"]}
                                </span>
                            </div>
                            <div className="px-14 py-10 border-b-[1px] border-dashed border-neutral-700 flex flex-col">
                                <span className="text-3xl tracking-wider font-medium flex gap-x-4 items-center">
                                    <Atom className="text-sky-300" />
                                    Structure.
                                </span>
                                <span className="text-neutral-200 mt-2 tracking-wider text-lg font-light ">
                                    {info["structure"]}
                                </span>
                            </div>
                            <div className="px-14 py-10 border-b-[1px] border-dashed border-neutral-700 flex flex-col">
                                <span className="text-3xl tracking-wider font-medium flex gap-x-4 items-center">
                                    <Moon className="text-sky-300" />
                                    Moons.
                                </span>
                                <span className="text-neutral-200 mt-2 tracking-wider text-lg font-light ">
                                    {info["moons"]}
                                </span>
                            </div>
                            <div className="px-14 py-10 border-b-[1px] border-dashed border-neutral-700 flex flex-col">
                                <span className="text-3xl tracking-wider font-medium flex gap-x-4 items-center">
                                    <TreeDeciduous className="text-sky-300" />
                                    Life.
                                </span>
                                <span className="text-neutral-200 mt-2 tracking-wider text-lg font-light ">
                                    {info["possibility for life"]}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4 text-neutral-200 tracking-wider text-lg font-light">
                                <div className="flex justify-start items-center gap-x-4 px-10 py-6 
                                border-[1px] border-dashed border-neutral-700 rounded-lg">
                                    <TentTree className="text-amber-300" size={34} />
                                    <div className=" flex flex-col gap-y-1">
                                        <span className="font-medium text-[#fff]">Day Duration</span>
                                        <span className="text-sm">
                                            {info["Duration of one day"]}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-start items-center gap-x-4 px-10 py-6 
                                border-[1px] border-dashed border-neutral-700 rounded-lg">
                                    <Shell className="text-amber-300" size={34} />
                                    <div className=" flex flex-col gap-y-1">
                                        <span className="font-medium text-[#fff]">Gravity</span>
                                        <span className="text-sm">
                                            {info["gravity"]}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-start items-center gap-x-4 px-10 py-6 
                                border-[1px] border-dashed border-neutral-700 rounded-lg">
                                    <Asterisk className="text-amber-300" size={34} />
                                    <div className=" flex flex-col gap-y-1">
                                        <span className="font-medium text-[#fff]">Age</span>
                                        <span className="text-sm">
                                            {info["Age"]}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-start items-center gap-x-4 px-10 py-6 
                                border-[1px] border-dashed border-neutral-700 rounded-lg">
                                    <Spline className="text-amber-300" size={34} />
                                    <div className=" flex flex-col gap-y-1">
                                        <span className="font-medium text-[#fff]">Distance From Sun</span>
                                        <span className="text-sm">
                                            {info["Distance from Sun"]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>

                        :
                        <div className="w-full h-full flex justify-center items-center text-neutral-400">
                            Fetching...
                        </div>
                }
            </div>
        </div>
    )
}


function PlanetModel({ renderInfo }) {
    const ref = useRef();
    const texture = useTexture(renderInfo.map.url);

    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 8;

    useFrame(()=>{
        if (ref.current) {
            ref.current.rotation.y += 0.001;
            
        }
    });

    return (
        <group ref={ref}>
            <mesh>
                <icosahedronGeometry args={[renderInfo.radius, 20]} />
                <meshStandardMaterial
                    map={texture}
                    blending={renderInfo.map.additiveBlending ? AdditiveBlending : undefined}
                />
            </mesh>
            {
                renderInfo.atmosphereMap &&
                <Atmosphere
                    url={renderInfo.atmosphereMap.url}
                    radius={renderInfo.radius}
                    blending={renderInfo.atmosphereMap.additiveBlending}
                />
            }
        </group>
    )
}
function Atmosphere({ url, blending, radius }) {
    const atmosphere = useTexture(url);

    return (
        <mesh>
            <icosahedronGeometry
                args={[radius, 20]}
            />
            <meshStandardMaterial
                map={atmosphere}
                blending={blending ? AdditiveBlending : undefined}
            />
        </mesh>
    )
}

export default PlanetInfo;