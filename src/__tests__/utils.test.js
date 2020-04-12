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
    
})