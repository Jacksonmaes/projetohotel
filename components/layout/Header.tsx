"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Header: React.FC = () => {

  const { data } = useSession();

console.log
    return (
        <nav className="navbar sticky-top py-2">
        <div className="container">
          <div className="col-6 col-lg-3 p-0">
            <div className="navbar-brand">
              <a href="/">
                <img
                  style={{cursor: "pointer"}}
                  src="/images/bookit_logo.png"
                  alt="BookIT"
                />
            
              </a>
            </div>
          </div>
  
          <div className="col-6 col-lg-3 mt-3 mt-md-0 text-end">
          
            <div className="ml-4 dropdown d-line">
              <button
                className="btn dropdown-toggle"
                type="button"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={data?.user?.avatar ? data?.user?.avatar.url : "/images/default_avatar.jpg"}
                    alt="John Doe"
                    className="rounded-circle placeholder-glow"
                    height="50"
                    width="50"
                  />
                </figure>
                <span className="placeholder-glow ps-1"> {data?.user?.name}</span>
              </button>
  
              <div
                className="dropdown-menu w-100"
                aria-labelledby="dropdownMenuButton1"
              >
                <a href="/admin/dashboard" 
                className="dropdown-item">Dashboard</a>
                <a href="/bookings/me" 
                className="dropdown-item">My Bookings</a>
                <a href="/me/update" 
                className="dropdown-item">Profile</a>
                <a href="/" 
                className="dropdown-item text-danger">Logout
                </a>
              </div>
             </div>
          
    
            <Link href= '/login' 
            className="btn btn-danger px-4 text-white login-header-btn float-right">
              Login
              </Link>
          
          </div>
        </div>
      </nav>
   );
}

export default Header
