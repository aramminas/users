import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './scss/Animated.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
            <ToastContainer />
        </React.StrictMode>
    </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister()
