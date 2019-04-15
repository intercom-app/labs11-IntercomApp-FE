import React from 'react';



const GroupMembersList = (props) => {

    const getDateTime = (date) => {
        const dateStr = new Date(date).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        const today = new Date().toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        if (dateStr !== today) {
            return dateStr
        } else {
            return new Date(date).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
            })
        }
    }

    let { isOwner, membersDetails, userId, removeUser } = props
    console.log(membersDetails)
    return (
        <>
            <h1 className="page-header sidebar-title">
                Group Members
            </h1>

                    <div className="row blogu" >
                        {/* <div className="col-sm-8 col-md-8">
                            <h4 className="blog-title">
                                {member.displayName}
                            </h4>
                        </div> */}
                        <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col">Email</th>                                        
                                        <th scope="col">Time Joined</th>
                                    </tr>
                                </thead>
                                {membersDetails.map((member, ind) =>
                                    <tbody key={member.id}>
                                        <tr>
                                            <td style={{ width: '15%' }}>
                                                <img className='avatar-img-act' style={{width: '45%', borderRadius: '50%'}} src={member.avatar || require('../../images/avatar1.png')} alt="user avatar" />
                                            </td>
                                            <td style={{ width: '15%', paddingTop: '2.5%' }}>
                                                {member.displayName}
                                            </td>
                                            <td style={{ width: '22%', paddingTop: '2.5%' }}>
                                                {member.email}
                                            </td>
                                            <td style={{ width: '20%', paddingTop: '2.5%' }}><i className="fa fa-calendar-o"></i>
                                                {' '}{getDateTime(member.createdAt)}
                                            </td>
                                                {isOwner
                                                    ? <>
                                                        {member.id === userId
                                                            ? <td style={{ width: '20%', paddingTop: '2.5%' }}>
                                                                <button
                                                                    className="btn btn-primary pull-right rounded"
                                                                    type="button"
                                                                    disabled
                                                                    >
                                                                        Owner
                                                                </button>
                                                            </td>
                                                            : <td style={{ width: '20%', paddingTop: '2.5%' }}>
                                                                <button
                                                                    className="btn btn-primary hvr-bounce-to-bottom rounded"
                                                                    type="button"
                                                                    onClick={(e) => removeUser(e, member.id, member.displayName)}
                                                                >
                                                                Remove Member
                                                                </button>
                                                            </td>
                                                        }
                                                    </>
                                                    : null
                                                }
                                            
                                        </tr>
                                    </tbody>
                                 )}
                            </table>
                        {/* <div className="col-xs-12 col-sm-12 col-md-12" style={{ padding: "3px 0px 5px 15px" }}>
                            <div className="col-xs-1 col-sm-1 col-md-1" style={{ padding: "0px" }}>
                                <img className="avatar-img" src={member.avatar || require('../../images/avatar1.png')} alt="user avatar" />
                            </div>

                            <div className="col-xs-3 col-sm-3 col-md-3" style={{ padding: "1.5% 0px 0px 0px" }}>
                                {member.displayName}
                            </div>

                            <div className="col-xs-4 col-sm-4 col-md-4" style={{ padding: "1.5% 0px 0px 0px" }}>
                                {member.email}
                            </div>

                            <div className="col-xs-11 col-xs-offset-1 col-sm-2 col-sm-offset-0 col-md-2 col-md-offset-0" style={{ padding: "1.5% 0px 0px 0px" }}>
                                <i className="fa fa-calendar-o"></i>
                                {' '}
                                {getDateTime(member.createdAt)}
                            </div>
                        </div> */}
                        <>
                            {/* {isOwner
                                ? <>
                                    {member.id === userId
                                        ?   <button 
                                                className="btn btn-primary btn-noborder-radius pull-right" 
                                                type="button" 
                                                disabled
                                            >
                                                Owner
                                            </button>
                                        :   <button 
                                                className="btn btn-primary btn-noborder-radius hvr-bounce-to-bottom pull-right" 
                                                type="button" 
                                                onClick={(e) => removeUser(e, member.userId, member.displayName)}
                                            >
                                                Remove Member
                                            </button>
                                    }
                                </>
                                : null
                            } */}
                            </>
                    </div>
                    <hr></hr>


        </>

    );
}

export default GroupMembersList;