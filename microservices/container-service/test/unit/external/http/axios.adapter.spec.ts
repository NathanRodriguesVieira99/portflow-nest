import nock from 'nock';
import Sinon from 'sinon';
import axios, { AxiosError } from 'axios';
import { AxiosAdapter } from '@/external/http/axios.adapter';
import type { HttpClientContract } from '@/infra/http/http-client';
import type { HttpCodes } from '@/domain/enums/http-codes.enum';

describe('Http Client', () => {
  let sut: HttpClientContract;

  beforeAll(() => {
    sut = AxiosAdapter.create();
  });

  describe('request', () => {
    describe('Http Methods', () => {
      it('should make a successful GET request and return data', async () => {
        const url = 'http://localhost:4321';
        const endpoint = '/test';
        const expectedHttpCode: HttpCodes = 200;
        const expectedResponseBody = { data: 'Test Data' };
        nock(url).get(endpoint).reply(expectedHttpCode, expectedResponseBody);
        const getSpy = Sinon.spy(axios, 'request');
        const response = await sut.request<typeof expectedResponseBody, never>({
          url: `${url}${endpoint}`,
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: undefined,
          params: undefined,
        });
        expect(getSpy.calledOnce).toBeTruthy();
        expect(response).toEqual({
          ok: true,
          value: {
            data: expectedResponseBody,
            status: expectedHttpCode,
          },
        });
        expect(
          getSpy.calledWith({
            url: `${url}${endpoint}`,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-correlation-id': '',
            },
            data: undefined,
            params: undefined,
          }),
        ).toBeTruthy();
      });
      it('should make a successful GET request with query params', async () => {
        const url = 'http://localhost:4321';
        const endpoint = '/test';
        const expectedHttpCode: HttpCodes = 200;
        const expectedResponseBody = { data: 'Test Data' };
        nock(url)
          .get(endpoint)
          .query({ page: 1, perPage: 10 })
          .reply(expectedHttpCode, expectedResponseBody);
        const getSpy = Sinon.spy(axios, 'request');
        const response = await sut.request<typeof expectedResponseBody, never>({
          url: `${url}${endpoint}`,
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          params: { page: 1, perPage: 10 },
        });
        expect(response).toEqual({
          ok: true,
          value: {
            data: expectedResponseBody,
            status: expectedHttpCode,
          },
        });
        expect(getSpy.calledOnce).toBeTruthy();
        expect(
          getSpy.calledWith({
            url: `${url}${endpoint}`,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-correlation-id': '',
            },
            data: undefined,
            params: { page: 1, perPage: 10 },
          }),
        ).toBeTruthy();
      });
      it('should make a successful GET request with custom headers', async () => {
        const url = 'http://localhost:4321';
        const endpoint = '/test';
        const expectedHttpCode: HttpCodes = 200;
        const expectedResponseBody = { data: 'Test Data' };
        nock(url).get(endpoint).reply(expectedHttpCode, expectedResponseBody);
        const getSpy = Sinon.spy(axios, 'request');
        const response = await sut.request<typeof expectedResponseBody, never>({
          url: `${url}${endpoint}`,
          method: 'GET',
          headers: { Authorization: 'Bearer token' },
          params: undefined,
        });
        expect(getSpy.calledOnce).toBeTruthy();
        expect(response).toEqual({
          ok: true,
          value: {
            data: expectedResponseBody,
            status: expectedHttpCode,
          },
        });
        expect(
          getSpy.calledWith({
            url: `${url}${endpoint}`,
            headers: { Authorization: 'Bearer token', 'x-correlation-id': '' },
            data: undefined,
            method: 'GET',
            params: undefined,
          }),
        ).toBeTruthy();
      });
      it('should make a successful POST request and return data', async () => {
        const url = 'http://localhost:4321';
        const endpoint = '/test';
        const expectedHttpCode: HttpCodes = 201;
        const requestBody = { data: 'Test Request Data' };
        const expectedResponseBody = { data: 'Test Response Data' };
        nock(url).post(endpoint).reply(expectedHttpCode, expectedResponseBody);
        const postSpy = Sinon.spy(axios, 'request');
        const response = await sut.request<
          typeof expectedResponseBody,
          typeof requestBody
        >({
          url: `${url}${endpoint}`,
          method: 'POST',
          body: requestBody,
          headers: { 'Content-Type': 'application/json' },
          params: undefined,
        });
        expect(postSpy.calledOnce).toBeTruthy();
        expect(
          postSpy.calledWith({
            url: `${url}${endpoint}`,
            headers: {
              'Content-Type': 'application/json',
              'x-correlation-id': '',
            },
            data: requestBody,
            method: 'POST',
            params: undefined,
          }),
        ).toBeTruthy();
        expect(response).toEqual({
          ok: true,
          value: {
            data: expectedResponseBody,
            status: expectedHttpCode,
          },
        });
      });
      it('should make a successful POST request with empty body', async () => {
        const url = 'http://localhost:4321';
        const endpoint = '/test';
        const expectedHttpCode: HttpCodes = 201;
        const expectedResponseBody = { data: 'Test Response Data' };
        nock(url).post(endpoint).reply(expectedHttpCode, expectedResponseBody);
        const postSpy = Sinon.spy(axios, 'request');
        const result = await sut.request<typeof expectedResponseBody, null>({
          url: `${url}${endpoint}`,
          method: 'POST',
          body: null,
          headers: { 'Content-Type': 'application/json' },
          params: undefined,
        });
        expect(postSpy.calledOnce).toBeTruthy();
        expect(result).toEqual({
          ok: true,
          value: {
            data: expectedResponseBody,
            status: expectedHttpCode,
          },
        });
        expect(
          postSpy.calledWith({
            url: `${url}${endpoint}`,
            headers: {
              'Content-Type': 'application/json',
              'x-correlation-id': '',
            },
            data: null,
            method: 'POST',
            params: undefined,
          }),
        ).toBeTruthy();
      });
      it.todo('should make a successful DELETE request', async () => {});
      it.todo('should make a successful PUT request', async () => {});
      it.todo('should make a successful PATCH request', async () => {});
    });
    describe('Errors', () => {
      it.only('should throw an axios error when request fails', async () => {
        const url = 'http://localhost:4321';
        const endpoint = '/test';
        const axiosRequestError = new AxiosError(
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
        const axiosResponseError = {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Request failed with status 500 : [object Object]',
          status: 500,
        };
        const postStub = Sinon.stub(axios, 'request').rejects(
          axiosRequestError,
        );
        const response = await sut.request<null, null>({
          url: `${url}${endpoint}`,
          body: null,
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          params: undefined,
        });
        expect(postStub.calledOnce).toBeTruthy();
        expect(response).toEqual({
          ok: false,
          error: axiosResponseError,
        });
        expect(
          postStub.calledWith({
            url: `${url}${endpoint}`,
            headers: {
              'Content-Type': 'application/json',
              'x-correlation-id': '',
            },
            data: null,
            method: 'POST',
            params: undefined,
          }),
        ).toBeTruthy();
      });
    });
  });
});
