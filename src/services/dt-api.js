/* eslint-disable camelcase */
export const DtAPI = (() => {
  const services = {}

  services.makeRequest = async (type, url, data, base = "dt/v1/", apiRoot, nonce) => {
    // make sure base has a trailing slash if url does not start with one
    if ( !base.endsWith('/') && !url.startsWith('/')){
      base += '/'
    }
    const fullURL = url.startsWith("http") ? url : `${apiRoot}${base}${url}`;

    const options = {
      method: type,
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce' : nonce
      },
    };

    if ( type !== "GET" ) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch( fullURL, options )

    const content = await response.json();
    console.log(content);
    return content
  }



  services.makeRequestOnPosts = async (type, url, data, apiRoot, nonce) => {
    const fullURL = url.startsWith("http") ? url : `${apiRoot}dt-posts/v2/${url}`;

    const options = {
      method: type,
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce' : nonce
      },
    };

    if ( type !== "GET" ) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch( fullURL, options )
    const content = await response.json();
    console.log(content);
    return content
  }

  services.get_post = async (post_type, postId) =>
  this.makeRequestOnPosts("GET", `${post_type}/${postId}`);

  services.create_post = async (post_type, fields) => this.makeRequestOnPosts("POST", `${post_type}`, fields);

  services.update_post = async (post_type, postId, postData) => this.makeRequestOnPosts("POST", `${post_type}/${postId}`, postData);

  services.delete_post = async (post_type, postId) => this.makeRequestOnPosts("DELETE", `${post_type}/${postId}`);

  services.post_comment = async (post_type, postId, comment, comment_type = "comment") =>
    this.makeRequestOnPosts("POST", `${post_type}/${postId}/comments`, {
      comment,
      comment_type,
    });

  services.delete_comment = async (post_type, postId, comment_ID) =>
      this.makeRequestOnPosts(
        "DELETE",
        `${post_type}/${postId}/comments/${comment_ID}`
      );

  services.update_comment = async (
      post_type,
      postId,
      comment_ID,
      comment_content,
      commentType = "comment"
    ) =>
    this.makeRequestOnPosts(
      "POST",
      `${post_type}/${postId}/comments/${comment_ID}`,
      { comment: comment_content, comment_type: commentType }
    );

  services.get_comments = async (post_type, postId) =>
      this.makeRequestOnPosts("GET", `${post_type}/${postId}/comments`);

  services.toggle_comment_reaction = async (postType, postId, commentId, userId, reaction) => {
      this.makeRequestOnPosts(
        "POST",
        `${postType}/${postId}/comments/${commentId}/react`,
        { user_id: userId, reaction }
      )
    };

  services.get_activity = async (post_type, postId) =>
      this.makeRequestOnPosts("GET", `${post_type}/${postId}/activity`);

  services.get_single_activity = async (post_type, postId, activityId) =>
      this.makeRequestOnPosts("GET", `${post_type}/${postId}/activity/${activityId}`);

  services.get_shared = async (post_type, postId) =>
      this.makeRequestOnPosts("GET", `${post_type}/${postId}/shares`);

  services.add_shared = async (post_type, postId, userId) =>
      this.makeRequestOnPosts("POST", `${post_type}/${postId}/shares`, {
        user_id: userId,
      });

  services.remove_shared = async (post_type, postId, userId) =>
      this.makeRequestOnPosts("DELETE", `${post_type}/${postId}/shares`, {
        user_id: userId,
      });

  services.save_field_api = async (post_type, postId, postData) =>
      this.makeRequestOnPosts("POST", `${post_type}/${postId}`, postData);

  services.revert_activity = async (post_type, postId, activityId) =>
      this.makeRequestOnPosts("GET", `${post_type}/${postId}/revert/${activityId}`);

  services.search_users = async (query) =>this.makeRequest("GET", `users/get_users?s=${query}`);

  services.get_filters = async () =>this.makeRequest("GET", "users/get_filters");

  services.save_filters = async (post_type, filter) =>
     this.makeRequest("POST", "users/save_filters", { filter, post_type });

  services.delete_filter = async (post_type, id) =>
     this.makeRequest("DELETE", "users/save_filters", { id, post_type });

  services.get_duplicates_on_post = async (post_type, postId, args) =>
      this.makeRequestOnPosts("GET", `${post_type}/${postId}/all_duplicates`, args);

  services.create_user = async (user) =>this.makeRequest("POST", "users/create", user);

  services.transfer_contact = async (contactId, siteId) =>
      this.makeRequestOnPosts("POST", "contacts/transfer", {
        contact_id: contactId,
        site_post_id: siteId,
      });

  services.transfer_contact_summary_update = async (contactId, update) =>
      this.makeRequestOnPosts("POST", "contacts/transfer/summary/send-update", {
        contact_id: contactId,
        update,
      });

  services.request_record_access = async (post_type, postId, userId) =>
      this.makeRequestOnPosts("POST", `${post_type}/${postId}/request_record_access`, {
        user_id: userId,
      });

  services.advanced_search = async (search_query, post_type, offset, filters) =>this.makeRequest("GET", `advanced_search`, {
      query: search_query,
      post_type,
      offset,
      post: filters.post,
      comment: filters.comment,
      meta: filters.meta,
      status: filters.status
    }, 'dt-posts/v2/posts/search/')
    return services;
  })();
