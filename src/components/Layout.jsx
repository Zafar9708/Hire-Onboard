import React from 'react';
import Header from './Header';  // Import Header
import Sidebar from './Sidebar';  // Import Sidebar
import JobDetail from './JobDetail';  // Import JobDetail

const MainPage = () => {
  return (
    <div>
      {/* Header */}
      <Header userName="John Doe" getInitials={(name) => name.split(' ').map((n) => n[0]).join('')} />

      {/* Main layout with Sidebar and JobDetail */}
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content: JobDetail */}
        <div style={{ flex: 1, marginLeft: '250px', padding: '20px' }}>
          <JobDetail />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
