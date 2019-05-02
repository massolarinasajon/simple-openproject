const https = require('https');

const options = {
    hostname: 'projetos.nasajon.com.br',
    path: '/api/v3/projects/gestao-de-projetos/work_packages?pageSize=10',
    method: 'GET',
    auth: 'apikey:fabd9843955242e330a361131107b713557d599d',
    headers: {
        'Content-Type': 'application/json'
    }
};

module.exports = {

    get() {
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
};
