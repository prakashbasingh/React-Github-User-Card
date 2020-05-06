import React from 'react'
import axios from "axios";

import UserCard from './UserCard'


export default class App extends React.Component {
  state = {
    userText: '',
    users: []
  }

  componentDidMount() {
    axios
      .get("https://api.github.com/users/prakashbasingh")
      .then(res => {
        console.log(res.data)
        this.setState({ users: res.data});
      })
      .catch(err => console.log(err));
  }

  handleChanges = e => {
    this.setState({
      userText: e.target.value
    });
  };
  
  findUsers = e => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.userText}`)
      .then(res => {
        this.setState({ users: res.data});
      })
      .catch(err => console.log(err));
  };
  
  render() {
    // console.log('rendering');
    return (
      <div className="App" style = {{textAlign: 'center'}}>
        <h1>Github User</h1>
        <input
          type="text"
          value={this.state.userText}
          onChange={this.handleChanges}
        />
        <button onClick={this.findUsers}>Find Users</button>
        <div className="users" >
          <img src={this.state.users.avatar_url} alt='user picture'/>
          <h3>Name: {this.state.users.name}</h3>
          <p>Username: {this.state.users.login}</p>
          <p>Follower: {this.state.users.followers}</p>         
        
          {/* {this.state.users.map(user => (
            <UserCard users={this.state.users}/>
          ))} */}
        </div>
      </div>
    );
  }

}
