import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function StudentDashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();

    return (
        <ListGroup variant='flush'>

        <ListGroup.Item>
            <button onClick={(e) => {
                e.preventDefault();
                // window.location.href='https://t.me/elbrus_marathon';
                window.open('https://t.me/elbrus_marathon', '_blank');
            }
            }>To Telegram</button>
          {/*Orders: {user && user.orders.map(el => <Order id={el} />)}*/}
        </ListGroup.Item>


      </ListGroup>
    )
}
