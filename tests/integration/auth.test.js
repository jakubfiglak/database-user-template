const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../../models/User');

let server;

const path = '/api/v1/auth/register';

describe(path, () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../../server');
  });

  afterEach(async () => {
    server.close();
    await User.deleteMany({});
  });

  describe('POST /', () => {
    const newUser = {
      email: 'john@gmail.com',
      name: 'John Doe',
      password: 'Abc123',
      passwordConfirm: 'Abc123',
    };

    it('should reject to create an user if a user with the given email already exists', async () => {
      await User.collection.insertOne(newUser);
      const res = await request(server).post(path).send(newUser);
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('already exists');
    });

    it('should reject to create an user if provided passwords do not match', async () => {
      const anotherUser = {
        ...newUser,
      };
      anotherUser.passwordConfirm = 'abc123';
      const res = await request(server).post(path).send(anotherUser);
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('do not match');
    });

    it('should add new user to database', async () => {
      const res = await request(server).post(path).send(newUser);
      expect(res.status).toBe(201);
    });
  });
});
