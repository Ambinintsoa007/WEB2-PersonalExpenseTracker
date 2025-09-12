import './SignUpPage.css'

export const SignUpPage = () => {
    return (
        <>
            <div className='boxUp'>
                <span className='borderline'></span>
                <form>
                    <h2>Sign up</h2>
                    <div className='inputBox'>
                        <input type="text" required={true}/>
                        <span>User Name</span>
                        <i></i>
                    </div>
                    <div className='inputBox'>
                        <input type="email" required={true}/>
                        <span>Email</span>
                        <i></i>
                    </div>
                    <div className='inputBox'>
                        <input type="password" required={true}/>
                        <span>Password</span>
                        <i></i>
                    </div>
                    <div className='inputBox'>
                        <input type="password" required={true}/>
                        <span>Confirm Password</span>
                        <i></i>
                    </div>
                    <div className='links'>
                        <p>Already have an account?</p>
                        <a href="#" onClick={() => setIsSigningIn(!isSigningIn)}>Sign in</a>
                    </div>
                    <input type="submit" value="Create Account"/>
                </form>
            </div>
        </>
    )
}