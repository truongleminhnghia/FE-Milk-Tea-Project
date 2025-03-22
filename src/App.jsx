import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout01 from "./components/layouts/Layout01";
import Home from "./pages/home/Home";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import Layout02 from "./components/layouts/Layout02";
import ListProduct from "./pages/products/ListProduct";
import NewProduct from "./pages/admin-pages/products-admin/NewProduct";
import ListOrders from "./pages/orders/ListOrders";
import NewOrder from "./pages/orders/NewOrder";
// import ListRecipes from "./pages/recipes/ListRecipes";
import CreateNewRecipe from "./pages/recipes/CreateNewRecipe";
import ListUsers from "./pages/users/ListUsers";
import CreateNewUser from "./pages/users/CreateNewUser";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import { EnumRoleName } from "./utils/enum.constant";
import GoogleCallbackComponent from "./components/callBack/GoogleCallbackComponent";
import ListCategory from "./pages/categories/ListCategory";
import ListProductsAdmin from "./pages/admin-pages/products-admin/ListProductAdmin";
import ViewAccount from "./pages/accounts/ViewAccount";
import ViewDetail from "./pages/products/ViewDetail";
import ListCart from "./pages/carts/ListCart";
import ProductDetail from "./pages/admin-pages/products-admin/ProductDetail";
import ListRecipesAdmin from "./pages/admin-pages/recipes/ListRecipesAdmin";
import Checkout from "./pages/orders/Checkout";
import Introduction from "./pages/introducts/Introduction";
import PromotionListLayout1 from "./pages/promotions/PromotionListLayout1";
import News from "./pages/news/News";
import HotLine from "./pages/hotline/HotLine";
import ListRecipeLayout01 from "./pages/recipes/ListRecipeLayout01";
import DetailCategory from "./pages/categories/DetailCategory";
import ListAccount from "./pages/admin-pages/accounts/ListAccount";
import NewAccount from "./pages/admin-pages/accounts/NewAccount";
import UpdateAccount from "./pages/admin-pages/accounts/UpdateAccount";
import AccountDetail from "./pages/admin-pages/accounts/AccountDetail";
import Dashboard from "./pages/admin-pages/dashboard/Dashboard"
import Layout03 from "./components/layouts/Layout03";
import EditProduct from "./pages/admin-pages/products-admin/EditProduct"
import ListNewOrder from "./pages/orders/order-by-staff/ListNewOrder";
import ListAllOrder from "./pages/orders/order-by-staff/ListAllOrder";

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
    path: '/auths/callback',
    element: <GoogleCallbackComponent />
  },
  {
    path: '/',
    element: <Layout01 />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/nguyen-lieu',
        element: <ListProduct />
      },
      {
        path: '/nguyen-lieu/:id',
        element: <ViewDetail />
      },
      {
        path: '/cong-thuc',
        element: <ListRecipeLayout01 />
      },
      {
        path: '/cong-thuc/:id',
        element: <ViewDetail />
      },
      {
        path: '/khuyen-mai',
        element: <PromotionListLayout1 />
      },
      {
        path: '/tin-tuc',
        element: <News />
      },
      {
        path: '/lien-he',
        element: <HotLine />
      },
      {
        path: '/check-out/:id',
        element: <Checkout />
      },
      {
        path: '/gioi-thieu',
        element: <Introduction />
      }
    ]
  },
  {
    path: '/customer',
    element: (
      <ProtectedRoute element={<Layout01 />} allowedRoles={["ROLE_CUSTOMER"]} />
    ),
    children: [
      {
        path: 'profile/:id',
        element: <ViewAccount />
      },

      {
        path: 'gio-hang',
        element: <ListCart />
      }
    ]
  },
  {
    path: '/admin-page',
    element: (
      <ProtectedRoute element={<Layout02 />} allowedRoles={["ROLE_ADMIN"]} />
    ),
    children: [
      {
        path: '/admin-page',
        element: <Dashboard />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'accounts',
        element: <ListAccount />
      },
      {
        path: 'accounts/:id',
        element: <AccountDetail />
      },
      {
        path: 'create-account',
        element: <NewAccount />
      },
      {
        path: 'categories',
        element: <ListCategory />
      },
      {
        path: 'categories/:id',
        element: <DetailCategory />
      },
      {
        path: 'products',
        element: <ListProductsAdmin />
      },
      {
        path: 'products/:id',
        element: <ProductDetail />
      },
      {
        path: 'recipes',
        element: <ListRecipesAdmin />
      },
      {
        path: 'orders',
        element: <ListOrders />
      },
      {
        path: 'new-order',
        element: <NewOrder />
      },
      // {
      //   path: 'recipes',
      //   element: <ListRecipes />
      // },
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
  },
  {
    path: '/staff-page',
    element: (
      <ProtectedRoute element={<Layout03 />} allowedRoles={["ROLE_STAFF"]} />
    ),
    children: [
      {
        path: '/staff-page',
        element: <ListNewOrder />
      },
      {
        path: 'categories',
        element: <ListCategory />
      },
      {
        path: 'categories/:id',
        element: <DetailCategory />
      },
      {
        path: 'products',
        element: <ListProductsAdmin />
      },
      {
        path: 'products/:id',
        element: <ProductDetail />
      },
      {
        path: 'products/edit/:id',
        element: <EditProduct />
      },
      {
        path: 'create-product',
        element: <NewProduct />
      },
      {
        path: 'orders',
        element: <ListAllOrder />
      },
      {
        path: 'orders/new',
        element: <ListNewOrder />
      }
    ]
  }
])


function App() {
  return <RouterProvider router={router} />;

}

export default App
