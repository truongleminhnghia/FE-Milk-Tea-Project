import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout01 from "./components/layouts/Layout01";
import Home from "./pages/home/Home";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import Layout02 from "./components/layouts/Layout02";
import Dashboard from "./pages/admin-pages/dashboard/Dashboard";
import ListProducts from "./pages/products/ListProducts";
import NewProduct from "./pages/products/NewProduct";
import ListOrders from "./pages/orders/ListOrders";
import NewOrder from "./pages/orders/NewOrder";
import ListRecipes from "./pages/recipes/ListRecipes";
import CreateNewRecipe from "./pages/recipes/CreateNewRecipe";
import ListUsers from "./pages/users/ListUsers";
import CreateNewUser from "./pages/users/CreateNewUser";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import { EnumRoleName } from "./utils/enum.constant";

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
  {
    path: '/admin-page',
    element: (
      <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
        <Layout02 />
      </ProtectedRoute>
      ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'products',
        element: <ListProducts />
      },
      {
        path: 'create-product',
        element: <NewProduct />
      },
      {
        path: 'orders',
        element: <ListOrders />
      },
      {
        path: 'new-order',
        element: <NewOrder />
      },
      {
        path: 'recipes',
        element: <ListRecipes />
      },
      {
        path: 'create-recipe',
        element: <CreateNewRecipe />
      },
      {
        path: 'users',
        element: <ListUsers />
      },
      {
        path: 'create-user',
        element: <CreateNewUser />
      },
    ]
  }
])


function App() {
  return <RouterProvider router={router} />;
}

export default App
