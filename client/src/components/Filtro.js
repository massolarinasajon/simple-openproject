import React, { Component } from 'react';

export default class Filtro extends Component {
    constructor() {
        super();
        this.state = {
            assunto: '',
            status: 0
        };
    }

    filtrar() {

    }

    render() {
        return (
            <form onSubmit={this.filtrar.bind(this)}>
                <input type="text" />
                <select>
                    <option value="0">Aberto</option>
                </select>
                <button>Filtrar</button>
            </form>
        )
    }

}

