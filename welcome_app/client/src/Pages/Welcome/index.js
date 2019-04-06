import React, { Component } from 'react';
import './App.css';

class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = { UpdateTime: null };
    
        
      } 

    getDBTime = () =>{
        const url = "/getDBTime";
  
        fetch(url)
          .then(response => response.json())
          .then(data => this.setState({
            UpdateTime: data[0]["UPDATE_TIME"],
          }))
      } 

    componentDidMount(){
        this.getDBTime()
    }
  render() {
      console.log(this.state)

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
             welcome React
          </a>
        </header>
      </div>
    );
  }
}

export default Welcome;
