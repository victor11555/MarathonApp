import React from 'react';
import CompanyMainPage from "../../Company/CompanyMainPage/CompanyMainPage";
import StudentMainPage from "../../Student/StudentMainPage/StudentMainPage";

function MainPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    let tmp = true;
    if (!user) {
        // your are not authorized
    } else if (user.role === 'student') {
        tmp = false
    }
    return (
        <>
            <div>
                {tmp ? <CompanyMainPage/> : <StudentMainPage/>}
            </div>
        </>
    );
}

export default MainPage;
