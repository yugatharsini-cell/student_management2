
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar({ variant = "public", username, onLogout }) {

    return (
        <nav className="navbar">

            <div className="navbar-container">

                <Link to="/" className="logo">
                            Student Management System
                </Link>


                {/* Public Navigation */}
                {variant === "public" && (

                    <div className="nav-links">

                        <Link to="/" className="nav-link">
                            Home
                        </Link>

                        <Link
                            to="/login"
                            className="login-button"
                        >
                            Login
                        </Link>

                    </div>

                )}


                {/* Admin Navigation */}
                {variant === "admin" && (

                    <div className="nav-links">

                        <div className="navbar-user">

                            <strong>
                                {username}
                            </strong>

                            <span className="role-badge">
                                ADMINISTRATOR
                            </span>

                        </div>

                        <button
                            type="button"
                            className="logout-button"
                            onClick={onLogout}
                        >
                            Logout
                        </button>

                    </div>

                )}


                {/* Student Navigation */}
                {variant === "student" && (

                    <div className="nav-links">

                        <div className="navbar-user">

                            <strong>
                                {username}
                            </strong>

                            <span className="role-badge">
                                STUDENT
                            </span>

                        </div>

                        <button
                            type="button"
                            className="logout-button"
                            onClick={onLogout}
                        >
                            Logout
                        </button>

                    </div>

                )}

            </div>

        </nav>
    );
}

export default Navbar;
