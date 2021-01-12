import React from 'react';
import {Button, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
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
            <div style={{position: 'relative'}}>
                <div className={`${style.img}`} style={{height: '100hv', width: '100vw'}}>
                    <div className={`${style.rgba}`} style={{height: '100vh'}}></div>
                </div>
                <h1 className={`text-center mt-3 mb-3 ${style.title}`}>Marathons:</h1>
                <div className={`${style.cards}`}>
                    {user && user.marathons.map(el => {
                        const date = new Date(el.start);
                        return (
                            <Card className={`${style.card} bg-light`} style={{width: '18rem'}}>
                                <Card.Body>
                                    <Card.Title
                                        className={`${style.titleCard} font-weight-bolder`}>{el.title}</Card.Title>
                                    <Card.Text className='font-italic'>
                                        {el.description}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush ">
                                    <ListGroupItem className='bg-light'><span
                                        className='font-weight-bold'>Start: </span>{`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}
                                    </ListGroupItem>
                                    <ListGroupItem className='bg-light'><span
                                        className='font-weight-bold'>Duration: </span>{el.duration} days</ListGroupItem>
                                </ListGroup>
                                <Card.Body className={`${style.forButton}`}>
                                    <Button className={`${style.button}`} onClick={e => onclickHandler(e, el)}
                                            variant="danger">Go</Button>
                                </Card.Body>
                            </Card>)
                    })}
                </div>
            </div>
        </>
    )
}
