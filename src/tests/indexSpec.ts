import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('test main route', () => {
  it('get /api OK', (done) => {
    spyOn(console, 'log');
    request
      .get('/api')
      .expect(200)
      .end((err, res) => {
        expect(res.text).toEqual('main api route');
        done();
      });
  });
});
