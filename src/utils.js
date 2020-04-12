export const RESTAURANTS_URL = "https://gist.githubusercontent.com/devbkhadka/39301d886bb01bca84832bac48f52cd3/raw/f7372da48797cf839a7b13e4a7697b3a64e50e34/restaurants.json"
export const CENTER_LOCATION = [27.690870, 85.332701]
const EARTH_RADIUS_KM = 63710
const PI_RADIAN_IN_DEGREE = 180

export async function fetchRestaurants() {
    try{
        const resp = await fetch(RESTAURANTS_URL)
        const respStr = await resp.text()
        return JSON.parse(respStr)
    }
    catch(e) {
        console.log(e)
        return []
    }  
}

export function calculateDistance(location){
    const [x1, y1] = convertCoordinateFromDegreeToRadian(location)
    const [x2, y2] = convertCoordinateFromDegreeToRadian(CENTER_LOCATION)

    const term1 = Math.sin((x2-x1)/2)**2
    const term2 = Math.sin((y2-y1)/2)**2 * Math.cos(x1) * Math.cos(x2)

    const distance = 2*EARTH_RADIUS_KM*Math.asin(Math.sqrt(term1+term2))
    return distance * 100
}

function convertCoordinateFromDegreeToRadian(point) {
    const [x, y] = point
    return [x*Math.PI/PI_RADIAN_IN_DEGREE, y*Math.PI/PI_RADIAN_IN_DEGREE]
}