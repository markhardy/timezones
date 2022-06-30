import "./navbar.css";

const NavBar = ({ headline }) => {
    return (
        <nav className="navbar navbar-light navbar-inverse">
            <div className="container-fluid">
                <a className="navbar-brand" href="localhost:3000">
                    {headline}
                <span className='badge badge-pill badge-secondary'>
                </span>
                </a>
            </div>
        </nav>
    );
};

export default NavBar;