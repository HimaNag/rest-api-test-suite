import { APIRequestContext } from '@playwright/test';

export class ApiClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get(endpoint: string) {
    const response = await this.request.get(endpoint);
    const body = await response.json();
    return { status: response.status(), body };
  }

  async post(endpoint: string, data: object) {
    const response = await this.request.post(endpoint, { data });
    const body = await response.json();
    return { status: response.status(), body };
  }

  async put(endpoint: string, data: object) {
    const response = await this.request.put(endpoint, { data });
    const body = await response.json();
    return { status: response.status(), body };
  }

  async delete(endpoint: string) {
    const response = await this.request.delete(endpoint);
    return { status: response.status() };
  }
}
