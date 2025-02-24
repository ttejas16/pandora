import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './components/Root.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Topics from './components/Topics.jsx'
import TopicView from './components/TopicView.jsx'
import AddQuiz from './components/AddQuiz.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <App /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "topics", element: <Topics /> },
      { path: "topics/:id", element: <TopicView /> },
      { path: "topics/:id/add", element: <AddQuiz /> },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
