const { Verifier } = require('@pact-foundation/pact');
const { before, describe, it } = require('mocha');
const path = require('path');

const pactFile = path.resolve(
  './test/contract/pacts/node-server-client-microservice-booking.json',
);

let port;
let opts;

describe('Pact Verification', () => {
  before(async () => {
    port = 3000;

    opts = {
      provider: 'microservice-booking',
      providerBaseUrl: `http://localhost:${port}`,
      logLevel: 'info',
      pactUrls: [pactFile],
    };
  });
  it('Valida lo que espera el API del Cliente', () => {
    console.log(opts);
    return new Verifier(opts)
      .verifyProvider()
      .then((output) => {
        console.log('Pact Verification Complete!');
        console.log(output);
      })
      .catch((e) => {
        console.error('Pact verification failed :(', e);
      });
  });
});
