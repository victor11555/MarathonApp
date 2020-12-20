import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function StudentDashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();

    const onClickHandler = () => {
         localStorage.removeItem('user');
       window.location = 'http://localhost:3000/'
    }

    return (
        <ListGroup variant='flush'>
        <ListGroup.Item>
          <button onClick={onClickHandler}>Log Out</button>
        </ListGroup.Item>

        <ListGroup.Item>
            <p>hjghjghjhg</p>
          {/*Orders: {user && user.orders.map(el => <Order id={el} />)}*/}
        </ListGroup.Item>

      </ListGroup>
    )
}
