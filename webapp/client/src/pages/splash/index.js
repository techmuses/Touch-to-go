import React, { Component } from 'react';

import { Link, Center , Empid_name, DatePick } from "../../components";
import { Frame, Words } from "@arwes/arwes";




  class Splash extends Component {
    constructor(props) {
      super(props);
      this.state = { data: null };
  
      
    } 
  componentWillMount(){
    const url = "/attend_name_empid";

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({
        data: data,
      }))
  }

  render() {

    const {data} = this.state;
    return (
    <Center>
      <h1 >
        Complete Employee List on 
      </h1>

      <DatePick>

        </DatePick>

     <div className="emp_id_name_container"
     style={{  padding: 20 , width: "100%"}}>
     {data ? (
        data.map((element, k) => {
          return (<Empid_name emp_id={element["EMP_ID"]} emp_name={element["NAME"]} key={k}/>)

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
