# dt-file-upload

A web component for uploading multiple files (pictures, documents, PDFs, voice messages, etc.) with drag & drop support, file preview, and both auto-upload and manual upload modes.

## Features

- **Multiple file uploads**: Upload multiple files at once
- **Drag & drop**: Intuitive drag and drop interface
- **File preview**: Grid and list layout options with image thumbnails
- **File validation**: Client-side validation for file types and sizes
- **Auto-upload**: Automatically upload files when selected/dropped (default)
- **Manual upload**: Option to stage files and upload manually via JavaScript event
- **File deletion**: Delete individual files (configurable)
- **File download**: Download individual files (configurable)
- **File rename**: Inline rename of uploaded files (configurable)
- **Progress indicators**: Visual feedback during uploads
- **Error handling**: Clear error messages for validation failures
- **Compact upload zone**: Default collapsed state (cloud icon only); expands on hover, click, or drag-over; collapses after upload, staging, or when idle

## Usage

### Basic Example

```html
<dt-file-upload
  name="files"
  label="Upload Files"
  post-type="contacts"
  post-id="123"
  meta-key="files"
></dt-file-upload>
```

### With Configuration

```html
<dt-file-upload
  name="documents"
  label="Upload Documents"
  accepted-file-types='["application/pdf", ".doc", ".docx"]'
  max-file-size="10"
  max-files="5"
  display-layout="list"
  delete-enabled="true"
  download-enabled="true"
  rename-enabled="true"
  auto-upload="true"
  file-type-icon="mdi:file-document"
  post-type="contacts"
  post-id="123"
  meta-key="documents"
></dt-file-upload>
```

### Manual Upload Mode

```html
<dt-file-upload
  name="files"
  auto-upload="false"
  post-type="contacts"
  post-id="123"
  meta-key="files"
></dt-file-upload>

<script>
  const uploadComponent = document.querySelector('dt-file-upload');

  // Trigger upload manually
  uploadComponent.dispatchEvent(new CustomEvent('dt:upload-files'));

  // Or use the public method
  uploadComponent.uploadStagedFiles();
</script>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | Array | `[]` | JSON array of file objects |
| `acceptedFileTypes` | Array | `['image/*', 'application/pdf']` | Array of accepted MIME types or extensions |
| `maxFileSize` | Number | `null` | Maximum file size in MB |
| `maxFiles` | Number | `null` | Maximum number of files allowed |
| `deleteEnabled` | Boolean | `true` | Enable/disable file deletion |
| `downloadEnabled` | Boolean | `true` | Enable/disable file download |
| `renameEnabled` | Boolean | `true` | Enable/disable inline file rename |
| `displayLayout` | String | `'grid'` | Display layout: `'grid'` or `'list'` |
| `fileTypeIcon` | String | `''` | Icon for non-image files: image URL (http/https/data) or MDI/Iconify icon (e.g. `mdi:file-text`, `mdi mdi-file-text`) |
| `autoUpload` | Boolean | `true` | Automatically upload files when selected/dropped |
| `postType` | String | `''` | Post type for API calls |
| `postId` | String | `''` | Post ID for API calls |
| `metaKey` | String | `''` | Meta key for storing file data |
| `keyPrefix` | String | `''` | Key prefix for storage |

## Events

### `change`

Fired when files are uploaded or deleted.

```javascript
element.addEventListener('change', (e) => {
  console.log('Field:', e.detail.field);
  console.log('Old value:', e.detail.oldValue);
  console.log('New value:', e.detail.newValue);
});
```

### `dt:upload-files`

Custom event to trigger manual upload when `autoUpload` is `false`.

```javascript
element.dispatchEvent(new CustomEvent('dt:upload-files'));
```

## Methods

### `uploadStagedFiles()`

Public method to trigger upload of staged files (when `autoUpload` is `false`).

```javascript
const component = document.querySelector('dt-file-upload');
component.uploadStagedFiles();
```

## File Object Format

Files are stored as an array of objects with the following structure:

```javascript
[
  {
    key: "site_id/prefix_randomstring.ext",
    name: "original_filename.pdf",
    type: "application/pdf",
    size: 12345,
    url: "https://...",                    // Presigned URL for download/preview
    thumbnail_key: "...",                  // Optional, for images
    thumbnail_url: "https://...",          // Optional, for image thumbnails
    large_thumbnail_key: "...",             // Optional, for images
    large_thumbnail_url: "https://..."     // Optional, for larger image thumbnails
  }
]
```

## Styling

The component uses CSS custom properties for theming:

- `--dt-upload-border-color`: Border color of upload zone
- `--dt-upload-background-color`: Background color of upload zone
- `--dt-file-upload-border-color`: Border color of file items
- `--dt-file-upload-background-color`: Background color of file items
- `--dt-file-upload-icon-background`: Background color of file type icon area
- `--dt-file-upload-icon-color`: Color of file type icon
- `--dt-file-upload-name-color`: Color of file name text
- `--dt-file-upload-size-color`: Color of file size text
- `--primary-color`: Primary color for buttons and accents
- `--alert-color`: Color for delete buttons and errors

## Browser Support

Requires modern browsers with support for:
- Custom Elements
- Shadow DOM
- Fetch API
- FormData API
- File API

## Dependencies

- `dt-form-base`: Base form component functionality
- `dt-icon`: Icon component
- `dt-spinner`: Loading spinner component
