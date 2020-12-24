import React, { useState } from 'react';

import CompanyLoginForm from '../../Company/CompanyLoginForm/CompanyLoginForm';
import StudentLoginForm from '../../Student/StudentLoginForm/StudentLoginForm';
import style from './LoginPage.module.css'

function LoginPage() {
    const [state, setState] = useState(true);
    return (
        <div className={`${style.img}`} style={{ height: '100vh' }}>
            <div className={`${style.rgba}`} style={{ height: '100vh' }}>
                <div className='d-flex flex-column justify-content-end align-items-end' style={{ height: '60vh' }}>
                    <div>
                        <select className='custom-select mb-1' onChange={() => setState(!state)}>
                            <option>company</option>
                            <option>student</option>
                        </select>
                    </div>
                    <div>
                        {state ? <CompanyLoginForm /> : <StudentLoginForm />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
