import React from 'react';
import Header from './Header';  
import Sidebar from './Sidebar';  
import JobDetail from './JobDetail';  

const MainPage = () => {
  return (
    <div>
      <Header userName="John Doe" getInitials={(name) => name.split(' ').map((n) => n[0]).join('')} />

      <div style={{ display: 'flex' }}>
        <Sidebar />
        
        <div style={{ flex: 1, marginLeft: '250px', padding: '20px' }}>
          <JobDetail />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
