import React from 'react';
import 'bulma';
import Table from './components/Table';
import Filtro from './components/Filtro';

const App = () => (
    <section className="section">
        <div className="container">
            <Filtro />
            <Table />
        </div>
    </section>
);

export default App;
