import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Camera from "./Camera";
import { Html, OrbitControls, useTexture } from "@react-three/drei";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import infoMap from "../utils/planetDetails";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    Asterisk,
    Atom,
    ChevronLeft,
    ChevronRight,
    Cloud,
    Earth,
    Home,
    Moon,
    Orbit,
    Radius,
    Shell,
    Spline,
    TentTree,
    TreeDeciduous
} from "lucide-react";
import { AdditiveBlending, SRGBColorSpace, Vector3 } from "three";
import { planetRenderProperties } from "../utils/planetInfo";
import { DoubleSide } from "three/src/constants.js";

const planets = Object.keys(infoMap);

function PlanetInfo() {
    const navigate = useNavigate();
    const { planetName } = useParams();
    const [info, setInfo] = useState(null);
    const [renderInfo, setRenderInfo] = useState(null);
    const [planetState, setPlanetState] = useState(planetName);

    useEffect(() => {
        setPlanetState(planetName);
    }, [planetName]);

    useEffect(() => {
        if (!infoMap[planetState]) {
            navigate("/error");
            return;
        }

        setInfo(infoMap[planetState]);
        const renderProps = planetRenderProperties.filter(obj => obj.name == planetState)[0] || null;
        setRenderInfo(renderProps);
    }, [planetState]);

    return (
        <div className="flex h-screen">
            <div className="w-1/2 h-full p-6 relative">
                <Link to={"/"} className="absolute right-4 z-40">
                    <Home className="text-neutral-400" />
                </Link>
                <Canvas className="z-[5]">
                    <Html as="div" center fullscreen style={{ top: 0, left: 0, position: "absolute" }}>
                        <div className="text-xl text-neutral-200 tracking-wider font-light no-select">
                            {info && planetState.toUpperCase()}
                        </div>
                        <button
                            onClick={e => {
                                const currentIndex = planets.findIndex((v) => v == planetState);
                                const nextIndex = (currentIndex - 1) < 0 ? planets.length - 1 : currentIndex - 1;
                                setPlanetState(planets[nextIndex]);
                                navigate(`/info/${planets[nextIndex]}`);
                            }}
                            className="absolute bottom-0 left-0">
                            <ChevronLeft />
                        </button>
                        <button
                            onClick={e => {
                                const currentIndex = planets.findIndex((v) => v == planetState);
                                const nextIndex = (currentIndex + 1) % planets.length;
                                setPlanetState(planets[nextIndex]);
                                navigate(`/info/${planets[nextIndex]}`);
                            }}
                            className="absolute bottom-0 right-0">
                            <ChevronRight />
                        </button>
                    </Html>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} />
                    <OrbitControls position={[0, 100, 0]} />
                    <InitialCamera/>
                    {
                        renderInfo && <PlanetModel renderInfo={renderInfo} />
                    }
                </Canvas>
            </div>
            <div className="w-1/2 flex flex-col bg-neutral-950 border-l-[1px] border-neutral-900 overflow-y-auto">
                {
                    info != null ?
                        <>
                            <div className="px-14 py-10 border-b-[1px] border-dashed border-neutral-700 flex flex-col">
                                <span className="text-3xl tracking-wider font-medium flex gap-x-4 items-center">
                                    <Earth className="text-sky-300 shrink-0" />
                                    {info["Title"]}.
                                </span>
                                <span className="text-neutral-200 mt-2 tracking-wider text-lg font-light ">
                                    {info["basic description"]}
                                </span>
                            </div>

                            <div className="px-14 py-10 border-b-[1px] border-dashed border-neutral-700 flex flex-col">
                                <span className="text-3xl tracking-wider font-medium flex gap-x-4 items-center">
                                    <Cloud className="text-sky-300 shrink-0" />
                                    Atmosphere.
                                </span>
                                <span className="text-neutral-200 mt-2 tracking-wider text-lg font-light ">
                                    {info["atmosphere"]}
                                </span>
                            </div>

                            <div className="px-14 py-10 border-b-[1px] border-dashed border-neutral-700 flex flex-col">
                                <span className="text-3xl tracking-wider font-medium flex gap-x-4 items-center">
                                    <Orbit className="text-sky-300 shrink-0" />
                                    Orbit And Rotation.
                                </span>
                                <span className="text-neutral-200 mt-2 tracking-wider text-lg font-light ">
                                    {info["orbit and rotation"]}
                                </span>
                            </div>
                            <div className="px-14 py-10 border-b-[1px] border-dashed border-neutral-700 flex flex-col">
                                <span className="text-3xl tracking-wider font-medium flex gap-x-4 items-center">
                                    <Atom className="text-sky-300 shrink-0" />
                                    Structure.
                                </span>
                                <span className="text-neutral-200 mt-2 tracking-wider text-lg font-light ">
                                    {info["structure"]}
                                </span>
                            </div>
                            {
                                info["moons"] &&
                                <div className="px-14 py-10 border-b-[1px] border-dashed border-neutral-700 flex flex-col">
                                    <span className="text-3xl tracking-wider font-medium flex gap-x-4 items-center">
                                        <Moon className="text-sky-300 shrink-0" />
                                        Moons.
                                    </span>
                                    <span className="text-neutral-200 mt-2 tracking-wider text-lg font-light ">
                                        {info["moons"]}
                                    </span>
                                </div>
                            }
                            {
                                info["possibility for life"] &&
                                <div className="px-14 py-10 border-b-[1px] border-dashed border-neutral-700 flex flex-col">
                                    <span className="text-3xl tracking-wider font-medium flex gap-x-4 items-center">
                                        <TreeDeciduous className="text-sky-300 shrink-0" />
                                        Life.
                                    </span>
                                    <span className="text-neutral-200 mt-2 tracking-wider text-lg font-light ">
                                        {info["possibility for life"]}
                                    </span>
                                </div>
                            }

                            <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4 text-neutral-200 tracking-wider text-lg font-light">
                                {
                                    info["Duration of one day"] &&
                                    <div className="flex justify-start items-center gap-x-4 px-10 py-6 
                                border-[1px] border-dashed border-neutral-700 rounded-lg">
                                        <TentTree className="text-amber-300 shrink-0" size={34} />
                                        <div className=" flex flex-col gap-y-1">
                                            <span className="font-medium text-[#fff]">Day Duration</span>
                                            <span className="text-sm">
                                                {info["Duration of one day"]}
                                            </span>
                                        </div>
                                    </div>
                                }
                                {
                                    info["gravity"] &&
                                    <div className="flex justify-start items-center gap-x-4 px-10 py-6 
                                border-[1px] border-dashed border-neutral-700 rounded-lg">
                                        <Shell className="text-amber-300 shrink-0" size={34} />
                                        <div className=" flex flex-col gap-y-1">
                                            <span className="font-medium text-[#fff]">Gravity</span>
                                            <span className="text-sm">
                                                {info["gravity"]}
                                            </span>
                                        </div>
                                    </div>
                                }
                                {
                                    info["Age"] &&
                                    <div className="flex justify-start items-center gap-x-4 px-10 py-6 
                                border-[1px] border-dashed border-neutral-700 rounded-lg">
                                        <Asterisk className="text-amber-300 shrink-0" size={34} />
                                        <div className=" flex flex-col gap-y-1">
                                            <span className="font-medium text-[#fff]">Age</span>
                                            <span className="text-sm">
                                                {info["Age"]}
                                            </span>
                                        </div>
                                    </div>
                                }
                                {
                                    info["Distance from Sun"] &&
                                    <div className="flex justify-start items-center gap-x-4 px-10 py-6 
                                border-[1px] border-dashed border-neutral-700 rounded-lg">
                                        <Spline className="text-amber-300 shrink-0" size={34} />
                                        <div className=" flex flex-col gap-y-1">
                                            <span className="font-medium text-[#fff]">Distance From Sun</span>
                                            <span className="text-sm">
                                                {info["Distance from Sun"]}
                                            </span>
                                        </div>
                                    </div>
                                }
                                {
                                    info["size"] &&
                                    <div className="flex justify-start items-center gap-x-4 px-10 py-6 
                                border-[1px] border-dashed border-neutral-700 rounded-lg">
                                        <Radius className="text-amber-300 shrink-0" size={34} />
                                        <div className=" flex flex-col gap-y-1">
                                            <span className="font-medium text-[#fff]">Size</span>
                                            <span className="text-sm">
                                                {info["size"]}
                                            </span>
                                        </div>
                                    </div>
                                }
                                {
                                    info["distance from earth"] &&
                                    <div className="flex justify-start items-center gap-x-4 px-10 py-6 
                                border-[1px] border-dashed border-neutral-700 rounded-lg">
                                        <Spline className="text-amber-300 shrink-0" size={34} />
                                        <div className=" flex flex-col gap-y-1">
                                            <span className="font-medium text-[#fff]">Distance from Earth</span>
                                            <span className="text-sm">
                                                {info["distance from earth"]}
                                            </span>
                                        </div>
                                    </div>
                                }
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

    useFrame(() => {
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
            {
                renderInfo.ring && <TexturedRing url={renderInfo.ring.url} />
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
function InitialCamera() {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.y += 2;
    }, []);
}

function TexturedRing({ url }) {
    const [ring] = useTexture([url]);
    const ref = useRef(null);
  
    useLayoutEffect(() => {
      if (!ref.current) {
        return;
      }
  
      var pos = ref.current.attributes.position;
      var v3 = new Vector3();
      for (let i = 0; i < pos.count; i++) {
        v3.fromBufferAttribute(pos, i);
        ref.current.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
      }
  
    }, []);
  
    return (
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry ref={ref} args={[3, 5, 32 * 3]} />
        <meshStandardMaterial side={DoubleSide} map={ring} />
      </mesh>
    )
  
  }

export default PlanetInfo;