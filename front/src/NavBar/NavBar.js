import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from './NavBar.module.css'

function NavBar() {
    const ourStyle = { color: "white", padding: "5px" };
    const myStyle = { color: "black", padding: "5px" };
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
            {logged ? (<>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/main">
                        <img
                            src="/—Pngtree—elegant flame unique animal fox_3641602.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/main">MARATHONLINE</Nav.Link>
                        </Nav>
                        <p className={`text-center mt-3 mb-3 ${style.hello}`}>Hello, {user.username}!</p>
                        <Nav>
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link onClick={onClickHandler} eventKey={2} href="main">
                                LogOut
                             </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
            ) : (
                    <>
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Navbar.Brand href="/main">
                                <img
                                    src="/МарафонNewBig.png"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="/main">MARATHONLINE</Nav.Link>
                                </Nav>
                                <p className={`text-center mt-3 mb-3 ${style.hello}`}>Hello, guest! You should signup or login</p>
                                <Nav>
                                    <Nav.Link href="/login">Log In</Nav.Link>
                                    <Nav.Link onClick={onClickHandler} eventKey={2} href="signup">
                                        Sign Up
                             </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </>
                )}
        </>
    );
}

export default NavBar;
