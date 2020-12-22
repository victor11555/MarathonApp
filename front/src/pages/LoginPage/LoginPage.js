import React, {useState} from 'react';

import CompanyLoginForm from '../../Company/CompanyLoginForm/CompanyLoginForm';
import StudentLoginForm from '../../Student/StudentLoginForm/StudentLoginForm';

function LoginPage() {
    const [state, setState] = useState(true);
    return (
        <>
            <select onChange={() => setState(!state)}>
                <option>company</option>
                <option>student</option>
            </select>
            <div>
                {state ? <CompanyLoginForm/> : <StudentLoginForm/>}
            </div>
        </>
    );
}

export default LoginPage;
