self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = (new URL(request.url));
  const defaultPosts = [
    {
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
                "permalink": "https://rsdt.local/groups/5/",
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
        "permalink": "https://rsdt.local/contacts/16",
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
        "permalink": "https://rsdt.local/contacts/17",
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

  // API Call Mocks
  // We will need to make a custom response for each api url.
  if (url.pathname === "/dt-posts/v2/contacts") {
    event.respondWith(new Response(
      JSON.stringify(defaultPosts), {
      headers: { 'Content-Type': 'text/JSON' }
    }));
  }
});
