const supertest = require('supertest');
const Koa = require('koa');
const app = require('../app'); // 引入要测试的Koa应用程序

const AuthorizationToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZXhsYXVtZSIsImlhdCI6MTY4MzQ3ODY2NCwiZXhwIjoxNjg2MDcwNjY0fQ.i6eiriPmcr0t4rH7BXFSeCPqQD6KdXyDhiNjq4XSRuQ'

describe('Test Get dashboard list', () => {
  test('GET /api/users should return list of users', async () => {
    const response = await supertest(app.callback()).get('/dashboard').set("Authorization",`Bearer ${AuthorizationToken}`)
    expect(response.status).toBe(200);
    // expect(response.body).toEqual(expect.arrayContaining([
    //   { id: 1, name: 'John' },
    //   { id: 2, name: 'Jane' },
    // ]));
  });
});

describe('Dashboard API Tests', () => {
  test('GET /dashboard with custom headers', async () => {
    const response = await supertest(app.callback())
      .get('/dashboard')
      .set('Authorization', 'Bearer token')
      .set('Content-Type', 'application/json');

    // 进行断言和其他处理
    // ...
  });

  test('PUT /dashboard with custom headers', async () => {
    const response = await supertest(app.callback())
      .put('/dashboard')
      .set('Authorization', 'Bearer token')
      .set('Content-Type', 'application/json')
      .send({
        title: 'Test Dashboard',
        panels: []
      });

    // 进行断言和其他处理
    // ...
  });

  test('POST /dashboard/new with custom headers', async () => {
    const response = await supertest(app.callback())
      .post('/dashboard/new')
      .set('Authorization', 'Bearer token')
      .set('Content-Type', 'application/json')
      .send({
        title: 'New Dashboard',
        id: 'dashboard1',
        panels: []
      });

    // 进行断言和其他处理
    // ...
  });

  test('POST /dashboard/save with custom headers', async () => {
    const response = await supertest(app.callback())
      .post('/dashboard/save')
      .set('Authorization', 'Bearer token')
      .set('Content-Type', 'application/json')
      .send({
        title: 'Updated Dashboard',
        id: 'dashboard1',
        panels: []
      });

    // 进行断言和其他处理
    // ...
  });
});