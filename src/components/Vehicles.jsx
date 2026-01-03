import React, { useState, useEffect, useMemo } from 'react'; 
import { Link } from 'react-router-dom';
import { FaAngleRight, FaMapMarkerAlt, FaTag, FaSpinner, FaSearch, FaMoneyBillWave } from 'react-icons/fa';

const VehicleCard = ({ vehicle }) => (
    <div className="vehicle-card" data-aos="fade-up">
        <div className="card-image-wrapper">
            <img src={vehicle.coverImage} alt={vehicle.vehicleName} className="card-image" />
        </div>
        <div className="card-content">
            <div>
                <h3 className="card-title">{vehicle.vehicleName}</h3>
                <p className="card-description" style={{
                    fontSize: '0.9em',
                    color: 'var(--secondary-text-color)',
                    marginBottom: '10px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {vehicle.description || "Top quality vehicle for your safe and comfortable travel."}
                </p>
                <div className="card-meta" style={{fontSize: '0.85em', color: 'var(--secondary-text-color)'}}>
                    <p className="card-category" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <FaTag style={{ color: '#F97316', flexShrink: 0 }} />
                        <span>{vehicle.categories || vehicle.category}</span>
                    </p>
                    <p className="card-location" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <FaMapMarkerAlt style={{ color: '#F97316', flexShrink: 0 }} />
                        <span>{vehicle.location}</span>
                    </p>
                    <p>Status: <span style={{color: vehicle.availability === 'Available' ? 'green' : 'red'}}>{vehicle.availability}</span></p>
                </div>
            </div>
            <div style={{marginTop: '15px'}}>
                <p className="card-price" style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px' }}>
                    Tk {vehicle.pricePerDay}/day
                </p>
                <Link to={`/vehicles/${vehicle._id}`} className="card-btn" style={{width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                    View Details <FaAngleRight style={{ marginLeft: '5px' }} />
                </Link>
            </div>
        </div>
    </div>
);

const VehiclesPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortKey, setSortKey] = useState('none'); 
    const [error, setError] = useState(null);
   
    const [searchFilter, setSearchFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState(''); 
    const [locationFilter, setLocationFilter] = useState(''); 
    const [maxPrice, setMaxPrice] = useState('');
    
    const allCategories = ['Sedan', 'Suv', 'Electric', 'Van', 'Motorbike'];
  
    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch('https://travel-ease-server-five.vercel.app/products') 
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                setVehicles(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load vehicles. Please check the server connection.');
                setLoading(false);
            });
    }, []);

    const displayVehicles = useMemo(() => {
        let result = [...vehicles];

        // Search Filter
        if (searchFilter) {
            result = result.filter(v => 
                v.vehicleName.toLowerCase().includes(searchFilter.toLowerCase())
            );
        }

        // Category Filter
        if (categoryFilter) {
            result = result.filter(v => 
                (v.categories || v.category)?.toLowerCase() === categoryFilter.toLowerCase()
            );
        }
        
        // Location Filter
        if (locationFilter) {
            result = result.filter(v => 
                v.location?.toLowerCase().includes(locationFilter.toLowerCase())
            );
        }

        if (maxPrice) {
            result = result.filter(v => parseFloat(v.pricePerDay) <= parseFloat(maxPrice));
        }

        // Sorting
        switch (sortKey) {
            case 'price_asc': result.sort((a, b) => parseFloat(a.pricePerDay) - parseFloat(b.pricePerDay)); break;
            case 'price_desc': result.sort((a, b) => parseFloat(b.pricePerDay) - parseFloat(a.pricePerDay)); break;
            case 'name_asc': result.sort((a, b) => a.vehicleName.localeCompare(b.vehicleName)); break;
            default: break; 
        }

        return result;
    }, [vehicles, searchFilter, categoryFilter, locationFilter, maxPrice, sortKey]);

    const handleSortChange = (e) => setSortKey(e.target.value);
    const handleCategoryChange = (e) => setCategoryFilter(e.target.value);
    const handleLocationChange = (e) => setLocationFilter(e.target.value);

    return (
        <div className="all-vehicles-wrapper">
            <section className="latest-vehicles-section"> 
                <div className="info-container">
                    <h2 className="section-title" data-aos="fade-down">All Available Vehicles</h2>
                </div>
                
                {/* Search, Filter, and Sort Controls */}
                <div className="filter-sort-controls-wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', marginBottom: '40px' }}>
                    
                    {/* Search Field */}
                    <div className="filter-control-group">
                        <label htmlFor="search-input"> Search:</label>
                        <input
                            type="text"
                            id="search-input"
                            placeholder="Vehicle name..."
                            className="filter-text-input"
                            onChange={(e) => setSearchFilter(e.target.value)}
                        />
                    </div>

                    <div className="filter-control-group">
                        <label htmlFor="category-select">Category:</label>
                        <select id="category-select" value={categoryFilter} onChange={handleCategoryChange} className="filter-dropdown">
                            <option value="">All Categories</option>
                            {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    {/* Price Filter Field */}
                    <div className="filter-control-group">
                        <label htmlFor="price-filter">Max Price:</label>
                        <input
                            type="number"
                            id="price-filter"
                            placeholder="Budget Tk..."
                            className="filter-text-input"
                            style={{ width: '120px' }}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>

                    <div className="filter-control-group">
                        <label htmlFor="sort-select">Sort By:</label>
                        <select id="sort-select" value={sortKey} onChange={handleSortChange} className="sort-dropdown">
                            <option value="none">Default (Latest)</option>
                            <option value="name_asc">Name (A-Z)</option>
                            <option value="price_asc">Price (Low-High)</option>
                            <option value="price_desc">Price (High-Low)</option>
                        </select>
                    </div>
                </div>
             
                {loading && <p className="loading-text"><FaSpinner className="spinner" /> Loading all vehicles...</p>}
                {error && <p className="status-message error">{error}</p>}

                {!loading && !error && displayVehicles.length === 0 && (
                    <p className="loading-text">No vehicles found matching your criteria.</p>
                )}

                {!loading && !error && displayVehicles.length > 0 && (
                    <>
                        <div className="latest-vehicles-grid">
                            {displayVehicles.map(vehicle => <VehicleCard key={vehicle._id} vehicle={vehicle} />)}
                        </div>
                        
                        {/* Pagination Buttons */}
                        <div className="pagination-wrapper" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '50px' }}>
                            <button className="card-btn" style={{ background: '#333' }}>Previous</button>
                            <button className="card-btn" style={{ background: '#F97316' }}>1</button>
                            <button className="card-btn" style={{ background: '#333' }}>Next</button>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};

export default VehiclesPage;