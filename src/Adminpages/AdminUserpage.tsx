import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../AdminLayout/AdminLayout";
import { Trash } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
}

const AdminUserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  // Delete User
  const handleDelete = async (id: string) => {
    toast.info(
      <div className="flex flex-col">
        <span>Are you sure you want to delete this user?</span>
        <div className="mt-2 flex gap-2 justify-end">
          <button
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={async () => {
              try {
                await axios.delete(`http://localhost:5000/users/${id}`);
                setUsers(users.filter((u) => u.id !== id));
                toast.dismiss();
                toast.success("User deleted successfully");
              } catch (err) {
                console.error(err);
                toast.error("Failed to delete user");
              }
            }}
          >
            Delete
          </button>
          <button
            className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, draggable: false }
    );
  };

  // Start editing
  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      password: user.password,
    });
  };

  // Save edit
  const handleEditSave = async () => {
    if (!editingUser) return;
    try {
      const updatedUser = { ...editingUser, ...formData };
      await axios.put(
        `http://localhost:5000/users/${editingUser.id}`,
        updatedUser
      );

      setUsers(users.map((u) => (u.id === editingUser.id ? updatedUser : u)));
      setEditingUser(null);
      toast.success("User updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user");
    }
  };

  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="p-6 bg-secondaray min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Registered Users</h1>

        {users.length === 0 ? (
          <p className="text-gray-600">No users registered yet.</p>
        ) : (
          <div className="bg-secondaray shadow-md rounded-lg border-1 border-black overflow-hidden">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-secondaray">
                <tr>
                  <th className="p-4 border-b font-medium text-gray-700">#</th>
                  <th className="p-4 border-b font-medium text-gray-700">
                    Full Name
                  </th>
                  <th className="p-4 border-b font-medium text-gray-700">
                    Email
                  </th>
                  <th className="p-4 border-b font-medium text-gray-700">
                    Password
                  </th>
                  <th className="p-4 border-b font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <React.Fragment key={user.id}>
                    {editingUser?.id === user.id ? (
                      // Inline Edit Row
                      <tr className="bg-white">
                        <td className="p-4 border-b">{index + 1}</td>
                        <td className="p-4 border-b">
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                fullName: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded"
                          />
                        </td>
                        <td className="p-4 border-b">
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded"
                          />
                        </td>
                        <td className="p-4 border-b">
                          <input
                            type="text"
                            value={formData.password}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
                          />
                        </td>
                        <td className="p-4 border-b flex gap-2">
                          <button
                            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={() => setEditingUser(null)}
                          >
                            Cancel
                          </button>
                          <button
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={handleEditSave}
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                    ) : (
                      // Normal Row
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 border-b">{index + 1}</td>
                        <td className="p-4 border-b">{user.fullName}</td>
                        <td className="p-4 border-b">{user.email}</td>
                        <td className="p-4 border-b">{user.password}</td>
                        <td className="p-4 border-b flex gap-3">
                          <button
                            className="px-3 py-1 bg-primary text-white rounded hover:bg-[#5c1621] transition"
                            onClick={() => handleEditClick(user)}
                          >
                            Edit this
                          </button>
                          <Trash
                            className="cursor-pointer text-red-600 hover:text-red-800 transition"
                            size={20}
                            onClick={() => handleDelete(user.id)}
                          />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUserPage;
