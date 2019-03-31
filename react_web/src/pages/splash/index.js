import React from "react";
import { Link, Center, Button } from "../../components";
import { Frame, Words } from "@arwes/arwes";


const Splash = () => {
  return (
    <Center>
      <h1 >
        Complete Employee List
      </h1>
        

      <div className="emp_list"
      style={{ padding: 20 , width: "100%"}}>
        <Frame animate level={1} corners={3}>
          
          <div style={{ padding: '8px 8px', fontSize: '22px' }}>
          <h1 style={{margin: "0 0 -1px"}}>
            Employee no : 007
          </h1>

            James Bond
          
          </div>
        </Frame>
        </div>

        <div className="emp_list"
      style={{ padding: 20 , width: "100%"}}>
        <Frame animate level={1} corners={3}>
          
          <div style={{ padding: '8px 8px', fontSize: '22px' }}>
          <h1 style={{margin: "0 0 -1px"}}>
            Employee no : 007
          </h1>

            James Bond
          
          </div>
        </Frame>
        </div>
      



    </Center>
  );
};
export default Splash;
