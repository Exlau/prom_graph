const app = require('../app');
const request = require('supertest')(app);

describe('test index.js', () => {
  it('should render index page', async () => {
    const res = await request.get('/');
    expect(res.status).toBe(200);
    expect(res.text).toMatch(/Hello Koa 2!/);
  });

  it('should return 401 when login with invalid username or password', async () => {
    const res = await request.post('/login').send({
      username: 'wronguser',
      password: 'wrongpassword',
    });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid username or password');
  });

  it('should return token when login with valid username and password', async () => {
    const res = await request.post('/login').send({
      username: 'testuser',
      password: 'testpassword',
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should return 409 when registry with existing username', async () => {
    const res = await request.post('/registry').send({
      username: 'testuser',
      password: 'testpassword',
    });
    expect(res.status).toBe(409);
    expect(res.body.error).toBe('Username already exists');
  });

  it('should return 201 when registry with new username', async () => {
    const res = await request.post('/registry').send({
      username: 'newuser',
      password: 'newpassword',
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User created');
  });
});

