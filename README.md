# Drawer

## What It Does

Drawer is a simple note-taking application, which handles files(scribbles) and folders(drawers).
It mainly focuses on taking quick scribbles without need of where to store, which can be done later with the guide of intuitive UI.

## How to Setup & Run Drawer

## How to Use Drawer
Create a scribble : 
- Title: Can be empty.
- Content: Accept characters and screenshots
- Attachments: JPG, PNG,
- Once you finish jotting down your note, select `Just Save` or `Sort` option.
- `Just Save` option: Stores your scribble in Stray list (meaning unsorted)
- `Sort` option: Gives you 3 options.
- Option1: Creates a new top level drawer and save it.
- Option2: Selects an existing drawer and save it.
- Option3: Creates a new sub drawer under the selected existing drawer and save it.

Create a drawer:
- Create New Drawer button at Home Page (so that you can pre-organise drawer trees)

Reorganise drawers:
- Home Page > Select `Sort` icon at right side of a drawer in question > Select the drawer to be relocated > You have 2 options.
- Option1: Creates a new top level drawer and save it.
- Option2: Select an existing drawer and save it.

Edit scribble:
- Click `pencil` icon lets you edit the content of scribble.
- Click `update` icon once your edit completes.

Edit drawer:
- Home Page > Select `Sort` icon at right side of a drawer in question
- Click the name of drawer in question and modify the name.
- Click `update` icon once your edit completes.

Delete scribble:
- Click `trash` icon next to the scribble in question.

Delete drawer:
- Click `trash` icon next to the drawer in question. It will remove nested drawers and scribbles if any.
  


## Features
- 10 min of inactivity redirects to login screen.
- Unauthorised user are redirected to login page if he tries to access protected routes.
- Authorised user are redirected to home page if he tries to access login or register page.
- API Documentation(Swagger) is avaialble via `http://127.0.0.1:8080/api-docs`


## Current Limitations
- Reorganising drawers works more accurately when there is no sub drawers.
- Screenshot added during the creation of scribble needs to be small.
- Attachments preview only works during the creation of scribble.
- Scribble title can't be edited later (only content can be edited)

## Future Features
- Admin page
- Preview, download, and deletion of attachment files.
- Password Reset Email link.
- Sanitize forms to prevent cross-site scripting (XSS)
- Sharing functionality - e.g., shared drawers/scribbles for teams
- Set max limit for drawer nesting
