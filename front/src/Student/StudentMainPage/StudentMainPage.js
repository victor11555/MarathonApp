import React from 'react'
import {useState, useEffect} from 'react';
import {mainURL, participateURL} from '../../utils/urls';
import {Button, Card} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import style from './StudentMainPage.module.css'


export default function StudentMainPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const {_id} = user;
    const [marathons, setMarathons] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetch(mainURL)
            .then(res => res.json())
            .then(res => {
                    if (!res.success) alert(res.message);
                    else {
                        const {nowMarathons} = res;
                        setMarathons(nowMarathons)
                    }
                }
            )
    }, [])

    const onclickHandler = (e, el) => {
        e.preventDefault();
        fetch(participateURL, {
            method: "POST",
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify({id: el._id, userId: _id})
        })
            .then(res => res.json())
            .then(response => {
                if (!response.success) console.log(response.message);
                else {
                    const {user} = response;
                    localStorage.setItem('user', JSON.stringify(user));
                    history.push('/dashboard')
                }
            });
    }

    return (
        <>
            {marathons && marathons.map(el => {
                const date = new Date(el.start);
                let flag = false;
                user.marathons.map(element => {
                    if (element._id === el._id) flag = true;
                })
                return (
                    <div className={`${style.cards}`}>
                    <Card key={el._id} className={`text-center mb-2 mt-2 ${style.card}`}>
                        <Card.Header>{el.company}</Card.Header>
                        <Card.Body>
                            <Card.Title>{el.title}</Card.Title>
                            <Card.Text>
                                {el.description}
                            </Card.Text>
                            {flag ? <div>You participate</div> : <Button className={`text-center mb-2 ${style.button}`} onClick={e => onclickHandler(e, el, date)}
                                                                         variant="danger">Participate</Button>}
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            Start: {`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}
                        </Card.Footer>
                    </Card>
                    </div>
                )

            })}
        </>
    )
}
