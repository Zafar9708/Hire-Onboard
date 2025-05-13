import React, { useState } from "react";
import ActiveJobsHeader from "./ActiveJobsHeader";
import JobList from "./JobList";

const ActiveJobsPage = () => {
  const [view, setView] = useState("card");
  const [showPriority, setShowPriority] = useState(false);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handlePriorityToggle = (value) => {
    setShowPriority(value);
  };

  return (
    <div>
      <ActiveJobsHeader
        onViewChange={handleViewChange}
        onPriorityToggle={handlePriorityToggle}
      />
      <JobList view={view} showPriority={showPriority} />
    </div>
  );
};

export default ActiveJobsPage;
