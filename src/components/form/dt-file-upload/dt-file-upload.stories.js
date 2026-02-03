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
    displayLayout = 'grid',
    fileTypeIcon,
    autoUpload = true,
    postType = 'contacts',
    postId = '1',
    metaKey = 'files',
    disabled = false,
    required = false,
    requiredMessage,
    icon = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
    iconAltText = 'Icon Alt Text',
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
      ?delete-enabled=${deleteEnabled}
      display-layout=${displayLayout}
      file-type-icon="${ifDefined(fileTypeIcon)}"
      ?auto-upload=${autoUpload}
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
    },
    {
      key: 'site_id/prefix_randomstring2.pdf',
      name: 'document.pdf',
      type: 'application/pdf',
      size: 456789,
      uploaded_at: '2026-01-27T10:05:00Z',
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
    },
    {
      key: 'site_id/prefix_randomstring2.pdf',
      name: 'document.pdf',
      type: 'application/pdf',
      size: 456789,
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
    },
    {
      key: 'site_id/prefix_randomstring2.pdf',
      name: 'document.pdf',
      type: 'application/pdf',
      size: 456789,
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
  value: [
    {
      key: 'site_id/prefix_randomstring1.jpg',
      name: 'photo1.jpg',
      type: 'image/jpeg',
      size: 123456,
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
    },
  ],
};
