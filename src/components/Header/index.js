import React, { useState,useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate=useNavigate();

  const storedUserDataJSON = localStorage.getItem("userData");
  const storedUserData = JSON.parse(storedUserDataJSON);
  console.log(storedUserData);


  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };


  const handleLogout = () => {
    localStorage.removeItem("userData");
    setProfileDropdownOpen(false); // Close the dropdown on logout
    navigate('/login',{replace:true});

  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="main-header side-header sticky">
      <div className="main-container container-fluid">
        <div className="main-header-left">
          <a className="main-header-menu-icon" href="javascript:void(0)" id="mainSidebarToggle">
            <span></span>
          </a>
          <div className="hor-logo">
            <a className="main-logo" href="index.html">
              <img src="../assets/img/brand/logo.png" className="header-brand-img desktop-logo" alt="logo" />
              <img src="../assets/img/brand/logo-light.png" className="header-brand-img desktop-logo-dark" alt="logo" />
            </a>
          </div>
        </div>
        <div className="main-header-center">
          <div className="responsive-logo">
            <a href="index.html"><img src="../assets/img/brand/logo.png" className="mobile-logo" alt="logo" /></a>
            <a href="index.html"><img src="../assets/img/brand/logo-light.png" className="mobile-logo-dark" alt="logo" /></a>
          </div>
         
        </div>
        <div className="main-header-right">
          <button
            className="navbar-toggler navresponsive-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent-4"
            aria-controls="navbarSupportedContent-4"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fe fe-more-vertical header-icons navbar-toggler-icon"></i>
          </button>
          {/* Navresponsive closed */}
          <div className="navbar navbar-expand-lg  nav nav-item  navbar-nav-right responsive-navbar navbar-dark">
            <div className="collapse navbar-collapse" id="navbarSupportedContent-4">
              <div className="d-flex order-lg-2 ms-auto">
             
           
             
                {/* Full screen */}
                <div className="dropdown ">
                  <a className="nav-link icon full-screen-link">
                    <i className="fe fe-maximize fullscreen-button fullscreen header-icons"></i>
                    <i className="fe fe-minimize fullscreen-button exit-fullscreen header-icons"></i>
                  </a>
                </div>
                {/* Full screen */}
            
                {/* Profile */}
                <div className="dropdown main-profile-menu" ref={dropdownRef}>
                <a className="d-flex" href="javascript:void(0)" onClick={toggleProfileDropdown}>
                    <span className="main-img-user">
                      <img alt="avatar" src="../assets/img/users/1.jpg" />
                    </span>
                  </a>
                  <div className={`dropdown-menu ${isProfileDropdownOpen ? 'show' : ''}`}>
                    <div className="header-navheading">
                      <h6 className="main-notification-title">{storedUserData.username}</h6>
                      <p className="main-notification-text">{storedUserData.is_superuser?'Administrateur':'Utilisateur'}</p>
                    </div>
                    <a className="dropdown-item border-top" href="#">
                      <i className="fe fe-user"></i> My Profile
                    </a>
                    <a className="dropdown-item" href="#" onClick={handleLogout}>
                      <i className="fe fe-power"></i> Sign Out
                    </a>
                  </div>
                </div>
                {/* Profile */}
                {/* Sidebar */}
              
                {/* Sidebar */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
