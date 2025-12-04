import React, { useState, useEffect } from 'react';
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
                {vehicle.category}
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
                // Default sorting is by _id (latest added)
                // We assume default fetched order is by insertion, so we sort by insertion order descending if 'none' is selected
                break; 
        }
        return sortedData;
    };
    
    // Apply sorting to the current list
    const sortedVehicles = sortVehicles(vehicles);

    const handleSortChange = (e) => {
        setSortKey(e.target.value);
    };


    return (
        <div className="all-vehicles-wrapper">
            <section className="latest-vehicles-section"> 
                <div className="info-container">
                    <h2 className="section-title" data-aos="fade-down">
                         All Available Vehicles
                    </h2>
                </div>
                
                {/* Sort Functionality Dropdown in the corner */}
                <div className="sort-controls">
                    <label htmlFor="sort-select">Sort By:</label>
                    <select id="sort-select" value={sortKey} onChange={handleSortChange} className="sort-dropdown">
                        <option value="none">Default (Latest)</option>
                        <option value="name_asc">Name (A-Z)</option>
                        <option value="category_asc">Category Name</option>
                        <option value="price_asc">Price (Low to High)</option>
                        <option value="price_desc">Price (High to Low)</option>
                    </select>
                </div>
                
                {loading && <p className="loading-text"><FaSpinner className="spinner" />Loading all vehicles...</p>}
                
                {error && <p className="status-message error">{error}</p>}

                {!loading && !error && sortedVehicles.length === 0 && (
                    <p className="loading-text">No vehicles found. Start adding some!</p>
                )}

                {!loading && !error && sortedVehicles.length > 0 && (
                    <div className="latest-vehicles-grid">
                        {sortedVehicles.map(vehicle => (
                            <VehicleCard key={vehicle._id} vehicle={vehicle} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default VehiclesPage;