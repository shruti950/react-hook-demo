import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { fetchUsers, insertUsers } from "../redux";
import HeaderUser from "./HeaderUser";
// import UserContainer from "./UserContainer";
const initialState = {
  name: "",
  age: "",
  email: "",
};
function UserContainerInsertHook({ userData, fetchUsers }) {
  const [user, setUser] = useState(initialState);
  const [users, setUsers] = useState([]);
  const { name, age, email } = user;
  // const { id } = useParams();
  let history = useHistory();
  useEffect(() => {
    fetchUsers();
    setUsers(userData);
  }, []);
  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUser = async (e) => {
    if (!name || !age || !email) {
      alert("Please add all the details");
    } else {
      fetchUsers();

      setUsers(userData);
      const existEmail = users.filter((existingEmail) => {
        if (email === existingEmail.email) {
          return true;
        }
      });
      const map = existEmail.map((item) => {
        if (item.email === email) {
          return true;
        } else {
          return false;
        }
      });
      if (map.includes(true)) {
        alert("Email already Exists");
      } else {
        await insertUsers(user);
        history.push("/home");
        history.push("/home");
      }
      //
    }
  };

  return (
    <div className="container ">
      <HeaderUser />
      <form>
        <div className="form-group text-left">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            className="form-control"
            onChange={onValueChange}
          />
        </div>
        <div className="form-group text-left ">
          <label className="font-weight-bolder">Age:</label>
          <input
            type="text"
            name="age"
            value={age}
            className="form-control"
            onChange={onValueChange}
          />
        </div>
        <div className="form-group text-left ">
          <label className="font-weight-bolder">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            className="form-control"
            onChange={onValueChange}
          />
        </div>
        <div className="form-group text-left">
          <Link to={{ pathname: `/home` }}>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => addUser()}
            >
              Submit
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userData: state.users,
  };
};

export default connect(mapStateToProps, { fetchUsers, insertUsers })(
  UserContainerInsertHook
);
