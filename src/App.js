import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import unirest from 'unirest';


class App extends Component {
  //Constructor for the state object
  constructor(){
    super()

    this.state={
      definition:[]
    }
    
  
   
//Binding the value from the submit event
    this.onSubmit = this.onSubmit.bind(this);
  }
// onSubmit is called when the use hits enter after entering the movie they are searching for.
  onSubmit(event){
// Prevents the form from reloading the screen
    event.preventDefault();
// Stores the value from the input field.
    var query = this.input.value;
// empties the field after the query is passed.
    this.input.value = "";
    console.log(query);
// Calls the componentDidMount method and passes the data from the input field
    this.componentDidMount(query);
  }
// componentDidMount opens the request to the API
  componentDidMount(query){
    var API_URL = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=';
  //var API_KEY = 'cc461166b6msh71d4da795cd5b41p13dc64jsn5fab2ebff225'
  
  // unirest get takes in the api url variable and concatenates it with the query for the search, grabs the results and sets state with the new data
  // the state is set down to the list buried in the object..this varies depending on the schema of the data.
  unirest.get(API_URL + query)
   .header("X-RapidAPI-Host", "mashape-community-urban-dictionary.p.rapidapi.com")
   .header("X-RapidAPI-Key", "cc461166b6msh71d4da795cd5b41p13dc64jsn5fab2ebff225")
   .then(result => 
       this.setState ({
         definition:result.body.list
       }));

  }
  render() {
// Grabs the state from above, maps through the data
    const {definition} = this.state;
    console.log(definition)   
    var defList = definition.map((dlist) => 
    <div className="col-12 movie">     
    <ul>
      <li>Author: {dlist.author}</li>
      <li>Definition: {dlist.definition}</li>
      <li>Example:{dlist.example}</li>
    </ul>
     
    </div>)
    
    return (
      <div className="App">
        <div className="jumbotron">  
            <div className="container">
            <div className="row">
            <h2 className="col-12 text-center">Slang Dictionary</h2>
              <form onSubmit={this.onSubmit} className="col-12">
                <input className= "col-12 form-control" placeholder="Search for slang definition..."
                ref = {input => this.input = input}/>
              </form>
              <div>
                <ul className= "col-12 row list">{defList}</ul>
              </div>
              </div>
            </div>
          </div>
      </div>


    )
  }
}

export default App;