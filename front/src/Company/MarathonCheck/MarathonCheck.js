import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {ListGroup} from "react-bootstrap";
import { checkStudentUrl } from "../../utils/urls";

export default function MarathonCheck() {
// надо запопулейтить таски и в самих тасках еще студентов
    const [points, setPoints] = useState(0);
    const { id } = useParams();
    const { marathons } = JSON.parse(localStorage.getItem('user'));
    const marathon = marathons.filter((el) => el._id === id)[0];
    const changeHandler = (e) => {
        // взять выбранный оптион
        setPoints(e.target.value)
    }
    const submitHandler = (e, studentId, day, task) => {
        e.preventDefault();
        const comment = e.target.children[0].children[1].value;

        fetch(checkStudentUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
            },
            body: JSON.stringify({ studentId, points, comment, marathonId: marathon._id, day, task }),
        })
            .then(res => res.json())
            .then(response => {
                if (!response.success) console.log(response.message);
                else {
                    console.log(response);//zaglushka
                }
            });
    }

    return (
        <ListGroup variant="flush">
            <ListGroup.Item>Marathon: {marathon.title}</ListGroup.Item>
            <ListGroup.Item>
                {marathon.tasks.map((el, index) =>
                    <>
                        Day{index + 1}
                        {el.map((task, i) =>
                            <>
                                Task{i+1}
                                Description: {task.description}
                                {task.answers.map((answer) =>
                                    <>
                                        Student: {answer.student}
                                        Answer: {answer.answer}
                                        <form onSubmit={e => submitHandler(e, answer.student._id, index+1, i+1)}>
                                            <select onChange={changeHandler}>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                            <input name={'comment'} placeholder={'comment'}/>
                                            <button type='submit'>Checked</button>
                                        </form>
                                    </>
                                )}
                            </>)}
                    </>
                )}
            </ListGroup.Item>
        </ListGroup>
    )
}
