import React from "react";
import '../Style/frontpage.css';
import Banner from './Banner';
import QuickSearch from "./QuickSearch";
import axios from "axios";
const BASE_URL = window.env.REACT_APP_BASE_URL;


class Homepage extends React.Component{
    constructor(){
        super();
        this.state ={
            location: [],
            mealtype: []
        }
    }

    componentDidMount(){
        //location api 
        axios({
            withCredentials: true,
            //url: 'http://localhost:5500/location',
            url: `${BASE_URL}/location`,
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON', "Access-Control-Allow-Credentials": true}
        })
        .then( res => {
            this.setState({ location: res.data.location })
        })
        .catch((err => console.log(err)))

        //mealtype api
        axios({
            withCredentials: true,
            //url: 'http://localhost:5500/mealtype',
            url: `${BASE_URL}/mealtype`,
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON', "Access-Control-Allow-Credentials": true}
        })
        .then( res => {
            this.setState({ mealtype: res.data.meal })
        })
        .catch((err => console.log(err)))
    }
  
    render(){
        const { location, mealtype  } = this.state;
       console.log("Location:", location);
       console.log("Mealtype:", mealtype);
      
        return(
            <div>
             {/*<!--Banner Part (upper)-->*/}

            <Banner locationData = { location } />

        {/*<!--Quick Searches Part (lower)-->*/}

            <QuickSearch mealtypeData = { mealtype } />

                
            </div>
        )
    }
}

export default Homepage;