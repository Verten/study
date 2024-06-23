import { createBrowserRouter } from 'react-router-dom'
import App from 'src/App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <>Error</>,
    children: [
      {
        path: '/chat',
        element: <>Chat</>,
      },
    ],
  },
])

export default router
