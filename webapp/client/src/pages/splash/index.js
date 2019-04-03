import React, { Component } from 'react';

import { Link, Center , Empid_name, DatePick } from "../../components";
import { Frame, Words } from "@arwes/arwes";
import moment from "moment";


  

  class Splash extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        data: null ,
        dateVal: moment().format('YYYY-MM-DD')
      };
  
     
    } 

    dynamic_name_empid = (date) =>{
      const url = "/dynamic_name_empid";

      fetch(url, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      
        //make sure to serialize your JSON body
        body: JSON.stringify({
          date: date
        })
      })
        .then(response => response.json())
        .then(data => this.setState({
          data: data,
        }))
    }

  componentWillMount(){
   this.dynamic_name_empid(this.state.dateVal)
  }

  handleDateValChange = (DateVal) => {
    this.setState({dateVal: DateVal});
}

  render() {
    // console.log(this.state)
    const {data} = this.state;
    
    return (
    <Center>
      <h1 >
        Complete Employee List on 
      </h1>

      <DatePick onDateSelect = {this.handleDateValChange} netWorkCall = {this.dynamic_name_empid}/>
        

     <div className="emp_id_name_container"
     style={{  padding: 20 , width: "100%"}}>
     {data ? (
        data.map((element, k) => {
          return (
          <Link to={`detail/${element["EMP_ID"]}/${element["NAME"]}`} key={k}>
            <Empid_name emp_id={element["EMP_ID"]} emp_name={element["NAME"]} key={k}/>
          </Link>)

        })    ) : (
          <h1 >
            No Data on This Date
        </h1>
      )}
     </div>

    </Center>
  )
  }
}
export default Splash;
