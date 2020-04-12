import {fetchRestaurants, RESTAURANTS_URL, calculateDistance} from '../utils'
import * as fixtures from '../fixtures'

jest.spyOn(global, 'fetch')

describe('fetchRestaurants', ()=>{
    beforeEach(()=>{
        global.fetch.mockClear()
        global.fetch.mockResolvedValue({text: ()=>JSON.stringify(fixtures.dummyRestaurants)})
    })
    it('should call fetch api with correct parameters', ()=>{
        fetchRestaurants()
        expect(global.fetch).toBeCalledWith(RESTAURANTS_URL)
    })

    it("should return response on fetch success", async ()=>{
        const restaurants = await fetchRestaurants()
        expect(restaurants).toEqual(fixtures.dummyRestaurants)
    })

    it("should return null on fetch error", async ()=>{
        global.fetch.mockRejectedValue("some error occured")
        const restaurants = await fetchRestaurants()
        expect(restaurants).toEqual([])
    })
})

describe('calculateDistance', ()=>{
    it('should return distance in meters from center to a location given in degree', ()=>{
        const testLocationPairs = [
            [ 40.76404704,-73.98364954],
            [ 26.212754, 84.961525],
            [27.699363, 85.325500],
            [ -11.166805, 38.408597],
        ]
        const expectedDistances = [
            12109725,
            168479,
            1181,
            6647488,
        ]

        const calculatedDistances = testLocationPairs.map((location)=>{
            return calculateDistance(location)
        })

        // Test calculated values with in 1km range of expected value
        expect(calculatedDistances.map(d=>Math.floor(d/100)))
            .toEqual(expectedDistances.map(d=>Math.floor(d/100)))
    })
})