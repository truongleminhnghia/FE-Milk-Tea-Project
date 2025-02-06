import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout01 from "./components/layouts/Layout01";
import Home from "./pages/home/Home";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/',
    element: <Layout01 />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  },
])


function App() {
  return <RouterProvider router={router} />;
}

export default App
