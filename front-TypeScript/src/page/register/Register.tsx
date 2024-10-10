import React, { useState } from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';

interface User {
    username: string
    email: string
    password: string
}

const Register = () => {
    const [username, setUsername] = useState<string>("")
    const [email, setEmil] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    

    const handlesubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if(!username || !email || !password){
            alert("Please fill all fields correctly.");
            return;
        }
        try {
            const response = await fetch("http://localhost:3030/api/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    email:email,
                    password:password
                }),   
            })
            console.log(response,'res');
            
            if (response.ok) {
                alert('User registered successfully!');
                setUsername('')
                setEmil('')
                setPassword('')
            } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="container">
        <Header />
        <div style={{width:'1000px',height:'100vh' , margin:'20px'}}>
            <div style={{width:'1000px', height:'400px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <div>
                    <h1>Register</h1>
                    <form onSubmit={handlesubmit}>
                        <div style={{display:'flex', flexDirection:'column',justifyContent:'space-around', width:'200px', height:'160px'}}>
                            <input style={{height:'26px', borderRadius:'8px',outline:'none',border:'none',padding:'0 8px'}} type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <input style={{height:'26px', borderRadius:'8px',outline:'none',border:'none',padding:'0 8px'}} type="text" placeholder='email' value={email} onChange={(e) => setEmil(e.target.value)}/>
                            <input style={{height:'26px', borderRadius:'8px',outline:'none',border:'none',padding:'0 8px'}} type="text" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <button style={{height:'26px', borderRadius:'8px',outline:'none',border:'none',background:'green'}} type='submit'>submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Register
