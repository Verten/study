import { Outlet } from 'react-router-dom'
import { PropsWithChildren } from 'react'
import ChatMenu from 'src/components/menu'

export default function Body({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-full">
      <main className="h-full flex">
        <ChatMenu />
        {children}
        <Outlet />
      </main>
    </div>
  )
}
