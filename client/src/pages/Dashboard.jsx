import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate=useNavigate();
    return (
        <div>
            <h1>Dashboard</h1>

            <button onClick={() => navigate('/new-project')}>
                + New Project
            </button>
        </div>
    )
}

export default Dashboard;