// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './components/Login';
import TodoBox from './components/TodoBox';
import ErrorPage from './components/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/todos",
    element: <TodoBox />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
