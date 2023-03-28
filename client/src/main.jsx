import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import router from './router.jsx'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "react-data-table-component-extensions/dist/index.css";
import { ContextProvider } from './Context/ContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      {/* <RouterProvider router={router}/> */}
        <Router>
          <Routes>
            <Route path='/*' element={<App />}/>
          </Routes>
        </Router>
      <ToastContainer/>
    </ContextProvider>
  </React.StrictMode>
)
