import { html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import DtFormBase from '../dt-form-base.js';
import '../../icons/dt-icon.js';
import '../../icons/dt-spinner.js';

/**
 * Field for uploading multiple files (pictures, documents, PDFs, voice messages, etc.)
 * Supports drag & drop, file preview, and both auto-upload and manual upload modes.
 */
export class DtFileUpload extends DtFormBase {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: block;
        }

        .upload-zone {
          border: 2px dashed var(--dt-upload-border-color, #ccc);
          border-radius: 4px;
          text-align: center;
          background-color: var(--dt-upload-background-color, #fafafa);
          transition: padding 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
          cursor: pointer;
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }

        .upload-zone.compact {
          padding: 0.75rem;
        }

        .upload-zone.expanded {
          padding: 2rem;
        }

        .upload-zone:hover:not(.disabled):not(.uploading) {
          border-color: var(--dt-upload-border-color-hover, #999);
          background-color: var(--dt-upload-background-color-hover, #f0f0f0);
        }

        .upload-zone.drag-over {
          border-color: var(--primary-color, #0073aa);
          background-color: var(--dt-upload-background-color-drag, #e8f4f8);
        }

        .upload-zone.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .upload-zone.uploading {
          pointer-events: none;
        }

        .upload-zone-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .upload-zone-content .expandable {
          transition: opacity 0.2s ease;
        }

        .upload-zone.compact .upload-zone-content .expandable {
          display: none;
        }

        .upload-zone.expanded .upload-zone-content .expandable {
          display: block;
        }

        .upload-icon {
          color: var(--dt-upload-icon-color, #999);
          flex-shrink: 0;
          transition: font-size 0.2s ease;
        }

        .upload-zone.compact .upload-icon {
          font-size: 1.75rem;
        }

        .upload-zone.expanded .upload-icon {
          font-size: 3rem;
        }

        .upload-text {
          font-size: 1rem;
          color: var(--dt-upload-text-color, #666);
        }

        .upload-hint {
          font-size: 0.875rem;
          color: var(--dt-upload-hint-color, #999);
        }

        input[type='file'] {
          position: absolute;
          width: 0;
          height: 0;
          opacity: 0;
          overflow: hidden;
        }

        .files-container {
          margin-top: 1rem;
        }

        .files-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 1rem;
        }

        .files-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .file-item {
          position: relative;
          border: 1px solid var(--dt-file-upload-border-color, #ddd);
          border-radius: 4px;
          overflow: hidden;
          background-color: var(--dt-file-upload-background-color, #fff);
        }

        .file-item-grid {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
        }

        .file-item-list {
          display: grid;
          grid-template-columns: 40px 1fr auto;
          grid-template-rows: auto auto;
          align-items: center;
          padding: 0.5rem;
          gap: 0 0.75rem;
          row-gap: 0.125rem;
        }

        .file-item-list .file-preview-link,
        .file-item-list .file-icon-area {
          grid-column: 1;
          grid-row: 1 / -1;
          width: 40px;
          height: 40px;
          min-width: 40px;
          min-height: 40px;
          border-radius: 6px;
          overflow: hidden;
        }

        .file-item-list .file-name,
        .file-item-list .file-name-edit,
        .file-item-list input.file-name-edit {
          grid-column: 2;
          grid-row: 1;
          min-width: 0;
        }

        .file-item-list .file-size {
          grid-column: 2;
          grid-row: 2;
        }

        .file-item-list .file-actions {
          grid-column: 3;
          grid-row: 1 / -1;
          position: relative;
        }

        .file-item-list .file-icon-area dt-icon {
          font-size: 1.25rem;
        }

        .file-preview-link {
          display: block;
          cursor: pointer;
          flex: 1;
          min-height: 0;
          height: calc(100% - 1.5rem);
        }

        .file-preview-link img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .file-icon-area {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--dt-file-upload-icon-background, #f5f5f5);
          color: var(--dt-file-upload-icon-color, #999);
          flex: 1;
          min-height: 0;
          height: calc(100% - 1.5rem);
        }

        .file-icon-area dt-icon {
          font-size: 2rem;
        }

        .file-icon-area img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .file-name {
          font-size: 0.75rem;
          color: var(--dt-file-upload-name-color, #333);
          padding: 0.25rem 0.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .file-name-editable {
          cursor: pointer;
          position: relative;
          z-index: 2;
        }

        .file-name-editable:hover {
          text-decoration: underline;
        }

        .file-name-edit {
          font-size: 0.75rem;
          color: var(--dt-file-upload-name-color, #333);
          padding: 0.25rem 0.5rem;
          width: 100%;
          box-sizing: border-box;
          border: 1px solid var(--primary-color, #0073aa);
          border-radius: 2px;
          background: var(--dt-file-upload-background-color, #fff);
        }

        .file-name-edit:focus {
          outline: none;
          border-color: var(--primary-color, #0073aa);
        }

        .file-size {
          font-size: 0.7rem;
          color: var(--dt-file-upload-size-color, #999);
          padding: 0 0.5rem 0.25rem;
        }

        .file-actions {
          position: absolute;
          top: 0.25rem;
          inset-inline-end: 0.25rem;
          display: flex;
          gap: 0.25rem;
          z-index: 1;
          pointer-events: none;
        }

        .file-actions button {
          pointer-events: auto;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 4px;
          padding: 0.25rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .file-actions button:hover {
          background: #fff;
        }

        .file-actions button dt-icon {
          font-size: 1rem;
        }

        .file-actions button.download {
          color: var(--primary-color, #0073aa);
        }

        .file-actions button.delete {
          color: var(--alert-color, #dc3545);
        }

        .staged-files {
          margin-top: 1rem;
          padding: 1rem;
          border: 1px dashed var(--dt-upload-border-color, #ccc);
          border-radius: 4px;
          background: var(--dt-upload-background-color, #fafafa);
        }

        .staged-files-title {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .staged-file-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0;
          font-size: 0.875rem;
        }

        .staged-file-item span {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .staged-file-item button.remove {
          flex-shrink: 0;
          margin-inline-start: auto;
          padding: 0.25rem;
          background: transparent;
          border: none;
          color: var(--alert-color, #dc3545);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .staged-file-item button.remove:hover {
          opacity: 0.8;
        }

        .upload-staged-btn {
          margin-top: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--primary-color, #0073aa);
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .upload-staged-btn:hover:not(:disabled) {
          opacity: 0.9;
        }

        .upload-staged-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-container {
          margin-top: 1rem;
          max-width: 100%;
          overflow: hidden;
        }

        .error-container .error-text {
          flex: 1;
          min-width: 0;
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;
        }
      `,
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      value: {
        type: Array,
        reflect: true,
      },
      acceptedFileTypes: {
        type: Array,
        attribute: 'accepted-file-types',
      },
      maxFileSize: {
        type: Number,
        attribute: 'max-file-size',
      },
      maxFiles: {
        type: Number,
        attribute: 'max-files',
      },
      deleteEnabled: {
        type: Boolean,
        attribute: 'delete-enabled',
        converter: {
          fromAttribute: (v) => (v == null || v === '' ? true : v !== 'false' && v !== false),
        },
      },
      downloadEnabled: {
        type: Boolean,
        attribute: 'download-enabled',
        converter: {
          fromAttribute: (v) => (v == null || v === '' ? true : v !== 'false' && v !== false),
        },
      },
      renameEnabled: {
        type: Boolean,
        attribute: 'rename-enabled',
        converter: {
          fromAttribute: (v) => (v == null || v === '' ? true : v !== 'false' && v !== false),
        },
      },
      displayLayout: {
        type: String,
        attribute: 'display-layout',
      },
      fileTypeIcon: {
        type: String,
        attribute: 'file-type-icon',
      },
      autoUpload: {
        type: Boolean,
        attribute: 'auto-upload',
        converter: {
          fromAttribute: (v) => {
            if (v == null) return true;
            const s = String(v).toLowerCase().trim();
            return s !== 'false' && s !== '0' && v !== false;
          },
        },
      },
      postType: { type: String, attribute: 'post-type' },
      postId: { type: String, attribute: 'post-id' },
      metaKey: { type: String, attribute: 'meta-key' },
      keyPrefix: { type: String, attribute: 'key-prefix' },
      uploading: { type: Boolean, state: true },
      stagedFiles: { type: Array, state: true },
      _uploadZoneExpanded: { type: Boolean, state: true },
      _dragOver: { type: Boolean, state: true },
      _editingFileKey: { type: String, state: true },
      _editingFileName: { type: String, state: true },
    };
  }

  constructor() {
    super();
    this.value = [];
    this.acceptedFileTypes = ['image/*', 'application/pdf'];
    this.maxFileSize = null;
    this.maxFiles = null;
    this.deleteEnabled = true;
    this.downloadEnabled = true;
    this.renameEnabled = true;
    this.displayLayout = 'grid';
    this.fileTypeIcon = '';
    this.autoUpload = true;
    this.postType = '';
    this.postId = '';
    this.metaKey = '';
    this.keyPrefix = '';
    this.uploading = false;
    this.stagedFiles = [];
    this._uploadZoneExpanded = false;
    this._dragOver = false;
    this._editingFileKey = '';
    this._editingFileName = '';
    this._dragLeaveTimeout = null;
    this._resizeObserver = null;
    this._keydownAttached = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('dt:upload-files', this._handleUploadStagedEvent);
    this._boundKeydown = this._handleHostKeydown.bind(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('dt:upload-files', this._handleUploadStagedEvent);
    this._removeKeydownListener();
    this._cancelScheduledCollapse();
    this._resizeObserver?.disconnect();
  }

  _addKeydownListener() {
    if (this._keydownAttached) return;
    this._keydownAttached = true;
    this.addEventListener('keydown', this._boundKeydown, { capture: true });
  }

  _removeKeydownListener() {
    if (!this._keydownAttached) return;
    this._keydownAttached = false;
    this.removeEventListener('keydown', this._boundKeydown, { capture: true });
  }

  _handleHostKeydown(e) {
    if (!this._editingFileKey) return;
    const input = this.shadowRoot?.querySelector('.file-name-edit');
    if (!input) return;
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      this._commitRename(this._editingFileKey, input.value);
    } else if (e.key === 'Escape' || e.keyCode === 27) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      this._cancelRename();
    }
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this._setupResizeObserver();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('value') || changedProperties.has('stagedFiles') || changedProperties.has('error')) {
      this.updateComplete.then(() => this._refreshMasonry());
    }
    if (changedProperties.has('_editingFileKey')) {
      if (this._editingFileKey) {
        this._addKeydownListener();
        this.updateComplete.then(() => {
          const input = this.shadowRoot?.querySelector('.file-name-edit');
          if (input) {
            input.focus();
            input.select();
          }
        });
      } else {
        this._removeKeydownListener();
      }
    }
  }

  _setupResizeObserver() {
    if (typeof ResizeObserver === 'undefined') return;
    this._resizeObserver = new ResizeObserver(() => {
      this._refreshMasonry();
    });
    this._resizeObserver.observe(this);
  }

  _refreshMasonry() {
    if (typeof window !== 'undefined' && window.jQuery) {
      const host = this;
      requestAnimationFrame(() => {
        let $container = null;
        if (window.masonGrid && window.masonGrid.length && window.masonGrid.masonry) {
          $container = window.masonGrid;
        } else {
          $container = window.jQuery(host).closest('.grid, .masonry-container, .masonry, [data-masonry]');
        }
        if ($container && $container.length && $container.masonry) {
          $container.masonry('layout');
        }
      });
    }
  }

  _expandUploadZone() {
    this._uploadZoneExpanded = true;
  }

  _scheduleCollapse() {
    this._cancelScheduledCollapse();
    this._dragLeaveTimeout = setTimeout(() => {
      this._uploadZoneExpanded = false;
      this._dragLeaveTimeout = null;
    }, 300);
  }

  _cancelScheduledCollapse() {
    if (this._dragLeaveTimeout) {
      clearTimeout(this._dragLeaveTimeout);
      this._dragLeaveTimeout = null;
    }
  }

  _handleUploadStagedEvent = () => {
    this.uploadStagedFiles();
  };

  uploadStagedFiles() {
    if (this.stagedFiles.length > 0) {
      this._uploadFiles(this.stagedFiles);
    }
  }

  _removeStagedFile(index) {
    if (index >= 0 && index < this.stagedFiles.length) {
      this.stagedFiles = this.stagedFiles.filter((_, i) => i !== index);
      this.requestUpdate();
    }
  }

  _parseValue(val) {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }

  _formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  _isImage(file) {
    const type = (file.type || '').toLowerCase();
    return type.startsWith('image/');
  }

  _mdiToIconify(mdiStr) {
    if (!mdiStr || typeof mdiStr !== 'string') return '';
    const s = mdiStr.trim();
    if (s.startsWith('mdi:')) return s;
    if (s.includes('mdi-')) return `mdi:${s.replace(/.*mdi-/, '').replace(/\s/g, '-')}`;
    if (s.startsWith('mdi ')) return `mdi:${s.replace(/^mdi\s+/, '').replace(/\s/g, '-')}`;
    return s;
  }

  /**
   * Returns mapping of MIME types and file extensions to MDI icons.
   * Used for automatic icon detection when fileTypeIcon is not specified.
   */
  _getFileTypeIconMapping() {
    return {
      // MIME types
      'application/pdf': 'mdi:file-pdf-box',
      'text/plain': 'mdi:text-box-edit-outline',
      'application/rtf': 'mdi:text-box-edit-outline',
      'text/rtf': 'mdi:text-box-edit-outline',
      'text/csv': 'mdi:text-box-edit-outline',
      'text/html': 'mdi:language-html5',
      'application/msword': 'mdi:microsoft-word',
      'application/json': 'mdi:code-json',
      'application/xml': 'mdi:file-xml-box',
      // Extensions (for fallback when MIME type not available)
      '.pdf': 'mdi:file-pdf-box',
      '.txt': 'mdi:text-box-edit-outline',
      '.rtf': 'mdi:text-box-edit-outline',
      '.csv': 'mdi:text-box-edit-outline',
      '.html': 'mdi:language-html5',
      '.htm': 'mdi:language-html5',
      '.docx': 'mdi:microsoft-word',
      '.doc': 'mdi:microsoft-word',
      '.json': 'mdi:code-json',
      '.xml': 'mdi:file-xml-box',
    };
  }

  /**
   * Determines the appropriate icon for a file based on fileTypeIcon property or file type.
   * @param {Object} file - File object with type and name properties
   * @returns {string|null} - MDI icon string or null if no match found
   */
  _getFileTypeIcon(file) {
    // 1. If fileTypeIcon is explicitly set, use it
    if (this.fileTypeIcon && this.fileTypeIcon.trim()) {
      return this.fileTypeIcon.trim();
    }

    // 2. Try to match on MIME type
    const type = (file.type || '').toLowerCase();
    const mapping = this._getFileTypeIconMapping();

    if (type && mapping[type]) {
      return mapping[type];
    }

    // 3. Try to match on file extension
    if (file.name) {
      const parts = file.name.split('.');
      if (parts.length > 1) {
        const ext = '.' + parts.pop().toLowerCase();
        if (mapping[ext]) {
          return mapping[ext];
        }
      }
    }

    // 4. Return null to use default fallback (mdi:file-outline)
    return null;
  }

  _renderFileTypeIcon(file) {
    const iconAttr = this._getFileTypeIcon(file);
    if (!iconAttr) return null;
    const isUrl = /^(https?:|\/|data:)/.test(iconAttr);
    if (isUrl) {
      return html`<img src="${iconAttr}" alt="" />`;
    }
    const iconify = this._mdiToIconify(iconAttr);
    if (iconify) {
      return html`<dt-icon icon="${iconify}"></dt-icon>`;
    }
    return null;
  }

  _getFilePreviewUrl(file) {
    const thumbnailKey = file.thumbnail_key || file.large_thumbnail_key;
    const isImage = this._isImage(file);
    if (isImage) {
      if (file.large_thumbnail_url) return file.large_thumbnail_url;
      if (file.thumbnail_url) return file.thumbnail_url;
      if (file.url) return file.url;
      if (thumbnailKey) return null;
    }
    return null;
  }

  _handleFileSelect(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    e.target.value = '';
    this._processFiles(files);
  }

  _handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this._dragOver = false;
    e.currentTarget.classList.remove('drag-over');
    if (this.disabled || this.uploading) return;
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length === 0) return;
    this._processFiles(files);
  }

  _handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.disabled && !this.uploading) {
      this._dragOver = true;
      this._expandUploadZone();
      this._cancelScheduledCollapse();
      e.currentTarget.classList.add('drag-over');
    }
  }

  _handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this._dragOver = false;
    e.currentTarget.classList.remove('drag-over');
    this._scheduleCollapse();
  }

  _handleZoneClick(e) {
    if (e.target.closest('input[type="file"]')) return;
    this._expandUploadZone();
    this._cancelScheduledCollapse();
    if (!this.disabled && !this.uploading) {
      const fileInput = this.shadowRoot?.querySelector('input[type="file"]');
      if (fileInput) fileInput.click();
    }
  }

  _handleZoneMouseEnter() {
    if (!this.disabled && !this.uploading) {
      this._expandUploadZone();
      this._cancelScheduledCollapse();
    }
  }

  _handleZoneMouseLeave() {
    this._scheduleCollapse();
  }

  _processFiles(files) {
    const validFiles = this._validateFiles(files);
    if (validFiles.length === 0) return;
    this.error = '';
    const currentCount = (this.value || []).length + this.stagedFiles.length;
    if (this.maxFiles && currentCount + validFiles.length > this.maxFiles) {
      this.error = `${this.maxFiles} files allowed`;
      return;
    }
    if (this.autoUpload) {
      this._uploadFiles(validFiles);
    } else {
      this.stagedFiles = [...this.stagedFiles, ...validFiles];
      this._uploadZoneExpanded = false;
      this.requestUpdate();
      this.updateComplete.then(() => this._refreshMasonry());
    }
  }

  _validateFiles(files) {
    const validFiles = [];
    const maxBytes = this.maxFileSize ? this.maxFileSize * 1024 * 1024 : null;
    const accept = Array.isArray(this.acceptedFileTypes) ? this.acceptedFileTypes : ['image/*', 'application/pdf'];
    const acceptStr = accept.join(',');

    for (const file of files) {
      if (maxBytes && file.size > maxBytes) {
        this.error = `File "${file.name}" exceeds ${this.maxFileSize} MB`;
        continue;
      }
      if (acceptStr && acceptStr !== '*') {
        const match = accept.some((pattern) => {
          if (pattern.startsWith('.')) {
            return file.name.toLowerCase().endsWith(pattern.toLowerCase());
          }
          if (pattern.endsWith('/*')) {
            const base = pattern.slice(0, -2);
            return (file.type || '').startsWith(base);
          }
          return file.type === pattern || (file.name && file.name.toLowerCase().endsWith(`.${pattern.split('/')[1]}`));
        });
        if (!match) {
          this.error = `File type not allowed: ${file.name}`;
          continue;
        }
      }
      validFiles.push(file);
    }
    return validFiles;
  }

  /**
   * Returns true when API (postType/postId/metaKey) is not configured.
   * In standalone mode, upload/delete/rename update local state and fire change events only.
   */
  _isStandaloneMode() {
    return !this.postType || !this.postId || !this.metaKey;
  }

  /**
   * Create mock file objects from File instances for standalone mode (e.g. Storybook).
   * Images get a data URL for url/thumbnail_url; other files get a placeholder url.
   */
  async _filesToMockFileObjects(files) {
    const results = [];
    for (const file of files) {
      const key = `standalone_${Date.now()}_${Math.random().toString(36).slice(2)}_${file.name}`;
      const base = {
        key,
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
      };
      if (this._isImage({ type: file.type })) {
        try {
          const dataUrl = await new Promise((resolve, reject) => {
            const r = new FileReader();
            r.onload = () => resolve(r.result);
            r.onerror = reject;
            r.readAsDataURL(file);
          });
          results.push({ ...base, url: dataUrl, thumbnail_url: dataUrl });
        } catch {
          results.push({ ...base, url: '#' });
        }
      } else {
        results.push({ ...base, url: '#' });
      }
    }
    return results;
  }

  async _uploadFiles(files) {
    if (this._isStandaloneMode()) {
      this.uploading = true;
      this.loading = true;
      this.error = '';
      try {
        const newFiles = await this._filesToMockFileObjects(files);
        const currentValue = Array.isArray(this.value) ? [...this.value] : [];
        this.value = [...currentValue, ...newFiles];
        this.stagedFiles = [];
        this._uploadZoneExpanded = false;
        this.saved = true;
        this.dispatchEvent(
          new CustomEvent('change', {
            bubbles: true,
            detail: { field: this.name, oldValue: this.value, newValue: this.value },
          })
        );
        this._refreshMasonry();
      } catch (err) {
        this.error = err?.message || 'Upload failed';
      } finally {
        this.uploading = false;
        this.loading = false;
      }
      return;
    }

    this.uploading = true;
    this.loading = true;
    this.error = '';

    // Dispatch dt:upload event - componentService will handle the API call
    const event = new CustomEvent('dt:upload', {
      bubbles: true,
      detail: {
        files: files,
        metaKey: this.metaKey,
        keyPrefix: this.keyPrefix || '',
        onSuccess: ({ result, fieldValue }) => {
          // Handle success - merge files with existing value
          const currentValue = Array.isArray(this.value) ? [...this.value] : [];
          const newFiles = (result.uploaded_files || [])
            .filter((uf) => uf.uploaded && uf.file)
            .map((uf) => uf.file);

          if (newFiles.length > 0) {
            // Merge: preserve existing file objects (they have correct thumbnails) and append new ones.
            // Avoid replacing with GET fieldValue which may return stale or differently formatted data.
            const existingKeys = new Set(currentValue.map((f) => String(f.key || f)));
            const merged = [...currentValue];
            for (const nf of newFiles) {
              const k = String(nf.key || nf);
              if (!existingKeys.has(k)) {
                merged.push(nf);
                existingKeys.add(k);
              }
            }
            this.value = merged;
          } else if (Array.isArray(fieldValue) && fieldValue.length > 0) {
            this.value = fieldValue;
          }

          this.stagedFiles = [];
          this.dispatchEvent(
            new CustomEvent('change', {
              bubbles: true,
              detail: { field: this.name, oldValue: this.value, newValue: this.value },
            })
          );
          this._refreshMasonry();
          this._uploadZoneExpanded = false;
          this.saved = true;
          this.uploading = false;
          this.loading = false;
        },
        onError: (error) => {
          console.error('Upload error:', error);
          this.error = error.message || 'Upload failed';
          this.uploading = false;
          this.loading = false;
        },
      },
    });

    this.dispatchEvent(event);
  }

  async _deleteFile(fileKey) {
    if (!this.deleteEnabled) return;
    if (!confirm('Are you sure you want to delete this file?')) return;

    if (this._isStandaloneMode()) {
      const oldValue = Array.isArray(this.value) ? [...this.value] : [];
      this.value = oldValue.filter((f) => (f.key || f) !== fileKey);
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          detail: { field: this.name, oldValue, newValue: this.value },
        })
      );
      this.updateComplete.then(() => this._refreshMasonry());
      return;
    }

    if (!this.postType || !this.postId || !this.metaKey) return;

    this.loading = true;
    this.error = '';

    // Dispatch dt:delete-file event - componentService will handle the API call
    const event = new CustomEvent('dt:delete-file', {
      bubbles: true,
      detail: {
        fileKey: fileKey,
        metaKey: this.metaKey,
        onSuccess: () => {
          this.value = (this.value || []).filter((f) => (f.key || f) !== fileKey);
          this.dispatchEvent(
            new CustomEvent('change', {
              bubbles: true,
              detail: { field: this.name, oldValue: this.value, newValue: this.value },
            })
          );
          this.updateComplete.then(() => this._refreshMasonry());
          this.loading = false;
        },
        onError: (error) => {
          console.error('Delete error:', error);
          this.error = error.message || 'Delete failed';
          this.loading = false;
        },
      },
    });

    this.dispatchEvent(event);
  }

  async _renameFile(fileKey, newName) {
    if (!this.renameEnabled) return;

    if (this._isStandaloneMode()) {
      const currentFiles = this._parseValue(this.value);
      this.value = currentFiles.map((f) => {
        const k = f.key || f;
        if (k === fileKey) return { ...f, name: newName };
        return f;
      });
      this._editingFileKey = '';
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          detail: { field: this.name, oldValue: this.value, newValue: this.value },
        })
      );
      this.updateComplete.then(() => this._refreshMasonry());
      return;
    }

    if (!this.postType || !this.postId || !this.metaKey) return;

    this.loading = true;
    this.error = '';

    // Dispatch dt:rename-file event - componentService will handle the API call
    const event = new CustomEvent('dt:rename-file', {
      bubbles: true,
      detail: {
        fileKey: fileKey,
        newName: newName,
        metaKey: this.metaKey,
        onSuccess: () => {
          const currentFiles = this._parseValue(this.value);
          this.value = currentFiles.map((f) => {
            const k = f.key || f;
            if (k === fileKey) return { ...f, name: newName };
            return f;
          });
          this._editingFileKey = '';
          this.dispatchEvent(
            new CustomEvent('change', {
              bubbles: true,
              detail: { field: this.name, oldValue: this.value, newValue: this.value },
            })
          );
          this.updateComplete.then(() => this._refreshMasonry());
          this.loading = false;
        },
        onError: (error) => {
          console.error('Rename error:', error);
          this.error = error?.message || 'Rename failed';
          this.loading = false;
        },
      },
    });

    this.dispatchEvent(event);
  }

  _startRename(key, name) {
    if (!this.renameEnabled || this.disabled) return;
    this._editingFileKey = typeof key === 'string' ? key : String(key);
    this._editingFileName = name || '';
  }

  _commitRename(key, newName) {
    const trimmed = (newName ?? this._editingFileName ?? '').trim();
    this._editingFileKey = '';
    this._editingFileName = '';
    if (!trimmed) return;
    const files = this._parseValue(this.value);
    const file = files.find((f) => (f.key || f) === key);
    const currentName = file?.name || (typeof key === 'string' ? key.split('/').pop() : '');
    if (trimmed === currentName) return;
    this._renameFile(key, trimmed);
  }

  _cancelRename() {
    this._editingFileKey = '';
    this._editingFileName = '';
  }

  _downloadFile(file) {
    if (!this.downloadEnabled) return;

    if (this._isStandaloneMode()) {
      // Standalone mode: use direct URL if available
      const url = file.url;
      if (!url) return;
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name || 'download';
      a.target = '_blank';
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // API mode: dispatch event for componentService to handle
    const fileKey = file.key || file;
    const fileName = file.name || (typeof fileKey === 'string' ? fileKey.split('/').pop() : 'download') || 'download';

    // Dispatch dt:download-file event - componentService will handle the API call
    const event = new CustomEvent('dt:download-file', {
      bubbles: true,
      detail: {
        fileKey: fileKey,
        fileName: fileName,
        metaKey: this.metaKey,
        onSuccess: () => {
          // Download triggered successfully
        },
        onError: (error) => {
          console.error('Download error:', error);
          this.error = error.message || 'Download failed';
        },
      },
    });

    this.dispatchEvent(event);
  }

  _validateRequired() {
    const files = Array.isArray(this.value) ? this.value : [];
    if (this.required && files.length === 0) {
      this.invalid = true;
      this.internals?.setValidity?.({ valueMissing: true }, this.requiredMessage || 'This field is required');
    } else {
      this.invalid = false;
      this.internals?.setValidity?.({});
    }
  }

  /**
   * Override labelTemplate to handle icon rendering directly using dt-icon component.
   * This prevents dt-label from trying to render MDI icons.
   */
  labelTemplate() {
    if (!this.label) {
      return '';
    }

    // Determine if icon is a URL or MDI format
    let iconContent = null;
    if (this.icon && this.icon.trim()) {
      const iconValue = this.icon.trim();
      const looksLikeUrl =
        iconValue.startsWith('http://') ||
        iconValue.startsWith('https://') ||
        iconValue.startsWith('/') ||
        iconValue.startsWith('data:');

      if (looksLikeUrl) {
        iconContent = html`<img src="${iconValue}" alt="${this.iconAltText || ''}" />`;
      } else if (iconValue.toLowerCase().includes('mdi')) {
        const iconify = this._mdiToIconify(iconValue);
        if (iconify) {
          iconContent = html`<dt-icon icon="${iconify}" size="1em"></dt-icon>`;
        }
      }
    }

    return html`
      <dt-label
        ?private=${this.private}
        privateLabel="${ifDefined(this.privateLabel)}"
        iconAltText="${ifDefined(this.iconAltText)}"
        icon=""
        exportparts="label: label-container"
      >
        ${iconContent
          ? html`<span slot="icon-start">${iconContent}</span>`
          : html`<slot name="icon-start" slot="icon-start"></slot>`}
        ${this.label}
      </dt-label>
    `;
  }

  render() {
    const files = this._parseValue(this.value);
    const layout = this.displayLayout || 'grid';
    const isGrid = layout === 'grid';

    return html`
      <div class="input-group">
        ${this.labelTemplate()}
        <div
          class="upload-zone ${classMap({
            compact: !this._uploadZoneExpanded,
            expanded: this._uploadZoneExpanded,
            disabled: this.disabled,
            'drag-over': this._dragOver,
            uploading: this.uploading,
          })}"
          @click=${this._handleZoneClick}
          @mouseenter=${this._handleZoneMouseEnter}
          @mouseleave=${this._handleZoneMouseLeave}
          @dragover=${this._handleDragOver}
          @dragleave=${this._handleDragLeave}
          @drop=${this._handleDrop}
        >
          <input
            type="file"
            ?multiple=${true}
            accept=${(this.acceptedFileTypes || []).join(',')}
            @change=${this._handleFileSelect}
          />
          <div class="upload-zone-content">
            <span class="upload-icon"><dt-icon icon="mdi:cloud-upload"></dt-icon></span>
            <span class="expandable upload-text">Drag files here or click to upload</span>
            <span class="expandable upload-hint">${(this.acceptedFileTypes || []).join(', ')}${this.maxFileSize ? ` • Max ${this.maxFileSize} MB` : ''}</span>
          </div>
        </div>

        ${when(this.stagedFiles.length > 0 && !this.autoUpload, () => html`
          <div class="staged-files">
            <div class="staged-files-title">Staged files (${this.stagedFiles.length})</div>
            ${repeat(this.stagedFiles, (f, i) => `${f.name}-${f.size}-${i}`, (f, i) => html`
              <div class="staged-file-item">
                <span>${f.name} (${this._formatFileSize(f.size)})</span>
                <button class="remove" type="button" title="Remove" @click=${(e) => { e.stopPropagation(); this._removeStagedFile(i); }}>
                  <dt-icon icon="mdi:trash-can"></dt-icon>
                </button>
              </div>
            `)}
            <button class="upload-staged-btn" type="button" ?disabled=${this.uploading} @click=${() => this.uploadStagedFiles()}>
              Upload
            </button>
          </div>
        `)}

        ${when(files.length > 0, () => html`
          <div class="files-container">
            <div class=${isGrid ? 'files-grid' : 'files-list'}>
              ${repeat(
                files,
                (f) => f.key || f,
                (file) => {
                  const key = typeof file.key === 'string' ? file.key : (typeof file === 'string' ? file : String(file.key ?? file.name ?? ''));
                  const name = file.name || (typeof key === 'string' ? key.split('/').pop() : '');
                  const size = file.size;
                  const previewUrl = this._getFilePreviewUrl(file);
                  const isImage = this._isImage(file);
                  const isEditing = this._editingFileKey === key;

                  return html`
                    <div class="file-item ${isGrid ? 'file-item-grid' : 'file-item-list'}">
                      ${when(
                        previewUrl,
                        () => html`
                          <a
                            class="file-preview-link"
                            href=${file.url || '#'}
                            target="_blank"
                            rel="noopener"
                            @click=${(e) => {
                              if (!file.url) e.preventDefault();
                            }}
                          >
                            <img src="${previewUrl}" alt="${name}" loading="lazy" />
                          </a>
                        `,
                        () => html`
                          ${file.url
                            ? html`
                                <a
                                  class="file-preview-link file-icon-area"
                                  href=${file.url}
                                  target="_blank"
                                  rel="noopener"
                                >
                                  ${this._renderFileTypeIcon(file) || (isImage ? html`<dt-icon icon="mdi:image"></dt-icon>` : html`<dt-icon icon="mdi:file-outline"></dt-icon>`)}
                                </a>
                              `
                            : html`
                                <div class="file-icon-area">
                                  ${this._renderFileTypeIcon(file) || (isImage ? html`<dt-icon icon="mdi:image"></dt-icon>` : html`<dt-icon icon="mdi:file-outline"></dt-icon>`)}
                                </div>
                              `
                          }
                        `
                      )}
                      ${when(
                        isEditing,
                        () => html`
                          <input
                            class="file-name-edit"
                            type="text"
                            .value=${this._editingFileName}
                            @input=${(e) => { this._editingFileName = e.target.value; }}
                            @keydown=${(e) => {
                              if (e.key === 'Enter' || e.keyCode === 13) {
                                e.preventDefault();
                                e.stopPropagation();
                                this._commitRename(key, e.target.value);
                              } else if (e.key === 'Escape' || e.keyCode === 27) {
                                e.preventDefault();
                                this._cancelRename();
                              }
                            }}
                            @blur=${(e) => this._commitRename(key, e.target.value)}
                            @click=${(e) => e.stopPropagation()}
                          />
                        `,
                        () => html`
                          <div
                            class="file-name ${this.renameEnabled && !this.disabled ? 'file-name-editable' : ''}"
                            role=${this.renameEnabled && !this.disabled ? 'button' : undefined}
                            tabindex=${this.renameEnabled && !this.disabled ? 0 : undefined}
                            @click=${(e) => {
                              e.stopPropagation();
                              if (this.renameEnabled && !this.disabled) this._startRename(key, name);
                            }}
                            @keydown=${(e) => {
                              if (this.renameEnabled && !this.disabled && (e.key === 'Enter' || e.key === ' ')) {
                                e.preventDefault();
                                this._startRename(key, name);
                              }
                            }}
                          >
                            ${name}
                          </div>
                        `
                      )}
                      ${when(size != null, () => html`<div class="file-size">${this._formatFileSize(size)}</div>`)}
                      <div class="file-actions">
                        ${when(
                          this.downloadEnabled && file.url,
                          () => html`
                            <button class="download" type="button" @click=${(e) => { e.stopPropagation(); this._downloadFile(file); }} title="Download"><dt-icon icon="mdi:cloud-download"></dt-icon></button>
                          `
                        )}
                        ${when(
                          this.deleteEnabled && !this.disabled,
                          () => html`
                            <button class="delete" type="button" @click=${(e) => { e.stopPropagation(); this._deleteFile(key); }} title="Delete"><dt-icon icon="mdi:trash-can"></dt-icon></button>
                          `
                        )}
                      </div>
                    </div>
                  `;
                }
              )}
            </div>
          </div>
        `)}

        ${this.renderIcons()}
      </div>
    `;
  }
}

customElements.define('dt-file-upload', DtFileUpload);
