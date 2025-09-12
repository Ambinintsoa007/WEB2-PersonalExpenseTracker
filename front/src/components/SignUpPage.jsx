import './SignUpPage.css'
import {useState} from "react";

export const SignUpPage = ({ onSignup, onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password != confirmPassword){
            alert("Passwords doesn't match")
            return
        }
        onSignup({ username, email, password })
    }

    return (
        <div className="signup-container">
            <div className='boxUp'>
                <span className='borderline'></span>
                <form onSubmit={handleSubmit}>
                    <h2>Sign up</h2>
                    <div className='inputBox'>
                        <input
                            type="text"
                            required={true}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <span>User Name</span>
                        <i></i>
                    </div>
                    <div className='inputBox'>
                        <input
                            type="email"
                            required={true}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span>Email</span>
                        <i></i>
                    </div>
                    <div className='inputBox'>
                        <input
                            type="password"
                            required={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span>Password</span>
                        <i></i>
                    </div>
                    <div className='inputBox'>
                        <input
                            type="password"
                            required={true}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span>Confirm Password</span>
                        <i></i>
                    </div>
                    <div className='links'>
                        <p>Already have an account?</p>
                        <a href="#" onClick={onSwitchToLogin}>Sign in</a>
                    </div>
                    <input type="submit" value="Create Account"/>
                </form>
            </div>
        </div>
    )
}