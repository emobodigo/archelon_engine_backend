import app from '../../../src/app';
import supertest from 'supertest';
import { API_KEY, mockCheckApiKeyValid } from './mock';
import ArchelonConfigRepo from '../../../src/database/repository/ArchelonConfigRepo';

describe('API Key Validation', () => {
  const endpoint = '/api/v1';
  const request = supertest(app);

  jest.spyOn(ArchelonConfigRepo, 'checkApiKeyValid').mockImplementation(mockCheckApiKeyValid);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should response with 400 if x-api-key header is not passed', async () => {
    const response = await request.get(endpoint).timeout(2000);
    expect(response.status).toBe(400);
    expect(mockCheckApiKeyValid).not.toBeCalled();
  });

  it('Should response with 403 if wrong x-api-key header is passed', async () => {
    const wrongApiKey = '123';
    const response = await request.get(endpoint).set('x-api-key', wrongApiKey).timeout(2000);
    expect(response.status).toBe(403);
    expect(mockCheckApiKeyValid).toBeCalledTimes(1);
    expect(mockCheckApiKeyValid).toBeCalledWith(wrongApiKey);
  });

  it('Should response with 404 if correct x-api-key header is passed and route is not handled', async () => {
    const response = await request.get(endpoint).set('x-api-key', API_KEY).timeout(2000);
    expect(response.status).toBe(404);
    expect(mockCheckApiKeyValid).toBeCalledTimes(1);
    expect(mockCheckApiKeyValid).toBeCalledWith(API_KEY);
  });
});
