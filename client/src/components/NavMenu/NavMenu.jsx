import styles from "../NavMenu/NavMenu.module.css"
import { useNavigate } from 'react-router-dom'
import { FiSettings } from "react-icons/fi";
import { FaUser, FaTimes, FaSearch } from "react-icons/fa"

function NavMenu({onClose}) {
    const navigate = useNavigate();

    const token= localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        onClose();
        navigate("/Login");
    };

    return (
        <>
            <div
                className={styles.overlay}
                onClick={onClose}
            ></div>

            <nav className={styles.menu}>
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close menu"
                    >
                    <FaTimes size={20}/>
                    </button>
                <button
                    className={styles.button}
                        onClick={() =>{ onClose();
                        navigate('/projects')}}>
                    Projects
                </button>

                <button
                    className={styles.button}
                        onClick={() =>{onClose();
                        navigate('/snips')}}>
                    Snips
                </button>

                <button
                    className={styles.button}
                        onClick={() => {onClose();
                        navigate('/tasks')}}>
                    Tasks
                </button>
                <button
                    className={styles.button}
                        onClick={() => {onClose();
                        navigate('/series')}}>
                    Series
                </button>
                <div className={styles.settings}>
                    <button
                        className = {styles.button}
                            onClick ={() => {onClose();
                            navigate('/search')}}>
                        <FaSearch />
                    </button>
                    <button
                        className={styles.button}
                            onClick={() => {onClose();
                            navigate('/settings')}}>
                        <FiSettings />
                    </button>

                    <button
                        className={styles.button}
                        onClick={() => {
                            onClose();
                            navigate('/profile')}}>
                        <FaUser />
                    </button>
                    {token && ( 
                        <button 
                            className={styles.button} 
                            onClick={handleLogout}> 
                                Logout 
                        </button> )}
                </div>
            </nav>
        </>
    )
}

export default NavMenu;