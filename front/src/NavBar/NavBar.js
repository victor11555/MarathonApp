import {Nav, Navbar} from "react-bootstrap";
import style from './NavBar.module.css'

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
            {logged ? (<>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="/main">
                            <img
                                src="/фави.png"
                                width="60"
                                height="60"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link exact href="/main"><span
                                    className={`text-center mt-3 mb-3 ${style.text}`}>MARATHONLINE</span></Nav.Link>
                            </Nav>
                            <span className={`text-center mt-3 mb-3 ${style.hello}`}>Hello, {user.username}!</span>
                            <Nav>
                                <Nav.Link exact href="/dashboard"><span
                                    className={`text-center mt-3 mb-3 ${style.text}`}>Dashboard</span></Nav.Link>
                                <Nav.Link exact onClick={onClickHandler} eventKey={2} href="/main">
                                    <span className={`text-center mt-3 mb-3 ${style.text}`}>LogOut</span>
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
                                src="/фави.png"
                                width="60"
                                height="60"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link exact href="/main"><span
                                    className={`text-center mt-3 mb-3 ${style.text}`}> MARATHONLINE</span></Nav.Link>
                            </Nav>
                            <p className={`text-center mt-3 mb-3 ${style.hello}`}>Hello, guest! You should signup or
                                login</p>
                            <Nav>
                                <Nav.Link exact href="/login"><span className={`text-center mt-3 mb-3 ${style.text}`}>Log In</span></Nav.Link>
                                <Nav.Link exact onClick={onClickHandler} eventKey={2} href="signup">
                                    <span className={`text-center mt-3 mb-3 ${style.text}`}>Sign Up</span>
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
