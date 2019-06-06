import React, { Component } from 'react';

export default class Loader extends Component {
    render() {
        return (
            <div className={`modal is-clipped ${(this.props.show) ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div style={{ 'overflowY': 'hidden' }} className="modal-content has-text-centered is-size-2">
                            <div className="loader"></div>
                </div>
            </div>
        )
    }
}
