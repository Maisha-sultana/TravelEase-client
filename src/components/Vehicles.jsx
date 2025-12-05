import React, { useState, useEffect, useMemo } from 'react'; // <-- useMemo ADDED
import { Link } from 'react-router-dom';
// প্রয়োজনীয় আইকন আমদানি করা হলো
import { FaAngleRight, FaMapMarkerAlt, FaTag , FaSpinner} from 'react-icons/fa';

// Reusable Vehicle Card Component (হোম পেজের card-এর মতো)
const VehicleCard = ({ vehicle }) => (
    <div className="vehicle-card" data-aos="fade-up" data-aos-easing="ease-out-back">
        <div className="card-image-wrapper">
            <img src={vehicle.coverImage} alt={vehicle.vehicleName} className="card-image" />
        </div>
        
        <div className="card-content">
            <h3 className="card-title">{vehicle.vehicleName}</h3>
            
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
            
            {/* View Details Button */}
            <Link to={`/vehicles/${vehicle._id}`} className="card-btn">
                View Details
                <FaAngleRight style={{ marginLeft: '5px' }} />
            </Link>
        </div>
    </div>
);


const VehiclesPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    // Sort Key: 'none', 'price_asc', 'price_desc', 'name_asc', 'category_asc'
    const [sortKey, setSortKey] = useState('none'); 
    const [error, setError] = useState(null);
    
    // --- NEW FILTER STATES ---
    const [categoryFilter, setCategoryFilter] = useState(''); // '' means all categories
    const [locationFilter, setLocationFilter] = useState(''); // '' means all locations
    
    // Hardcoded categories from AddVehicle.jsx
    const allCategories = ['Sedan', 'Suv', 'Electric', 'Van',  'Motorbike'];
    // -------------------------

    // Fetch Logic
    useEffect(() => {
        setLoading(true);
        setError(null);
        // All products endpoint
        fetch('http://localhost:3000/products') 
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setVehicles(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch vehicles:', err);
                setError('Failed to load vehicles. Please check the server connection.');
                setLoading(false);
            });
    }, []);

    // Function to apply filtering
    const filterVehicles = (data) => {
        let filteredData = [...data];

      if (categoryFilter) {
            // ✅ CRITICAL FIX: v.category এর পরিবর্তে v.categories ব্যবহার করা হয়েছে।
            filteredData = filteredData.filter(v => 
                (v.categories || v.category) && (v.categories || v.category).toLowerCase() === categoryFilter.toLowerCase()
            );
        }
        
        // Simple case-insensitive inclusion filter for location
        if (locationFilter) {
            filteredData = filteredData.filter(v => 
                v.location && v.location.toLowerCase().includes(locationFilter.toLowerCase())
            );
        }

        return filteredData;
    };
    
    // Function to apply sorting 
    const sortVehicles = (data) => {
        let sortedData = [...data];
        
        switch (sortKey) {
            case 'price_asc':
                sortedData.sort((a, b) => parseFloat(a.pricePerDay) - parseFloat(b.pricePerDay));
                break;
            case 'price_desc':
                sortedData.sort((a, b) => parseFloat(b.pricePerDay) - parseFloat(a.pricePerDay));
                break;
            case 'name_asc':
                // Alphabetical sort
                sortedData.sort((a, b) => a.vehicleName.localeCompare(b.vehicleName));
                break;
            case 'category_asc':
                sortedData.sort((a, b) => a.category.localeCompare(b.category));
                break;
            case 'none':
            default:
                break; 
        }
        return sortedData;
    };
    
    // Apply filtering and sorting using useMemo for performance optimization
    const displayVehicles = useMemo(() => {
        let result = filterVehicles(vehicles);
        result = sortVehicles(result);
        return result;
    }, [vehicles, categoryFilter, locationFilter, sortKey]);


    const handleSortChange = (e) => {
        setSortKey(e.target.value);
    };
    
    const handleCategoryChange = (e) => {
        setCategoryFilter(e.target.value);
    };
    
    const handleLocationChange = (e) => {
        setLocationFilter(e.target.value);
    };


    return (
        <div className="all-vehicles-wrapper">
            <section className="latest-vehicles-section"> 
                <div className="info-container">
                    <h2 className="section-title" data-aos="fade-down">
                         All Available Vehicles
                    </h2>
                </div>
                
                {/* --- FILTER & SORT CONTROLS (NEW) --- */}
                <div className="filter-sort-controls-wrapper">
                    
                    {/* 1. Category Filter Dropdown */}
                    <div className="filter-control-group">
                        <label htmlFor="category-select">Category:</label>
                        <select id="category-select" value={categoryFilter} onChange={handleCategoryChange} className="filter-dropdown">
                            <option value="">All Categories</option>
                            {allCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* 2. Location Filter Input (Text input for search) */}
                    <div className="filter-control-group">
                        <label htmlFor="location-input">Location:</label>
                        <input
                            type="text"
                            id="location-input"
                            value={locationFilter}
                            onChange={handleLocationChange}
                            placeholder="e.g., Dhaka"
                            className="filter-text-input"
                        />
                    </div>

                    {/* 3. Sort Functionality Dropdown (moved into the wrapper) */}
                    <div className="filter-control-group">
                        <label htmlFor="sort-select">Sort By:</label>
                        <select id="sort-select" value={sortKey} onChange={handleSortChange} className="sort-dropdown">
                            <option value="none">Default (Latest)</option>
                            <option value="name_asc">Name (A-Z)</option>
                           
                            <option value="price_asc">Price (Low to High)</option>
                            <option value="price_desc">Price (High to Low)</option>
                        </select>
                    </div>

                </div>
                {/* ---------------------------------- */}
                
                {loading && <p className="loading-text"><FaSpinner className="spinner" />Loading all vehicles...</p>}
                
                {error && <p className="status-message error">{error}</p>}

                {!loading && !error && displayVehicles.length === 0 && (
                    <p className="loading-text">No vehicles found matching your criteria.</p>
                )}

                {!loading && !error && displayVehicles.length > 0 && (
                    <div className="latest-vehicles-grid">
                        {displayVehicles.map(vehicle => (
                            <VehicleCard key={vehicle._id} vehicle={vehicle} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default VehiclesPage;