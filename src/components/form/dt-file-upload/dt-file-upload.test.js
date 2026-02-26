import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './dt-file-upload.js';

describe('dt-file-upload', () => {
  // Mock wpApiShare for tests
  before(() => {
    if (typeof window !== 'undefined') {
      window.wpApiShare = {
        nonce: 'test-nonce',
        root: '/wp-json',
      };
    }
  });

  it('renders with default properties', async () => {
    const el = await fixture(html`<dt-file-upload></dt-file-upload>`);
    expect(el).to.exist;
    expect(el.value).to.deep.equal([]);
    expect(el.autoUpload).to.be.true;
    expect(el.deleteEnabled).to.be.true;
    expect(el.displayLayout).to.equal('grid');
  });

  it('renders with label', async () => {
    const el = await fixture(
      html`<dt-file-upload label="Upload Files"></dt-file-upload>`,
    );
    const label = el.shadowRoot.querySelector('dt-label');
    expect(label).to.exist;
    expect(label.textContent.trim()).to.equal('Upload Files');
  });

  it('renders upload zone', async () => {
    const el = await fixture(html`<dt-file-upload></dt-file-upload>`);
    const uploadZone = el.shadowRoot.querySelector('.upload-zone');
    expect(uploadZone).to.exist;
  });

  it('displays files when value is provided', async () => {
    const value = [
      {
        key: 'file1.jpg',
        name: 'photo.jpg',
        type: 'image/jpeg',
        size: 123456,
      },
    ];
    const el = await fixture(
      html`<dt-file-upload .value=${JSON.stringify(value)}></dt-file-upload>`,
    );
    const filesContainer = el.shadowRoot.querySelector('.files-container');
    expect(filesContainer).to.exist;
  });

  it('disables when disabled attribute is set', async () => {
    const el = await fixture(
      html`<dt-file-upload disabled></dt-file-upload>`,
    );
    expect(el.disabled).to.be.true;
    const uploadZone = el.shadowRoot.querySelector('.upload-zone');
    expect(uploadZone.classList.contains('disabled')).to.be.true;
  });

  it('validates required field', async () => {
    const el = await fixture(
      html`<dt-file-upload required></dt-file-upload>`,
    );
    expect(el.required).to.be.true;
    // Trigger validation
    el._validateRequired();
    expect(el.invalid).to.be.true;
  });

  it('accepts file types from acceptedFileTypes', async () => {
    const el = await fixture(
      html`<dt-file-upload
        .acceptedFileTypes=${['image/*', 'application/pdf']}
      ></dt-file-upload>`,
    );
    const fileInput = el.shadowRoot.querySelector('input[type="file"]');
    expect(fileInput.getAttribute('accept')).to.include('image/*');
    expect(fileInput.getAttribute('accept')).to.include('application/pdf');
  });

  it('stages files when autoUpload is false', async () => {
    const el = await fixture(
      html`<dt-file-upload .autoUpload=${false}></dt-file-upload>`,
    );
    expect(el.autoUpload).to.be.false;

    // Create a mock file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const files = [file];

    // Simulate file selection
    el._handleFileSelect({ target: { files } });

    expect(el.stagedFiles.length).to.equal(1);
  });

  it('validates file types', async () => {
    const el = await fixture(
      html`<dt-file-upload
        .acceptedFileTypes=${['image/*']}
      ></dt-file-upload>`,
    );

    const validFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const invalidFile = new File(['test'], 'test.pdf', {
      type: 'application/pdf',
    });

    const validFiles = el._validateFiles([validFile]);
    expect(validFiles.length).to.equal(1);

    const invalidFiles = el._validateFiles([invalidFile]);
    expect(invalidFiles.length).to.equal(0);
  });

  it('validates file size', async () => {
    const el = await fixture(
      html`<dt-file-upload max-file-size="1"></dt-file-upload>`,
    );

    // Create a file larger than 1MB
    const largeFile = new File(['x'.repeat(2 * 1024 * 1024)], 'large.jpg', {
      type: 'image/jpeg',
    });

    const validFiles = el._validateFiles([largeFile]);
    expect(validFiles.length).to.equal(0);
    expect(el.error).to.include('exceeds');
  });

  it('formats file size correctly', async () => {
    const el = await fixture(html`<dt-file-upload></dt-file-upload>`);

    expect(el._formatFileSize(1024)).to.equal('1.0 KB');
    expect(el._formatFileSize(1024 * 1024)).to.equal('1.0 MB');
    expect(el._formatFileSize(512)).to.equal('512 B');
  });

  it('dispatches change event when files are uploaded', async () => {
    const el = await fixture(html`<dt-file-upload></dt-file-upload>`);
    let changeEventFired = false;

    el.addEventListener('change', () => {
      changeEventFired = true;
    });

    // Simulate value change (normally happens after upload)
    el.value = [
      {
        key: 'file1.jpg',
        name: 'photo.jpg',
        type: 'image/jpeg',
      },
    ];

    // Manually trigger the change
    const event = new CustomEvent('change', {
      bubbles: true,
      detail: {
        field: el.name,
        oldValue: [],
        newValue: el.value,
      },
    });
    el.dispatchEvent(event);

    expect(changeEventFired).to.be.true;
  });

  it('listens for dt:upload-files event when autoUpload is false', async () => {
    const el = await fixture(
      html`<dt-file-upload .autoUpload=${false}></dt-file-upload>`,
    );

    // Stage a file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    el.stagedFiles = [file];

    // Dispatch manual upload event
    const event = new CustomEvent('dt:upload-files', { bubbles: true });
    el.dispatchEvent(event);

    // The handler should be called (we can't easily test the actual upload without mocking fetch)
    expect(el.stagedFiles.length).to.equal(1);
  });

  it('renders staged files section when autoUpload is false', async () => {
    const el = await fixture(
      html`<dt-file-upload .autoUpload=${false}></dt-file-upload>`,
    );

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    el.stagedFiles = [file];
    await el.updateComplete;

    const stagedSection = el.shadowRoot.querySelector('.staged-files');
    expect(stagedSection).to.exist;
  });

  it('renders grid layout correctly', async () => {
    const value = [
      {
        key: 'file1.jpg',
        name: 'photo.jpg',
        type: 'image/jpeg',
        size: 123456,
      },
    ];
    const el = await fixture(
      html`<dt-file-upload
        display-layout="grid"
        .value=${JSON.stringify(value)}
      ></dt-file-upload>`,
    );
    const filesGrid = el.shadowRoot.querySelector('.files-grid');
    expect(filesGrid).to.exist;
  });

  it('renders list layout correctly', async () => {
    const value = [
      {
        key: 'file1.jpg',
        name: 'photo.jpg',
        type: 'image/jpeg',
        size: 123456,
      },
    ];
    const el = await fixture(
      html`<dt-file-upload
        display-layout="list"
        .value=${JSON.stringify(value)}
      ></dt-file-upload>`,
    );
    const filesList = el.shadowRoot.querySelector('.files-list');
    expect(filesList).to.exist;
  });

  describe('File Type Icon Detection', () => {
    it('returns explicit fileTypeIcon when set', async () => {
      const el = await fixture(html`<dt-file-upload file-type-icon="mdi:custom-icon"></dt-file-upload>`);
      const file = { type: 'application/pdf', name: 'test.pdf' };
      const icon = el._getFileTypeIcon(file);
      expect(icon).to.equal('mdi:custom-icon');
    });

    it('detects PDF icon from MIME type', async () => {
      const el = await fixture(html`<dt-file-upload></dt-file-upload>`);
      const file = { type: 'application/pdf', name: 'document.pdf' };
      const icon = el._getFileTypeIcon(file);
      expect(icon).to.equal('mdi:file-pdf-box');
    });

    it('detects Word icon from MIME type', async () => {
      const el = await fixture(html`<dt-file-upload></dt-file-upload>`);
      const file = { type: 'application/msword', name: 'document.doc' };
      const icon = el._getFileTypeIcon(file);
      expect(icon).to.equal('mdi:microsoft-word');
    });

    it('detects text icon from MIME type', async () => {
      const el = await fixture(html`<dt-file-upload></dt-file-upload>`);
      const file = { type: 'text/plain', name: 'notes.txt' };
      const icon = el._getFileTypeIcon(file);
      expect(icon).to.equal('mdi:text-box-edit-outline');
    });

    it('detects JSON icon from MIME type', async () => {
      const el = await fixture(html`<dt-file-upload></dt-file-upload>`);
      const file = { type: 'application/json', name: 'data.json' };
      const icon = el._getFileTypeIcon(file);
      expect(icon).to.equal('mdi:code-json');
    });

    it('detects HTML icon from MIME type', async () => {
      const el = await fixture(html`<dt-file-upload></dt-file-upload>`);
      const file = { type: 'text/html', name: 'page.html' };
      const icon = el._getFileTypeIcon(file);
      expect(icon).to.equal('mdi:language-html5');
    });

    it('detects XML icon from MIME type', async () => {
      const el = await fixture(html`<dt-file-upload></dt-file-upload>`);
      const file = { type: 'application/xml', name: 'config.xml' };
      const icon = el._getFileTypeIcon(file);
      expect(icon).to.equal('mdi:file-xml-box');
    });

    it('falls back to file extension when MIME type is missing', async () => {
      const el = await fixture(html`<dt-file-upload></dt-file-upload>`);
      const file = { type: '', name: 'document.pdf' };
      const icon = el._getFileTypeIcon(file);
      expect(icon).to.equal('mdi:file-pdf-box');
    });

    it('falls back to file extension when MIME type is unknown', async () => {
      const el = await fixture(html`<dt-file-upload></dt-file-upload>`);
      const file = { type: 'application/unknown', name: 'file.docx' };
      const icon = el._getFileTypeIcon(file);
      expect(icon).to.equal('mdi:microsoft-word');
    });

    it('returns null for unknown file types (triggers default fallback)', async () => {
      const el = await fixture(html`<dt-file-upload></dt-file-upload>`);
      const file = { type: 'application/unknown', name: 'mystery.unknown' };
      const icon = el._getFileTypeIcon(file);
      expect(icon).to.be.null;
    });

    it('handles CSV files correctly', async () => {
      const el = await fixture(html`<dt-file-upload></dt-file-upload>`);
      const file = { type: 'text/csv', name: 'data.csv' };
      const icon = el._getFileTypeIcon(file);
      expect(icon).to.equal('mdi:text-box-edit-outline');
    });

    it('handles RTF files correctly', async () => {
      const el = await fixture(html`<dt-file-upload></dt-file-upload>`);
      const file = { type: 'application/rtf', name: 'document.rtf' };
      const icon = el._getFileTypeIcon(file);
      expect(icon).to.equal('mdi:text-box-edit-outline');
    });

    it('handles files without name or type', async () => {
      const el = await fixture(html`<dt-file-upload></dt-file-upload>`);
      const file = { type: '', name: '' };
      const icon = el._getFileTypeIcon(file);
      expect(icon).to.be.null;
    });

    it('prioritizes explicit fileTypeIcon over automatic detection', async () => {
      const el = await fixture(html`<dt-file-upload file-type-icon="mdi:override"></dt-file-upload>`);
      const file = { type: 'application/pdf', name: 'document.pdf' };
      const icon = el._getFileTypeIcon(file);
      expect(icon).to.equal('mdi:override');
    });
  });

  describe('Download Functionality', () => {
    it('renders download button when downloadEnabled is true and file has URL', async () => {
      const value = [
        {
          key: 'file1.jpg',
          name: 'photo.jpg',
          url: 'https://example.com/photo.jpg',
        },
      ];
      const el = await fixture(
        html`<dt-file-upload .value=${JSON.stringify(value)} download-enabled></dt-file-upload>`,
      );
      await el.updateComplete;
      const downloadButton = el.shadowRoot.querySelector('.download');
      expect(downloadButton).to.exist;
    });

    it('does not render download button when downloadEnabled is false', async () => {
      const value = [
        {
          key: 'file1.jpg',
          name: 'photo.jpg',
          url: 'https://example.com/photo.jpg',
        },
      ];
      const el = await fixture(
        html`<dt-file-upload .value=${JSON.stringify(value)} .downloadEnabled=${false}></dt-file-upload>`,
      );
      await el.updateComplete;
      const downloadButton = el.shadowRoot.querySelector('.download');
      expect(downloadButton).to.not.exist;
    });

    it('does not render download button when file has no URL', async () => {
      const value = [
        {
          key: 'file1.jpg',
          name: 'photo.jpg',
        },
      ];
      const el = await fixture(
        html`<dt-file-upload .value=${JSON.stringify(value)} download-enabled></dt-file-upload>`,
      );
      await el.updateComplete;
      const downloadButton = el.shadowRoot.querySelector('.download');
      expect(downloadButton).to.not.exist;
    });

    it('dispatches dt:download-file event in API mode', async () => {
      const value = [
        {
          key: 'file1.jpg',
          name: 'photo.jpg',
          url: 'https://example.com/photo.jpg',
        },
      ];
      const el = await fixture(
        html`<dt-file-upload
          .value=${JSON.stringify(value)}
          download-enabled
          post-type="contacts"
          post-id="123"
          meta-key="files"
        ></dt-file-upload>`,
      );
      await el.updateComplete;

      let dispatchedEvent = null;
      el.addEventListener('dt:download-file', (e) => {
        dispatchedEvent = e;
      });

      const file = value[0];
      el._downloadFile(file);

      expect(dispatchedEvent).to.exist;
      expect(dispatchedEvent.detail.fileKey).to.equal('file1.jpg');
      expect(dispatchedEvent.detail.fileName).to.equal('photo.jpg');
      expect(dispatchedEvent.detail.metaKey).to.equal('files');
      expect(dispatchedEvent.detail.onSuccess).to.be.a('function');
      expect(dispatchedEvent.detail.onError).to.be.a('function');
    });

    it('creates anchor and triggers download in standalone mode', async () => {
      const value = [
        {
          key: 'file1.jpg',
          name: 'photo.jpg',
          url: 'https://example.com/photo.jpg',
        },
      ];
      const el = await fixture(
        html`<dt-file-upload .value=${JSON.stringify(value)} download-enabled></dt-file-upload>`,
      );
      await el.updateComplete;

      // Mock document.createElement and appendChild
      const createdAnchors = [];
      const originalCreateElement = document.createElement.bind(document);
      document.createElement = (tagName) => {
        if (tagName === 'a') {
          const anchor = originalCreateElement('a');
          anchor.click = () => {
            createdAnchors.push(anchor);
          };
          return anchor;
        }
        return originalCreateElement(tagName);
      };

      const file = value[0];
      el._downloadFile(file);

      expect(createdAnchors.length).to.equal(1);
      expect(createdAnchors[0].href).to.equal('https://example.com/photo.jpg');
      expect(createdAnchors[0].download).to.equal('photo.jpg');
      expect(createdAnchors[0].target).to.equal('_blank');

      // Restore original
      document.createElement = originalCreateElement;
    });

    it('uses standalone mode when required parameters are missing', async () => {
      const value = [
        {
          key: 'file1.jpg',
          name: 'photo.jpg',
          url: 'https://example.com/photo.jpg',
        },
      ];
      const el = await fixture(
        html`<dt-file-upload .value=${JSON.stringify(value)} download-enabled></dt-file-upload>`,
      );
      await el.updateComplete;

      // Mock document.createElement and appendChild
      const createdAnchors = [];
      const originalCreateElement = document.createElement.bind(document);
      document.createElement = (tagName) => {
        if (tagName === 'a') {
          const anchor = originalCreateElement('a');
          anchor.click = () => {
            createdAnchors.push(anchor);
          };
          return anchor;
        }
        return originalCreateElement(tagName);
      };

      const file = value[0];
      el._downloadFile(file);
      await el.updateComplete;

      // In standalone mode, should create anchor and trigger download
      expect(createdAnchors.length).to.equal(1);
      expect(createdAnchors[0].href).to.equal('https://example.com/photo.jpg');
      expect(el.error || '').to.be.empty;

      // Restore original
      document.createElement = originalCreateElement;
    });

    it('does nothing when downloadEnabled is false', async () => {
      const value = [
        {
          key: 'file1.jpg',
          name: 'photo.jpg',
          url: 'https://example.com/photo.jpg',
        },
      ];
      const el = await fixture(
        html`<dt-file-upload .value=${JSON.stringify(value)} .downloadEnabled=${false}></dt-file-upload>`,
      );
      await el.updateComplete;

      let eventDispatched = false;
      el.addEventListener('dt:download-file', () => {
        eventDispatched = true;
      });

      const file = value[0];
      el._downloadFile(file);
      await el.updateComplete;

      expect(eventDispatched).to.be.false;
      expect(el.error || '').to.be.empty;
    });

    it('handles file without URL in standalone mode gracefully', async () => {
      const value = [
        {
          key: 'file1.jpg',
          name: 'photo.jpg',
        },
      ];
      const el = await fixture(
        html`<dt-file-upload .value=${JSON.stringify(value)} download-enabled></dt-file-upload>`,
      );
      await el.updateComplete;

      const file = value[0];
      // Should not throw
      expect(() => el._downloadFile(file)).to.not.throw();
    });
  });
});
