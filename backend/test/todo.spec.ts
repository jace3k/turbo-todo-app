import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getValidationPipeOptions } from '../src/config/validation-pipe.options';
import { Seed } from '../scripts/seed';

describe('Lists Module', () => {
  let app: INestApplication;
  let seed: Seed;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe(getValidationPipeOptions()));
    await app.init();
    seed = new Seed();
  });

  beforeEach(async () => {
    await seed.clearAndSeed();
  });

  it('GET /todos', async () => {
    const response = await request(app.getHttpServer())
      .get('/todos')
      .expect(200)

    expect(response.body).toHaveLength(6);
    const element = response.body[0]

    expect(element).toHaveProperty('id');


    expect(element).toHaveProperty('id');
    expect(element).toHaveProperty('title');
    expect(element).toHaveProperty('description');
    expect(element).toHaveProperty('list');

    expect(element.id).toEqual(1);
    expect(element.title).toEqual('Do something 1');
    expect(element.description).toEqual('Description to do something 1');
    expect(element.list).toEqual(1);
    //... TODO
  });

  it('GET /todos/:id', async () => {
    const response = await request(app.getHttpServer())
      .get('/todos/1')
      .expect(200)

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('list');

    expect(response.body.id).toEqual(1);
    expect(response.body.title).toEqual('Do something 1');
    expect(response.body.description).toEqual('Description to do something 1');
    expect(response.body.list).toEqual(1);

  });

  it('GET /todos/:id (nonexistent)', async () => {
    const response = await request(app.getHttpServer())
      .get('/todos/99')
      .expect(404)

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');

  });

  it('POST /todos', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .send({
        title: 'Newly created todo!',
        description: 'newly created todo description',
        list: 1
      })
      .expect(201)

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('list');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');

    expect(response.body.id).toEqual(7);
    expect(response.body.title).toEqual('Newly created todo!');
    expect(response.body.description).toEqual('newly created todo description');
    expect(response.body.list).toEqual(1);
    expect(response.body.createdAt).not.toBeNull();
    expect(response.body.updatedAt).not.toBeNull();

    const response2 = await request(app.getHttpServer())
      .get('/todos')
      .expect(200)

    expect(response2.body).toHaveLength(seed.TODOS_AMOUNT + 1);
  });

  it('POST /todos (empty title)', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .send({
        title: '',
        description: 'newly created todo description',
        list: 1
      })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');

    const response2 = await request(app.getHttpServer())
      .get('/todos')
      .expect(200)

    expect(response2.body).toHaveLength(seed.TODOS_AMOUNT);
  });

  it('POST /todos (without title)', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .send({
        description: 'newly created todo description',
        list: 1
      })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');

    const response2 = await request(app.getHttpServer())
      .get('/todos')
      .expect(200)

    expect(response2.body).toHaveLength(seed.TODOS_AMOUNT);
  });

  it('POST /todos (too short title)', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .send({
        title: 'a',
        description: 'newly created todo description',
        list: 1
      })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');

    const response2 = await request(app.getHttpServer())
      .get('/todos')
      .expect(200)

    expect(response2.body).toHaveLength(seed.TODOS_AMOUNT);
  });

  it('POST /todos (without description)', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .send({
        title: 'Newly created todo!',
        list: 1
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('list');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');

    expect(response.body.title).toEqual('Newly created todo!');
    expect(response.body.description).toEqual('');
    expect(response.body.list).toEqual(1);
    expect(response.body.createdAt).not.toBeNull();
    expect(response.body.updatedAt).not.toBeNull();

    const response2 = await request(app.getHttpServer())
      .get('/todos')
      .expect(200)

    expect(response2.body).toHaveLength(seed.TODOS_AMOUNT + 1);
  });

  it('POST /todos (empty body {})', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');

    const response2 = await request(app.getHttpServer())
      .get('/todos')
      .expect(200)

    expect(response2.body).toHaveLength(seed.TODOS_AMOUNT);
  });

  it('POST /todos (without payload)', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');

    const response2 = await request(app.getHttpServer())
      .get('/todos')
      .expect(200)

    expect(response2.body).toHaveLength(seed.TODOS_AMOUNT);
  });

  it('DELETE /todos/:id', async () => {
    const response = await request(app.getHttpServer())
      .delete('/todos/1')
      .expect(200);

    expect(response.body).toHaveProperty('affected');
    expect(response.body.affected).toEqual(1);

    const response2 = await request(app.getHttpServer())
      .get('/todos')
      .expect(200)
    const listOfTodos = response2.body
    expect(listOfTodos).toHaveLength(seed.TODOS_AMOUNT - 1);
  });

  it('DELETE /todos/:id (nonexistent)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/todos/99')
      .expect(200)

    expect(response.body).toHaveProperty('affected');
    expect(response.body.affected).toEqual(0);
  });

  it('PUT /todos/:id', async () => {
    const response = await request(app.getHttpServer())
      .put('/todos/1')
      .send({
        title: 'Updated my todo!',
        description: 'updated my todo description'
      })
      .expect(200)

    expect(response.body).toHaveProperty('affected');
    expect(response.body.affected).toEqual(1);

    const response2 = await request(app.getHttpServer())
      .get('/todos/1')
      .expect(200)

    const updatedList = response2.body;
    expect(updatedList).toHaveProperty('id');
    expect(updatedList).toHaveProperty('title');
    expect(updatedList).toHaveProperty('description');
    expect(updatedList).toHaveProperty('list');

    expect(updatedList.id).toEqual(1);
    expect(updatedList.title).toEqual('Updated my todo!')
    expect(updatedList.description).toEqual('updated my todo description');
    expect(updatedList.list).toEqual(1);
  });

  it('PUT /todos/:id (update only description)', async () => {
    const response = await request(app.getHttpServer())
      .put('/todos/1')
      .send({
        description: 'updated my todo description'
      })
      .expect(200)

    expect(response.body).toHaveProperty('affected');
    expect(response.body.affected).toEqual(1);

    const response2 = await request(app.getHttpServer())
      .get('/todos/1')
      .expect(200)

    const updatedList = response2.body;
    expect(updatedList).toHaveProperty('id');
    expect(updatedList).toHaveProperty('title');
    expect(updatedList).toHaveProperty('description');
    expect(updatedList).toHaveProperty('list');

    expect(updatedList.id).toEqual(1);
    expect(updatedList.title).toEqual('Do something 1');
    expect(updatedList.description).toEqual('updated my todo description');
    expect(updatedList.list).toEqual(1);
  });

  it('PUT /todos/:id (update list)', async () => {
    const response = await request(app.getHttpServer())
      .put('/todos/1')
      .send({
        list: 3
      })
      .expect(200)

    expect(response.body).toHaveProperty('affected');
    expect(response.body.affected).toEqual(1);

    const response2 = await request(app.getHttpServer())
      .get('/todos/1')
      .expect(200)

    const updatedList = response2.body;
    expect(updatedList).toHaveProperty('id');
    expect(updatedList).toHaveProperty('title');
    expect(updatedList).toHaveProperty('description');
    expect(updatedList).toHaveProperty('list');

    expect(updatedList.id).toEqual(1);
    expect(updatedList.title).toEqual('Do something 1');
    expect(updatedList.description).toEqual('Description to do something 1');
    expect(updatedList.list).toEqual(3);
  });

  it('PUT /todos/:id (empty title)', async () => {
    const response = await request(app.getHttpServer())
      .put('/todos/1')
      .send({
        title: ''
      })
      .expect(400)

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');
  });

  it('PUT /todos/:id (empty body {})', async () => {
    const response = await request(app.getHttpServer())
      .put('/todos/1')
      .send({})
      .expect(400)

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');
  });

  it('PUT /todos/:id (nonexistent)', async () => {
    const response = await request(app.getHttpServer())
      .put('/todos/99')
      .send({
        description: 'updated my todo description'
      })
      .expect(404)

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');
  });

  afterAll(async () => {
    await app.close();
  });
});
