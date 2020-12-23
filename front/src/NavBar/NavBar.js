import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

function NavBar() {
    const ourStyle = {color: "white", padding: "5px"};
    const myStyle = {color: "black", padding: "5px"};
    let logged = true;
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        logged = !logged;
    }

    const onClickHandler = () => {
        localStorage.removeItem('user');
        window.location = 'http://localhost:3000/main'
    }

    return (
        <>
            {logged ? (
                <Navbar bg="primary" variant="dark">
                    
                    <Nav className="mr-auto">
                        <p style={myStyle}>Hello, {user.username}</p>
                        <Link style={ourStyle} to="/main">
                            MARATHON APP
                        </Link>
                        <Link style={ourStyle} to="/dashboard">
                            Dashboard
                        </Link>
                        <Link onClick={onClickHandler} style={ourStyle} to="#">
                            LogOut
                        </Link>
                    </Nav>
                </Navbar>
            ) : (
                <Navbar bg="primary" variant="dark">
                    <Nav className="mr-auto">
                        <p style={myStyle}>Hello, guest! You should signup or login</p>

                        <Link style={ourStyle} to="/login">
                            Log In
                        </Link>
                        <Link style={ourStyle} to="/signup">
                            Sign Up
                        </Link>
                    </Nav>
                </Navbar>
            )}
        </>


    );
}

export default NavBar;
