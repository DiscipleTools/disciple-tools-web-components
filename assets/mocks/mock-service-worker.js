/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', async (event) => {
  const request = event.request;
  const url = (new URL(request.url));
  const defaultPostsList = [
    {
        "ID": "1",
        "post_title": "test",
        "post_type": "contacts",
        "post_date": {
            "timestamp": 1660333623,
            "formatted": "2022-08-12"
        },
        "favorite": true,
        "groups": [
            {
                "ID": "2",
                "post_type": "groups",
                "post_date_gmt": "2022-08-10 13:14:40",
                "post_date": "2022-08-10 13:14:40",
                "post_title": "Group 1",
                "permalink": "https://DT.local/groups/5/",
                "status": {
                    "key": "active",
                    "label": "Active",
                    "color": "#4CAF50"
                }
            }
        ],
        "last_modified": {
            "timestamp": 1660333623,
            "formatted": "2022-08-12"
        },
        "seeker_path": {
            "key": "none",
            "label": "Contact Attempt Needed"
        },
        "overall_status": {
            "key": "active",
            "label": "Active"
        },
        "milestones": [
            "milestone_has_bible",
            "milestone_reading_bible",
            "milestone_belief",
            "milestone_can_share",
            "milestone_baptized"
        ],
        "assigned_to": {
            "id": "3",
            "type": "user",
            "display": "johndoe",
            "assigned-to": "user-1"
        },
        "permalink": "https://DT.local/contacts/16",
        "name": "test"
    },
    {
        "ID": "17",
        "post_title": "archived",
        "post_type": "contacts",
        "post_date": {
            "timestamp": 1660924474,
            "formatted": "2022-08-19"
        },
        "groups": [],
        "last_modified": {
            "timestamp": 1660924616,
            "formatted": "2022-08-19"
        },
        "seeker_path": {
            "key": "none",
            "label": "Contact Attempt Needed"
        },
        "overall_status": {
            "key": "closed",
            "label": "Archived"
        },
        "assigned_to": {
            "id": "1",
            "type": "user",
            "display": "micahmills",
            "assigned-to": "user-1"
        },
        "permalink": "https://DT.local/contacts/17",
        "name": "archived"
    },
    {
        "ID": "4",
        "post_title": "johndoe",
        "post_type": "contacts",
        "post_date": {
            "timestamp": 1660155962,
            "formatted": "2022-08-10"
        },
        "groups": [],
        "last_modified": {
            "timestamp": 1660155962,
            "formatted": "2022-08-10"
        },
        "overall_status": {
          "key": "active",
          "label": "Active"
        },
        "permalink": "https://dt.local/contacts/15",
        "name": "johndoe"
    },
  ]
  const singlePost = {
    "ID": "1",
    "post_title": "test",
    "post_type": "contacts",
    "post_date": {
        "timestamp": 1660333623,
        "formatted": "2022-08-12"
    },
    "groups": [
        {
            "ID": "2",
            "post_type": "groups",
            "post_date_gmt": "2022-08-10 13:14:40",
            "post_date": "2022-08-10 13:14:40",
            "post_title": "Group 1",
            "permalink": "https://DT.local/groups/5/",
            "status": {
                "key": "active",
                "label": "Active",
                "color": "#4CAF50"
            }
        }
    ],
    "last_modified": {
        "timestamp": 1660333623,
        "formatted": "2022-08-12"
    },
    "seeker_path": {
        "key": "none",
        "label": "Contact Attempt Needed"
    },
    "overall_status": {
        "key": "active",
        "label": "Active"
    },
    "milestones": [
        "milestone_has_bible",
        "milestone_reading_bible",
        "milestone_belief",
        "milestone_can_share",
        "milestone_baptized"
    ],
    "assigned_to": {
        "id": "3",
        "type": "user",
        "display": "johndoe",
        "assigned-to": "user-1"
    },
    "permalink": "https://DT.local/contacts/16",
    "name": "test"
  }
  const createdSinglePost = {
    "ID": "3",
    "post_title": "Created From API",
    "post_type": "contacts",
    "post_date": {
        "timestamp": 1660336623,
        "formatted": "2022-08-26"
    },
    "groups": [
        {
            "ID": "2",
            "post_type": "groups",
            "post_date_gmt": "2022-08-10 13:14:40",
            "post_date": "2022-08-10 13:14:40",
            "post_title": "Group 1",
            "permalink": "https://DT.local/groups/5/",
            "status": {
                "key": "active",
                "label": "Active",
                "color": "#4CAF50"
            }
        }
    ],
    "last_modified": {
        "timestamp": 1660333623,
        "formatted": "2022-08-12"
    },
    "seeker_path": {
        "key": "none",
        "label": "Contact Attempt Needed"
    },
    "overall_status": {
        "key": "active",
        "label": "Active"
    },
    "milestones": [
        "milestone_has_bible",
        "milestone_reading_bible",
        "milestone_belief",
        "milestone_can_share",
        "milestone_baptized"
    ],
    "assigned_to": {
        "id": "3",
        "type": "user",
        "display": "johndoe",
        "assigned-to": "user-1"
    },
    "permalink": "https://DT.local/contacts/16",
    "name": "test"
  }
  const UpdatedSinglePost = {
    "ID": "1",
    "post_title": "test updated",
    "post_type": "contacts",
    "post_date": {
        "timestamp": 1660333623,
        "formatted": "2022-08-12"
    },
    "groups": [
        {
            "ID": "2",
            "post_type": "groups",
            "post_date_gmt": "2022-08-10 13:14:40",
            "post_date": "2022-08-10 13:14:40",
            "post_title": "Group 1",
            "permalink": "https://DT.local/groups/5/",
            "status": {
                "key": "active",
                "label": "Active",
                "color": "#4CAF50"
            }
        }
    ],
    "last_modified": {
        "timestamp": 1660333623,
        "formatted": "2022-08-12"
    },
    "seeker_path": {
        "key": "none",
        "label": "Contact Attempt Needed"
    },
    "overall_status": {
        "key": "active",
        "label": "Active"
    },
    "milestones": [
        "milestone_has_bible",
        "milestone_reading_bible",
        "milestone_belief",
        "milestone_can_share",
        "milestone_baptized"
    ],
    "assigned_to": {
        "id": "3",
        "type": "user",
        "display": "johndoe",
        "assigned-to": "user-1"
    },
    "permalink": "https://DT.local/contacts/16",
    "name": "test"
  }
  const UserList = [
    {
      "name": "User 1",
      "ID": 1,
      "avatar": "",
      "contact_id": 1,
      "update_needed": 0
    },
    {
      "name": "User 2",
      "ID": 2,
      "avatar": "",
      "contact_id": 2,
      "update_needed": 0
    },
    {
      "name": "User 3",
      "ID": 3,
      "avatar": "",
      "contact_id": 3,
      "update_needed": 0
    },
    {
      "name": "User 4",
      "ID": 4,
      "avatar": "",
      "contact_id": 4,
      "update_needed": 0
    },
  ]
  // API Call Mocks
  // We will need to make a custom response for each api url.
  // Contact List API Call
  if (url.pathname === "/dt-posts/v2/contacts" && event.request.method === "GET") {
    console.log('Getting lists of posts');

    let params = new URLSearchParams(event.request.url);
    let sortBy = params.get("sortBy");

    let offset = params.get("offset");
    let fields_to_return = params.getAll("fields_to_return");

    let sortedPostsList;
    if (sortBy === "favorite") {
      sortedPostsList = defaultPostsList.sort((a,b) => {
        if (!a.favorite) {
          a.favorite = false;
        }
        if (!b.favorite) {
          b.favorite = false;
        }
        return (a.favorite > b.favorite) ? 1 : ((b.favorite > a.favorite) ? -1 : 0)})
    }
    if (sortBy === "-favorite") {
      sortedPostsList = defaultPostsList.sort((a,b) => {
        if (!a.favorite) {
          a.favorite = false;
        }
        if (!b.favorite) {
          b.favorite = false;
        }
        return (a.favorite < b.favorite) ? 1 : ((b.favorite < a.favorite) ? -1 : 0)})
    }
    if (sortBy === "name") {
      sortedPostsList = defaultPostsList.sort((a,b) => (a.post_title > b.post_title) ? 1 : ((b.post_title > a.post_title) ? -1 : 0))
    }
    if (sortBy === "-name") {
      sortedPostsList = defaultPostsList.sort((a,b) => (a.post_title < b.post_title) ? 1 : ((b.post_title < a.post_title) ? -1 : 0))
    }
    if (sortBy === "last_modified") {
      sortedPostsList = defaultPostsList.sort((a,b) => (a.last_modified.timestamp > b.last_modified.timestamp) ? 1 : ((b.last_modified.timestamp > a.last_modified.timestamp) ? -1 : 0))
    }
    if (sortBy === "-last_modified") {
      sortedPostsList = defaultPostsList.sort((a,b) => (a.last_modified.timestamp < b.last_modified.timestamp) ? 1 : ((b.last_modified.timestamp < a.last_modified.timestamp) ? -1 : 0))
    }
    if (sortBy === "seeker_path") {
      sortedPostsList = defaultPostsList.sort((a,b) => {
      if (!a.seeker_path?.label) {
        a.seeker_path = {label: ""};
      }
      if (!b.seeker_path?.label) {
        b.seeker_path = {label: ""};
      }
      return (a.seeker_path.label > b.seeker_path.label) ? 1 : ((b.seeker_path.label > a.seeker_path.label) ? -1 : 0)})
    }
    if (sortBy === "-seeker_path") {
      sortedPostsList = defaultPostsList.sort((a,b) => {
      if (!a.seeker_path?.label) {
        a.seeker_path = {label: ""};
      }
      if (!b.seeker_path?.label) {
        b.seeker_path = {label: ""};
      }
      return (a.seeker_path.label < b.seeker_path.label) ? 1 : ((b.seeker_path.label < a.seeker_path.label) ? -1 : 0)});
    }
    if (sortBy === "overall_status") {
      sortedPostsList = defaultPostsList.sort((a,b) => (a.overall_status.label > b.overall_status.label) ? 1 : ((b.overall_status.label > a.overall_status.label) ? -1 : 0))
    }
    if (sortBy === "-overall_status") {
      sortedPostsList = defaultPostsList.sort((a,b) => (a.overall_status.label < b.overall_status.label) ? 1 : ((b.overall_status.label < a.overall_status.label) ? -1 : 0))
    }
    if (sortBy === "assigned_to") {
      sortedPostsList = defaultPostsList.sort((a,b) => {
        if (!a.assigned_to && !a.assigned_to?.display) {
          a.assigned_to = {display: ""};
        }
        if (!b.seeker_path && b.seeker_path?.display) {
          b.assigned_to = {display: ""};
        }

        return (a.assigned_to.display > b.assigned_to.display) ? 1 : ((b.assigned_to.display > a.assigned_to.display) ? -1 : 0)})
    }
    if (sortBy === "-assigned_to") {
      sortedPostsList = defaultPostsList.sort((a,b) => {
        if (!a.assigned_to && !a.assigned_to?.display) {
          a.assigned_to = {display: ""};
        }
        if (!b.seeker_path && b.seeker_path?.display) {
          b.assigned_to = {display: ""};
        }
        return (a.assigned_to.display < b.assigned_to.display) ? 1 : ((b.assigned_to.display < a.assigned_to.display) ? -1 : 0)})
    }
    if (sortBy === "milestones") {
      sortedPostsList = defaultPostsList.sort((a,b) => {
        if (!a.milestones) {
          a.milestones = "";
        }
        if (!b.milestones) {
          b.milestones = "";
        }
        return (a.milestones.toString() > b.milestones.toString()) ? 1 : ((b.milestones.toString() > a.milestones.toString()) ? -1 : 0)})
    }
    if (sortBy === "-milestones") {
      sortedPostsList = defaultPostsList.sort((a,b) => {
        if (!a.milestones) {
          a.milestones = "";
        }
        if (!b.milestones) {
          b.milestones = "";
        }
        return (a.milestones.toString() < b.milestones.toString()) ? 1 : ((b.milestones.toString() < a.milestones.toString()) ? -1 : 0)})
    }
    event.respondWith(new Response(
      JSON.stringify(sortedPostsList), {
      headers: { 'Content-Type': 'text/JSON' }
    }));
  }

  // Single Post GET API Call
  if (url.pathname === "/dt-posts/v2/contacts/1" && event.request.method === "GET") {
    console.log('Getting single post');

    event.respondWith(new Response(
      JSON.stringify(singlePost), {
      headers: { 'Content-Type': 'text/JSON' }
    }));
  }

  // Single create_post POST API Call
  if (url.pathname === "/dt-posts/v2/contacts" && event.request.method === "POST") {
    console.log('Creating new post');
    event.respondWith(new Response(
      JSON.stringify(createdSinglePost), {
      headers: { 'Content-Type': 'text/JSON' }
    }));
  }

  // Single update_post POST API Call
  if (url.pathname === "/dt-posts/v2/contacts/1" && event.request.method === "POST") {
    console.log('Updating single post');

    event.respondWith(new Response(
      JSON.stringify(UpdatedSinglePost), {
      headers: { 'Content-Type': 'text/JSON' }
    }));
  }

  if (url.pathname === "/dt/v1/users/get_users" && event.request.method === "GET") {
    console.log('Getting users');

    event.respondWith(new Response(
      JSON.stringify(UserList), {
      headers: { 'Content-Type': 'text/JSON' }
    }));
  }

});

