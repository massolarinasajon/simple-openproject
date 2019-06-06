import React, { Component } from 'react';

export default class ModalEdit extends Component {
    constructor() {
        super();
        // this.state = {
        //     pageSize: 1,
        //     listSize: 1,
        //     tasks: [],
        //     loadingTasks: true,
        //     statuses: [],
        //     task: {}
        // };
    }

    render() {
        return (
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">#{this.props.task.id}</p>
                        <button className="delete" onClick={() => this.props.onCancelar()} aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">Assunto</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Assunto" value={this.props.task.subject} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Descrição</label>
                            <div className="control">
                                <textarea className="textarea" placeholder="Descrição">{this.props.task.description.raw}</textarea>
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success">Salvar</button>
                        <button className="button" onClick={() => this.props.onCancelar()}>Cancelar</button>
                    </footer>
                </div>
            </div>
        )
    }
}
