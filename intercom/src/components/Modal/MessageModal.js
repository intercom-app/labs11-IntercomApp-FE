// MessageModal expects to have the following variables passed to props:
// type: text displayed on button and header

import React, { Component } from "react";

class MessageModal extends Component {

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-delete"
          data-toggle="modal"
          data-target="#messageModal"
        >
          {`${this.props.type}`}
        </button>

        <div
          className="modal fade"
          id="messageModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="messageModalTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
                <h3 style={{textAlign: 'center'}}>{this.props.type}</h3>
              </div>

              <div className="modal-body">
                <p><strong> 
                    You cannot delete your account while there is an outstanding balance.<br></br>
                    Please add money to your account to continue.
                    </strong>
                </p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  Close
                </button>
              </div>              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageModal;
