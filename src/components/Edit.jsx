import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Edit = () => {


    const navigate=useNavigate()

    const {id}=useParams()
    const[user,setUser]=useState({
        fname: "",
        lname: "",
        email: ""
    })

    const handleInput=(e)=>{

        const{name,value}=e.target;
        setUser({...user,[name]:value})

        
    }
    console.log(user)

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/getone/${id}`).then((res)=>{

            setUser(res.data.user)
            toast.success(res.data.message)
            // console.log(res.data)

        }).catch(err=>console.log(err))
    },[id]);


    const handleSubmit=async(e)=>{
          e.preventDefault();

        await axios.put(`http://localhost:5000/api/updateuser/${id}`,user)
        .then((res)=>{

            setUser(res.data.updateduser)
           toast.success(res.data.message,{position:'top-right'});

           navigate('/')
            console.log(res)

        }).catch(err=>console.log(err))

    }

   


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-xl">

        <h2 className="text-xl font-bold mb-6 text-center">
          Edit User
        </h2>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              First Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter first name" onChange={handleInput} name='fname' value={user.fname || ''}
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">
              Last Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter last name" onChange={handleInput} name='lname' value={user.lname || ''}
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email" onChange={handleInput} name='email' value={user.email || ''}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              Update User
            </button>

            <Link
              to="/"
              className="bg-gray-700 text-white px-5 py-2 rounded hover:bg-blue-500 transition"
            >
              Cancel
            </Link>
          </div> 
        </form>

      </div>
    </div>
  )
}

export default Edit
