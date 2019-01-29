import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import { getUsers } from "./services/users"

class App extends Component {
  static defaultProps = { getUsers }

  state = { users: [] }

  componentDidMount() {
    getUsers()
      .then(users => this.setState({ users: users.data.data.users }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <br />
              <div className="title is-1 is-1">All Users</div>
              {this.state.users.map(user => {
                return (
                  <h4 key={user.id} className="box title is-4">
                    {user.username}
                  </h4>
                )
              })}
              <hr />
              <br />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default App
