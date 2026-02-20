import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import sampleImage from '../../../../assets/dt-caret.png';
import {
  FormDecorator,
  LocaleDecorator,
  onAutoSave,
} from '../../../stories-utils.js';
import './dt-file-upload.js';

// Sample image used for Storybook previews (local asset).
const SAMPLE_IMAGE_URL = sampleImage;
const SAMPLE_THUMBNAIL_URL = sampleImage;

// Static asset URLs served via Storybook's staticDirs ('../assets').
const SAMPLE_PDF_URL = '/file-upload/document.pdf';
const SAMPLE_DOCX_URL = '/file-upload/report.docx';
const SAMPLE_TXT_URL = '/file-upload/notes.txt';
const SAMPLE_JSON_URL = '/file-upload/data.json';
const SAMPLE_HTML_URL = '/file-upload/page.html';
const SAMPLE_XML_URL = '/file-upload/config.xml';
const SAMPLE_UNKNOWN_URL = '/file-upload/mystery.unknown';

export default {
  title: 'Components/Form/File Upload',
  component: 'dt-file-upload',
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    value: {
      control: 'text',
      type: { name: 'array' },
    },
    acceptedFileTypes: {
      control: 'array',
      description: 'Array of accepted MIME types or extensions',
    },
    maxFileSize: { control: 'number' },
    maxFiles: { control: 'number' },
    deleteEnabled: { control: 'boolean' },
    downloadEnabled: { control: 'boolean' },
    renameEnabled: { control: 'boolean' },
    displayLayout: {
      control: 'select',
      options: ['grid', 'list'],
    },
    fileTypeIcon: { control: 'text' },
    autoUpload: { control: 'boolean' },
    postType: { control: 'text' },
    postId: { control: 'text' },
    metaKey: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    saved: { control: 'boolean' },
    ...argTypes,
  },
  args: {
    onChange: action('on-change'),
    onUpload: action('dt:upload'),
    onDeleteFile: action('dt:delete-file'),
    onRenameFile: action('dt:rename-file'),
    onDownloadFile: action('dt:download-file'),
  },
};

function Template(args) {
  const {
    name = 'upload-field',
    label = 'Upload Files',
    value = [],
    acceptedFileTypes = ['image/*', 'application/pdf'],
    maxFileSize,
    maxFiles,
    deleteEnabled = true,
    downloadEnabled = true,
    renameEnabled = true,
    displayLayout = 'grid',
    fileTypeIcon,
    autoUpload = true,
    postType = '',
    postId = '',
    metaKey = '',
    disabled = false,
    required = false,
    requiredMessage,
    icon = 'mdi:cloud-upload',
    iconAltText = 'Upload icon',
    isPrivate,
    privateLabel,
    loading = false,
    saved = false,
    error,
    onChange,
    onUpload,
    onDeleteFile,
    onRenameFile,
    onDownloadFile,
    slot,
  } = args;

  // Mock wpApiShare for Storybook
  if (typeof window !== 'undefined' && !window.wpApiShare) {
    window.wpApiShare = {
      nonce: 'mock-nonce',
      root: '/wp-json',
    };
  }

  return html`
    <dt-file-upload
      name=${name}
      label=${label}
      .value=${JSON.stringify(value)}
      .acceptedFileTypes=${acceptedFileTypes}
      max-file-size=${ifDefined(maxFileSize)}
      max-files=${ifDefined(maxFiles)}
      .deleteEnabled=${deleteEnabled}
      .downloadEnabled=${downloadEnabled}
      .renameEnabled=${renameEnabled}
      display-layout=${displayLayout}
      file-type-icon="${ifDefined(fileTypeIcon)}"
      .autoUpload=${autoUpload}
      postType=${postType}
      postId=${postId}
      meta-key=${metaKey}
      ?disabled=${disabled}
      ?required=${required}
      requiredMessage=${ifDefined(requiredMessage)}
      icon="${icon}"
      iconAltText="${iconAltText}"
      ?private=${isPrivate}
      privateLabel="${ifDefined(privateLabel)}"
      ?loading=${loading}
      ?saved=${saved}
      error="${ifDefined(error)}"
      @change=${onChange}
      @dt:upload=${onUpload}
      @dt:delete-file=${onDeleteFile}
      @dt:rename-file=${onRenameFile}
      @dt:download-file=${onDownloadFile}
    >
      ${slot}
    </dt-file-upload>
  `;
}

export const Empty = Template.bind({});

export const WithFiles = Template.bind({});
WithFiles.args = {
  value: [
    {
      key: 'site_id/prefix_randomstring1.jpg',
      name: 'photo1.jpg',
      type: 'image/jpeg',
      size: 123456,
      uploaded_at: '2026-01-27T10:00:00Z',
      thumbnail_key: 'site_id/prefix_randomstring1_thumbnail.jpg',
      thumbnail_url: SAMPLE_THUMBNAIL_URL,
      url: SAMPLE_IMAGE_URL,
    },
    {
      key: 'site_id/prefix_randomstring2.pdf',
      name: 'document.pdf',
      type: 'application/pdf',
      size: 456789,
      uploaded_at: '2026-01-27T10:05:00Z',
      url: SAMPLE_PDF_URL,
    },
  ],
};

export const GridLayout = Template.bind({});
GridLayout.args = {
  displayLayout: 'grid',
  value: [
    {
      key: 'site_id/prefix_randomstring1.jpg',
      name: 'photo1.jpg',
      type: 'image/jpeg',
      size: 123456,
      thumbnail_key: 'site_id/prefix_randomstring1_thumbnail.jpg',
      thumbnail_url: SAMPLE_THUMBNAIL_URL,
      url: SAMPLE_IMAGE_URL,
    },
    {
      key: 'site_id/prefix_randomstring2.pdf',
      name: 'document.pdf',
      type: 'application/pdf',
      size: 456789,
      url: SAMPLE_PDF_URL,
    },
  ],
};

export const ListLayout = Template.bind({});
ListLayout.args = {
  displayLayout: 'list',
  value: [
    {
      key: 'site_id/prefix_randomstring1.jpg',
      name: 'photo1.jpg',
      type: 'image/jpeg',
      size: 123456,
      thumbnail_key: 'site_id/prefix_randomstring1_thumbnail.jpg',
      thumbnail_url: SAMPLE_THUMBNAIL_URL,
      url: SAMPLE_IMAGE_URL,
    },
    {
      key: 'site_id/prefix_randomstring2.pdf',
      name: 'document.pdf',
      type: 'application/pdf',
      size: 456789,
      url: SAMPLE_PDF_URL,
    },
  ],
};

export const ManualUpload = {
  render: (args) => Template(args),
  args: {
    label: 'Manual Upload',
    autoUpload: false,
    acceptedFileTypes: ['image/*', 'application/pdf'],
    maxFiles: 3,
    value: [],
  },
};

export const NoDelete = Template.bind({});
NoDelete.args = {
  deleteEnabled: false,
  value: [
    {
      key: 'site_id/prefix_randomstring1.jpg',
      name: 'photo1.jpg',
      type: 'image/jpeg',
      size: 123456,
      thumbnail_url: SAMPLE_THUMBNAIL_URL,
      url: SAMPLE_IMAGE_URL,
    },
  ],
};

export const MaxFiles = Template.bind({});
MaxFiles.args = {
  maxFiles: 3,
};

export const MaxFileSize = Template.bind({});
MaxFileSize.args = {
  maxFileSize: 5, // 5MB
};

export const CustomFileTypes = Template.bind({});
CustomFileTypes.args = {
  acceptedFileTypes: ['.pdf', '.doc', '.docx'],
};

export const AutoFileTypeIcons = Template.bind({});
AutoFileTypeIcons.args = {
  // No file-type-icon specified - demonstrates automatic icon detection
  value: [
    {
      key: 'site_id/prefix_randomstring1.pdf',
      name: 'document.pdf',
      type: 'application/pdf',
      size: 123456,
      url: SAMPLE_PDF_URL,
    },
    {
      key: 'site_id/prefix_randomstring2.docx',
      name: 'report.docx',
      type: 'application/msword',
      size: 234567,
      url: SAMPLE_DOCX_URL,
    },
    {
      key: 'site_id/prefix_randomstring3.txt',
      name: 'notes.txt',
      type: 'text/plain',
      size: 3456,
      url: SAMPLE_TXT_URL,
    },
    {
      key: 'site_id/prefix_randomstring4.json',
      name: 'data.json',
      type: 'application/json',
      size: 5678,
      url: SAMPLE_JSON_URL,
    },
    {
      key: 'site_id/prefix_randomstring5.html',
      name: 'page.html',
      type: 'text/html',
      size: 8901,
      url: SAMPLE_HTML_URL,
    },
    {
      key: 'site_id/prefix_randomstring6.xml',
      name: 'config.xml',
      type: 'application/xml',
      size: 12345,
      url: SAMPLE_XML_URL,
    },
    {
      key: 'site_id/prefix_randomstring7.unknown',
      name: 'mystery.unknown',
      type: 'application/octet-stream',
      size: 9999,
      url: SAMPLE_UNKNOWN_URL,
    },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  deleteEnabled: true, // Explicitly set to test that delete button is hidden when disabled
  value: [
    {
      key: 'site_id/prefix_randomstring1.jpg',
      name: 'photo1.jpg',
      type: 'image/jpeg',
      size: 123456,
      thumbnail_url: SAMPLE_THUMBNAIL_URL,
      url: SAMPLE_IMAGE_URL,
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const Saved = Template.bind({});
Saved.args = {
  saved: true,
};

export const Error = Template.bind({});
Error.args = {
  error: 'Upload failed: File size exceeds limit',
};

export const Required = Template.bind({});
Required.decorators = [FormDecorator];
Required.args = {
  required: true,
};

export const BasicForm = Template.bind({});
BasicForm.decorators = [FormDecorator];
BasicForm.args = {
  value: [],
};

export const AutoSave = Template.bind({});
AutoSave.args = {
  onChange: onAutoSave,
  value: [
    {
      key: 'site_id/prefix_randomstring1.jpg',
      name: 'photo1.jpg',
      type: 'image/jpeg',
      size: 123456,
      thumbnail_url: SAMPLE_THUMBNAIL_URL,
      url: SAMPLE_IMAGE_URL,
    },
  ],
};
