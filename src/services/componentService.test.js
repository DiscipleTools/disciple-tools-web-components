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

    describe('dt-multi-text', () => {
      it('handles null', async () => {
        const result = ComponentService.convertValue('dt-multi-text', null);
        expect(result).to.be.null;
      });
      it('handles unexpected: string', () => {
        const result = ComponentService.convertValue('dt-multi-text', 'opt1');
        expect(result).to.eql([
          {
            value: 'opt1',
          },
        ]);
      });
      it('handles expected: array of existing values', async () => {
        const result = ComponentService.convertValue('dt-multi-text', [
          {
            key: 'opt1',
            value: 'Option 1',
            verified: true,
          },
          {
            key: 'opt2',
            value: 'Option 2',
          },
        ]);
        expect(result).to.eql([
          {
            key: 'opt1',
            value: 'Option 1',
            verified: true,
          },
          {
            key: 'opt2',
            value: 'Option 2',
          },
        ]);
      });
      it('handles expected: array of new values', async () => {
        const result = ComponentService.convertValue('dt-multi-text', [
          {
            tempKey: Date.now(),
            value: 'Option 1',
          },
          {
            tempKey: '123456',
            value: 'Option 2',
          },
        ]);
        expect(result).to.eql([
          {
            value: 'Option 1',
          },
          {
            value: 'Option 2',
          },
        ]);
      });
      it('handles expected: deleted items', () => {
        const result = ComponentService.convertValue('dt-multi-text', [
          {
            key: 'opt1',
            value: 'Option 1',
          },
          {
            key: 'opt2',
            value: 'Option 2',
            delete: true,
          },
        ]);
        expect(result).to.eql([
          {
            key: 'opt1',
            value: 'Option 1',
          },
          {
            key: 'opt2',
            value: 'Option 2',
            delete: true,
          },
        ]);
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
        const result = ComponentService.convertValue('dt-location', 'opt1', []);
        expect(result).to.eql({
          values: [
            {
              value: 'opt1',
            },
          ],
          force_values: false,
        });
      });
      it('handles null oldValue', async () => {
        const result = ComponentService.convertValue(
          'dt-location',
          [
            {
              id: 'opt1',
              label: 'Option 1',
            },
          ],
          null,
        );
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
        const result = ComponentService.convertValue(
          'dt-location',
          [
            {
              id: 'opt1',
              label: 'Option 1',
            },
            {
              id: 'opt2',
              label: 'Option 2',
            },
          ],
          [],
        );
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
      it('handles expected: added item', async () => {
        const result = ComponentService.convertValue(
          'dt-location',
          [
            {
              id: 'opt1',
              label: 'Option 1',
            },
            {
              id: 'opt2',
              label: 'Option 2',
            },
          ],
          [
            {
              id: 'opt1',
              label: 'Option 1',
            },
          ],
        );
        expect(result).to.eql({
          values: [
            {
              value: 'opt2',
            },
          ],
          force_values: false,
        });
      });
      it('handles expected: deleted items', () => {
        const result = ComponentService.convertValue(
          'dt-location',
          [
            {
              id: 'opt1',
              label: 'Option 1',
            },
            {
              id: 'opt2',
              label: 'Option 2',
              delete: true,
            },
          ],
          [
            {
              id: 'opt1',
              label: 'Option 1',
            },
            {
              id: 'opt2',
              label: 'Option 2',
            },
          ],
        );
        expect(result).to.eql({
          values: [
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

    describe('dt-multi-select-button-group', () => {
      it('handles null', async () => {
        const result = ComponentService.convertValue(
          'dt-multi-select-button-group',
          null,
        );
        expect(result).to.be.null;
      });
      it('handles unexpected: string', () => {
        const result = ComponentService.convertValue(
          'dt-multi-select-button-group',
          'opt1',
        );
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
        const result = ComponentService.convertValue(
          'dt-multi-select-button-group',
          ['opt1', 'opt2'],
        );
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
        const result = ComponentService.convertValue(
          'dt-multi-select-button-group',
          ['opt1', '-opt2'],
        );
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
          'test',
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
      it('handles expected: hyphenated tags', async () => {
        const result = ComponentService.convertValue('dt-tags', [
          'option-one',
          'option-two',
        ]);
        expect(result).to.eql({
          values: [
            {
              value: 'option-one',
            },
            {
              value: 'option-two',
            },
          ],
          force_values: false,
        });
      });
      it('handles expected: deleted items', () => {
        const result = ComponentService.convertValue('dt-tags', [
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

  describe('valueArrayDiff', () => {
    describe('location_meta', () => {
      const locationMetaOptions = [
        {
          id: '123',
          grid_meta_id: '65',
          post_id: '43',
          post_type: 'contacts',
          postmeta_id_location_grid: '1671',
          grid_id: '100366112',
          lng: '-73.9866',
          lat: '40.7306',
          level: 'place',
          source: 'user',
          label: 'New York, New York, United States',
        },
        {
          id: '124',
          grid_meta_id: '66',
          post_id: '43',
          post_type: 'contacts',
          postmeta_id_location_grid: '1673',
          grid_id: '100364858',
          lng: '-87.624421',
          lat: '41.875562',
          level: 'place',
          source: 'user',
          label: 'Chicago, Illinois, United States',
        },
        {
          id: '125',
          grid_meta_id: '67',
          post_id: '43',
          post_type: 'contacts',
          postmeta_id_location_grid: '1675',
          grid_id: '100364452',
          lng: '-118.242766',
          lat: '34.053691',
          level: 'place',
          source: 'user',
          label: 'Los Angeles, California, United States',
        },
        {
          label: ['Test'],
          key: 'contact_address_861',
        },
      ];
      it('handles null', async () => {
        const result = ComponentService.valueArrayDiff(null, null);
        expect(result).to.have.property('value1').with.lengthOf(0);
        expect(result).to.have.property('value2').with.lengthOf(0);
      });
      it('handles null value1', async () => {
        const result = ComponentService.valueArrayDiff(null, [
          locationMetaOptions[0],
        ]);
        expect(result).to.have.property('value1');
        expect(result).to.have.property('value2');
      });
      it('handles null value2', async () => {
        const result = ComponentService.valueArrayDiff(
          [locationMetaOptions[0]],
          null,
        );
        expect(result).to.have.property('value1');
        expect(result).to.have.property('value2');
      });

      it('handles new item', async () => {
        const result = ComponentService.valueArrayDiff(
          [locationMetaOptions[0]],
          [locationMetaOptions[0], locationMetaOptions[1]],
        );
        expect(result.value2).to.deep.include(locationMetaOptions[1]);
      });
      it('handles deleted item', async () => {
        const result = ComponentService.valueArrayDiff(
          [locationMetaOptions[0], locationMetaOptions[1]],
          [locationMetaOptions[0]],
        );
        expect(result.value1).to.deep.include(locationMetaOptions[1]);
      });
      it('handles updated item: logical delete', async () => {
        const deletedOption = { ...locationMetaOptions[0], delete: true };
        const result = ComponentService.valueArrayDiff(
          [locationMetaOptions[0]],
          [deletedOption],
        );
        expect(result.value1).to.deep.include(locationMetaOptions[0]);
        expect(result.value2).to.deep.include(deletedOption);
      });
      it('handles update item: logical undelete', async () => {
        const deletedOption = { ...locationMetaOptions[0], delete: true };
        const result = ComponentService.valueArrayDiff(
          [deletedOption],
          [locationMetaOptions[0]],
        );
        expect(result.value1).to.deep.include(deletedOption);
        expect(result.value2).to.deep.include(locationMetaOptions[0]);
      });

      it('handles mixed array order', async () => {
        const result = ComponentService.valueArrayDiff(
          [locationMetaOptions[1], locationMetaOptions[0]],
          [locationMetaOptions[0], locationMetaOptions[1]],
        );
        expect(result.value1).to.have.lengthOf(0);
        expect(result.value2).to.have.lengthOf(0);
      });
      it('handles mixed property order', async () => {
        const selection1 = {
          ...locationMetaOptions[0],
          lng: locationMetaOptions[0].lng,
          lat: locationMetaOptions[0].lat,
        };
        const selection2 = {
          ...locationMetaOptions[0],
          lat: locationMetaOptions[0].lat,
          lng: locationMetaOptions[0].lng,
        };
        const result = ComponentService.valueArrayDiff(selection1, selection2);
        expect(result.value1).to.have.lengthOf(0);
        expect(result.value2).to.have.lengthOf(0);
      });
    });
  });
});
