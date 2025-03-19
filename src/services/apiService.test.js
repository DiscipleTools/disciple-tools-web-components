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

      it('handles http domain', async () => {
        const service = new ApiService(null, 'http://dt.local/root/');
        expect(service.apiRoot).to.equal('/root/');
      });
      it('handles https domain', async () => {
        const service = new ApiService(null, 'https://dt.local/root/');
        expect(service.apiRoot).to.equal('/root/');
      });
      it('handles https subdomain', async () => {
        const service = new ApiService(null, 'https://site-one.dt.local/root/');
        expect(service.apiRoot).to.equal('/root/');
      });
      it('handles domain with subdirectory', async () => {
        const service = new ApiService(null, 'https://dt.local/site1/root/');
        expect(service.apiRoot).to.equal('/site1/root/');
      });
    });
  });
});
