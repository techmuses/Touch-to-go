import React, { Component } from "react";

import { Input, Button, Navigator } from "../../components";

class Register extends Component {
  render() {
    return (
      <div style={{ maxWidth: "540px" }}>
       
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    // login(this.state.email);
                  }}
                >
                  <div>
                    <label>Employee id: </label>
                    <Input
                      type="email"
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label>Employee name: </label>
                    <Input type="text" />
                  </div>
                  
                  <div>
                    <Button type="submit">
                      {"Register"}
                    </Button>
                  </div>
                </form>
      </div>
    );
  }
}
export default Register;
