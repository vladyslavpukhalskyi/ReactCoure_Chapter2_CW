/* 
  Implement a button which makes a get request to https://reqres.in/ to get a list of users and display them.
  100% free reign to accomplish this goal however you wish, within the context of react.

  apiMethods.js file has already been stubbed out for you. Feel free to use it or not.

  ****Make any changes to this boilerplate that you want to.*****
  ****The included code is only provided as a convienence.****

  Bonus 1:  Add a button for each user to make a delete request to delete that user. 
          Update the displayed users excluding the deleted user.

  Bonus 2: Make a filter box to filter the displayed users by name.
*/

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { getUsers, deleteUser } from "./apiMethods";

import "./styles.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    const usersData = await getUsers();
    setUsers(usersData);
    setLoading(false);
  };

  const handleDeleteUser = async (id) => {
    const deletedUserId = await deleteUser(id);
    if (deletedUserId) {
      setUsers(users.filter((user) => user.id !== deletedUserId));
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h2>Users from API:</h2>
      <button onClick={fetchUsers}>Get Users</button>
      {loading && <p>Loading...</p>}

      <div className="filter-box">
        <input
          type="text"
          placeholder="Search by first or last name"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div>
        {filteredUsers.length === 0 && !loading ? (
          <p>Users not found</p>
        ) : (
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.id}>
                {user.first_name} {user.last_name}{" "}
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
