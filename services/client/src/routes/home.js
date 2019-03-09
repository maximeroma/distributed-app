import React, {Component} from "react"
import {getUsers, addUser} from "services/users"
import AddUser from "components/add-user"

import UsersList from "components/users-list"

class Home extends Component {
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
              <UsersList users={this.state.users} />
              <hr />
              <br />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Home
