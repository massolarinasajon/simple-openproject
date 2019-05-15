import React, { Component } from 'react';

export default class Pagination extends Component {
    constructor(props) {
        super();
        this.state = {
            page: props.page || 1
        };
    }

    calculateTotalPage() {
        return Array(Math.ceil(this.props.listSize / this.props.pageSize))
            .fill()
            .map((_, i) => i + 1);
    }

    onChangePage(page) {
        this.setState({
            page
        }, this.props.onChange(page));
    }

    render() {
        return (
            <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                <ul className="pagination-list">
                    {
                        this.calculateTotalPage()
                            .map(n => (
                            <li key={n}>
                                <button onClick={() => { this.onChangePage(n) }} className={`button pagination-link ${(this.state.page === n) ? 'is-current' : ''}`} aria-label={`Page ${n}`} aria-current="page">{n}</button>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        )
    }
}
