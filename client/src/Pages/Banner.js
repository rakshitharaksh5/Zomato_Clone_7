import React from "react";
import axios from "axios";
import navHook from "./nav";
const BASE_URL = window.env.REACT_APP_BASE_URL;

class Banner extends React.Component{
    constructor(){
        super();
        this.state ={
            restaurants: [],
            inputText: undefined,
            suggestion: [],
        }
    }


    handleLocation = (e) => {
        const location = e.target.value;

        axios({
            //url: `http://localhost:5500/rest/${location}`,
            url: `${BASE_URL}/rest/${location}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON', "Access-Control-Allow-Credentials": true}
        })
        .then( res => {
            this.setState({ restaurants: res.data.restaurant})
        })
        .catch((err => console.log(err)))
    }

    handleInput = (event) => {
        const {restaurants} = this.state;
        const inputText = event.target.value;

        let suggestion = [];

        suggestion = restaurants.filter( item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({ inputText, suggestion });
    }

    showSuggestion = () => {
        const { inputText, suggestion } = this.state;

        if(suggestion.length === 0 && inputText === undefined){
            return null;
        }

        if(suggestion.length > 0 && inputText === ''){
            return null;
        }

        if(suggestion.length === 0 && inputText){
            return (
                <li>No Results Found !</li>
            );
        }


        return(
            suggestion.map((item, index) => (
                <li key = { index } className="suggestionList" onClick={() => this.selectRestaurant(item._id)}>
                    <img src = { item.thumb } className = "suggestionImg"  alt=" " />             {/*rest img */}
                    <span className="suggestionName">{ item.name }</span>                {/*rest name */}
                    <span className="suggestionLocation">{item.address}</span>           {/*rest location */}
                </li>
               
            ))
        )
    }

    selectRestaurant = (ss) => {
        this.props.navigate(`/details?restaurant=${ss}`);
    }

    render(){
        const { locationData } = this.props;

        //console.log(locationData);
        return(
            <div>
             {/*<!--Banner Part (upper)-->*/}

                <div class="bg-cover bg-image d-flex">
                    <div class="container mt-3">
                        {/* <div class="row">
                            <div class="col text-end">
                                <button type="button" class="btn btn-transparent text-white">Login</button>
                                <button type="button" class="btn btn-outline-light">Create an account</button>
                            </div>
                        </div> */}
                        <div class="row mt-5">
                            <div class="col d-flex justify-content-center">
                                <div class="text-danger circle_m">
                                    <h2 class="logo_m">e!</h2>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col d-flex justify-content-center">
                                <h3 class="text-light line">Find the best restaurants, cafés, and bars</h3>
                            </div>
                        </div>
                        <div class="row mt-3 d-flex justify-content-center">
                            <div class="col selectbar">
                                <select class="form-control input1 py-2" onChange={this.handleLocation}>

                                    <option value="0" disabled selected>Please type a location</option>

                                    {
                                        locationData?.map((item) => {
                                            return(
                                                <option value={item.city_id}>{item.name}</option>
                                            )
                                        })
                                    }
                                    
                                    
                                </select>
                            </div>
                            <div class="col input-group searchbar">
                                <i class="input-group-text bi bi-search input2"></i>
                                <input type="text" class="form-control input2 py-2" placeholder="Search for restaurants" onChange={this.handleInput} />

                                {/* Suggestion Box */}
                                <ul className = "suggestionBox">{this.showSuggestion()} </ul>
                            </div>
                        </div>
                    </div>
                </div>

       
            </div>
        )
    }
}

export default navHook(Banner);