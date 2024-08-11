import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase/Firebase'
import { useNavigate } from "react-router-dom";

export default function UseRegister() {

    let [error, setError ] = useState(null);
    let [loading, setLoading] = useState(false);
    let navigate = useNavigate()

    const signUp = async(email, password) => {
        try {
            setLoading(true)
            let res = await createUserWithEmailAndPassword(auth, email, password)
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

    return {error, loading, signUp}
  
}
