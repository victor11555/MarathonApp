import React, {useState} from 'react';
import {Button, ListGroup, Modal} from 'react-bootstrap';
import MarathonForm from '../MarathonForm/MarathonForm';
import {useHistory} from 'react-router-dom';
import Checker from "../../utils/class";

export default function CompanyDashboard() {

    const hider = {display: "none"};
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
        <div style={{width: '80%', paddingLeft: '15%'}}>
            <h3 style={{padding: '20px', fontWeight: '800'}}>My Profile</h3>
            <ListGroup>

                <ListGroup.Item>Username: <span
                    style={{padding: '5px', fontWeight: '800'}}>{user.username}</span></ListGroup.Item>
                <ListGroup.Item>Company: <span style={{padding: '5px', fontWeight: '800'}}>{user.company}</span>
                </ListGroup.Item>

                <ListGroup.Item>Email: <span
                    style={{padding: '5px', fontWeight: '800'}}>{user.email}</span></ListGroup.Item>

                <ListGroup.Item>
                    <button style={{margin: '20px'}} className='btn btn-danger ml-2'
                            onClick={() => setSetMarathon(!stateMarathon)}>ADD MARATHON
                    </button>
                    {stateMarathon ? <MarathonForm/> : null}
                </ListGroup.Item>

                <ListGroup.Item>
                    {user.marathons.map((el, index) => (
                        <>
                            <Button className='btn btn-danger ml-5 mt-3' style={{margin: '20px'}} variant="primary"
                                    onClick={() => handleShow(index)}>
                                Marathon: {el.title}
                            </Button>
                            <Modal show={show === index} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Marathon: <span
                                        style={{padding: '5px', fontWeight: '800'}}>{el.title}</span></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Choose what you want to do with this marathon!</Modal.Body>
                                <Modal.Footer>
                                    <Button className='btn btn-secondary ml-2 mt-2' variant="secondary"
                                            onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button className='btn btn-danger ml-2 mt-2' variant="primary"
                                            onClick={() => history.push(`/dashboard/checkMarathon/${el._id}`)}>
                                        Check Marathon
                                    </Button>
                                    {console.log(showButton)}
                                    <Button className='btn btn-info ml-2 mt-2' style={showButton ? null : hider}
                                            variant="primary"
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
