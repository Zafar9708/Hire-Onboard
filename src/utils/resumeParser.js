export const parseResume = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('https://api.affinda.com/v2/resumes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer YOUR_AFFINDA_API_KEY`, // Replace with your actual key
        },
        body: formData,
      });
  
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      return formatResumeData(data);
    } catch (error) {
      console.error('Resume parsing error:', error);
      return null;
    }
  };
  
  const formatResumeData = (apiResponse) => {
    // Extract relevant fields from API response
    const result = {};
    const doc = apiResponse?.data || {};
  
    result.name = [doc?.firstName, doc?.lastName].filter(Boolean).join(' ') || '';
    result.email = doc?.email || '';
    result.phone = doc?.phoneNumber || '';
    result.experience = doc?.totalYearsExperience ? `${doc.totalYearsExperience} years` : '';
    result.skills = doc?.skills?.map(s => s.name).join(', ') || '';
    result.education = doc?.education?.map(edu => edu.organization).join(', ') || '';
  
    return result;
  };