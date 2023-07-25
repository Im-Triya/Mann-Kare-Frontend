import React from 'react'

function Main() {
    const handleLogout =()=>{
        localStorage.removeItem("token");
        window.location.reload();
    }
  return (
    <div>
        <nav>
            <h1>Mann Kare</h1>
            <button onClick={handleLogout}> Logout</button>
        </nav>
    </div>
  )
}

export default Main