import React, { Component } from 'react';
import Loader from './Loader';
import ModalEdit from './ModalEdit';
import Pagination from './Pagination';

export default class Table extends Component {
    constructor() {
        super();
        this.state = {
            pageSize: 1,
            listSize: 1,
            tasks: [],
            loadingTasks: true,
            statuses: [],
            task: {}
        };
    }

    componentDidMount() {
        this.getData();
    }

    getTasks(page = 1) {
        fetch(`/api/tasks?page=${page}`)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    tasks: response._embedded.elements,
                    page: response.offset,
                    pageSize: response.pageSize,
                    listSize: response.total,
                    loadingTasks: false
                });
            });
    }

    getTask(id) {
        this.setState({
            loadingTasks: true
        }, () => {
            fetch(`/api/task/${id}`)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    task: response,
                    loadingTasks: false
                });
            });
        });
    }

    clearTask() {
        console.log('chegou aqui');
        this.setState({ task: {} });
    }

    getData() {
        this.getTasks();
        fetch('/api/statuses')
            .then(response => response.json())
            .then(statuses => this.setState({ statuses }));
    }

    changePage(page) {
        this.setState({
            loadingTasks: true
        }, this.getTasks(page));
    }

    render() {
        return (
            <div>
                <Loader show={this.state.loadingTasks}/>
                { (this.state.task.id) ? <ModalEdit onCancelar={this.clearTask.bind(this)} task={this.state.task} /> : '' }
                <table className="table is-striped is-hoverable is-fullwidth">
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
                                    <td><a href='#' onClick={() => this.getTask(task.id)}>{task.subject}</a></td>
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
                <Pagination onChange={(n) => this.changePage(n)} listSize={this.state.listSize} pageSize={this.state.pageSize}/>
            </div>
        )
    }
}
