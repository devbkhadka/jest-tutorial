import React, {useState} from 'react'
import {calculateDistance} from './utils'

export default function Restaurants({list}) {
    const [filteredList, setFilteredList] = useState(list)
    const [distance, setDistance] = useState(null)

    const filterRestaurents = ()=> {
        setFilteredList(filterWithinDistance(list, distance))
    }


    return <div className="App">
        <header className="App-header">
            <h2>Restaurants</h2>
        </header>
        <div className="App-content">
            <form onSubmit={()=>filterRestaurents()}>
                <input onChange={(e)=>setDistance(e.target.value*1)} 
                    data-testid="inpDistance" 
                    placeholder="Enter distance in meters"/>
            </form>
            <ul>
            {
                filteredList.map((restaurant, i)=>
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