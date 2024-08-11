import { useNavigate } from "react-router-dom";
import UseSignIn from "../hooks/useSignIn";
import { useState } from "react";


export default function Login() {
  let [email,setEmail] = useState('');
  let [password, setPassword] = useState('');
  let navigate = useNavigate()
  
  let {error, loading, signIn} = UseSignIn()
  let login = async(e) => {
    e.preventDefault();

    
      let user = await signIn(email, password);
      if(user){
        navigate('/')
      }
      
      console.log(user);
      console.log(error)
      
    

   

  }
    return (
  <div className="w-full max-w-lg mx-auto mt-16">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={login}>
      <h1 className="text-2xl font-bold text-primary my-5">Login Form</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Email
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={password} onChange={e=>setPassword(e.target.value)}/>
        {error &&  <p className="text-red-500 text-xs italic">{error}</p> }
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center" type="submit" >
        {loading &&  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>}
          Login
        </button>
        {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          Forgot Password?
        </a> */}
      </div>
    </form>
    <p className="text-center text-gray-500 text-xs">
      &copy;2020 Acme Corp. All rights reserved.
    </p>
  </div>
    )
  }
  
