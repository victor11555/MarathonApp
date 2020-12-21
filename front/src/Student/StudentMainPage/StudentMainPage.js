import React from 'react'
import { useState, useEffect } from 'react';
import { mainURL } from '../../utils/urls';
import { Button, Card } from 'react-bootstrap';

export default function StudentMainPage() {

    const [marathons, setMarathons] = useState([]);

    useEffect(() => {
        fetch(mainURL)
            .then(res => res.json())
            .then(res => {
                if (!res.success) alert(res.message);
                else {
                    const { nowMarathons } = res;
                    setMarathons(nowMarathons)
                }
            }
            )
    }, [])

    return (
        <>
            {marathons && marathons.map(el => {
                const date = new Date(el.start);
                return (
                    <Card key={el._id} className="text-center">
                        <Card.Header>{el.company}</Card.Header>
                        <Card.Body>
                            <Card.Title>{el.title}</Card.Title>
                            <Card.Text>
                                {el.description}
                            </Card.Text>
                            <Button variant="primary">Participate</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            Start: {`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}
                        </Card.Footer>
                    </Card>
                )

            })}
        </>
    )
}
