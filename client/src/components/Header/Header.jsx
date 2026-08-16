import styles from "./Header.module.css"
import DashButton from "../../components/DashButton/DashButton.jsx"

function Header() {
    return (
        
        <header className={styles.header}>
                <h1>Snippets</h1>
                <DashButton></DashButton>
                <button className={styles.menubutton} aria-label="Open menu">
                   ☰
                </button>
        </header>
    )
}

export default Header;