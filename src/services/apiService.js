export default class ApiService {
  /**
   * @param nonce - WordPress nonce for authentication
   * @param apiRoot - Root of API (default: wp-json) (i.e. the part before dt/v1/ or dt-posts/v2/)
   */
  constructor(nonce, apiRoot = '/wp-json') {
    this.nonce = nonce;
    let root = apiRoot;

    // strip out domain name (up to first slash)
    if (root.match('^http')) {
      root = root.replace(/^http[s]?:\/\/.*?\//, '');
    }

    // ensure it starts/ends with /
    // by adding start/end slash and replacing any doubles
    root = `/${root}/`.replace(/\/\//g, '/');

    this.apiRoot = root;
  }

  /**
   * Send request to server
   * @param {string} type HTTP Method
   * @param {string} url Either full URL to API endpoint or just the URL segment after base
   * @param {Object} data Post data to send in body of request
   * @param {string} base Base of URL endpoint. Defaults to "dt/v1/"
   * @returns {Promise<any>}
   */
  async makeRequest(type, url, data, base = 'dt/v1/') {
    // make sure base has a trailing slash if url does not start with one
    let urlBase = base;
    if (!urlBase.endsWith('/') && !url.startsWith('/')) {
      urlBase += '/';
    }
    const fullURL = url.startsWith('http')
      ? url
      : `${this.apiRoot}${urlBase}${url}`;

    const options = {
      method: type,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': this.nonce,
      },
    };

    if (type !== 'GET') {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(fullURL, options);


    const content = await response.json();
    if (!response.ok) {
      const error = new Error(content?.message || content.toString());
      error.args = {
        status: response.status,
        statusText: response.statusText,
        body: content,
      }
      throw error;
    }

    return content;
  }

  /**
   * Send request to server for /dt-posts/v2/
   * @param {string} type HTTP Method
   * @param {string} url Either full URL to API endpoint or just the URL segment after base
   * @param {Object} data Post data to send in body of request
   * @returns {Promise<any>}
   */
  async makeRequestOnPosts(type, url, data = {}) {
    return this.makeRequest(type, url, data, 'dt-posts/v2/');
  }

  // region Posts
  /**
   * Get Post from API
   * @param {string} postType
   * @param {number} postId
   * @returns {Promise<any>}
   */
  async getPost(postType, postId) {
    return this.makeRequestOnPosts('GET', `${postType}/${postId}`);
  }

  /**
   * Create Post via API
   * @param {string} postType
   * @param {Object} fields
   * @returns {Promise<any>}
   */
  async createPost(postType, fields) {
    return this.makeRequestOnPosts('POST', postType, fields);
  }

    /**
   * Fetch contacts list via API
   * @param {string} postType
   * @param {Object} data This would be payload to be send while hitting API
   * @returns {Promise<any>}
   */
  async fetchPostsList(postType, data) {
    return this.makeRequestOnPosts('POST', `${postType}/list`, data);
  }

  /**
   * Update Post via API
   * @param {string} postType
   * @param {number} postId
   * @param {Object} data Post data to be updated
   * @returns {Promise<any>}
   */
  async updatePost(postType, postId, data) {
    return this.makeRequestOnPosts('POST', `${postType}/${postId}`, data);
  }

  /**
   * Delete Post via API
   * @param {string} postType
   * @param {number} postId
   * @returns {Promise<any>}
   */
  async deletePost(postType, postId) {
    return this.makeRequestOnPosts('DELETE', `${postType}/${postId}`);
  }

  /**
   * Get compact list of posts for autocomplete fields
   * @param {string} postType
   * @param {string} query - the string to filter the list to. Or the id of the target record
   * @returns {Promise<any>}
   * @see https://developers.disciple.tools/theme-core/api-posts/list-posts-compact
   */
  async listPostsCompact(postType, query = '') {
    const params = new URLSearchParams({
      s: query
    });
    return this.makeRequestOnPosts(
      'GET',
      `${postType}/compact?${params}`
    );
  }

  /**
   * Get duplicates for a post
   * @param {string} postType
   * @param {number} postId
   * @param {Object} args
   * @returns {Promise<any>}
   */
  async getPostDuplicates(postType, postId, args) {
    return this.makeRequestOnPosts(
      'GET',
      `${postType}/${postId}/all_duplicates`,
      args
    );
  }

  async checkFieldValueExists(fieldType, value){
      return this.makeRequestOnPosts(
        'POST',
        `${fieldType}/check_field_value_exists`,
          value
      );
  }

  /**
   * Get values for a multi_select field
   * @param {string} postType
   * @param {string} field
   * @param {string} query - Search Query
   * @returns {Promise<any>}
   */
  async getMultiSelectValues(postType, field, query = '') {
    const params = new URLSearchParams({
      s: query,
      field,
    });
    return this.makeRequestOnPosts(
      'GET',
      `${postType}/multi-select-values?${params}`
    );
  }

  async getLocations(postType, field, filter, query = '') {
    const params = new URLSearchParams({
      s: query,
      field,
      filter,
    });
    return this.makeRequest(
      'GET',
      `mapping_module/search_location_grid_by_name?${params}`
    );
  }

  /**
   * Transfer contact to another site
   * @param {number} contactId
   * @param {string} siteId
   * @returns {Promise<any>}
   */
  async transferContact(contactId, siteId) {
    return this.makeRequestOnPosts('POST', 'contacts/transfer', {
      contact_id: contactId,
      site_post_id: siteId,
    });
  }

  /**
   * Transfer contact summary update
   * @param {number} contactId
   * @param {Object} update
   * @returns {Promise<any>}
   */
  async transferContactSummaryUpdate(contactId, update) {
    return this.makeRequestOnPosts(
      'POST',
      'contacts/transfer/summary/send-update',
      {
        contact_id: contactId,
        update,
      }
    );
  }

  /**
   * Request access to post
   * @param {string} postType
   * @param {number} postId
   * @param {number} userId
   * @returns {Promise<any>}
   */
  async requestRecordAccess(postType, postId, userId) {
    return this.makeRequestOnPosts(
      'POST',
      `${postType}/${postId}/request_record_access`,
      {
        user_id: userId,
      }
    );
  }
  // endregion

  // region Comments
  /**
   * Create comment on post via API
   * @param {string} postType
   * @param {number} postId
   * @param {string} comment Text of comment
   * @param {string} commentType Type of comment
   * @returns {Promise<any>}
   */
  async createComment(postType, postId, comment, commentType = 'comment') {
    return this.makeRequestOnPosts('POST', `${postType}/${postId}/comments`, {
      comment,
      comment_type: commentType,
    });
  }

  /**
   * Update post comment via API
   * @param {string} postType
   * @param {number} postId
   * @param {number} commentId
   * @param {string} commentContent
   * @param {string} commentType
   * @returns {Promise<any>}
   */
  async updateComment(
    postType,
    postId,
    commentId,
    commentContent,
    commentType = 'comment'
  ) {
    return this.makeRequestOnPosts(
      'POST',
      `${postType}/${postId}/comments/${commentId}`,
      {
        comment: commentContent,
        comment_type: commentType,
      }
    );
  }

  /**
   * Delete post comment via API
   * @param {string} postType
   * @param {number} postId
   * @param {number} commentId
   * @returns {Promise<any>}
   */
  async deleteComment(postType, postId, commentId) {
    return this.makeRequestOnPosts(
      'DELETE',
      `${postType}/${postId}/comments/${commentId}`
    );
  }

  /**
   * Get post comments via API
   * @param {string} postType
   * @param {number} postId
   * @returns {Promise<any>}
   */
  async getComments(postType, postId) {
    return this.makeRequestOnPosts('GET', `${postType}/${postId}/comments`);
  }

  /**
   * Toggle post comment reaction
   * @param {string} postType
   * @param {number} postId
   * @param {number} commentId
   * @param {number} userId
   * @param {string} reaction
   * @returns {Promise<any>}
   */
  async toggle_comment_reaction(postType, postId, commentId, userId, reaction) {
    return this.makeRequestOnPosts(
      'POST',
      `${postType}/${postId}/comments/${commentId}/react`,
      {
        user_id: userId,
        reaction,
      }
    );
  }
  // endregion

  // region Activity
  /**
   * Get all activity for a post
   * @param {string} postType
   * @param {number} postId
   * @returns {Promise<any>}
   */
  async getPostActivity(postType, postId) {
    return this.makeRequestOnPosts('GET', `${postType}/${postId}/activity`);
  }

  /**
   * Get single activity for a post
   * @param {string} postType
   * @param {number} postId
   * @param {number} activityId
   * @returns {Promise<any>}
   */
  async getSingleActivity(postType, postId, activityId) {
    return this.makeRequestOnPosts(
      'GET',
      `${postType}/${postId}/activity/${activityId}`
    );
  }

  /**
   * Revert post activity
   * @param {string} postType
   * @param {number} postId
   * @param {number} activityId
   * @returns {Promise<any>}
   */
  async revertActivity(postType, postId, activityId) {
    return this.makeRequestOnPosts(
      'GET',
      `${postType}/${postId}/revert/${activityId}`
    );
  }

  // endregion

  // region Shares
  /**
   * Get all share for a post
   * @param {string} postType
   * @param {number} postId
   * @returns {Promise<any>}
   */
  async getPostShares(postType, postId) {
    return this.makeRequestOnPosts('GET', `${postType}/${postId}/shares`);
  }

  /**
   * Share a post with a user
   * @param {string} postType
   * @param {number} postId
   * @param {number} userId
   * @returns {Promise<any>}
   */
  async addPostShare(postType, postId, userId) {
    return this.makeRequestOnPosts('POST', `${postType}/${postId}/shares`, {
      user_id: userId,
    });
  }

  /**
   * Un-share a post with a user
   * @param {string} postType
   * @param {number} postId
   * @param {number} userId
   * @returns {Promise<any>}
   */
  async removePostShare(postType, postId, userId) {
    return this.makeRequestOnPosts('DELETE', `${postType}/${postId}/shares`, {
      user_id: userId,
    });
  }
  // endregion

  // region Filters
  /**
   * Get Filters
   * @returns {Promise<any>}
   */
  async getFilters() {
    return this.makeRequest('GET', 'users/get_filters');
  }

  /**
   * Save filters
   * @param {string} postType
   * @param {Object} filter
   * @returns {Promise<any>}
   */
  async saveFilters(postType, filter) {
    return this.makeRequest('POST', 'users/save_filters', { filter, postType });
  }

  /**
   * Delete filter
   * @param {string} postType
   * @param {number} id
   * @returns {Promise<void>}
   */
  async deleteFilter(postType, id) {
    return this.makeRequest('DELETE', 'users/save_filters', { id, postType });
  }
  // endregion

  // region Users
  /**
   * Search users
   * @param {string} query
   * @returns {Promise<any>}
   */
  async searchUsers(postType, query = '') {
    const params = new URLSearchParams({
      s: query
    });
    return this.makeRequest('GET', `users/get_users?${params}&post_type=${postType}`);
  }

  // Duplicate Users
  async checkDuplicateUsers(postType,postId){
    return this.makeRequestOnPosts('GET', `${postType}/${postId}/duplicates`);
  }

  async getContactInfo(postType,postId){
    return this.makeRequestOnPosts('GET', `${postType}/${postId}/`);
  }

  /**
   * Create user
   * @param {Object} user
   * @returns {Promise<any>}
   */
  async createUser(user) {
    return this.makeRequest('POST', 'users/create', user);
  }
  // endregion

  /**
   * Advanced search
   * @param {string} query
   * @param {string} postType
   * @param {number} offset
   * @param {Object} filters
   * @param {Object} filters.post
   * @param {Object} filters.comment
   * @param {Object} filters.meta
   * @param {Object} filters.status
   * @returns {Promise<any>}
   */
  async advanced_search(query, postType, offset, filters) {
    return this.makeRequest(
      'GET',
      'advanced_search',
      {
        query,
        postType,
        offset,
        post: filters.post,
        comment: filters.comment,
        meta: filters.meta,
        status: filters.status,
      },
      'dt-posts/v2/posts/search/'
    );
  }

  // region File Storage
  /**
   * Upload files to storage
   * @param {string} postType
   * @param {number} postId
   * @param {File[]} files - Array of File objects
   * @param {string} metaKey
   * @param {string} keyPrefix
   * @returns {Promise<any>}
   */
  async uploadFiles(postType, postId, files, metaKey, keyPrefix = '') {
    const formData = new FormData();
    files.forEach((f) => formData.append('storage_upload_files[]', f));
    formData.append('meta_key', metaKey);
    formData.append('key_prefix', keyPrefix);
    formData.append('upload_type', 'post');
    formData.append('is_multi_file', 'true');
    formData.append('storage_s3_url_duration', '+7 days');

    const url = `${this.apiRoot}dt-posts/v2/${postType}/${postId}/storage_upload`;
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.withCredentials = true;
      xhr.setRequestHeader('X-WP-Nonce', this.nonce);

      xhr.onload = () => {
        let content = {};
        try {
          content = JSON.parse(xhr.responseText || '{}');
        } catch {
          content = { message: xhr.responseText || 'Upload failed' };
        }

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(content);
        } else {
          const error = new Error(
            content?.uploaded_msg || content?.message || 'Upload failed'
          );
          error.args = {
            status: xhr.status,
            statusText: xhr.statusText,
            body: content,
          };
          reject(error);
        }
      };

      xhr.onerror = () => reject(new Error('Upload failed'));
      xhr.send(formData);
    });
  }

  /**
   * Delete a single file from storage
   * @param {string} postType
   * @param {number} postId
   * @param {string} metaKey
   * @param {string} fileKey
   * @returns {Promise<any>}
   */
  async deleteFile(postType, postId, metaKey, fileKey) {
    return this.makeRequestOnPosts('POST', `${postType}/${postId}/storage_delete_single`, {
      meta_key: metaKey,
      file_key: fileKey,
    });
  }

  /**
   * Rename a single file in storage
   * @param {string} postType
   * @param {number} postId
   * @param {string} metaKey
   * @param {string} fileKey
   * @param {string} newName
   * @returns {Promise<any>}
   */
  async renameFile(postType, postId, metaKey, fileKey, newName) {
    return this.makeRequestOnPosts('POST', `${postType}/${postId}/storage_rename_single`, {
      meta_key: metaKey,
      file_key: fileKey,
      new_name: newName,
    });
  }

  /**
   * Download a file from storage via proxy endpoint
   * @param {string} postType
   * @param {number} postId
   * @param {string} metaKey
   * @param {string} fileKey
   * @returns {Promise<Blob>} File blob for download
   */
  async downloadFile(postType, postId, metaKey, fileKey) {
    const url = `${this.apiRoot}dt-posts/v2/${postType}/${postId}/storage_download`;

    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': this.nonce,
      },
      body: JSON.stringify({
        meta_key: metaKey,
        file_key: fileKey,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Download failed' }));
      throw new Error(error.message || 'Download failed');
    }

    // Return blob for download handling
    return await response.blob();
  }
  // endregion
}
