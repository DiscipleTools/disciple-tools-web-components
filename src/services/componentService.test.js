import { expect } from '@open-wc/testing';
import ComponentService from './componentService.js';

describe('ComponentService', () => {
  describe('convertValue', () => {
    describe('dt-connection', () => {
      it('handles null', async () => {
        const result = ComponentService.convertValue('dt-connection', null);
        expect(result).to.be.null;
      });
      it('handles unexpected: string', () => {
        const result = ComponentService.convertValue('dt-connection', 'opt1');
        expect(result).to.eql({
          values: [
            {
              value: 'opt1',
            },
          ],
          force_values: false,
        });
      });
      it('handles expected: array of tags', async () => {
        const result = ComponentService.convertValue('dt-connection', [
          {
            id: 'opt1',
            label: 'Option 1',
          },
          {
            id: 'opt2',
            label: 'Option 2',
          },
        ]);
        expect(result).to.eql({
          values: [
            {
              value: 'opt1',
            },
            {
              value: 'opt2',
            },
          ],
          force_values: false,
        });
      });
      it('handles expected: deleted items', () => {
        const result = ComponentService.convertValue('dt-connection', [
          {
            id: 'opt1',
            label: 'Option 1',
          },
          {
            id: 'opt2',
            label: 'Option 2',
            delete: true,
          },
        ]);
        expect(result).to.eql({
          values: [
            {
              value: 'opt1',
            },
            {
              value: 'opt2',
              delete: true,
            },
          ],
          force_values: false,
        });
      });
    });

    describe('dt-date', () => {
      it('handles null', async () => {
        const result = ComponentService.convertValue('dt-date', null);
        expect(result).to.be.null;
      });
      it('handles expected: number (timestamp)', async () => {
        const result = ComponentService.convertValue('dt-date', 946720800);
        expect(result).to.equal(946720800);
      });
      it('handles expected: string (date)', async () => {
        const result = ComponentService.convertValue('dt-date', '2000-01-01');
        expect(result).to.equal('2000-01-01');
      });
    });

    describe('dt-location', () => {
      it('handles null', async () => {
        const result = ComponentService.convertValue('dt-location', null);
        expect(result).to.be.null;
      });
      it('handles unexpected: string', () => {
        const result = ComponentService.convertValue('dt-location', 'opt1');
        expect(result).to.eql({
          values: [
            {
              value: 'opt1',
            },
          ],
          force_values: false,
        });
      });
      it('handles expected: array of tags', async () => {
        const result = ComponentService.convertValue('dt-location', [
          {
            id: 'opt1',
            label: 'Option 1',
          },
          {
            id: 'opt2',
            label: 'Option 2',
          },
        ]);
        expect(result).to.eql({
          values: [
            {
              value: 'opt1',
            },
            {
              value: 'opt2',
            },
          ],
          force_values: false,
        });
      });
      it('handles expected: deleted items', () => {
        const result = ComponentService.convertValue('dt-location', [
          {
            id: 'opt1',
            label: 'Option 1',
          },
          {
            id: 'opt2',
            label: 'Option 2',
            delete: true,
          },
        ]);
        expect(result).to.eql({
          values: [
            {
              value: 'opt1',
            },
            {
              value: 'opt2',
              delete: true,
            },
          ],
          force_values: false,
        });
      });
    });

    describe('dt-multi-select', () => {
      it('handles null', async () => {
        const result = ComponentService.convertValue('dt-multi-select', null);
        expect(result).to.be.null;
      });
      it('handles unexpected: string', () => {
        const result = ComponentService.convertValue('dt-multi-select', 'opt1');
        expect(result).to.eql({
          values: [
            {
              value: 'opt1',
            },
          ],
          force_values: false,
        });
      });
      it('handles expected: array of IDs', async () => {
        const result = ComponentService.convertValue('dt-multi-select', [
          'opt1',
          'opt2',
        ]);
        expect(result).to.eql({
          values: [
            {
              value: 'opt1',
            },
            {
              value: 'opt2',
            },
          ],
          force_values: false,
        });
      });
      it('handles expected: deleted items', () => {
        const result = ComponentService.convertValue('dt-multi-select', [
          'opt1',
          '-opt2',
        ]);
        expect(result).to.eql({
          values: [
            {
              value: 'opt1',
            },
            {
              value: 'opt2',
              delete: true,
            },
          ],
          force_values: false,
        });
      });
    });

    describe('dt-number', () => {
      it('handles null', async () => {
        const result = ComponentService.convertValue('dt-number', null);
        expect(result).to.be.null;
      });
      it('handles expected: number', async () => {
        const result = ComponentService.convertValue('dt-number', 123);
        expect(result).to.equal(123);
      });
    });

    describe('dt-single-select', () => {
      it('handles null', async () => {
        const result = ComponentService.convertValue('dt-single-select', null);
        expect(result).to.be.null;
      });
      it('handles expected: string', async () => {
        const result = ComponentService.convertValue(
          'dt-single-select',
          'test'
        );
        expect(result).to.equal('test');
      });
    });

    describe('dt-tags', () => {
      it('handles null', async () => {
        const result = ComponentService.convertValue('dt-tags', null);
        expect(result).to.be.null;
      });
      it('handles unexpected: string', () => {
        const result = ComponentService.convertValue('dt-tags', 'opt1');
        expect(result).to.eql({
          values: [
            {
              value: 'opt1',
            },
          ],
          force_values: false,
        });
      });
      it('handles expected: array of tags', async () => {
        const result = ComponentService.convertValue('dt-tags', [
           'opt1','opt2',
        ]);
        expect(result).to.eql({
          values: [
            {
              value: 'opt1',
            },
            {
              value: 'opt2',
            },
          ],
          force_values: false,
        });
      });
      it('handles expected: deleted items', () => {
        const result = ComponentService.convertValue('dt-tags', [
          'opt1','-opt2'
        ]);
        expect(result).to.eql({
          values: [
            {
              value: 'opt1',
            },
            {
              value: 'opt2',
              delete: true,
            },
          ],
          force_values: false,
        });
      });
    });

    describe('dt-text', () => {
      it('handles null', async () => {
        const result = ComponentService.convertValue('dt-text', null);
        expect(result).to.be.null;
      });
      it('handles expected: string', async () => {
        const result = ComponentService.convertValue('dt-text', 'test');
        expect(result).to.equal('test');
      });
    });

    describe('dt-textarea', () => {
      it('handles null', async () => {
        const result = ComponentService.convertValue('dt-textarea', null);
        expect(result).to.be.null;
      });
      it('handles expected: string', async () => {
        const result = ComponentService.convertValue('dt-textarea', 'test');
        expect(result).to.equal('test');
      });
    });

    describe('dt-toggle', () => {
      it('handles null', async () => {
        const result = ComponentService.convertValue('dt-toggle', null);
        expect(result).to.be.null;
      });
      it('handles expected: boolean', async () => {
        const result = ComponentService.convertValue('dt-toggle', true);
        expect(result).to.equal(true);
      });
      it('handles unexpected: string', async () => {
        const result = ComponentService.convertValue('dt-toggle', 'true');
        expect(result).to.equal(true);
      });
    });
  });
});
