import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from './redux/store/index.js'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { GoogleOAuthProvider} from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} >
<Provider store= {store}>
  <BrowserRouter>
    <App /> 
  </BrowserRouter>
</Provider>
</GoogleOAuthProvider>

)
