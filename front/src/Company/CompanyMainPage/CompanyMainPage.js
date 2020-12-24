import React from 'react';
import { Link } from 'react-router-dom';
import style from './CompanyMainPage.module.css'

function CompanyMainPage(props) {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <>
            { user
                ? <div> Company main page</div>
                : <div style={{ position: 'relative' }}>
                    <div className='container d-flex flex-column align-items-center'>
                        <div className={`${style.img}`} style={{ height: '100vh', width: '100vw' }}>
                            <div className={`${style.rgba}`} style={{ height: '100vh' }}> </div>
                        </div >
                        <div className={`${style.CompanyMainPageLogo}`}></div>
                        <div className={`${style.formBg}`}>

                            <div className='d-flex flex-column align-items-center'>
                                <div >Hello, you have come to a site where you can create an online marathon on any topic, or participate in already created marathons. In order to create a marathon log in under the "Company" account. If you want to see which marathons you need to participate, log in under the account "Student"</div>
                                <div className='d-flex justify-content-center align-items-center'>
                                    {<Link to='/login'><button className='btn btn-danger mt-2 mr-2' style={{fontSize: '20px'}}>Log In</button></Link>} <span className='mr-1 ml-1'> or </span>  {<Link to='/signup'><button className='btn btn-danger ml-2 mt-2'style={{fontSize: '20px'}}>Sign Up</button></Link>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    );
}

export default CompanyMainPage;
