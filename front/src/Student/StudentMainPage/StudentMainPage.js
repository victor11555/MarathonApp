import React, {useEffect, useState} from 'react'
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

            <div style={{position: 'relative'}}>
                <div className='container d-flex flex-column align-items-center'>
                    <div className={`${style.img}`} style={{height: '100hv', width: '100vw'}}>
                        <div className={`${style.rgba}`} style={{height: '100vh'}}></div>
                    </div>
                </div>
            </div>

            {marathons && marathons.map(el => {
                const date = new Date(el.start);
                let flag = false;
                user.marathons.map(element => {
                    if (element._id === el._id) flag = true;
                })
                return (
                    <div className={`${style.cards}`}>
                        <Card key={el._id} className={`text-center mb-2 mt-2 ${style.card}`}>
                            <Card.Header
                                className={`font-weight-bolder ${style.header}`}>Organizer: {el.company}</Card.Header>
                            <Card.Body>
                                <Card.Title className='font-weight-bolder'>{el.title}</Card.Title>
                                <Card.Text className='font-italic'>
                                    {el.description}
                                </Card.Text>
                                {flag ? <button disabled="disabled"
                                                className='btn btn-outline-danger font-weight-bolder'>You
                                        participate</button> :
                                    <Button className={`text-center mb-2 font-weight-bolder ${style.button}`}
                                            onClick={e => onclickHandler(e, el, date)}
                                            variant="danger">Participate</Button>}
                            </Card.Body>
                            <Card.Footer className="text-muted font-weight-bolder">
                                Start: {`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}
                            </Card.Footer>
                        </Card>
                    </div>
                )

            })}
        </>
    )
}
