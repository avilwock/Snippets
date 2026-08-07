import styles from "./Header.module.css"

function Header() {
    return (
        
        <header className={styles.header}>
                <h1>Snippets</h1>
                <button className={styles.menubutton} aria-label="Open menu">
                   ☰
                </button>
        </header>
    )
}

export default Header;