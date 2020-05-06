import React from 'react'
import axios from "axios";

import FollowersCard from './FollowersCard'

export default class App extends React.Component {
  state = {
    userText: '',
    users: [],
    followers: [],
    display: false
  }

  componentDidMount() {
    axios
      .get("https://api.github.com/users/prakashbasingh")
      .then(res => {
        console.log(res.data,'Are we getting User Data??????')
        this.setState({ users: [res.data]});
      })
      .catch(err => console.log(err));

    axios
    .get("https://api.github.com/users/prakashbasingh/followers")
    .then(res => {
      console.log(res, 'Followers data?????????????')
      this.setState({followers: [res.data]});
    })
    .catch(err => console.log(err))
  }


  handleChanges = e => {
    this.setState({
      userText: e.target.value
    });
  };


  submitForm = e => {
    e.preventDefault()
    this.props.addTask(this.state.userText);
    this.setState({
      userText: ''
    });
}
  
  findUsers = e => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.userText}`)
      .then(res => {
        console.log(res.data,'finding users  data!!!!!!?????')
        this.setState({ users: res.data});
      })
      .catch(err => console.log(err));

      axios
      .get(`https://api.github.com/users/${this.state.userText}/followers`)
      .then(res => {
        console.log(res.data,'finding users followers data!!!!!!?????')
        this.setState({ followers: res.data});
      })
      .catch(err => console.log(err));
  };
 
  toggleFollowers = e => {
    e.preventDefault();
    this.setState({
      display: !this.state.display
    })
  }

  
  render() {
    // console.log('rendering');
    return (
      <form onSubmit={this.submitForm}>
        <div className="App" style = {{textAlign: 'center', border: '2px solid black', margin: '5rem', backgroundColor: 'lightgray'}}>
            <div>
              <h1>Github User </h1>
              <input 
                type="text"
                value={this.state.userText}
                onChange={this.handleChanges}
              />
              <button onClick={this.findUsers}>Find Users</button>
            </div>
          <div className="users" style = {{margin: '1rem', border: '1px solid black', borderRadius: '2rem'}}>
            <img src={this.state.users.avatar_url} alt='user picture'/>
            <h3>Name: {this.state.users.name}</h3>
            <p>Username: {this.state.users.login}</p>
            <p>Follower: {this.state.users.followers}</p>
          </div>
          <div > 
            <FollowersCard toggleFollowers = {this.toggleFollowers}
                         display={this.state.display}
                         followers={this.state.followers} />
          </div>     
        </div>
      </form>
    );
  }

}
