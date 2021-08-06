import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./userType";
import axios from "axios";
const usersUrl = "http://localhost:9000";
export const fetchUser = (user) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .get("http://localhost:9000/hook/" + user)
      .then((response) => {
        const user = response.data;
        dispatch(fetchUserSuccess(user));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error));
      });
  };
};
export const fetchSearchedUser = (searchTerm, offset) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .get(
        "http://localhost:9000/hook/users/search/" +
          searchTerm +
          "/?offset=" +
          offset
      )
      .then((response) => {
        const user = response.data;
        dispatch(fetchUserSuccess(user.slice, user.totalPages));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error));
      });
  };
};

export const fetchAllUsers = (offset, limit) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .get(
        "http://localhost:9000/hook/user/?offset=" + offset + "&limit=" + limit
      )
      .then((response) => {
        const user = response.data;
        dispatch(fetchUserSuccess(user.slice, user.page));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error));
      });
  };
};
export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .get(`${usersUrl}/hook/users`)
      .then((response) => {
        const user = response.data;
        dispatch(fetchUserSuccess(user));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error));
      });
  };
};

export const insertUsers = (user) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .post("http://localhost:9000/hook", user)
      .then((response) => {
        const users = response.data;

        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        // alert(error.response.data);

        dispatch(fetchUserFailure(error.response));
      });
  };
};
export const updateUsers = (id, user) => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    try {
      const response = await axios.put(
        "http://localhost:9000/hook/" + id,
        user
      );
      const updatedData = response.data;
      dispatch(fetchUserSuccess(updatedData));
    } catch (error) {
      dispatch(fetchUserFailure(error));
    }
  };
};

export const deleteUsers = (id) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .delete(`${usersUrl}/hook/${id}`)

      .then((response) => {
        const users = response.data;
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.message));
      });
  };
};
export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (users, pages) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
    totalPage: pages,
  };
};
export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};
