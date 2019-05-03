const https = require('https');

const getOptions = () => ({
    hostname: 'projetos.nasajon.com.br',
    path: '/api/v3/',
    method: 'GET',
    auth: 'apikey:fabd9843955242e330a361131107b713557d599d',
    headers: {
        'Content-Type': 'application/json'
    }
});

const request = path => {
    const options = getOptions();
    options.path += path;
    return new Promise((resolve, reject) => {
        console.log('Sending request...');
        const req = https.request(options, res => {
            res.setEncoding('utf8');
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        });
        console.log('Request sent!');
        req.on('error', reject);
        req.end();
    });
}

module.exports = {
    getTasks(page = 1) {
        return request(`projects/gestao-de-projetos/work_packages?pageSize=10&offset=${page}`);
    },

    getStatuses() {
        return request('statuses');
    }
};
