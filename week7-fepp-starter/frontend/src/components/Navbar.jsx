import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const handleClick = () => {
        // remove user from storage
        localStorage.removeItem("user");
        setIsAuthenticated(false);
    };
    return (
        <nav className="navbar">
            <h1>Job Search</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/add-job">Add Job</a>
                {isAuthenticated && (
                    <button onClick={handleClick}>Log out</button>
                )}
                {!isAuthenticated && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
