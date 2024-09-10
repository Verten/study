import { createBrowserRouter } from 'react-router-dom'
import App from 'src/App'
import NotFoundPage from 'src/pages/404'
import Chat from 'src/pages/chat'
import RobotChat from 'src/pages/robot'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <>
            <RobotChat />
          </>
        ),
      },
      {
        path: '/robot',
        element: (
          <>
            <RobotChat />
          </>
        ),
      },
      {
        path: '/chat',
        element: (
          <>
            <Chat />
          </>
        ),
      },
    ],
  },
])

export default router
