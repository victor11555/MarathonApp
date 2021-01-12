import React, {useState} from 'react';
import {Form} from 'react-bootstrap';

import CompanyLoginForm from '../../Company/CompanyLoginForm/CompanyLoginForm';
import StudentLoginForm from '../../Student/StudentLoginForm/StudentLoginForm';
import style from './LoginPage.module.css'

function LoginPage() {
    const [state, setState] = useState(true);
    return (
        <div style={{position: 'relative'}}>
            <div className={`${style.img}`} style={{height: '100vh', width: '100vw'}}>
                <div className={`${style.rgba}`} style={{height: '100vh'}}>
                </div>
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
                        {state ? <CompanyLoginForm/> : <StudentLoginForm/>}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default LoginPage;
