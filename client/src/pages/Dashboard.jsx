import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button"
import "../App.css"

function Dashboard() {
    const navigate=useNavigate();
    return (
        <div>
            <h1>
            Dashboard</h1>
            <div>
                <Button onClick={() => navigate('/projects')}>
                    Projects
                </Button>
                <Button onClick={() => navigate('/snips')}>
                    Snippets
                </Button>
                <Button onClick={() => navigate('/tasks')}>
                    Tasks
                </Button>
            </div>
            <div>
                <Button onClick={() => navigate('/new-project')}>
                    +
                </Button>
                <Button onClick={() => navigate('/new-snip')}>
                    + 
                    </Button>
                <Button onClick={()=> navigate('/new-task')}>
                    + 
                </Button>
            </div>
        
        </div>
    )
}

export default Dashboard;