import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {ListGroup} from "react-bootstrap";
import {checkStudentUrl} from "../../utils/urls";

export default function MarathonCheck() {
// надо запопулейтить таски и в самих тасках еще студентов
    const [points, setPoints] = useState(0);
    const {id} = useParams();
    const {marathons} = JSON.parse(localStorage.getItem('user'));
    const marathon = marathons.filter((el) => el._id === id)[0];
    const changeHandler = (e) => {setPoints(e.target.value)}
    const [state, setState] = useState([])
    const [stateDay, setStateDay] = useState(null)
    const [stateStudent, setStateStudent] = useState([])

    const submitHandler = (e, studentId, day, task, taskId) => {
        e.preventDefault();
        // console.log('in', day, task);
      
        // console.log('out', state, stateDay);
        const comment = e.target.children[1].value;
        fetch(checkStudentUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
            },
            body: JSON.stringify({studentId, points, comment, marathonId: marathon._id, day, task, taskId}),
        })
            .then(res => res.json())
            .then(response => {
                if (!response.success) console.log(response.message);
                else {
                    console.log(response);
                    setState([...state, task-1])
                    setStateDay((day-1))
                    setStateStudent([...stateStudent, studentId])
                }
            });
    }
    return (
        <ListGroup variant="flush">
            <ListGroup.Item>Marathon: {marathon.title}</ListGroup.Item>
            <ListGroup.Item>
                <ul>
                    {marathon.tasks.map((el, index) =>
                        <li>
                            <div>Day{el.day}</div>
                            <ul>
                                {el.task.map((task, i) =>
                                    <li>
                                        <div>Task{i + 1}</div>
                                        <div>Description: {task.description}</div>
                                        <ul>
                                            {task.answers.map((answer) =>
                                                <li>
                                                    <div>Answers</div>
                                                    {/*популате студента*/}
                                                    <div>Student: {answer.student.username}</div>
                                                    <div>Answer: {answer.answer}</div>
                                                    {stateStudent.indexOf(answer.student._id) !== -1 && state.indexOf(i) !== -1 && stateDay ===index? null :<form
                                                        onSubmit={e => submitHandler(e, answer.student._id, index + 1, i + 1, task._id)}>
                                                        <select onChange={changeHandler}>
                                                            <option>0</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                        </select>
                                                        <input name={'comment'} placeholder={'comment'}/>
                                                        <button type='submit'>Checked</button>
                                                    </form>}
                                                </li>
                                            )}</ul>
                                    </li>)}
                            </ul>
                        </li>
                    )}
                </ul>
            </ListGroup.Item>
        </ListGroup>
    )
}
