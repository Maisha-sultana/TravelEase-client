import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { FaCar,FaSpinner, FaAngleRight, FaMapMarkerAlt, FaTag, FaBus, FaCarSide, FaMotorcycle, FaTruck, FaQuoteLeft, FaGlobe, FaStar, FaClock } from 'react-icons/fa';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slideData = [
    {
        id: 1,
        title: 'Your Next Adventure Starts Here',
        subtitle: 'Find the perfect vehicle for your journey with TravelEase.',
        image: 'https://st2.depositphotos.com/1370441/8142/i/950/depositphotos_81426254-stock-photo-happy-couple-driving-in-convertible.jpg',
    },
    {
        id: 2,
        title: 'Travel Anytime, Anywhere',
        subtitle: 'Effortless bookings and a wide range of vehicles for every need.',
        image: ' https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    },
    {
        id: 3,
        title: 'Reliable Rides Guaranteed',
        subtitle: 'Trusted service and 24/7 support for a smooth experience.',
        image: 'https://images.pexels.com/photos/16267439/pexels-photo-16267439.jpeg?cs=srgb&dl=pexels-victor-alejandro-desvars-r-121486732-16267439.jpg&fm=jpg',
    },
];
// ...

const categoriesData = [
    { name: 'Cars & Sedans', icon: FaCarSide, path: '/vehicles?cat=car', aos: 'fade-up' },
    { name: 'Vans & Coaches', icon: FaBus, path: '/vehicles?cat=van', aos: 'fade-up', delay: '150' },
    { name: 'Motorbikes', icon: FaMotorcycle, path: '/vehicles?cat=bike', aos: 'fade-up', delay: '300' },
    { name: 'Trucks & Haulers', icon: FaTruck, path: '/vehicles?cat=truck', aos: 'fade-up', delay: '450' },
];

const featuredOwnerData = {
    name: "Mr. Shanto Rahman",
    bio: "A highly trusted host with over 5 years of experience on TravelEase. Known for prompt communication and maintaining a diverse fleet of 15+ high-quality vehicles.",
    joined: "Joined: January 2019",
    rating: 4.9,
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};

const Home = () => {
  
    const [latestVehicles, setLatestVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
  
        fetch('https://travel-ease-server-five.vercel.app/latest-vehicles') 
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
                                <p className="hero-subtitle" data-aos="fade-left" data-duration="1500" data-aos-delay="500">
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
            
            <section className="latest-vehicles-section">
                <div className="info-container">
                    <h2 className="section-title" data-aos="fade-down">
                         Latest Vehicles Added
                    </h2>
                </div>
                
                {loading ? (
                   <p className="loading-text">
                        <FaSpinner className="spinner" /> Loading latest vehicles...
                    </p>
                ) : (
                    <div className="latest-vehicles-grid">
                        {latestVehicles.map(vehicle => (
                            <div key={vehicle._id} className="vehicle-card" data-aos="fade-up" data-aos-easing="ease-out-back">
                               
                                <div className="card-image-wrapper">
                                  
                                    <img src={vehicle.coverImage} alt={vehicle.vehicleName} className="card-image" />
                                </div>
                                
                              
                                <div className="card-content">
                                    <h3 className="card-title">{vehicle.vehicleName}</h3>

                                    {vehicle.createdAt && (
                                        <p className="card-timestamp">
                                            <FaClock style={{ marginRight: '5px' }} />
                                            Added {formatDistanceToNowStrict(parseISO(vehicle.createdAt), { addSuffix: true })}
                                        </p>
                                    )}
                                    
                                    
                                    <p className="card-category">
                                        <FaTag style={{ marginRight: '5px' }} />
                                        {vehicle.categories}
                                    </p>
                                    
                                
                                    <p className="card-location">
                                        <FaMapMarkerAlt style={{ marginRight: '5px' }} />
                                        {vehicle.location}
                                    </p>
                                    
                                  
                                    <p className="card-price">
                                        Daily Rent: Tk {vehicle.pricePerDay}
                                    </p>
                                    
                                 
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
            
            {/* --- TOP CATEGORIES SECTION --- */}
            <section className="categories-section">
                <h2 className="section-title " data-aos="zoom-in">
                    Explore Our Top Categories
                </h2>
                <div className="categories-grid">
                    {categoriesData.map((category) => (
                        <Link 
                            key={category.name} 
                            to={category.path} 
                            className="category-card"
                            data-aos={category.aos}
                            data-aos-delay={category.delay || '0'}
                        >
                            <category.icon className="category-icon" />
                            <h3 className="category-name">{category.name}</h3>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="featured-owner-section">
                <h2 className="section-title " data-aos="fade-down" data-aos-delay="100">
                    Featured Host Spotlight
                </h2>
                <div className="owner-card-container" data-aos="flip-up" data-aos-delay="300">
                    <div className="owner-card">
                        <img src={featuredOwnerData.photoUrl} alt={featuredOwnerData.name} className="owner-photo" />
                        <h3 className="owner-name">{featuredOwnerData.name}</h3>
                        <p className="owner-rating">
                            {Array(Math.floor(featuredOwnerData.rating)).fill().map((_, i) => <FaStar key={i} />)}
                            ({featuredOwnerData.rating})
                        </p>
                        <p className="owner-bio">{featuredOwnerData.bio}</p>
                        <p className="owner-joined">{featuredOwnerData.joined}</p>
                        <Link to="/profile/shanto" className="owner-profile-btn">
                            View Profile & Fleet
                            <FaAngleRight style={{ marginLeft: '10px' }} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="about-section" data-aos="fade-up" data-aos-duration="1200">
                <div className="about-content-wrapper">
                    <div className="about-text-content"> 
                        <h2 className="about-title">
                            <FaQuoteLeft style={{ marginRight: '15px', color: '#F97316' }} />
                            About TravelEase
                        </h2>
                        <p className="about-description">
                            TravelEase is your premier platform for seamless vehicle rentals, connecting local owners with adventurers and travelers. Our mission is to provide trusted, verified vehicles—from luxury cars to adventure bikes—guaranteed to make your next journey effortless.
                        </p>
                        <p className="about-description">
                            We pride ourselves on 24/7 support and a commitment to easy, secure booking experiences, ensuring you find the perfect ride anytime, anywhere.
                        </p>
                        <Link to="/about" className="about-link-btn">
                            Learn More
                            <FaAngleRight style={{ marginLeft: '10px' }} />
                        </Link>
                    </div>
                    <div className="about-visual" data-aos="zoom-in" data-aos-delay="500">
                   
                        <FaGlobe className="globe-icon float-animation" /> 
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Home;