import React, { Component } from 'react';

import { Link, Center , Empid_name, DatePick } from "../../components";
import { Frame, Words } from "@arwes/arwes";




  class Splash extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        data: null ,
        dateVal: null
      };
  
     
    } 
  componentWillMount(){
    const url = "/attend_name_empid";

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({
        data: data,
      }))
  }

  handleDateValChange = (DateVal) => {
    this.setState({dateVal: DateVal});
}

  render() {

    const {data} = this.state;
    return (
    <Center>
      <h1 >
        Complete Employee List on 
      </h1>

      <DatePick onDateSelect = {this.handleDateValChange}/>
        

     <div className="emp_id_name_container"
     style={{  padding: 20 , width: "100%"}}>
     {data ? (
        data.map((element, k) => {
          return (<Link to={`detail/${element["EMP_ID"]}`} key={k}>
            <Empid_name emp_id={element["EMP_ID"]} emp_name={element["NAME"]} key={k}/>
          </Link>)

        })    ) : (
          <h1 >
            Table loading ...
        </h1>
      )}
     </div>

    </Center>
  )
  }
}
export default Splash;
