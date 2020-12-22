import React from 'react';
import {ListGroup} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

export default function StudentDashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();

    const onclickHandler = (e, el) => {
        e.preventDefault();
        history.push(`/dashboard/answerMarathon/${el._id}`)
    }

    return (
        <>
            <ListGroup variant='flush'>

                <ListGroup.Item>

                    Marathons: {user && user.marathons.map(el => <button
                    onClick={e => onclickHandler(e, el)}>{el.title}</button>)}
                </ListGroup.Item>


            </ListGroup>
        </>
    )
}
