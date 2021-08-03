import React from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
function HeaderUser(props) {
  let history = useHistory();
  const toHome = () => {
    history.push("/home");
  };
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark  ">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link text-left" href="http://localhost:3000/home">
            / Home
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderUser;
