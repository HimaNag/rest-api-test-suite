import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/clients/ApiClient';
import { validateSchema } from '../../src/utils/schemaValidator';
import { User } from '../../src/types/user.types';

test.describe('Users API — CRUD', () => {

  test('GET /users — returns 200 and list of users', async ({ request }) => {
    const client = new ApiClient(request);

    const { status, body } = await client.get('/users');

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    validateSchema(body[0], ['id', 'name', 'username', 'email']);
  });

  test('GET /users/1 — returns 200 and single user', async ({ request }) => {
    const client = new ApiClient(request);

    const { status, body } = await client.get('/users/1');

    expect(status).toBe(200);
    validateSchema(body, ['id', 'name', 'username', 'email']);
    expect(body.id).toBe(1);
  });

  test('GET /users/999 — returns 404 for non-existent user', async ({ request }) => {
    const client = new ApiClient(request);

    const { status } = await client.get('/users/999');

    expect(status).toBe(404);
  });

  test('POST /users — creates a new user and returns 201', async ({ request }) => {
    const client = new ApiClient(request);
    const newUser: User = {
      name: 'Himabindu',
      username: 'hima',
      email: 'hima@test.com',
      phone: '1234567890',
      website: 'hima.dev',
    };

    const { status, body } = await client.post('/users', newUser);

    expect(status).toBe(201);
    validateSchema(body, ['id', 'name', 'username', 'email']);
    expect(body.name).toBe('Himabindu');
  });

  test('PUT /users/1 — updates user and returns 200', async ({ request }) => {
    const client = new ApiClient(request);
    const updatedUser: User = {
      name: 'Hima Updated',
      username: 'hima_updated',
      email: 'hima_updated@test.com',
      phone: '9999999999',
      website: 'hima-updated.dev',
    };

    const { status, body } = await client.put('/users/1', updatedUser);

    expect(status).toBe(200);
    expect(body.name).toBe('Hima Updated');
  });

  test('DELETE /users/1 — deletes user and returns 200', async ({ request }) => {
    const client = new ApiClient(request);

    const { status } = await client.delete('/users/1');

    expect(status).toBe(200);
  });

});
