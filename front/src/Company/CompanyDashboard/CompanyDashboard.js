import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import MarathonForm from '../MarathonForm/MarathonForm';
import Marathon from "../../Marathon/Marathon";

export default function CompanyDashboard() {

  const [stateMarathon, setSetMarathon] = useState();

  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const onClickHandler = () => {
    localStorage.removeItem('user');
    history.push('/')
  }

  return (
    <div>
      {/*Показывает профиль*/}
      <h3>My Profile</h3>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <button onClick={onClickHandler}>Log Out</button>
        </ListGroup.Item>

        <ListGroup.Item>Username: {user.username}</ListGroup.Item>
        <ListGroup.Item>Company: {user.company}</ListGroup.Item>
        <ListGroup.Item>Email: {user.email}</ListGroup.Item>

        <ListGroup.Item>
          <button onClick={() => setSetMarathon(!stateMarathon)}>Add Marathon</button>
          {stateMarathon ? <MarathonForm /> : null}
        </ListGroup.Item>

        <ListGroup.Item>
          {user.marathons.map(el => (
            <>
              {/* <Marathon key={Math.random()} marathon={el}/> */}
              <Link to={`/dashboard/${el._id}`}> <div>Marathon: {el.title}</div></Link>
            </>
          ))}
        </ListGroup.Item>


      </ListGroup>
    </div>
  )
}
