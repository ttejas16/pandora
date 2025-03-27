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
import PrivateWrapper from './components/PrivateWrapper.jsx'
import AuthProvider from './hooks/AuthProvider.jsx'
import TakeQuiz from './components/TakeQuiz.jsx'
import Analytics from './components/Analytics.jsx'
import { ToastProvider } from './hooks/ToastProvider.jsx'
import PlanetInfo from './components/PlanetInfo.jsx'
import Error from './components/Error.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error/>,
    children: [
      { index: true, element: <App /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        path: "topics", element: <PrivateWrapper />,
        children: [
          { index: true, element: <Topics /> },
          { path: ":id", element: <TopicView /> },
          { path: ":id/add", element: <AddQuiz /> },
          { path: ":id/t/:testId", element: <TakeQuiz /> },
          { path: ":id/analytics", element: <Analytics /> },
        ]
      },
      {
        path: "info/:planetName", element: <PlanetInfo/>
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  </StrictMode>,
)
