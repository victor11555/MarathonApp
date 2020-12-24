import React from 'react';
import { Link } from 'react-router-dom';
import style from './CompanyMainPage.module.css'

function CompanyMainPage(props) {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <>
        { user ? <div> Company main page</div> : <div className='container d-flex flex-column align-items-center'>
        <div className={`${style.CompanyMainPageLogo}`}></div>
        <div className='d-flex flex-column align-items-center'>
        <div >Hello, you have come to a site where you can create an online marathon on any topic, or participate in already created marathons. In order to create a marathon log in under the "Company" account. If you want to see which marathons you need to participate, log in under the account "Student"</div>
        <div className='d-flex justify-content-center align-items-center'>
            {<Link to='/login'><button className='btn btn-danger'>Log In</button></Link>} <span className='mr-1 ml-1'> or </span>  {<Link to='/signup'><button className='btn btn-danger'>Sign Up</button></Link>}
        </div>
        </div>
        </div>}
        </>
    );
}

export default CompanyMainPage;
