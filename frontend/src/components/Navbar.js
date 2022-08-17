import { Link } from "react-router-dom";
function Navbar() {

    return (
        <nav className="navbar">

            <ul className="nav-links">

                <Link to="/">
                    <li>
                        Logo
                    </li>
                </Link>
                <Link to="/about">
                    <li>
                        About
                    </li>
                </Link>
                <Link to="/shop">
                    <li>
                        Shop
                    </li>
                </Link>
                <Link to="/hostels">
                    <li>
                        Hostels
                    </li>
                </Link>
                <Link to="/restaurants">
                    <li>
                        Restaurants
                    </li>
                </Link>
                <Link to="/login">
                    <li>
                        login
                    </li>
                </Link>
            </ul>
        </nav>

    );
}

export default Navbar;