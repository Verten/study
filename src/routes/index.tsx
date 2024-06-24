import { createBrowserRouter } from 'react-router-dom'
import App from 'src/App'
import NotFoundPage from 'src/pages/404'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/chat',
        element: <>Chat</>,
      },
    ],
  },
])

export default router
