import React, {Component} from "react"
import "./App.css"
import {getUsers, addUser} from "./services/users"
import AddUser from "./components/add-user"

class App extends Component {
  static defaultProps = {getUsers, addUser}

  state = {users: []}

  componentDidMount() {
    this.getUsers()
  }

  getUsers = () => {
    const {getUsers} = this.props
    getUsers()
      .then(users => this.setState({users: users.data.data.users}))
      .catch(err => console.log(err))
  }

  addUser = ({username = "", email = ""}) => {
    return addUser({username, email})
      .then(res => {
        this.getUsers()
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <br />
              <AddUser addUser={this.addUser} />
              <br />
              <div className="title is-1 is-1">All Users</div>
              {Array.isArray(this.state.users) &&
                this.state.users.map(user => {
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
