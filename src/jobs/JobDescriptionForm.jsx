

// import React, { useState, useEffect } from 'react';
// import {
//   Box, Button, TextField, MenuItem, Dialog, DialogTitle, DialogContent,
//   DialogActions, Typography, Card, CardContent, Grid, IconButton, InputAdornment,
//   Select, FormControl, InputLabel
// } from '@mui/material';
// import { Description, Close, Search } from '@mui/icons-material';
// import { fetchJobTemplates, fetchDepartments } from '../utils/api';

// const JobDescriptionForm = ({ onContinue, initialData }) => {
//   const [jobTitle, setJobTitle] = useState(initialData.jobTitle || '');
//   const [department, setDepartment] = useState(initialData.department || '');
//   const [experience, setExperience] = useState(initialData.experience || '');
//   const [jobDesc, setJobDesc] = useState(initialData.jobDesc || '');
//   const [templates, setTemplates] = useState([]);
//   const [openTemplate, setOpenTemplate] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [departments, setDepartments] = useState([]);

//   useEffect(() => {
//     const loadInitialData = async () => {
//       try {
//         const fetchedTemplates = await fetchJobTemplates();
//         setTemplates(fetchedTemplates);

//         const fetchedDepartments = await fetchDepartments();
//         setDepartments(fetchedDepartments);
//       } catch (error) {
//         console.error('Error loading templates/departments:', error);
//       }
//     };

//     loadInitialData();
//   }, []);

//   const handleTemplateSelect = (content) => {
//     setJobDesc(content);
//     setOpenTemplate(false);
//   };

//   const handleSubmit = () => {
//     if (jobTitle && department && experience && jobDesc) {
//       const jobData = { jobTitle, department, experience, jobDesc };
//       onContinue(jobData);
//     } else {
//       alert('Please fill all fields.');
//     }
//   };

//   const filteredTemplates = templates.filter(template =>
//     template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     template.content.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const applyFormat = (command) => {
//     document.execCommand(command, false, null);
//   };

//   return (
//     <Box sx={{ maxWidth: 860, margin: 'auto', p: 3 }}>
//       <Typography variant="h6" sx={{ mb: 4, fontWeight: 600, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
//         <Description fontSize="medium" /> Create Job Posting
//       </Typography>

//       <Card variant="outlined" sx={{ mb: 3, p: 1, borderRadius: 2 }}>
//         <CardContent>
//           <Grid container spacing={6} alignItems="center">
//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="Job Title"
//                 value={jobTitle}
//                 onChange={(e) => setJobTitle(e.target.value)}
//                 variant="outlined"
//                 size="medium"
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <FormControl fullWidth>
//                 <InputLabel id="department-label">Department</InputLabel>
//                 <Select
//                   labelId="department-label"
//                   value={department}
//                   onChange={(e) => setDepartment(e.target.value)}
//                   label="Department"
//                   variant="outlined"
//                   size="medium"
//                   sx={{ minWidth: 200 }}
//                 >
//                   {departments.map((dept) => (
//                     <MenuItem key={dept} value={dept}>
//                       {dept}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 fullWidth
//                 label="Experience Level"
//                 value={experience}
//                 onChange={(e) => setExperience(e.target.value)}
//                 variant="outlined"
//                 size="medium"
//                 placeholder="e.g. 2-5 years"
//               />
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
//         <CardContent>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Job Description</Typography>
//             <Button
//               onClick={() => setOpenTemplate(true)}
//               size="medium"
//               variant="outlined"
//               startIcon={<Description fontSize="small" />}
//               sx={{ textTransform: 'none' }}
//             >
//               Browse Templates
//             </Button>
//           </Box>

//           <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
//             <Button variant="outlined" size="small" onClick={() => applyFormat('bold')}>
//               <strong>B</strong>
//             </Button>
//             <Button variant="outlined" size="small" onClick={() => applyFormat('italic')}>
//               <em>I</em>
//             </Button>
//             <Button variant="outlined" size="small" onClick={() => applyFormat('underline')}>
//               <u>U</u>
//             </Button>
//           </Box>

//           <Box
//             contentEditable
//             sx={{
//               border: '1px solid #ccc',
//               minHeight: 200,
//               padding: 1.5,
//               borderRadius: 1,
//               backgroundColor: '#f9f9f9',
//               fontFamily: 'Arial, sans-serif',
//             }}
//             onInput={(e) => setJobDesc(e.target.innerHTML)}
//             dangerouslySetInnerHTML={{ __html: jobDesc }}
//           />
//         </CardContent>
//       </Card>

//       <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//         <Button
//           variant="contained"
//           onClick={handleSubmit}
//           sx={{ px: 4, py: 1.5, textTransform: 'none', fontWeight: 500, borderRadius: 1 }}
//           size="medium"
//         >
//           Continue
//         </Button>
//       </Box>

//       <Dialog
//         open={openTemplate}
//         onClose={() => setOpenTemplate(false)}
//         maxWidth="md"
//         fullWidth
//         PaperProps={{ sx: { borderRadius: 2 } }}
//       >
//         <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
//           <Typography variant="h6" sx={{ fontWeight: 600 }}>Job Description Templates</Typography>
//           <IconButton onClick={() => setOpenTemplate(false)}><Close /></IconButton>
//         </DialogTitle>

//         <Box sx={{ px: 3, pt: 2 }}>
//           <TextField
//             fullWidth
//             placeholder="Search templates..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             variant="outlined"
//             size="medium"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Search color="action" />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ mb: 2 }}
//           />
//         </Box>

//         <DialogContent dividers sx={{ p: 0 }}>
//           <Box sx={{ p: 2 }}>
//             {filteredTemplates.length > 0 ? (
//               <Grid container spacing={2}>
//                 {filteredTemplates.map((template, index) => (
//                   <Grid item xs={12} key={index}>
//                     <Card variant="outlined" sx={{ p: 2 }}>
//                       <Typography variant="subtitle1" fontWeight={600} gutterBottom>{template.title}</Typography>
//                       <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{template.content}</Typography>
//                       <Button
//                         variant="contained"
//                         size="medium"
//                         onClick={() => handleTemplateSelect(template.content)}
//                         sx={{ textTransform: 'none' }}
//                       >
//                         Use Template
//                       </Button>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             ) : (
//               <Typography sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>No templates found matching your search</Typography>
//             )}
//           </Box>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default JobDescriptionForm;

//-------------

import React, { useState, useEffect } from 'react';
import {
  Box, Button, TextField, MenuItem, Dialog, DialogTitle, DialogContent,
  DialogActions, Typography, Card, CardContent, Grid, IconButton, InputAdornment,
  Select, FormControl, InputLabel
} from '@mui/material';
import { Description, Close, Search } from '@mui/icons-material';
import { fetchJobTemplates, fetchDepartments, addDepartment } from '../utils/api';

const JobDescriptionForm = ({ onContinue, initialData }) => {
  const [jobTitle, setJobTitle] = useState(initialData.jobTitle || '');
  const [department, setDepartment] = useState(initialData.department || '');
  const [experience, setExperience] = useState(initialData.experience || '');
  const [jobDesc, setJobDesc] = useState(initialData.jobDesc || '');
  const [templates, setTemplates] = useState([]);
  const [openTemplate, setOpenTemplate] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departments, setDepartments] = useState([]);

  // New states for Add Department
  const [newDeptDialogOpen, setNewDeptDialogOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState('');

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const fetchedTemplates = await fetchJobTemplates();
        setTemplates(fetchedTemplates);

        const fetchedDepartments = await fetchDepartments();
        setDepartments(fetchedDepartments);
      } catch (error) {
        console.error('Error loading templates/departments:', error);
      }
    };

    loadInitialData();
  }, []);

  const handleTemplateSelect = (content) => {
    setJobDesc(content);
    setOpenTemplate(false);
  };

  const handleSubmit = () => {
    if (jobTitle && department && experience && jobDesc) {
      const jobData = { jobTitle, department, experience, jobDesc };
      onContinue(jobData);
    } else {
      alert('Please fill all fields.');
    }
  };

  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const applyFormat = (command) => {
    document.execCommand(command, false, null);
  };

  return (
    <Box sx={{ maxWidth: 860, margin: 'auto', p: 3 }}>
      <Typography variant="h6" sx={{ mb: 4, fontWeight: 600, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Description fontSize="medium" /> Create Job Posting
      </Typography>

      <Card variant="outlined" sx={{ mb: 3, p: 1, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                  labelId="department-label"
                  value={department}
                  onChange={(e) => {
                    if (e.target.value === '__add__') {
                      setNewDeptDialogOpen(true);
                    } else {
                      setDepartment(e.target.value);
                    }
                  }}
                  label="Department"
                  variant="outlined"
                  size="medium"
                  sx={{ minWidth: 200 }}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                  <MenuItem value="__add__" sx={{ fontStyle: '-moz-initial', color: 'primary.main' }}>
                    + Add Department
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Experience Level"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                variant="outlined"
                size="medium"
                placeholder="e.g. 2-5 years"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Job Description</Typography>
            <Button
              onClick={() => setOpenTemplate(true)}
              size="medium"
              variant="outlined"
              startIcon={<Description fontSize="small" />}
              sx={{ textTransform: 'none' }}
            >
              Browse Templates
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button variant="outlined" size="small" onClick={() => applyFormat('bold')}>
              <strong>B</strong>
            </Button>
            <Button variant="outlined" size="small" onClick={() => applyFormat('italic')}>
              <em>I</em>
            </Button>
            <Button variant="outlined" size="small" onClick={() => applyFormat('underline')}>
              <u>U</u>
            </Button>
          </Box>

          <Box
            contentEditable
            sx={{
              border: '1px solid #ccc',
              minHeight: 200,
              padding: 1.5,
              borderRadius: 1,
              backgroundColor: '#f9f9f9',
              fontFamily: 'Arial, sans-serif',
            }}
            onInput={(e) => setJobDesc(e.target.innerHTML)}
            dangerouslySetInnerHTML={{ __html: jobDesc }}
          />
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ px: 4, py: 1.5, textTransform: 'none', fontWeight: 500, borderRadius: 1 }}
          size="medium"
        >
          Continue
        </Button>
      </Box>

      <Dialog
        open={openTemplate}
        onClose={() => setOpenTemplate(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Job Description Templates</Typography>
          <IconButton onClick={() => setOpenTemplate(false)}><Close /></IconButton>
        </DialogTitle>

        <Box sx={{ px: 3, pt: 2 }}>
          <TextField
            fullWidth
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </Box>

        <DialogContent dividers sx={{ p: 0 }}>
          <Box sx={{ p: 2 }}>
            {filteredTemplates.length > 0 ? (
              <Grid container spacing={2}>
                {filteredTemplates.map((template, index) => (
                  <Grid item xs={12} key={index}>
                    <Card variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>{template.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{template.content}</Typography>
                      <Button
                        variant="contained"
                        size="medium"
                        onClick={() => handleTemplateSelect(template.content)}
                        sx={{ textTransform: 'none' }}
                      >
                        Use Template
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>No templates found matching your search</Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      {/* Add Department Dialog */}
      <Dialog open={newDeptDialogOpen} onClose={() => setNewDeptDialogOpen(false)}>
        <DialogTitle>Add New Department</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Department Name"
            variant="outlined"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewDeptDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={async () => {
              if (newDepartment.trim()) {
                try {
                  const updated = await addDepartment(newDepartment.trim());
                  setDepartments(updated);
                  setDepartment(newDepartment.trim());
                  setNewDepartment('');
                  setNewDeptDialogOpen(false);
                } catch (err) {
                  console.error(err);
                  alert('Failed to add department');
                }
              }
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobDescriptionForm;
