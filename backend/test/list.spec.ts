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

  it('GET /lists', async () => {
    const response = await request(app.getHttpServer())
      .get('/lists')
      .expect(200)

    expect(response.body).toHaveLength(4);
    const element = response.body[0]

    expect(element).toHaveProperty('id');
    expect(element.id).toEqual(1)

    expect(element).toHaveProperty('name');
    expect(element.name).toEqual('TestList1');
  });

  it('GET /lists/:id', async () => {
    const response = await request(app.getHttpServer())
      .get('/lists/1')
      .expect(200)

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('todos');
    expect(response.body).toHaveProperty('name');

    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual('TestList1');
    expect(response.body.todos).toHaveLength(3);

    const element = response.body.todos[0];
    expect(element).toHaveProperty('id');
    expect(element).toHaveProperty('title');
    expect(element).toHaveProperty('description');

    expect(element.id).toEqual(1);
    expect(element.title).toEqual('Do something 1');
    expect(element.description).toEqual('Description to do something 1');

  });

  it('GET /lists/:id (nonexistent)', async () => {
    const response = await request(app.getHttpServer())
      .get('/lists/99')
      .expect(404)

    expect(response.body).toHaveProperty('error')
    expect(response.body).toHaveProperty('message')
  });

  it('POST /lists', async () => {
    const response = await request(app.getHttpServer())
      .post('/lists')
      .send({
        name: 'Newly created list!'
      })
      .expect(201)

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');

    expect(response.body.id).toEqual(5);
    expect(response.body.name).toEqual('Newly created list!');
    expect(response.body.createdAt).not.toBeNull();
    expect(response.body.updatedAt).not.toBeNull();

    const response2 = await request(app.getHttpServer())
      .get('/lists')
      .expect(200)

    expect(response2.body).toHaveLength(seed.LISTS_AMOUNT + 1);
  });

  it('POST /lists (empty name)', async () => {
    const response = await request(app.getHttpServer())
      .post('/lists')
      .send({
        name: ''
      })
      .expect(400)

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');

    const response2 = await request(app.getHttpServer())
      .get('/lists')
      .expect(200)

    expect(response2.body).toHaveLength(seed.LISTS_AMOUNT);
  });

  it('POST /lists (empty body {})', async () => {
    const response = await request(app.getHttpServer())
      .post('/lists')
      .send({})
      .expect(400)

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');

    const response2 = await request(app.getHttpServer())
      .get('/lists')
      .expect(200)

    expect(response2.body).toHaveLength(seed.LISTS_AMOUNT);
  });

  it('POST /lists (without payload)', async () => {
    const response = await request(app.getHttpServer())
      .post('/lists')
      .expect(400)

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');

    const response2 = await request(app.getHttpServer())
      .get('/lists')
      .expect(200)

    expect(response2.body).toHaveLength(seed.LISTS_AMOUNT);
  });

  it('DELETE /lists/:id (with cascade check)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/lists/1')
      .expect(200)

    expect(response.body).toHaveProperty('affected');
    expect(response.body.affected).toEqual(1);

    const response2 = await request(app.getHttpServer())
      .get('/lists')
      .expect(200)
    const listOfLists = response2.body;
    expect(listOfLists).toHaveLength(seed.LISTS_AMOUNT - 1);

    const response3 = await request(app.getHttpServer())
      .get('/todos')
      .expect(200)
    const listOfTodos = response3.body
    expect(listOfTodos).toHaveLength(seed.TODOS_AMOUNT - 3);
  });

  it('DELETE /lists/:id (nonexistent)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/lists/99')
      .expect(200)

    expect(response.body).toHaveProperty('affected');
    expect(response.body.affected).toEqual(0);
  });

  it('PUT /lists/:id', async () => {
    const response = await request(app.getHttpServer())
      .put('/lists/1')
      .send({
        name: 'Updated my list!'
      })
      .expect(200)

    expect(response.body).toHaveProperty('affected');
    expect(response.body.affected).toEqual(1);

    const response2 = await request(app.getHttpServer())
      .get('/lists/1')
      .expect(200)

    const updatedList = response2.body;
    expect(updatedList).toHaveProperty('name');
    expect(updatedList.name).toEqual('Updated my list!')
  });

  it('PUT /lists/:id (empty name)', async () => {
    const response = await request(app.getHttpServer())
      .put('/lists/1')
      .send({
        name: ''
      })
      .expect(400)

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');
  });

  it('PUT /lists/:id (empty body {})', async () => {
    const response = await request(app.getHttpServer())
      .put('/lists/1')
      .send({})
      .expect(400)

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');
  });

  it('PUT /lists/:id (without payload)', async () => {
    const response = await request(app.getHttpServer())
      .put('/lists/1')
      .expect(400)

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');
  });

  it('PUT /lists/:id (nonexistent)', async () => {
    const response = await request(app.getHttpServer())
      .put('/lists/99')
      .send({
        name: 'Newly updated name!'
      })
      .expect(404)

    expect(response.body).toHaveProperty('error');
    expect(response.body).toHaveProperty('message');
  });

  afterAll(async () => {
    await app.close();
  });
});
