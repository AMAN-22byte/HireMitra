import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import AppLayout from './layouts/applayout'
import Landingpage from './pages/landing'
import Onboarding from './pages/onboarding'
import PostJob from './pages/postjob'
import JobPage from './pages/joblisting'
import MyJob from './pages/myjob'
import SavedJob from './pages/savedjob'
import { ThemeProvider } from "../src/components/ui/theme-provider"
import ProtectedRoute from './components/ui/protected-route'
import MyJobs from './pages/myjob'
import Jobs from './pages/job'
// define routes of the app:
const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children:[
      {
        path: '/',
        element:<Landingpage/>,
      },
      {
        path: '/onboarding',
        element:(<ProtectedRoute><Onboarding/></ProtectedRoute>),
      },
      {
        path: '/jobpage',
        element:(<ProtectedRoute><JobPage/></ProtectedRoute>),
      },
      {
        path: '/job/:id',
        element:(<ProtectedRoute><Jobs/></ProtectedRoute>),
      },
      {
        path: '/postjob',
        element:(<ProtectedRoute><PostJob/></ProtectedRoute>),
      },
      {
        path: '/savedjobs',
        element:(<ProtectedRoute><SavedJob/></ProtectedRoute>),
      },
    ]
  }
])

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
  </ThemeProvider>
   
  )
}

export default App
