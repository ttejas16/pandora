
type PlanetRenderProps = {
    name: string,
    distanceFromSun: number,
    map:{
        url: string,
        additiveBlending: boolean,
    },
    atmoshereMap:{
        url: string,
        additiveBlending: boolean,
    },
    radius: number,
    accentColor: string
}

export default PlanetRenderProps;