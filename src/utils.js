export const RESTAURANTS_URL = "https://gist.githubusercontent.com/devbkhadka/39301d886bb01bca84832bac48f52cd3/raw/f7372da48797cf839a7b13e4a7697b3a64e50e34/restaurants.json"

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

}