import styles from "./Header.module.css"

import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
// import { FiX } from "react-icons/fi";
import NavMenu from "../NavMenu/NavMenu";

function Header() {

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] =useState(false);

    return (
        
        <header className={styles.header}>
                
            <button
                className={styles.menubutton}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? < FaTimes /> : <FaBars />}
            </button>

            {isMenuOpen && (
                <NavMenu onClose={() => setIsMenuOpen(false)} />
            )}
                
            <h1>Snippets</h1>
            <button className={styles.dashbutton} onClick={() => navigate('/dashboard')}>
                <FaHome />
            </button>
                
                
        </header>
    )
}

export default Header;