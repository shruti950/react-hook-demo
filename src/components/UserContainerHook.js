import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { deleteUsers, fetchSearchedUser, fetchAllUsers } from "../redux";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { useStateCallback } from "use-state-callback";
import ReactPaginate from "react-paginate";
const UserContainerHook = (
  { fetchAllUsers, userData, totalPage, fetchSearchedUser, deleteUsers },
  props
) => {
  const [users, setUsers] = useState(userData);
  const [offset, setOffset] = useStateCallback(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    loadPage();
  }, []);
  useEffect(() => {
    setUsers(userData);
  }, [userData]);
  useEffect(() => {
    setOffset(offset);
  }, [offset]);
  useEffect(() => {
    setPageCount(totalPage);
  }, [totalPage]);
  // useEffect(() => {}, [offset]);
  const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevUserData = usePrevious(userData);
  const prevTotalPage = usePrevious(totalPage);

  const loadPage = () => {
    fetchAllUsers(offset, perPage);

    if (prevUserData !== userData || prevTotalPage !== totalPage) {
      setUsers(userData);
      setPageCount(totalPage);
    }
  };

  const searchPage = (searchTerm, selectedPage) => {
    fetchSearchedUser(searchTerm, selectedPage);
    setUsers(userData);
    setPageCount(totalPage);
  };

  const deleteUserData = async (id, name, page) => {
    console.log(
      "%c 🇦🇬: deleteUserData -> page ",
      "font-size:16px;background-color:#875f40;color:white;",
      page
    );
    if (window.confirm(`Are you sure you want to Delete ${name}?`)) {
      await deleteUsers(id);
    } else {
      history.push("/home");
    }
    console.log(
      "%c 🍽️: users.length ",
      "font-size:16px;background-color:#c9273a;color:white;",
      users.length
    );
    if (userData.length === 1) {
      // fetchAllUsers(offset - 1, perPage);
      // setOffset(offset - 1);
      fetchAllUsers(1, perPage);
      setOffset(1);
    } else {
      fetchAllUsers(offset, perPage);
    }
  };
  // const setOffsetData()
  const handlePageClick = (e) => {
    const selectedPage = e.selected;

    if (searchTerm === "") {
      const page = selectedPage + 1;
      setOffset(page);
      fetchAllUsers(page, perPage);
      setUsers(userData);
      setPageCount(totalPage);
    } else {
      const page = selectedPage + 1;
      searchPage(searchTerm, page);
    }
  };
  const addUser = async () => {
    history.push("/adduser");
    // fetchAllUsers(offset, perPage);
  };
  const editUserData = async (id) => {
    history.push(`/updateuser/${id}`);
    // fetchAllUsers(offset, perPage);
  };
  const onValueChange = (e) => {
    const searchTerm = e.currentTarget.value;
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      loadPage();
    } else {
      searchPage(searchTerm, offset);
    }
  };

  return (
    <div>
      <Router>
        <h2>Users List</h2>
        <div className="container text-right">
          <Link to={{ pathname: `/adduser` }}>
            <button onClick={addUser} className="btn btn-primary btn-md m-1  ">
              ADD USER
            </button>
          </Link>
        </div>
        <div className="container mt-mb-10 text-left">
          <div className="w-100 mt-mb-10  justify-content-left ui icon input">
            <input
              type="search "
              placeholder="Search Users"
              className="mt-mb-7 form-control  "
              // v
              name="searchTerm"
              onChange={onValueChange}
            />
          </div>
        </div>
        <div className=" container ">
          <table className="table mt-5 table-striped justify-content-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-left">
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/updateuser/${user._id}`,
                      }}
                    >
                      <button
                        onClick={() => editUserData(user._id)}
                        className="btn btn-success btn-sm m-1  "
                      >
                        UPDATE
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        deleteUserData(user._id, user.name, offset);
                      }}
                      className="btn btn-danger btn-sm m-1 "
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {console.log("pageCount 11", pageCount, offset)}
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            // currentPage={offset - 1}
            forcePage={offset - 1}

            // 					pageCount={(userData?.count || 5) / pageSize}

            // previousLinkClassName={"pagination__link"}
            // nextLinkClassName={"pagination__link"}
            // disabledClassName={"pagination__link--disabled"}
            // activeClassName={"active"}
          />
        </div>
      </Router>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(
    "%c 👨‍👩‍👦: mapStateToProps -> state ",
    "font-size:16px;background-color:#327d18;color:white;",
    state
  );
  const { users, loading, page } = state;
  return {
    userData: users,
    loadingData: loading,
    totalPage: page,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: (offset, perPage) =>
      dispatch(fetchAllUsers(offset, perPage)),
    fetchSearchedUser: (searchTerm, offset) =>
      dispatch(fetchSearchedUser(searchTerm, offset)),
    deleteUsers: (id) => dispatch(deleteUsers(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserContainerHook);
