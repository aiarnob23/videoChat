import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RoomPage from './Pages/RoomPage';
import SocketProvider from './context/SocketProvider';
import Lobby from './Pages/Lobby';


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Video Chat client site</div>,
  },
  {
    path: "/room/:roomId",
    element:<RoomPage></RoomPage>,
  },
  {
    path: "/lobby",
    element:<Lobby></Lobby>,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </React.StrictMode>
);
