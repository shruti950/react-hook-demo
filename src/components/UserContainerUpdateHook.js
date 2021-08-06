import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser, updateUsers } from "../redux";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import HeaderUser from "./HeaderUser";
function UserContainerUpdateHook({ userData, fetchUser, updateUsers }) {
  const [user, setUser] = useState({ name: "", age: "", email: "" });
  const { id } = useParams();
  let history = useHistory();
  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    fetchUser(id);
  }, []);

  const onChangeName = (e) => {
    const name = e.target.value;
    setUser({ ...user, name: name });
  };
  const onChangeAge = (e) => {
    const age = e.target.value;
    if (e.target.value <= 17) {
      setError("age", {
        type: "manual",
        message: "Age must be 18+! ",
      });
    } else {
      setError("age", {
        type: "manual",
        message: " ",
      });
    }
    setUser({ ...user, age: age });
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    var re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (re.test(email) === false) {
      setError("email", {
        type: "manual",
        message: "Email must be valid! ",
      });
      console.log(errors);
    } else {
      setError("email", {
        type: "manual",
        message: "",
      });
    }
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
      if (!user.email) {
        user.email = userData[0].email;
      }
      var validEmailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

      if (validEmailRegex.test(user.email) === false || user.age <= 17) {
        e.preventDefault();
        if (validEmailRegex.test(user.email) === false) {
          alert("Email is not valid");
        }
        if (user.age <= 17) {
          alert("Age is must be 18+!");
        }
        history.push(`/updateuser/${user._id}`);
        return;
      } else {
        updateUsers(id, user);
        history.push("/home");
        return;
      }
    } else {
      if (validEmailRegex.test(user.email) === false || user.age <= 17) {
        e.preventDefault();
        if (validEmailRegex.test(user.email) === false) {
          alert("Email is not valid");
        }
        if (user.age <= 17) {
          alert("Age is must be 18+!");
        }
        history.push(`/updateuser/${user._id}`);
        return;
      } else {
        updateUsers(id, user);
        history.push("/home");
        return;
      }
    }
  };
  return (
    <div className="container ">
      <HeaderUser />
      {userData.map((getuser) => {
        return (
          <div key={getuser._id}>
            <form onSubmit={(event) => handleSubmit(editUserDetails(event))}>
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
                  type="number"
                  name="age"
                  className="form-control"
                  defaultValue={getuser.age}
                  onChange={onChangeAge}
                />
                {errors.age && (
                  <p className=" small font-weight-bold text-danger ">
                    {errors.age.message}
                  </p>
                )}
              </div>
              <div className="form-group text-left">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  defaultValue={getuser.email}
                  onChange={onChangeEmail}
                />
                {errors.email && (
                  <p className=" small font-weight-bold text-danger ">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="form-group text-left">
                <button className="btn btn-primary" type="submit">
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
