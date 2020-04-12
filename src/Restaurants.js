import React, {useState, useMemo} from 'react'
import {calculateDistance} from './utils'

export default function Restaurants({list}) {
    const [distance, setDistance] = useState(null)
    const filteredList = useMemo(()=> {
        return filterWithinDistance(list, distance)
    }, [list, distance])

    return <div className="App">
        <header className="App-header">
            <h2>Restaurants</h2>
        </header>
        <div className="App-content">
            <form onSubmit={(e)=>e.preventDefault()}>
                <input onChange={(e)=> setDistance(e.target.value*1)} 
                    data-testid="inpDistance" 
                    placeholder="Enter distance in meters"/>
            </form>
            <ul>
            {
                filteredList && filteredList.map((restaurant, i)=>
                    <li key={restaurant.id}>{restaurant.name}</li>
                )
            }
            </ul>
        </div>
    </div>
}

function filterWithinDistance(restaurants, distance) {
    return distance?
        restaurants.filter(restaurant=> calculateDistance(restaurant.location) <= distance):
        restaurants
}