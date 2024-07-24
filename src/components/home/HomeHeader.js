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

  const _scrollToDiv = (param) => {
    setIsMenuOpen(!isMenuOpen); // Obrnite trenutno stanje menija prilikom klika
    scrollToDiv(param)
  };

  const handleResize = () => {
    if (window.innerWidth > 1024) {
      setIsMenuOpen(false); // Ako je širina prozora veća ili jednaka 1024 piksela, sakrij padajući meni
    }
    // Dodajte ovu proveru za prikaz dugmeta menija ako je širina manja od 1024 piksela
    else {
      setIsMenuOpen(false); // Sakrij padajući meni
    }
  };
  useEffect(() => {
    setCurrentLanguage(selLen);

    // Dodajte event listener za promenu rezolucije prilikom montiranja komponente
    window.addEventListener("resize", handleResize);

    // Pozovite handleResize prilikom montiranja komponente kako biste inicijalno postavili isMenuOpen
    handleResize();

    return () => {
      // Uklonite event listener prilikom demontiranja komponente
      window.removeEventListener("resize", handleResize);
    };
  }, [selLen]);    

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


  const openNewWindow = () => {
    window.open("https://www.ems.rs", "_blank");
  }

  return (
    <div id="home" className="landing-header"> 
      <div>
        <div className="landing-topbar" > {/*style={{ backgroundColor: "#750404" }}>  {/*  "#173042" */}
          <span>
            {/* <img src={`assets/layout/images/logo-beli2.png`} alt="Ticket line" style={{ width: "124.7px", height: "37px" }}/> */}
            <img src={`assets/layout/images/logo-beli2.png`} alt="Ticket line" style={{ height: "70px", top: "0", position: "absolute" }} />
          </span>

          <a onClick={toggleMenu} id="landing-menu-button">
            <img src={`assets/layout/images/landing/icon-ellipsis-v.svg`} alt="Ticketline" />
          </a>

          {/* Dodajte vertikalni meni koji će se prikazivati samo na širinama manjim od 1024px */}
          {window.innerWidth < 1024 && (
            <ul className={`layout-profile-name1 ${isMenuOpen ? 'open' : ''}`} id="landing-menu1">
              <li className="layout-profile-name1">
                <a onClick={() => _scrollToDiv("home")}>{translations[selLen].home}</a>
              </li>
              <li>
                <a onClick={() => _scrollToDiv("features")}>{translations[selLen].modules}</a>
              </li>
              {/* <li>
            <a onClick={() => _scrollToDiv("news")}>{translations[selLen].news}</a>
          </li>
          <li>
            <a onClick={() => _scrollToDiv("pricing")}>{translations[selLen].pricing}</a>
          </li>
          */}
              <li>
                <a onClick={() => handleLogout()}>{translations[selLen].logout}</a>
              </li>
            </ul>
          )}
          
          <ul className="layout-profile-name" id="landing-menu" >
          <li  className="layout-profile-name">
            <a onClick={() => _scrollToDiv("home")}>{translations[selLen].home}</a>
          </li>
          <li>
            <a onClick={() => _scrollToDiv("features")}>{translations[selLen].modules}</a>
          </li>
          {/* <li>
            <a onClick={() => _scrollToDiv("news")}>{translations[selLen].news}</a>
          </li>
          <li>
            <a onClick={() => _scrollToDiv("pricing")}>{translations[selLen].pricing}</a>
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
          onClick={openNewWindow}
        />
      </div>
    </div>
  );
};

export default HomeHeader;
