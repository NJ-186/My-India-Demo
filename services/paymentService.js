const nock = require('nock');

const mockStripe = () => {
    nock('https://api.stripe.com')
        .post('/v1/charges')
        .reply(200, {
            id: 'ch_1J2Y5Y2eZvKYlo2C1V2b',
            amount: 1000,
            currency: 'usd',
            status: 'succeeded'
        });
};

const mockPayPal = () => {
    nock('https://api.paypal.com')
        .post('/v1/payments/payment')
        .reply(200, {
            id: 'PAY-1AB23456CD789012EF34GHIJ',
            intent: 'sale',
            state: 'approved'
        });
};

module.exports = { mockStripe, mockPayPal };
