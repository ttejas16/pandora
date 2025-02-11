import { earthDistance, jupiterDistance, marsDistance, mercuryDistance, neptuneDistance, saturnDistance, uranusDistance, venusDistance } from "./distances";

const planetRenderProperties = [
    {
        name: "Sun",
        distanceFromSun: 0,
        map: {
            url: "/2k_sun.jpg",
            additiveBlending: false
        },
        atmosphereMap: null,
        radius: 2,
        accentColor: "#577BC1"
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
        accentColor: "#727D73"
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
        accentColor: "#F9CB43"
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
        accentColor: "#577BC1"
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
        accentColor: "#C96868"
    },
    {
        name: "Jupiter",
        distanceFromSun: jupiterDistance,
        map: {
            url: "/2k_jupiter.jpg",
            additiveBlending: false
        },
        atmosphereMap: null,
        radius: 2.5,
        accentColor: "#754E1A"
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
        accentColor: "#D39D55"
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
        accentColor: "#3D8D7A"
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
        accentColor: "#27445D"
    },
]

export {
    planetRenderProperties
}