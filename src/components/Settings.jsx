import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [orgData, setOrgData] = useState({
    name: '',
    email: '',
    description: '',
    logo: '',
    website: '',
    industry: '',
    employees: '',
    location: '',
    billingEmail: '',
    notifications: true,
    twoFactor: false,
    domains: []
  });

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: orgData
  });

  // Apply theme to the document
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(currentTheme);
  }, [currentTheme]);

  // Simulate loading organization data
  useEffect(() => {
    const fetchOrgData = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setOrgData({
          name: 'Wrocus Technology',
          email: 'wrocus@gmail.com',
          description: 'Leading provider of innovative solutions',
          logo: 'https://media.licdn.com/dms/image/v2/D560BAQEoGKndHrp88w/company-logo_200_200/company-logo_200_200/0/1726744040758/wrocus_logo?e=2147483647&v=beta&t=kWbtChGnL8NdFa28L1sZOBT0TsDNXLqFcKLi5HCUooI',
          website: 'https://www.wrocus.com/',
          industry: 'Technology',
          employees: '100-200',
          location: 'Logix Technova, Greater Noida',
          billingEmail: 'wrocus@gmail.com',
          notifications: true,
          twoFactor: false,
          domains: ['wrocus.com', 'www.wrocus.com']
        });
        setIsLoading(false);
      }, 1000);
    };

    fetchOrgData();
  }, []);

  // Update form defaults when orgData changes
  useEffect(() => {
    reset(orgData);
  }, [orgData, reset]);

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log('Submitting:', data);
    // Simulate API call
    setTimeout(() => {
      setOrgData(data);
      setIsLoading(false);
      alert('Organization settings updated successfully!');
    }, 1500);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOrgData(prev => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDomain = () => {
    const newDomain = prompt('Enter new domain (e.g., yourcompany.com):');
    if (newDomain) {
      setOrgData(prev => ({
        ...prev,
        domains: [...prev.domains, newDomain]
      }));
    }
  };

  const handleRemoveDomain = (domainToRemove) => {
    setOrgData(prev => ({
      ...prev,
      domains: prev.domains.filter(domain => domain !== domainToRemove)
    }));
  };

  const handleDeleteOrganization = () => {
    if (window.confirm('Are you sure you want to delete this organization? All data will be permanently lost.')) {
      alert('Organization deletion requested. This would trigger an API call in a real app.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Organization Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'general' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                General
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'team' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                Team & Members
              </button>
              <button
                onClick={() => setActiveTab('domains')}
                className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'domains' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                Domains
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'billing' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                Billing
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'security' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                Security
              </button>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'appearance' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                Appearance
              </button>
              <button
                onClick={() => setActiveTab('danger')}
                className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'danger' ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'}`}
              >
                Danger Zone
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* General Tab */}
                {activeTab === 'general' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">General Information</h2>
                    <div className="mb-6 flex flex-col items-center">
                      <div className="relative mb-4">
                        <img 
                          src={orgData.logo} 
                          alt="Organization Logo" 
                          className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                        />
                        <label 
                          htmlFor="logo-upload"
                          className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </label>
                        <input 
                          id="logo-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleLogoChange}
                        />
                      </div>
                      <p className="text-sm text-gray-500">Click on the icon to change your organization logo</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                        <input
                          id="name"
                          type="text"
                          {...register('name', { required: 'Organization name is required' })}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                        <input
                          id="email"
                          type="email"
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                      </div>

                      <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                        <input
                          id="industry"
                          type="text"
                          {...register('industry')}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-1">Employees</label>
                        <select
                          id="employees"
                          {...register('employees')}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select size</option>
                          <option value="1-10">1-10</option>
                          <option value="11-50">11-50</option>
                          <option value="51-200">51-200</option>
                          <option value="201-500">201-500</option>
                          <option value="500-1000">500-1000</option>
                          <option value="1000+">1000+</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <input
                          id="website"
                          type="url"
                          {...register('website')}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://"
                        />
                      </div>

                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          id="location"
                          type="text"
                          {...register('location')}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          id="description"
                          rows="4"
                          {...register('description')}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Brief description of your organization..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {/* Team & Members Tab */}
                {activeTab === 'team' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Team Management</h2>
                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Invite Team Members</h3>
                        <button
                          type="button"
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Invite Members
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="invite-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input
                            id="invite-email"
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="user@example.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="invite-role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                          <select
                            id="invite-role"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                            <option value="owner">Owner</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <button
                            type="button"
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                          >
                            Send Invite
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Current Members</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full" src="https://www.wrocus.com/slider/Aseemsir.jpg" alt="" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">Aseem Gupta</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">assem@kloudrac.com</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Owner</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                <button className="text-red-600 hover:text-red-900">Remove</button>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full" src="https://media.istockphoto.com/id/612520134/vector/girl-icon-cartoon-single-avatar-people-icon.jpg?s=612x612&w=0&k=20&c=DiBfKRoHjMpR1Ncm77ZxQLEGaq5JTD-0ddQTy0EkRT0=" alt="" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">Preeti Kashyap</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">pkashyap@kloudrac.com</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                <button className="text-red-600 hover:text-red-900">Remove</button>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full" src="https://img.freepik.com/premium-vector/single-person-icon_1076610-58450.jpg?w=360" alt="" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">Himanshu Patel</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">himanshu@kloudrac.com</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Active</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                <button className="text-red-600 hover:text-red-900">Remove</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Domains Tab */}
                {activeTab === 'domains' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Verified Domains</h2>
                    <p className="text-sm text-gray-500 mb-6">Add domains to allow users with email addresses from these domains to join your organization automatically.</p>
                    
                    <div className="space-y-4 mb-6">
                      {orgData.domains.map((domain) => (
                        <div key={domain} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-mono">{domain}</span>
                          </div>
                          <button 
                            onClick={() => handleRemoveDomain(domain)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleAddDomain}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Add Domain
                    </button>
                  </div>
                )}

                {/* Billing Tab */}
                {activeTab === 'billing' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="billingEmail" className="block text-sm font-medium text-gray-700 mb-1">Billing Email</label>
                        <input
                          id="billingEmail"
                          type="email"
                          {...register('billingEmail', { 
                            required: 'Billing email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.billingEmail ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.billingEmail && <p className="mt-1 text-sm text-red-600">{errors.billingEmail.message}</p>}
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Current Plan</h3>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-xl">Enterprise</h4>
                            <p className="text-gray-600">$99/month per user</p>
                          </div>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Active</span>
                        </div>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Billing Cycle</p>
                            <p className="font-medium">Monthly</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Next Invoice</p>
                            <p className="font-medium">June 15, 2023</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Users</p>
                            <p className="font-medium">24</p>
                          </div>
                        </div>
                        <div className="mt-6">
                          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Change Plan
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <svg className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <span>VISA ending in 4242</span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-800">Edit</button>
                        </div>
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          Add Payment Method
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                        <div>
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your organization</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            {...register('twoFactor')}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-md">
                        <h3 className="font-medium mb-2">Session Management</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">San Francisco, CA</p>
                              <p className="text-sm text-gray-500">Chrome on macOS • Active now</p>
                            </div>
                            <button className="text-red-600 hover:text-red-800">Sign out</button>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">New York, NY</p>
                              <p className="text-sm text-gray-500">Safari on iPhone • 2 hours ago</p>
                            </div>
                            <button className="text-red-600 hover:text-red-800">Sign out</button>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-md">
                        <h3 className="font-medium mb-2">Security Logs</h3>
                        <p className="text-sm text-gray-500 mb-4">View recent security activity for your organization.</p>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          View Logs
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Appearance Tab */}
                {activeTab === 'appearance' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Appearance</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Theme</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <button
                            type="button"
                            onClick={() => setCurrentTheme('light')}
                            className={`p-4 border rounded-md ${currentTheme === 'light' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                          >
                            <div className="flex items-center">
                              <div className="mr-3 bg-white p-1 rounded shadow-sm">
                                <div className="h-8 w-16 bg-gray-100 rounded"></div>
                                <div className="mt-1 h-4 w-16 bg-gray-200 rounded"></div>
                              </div>
                              <span>Light</span>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentTheme('dark')}
                            className={`p-4 border rounded-md ${currentTheme === 'dark' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                          >
                            <div className="flex items-center">
                              <div className="mr-3 bg-gray-800 p-1 rounded shadow-sm">
                                <div className="h-8 w-16 bg-gray-700 rounded"></div>
                                <div className="mt-1 h-4 w-16 bg-gray-600 rounded"></div>
                              </div>
                              <span>Dark</span>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentTheme('system')}
                            className={`p-4 border rounded-md ${currentTheme === 'system' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                          >
                            <div className="flex items-center">
                              <div className="mr-3 bg-gray-100 p-1 rounded shadow-sm">
                                <div className="h-8 w-16 bg-white rounded"></div>
                                <div className="mt-1 h-4 w-16 bg-gray-200 rounded"></div>
                              </div>
                              <span>System</span>
                            </div>
                          </button>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Accent Color</h3>
                        <div className="flex space-x-2">
                          {['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal'].map((color) => (
                            <button
                              key={color}
                              type="button"
                              className={`h-8 w-8 rounded-full bg-${color}-500`}
                              title={color.charAt(0).toUpperCase() + color.slice(1)}
                            ></button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Danger Zone Tab */}
                {activeTab === 'danger' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
                    <div className="space-y-6">
                      <div className="p-4 border border-red-200 rounded-md bg-red-50">
                        <h3 className="font-medium text-red-700 mb-2">Transfer Ownership</h3>
                        <p className="text-sm text-red-600 mb-4">Transfer this organization to another user. You will no longer be the owner.</p>
                        <select
                          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        >
                          <option value="">Select a new owner</option>
                          <option value="1">Jane Smith (jane@acme.com)</option>
                          <option value="2">Robert Johnson (robert@acme.com)</option>
                        </select>
                        <button
                          type="button"
                          className="px-4 py-2 bg-white text-red-600 border border-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Transfer Ownership
                        </button>
                      </div>

                      <div className="p-4 border border-red-200 rounded-md bg-red-50">
                        <h3 className="font-medium text-red-700 mb-2">Delete Organization</h3>
                        <p className="text-sm text-red-600 mb-4">This will permanently delete your organization and all associated data. This action cannot be undone.</p>
                        <button
                          type="button"
                          onClick={handleDeleteOrganization}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Delete Organization
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save button for all tabs except Danger Zone */}
                {activeTab !== 'danger' && activeTab !== 'team' && (
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;