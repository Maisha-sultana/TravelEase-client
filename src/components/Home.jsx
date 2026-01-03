import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { 
    FaCar, FaSpinner, FaAngleRight, FaMapMarkerAlt, FaTag, FaBus, 
    FaCarSide, FaMotorcycle, FaTruck, FaQuoteLeft, FaGlobe, FaStar, 
    FaClock, FaHeadset, FaShieldAlt, FaMoneyBillWave, FaQuestionCircle 
} from 'react-icons/fa';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SkeletonCard = () => (
    <div className="vehicle-card" style={{ height: '380px', backgroundColor: 'var(--card-background)', borderRadius: '12px', overflow: 'hidden' }}>
        <div className="skeleton-pulse" style={{ height: '200px', backgroundColor: '#e2e8f0' }}></div>
        <div style={{ padding: '20px' }}>
            <div className="skeleton-pulse" style={{ height: '24px', width: '70%', backgroundColor: '#e2e8f0', marginBottom: '15px', borderRadius: '4px' }}></div>
            <div className="skeleton-pulse" style={{ height: '15px', width: '40%', backgroundColor: '#e2e8f0', marginBottom: '10px', borderRadius: '4px' }}></div>
            <div className="skeleton-pulse" style={{ height: '15px', width: '50%', backgroundColor: '#e2e8f0', borderRadius: '4px' }}></div>
        </div>
    </div>
);

const Home = () => {
    const [latestVehicles, setLatestVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetching data from API
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
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1769',
        },
        {
            id: 3,
            title: 'Reliable Rides Guaranteed',
            subtitle: 'Trusted service and 24/7 support for a smooth experience.',
            image: 'https://images.pexels.com/photos/16267439/pexels-photo-16267439.jpeg',
        },
    ];

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
        photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1770"
    };

    return (
        <div className="hero-swiper-wrapper">
            {/* 1. Hero / Carousel Section */}
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0} 
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                className="mySwiper"
                style={{ height: '70vh' }}
            >
                {slideData.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="hero-slide-item" style={{ backgroundImage: `url(${slide.image})` }}>
                            <div className="hero-background-overlay"></div>
                            <div className="hero-content">
                                <h1 className="hero-title" data-aos="fade-right" data-aos-duration="1500">{slide.title}</h1>
                                <p className="hero-subtitle" data-aos="fade-left" data-duration="1500" data-aos-delay="500">{slide.subtitle}</p>
                                <Link to="/vehicles" className="hero-btn" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="1000">
                                    <FaCar style={{ marginRight: '10px' }} /> Explore All Vehicles <FaAngleRight style={{ marginLeft: '10px' }} />
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* 2. Statistics Section */}
            <section className="stats-section" style={{ padding: '60px 20px', backgroundColor: 'var(--background-color)' }}>
                <div className="info-container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
                    <div className="stat-item" style={{ textAlign: 'center' }}>
                        <h2 style={{ color: '#F97316', fontSize: '2.5rem' }}>500+</h2>
                        <p style={{ color: 'var(--text-color)' }}>Verified Vehicles</p>
                    </div>
                    <div className="stat-item" style={{ textAlign: 'center' }}>
                        <h2 style={{ color: '#F97316', fontSize: '2.5rem' }}>10k+</h2>
                        <p style={{ color: 'var(--text-color)' }}>Happy Travelers</p>
                    </div>
                    <div className="stat-item" style={{ textAlign: 'center' }}>
                        <h2 style={{ color: '#F97316', fontSize: '2.5rem' }}>50+</h2>
                        <p style={{ color: 'var(--text-color)' }}>Cities Covered</p>
                    </div>
                </div>
            </section>

            {/* 3. Latest Vehicles Section with Skeleton */}
            <section className="latest-vehicles-section">
                <div className="info-container">
                    <h2 className="section-title" data-aos="fade-down">Latest Vehicles Added</h2>
                </div>
                
                {loading ? (
                    <div className="latest-vehicles-grid">
                        {[...Array(6)].map((_, index) => <SkeletonCard key={index} />)}
                    </div>
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
                                    <p className="card-category"><FaTag style={{ marginRight: '5px' }} /> {vehicle.categories}</p>
                                    <p className="card-location"><FaMapMarkerAlt style={{ marginRight: '5px' }} /> {vehicle.location}</p>
                                    <p className="card-price">Daily Rent: Tk {vehicle.pricePerDay}</p>
                                    <Link to={`/vehicles/${vehicle._id}`} className="card-btn">View Details <FaAngleRight style={{ marginLeft: '5px' }} /></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* 4. Top Categories Section */}
            <section className="categories-section">
                <h2 className="section-title " data-aos="zoom-in">Explore Our Top Categories</h2>
                <div className="categories-grid">
                    {categoriesData.map((category) => (
                        <Link key={category.name} to={category.path} className="category-card" data-aos={category.aos} data-aos-delay={category.delay || '0'}>
                            <category.icon className="category-icon" />
                            <h3 className="category-name">{category.name}</h3>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 5. Why Choose Us / Features Section */}
            <section className="features-section" style={{ padding: '60px 20px', backgroundColor: 'var(--card-background)' }}>
                <h2 className="section-title">Why TravelEase?</h2>
                <div className="latest-vehicles-grid">
                    <div className="info-box">
                        <FaHeadset size={40} color="#F97316" style={{ marginBottom: '15px' }} />
                        <h3>24/7 Support</h3>
                        <p>Our team is always here to help you during your journey.</p>
                    </div>
                    <div className="info-box">
                        <FaShieldAlt size={40} color="#F97316" style={{ marginBottom: '15px' }} />
                        <h3>Secure Booking</h3>
                        <p>Multiple secure payment methods and verified owners.</p>
                    </div>
                    <div className="info-box">
                        <FaMoneyBillWave size={40} color="#F97316" style={{ marginBottom: '15px' }} />
                        <h3>Best Prices</h3>
                        <p>We guarantee the most competitive rental prices.</p>
                    </div>
                    <div className="info-box">
            <FaCar size={40} color="#F97316" style={{ marginBottom: '15px' }} />
            <h3>Verified Rides</h3>
            <p>Every vehicle is manually checked for safety and quality standards.</p>
        </div>
                </div>
            </section>

            {/* 6. Featured Owner Section */}
            <section className="featured-owner-section">
                <h2 className="section-title" data-aos="fade-down" data-aos-delay="100">Featured Host Spotlight</h2>
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
                            View Profile & Fleet <FaAngleRight style={{ marginLeft: '10px' }} />
                        </Link>
                    </div>
                    
                </div>
            </section>

            {/* 7. About Us Section */}
            <section className="about-section" data-aos="fade-up" data-aos-duration="1200">
                <div className="about-content-wrapper">
                    <div className="about-text-content"> 
                        <h2 className="about-title"><FaQuoteLeft style={{ marginRight: '15px', color: '#F97316' }} /> About TravelEase</h2>
                        <p className="about-description">TravelEase is your premier platform for seamless vehicle rentals, connecting local owners with adventurers and travelers.</p>
                        <p className="about-description">We pride ourselves on 24/7 support and easy, secure booking experiences.</p>
                        <Link to="/about" className="about-link-btn">Learn More <FaAngleRight style={{ marginLeft: '10px' }} /></Link>
                    </div>
                    <div className="about-visual" data-aos="zoom-in" data-aos-delay="500">
                        <FaGlobe className="globe-icon float-animation" /> 
                    </div>
                </div>
            </section>

            {/* 8. FAQ Section */}
            <section style={{ padding: '60px 20px', backgroundColor: 'var(--background-color)' }}>
                <h2 className="section-title">Frequently Asked Questions</h2>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="info-box" style={{ marginBottom: '15px' }}>
                        <h4><FaQuestionCircle style={{ marginRight: '10px', color: '#F97316' }} /> How do I book a vehicle?</h4>
                        <p>Select your favorite ride, click 'View Details', and press the 'Book Now' button.</p>
                    </div>
                    <div className="info-box">
                        <h4><FaQuestionCircle style={{ marginRight: '10px', color: '#F97316' }} /> What is the cancellation policy?</h4>
                        <p>Most vehicles offer free cancellation up to 24 hours before the trip starts.</p>
                    </div>
                </div>
            </section>

            {/* 9. Newsletter Section */}
            <section className="newsletter-section" style={{ padding: '60px 20px', textAlign: 'center', background: '#333', color: 'white' }}>
                <h2 style={{ marginBottom: '10px' }}>Subscribe to Our Newsletter</h2>
                <p style={{ marginBottom: '20px' }}>Get the latest travel deals directly in your inbox.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <input type="email" placeholder="Enter your email" className="filter-text-input" style={{ width: '300px', padding: '12px' }} />
                    <button className="submit-btn" style={{ width: 'auto', padding: '0 30px' }}>Subscribe</button>
                </div>
            </section>

            {/* 10. Final CTA Section */}
            <section style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: 'var(--highlight-color)', color: 'white' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Ready to start your journey?</h2>
                <p style={{ marginBottom: '30px', fontSize: '1.2rem' }}>Join thousands of happy travelers and find your perfect ride today.</p>
                <Link to="/register" className="hero-btn" style={{ backgroundColor: '#333', color: 'white' }}>Register Now</Link>
            </section>
        </div>
    );
};

export default Home;