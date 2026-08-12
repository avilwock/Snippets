import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button"

function Dashboard() {
    const navigate=useNavigate();
    return (
        <div>
            <h1>Dashboard</h1>

            <Button onClick={() => navigate('/new-project')}>
                + New Project
            </Button>
            <Button onClick={() => navigate('/new-snip')}>
                + New Snip
                </Button>
        </div>
    )
}

export default Dashboard;