# 🏙️ Lost & Found Portal - City Edition

A community-driven web application designed to help citizens report lost items and reunite with found belongings. This project features a secure backend with an admin verification system to ensure the authenticity of posts.

## 🚀 Features
* **Report Items:** Users can upload details and images of lost or found items.
* **Image Upload:** Integrated with Cloudinary for secure and fast image storage.
* **Admin Approval Queue:** All posts are held in a moderation queue until approved by an admin.
* **Public Feed:** Only verified posts are visible to the public.
* **Search & Filter:** (Frontend UI) Browse items by category or status.

## 🛠️ Tech Stack
* **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Cloud)
* **Image Storage:** Cloudinary
* **Tools:** Postman (for API testing), VS Code

## ⚙️ Installation & Setup

1.  **Clone the repository** (or download the folder).
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```
4.  **Run the Server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000`.

5.  **Open the App:**
    Open `index.html` in your browser to use the application.

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/posts` | Submit a new post (requires file upload). |
| `GET` | `/api/posts/public` | Fetch all **approved** posts for the public feed. |
| `GET` | `/api/posts/admin-queue` | Fetch **unapproved** posts for moderation. |
| `PUT` | `/api/posts/approve/:id` | Approve a post (moves it to public feed). |

## 📝 Project Structure
* `/config`: Database and Cloudinary configuration.
* `/models`: Mongoose schemas (Data Blueprints).
* `/routes`: API endpoints (The "Doors" to the backend).
* `index.js`: Main server entry point.
* `index.html`: Frontend user interface.

## 👥 Hackathon Team
* CODE VERSE