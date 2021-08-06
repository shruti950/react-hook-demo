import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { fetchUsers, insertUsers, fetchAllUsers } from "../redux";
import HeaderUser from "./HeaderUser";
import { useForm } from "react-hook-form";
import { useStateCallback } from "use-state-callback";

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
  const [user, setUser] = useStateCallback(initialState);
  const { name, age, email } = user;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  let history = useHistory();
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    if (Object.keys(errors).length === 0) {
    }
  }, [errors]);
  const onValueChange = (e) => {
    e.preventDefault();
    if (e.target.name === "age") {
      if (e.target.value <= 17) {
        setError("age", {
          type: "manual",
          message: "Age must be valid! ",
        });
      } else {
        setError("age", {
          type: "manual",
          message: " ",
        });
      }
    }
    if (e.target.name === "email") {
      var re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if (re.test(e.target.value) === false) {
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
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUser = async (e) => {
    if (!name || !age || !email) {
      e.preventDefault();
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
        var re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (re.test(user.email) === false || user.age <= 17) {
          if (re.test(user.email) === false) {
            alert("Email is not valid!");
          }
          if (user.age <= 17) {
            alert("Age is must be 18+!");
          }
          e.preventDefault();

          history.push("/adduser");
          return;
        } else {
          insertUsers(user);
          history.push("/home");
          fetchAllUsers();
          return;
        }
      }
      //
    }
  };

  return (
    <div className="container ">
      <HeaderUser />
      <form onSubmit={(event) => handleSubmit(addUser(event))}>
        <div className="form-group text-left">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            className="form-control"
            onChange={onValueChange}
          />
        </div>
        <div className="form-group text-left ">
          <label htmlFor="age" className="font-weight-bolder">
            Age:
          </label>
          <input
            type="number"
            {...register("age", { min: 18, max: 99, required: true })}
            name="age"
            value={age}
            className="form-control"
            onChange={onValueChange}
          />
          {errors.age && (
            <p className=" small font-weight-bold text-danger ">
              {errors.age.message}
            </p>
          )}
        </div>
        <div className="form-group text-left ">
          <label htmlFor="email" className="font-weight-bolder">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={email}
            className={` form-control`}
            onChange={onValueChange}
          />
          {errors.email && (
            <p className=" small font-weight-bold text-danger ">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="form-group text-left">
          <Link to={{ pathname: `/home` }}>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={(event) => handleSubmit(addUser(event))}
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
