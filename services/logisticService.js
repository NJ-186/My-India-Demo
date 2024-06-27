const nock = require('nock');

const mockLogistics = () => {
    nock('https://logistics.example.com')
        .post('/api/shipments')
        .reply(200, {
            id: 'shp_1J2Y6Y2eZvKYlo2C3B1d',
            status: 'shipped'
        });
};

module.exports = { mockLogistics };
