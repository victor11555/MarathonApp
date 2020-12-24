import React, { useState } from 'react';
import StudentSignUpForm from '../../Student/StudentSignUpForm/StudentSignUpForm';
import CompanySignUpForm from '../../Company/CompanySignUpForm/CompanySignUpForm';
import style from './SignUpPage.module.css'

function SignUpPage() {
    const [state, setState] = useState(true);
    return (
        <div className={`${style.img}`} style={{ height: '100vh' }}>
            <div className={`${style.rgba}`} style={{ height: '100vh' }}>
                <div className='d-flex flex-column justify-content-end align-items-end ${style.bgi}' style={{ height: '60vh'}} >
                   
                        <div>
                            <select className='custom-select mb-1' onChange={() => setState(!state)}>
                                <option>company</option>
                                <option>student</option>
                            </select>
                        </div>
                        <div >
                            {state ? <CompanySignUpForm /> : <StudentSignUpForm />}
                        </div>
                    
                </div>
            </div>
        </div >
    );
}

export default SignUpPage;
