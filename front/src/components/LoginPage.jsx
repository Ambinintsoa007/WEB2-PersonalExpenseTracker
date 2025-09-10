import '../App.css'
    ''
export const LoginPage = () => {
    return (
        <>
            <div className='box'>
                <span className='borderline'></span>
                <form>
                    <h2>Sign in</h2>
                    <div className='inputBox'>
                        <input type="email" required={true}/>
                        <span>Email</span>
                        <i></i>
                    </div>
                    <div className='inputBox'>
                        <input type="text" required={true}/>
                        <span>Password</span>
                        <i></i>
                    </div>
                    <div className='links'>
                        <a href="#" >Forgot Password</a>
                        <p>| Don't have an account?</p>
                        <a href="#" onClick={() => setIsSigningIn(!isSigningIn)}>Sign Up</a>
                    </div>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        </>
    )
}