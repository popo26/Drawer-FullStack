# Drawer
[Demo site](https://drawer-frontend.onrender.com/)

## What It Does

Drawer is an easy-to-use note app for quick scribbles. It lets you jot down thoughts without worrying about where to save them, and you can organize with drawers later using a user-friendly interface.

## How to Setup Locally & Run Drawer

1. Download zip file from `main` branch here. Extract it in your computer.
2. Open it with your preferred code editor(e.g., Visual Studio Code).
3. Have [MongoDB](https://www.mongodb.com/docs/manual/installation/) installed in your computer in advance.
4. Open a terminal and run the following commands : <br />
   `cd backend` <br />
   `npm install`<br />
   `npm start`<br />
   Open another terminal and run the following commands"<br />
   `cd client` <br />
   `npm install` <br />
   `npm start`<br />

## How to run Vitest

1. Open a terminal and go to `/client` directory.
2. Run the following command: <br />
   `npm test` <br />

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
- Attachments preview only persists unless screen is not refreshed.
- Scribble title can't be edited later (only content can be edited)

## Future Features

- Admin page
- Preview and download of attachment files.
- Password Reset Email link.
- Sanitize forms to prevent cross-site scripting (XSS)
- Sharing functionality - e.g., shared drawers/scribbles for team collaboration
- Set max limit for drawer nesting
- Google OAuth
