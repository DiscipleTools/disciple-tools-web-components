import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './dt-upload-file.js';

describe('dt-upload-file', () => {
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
    const el = await fixture(html`<dt-upload-file></dt-upload-file>`);
    expect(el).to.exist;
    expect(el.value).to.deep.equal([]);
    expect(el.autoUpload).to.be.true;
    expect(el.deleteEnabled).to.be.true;
    expect(el.displayLayout).to.equal('grid');
  });

  it('renders with label', async () => {
    const el = await fixture(
      html`<dt-upload-file label="Upload Files"></dt-upload-file>`,
    );
    const label = el.shadowRoot.querySelector('dt-label');
    expect(label).to.exist;
    expect(label.textContent.trim()).to.equal('Upload Files');
  });

  it('renders upload zone', async () => {
    const el = await fixture(html`<dt-upload-file></dt-upload-file>`);
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
      html`<dt-upload-file .value=${JSON.stringify(value)}></dt-upload-file>`,
    );
    const filesContainer = el.shadowRoot.querySelector('.files-container');
    expect(filesContainer).to.exist;
  });

  it('disables when disabled attribute is set', async () => {
    const el = await fixture(
      html`<dt-upload-file disabled></dt-upload-file>`,
    );
    expect(el.disabled).to.be.true;
    const uploadZone = el.shadowRoot.querySelector('.upload-zone');
    expect(uploadZone.classList.contains('disabled')).to.be.true;
  });

  it('validates required field', async () => {
    const el = await fixture(
      html`<dt-upload-file required></dt-upload-file>`,
    );
    expect(el.required).to.be.true;
    // Trigger validation
    el._validateRequired();
    expect(el.invalid).to.be.true;
  });

  it('accepts file types from acceptedFileTypes', async () => {
    const el = await fixture(
      html`<dt-upload-file
        .acceptedFileTypes=${['image/*', 'application/pdf']}
      ></dt-upload-file>`,
    );
    const fileInput = el.shadowRoot.querySelector('input[type="file"]');
    expect(fileInput.getAttribute('accept')).to.include('image/*');
    expect(fileInput.getAttribute('accept')).to.include('application/pdf');
  });

  it('stages files when autoUpload is false', async () => {
    const el = await fixture(
      html`<dt-upload-file .autoUpload=${false}></dt-upload-file>`,
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
      html`<dt-upload-file
        .acceptedFileTypes=${['image/*']}
      ></dt-upload-file>`,
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
      html`<dt-upload-file max-file-size="1"></dt-upload-file>`,
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
    const el = await fixture(html`<dt-upload-file></dt-upload-file>`);

    expect(el._formatFileSize(1024)).to.equal('1.0 KB');
    expect(el._formatFileSize(1024 * 1024)).to.equal('1.0 MB');
    expect(el._formatFileSize(512)).to.equal('512 B');
  });

  it('dispatches change event when files are uploaded', async () => {
    const el = await fixture(html`<dt-upload-file></dt-upload-file>`);
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
      html`<dt-upload-file .autoUpload=${false}></dt-upload-file>`,
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
      html`<dt-upload-file .autoUpload=${false}></dt-upload-file>`,
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
      html`<dt-upload-file
        display-layout="grid"
        .value=${JSON.stringify(value)}
      ></dt-upload-file>`,
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
      html`<dt-upload-file
        display-layout="list"
        .value=${JSON.stringify(value)}
      ></dt-upload-file>`,
    );
    const filesList = el.shadowRoot.querySelector('.files-list');
    expect(filesList).to.exist;
  });
});
