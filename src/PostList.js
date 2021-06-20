
//import react and the hooks
import React, { useEffect, useState } from 'react';
//importing the json data directly, due to cors error I was unable to fetch the api data 
import PostData from './building-location.json'
//import css
import './App.css';
//import date format npm
import {format} from 'date-fns'

//'https://green-meadow-0b6c10003.azurestaticapps.net/building-location.json',



function App() {

  

  //console.log(locations.flat())

  //creating the use state variables
  const [consumers, setConsumers] = useState([])
  const [phoneValid, setPhoneValid] = useState('all')
  const [allConsumers, setallConsumers] = useState([])
  
  //creating the effect hook to be able to parse the data to show the consumers as a list 
  useEffect(() => {
    //using the map function to sort through the nested data
    const locations = PostData.locations.map((location) => {
      return location.consumers
    })

    //needed to flatten the array so that I was able to access all consumers
    const consumers = locations.flat()

    //replacing the timestamp with human readable dates and times 
    const withFormattedDate = consumers.map((consumer)=> {
      const formattedDate = format(new Date(consumer.occupationDate), 'dd/MM/yyyy HH:MM')
      return{
        ...consumer,occupationDate: formattedDate
      }


    })
    //calling the set variables
    setallConsumers(withFormattedDate)
    setConsumers(withFormattedDate)
  }, [])

 

  //console.log(consumers)

  //making the select handle change options so that we can actually switch from all/active/inactive
  //I was having trouble having all these work in a useEffect() so I just specified each iteration
  const handleChange = (e) => {
    const {value} = e.target
    //console.log(value)
    setPhoneValid(value)
    const validMobileConsumers = allConsumers.filter((consumer) => {
      if (consumer.isPhoneMobile) {
        return consumer
      } 
    })

    const invalidMobileConsumers = allConsumers.filter((consumer) => {
      if (!consumer.isPhoneMobile) {
        return consumer
      } 
    })
    
    if(value==='active') {
      setConsumers(validMobileConsumers)
    }

    if(value === 'inactive') {
      setConsumers(invalidMobileConsumers)
    }

    if(value === 'all') {
      setConsumers(allConsumers)
    }

    //console.log(validMobileConsumers)
  }

  

  return (
    

    

    <div>

    <h1>Consumer List</h1>
    <label>Filter Valid Phone Numbers </label><select onChange={handleChange} value={phoneValid}> 
      <option value='active'>Active</option>
      <option value='inactive'>In Active</option>
      <option value='all'>All</option>
    </select>
    {consumers.map((consumer) => {
      //console.log(consumer.isPhoneMobile)
      //map through each consumers details and display them
      return <ul key={consumer.consumerId}>
        <li> {consumer.name} </li>
        <li>{consumer.email}</li>
        <li>{consumer.occupationDate}</li>
        <li>{consumer.phoneNumber}</li>
        <li>{consumer.isPhoneMobile.toString()}</li>
      </ul>
    })}

    </div>


    
    
    
  );
}

export default App;
