import {
    earthDistance,
    jupiterDistance,
    marsDistance,
    mercuryDistance,
    neptuneDistance,
    saturnDistance,
    uranusDistance,
    venusDistance
} from "./distances";

const initialAngleWithDistances = {
    Mercury: [45, mercuryDistance],
    Venus: [-45, venusDistance],
    Earth: [160, earthDistance],
    Mars: [-90, marsDistance],
    Jupiter: [180, jupiterDistance],
    Saturn: [-10, saturnDistance],
    Uranus: [135 ,uranusDistance],
    Neptune: [150, neptuneDistance],
}

const initialPositions = {};
function calculateInitialPositions() {
    for (const key in initialAngleWithDistances) {
        const [angle, radius] = initialAngleWithDistances[key];
        const x = Math.cos(angle) * radius;
        const y = 0;
        const z = Math.sin(angle) * radius;

        initialPositions[key] = [x, y, z];
    }
}
calculateInitialPositions();

const planetRenderProperties = [
    {
        name: "Sun",
        distanceFromSun: 0,
        map: {
            url: "/2k_sun.jpg",
            additiveBlending: false
        },
        atmosphereMap: null,
        radius: 2.5,
        accentColor: "#577BC1",
        revolutionSpeed: 0.001,
        rotationSpeed: 0,
        initialPosition: [0, 0, 0]
    },
    {
        name: "Mercury",
        distanceFromSun: mercuryDistance,
        map: {
            url: "/2k_mercury.jpg",
            additiveBlending: false
        },
        atmosphereMap: null,
        radius: 2,
        accentColor: "#727D73",
        revolutionSpeed: 0.0001,
        rotationSpeed: 0.0001,
        initialPosition: initialPositions["Mercury"]
    },
    {
        name: "Venus",
        distanceFromSun: venusDistance,
        map: {
            url: "/2k_venus_surface.jpg",
            additiveBlending: false
        },
        atmosphereMap: {

            url: "/2k_venus_atmosphere.jpg",
            additiveBlending: false
        },
        radius: 2,
        accentColor: "#FFB22C",
        revolutionSpeed: 0.0001,
        rotationSpeed: 0.0001,
        initialPosition: initialPositions["Venus"]
    },
    {
        name: "Earth",
        distanceFromSun: earthDistance,
        map: {
            url: "/2k_earth.jpg",
            additiveBlending: false
        },
        atmosphereMap: {
            url: "/2k_earth_clouds.jpg",
            additiveBlending: true
        },
        radius: 2,
        accentColor: "#2973B2",
        revolutionSpeed: 0.0001,
        rotationSpeed: 0.0001,
        initialPosition: initialPositions["Earth"]
    },
    {
        name: "Mars",
        distanceFromSun: marsDistance,
        map: {
            url: "/2k_mars.jpg",
            additiveBlending: false
        },
        atmosphereMap: null,
        radius: 2,
        accentColor: "#740938",
        revolutionSpeed: 0.0001,
        rotationSpeed: 0.0001,
        initialPosition: initialPositions["Mars"]
    },
    {
        name: "Jupiter",
        distanceFromSun: jupiterDistance,
        map: {
            url: "/2k_jupiter.jpg",
            additiveBlending: false
        },
        atmosphereMap: null,
        radius: 2.4,
        accentColor: "#754E1A",
        revolutionSpeed: 0.0001,
        rotationSpeed: 0.0001,
        initialPosition: initialPositions["Jupiter"]
    },
    {
        name: "Saturn",
        distanceFromSun: saturnDistance,
        map: {
            url: "/2k_saturn.jpg",
            additiveBlending: false
        },
        atmosphereMap: null,
        radius: 2,
        accentColor: "#D39D55",
        revolutionSpeed: 0.0001,
        rotationSpeed: 0.0001,
        initialPosition: initialPositions["Saturn"]
    },
    {
        name: "Uranus",
        distanceFromSun: uranusDistance,
        map: {
            url: "/2k_uranus.jpg",
            additiveBlending: false
        },
        atmosphereMap: null,
        radius: 2,
        accentColor: "#3D8D7A",
        revolutionSpeed: 0.0001,
        rotationSpeed: 0.0001,
        initialPosition: initialPositions["Uranus"]
    },
    {
        name: "Neptune",
        distanceFromSun: neptuneDistance,
        map: {
            url: "/2k_neptune.jpg",
            additiveBlending: false
        },
        atmosphereMap: null,
        radius: 2,
        accentColor: "#27667B",
        revolutionSpeed: 0.0001,
        rotationSpeed: 0.0001,
        initialPosition: initialPositions["Neptune"]
    },
]

export {
    planetRenderProperties
}