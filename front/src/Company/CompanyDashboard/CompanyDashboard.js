import React, {useState} from 'react';
import {ListGroup} from 'react-bootstrap';
import MarathonForm from '../MarathonForm/MarathonForm';
import {Modal, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Checker from "../../utils/class";
import {loginURL} from "../../utils/urls";

export default function CompanyDashboard() {

    const hider = { display: "none" };
    const [stateMarathon, setSetMarathon] = useState();
    const [show, setShow] = useState(null);
    const [showButton, setShowButton] = useState(true);
    const checker = new Checker();
    const handleClose = () => setShow(false);
    const handleShow = (index) => {
        setShow(index);
        if (checker.checkMarathonStarted(user.marathons[index]._id)) {
            setShowButton(false);
        } else {
            setShowButton(true);
        }
    }
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            {/*Показывает профиль*/}
            <h3>My Profile</h3>
            <ListGroup variant="flush">

                <ListGroup.Item>Username: {user.username}</ListGroup.Item>
                <ListGroup.Item>Company: {user.company}</ListGroup.Item>
                <ListGroup.Item>Email: {user.email}</ListGroup.Item>

                <ListGroup.Item>
                    <button onClick={() => setSetMarathon(!stateMarathon)}>Add Marathon</button>
                    {stateMarathon ? <MarathonForm/> : null}
                </ListGroup.Item>

                <ListGroup.Item>
                    {user.marathons.map((el, index) => (
                        <>
                            <Button variant="primary" onClick={() => handleShow(index)}>
                                Marathon: {el.title}
                            </Button>
                            <Modal show={show === index} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Marathon: {el.title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Choose what you want to do with this marathon!</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary"
                                            onClick={() => history.push(`/dashboard/checkMarathon/${el._id}`)}>
                                        Check Marathon
                                    </Button>
                                    {console.log(showButton)}
                                    <Button style={showButton ? null : hider} variant="primary"
                                            onClick={() => history.push(`/dashboard/editMarathon/${el._id}`)}>
                                        Edit Marathon
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    ))}
                </ListGroup.Item>


            </ListGroup>
        </div>
    )
}
