import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Add = () => {

    const navigate=useNavigate()


    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    })




    const inputHandle=(e)=>{
        const{name,value}=e.target;
        setUser({...user,[name]:value})

        console.log(user)

    };

    const handleSubmit= async(e)=>{
        e.preventDefault();

        await axios.post('https://todocurdmernstackbackend.onrender.com/api/create',user)
        .then((res)=>{
           toast.success(res.data.message,{position:'top-right'});

           navigate('/')
            console.log(res)

        }).catch(err=>console.log(err))

    }




    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 h-2/3 justify-between">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold  border p-2 rounded w-30 bg-gray-5 00 text-center">Add User</h2>
                    <Link className="text-blue-700 font-bold hover:underline border p-2 rounded w-24 text-center" to="/">
                        Back
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Frist Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded" name='fname'
                            placeholder="Enter first name" onChange={inputHandle}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Last Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded" name='lname'
                            placeholder="Enter last name" onChange={inputHandle}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2"> Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded" name='email'
                            placeholder="Enter Your email" onChange={inputHandle}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Enter Your Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded" name='password'
                            placeholder="Enter Your password" onChange={inputHandle}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        Add User
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Add
