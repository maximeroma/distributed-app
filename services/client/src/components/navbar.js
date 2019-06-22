import React, {Fragment, useState} from "react"
import {Link} from "@reach/router"
import {useAuth} from "hooks/auth"

const Navbar = ({children}) => {
  const [isActive, setIsActive] = useState(false)
  const {data} = useAuth()

  const navTgl = ["nav-toggle", "navbar-burger", isActive ? "is-active" : ""]
    .filter(Boolean)
    .join(" ")

  const navMenu = ["navbar-menu", isActive ? "is-active" : ""]
    .filter(Boolean)
    .join(" ")

  return (
    <Fragment>
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation"
      >
        <section className="container">
          <div className="navbar-brand">
            <strong className="navbar-item">Distributed app</strong>
            <span
              className={navTgl}
              data-testid="burger-btn"
              onClick={() => setIsActive(isActive => !isActive)}
            >
              <span />
              <span />
              <span />
            </span>
          </div>
          <div className={navMenu}>
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Home
              </Link>
              <Link to="/about" className="navbar-item">
                About
              </Link>
              {data && (
                <Link to="/status" className="navbar-item">
                  User Status
                </Link>
              )}
            </div>
            <div className="navbar-end">
              {data ? (
                <Link to="/logout" className="navbar-item">
                  Log out
                </Link>
              ) : (
                <Fragment>
                  <Link to="/register" className="navbar-item">
                    Register
                  </Link>
                  <Link to="/login" className="navbar-item">
                    Log In
                  </Link>
                </Fragment>
              )}
            </div>
          </div>
        </section>
      </nav>
      {children}
    </Fragment>
  )
}

export default Navbar
