import React, { useState, useEffect } from "react";
import axios from "axios";

const UserDetailsModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className="text-3xl font-bold mb-2">User Details</h2>
            <div className="mt-3 text-center text-2xl sm:mt-0 sm:ml-4 sm:text-left">
              <p>ID: {user._id}</p>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.surname}</p>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Phone Number: {user.phoneNumber}</p>
              <p>Created At: {user.createdAt}</p>
            </div>
            <button
              onClick={onClose}
              className="inline-flex justify-center px-4 py-2 text-xl font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-2">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Users component

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredUsers = users.filter((user) => {
    const firstNameMatch = user.firstName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const surnameMatch = user.surname
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const usernameMatch = user.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const emailMatch = user.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const phoneNumberMatch =
      user.phoneNumber && user.phoneNumber.toString().includes(searchTerm);
    const idMatch = user._id && user._id.toString().includes(searchTerm);
    const createdAtMatch =
      user.createdAt && user.createdAt.toString().includes(searchTerm);

    return (
      firstNameMatch ||
      surnameMatch ||
      usernameMatch ||
      emailMatch ||
      phoneNumberMatch ||
      idMatch ||
      createdAtMatch
    );
  });

  const openDetailsModal = (user) => {
    setSelectedUser(user);
  };

  const closeDetailsModal = () => {
    setSelectedUser(null);
  };

  return (
    <div
      className="users-container p-4 flex flex-col"
      style={{ backgroundImage: "linear-gradient(115deg, #A7F442, #60E7A6)",
      height: "80vh",
     }}
    >
      <h2 className="text-4xl font-bold mb-4 text-center m-12">
        User Management Dashboard
      </h2>

      <div className="flex-grow">
        <div className="user-details mb-4 text-3xl text-center">
          <p>Details about the user can go here.</p>
        </div>

        <div className="mb-4 mt-10 text-2xl text-center self-end mr-4">
          <input
            type="text"
            placeholder="Search for a user"
            className="p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-y-auto max-h-96">
          <table className="user-table max-w-18xl border bg-white shadow-md mx-auto mt-10">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-3xl">ID</th>
                <th className="border p-2 text-3xl">First Name</th>
                <th className="border p-2 text-3xl">Last Name</th>
                <th className="border p-2 text-3xl">Username</th>
                <th className="border p-2 text-3xl">Email</th>
                <th className="border p-2 text-3xl">Phone Number</th>
                <th className="border p-2 text-3xl">Created At</th>
                <th className="border p-2 text-3xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="border p-2 text-2xl">{user._id}</td>
                  <td className="border p-2 text-2xl">{user.firstName}</td>
                  <td className="border p-2 text-2xl">{user.surname}</td>
                  <td className="border p-2 text-2xl">{user.username}</td>
                  <td className="border p-2 text-2xl">{user.email}</td>
                  <td className="border p-2 text-2xl">{user.phoneNumber}</td>
                  <td className="border p-2 text-2xl">{user.createdAt}</td>
                  <td className="border p-2 text-2xl">
                    <button
                      onClick={() => openDetailsModal(user)}
                      className="text-blue-500 hover:underline focus:outline-none"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={closeDetailsModal} />
      )}
    </div>
  );
}

export default Users;
