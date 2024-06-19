import { Link } from "react-router-dom";

export default function RecruiterHome(){
    return (
        <>
        <ul>
            <li>
                <Link to="/jobpost">post job</Link>
            </li>
            <li>
                <Link>posted Jobs</Link>
            </li>
            <li>
                <Link>Applications</Link>
            </li>
        </ul>
        </>
    )
}