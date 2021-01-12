import React from 'react';
import CompanyDashboard from '../../Company/CompanyDashboard/CompanyDashboard';
import StudentDashboard from '../../Student/StudentDashboard/StudentDashboard';

export default function DashboardPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    let tmp = true;
    if (!user) {
    } else if (user.role === 'student') {
        tmp = false
    }
    return (
        <div>
            {tmp ? <CompanyDashboard/> : <StudentDashboard/>}
        </div>
    );
}
