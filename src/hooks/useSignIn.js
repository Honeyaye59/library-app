import { useState } from "react"
import {  signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase/Firebase'
import { useNavigate } from "react-router-dom";

export default function UseSignIn() {

    let [error, setError ] = useState(null);
    let [loading, setLoading] = useState(false);
    let navigate = useNavigate()

    const signIn = async(email, password) => {
        try {
            setLoading(true)
            let res = await signInWithEmailAndPassword(auth, email, password)
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

    return {error, loading, signIn}
  
}

