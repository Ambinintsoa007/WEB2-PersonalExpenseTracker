import '../App.css'

export const  ForgotPasswordPage = () => {
    return (
        <>
            <div className='box'>
                <span className='borderline'></span>
                <form>
                    <h2>Reset Password</h2>
                    <div className='inputBox'>
                        <input type="email" required={true}/>
                        <span>Email</span>
                        <i></i>
                    </div>
                    <div className='links'>
                        <a href="#">Sign in</a>
                    </div>
                    <input type="submit" value="Continue"/>
                </form>
            </div>
        </>
    )
}