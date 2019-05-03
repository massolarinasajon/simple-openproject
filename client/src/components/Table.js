import React, { Component } from 'react';
import Loader from './Loader';

export default class Table extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            totalPage: 1,
            tasks: [],
            loadingTasks: true,
            statuses: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    getTasks() {
        fetch(`/api/tasks?page=${this.state.page}`)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    tasks: response._embedded.elements,
                    page: response.offset,
                    totalPage: Math.ceil(response.total / response.pageSize),
                    loadingTasks: false
                });
            });
    }

    getData() {
        this.getTasks();
        fetch('/api/statuses')
            .then(response => response.json())
            .then(statuses => this.setState({ statuses }));
    }

    changePage(page) {
        this.setState({
            page,
            loadingTasks: true
        }, this.getTasks);
    }

    render() {
        return (
            <div>
                <Loader show={this.state.loadingTasks}/>
                <table className="table is-striped is-hoverable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Assunto</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="lista">
                        {
                            this.state.tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.subject}</td>
                                    <td>
                                        <div className={`select ${(this.state.statuses.length === 0) ? 'is-loading' : ''}`}>
                                            <select value={task._links.status.href} disabled={this.state.statuses.length === 0}>
                                                {this.state.statuses.map(status => <option key={status.id} value={status._links.self.href}>{status.name}</option>)}
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <nav className="pagination" role="navigation" aria-label="pagination">
                    <ul className="pagination-list">
                        {
                            Array(this.state.totalPage).fill()
                                .map((_, i) => i + 1)
                                .map(n => (
                                <li key={n}>
                                    <button onClick={() => { this.changePage(n) }} className={`button pagination-link ${(this.state.page === n) ? 'is-current' : ''}`} aria-label={`Page ${n}`} aria-current="page">{n}</button>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        )
    }
}
