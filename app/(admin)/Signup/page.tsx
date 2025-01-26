'use client'

import { useState } from "react"
import axios from 'axios';
import { useRouter } from "next/navigation";

export default function AdminSignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
          const response = await axios.post('/api/admin/signup', { email, password });
            if(response.status === 201){
                console.log("sign up successful");
                router.push('/Login');
            }
      };

    return (
        <>
        <h1>admin signup</h1>
            <form onSubmit={handleSubmit}>

                <input
                    type = "email"
                    placeholder="Email"
                    value  = {email}
                    onChange={(e) =>  setEmail(e.target.value)}
                />

                <input
                    type = 'password'
                    placeholder="password"
                    value = {password}
                    onChange={ (e) => setPassword(e.target.value)}

                />

                <button type = "submit">Sign up</button>

            </form>
        </>
    )
}
