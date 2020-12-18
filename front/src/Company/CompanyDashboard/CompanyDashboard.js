import React, { useState } from 'react';
import {ListGroup} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function CompanyDashboard() {
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
          {/*<button onClick={() => setStateOffer(!stateOffer)}>Add Marathon</button>*/}
          {/*{stateOffer ? <OfferForm/> : null}*/}
        </ListGroup.Item>

        <ListGroup.Item>
        {/*  {user.offers.map(el=> (*/}
        {/*  <>*/}
        {/*    <button onClick={() => setStateOrder(!stateOrder)}>Add Task</button>*/}
        {/*    /!*{stateOrder ? <OrderForm key={el} offerId={el}/> : null}*!/*/}
        {/*    /!*<Offer id={el}/>*!/*/}
        {/*  </>*/}
        {/*)) }*/}
        </ListGroup.Item>



        </ListGroup>
    </div>
  )
}
