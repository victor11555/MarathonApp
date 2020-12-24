import React from 'react';
import { ListGroup, Card, ListGroupItem, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import style from './StudentDashboard.module.css'

export default function StudentDashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();

    const onclickHandler = (e, el) => {
        e.preventDefault();
        history.push(`/dashboard/answerMarathon/${el._id}`)
    }

    return (
        <>
        <h1 className={`text-center mt-3 mb-3 ${style.title}`}>Marathons:</h1>
        <div className={`${style.cards}`}>
            {user && user.marathons.map(el => {
                const date = new Date(el.start);
                return (
                    <Card className={`${style.card}`} style={{ width: '18rem' }}>
                        <Card.Body >
                            <Card.Title className={`${style.titleCard}`}>{el.title}</Card.Title>
                            <Card.Text>
                                {el.description}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Start: {`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</ListGroupItem>
                            <ListGroupItem>Duration: {el.duration} days</ListGroupItem>
                        </ListGroup>
                        <Card.Body className={`${style.forButton}`}>
                        <Button className={`${style.button}`}  onClick={e => onclickHandler(e, el)} variant="danger">Go</Button>
                        </Card.Body>
                    </Card>)
            })}
        </div>
        </>
    )
}
