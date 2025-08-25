import { useState } from 'react'
import './App.css'

function App() {
//---------------------------------------STYLE-------------------------------------------------
  const principalSectionStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap:  '2rem',
      boxShadow: '2px 4px 8px rgba(0,0,0,0.2)',
      backgroundColor: '#F7F7F7',
      borderRadius: '20px',
      margin: '4rem 33% 4rem 33%',
      paddingBlock: '2rem'
  }
  const loginPageButtonStyle = {
      borderRadius: '50px',
      border: '1px solid white',
      backgroundColor: '#fff',
      boxShadow: '2px 4px 8px rgba(0,0,0,0.2)',
      padding: '5px',
      margin: '10px',
      cursor: 'pointer',
      transition: '2s ease-in-out',
      hover: ''
  };
//---------------------------------STATE-------------------------------------------------

//--------------------------------------REQUEST------------------------------------------------------

//-----------------------------------------------------------------------------------------------
  const LoginPageBackButton = () => {
    return (
        <>
          <section>
            <button disabled style={loginPageButtonStyle}>
                <img src="/src/assets/reply-solid-full.svg" alt="" style={{width: '20px', height: '20px',margin: 'auto'}} />
            </button>
          </section>
        </>
    )
  }

  return (
    <>
        <section style={principalSectionStyle}>
            <div>
                <h1>Log in</h1>
                <p>Enter your email and password to securely access your account and manage yours services.</p>
            </div>
            <div>
                <input type="text" placeholder='    Email'/>
                <input type="text" placeholder='    Password' />
                <button disabled>forgot password</button>
            </div>
            <button disabled>Login</button>
            <div>
                <p>Don't have an account?</p>
                <button disabled>sign up here</button>
            </div>
        </section>
    </>
  )
}

export default App