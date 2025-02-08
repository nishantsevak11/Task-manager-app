# Task Manager App

This project is a simple Task Management application built using Next.js, leveraging its API routes for server-side logic (including Server Actions), and persisting data in MongoDB.  It allows users to create, view, edit, and delete tasks, as well as mark tasks as complete or incomplete.

## Features

*   **Create, Read, Update, Delete (CRUD) Operations:**  Manage your tasks effortlessly.
*   **Task Completion:** Mark tasks as complete or pending.
*   **Task Details:** Store task titles, descriptions, due dates, and priority.
*   **Data Persistence:**  Tasks are stored in a MongoDB database, ensuring data is retained across sessions.
*   **Error Handling:**  The application handles potential errors gracefully, providing informative messages to the user.
*   **Loading States:**  Users are informed when data is being loaded.

## Technologies Used

*   **Frontend:** Next.js (App Router)
*   **Backend:** Next.js API Routes (Server Actions)
*   **Database:** MongoDB
*   **UI Library:**  [Specify your UI library here, e.g., Material UI, Shadcn/ui]
*   **Deployment:** Vercel

## Setup Instructions

1.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/your-username/task-manager.git](https://www.google.com/search?q=https://github.com/your-username/task-manager.git)  // Replace with your repository URL
    cd task-manager
    ```

2.  **Install Dependencies:**

    ```bash
    npm install  // or yarn install, pnpm install, depending on your package manager
    ```

3.  **Configure Environment Variables:**

    *   Create a `.env.local` file in the root of your project.
    *   Add your MongoDB connection string:

        ```
        MONGODB_URI=your_mongodb_connection_string
        ```

        Replace `your_mongodb_connection_string` with your actual MongoDB connection URI.  **Important:** Do not commit this file to your repository.

4.  **Run the Development Server:**

    ```bash
    npm run dev  // or yarn dev, pnpm dev
    ```

    This will start the development server. Open your browser and navigate to `http://localhost:3000` to view the application.

## Deployment

The application is designed to be deployed on Vercel.  Follow these steps:

1.  Push your code to a GitHub repository (or your preferred Git provider).
2.  Connect your Vercel account to your Git repository.
3.  Vercel will automatically detect the Next.js project and guide you through the deployment process.  Make sure to set your environment variables (especially `MONGODB_URI`) in your Vercel project settings.

## How to Use the App

1.  **Adding a Task:** Click the "+" button to open the "Add New Task" dialog.  Fill in the task details (title, description, due date, priority) and click "Save".

2.  **Editing a Task:** Click the "Edit" button next to a task to open the edit dialog.  Modify the task details and click "Save".

3.  **Deleting a Task:** Click the "Delete" button next to a task to remove it.

4.  **Marking a Task as Complete/Pending:** Click the "Complete" or "Mark as Pending" button to toggle the task's completion status.

5.  **Filtering Tasks:** Use the sidebar filters ("All", "Pending", "Completed") to view tasks based on their status.

6.  **Searching Tasks:** Use the search bar to find tasks by title.

## Project Structure

'''
task-manager/
├── app/
│   └── tasks/
│       └── page.js       // Main page component
├── pages/
│   └── api/
│       └── tasks/
│           └── route.js   // API route (Server Actions)
├── db/
│   ├── connection.js  // MongoDB connection
│   └── models/
│       └── task.js      // Task model
├── components/
│   └── TaskItem.js    // Task Item component
├── .env.local         // Environment variables
└── ... other files
'''

## Further Improvements (Optional)

*   We can Add more advanced filtering options.
*   We can Improve the UI/UX with better styling and components.
*   We can also Implement user authentication.
*   and Add Ai integration for task priotize.