import React, { Component } from "react";

class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmUserName: ""
    };
  }

  handleGroupInput = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
}

  render() {
    return (
      <div>
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#deleteModal"
        >
          Delete Account
        </button>

        <div
          class="modal fade"
          id="deleteModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="deleteModalTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="deleteModalLongTitle">
                  Type your full email address below and click Confirm Deletion to delete your account 
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <input type="text" name="confirmUserName" onChange={this.handleGroupInput} value={this.state.confirmUserName} />
              </div>
              <div class="modal-footer">
                {/* {console.log("props", this.props)} */}
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                {this.state.confirmUserName === this.props.user.email ? <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                  onClick={() => this.props.handleDelete(this.props.user.id)}
                >
                  Confirm Deletion
                </button> : <button
                  type="button"
                  class="btn btn-danger"
                  disabled
                  >
                  Confirm Deletion
                </button> }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteAccount;
