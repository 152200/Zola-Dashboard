import "./Components/dashboard.css";
import "./Components/all.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
// import SideBar from "./Components/SideBar.js";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/user/show")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [users]);

  function deleteUser(id) {
    axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`);
  }
  const showUsers = users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <i
          onClick={() => deleteUser(user.id)}
          class="fa-sharp fa-solid fa-trash"
          style={{
            color: "red",
            paddingRight: "10px",
            fontSiae: "20px",
            cursor: "pointer",
          }}
        ></i>
        <Link to={`${user.id}`}>
          <i
            class="fa-solid fa-pen-to-square"
            style={{
              color: "blue",
              paddingRight: "10px",
              fontSiae: "20px",
              cursor: "pointer",
            }}
          ></i>
        </Link>
      </td>
    </tr>
  ));

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <table>
          <thead>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Action</th>
          </thead>
          <tbody>{showUsers}</tbody>
        </table>
      </div>
    </div>
  );
}
