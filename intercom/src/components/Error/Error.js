import React from 'react';
import { Link } from "react-router-dom";

const Error = props => {

    const id = localStorage.getItem('userId')
    let { error } = props
    return ( 
        <section className='error'>
            <div className='error-body'>
                <h1 className='error-header'>
                    {error.code ? error.code : 'Error'}
                </h1>
                <h2 className='error-header-sub'>
                    {error.message ? error.message: 'Unexpected error occured. Feel free to contact us if the problem persists.'}
                </h2>
                <h2 className='error-header-sub'>
                    Try <Link to={``} onClick={()=> window.location.reload()}>refreshing</Link> or 
                    go <Link to={`/user/${id}/`}>back to your profile</Link>.
                </h2>
            </div>
            <div className='error-img'></div>
        </section>
    );

}
 
export default Error;