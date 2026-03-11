export const getRandomNumber = (min: number = 0, max: number = 100, chances: number[] = []) => {
    const points = getChancesPoints(chances)
    const randomBuffer = new Uint32Array(1);
    if(typeof window !== "undefined") {
        window.crypto.getRandomValues(randomBuffer);

    }

    const randomNumber = randomBuffer[0] / (0xffffffff + 1);

    let basic = randomNumber * (max - min) + min;

    if(basic > max ) {
        basic = max
    }
    if (chances.length > 0) {
        let prev = 0
        let i = 0
        for (const key in points) {

            if(basic >= prev && basic < points[key]) {
                return Number(key)
            } else {
                prev = points[key]
            }
            if(basic === 100 && i === Object.keys(points).length - 1) {
                return Number(key)
            }
            i += 1
        }
    }
    return basic
}

export const getRandomColor = () => {
    let color = "#1E90FF"
    const colors = [
        "#FF0000", "#FF5733", "#c21919", "#FF6347", "#FF4500",
        "#00FF00", "#33FF73", "#C3FF00", "#228B22", "#008000",
        "#0000FF", "#3373FF", "#00C3FF", "#1E90FF", "#4169E1",
        "#FFFF00", "#FFD700", "#FFEA00", "#F0E68C", "#FFAC33",
        "#FFC0CB", "#FF69B4", "#FF1493", "#FF6EB4", "#FF82AB",
        "#800080", "#9932CC", "#8A2BE2", "#A020F0", "#8000FF",
        "#FFA500", "#FFD700", "#FF8C00", "#FF7F50", "#FF4500",
        "#A52A2A", "#8B4513", "#D2691E", "#CD853F", "#DEB887",
        "#00FFFF", "#20B2AA", "#40E0D0", "#00CED1", "#00C5CD",
        "#FF00FF", "#FF69B4", "#DA70D6", "#BA55D3", "#FFA0B4",
        "#008080", "#008B8B", "#00FFFF", "#20B2AA", "#40E0D0",
        "#00FF00", "#32CD32", "#7FFF00", "#00FA9A", "#00FF7F",
        "#800000", "#8B0000", "#B22222", "#A52A2A", "#800000",
        "#808000", "#6B8E23", "#556B2F", "#8FBC8B", "#9ACD32"
    ]
    color = colors[Math.floor(getRandomNumber( 0, colors.length - 1))]
    return color
}

export const getChancesPoints = (chances: number[] = []): {[key: number]: number} => {
    const points: {[key: number]: number} = {0: 0}
    if(chances.length > 0) {
        const allChances = getChances(chances)
        let currPoint = 0
        for (let i = 0; i < allChances.length; i++) {
            points[i] = currPoint + allChances[i]
            currPoint += allChances[i]
        }
    }

    return points
}
export const getChances = (chances: number[] = []) => {
    let allChances: number[] = []
    if(chances.length > 0) {
        const sum = chances.reduce((partialSum, a) => partialSum + a, 0);

        const onePercent = 100/sum
        allChances = chances.map(chance => onePercent * chance)
    }

    return allChances
}

export const getFullRandomRgba = (opacity: boolean = true) => {

    return 'rgba(' + Math.round(getRandomNumber(0, 255)) + ',' + Math.round(getRandomNumber(0, 255)) + ',' + Math.round(getRandomNumber(0, 255)) + ',' + (opacity ? getRandomNumber(0, 1).toFixed(1) : "1") + ')';
}
