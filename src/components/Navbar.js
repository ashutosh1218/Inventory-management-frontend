import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { pink } from '@mui/material/colors';
import "./Navbar.css";
import styled from "@emotion/styled";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate=useNavigate();
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const handleLogout=()=>{
    localStorage.clear();
    navigate('/login');
  }
  const handleClick=()=>{
    navigate('/');
  }
  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo" onClick={handleClick}>
          <h2>
            <span>I</span>nvent
            <span>O</span>ry
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/add-product">Add Product</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          </ul>
        </div>
        <Container>
        <div className="logout">
        <button onClick={handleLogout}>
          <LogoutIcon sx={{ color: pink[500], fontSize: 40}} />
        </button>
        </div>
        </Container>

        {/* 3rd social media links */}
        
      </nav>

      {/* hero section  */}
      {/* <section className="hero-section">
        <p>Welcome to </p>
        <h1>Thapa Technical</h1>
      </section> */}
    </>
  );
};
const Container=styled.div`
  .logout{
    margin-top:20px;
    text-align:right;
  }
`
export default Navbar;