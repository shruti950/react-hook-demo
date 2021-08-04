import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { fetchUsers, insertUsers, fetchAllUsers } from "../redux";
import HeaderUser from "./HeaderUser";
// import UserContainer from "./UserContainer";
const initialState = {
  name: "",
  age: "",
  email: "",
};
function UserContainerInsertHook({
  userData,
  fetchUsers,
  insertUsers,
  fetchAllUsers,
}) {
  const [user, setUser] = useState(initialState);
  const { name, age, email } = user;
  // const { id } = useParams();
  let history = useHistory();
  useEffect(() => {
    fetchUsers();
  }, []);
  const onValueChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUser = async (e) => {
    if (!name || !age || !email) {
      alert("Please add all the details");
      history.push("/adduser");
      return;
    } else {
      fetchUsers();
      const existEmail = userData.filter((existingEmail) => {
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
        e.preventDefault();
        alert("Email already Exists");
        history.push("/adduser");
        return;
      } else {
        insertUsers(user);
        history.push("/home");
        fetchAllUsers();
        return;
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
              onClick={(event) => addUser(event)}
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
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchAllUsers: () => dispatch(fetchAllUsers(1, 5)),
    insertUsers: (user) => dispatch(insertUsers(user)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainerInsertHook);
