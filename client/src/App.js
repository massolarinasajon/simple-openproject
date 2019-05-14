import React from 'react';
import 'bulma';
import Table from './components/Table';
import Filtro from './components/Filtro';

function App() {
    return (
        <section className="section">
			<Filtro />
			<Table />
        </section>
    );
}

export default App;
