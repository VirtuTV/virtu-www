import express from 'express';
import request from 'request';
import '../server.js';

const app = express();

describe('Node Server', () => {
  it('Main page status', function() {
    request('http://localhost:3000' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
    });
});
});