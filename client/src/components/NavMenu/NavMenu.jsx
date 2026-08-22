import styles from "../NavMenu/NavMenu.module.css"
import { useNavigate } from 'react-router-dom'
import { FiSettings } from "react-icons/fi";
import { FaUser, FaTimes, FaSearch } from "react-icons/fa"

function NavMenu({onClose}) {
    const navigate = useNavigate();

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
                </div>
            </nav>
        </>
    )
}

export default NavMenu;