import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser, updateUsers } from "../redux";
import { useParams, useHistory, withRouter } from "react-router-dom";
import HeaderUser from "./HeaderUser";
function UserContainerUpdateHook({ userData, fetchUser, updateUsers }, props) {
  const [user, setUser] = useState({ name: "", age: "", email: "" });
  const [users, setUsers] = useState([]);
  const { name, age, email } = user;
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    fetchUser(id);
    setUsers(userData);
  }, []);
  useEffect(() => {
    setUsers(userData);
  }, [userData]);

  const onChangeName = (e) => {
    const name = e.target.value;
    setUser({ ...user, name: name });
  };
  const onChangeAge = (e) => {
    const age = e.target.value;
    setUser({ ...user, age: age });
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setUser({ ...user, email: email });
  };

  const editUserDetails = (e) => {
    if (!user.name || !user.age || !user.email) {
      if (!user.name) {
        user.name = userData[0].name;
      }
      if (!user.age) {
        user.age = userData[0].age;
      }
      if (!email) {
        user.email = userData[0].email;
        updateUsers(id, user);
        history.push("/home");
        return;
      }
    } else {
      updateUsers(id, user);
      history.push("/home");
      return;
    }
  };
  return (
    <div className="container ">
      <HeaderUser />
      {users.map((getuser) => {
        return (
          <div key={getuser._id}>
            <form onSubmit={() => editUserDetails()}>
              <div className="form-group text-left">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  defaultValue={getuser.name}
                  onChange={onChangeName}
                />
              </div>
              <div className="form-group text-left">
                <label>Age:</label>
                <input
                  type="text"
                  name="age"
                  className="form-control"
                  defaultValue={getuser.age}
                  onChange={onChangeAge}
                />
              </div>
              <div className="form-group text-left">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  defaultValue={getuser.email}
                  onChange={onChangeEmail}
                />
              </div>
              <div className="form-group text-left">
                <button
                  className="btn btn-primary"
                  onClick={() => editUserDetails}
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.users,
    loadingData: state.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    updateUsers: (id, user) => dispatch(updateUsers(id, user)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainerUpdateHook);
