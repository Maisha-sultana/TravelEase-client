import React, { useState, useEffect } from 'react'; // useState, useEffect আমদানি
import { Link } from 'react-router-dom';
import { FaCar, FaAngleRight, FaMapMarkerAlt, FaTag } from 'react-icons/fa'; // নতুন আইকন

// Swiper থেকে প্রয়োজনীয় মডিউল এবং কম্পোনেন্ট আমদানি
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Swiper এর CSS ফাইল আমদানি
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// ... (slideData - আগের মতোই থাকবে)
const slideData = [
    {
        id: 1,
        title: 'Your Next Adventure Starts Here',
        subtitle: 'Find the perfect vehicle for your journey with TravelEase.',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 2,
        title: 'Travel Anytime, Anywhere',
        subtitle: 'Effortless bookings and a wide range of vehicles for every need.',
        image: 'https://st2.depositphotos.com/1370441/8142/i/950/depositphotos_81426254-stock-photo-happy-couple-driving-in-convertible.jpg',
    },
    {
        id: 3,
        title: 'Reliable Rides Guaranteed',
        subtitle: 'Trusted service and 24/7 support for a smooth experience.',
        image: 'https://images.pexels.com/photos/16267439/pexels-photo-16267439.jpeg?cs=srgb&dl=pexels-victor-alejandro-desvars-r-121486732-16267439.jpg&fm=jpg',
    },
];
// ...


const Home = () => {
    // 1. নতুন ডেটা স্টেটে সংরক্ষণ
    const [latestVehicles, setLatestVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. ডেটা Fetch করার লজিক
    useEffect(() => {
        setLoading(true);
        // আপনার সার্ভার URL পরিবর্তন করুন প্রয়োজন অনুযায়ী
        fetch('http://localhost:3000/latest-vehicles') 
            .then(res => res.json())
            .then(data => {
                setLatestVehicles(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch latest vehicles:', error);
                setLoading(false);
            });
    }, []);


    return (
        <div className="hero-swiper-wrapper">
            {/* --- HERO SLIDER SECTION --- (আগের মতোই) */}
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0} 
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 5000, 
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                className="mySwiper"
            >
                {/* ... (SwiperSlide mapping - আগের মতোই) ... */}
                {slideData.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div 
                            className="hero-slide-item" 
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="hero-background-overlay"></div>
                            <div className="hero-content">
                                <h1 className="hero-title" data-aos="fade-right" data-aos-duration="1500">
                                    {slide.title}
                                </h1>
                                <p className="hero-subtitle" data-aos="fade-left" data-aos-duration="1500" data-aos-delay="500">
                                    {slide.subtitle}
                                </p>
                                <Link 
                                    to="/vehicles" 
                                    className="hero-btn" 
                                    data-aos="zoom-in" 
                                    data-aos-duration="1500" 
                                    data-aos-delay="1000"
                                >
                                    <FaCar style={{ marginRight: '10px' }} />
                                    Explore All Vehicles
                                    <FaAngleRight style={{ marginLeft: '10px' }} />
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            {/* --- LATEST VEHICLES SECTION (New) --- */}
            <section className="latest-vehicles-section">
                <div className="info-container">
                    <h2 className="section-title" data-aos="fade-down">
                        🔥 Latest Vehicles Added
                    </h2>
                </div>
                
                {loading ? (
                    <p className="loading-text">Loading latest vehicles...</p>
                ) : (
                    <div className="latest-vehicles-grid">
                        {latestVehicles.map(vehicle => (
                            <div key={vehicle._id} className="vehicle-card" data-aos="fade-up" data-aos-easing="ease-out-back">
                                {/* ইমেজ */}
                                <div className="card-image-wrapper">
                                    <img src={vehicle.coverImage} alt={vehicle.vehicleName} className="card-image" />
                                </div>
                                
                                {/* কন্টেন্ট */}
                                <div className="card-content">
                                    <h3 className="card-title">{vehicle.vehicleName}</h3>
                                    
                                    {/* ক্যাটেগরি */}
                                    <p className="card-category">
                                        <FaTag style={{ marginRight: '5px' }} />
                                        {vehicle.category}
                                    </p>
                                    
                                    {/* লোকেশন */}
                                    <p className="card-location">
                                        <FaMapMarkerAlt style={{ marginRight: '5px' }} />
                                        {vehicle.location}
                                    </p>
                                    
                                    {/* মূল্য */}
                                    <p className="card-price">
                                        **Daily Rent:** ${vehicle.pricePerDay}
                                    </p>
                                    
                                    {/* বিস্তারিত লিংক */}
                                    {/* /vehicles/ID অথবা একটি ডামি লিংক */}
                                    <Link to={`/vehicles/${vehicle._id}`} className="card-btn">
                                        View Details
                                        <FaAngleRight style={{ marginLeft: '5px' }} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* --- INFO/AOS DEMO SECTION --- (আগের মতোই) */}
            <section className="info-section">
                {/* ... (info-container - আগের মতোই) ... */}
                <div className="info-container">
                    <div className="info-box" data-aos="fade-up">
                        <h3>Best Price Guarantee</h3>
                        <p>We ensure you get the most competitive rates for all your rentals.</p>
                    </div>
                    <div className="info-box" data-aos="fade-right" data-aos-delay="200">
                        <h3>24/7 Roadside Assistance</h3>
                        <p>Our dedicated team is always ready to help you, anytime, anywhere.</p>
                    </div>
                    <div className="info-box" data-aos="zoom-in" data-aos-delay="400">
                        <h3>Verified Vehicles</h3>
                        <p>Every vehicle on our platform is thoroughly inspected and verified for safety.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;