import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getValidationPipeOptions } from '../src/config/validation-pipe.options';

describe('Users Module', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe(getValidationPipeOptions()));
    await app.init();
  });

  it('POST /auth/register (username and password too short)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'a',
        password: 'b'
      })
      .expect(400);

    expect(response.body).toHaveProperty('message');
    const { message } = response.body;

    expect(message).toHaveLength(2);
  });

  it('POST /auth/register (username too short)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'a',
        password: 'bbbb'
      })
      .expect(400);

    expect(response.body).toHaveProperty('message');
    const { message } = response.body;

    expect(message).toHaveLength(1);
  });

  it('POST /auth/register (password too short)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'aaaa',
        password: 'b'
      })
      .expect(400);

    expect(response.body).toHaveProperty('message');
    const { message } = response.body;

    expect(message).toHaveLength(1);
  });

  it('POST /auth/register (empty body)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('message');
    const { message } = response.body;

    expect(message).toHaveLength(4);
  });

  it('Register + login + getProfile (full scenario)', async () => {

    // REGISTER
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'test',
        password: 'test123'
      })
      .expect(201);

    expect(response.body).toHaveProperty('username');
    const { username } = response.body;

    expect(username).toEqual('test');

    // REGISTER SAME USER
    const responseSameUser = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'test',
        password: 'test123'
      })
      .expect(409);

    expect(responseSameUser.body).toHaveProperty('error');
    const { error } = responseSameUser.body;

    expect(error).toEqual('Conflict');

    // WRONG LOGIN
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'test',
        password: 'test12345',
      })
      .expect(401);

    // CORRECT LOGIN
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'test',
        password: 'test123',
      })
      .expect(201);

    expect(loginResponse.body).toHaveProperty('access_token');
    const { access_token } = loginResponse.body;
    console.log('acc', access_token);

    // GET PROFILE WITHOUT TOKEN
    await request(app.getHttpServer())
      .get('/auth/profile')
      .expect(401);

    // CORRECT PROFILE
    const profileResponse = await request(app.getHttpServer())
      .get('/auth/profile')
      .auth(access_token, { type: "bearer" })
      .expect(200);

    expect(profileResponse.body).toHaveProperty('username');
    const { username: profileUsername } = profileResponse.body;
    
    expect(profileUsername).toEqual('test');
  });
});