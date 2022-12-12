export const API_KEY = 'asdf';

export const mockCheckApiKeyValid = jest.fn(async (apiKey: string) => {
  if (apiKey === API_KEY) {
    return true;
  } else {
    return false;
  }
});
