import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import Restaurants from '../Restaurants'
import {fetchRestaurants} from '../utils'
import * as fixtures from '../fixtures'
import { act } from 'react-dom/test-utils';

// First mock whole '../Restaurants' and '../utils'
// By default it will mock all the functions in module to return undefined
jest.mock('../Restaurants')
jest.mock('../utils')

// Provide fake return values for the functions
Restaurants.mockReturnValue(null)
// we want fetchRestaurants to return promise that resolves to fixtures.dummyRestaurants
fetchRestaurants.mockResolvedValue(fixtures.dummyRestaurants)

describe("App Component", ()=>{
  
  // function passed to before each is called before running each test
  // It is used to setup pre-condition for each test
  beforeEach(()=>{
    // mockClear clears call history of the mock function
    Restaurants.mockClear()
    fetchRestaurants.mockClear()
  })

  it('Should call "fetchRestaurants" function to get restaurants', async ()=>{
    await act(async () => {
      render(<App />)
    })
    expect(fetchRestaurants).toBeCalled()
  })

  it('Should render "Restaurants" component with result from "fetchRestaurants"', async ()=>{
    await act(async () => {
      render(<App />)
    })
    expect(Restaurants.mock.calls[1][0]).toEqual({list: fixtures.dummyRestaurants})
  })
})
