import React from 'react';

const GroupChatroomCall = props => {

    return (
        <>
            <button>
                {props.group.callStatus = 0 ? 'Start Chat' : 'Join Chat'}
            </button>
        </>
    )

}


export default GroupChatroomCall;