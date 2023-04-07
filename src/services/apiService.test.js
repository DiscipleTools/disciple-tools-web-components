import { expect } from '@open-wc/testing';
import ApiService from './apiService.js';

describe('ApiService', () => {
  describe('constructor', () => {
    describe('apiRoot', () => {
      it('handles leading slash', async () => {
        const service = new ApiService(null, '/root');
        expect(service.apiRoot).to.equal('/root/');
      });
      it('handles trailing slash', async () => {
        const service = new ApiService(null, 'root/');
        expect(service.apiRoot).to.equal('/root/');
      });
      it('handles no slash', async () => {
        const service = new ApiService(null, 'root');
        expect(service.apiRoot).to.equal('/root/');
      });
      it('handles leading+trailing slash', async () => {
        const service = new ApiService(null, '/root/');
        expect(service.apiRoot).to.equal('/root/');
      });
    });
  });
});
