import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const DashboardHome = () => {
    
    const data = [
        { name: 'Jan', bookings: 400 },
        { name: 'Feb', bookings: 300 },
        { name: 'Mar', bookings: 600 },
        { name: 'Apr', bookings: 800 },
    ];

    return (
        <div>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Dashboard Overview</h2>
            <div className="latest-vehicles-grid" style={{ marginBottom: '40px' }}>
                <div className="info-box"><h3>Total Vehicles</h3><p>12</p></div>
                <div className="info-box"><h3>Bookings</h3><p>85</p></div>
                <div className="info-box"><h3>Earnings</h3><p>Tk 45,000</p></div>
            </div>

            <div className="info-box" style={{ height: '350px', padding: '20px' }}>
                <h3>Booking Growth</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="bookings" fill="#F97316" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardHome;