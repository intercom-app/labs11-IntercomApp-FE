import React from 'react';
// import { Row, Table, Button } from 'reactstrap';

const GroupMembersList = (props) => {
    let { isOwner, members, userId, removeUser } = props
    return (
        <>
            <h1 className="page-header sidebar-title">
                Group Members
            </h1>

            {members.map(member => (
                <div key={member.groupId}>
                    <div className="row blogu" >
                        <div className="col-sm-8 col-md-8">
                            <h3 className="blog-title">
                                {member.displayName}
                            </h3>
                            <>
                            {isOwner
                                ? <>
                                    {member.userId === userId
                                        ?   <button 
                                                className="btn btn-primary btn-noborder-radius" 
                                                type="button" 
                                                disabled
                                            >
                                                Owner
                                            </button>
                                        :   <button 
                                                className="btn btn-primary btn-noborder-radius hvr-bounce-to-bottom" 
                                                type="button" 
                                                onClick={(e) => removeUser(e, member.userId, member.displayName)}
                                            >
                                                Remove Member
                                            </button>
                                    }
                                </>
                                : null
                            }
                            </>
                        </div>
                    </div>
                    <hr></hr>
                </div>

            ))}

        </>

    );
}

export default GroupMembersList;