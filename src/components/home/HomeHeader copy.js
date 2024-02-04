import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { translations } from "../../configs/translations";
//import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import env from "../../configs/env"
import { useSelector } from 'react-redux';

const HomeHeader = ({ scrollToDiv }) => {
  const selLen = localStorage.getItem('sl') || 'en' //useSelector(state => state.selectedLanguage)
  const [currentLanguage, setCurrentLanguage] = useState(selLen);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Dodajte ovo stanje

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Obrnite trenutno stanje menija prilikom klika
  };

  useEffect(() => {
    setCurrentLanguage(selLen)
  }, [selLen]);
  //const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("isLoggedIn");
    //window.location.reload();
    navigate('/login');
  }

  return (
    <div id="home" className="landing-header">
      <div>
        <div className="landing-topbar" style={{ backgroundColor: "#750404" }}>  {/*  "#173042" */}
          <span>
            {/* <img src={`assets/layout/images/logo-beli2.png`} alt="Ticket line" style={{ width: "124.7px", height: "37px" }}/> */}
            <img src={`assets/layout/images/logo-beli2.png`} alt="Ticket line" style={{ height: "50px" }} />
          </span>

          <a onClick={toggleMenu} id="landing-menu-button">
            <img src={`assets/layout/images/landing/icon-ellipsis-v.svg`} alt="Ticketline" />
          </a>

          {/* Dodajte vertikalni meni koji će se prikazivati samo na širinama manjim od 1024px */}
          {window.innerWidth < 1024 && (
            <ul className={`layout-profile-name ${isMenuOpen ? 'open' : ''}`} id="landing-menu1">
              <li className="layout-profile-name">
                <a onClick={() => scrollToDiv("home")}>{translations[selLen].home}</a>
              </li>
              <li>
                <a onClick={() => scrollToDiv("features")}>{translations[selLen].modules}</a>
              </li>
              {/* <li>
            <a onClick={() => scrollToDiv("news")}>{translations[selLen].news}</a>
          </li>
          <li>
            <a onClick={() => scrollToDiv("pricing")}>{translations[selLen].pricing}</a>
          </li>
          */}
              <li>
                <a onClick={() => handleLogout()}>{translations[selLen].logout}</a>
              </li>
            </ul>
          )}
          
          <ul className="layout-profile-name" id="landing-menu" >
          <li  className="layout-profile-name">
            <a onClick={() => scrollToDiv("home")}>{translations[selLen].home}</a>
          </li>
          <li>
            <a onClick={() => scrollToDiv("features")}>{translations[selLen].modules}</a>
          </li>
          {/* <li>
            <a onClick={() => scrollToDiv("news")}>{translations[selLen].news}</a>
          </li>
          <li>
            <a onClick={() => scrollToDiv("pricing")}>{translations[selLen].pricing}</a>
          </li>
          */}
          <li>
            <a onClick={() => handleLogout()}>{translations[selLen].logout}</a>
          </li>           
        </ul>
        </div>
      </div>

      <div className="landing-header-content">
        <h1>Електромрежа Србије</h1>
        <p>{translations[selLen].slogan}</p>
        <Button
          label={translations[selLen].learnMore}
          className="p-button-text-only p-widget p-state-default p-corner-all"
        />
      </div>
    </div>
  );
};

export default HomeHeader;
