import './LoginPage.css'
import {useState} from "react";

export const LoginPage = ({ onLogin, onSwitchToSignup }) => {
    const [email,  setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        onLogin({email,password})
    }

    return (
        <div className="login-container">
            <div className='box'>
                <span className='borderline'></span>
                <form onSubmit={handleSubmit}>
                    <h2>Sign in</h2>
                    <div className='inputBox'>
                        <input type="email"
                               required={true}
                               value={email}
                               onChange={(e)=>{setEmail(e.target.value)}}
                        />
                        <span>Email</span>
                        <i></i>
                    </div>
                    <div className='inputBox'>
                        <input type="password"
                               required={true}
                               value={password}
                               onChange={(e)=>{setPassword(e.target.value)}}
                        />
                        <span>Password</span>
                        <i></i>
                    </div>
                    <div className='links'>
                        <a href="#" >Forgot Password</a>
                        <p>| Don't have an account?</p>
                        <a href="#" onClick={onSwitchToSignup}>Sign Up</a>
                    </div>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        </div>
    )
}