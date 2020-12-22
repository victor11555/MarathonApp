import React, {useState} from 'react';
import StudentSignUpForm from '../../Student/StudentSignUpForm/StudentSignUpForm';
import CompanySignUpForm from '../../Company/CompanySignUpForm/CompanySignUpForm';

function SignUpPage() {
    const [state, setState] = useState(true);
    return (
        <>
            <select onChange={() => setState(!state)}>
                <option>company</option>
                <option>student</option>
            </select>
            <div>
                {state ? <CompanySignUpForm/> : <StudentSignUpForm/>}
            </div>
        </>
    );
}

export default SignUpPage;
