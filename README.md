# Task Management Application (Frontend)
This is the frontend of the Task Management Application built with Next.js. It provides a dynamic interface for users to create, edit, delete, filter, and search tasks. It also integrates with a backend API to store and manage tasks.

## Table of Contents

-   [Features](#Features)
-   [Technologies](#Technologies)
-   [Setup and Installation](#Setup)
-   [State Management with Redux Toolkit](#StateManagementwithReduxToolkit)
-   [Folder Structure](#Structure)
-   [Known Issues](#Issues)
-   [Future Improvements](#Improvements)  

## Features
- Task creation, editing, and deletion
- Task filtering by status, priority, and tags
- Search functionality for tasks by name or description
- Undo option for task deletion
- Task reminders for due dates within 24 hours
- Tasks are styled dynamically based on priority and completion status
- Fully responsive UI with basic accessibility features

## Technologies
-   **Next.js :** React framework for server-side rendering and static site generation
-   **Redux Toolkit :** State management for efficient handling of tasks
-   **CSS :** Raw CSS used for styling without any external CSS frameworks


## Setup and Installation
Instructions on how to install the project.

```sh
# Clone the repository
git clone https://github.com/MehediHaassan1/task-management-frontend

# Navigate to the project directory
cd project-name

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Update .env file with your configuration

# Start the project
npm run dev
```


Frontend README
Task Management Application (Frontend)
This is the frontend of the Task Management Application built with Next.js. It provides a dynamic interface for users to create, edit, delete, filter, and search tasks. It also integrates with a backend API to store and manage tasks.

Table of Contents
Features
Technologies
Setup
Running the Application
State Management with Redux Toolkit
Folder Structure
Known Issues
Future Improvements
Features
Task creation, editing, and deletion
Task filtering by status, priority, and tags
Search functionality for tasks by name or description
Undo option for task deletion
Task reminders for due dates within 24 hours
Tasks are styled dynamically based on priority and completion status
Fully responsive UI with basic accessibility features
Technologies
Next.js: React framework for server-side rendering and static site generation
Redux Toolkit: State management for efficient handling of tasks
CSS: Raw CSS used for styling without any external CSS frameworks
Axios: For API requests to interact with the backend
Setup
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/task-management-frontend.git
Navigate to the project directory:

bash
Copy code
cd task-management-frontend
Install dependencies:

bash
Copy code
npm install
Create a .env.local file in the root of the project and add the following variable:

env
Copy code
NEXT_PUBLIC_API_URL=http://localhost:5000/api
(Change the API_URL if your backend is hosted elsewhere.)

Running the Application
Start the Next.js development server:

bash
Copy code
npm run dev
Open http://localhost:3000 to view it in the browser.

## State Management
- Redux Toolkit is used for managing the task state, including creating, updating, deleting, and filtering tasks.
- createSlice is used to define the actions and reducers.
- Redux Thunk handles asynchronous operations such as API calls.



## Folder Structure
src/

├── app
├── components
├── lib
|── redux          
│── styles
|-- types
|-- utils

## Known Issues
- Task deletion undo is time-limited and may not function correctly on slow connections.
- Task filtering and search may take time if the task list is large due to lack of pagination.
- No user authentication yet, so tasks are accessible to everyone.

## Future Improvements
- Implement user authentication for secure task management.
- Add pagination for large task lists.
- Improve accessibility with additional ARIA roles and semantic HTML.
- Enhance reminder functionality to integrate with notification services.