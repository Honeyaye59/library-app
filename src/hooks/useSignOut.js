import { useState } from "react"
import {  signInWithEmailAndPassword, signOut } from "firebase/auth";
import {auth} from '../firebase/Firebase'
import { useNavigate } from "react-router-dom";

export default function UseSignOut() {

    let [error, setError ] = useState(null);
    let [loading, setLoading] = useState(false);
    let navigate = useNavigate()

    const logOut = async() => {
        try {
            setLoading(true)
            let res = await signOut(auth)
            setError('')
            setLoading(false)
        console.log(res.user);
        navigate('/')
        return res.user;
        } catch (e) {
            setLoading(false)
            setError(e.message);
        }
        
    }

    return {error, loading, logOut}
  
}

