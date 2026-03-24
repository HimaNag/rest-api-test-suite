import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/clients/ApiClient';
import { validateSchema } from '../../src/utils/schemaValidator';
import { Post } from '../../src/types/user.types';

test.describe('Posts API — CRUD', () => {

  test('GET /posts — returns 200 and list of posts', async ({ request }) => {
    const client = new ApiClient(request);

    const { status, body } = await client.get('/posts');

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    validateSchema(body[0], ['id', 'userId', 'title', 'body']);
  });

  test('GET /posts/1 — returns 200 and single post', async ({ request }) => {
    const client = new ApiClient(request);

    const { status, body } = await client.get('/posts/1');

    expect(status).toBe(200);
    validateSchema(body, ['id', 'userId', 'title', 'body']);
    expect(body.id).toBe(1);
  });

  test('GET /posts/999 — returns 404 for non-existent post', async ({ request }) => {
    const client = new ApiClient(request);

    const { status } = await client.get('/posts/999');

    expect(status).toBe(404);
  });

  test('GET /posts?userId=1 — returns posts filtered by userId', async ({ request }) => {
    const client = new ApiClient(request);

    const { status, body } = await client.get('/posts?userId=1');

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBeTruthy();
    body.forEach((post: Post) => {
      expect(post.userId).toBe(1);
    });
  });

  test('POST /posts — creates a new post and returns 201', async ({ request }) => {
    const client = new ApiClient(request);
    const newPost: Post = {
      userId: 1,
      title: 'Automated API Testing with Playwright',
      body: 'This post was created by an automated test.',
    };

    const { status, body } = await client.post('/posts', newPost);

    expect(status).toBe(201);
    validateSchema(body, ['id', 'userId', 'title', 'body']);
    expect(body.title).toBe('Automated API Testing with Playwright');
  });

  test('PUT /posts/1 — updates post and returns 200', async ({ request }) => {
    const client = new ApiClient(request);
    const updatedPost: Post = {
      userId: 1,
      title: 'Updated Post Title',
      body: 'Updated post body content.',
    };

    const { status, body } = await client.put('/posts/1', updatedPost);

    expect(status).toBe(200);
    expect(body.title).toBe('Updated Post Title');
  });

  test('DELETE /posts/1 — deletes post and returns 200', async ({ request }) => {
    const client = new ApiClient(request);

    const { status } = await client.delete('/posts/1');

    expect(status).toBe(200);
  });

});
