import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { argTypes } from '../../../stories-theme.js';
import {
  FormDecorator,
  LocaleDecorator,
  onAutoSave,
} from '../../../stories-utils.js';
import './dt-file-upload.js';

// Data URIs for sample images (visible colored squares)
// Blue gradient image (100x100px)
const SAMPLE_IMAGE_URL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM0Njk2ZWIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyNTU5YjMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==';
// Smaller thumbnail version (50x50px)
const SAMPLE_THUMBNAIL_URL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNDY5NmViIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMjU1OWIzIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+';

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
      url: '#',
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
      url: '#',
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
      url: '#',
    },
  ],
};

export const ManualUpload = Template.bind({});
ManualUpload.args = {
  autoUpload: false,
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
