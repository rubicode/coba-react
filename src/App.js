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
import CustomContext from './components/CustomContext';
import todosReducer from './reducers/todos';
import { useReducer } from 'react';

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
  const [todoState, todoDispatch] = useReducer(todosReducer, []);

  const providerState = {
    todoState,
    todoDispatch
  }

  return (
    <CustomContext.Provider value={providerState} >
      <RouterProvider router={router} />
    </CustomContext.Provider>
  );
}

export default App;
