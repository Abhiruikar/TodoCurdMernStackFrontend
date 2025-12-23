import React from 'react'
import { Link } from 'react-router-dom'
import { MdDelete, MdEdit } from "react-icons/md";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const User = () => {
    const [users, setUsers] = useState([])

    const featchData = async () => {
        const res = await axios.get('http://localhost:5000/api/getall')
        setUsers(res.data)
    }
   useEffect(() => {
   featchData();

    }, []);

    const deleteData = async (userId) => {

        await axios.delete(`http://localhost:5000/api/deleteuser/${userId}`)
            .then((res) => {
                console.log(res)
                toast.success(res.data.message, { position: 'top-right' })

                setUsers(users.filter((user) => user._id !== userId))
            }).catch(err => console.log(err))

    }
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 h-2/3 ">

                {/* Add Button */}
                <div className="flex justify-end mb-4">
                    <Link
                        to="/add"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        + Add User
                    </Link>
                </div>

                {/* Table */}
                <table className="border border-gray-300 border-collapse w-full text-center">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">S.No</th>
                            <th className="border border-gray-300 px-4 py-2">User Name</th>
                            <th className="border border-gray-300 px-4 py-2">User Last Name </th>
                            <th className="border border-gray-300 px-4 py-2">User Email</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr className="hover:bg-gray-100" key={user._id}>
                                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.fname}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.lname}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <div className="flex justify-center gap-3">


                                            <button onClick={() => deleteData(user._id)} className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition">
                                                <MdDelete size={20} />
                                            </button>


                                            <Link
                                                to={`/edit/${user._id}`}
                                                className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200 transition"
                                            >
                                                <MdEdit size={20} />
                                            </Link>

                                        </div>
                                    </td>
                                </tr>

                            ))
                        }

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default User
