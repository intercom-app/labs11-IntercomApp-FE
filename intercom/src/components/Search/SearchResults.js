import React from 'react';

const SearchResults = (props) => {
    return (
        <>
            {props.users.length === 0 ? <p className="no-groups media">No users matched your search.</p> : 
            <>
            {props.users.map(user => (
                <div className="media" key={user.id}>
                    <div className="media-body">
                        <h4 className="media-heading">{user.displayName}</h4>
                        {user.email}
                        {user.buttonInvite
                            ? <button
                                className="btn btn-join pull-right"
                                type="button"
                                onClick={(e) => props.inviteUser(e, user.id)}
                            >
                                Invite
                                </button>
                            : <button
                                className="btn btn-primary pull-right"
                                type="button"
                                disabled
                            >
                                Invited
                                </button>
                        }
                    </div>
                </div>
            ))}
            </>}
        </>
    );
}

export default SearchResults;