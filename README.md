Quick Feedback Pool
A real-time polling application that allows users to create, share, and vote on polls instantly. Built with the MERN Stack.
Features

- **Create Polls:** Generate custom polls with multiple options.
- **Shareable Links:** dynamic routing allows users to share specific polls via URL.
- **Real-time Voting:** Instant updates to vote counts.
- **Responsive Design:** Works seamlessly on mobile and desktop.
- **Secure Backend:** RESTful API built with Express & MongoDB.

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Axios
- CSS3 / Styled Components

**Backend:**
- Node.js & Express.js
- MongoDB (Atlas) & Mongoose

**Deployment:**
- Frontend: Vercel
- Backend: Vercel (Serverless Functions)

---

## 🚀 Getting Started Locally

Follow these steps to run the project on your machine.

### Prerequisites
- Node.js installed
- MongoDB URI (Atlas or Local)

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/quick-feedback-pool.git](https://github.com/your-username/quick-feedback-pool.git)
cd quick-feedback-pool
2. Setup Backend

cd server
npm install
Create a .env file in the server folder:
MONGO_URI=your_mongodb_connection_string
PORT=5000

Start the server:
npm start

3. Setup Frontend
Open a new terminal and navigate to the client folder:

cd ../client
npm install

Create a .env file in the client folder:
VITE_API_URL=http://localhost:5000

Start the React app:
npm run dev
