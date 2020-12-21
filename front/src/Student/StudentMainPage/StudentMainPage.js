import React from 'react'
import { useState, useEffect } from 'react';
import { mainURL } from '../../utils/urls';
import { Button, Card } from 'react-bootstrap';

export default function StudentMainPage() {

    const [marathons, setMarathons] = useState([]);

    useEffect(() => {
        fetch(mainURL)
            .then(res => res.json())
            .then(res =>
                setMarathons(res)
            )
    }, [])

    return (
        <>
            {marathons && marathons.map(el => (
                <>
                    <Card key={el._id} className="text-center">
                        <Card.Header>? Company ?</Card.Header>
                        <Card.Body>
                            <Card.Title>{el.title}</Card.Title>
                            <Card.Text>
                                {el.description}
                            </Card.Text>
                            <Button variant="primary">Participate</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">{el.start}</Card.Footer>
                    </Card>
                </>
            ))}
        </>
    )
}
