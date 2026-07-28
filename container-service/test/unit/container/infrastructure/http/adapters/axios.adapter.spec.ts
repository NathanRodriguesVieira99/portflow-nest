import axios, { AxiosError } from 'axios';
import { AxiosAdapter } from '@Infra/http/';
import { internalServerError } from '@/container/application/exceptions';

describe('Http Client', () => {
  const http = AxiosAdapter.create();

  describe('request', () => {
    describe('Http Methods', () => {
      it('should make a successful GET request and return data', async () => {
        const mockResponse = { data: 'Test Data' };

        vi.spyOn(axios, 'request').mockResolvedValueOnce({
          data: mockResponse,
        });

        const result = await http.request<typeof mockResponse, never>({
          url: 'http://fake-endpoint/test',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          params: undefined,
        });

        expect(result).toEqual({
          ok: true,
          value: {
            data: mockResponse.data,
          },
        });
        expect(axios.request).toHaveBeenCalledWith({
          url: 'http://fake-endpoint/test',
          headers: {
            'Content-Type': 'application/json',
            'x-correlation-id': '',
          },
          data: undefined,
          method: 'GET',
          params: undefined,
        });
      });

      it('should make a successful GET request with query params', async () => {
        const mockResponse = { data: 'Test Data' };

        vi.spyOn(axios, 'request').mockResolvedValueOnce({
          data: mockResponse,
        });

        const result = await http.request<typeof mockResponse, never>({
          url: 'http://fake-endpoint/test',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          params: { page: 1, perPage: 10 },
        });

        expect(result).toEqual({
          ok: true,
          value: {
            data: mockResponse.data,
          },
        });
        expect(axios.request).toHaveBeenCalledWith({
          url: 'http://fake-endpoint/test',
          headers: {
            'Content-Type': 'application/json',
            'x-correlation-id': '',
          },
          data: undefined,
          method: 'GET',
          params: { page: 1, perPage: 10 },
        });
      });

      it('should make a successful GET request with custom headers', async () => {
        const mockResponse = { data: 'Test Data' };

        vi.spyOn(axios, 'request').mockResolvedValueOnce({
          data: mockResponse,
        });

        const result = await http.request<typeof mockResponse, never>({
          url: 'http://fake-endpoint/test',
          method: 'GET',
          headers: { Authorization: 'Bearer token' },
          params: undefined,
        });

        expect(result).toEqual({
          ok: true,
          value: {
            data: mockResponse.data,
          },
        });
        expect(axios.request).toHaveBeenCalledWith({
          url: 'http://fake-endpoint/test',
          headers: { Authorization: 'Bearer token', 'x-correlation-id': '' },
          data: undefined,
          method: 'GET',
          params: undefined,
        });
      });

      it('should make a successful POST request and return data', async () => {
        const mockResponse = { data: 'Test Data' };

        vi.spyOn(axios, 'request').mockResolvedValueOnce({
          data: mockResponse,
        });

        const result = await http.request<
          typeof mockResponse,
          { name: string }
        >({
          url: 'http://fake-endpoint/test',
          method: 'POST',
          body: { name: 'Test' },
          headers: { 'Content-Type': 'application/json' },
          params: undefined,
        });

        expect(result).toEqual({
          ok: true,
          value: {
            data: mockResponse.data,
          },
        });
        expect(axios.request).toHaveBeenCalledWith({
          url: 'http://fake-endpoint/test',
          headers: {
            'Content-Type': 'application/json',
            'x-correlation-id': '',
          },
          data: { name: 'Test' },
          method: 'POST',
          params: undefined,
        });
      });

      it('should make a successful POST request with empty body', async () => {
        const mockResponse = { data: 'Test Data' };

        vi.spyOn(axios, 'request').mockResolvedValueOnce({
          data: mockResponse,
        });

        const result = await http.request<typeof mockResponse, null>({
          url: 'http://fake-endpoint/test',
          method: 'POST',
          body: null,
          headers: { 'Content-Type': 'application/json' },
          params: undefined,
        });

        expect(result).toEqual({
          ok: true,
          value: {
            data: mockResponse.data,
          },
        });
        expect(axios.request).toHaveBeenCalledWith({
          url: 'http://fake-endpoint/test',
          headers: {
            'Content-Type': 'application/json',
            'x-correlation-id': '',
          },
          data: null,
          method: 'POST',
          params: undefined,
        });
      });
    });

    describe('Errors', () => {
      it('should throw an axios error when request fails', async () => {
        const axiosError = new AxiosError(
          'request failed',
          undefined,
          undefined,
          undefined,
          {
            data: { error: 'Internal Server Error' },
            status: 500,
            statusText: 'Internal Server Error',
            headers: {},
            config: {} as any,
          },
        );

        vi.spyOn(axios, 'request').mockRejectedValueOnce(axiosError);

        const result = await http.request<null, null>({
          url: 'http://fake-endpoint/test',
          body: null,
          headers: { 'Content-Type': 'application/json' },
          method: 'GET',
          params: undefined,
        });

        expect(result).toEqual({
          ok: false,
          error: expect.objectContaining({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Request failed with status 500 : [object Object]',
            status: 500,
          }),
        });
        expect(axios.request).toHaveBeenCalledWith({
          url: 'http://fake-endpoint/test',
          headers: {
            'Content-Type': 'application/json',
            'x-correlation-id': '',
          },
          data: null,
          method: 'GET',
          params: undefined,
        });
      });

      it('should throw an generic error when request fails', async () => {
        vi.spyOn(axios, 'request').mockRejectedValueOnce(internalServerError());

        const result = await http.request<null, null>({
          url: 'http://fake-endpoint/test',
          body: null,
          headers: { 'Content-Type': 'application/json' },
          method: 'GET',
          params: undefined,
        });

        expect(result).toEqual({
          ok: false,
          error: expect.objectContaining({
            code: 'INTERNAL_SERVER_ERROR',
            message:
              'Request failed with status [object Object] : Internal server error!',
            status: 500,
          }),
        });
        expect(axios.request).toHaveBeenCalledWith({
          url: 'http://fake-endpoint/test',
          headers: {
            'Content-Type': 'application/json',
            'x-correlation-id': '',
          },
          data: null,
          method: 'GET',
          params: undefined,
        });
      });
    });
  });
});
