import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Restaurants from '../Restaurants'
import * as fixtures from '../fixtures'
import {calculateDistance} from '../utils'

jest.mock('../utils')
describe("Restaurants Component", ()=>{
    it("should render restaurants passed to it", ()=>{
        // render function returns a handle 
        const {getAllByText} = render(<Restaurants list={fixtures.dummyRestaurants}/>)
        // get elements matching regex
        expect(getAllByText(/Restaurant\d/).length).toBe(5)
    })
    
    it("should be able to filter restaurants by distance from center", ()=>{
        const {queryAllByText, getByTestId} = render(<Restaurants list={fixtures.dummyRestaurants}/>)

        // following block set five different return value for five calls to calculateDistance
        calculateDistance
            .mockReturnValueOnce(30)
            .mockReturnValueOnce(110)
            .mockReturnValueOnce(80)
            .mockReturnValueOnce(60)
            .mockReturnValueOnce(300)

        const inpDistance = getByTestId('inpDistance')
        // fire change event on inpDistance to set distance
        fireEvent.change(inpDistance, {target:{value: 100}})
        
        expect(queryAllByText(/Restaurant\d/).length).toBe(3)
    })
})