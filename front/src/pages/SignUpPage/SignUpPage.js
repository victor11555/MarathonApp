import React, {useState} from 'react';
import StudentSignUpForm from '../../Student/StudentSignUpForm/StudentSignUpForm';
import CompanySignUpForm from '../../Company/CompanySignUpForm/CompanySignUpForm';
import style from './SignUpPage.module.css'
import {Form} from 'react-bootstrap';

function SignUpPage() {
    const [state, setState] = useState(true);
    return (
        <div style={{position: 'relative'}}>
            <div className={`${style.img}`} style={{height: '100vh', width: '100vw'}}>
                <div className={`${style.rgba}`} style={{height: '100vh'}}></div>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center' style={{height: '60vh'}}>
                <div className={`${style.formBg}`}>
                    <div>
                        <Form.Label className='font-weight-bolder'>Your status</Form.Label>
                        <select className='custom-select mb-1' onChange={() => setState(!state)}>
                            <option>company</option>
                            <option>student</option>
                        </select>
                    </div>
                    <div>
                        {state ? <CompanySignUpForm/> : <StudentSignUpForm/>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
