import React from 'react';
import './App.css';
import Table from './components/Table';
import Filtro from './components/Filtro';
import 'bulma';

function App() {
    return (
        <section className="section">
            <div className="container">
                <Filtro />
                <Table />
            </div>
        </section>
    );
}

export default App;
