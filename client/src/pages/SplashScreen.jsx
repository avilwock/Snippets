import { FaPenNib } from "react-icons/fa";
import styles from "../pages/SplashScreen.module.css"

function SplashScreen () {
    return (
        <div className = {styles.splashbox}>
            <FaPenNib className={styles.icon}/>
            <h1>Snippets</h1>
            <p>Loading...</p>
        </div>
    )
}

export default SplashScreen;