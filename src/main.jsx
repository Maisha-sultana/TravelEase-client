import { StrictMode, useEffect } from 'react' // useEffect আমদানি করা হয়েছে
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// 1. AOS আমদানি করুন
import AOS from 'aos'; 
// 2. AOS এর CSS আমদানি করুন
import 'aos/dist/aos.css'; 


// 3. AOS ইনিশিয়ালাইজ করার জন্য একটি Wrapper কম্পোনেন্ট তৈরি করুন
const RootWrapper = () => {
    useEffect(() => {
        AOS.init({
            // এখানে আপনি গ্লোবাল অপশন সেট করতে পারেন
            offset: 100, // স্ক্রিনের নিচে থেকে 100px উপরে এলে অ্যানিমেশন শুরু হবে
            duration: 1000, // 1 সেকেন্ড ধরে অ্যানিমেশন চলবে
            easing: 'ease-in-out', // অ্যানিমেশনের ধরন
            once: true, // স্ক্রোল করে একবার দেখা হয়ে গেলে আর অ্যানিমেট হবে না
        });
        AOS.refresh(); // যদি DOM পরিবর্তন হয়, তাহলে AOS রিলোড করবে
    }, []);

    return <App />;
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 4. RootWrapper ব্যবহার করুন */}
    <RootWrapper /> 
  </StrictMode>,
)