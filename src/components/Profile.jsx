import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [orgData, setOrgData] = useState({
        organizationName: '',
        email: '',
        phone: '',
        industry: '',
        location: '',
        foundedDate: '',
        description: '',
        website: '',
        employees: '',
        contactPerson: ''
    });

    const decodeToken = (token) => {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    useEffect(() => {
        const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
        
        const token = localStorage.getItem('access_token');
        let tokenData = null;
        
        if (token) {
            tokenData = decodeToken(token);
        }

        // Get specific organization data from localStorage
        const orgName = localStorage.getItem('user_name') || 'Wrocus Technology';
        const orgEmail = localStorage.getItem('user_email') || 'wrocus@gmail.com';

        // Merge all data sources
        const mergedData = {
            organizationName: orgName,
            email: orgEmail,
            phone: storedProfile?.phone || '+1 (555) 123-4567',
            industry: 'Information Technology', 
            location: 'Logix Technova, Greater Noida', 
            foundedDate: '2015', 
            description: storedProfile?.bio || 'Leading technology solutions provider',
            website: 'www.wrocus.com', 
            employees: '150+', 
            contactPerson: storedProfile?.name || 'Himanshu Patel'
        };

        setOrgData(mergedData);
        
        // Save to orgProfile if not exists
        if (!localStorage.getItem('orgProfile')) {
            localStorage.setItem('orgProfile', JSON.stringify(mergedData));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrgData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        const profileToSave = {
            ...orgData
        };
        
        localStorage.setItem('orgProfile', JSON.stringify(profileToSave));
        localStorage.setItem('org_email', orgData.email);
        localStorage.setItem('org_name', orgData.organizationName);
        
        setIsEditing(false);
        alert('Organization profile updated successfully!');
    };

    const getInitials = (name) => {
        if (!name) return '';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Organization Profile</h1>
                <button 
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 transition"
                >
                    Back to Dashboard
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Organization Header */}
                <div className="bg-blue-600 p-6 text-white">
                    <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-3xl font-bold">
                            {getInitials(orgData.organizationName)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{orgData.organizationName}</h2>
                            <p className="text-blue-100">{orgData.industry}</p>
                            <p className="text-blue-100">{orgData.location}</p>
                        </div>
                    </div>
                </div>

                {/* Organization Content */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
                            {!isEditing ? (
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                    Edit
                                </button>
                            ) : (
                                <div className="space-x-2">
                                    <button 
                                        onClick={handleSave}
                                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                    <button 
                                        onClick={() => setIsEditing(false)}
                                        className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Organization Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="organizationName"
                                        value={orgData.organizationName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                                    />
                                ) : (
                                    <p className="text-gray-800">{orgData.organizationName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Email Address</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={orgData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                                        disabled
                                    />
                                ) : (
                                    <p className="text-gray-800">{orgData.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={orgData.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                                    />
                                ) : (
                                    <p className="text-gray-800">{orgData.phone}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Business Information */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Business Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Industry</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="industry"
                                        value={orgData.industry}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                                    />
                                ) : (
                                    <p className="text-gray-800">{orgData.industry}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Location</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="location"
                                        value={orgData.location}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                                    />
                                ) : (
                                    <p className="text-gray-800">{orgData.location}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Contact Person</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="contactPerson"
                                        value={orgData.contactPerson}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                                    />
                                ) : (
                                    <p className="text-gray-800">{orgData.contactPerson}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">About Organization</h3>
                        {isEditing ? (
                            <textarea
                                name="description"
                                value={orgData.description}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                            />
                        ) : (
                            <p className="text-gray-800 whitespace-pre-line">
                                {orgData.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;