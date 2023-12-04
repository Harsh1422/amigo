import React from 'react'
import "./Navbar.css"
function Navbar() {
  return (
    <>
    <main className='Heading'>
        <div className="logo">
            <p>Logo</p>
        </div>
        <div className="logo">
            <p>Free GST Invoice Generator</p>
        </div>
        <div className="links">
            <a href="#" className='link'>Check out Zoho Invoice</a>
            <button className='button'>Sign up.It's Free!</button>
        </div>
    </main>
    </>
  )
}

export default Navbar