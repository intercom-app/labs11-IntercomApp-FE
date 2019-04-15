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

    let { isOwner, members, userId, removeUser } = props
    return (
        <>
            <h1 className="page-header sidebar-title">
                Group Members
            </h1>

            <div className="row blogu" style={{ marginRight: "0px", marginLeft: "0px" }}>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">Email</th>
                            <th scope="col">Joined On</th>
                        </tr>
                    </thead>
                    {members.map( member =>
                        <tbody key={member.id}>
                            <tr>
                                <td style={{ width: '15%' }}>
                                    <img className='avatar-img-act' style={{ width: '45%', borderRadius: '50%' }} src={member.avatar || require('../../images/avatar1.png')} alt="user avatar" />
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
                                                    className="btn btn-primary rounded"
                                                    type="button"
                                                    disabled
                                                >
                                                    Owner
                                                </button>
                                            </td>
                                            : <td style={{ width: '20%', paddingTop: '2.5%' }}>
                                                <button
                                                    className="btn btn-primary rounded"
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

            </div>
            <hr></hr>


        </>

    );
}

export default GroupMembersList;