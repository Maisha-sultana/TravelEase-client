import { StrictMode, useEffect } from 'react' 
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const RootWrapper = () => {
    useEffect(() => {
        AOS.init({
          
            offset: 100,
            duration: 1000, 
            easing: 'ease-in-out',
            once: true, 
        });
        AOS.refresh(); 
    }, []);

    return <App />;
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootWrapper /> 
  </StrictMode>,
)