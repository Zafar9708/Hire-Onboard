import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Chip,
  Grid,
  Paper,
  InputAdornment,
  
} from '@mui/material';
import {
  Help as HelpIcon,
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  Article as ArticleIcon,
  VideoLibrary as VideoLibraryIcon,
  ContactSupport as ContactSupportIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  Forum as ForumIcon
} from '@mui/icons-material';

const Help= () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [activeCategory, setActiveCategory] = useState('getting-started');

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <CheckCircleIcon color="primary" />,
      items: [
        {
          question: 'How do I create an account?',
          answer: 'Click on the "Sign Up" button and fill in your details to create an account.'
        },
        {
          question: 'How to navigate the dashboard?',
          answer: 'Use the sidebar menu to access different sections of the application.'
        },
        {
          question: 'Where can I find my profile settings?',
          answer: 'Click on your avatar in the top right corner and select "Profile Settings".'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account Settings',
      icon: <ArticleIcon color="secondary" />,
      items: [
        {
          question: 'How to change my password?',
          answer: 'Go to Account Settings > Security and click on "Change Password".'
        },
        {
          question: 'How to update my profile information?',
          answer: 'Navigate to your profile page and click the "Edit" button.'
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <VideoLibraryIcon color="warning" />,
      items: [
        {
          question: 'How to manage notification settings?',
          answer: 'Go to Settings > Notifications to customize your preferences.'
        },
        {
          question: 'Why am I not receiving notifications?',
          answer: 'Check your notification settings and ensure they are enabled.'
        }
      ]
    }
  ];

  const popularArticles = [
    { title: 'How to reset your password', views: 1245 },
    { title: 'Understanding the dashboard', views: 982 },
    { title: 'Notification settings explained', views: 756 },
    { title: 'Troubleshooting login issues', views: 654 }
  ];

  const filteredCategories = helpCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 700,
          color: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5
        }}>
          <HelpIcon fontSize="large" />
          Help Center
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<ContactSupportIcon />}
          sx={{
            bgcolor: 'secondary.main',
            '&:hover': { bgcolor: 'secondary.dark' }
          }}
        >
          Contact Support
        </Button>
      </Box>

      <Card sx={{ 
        mb: 4,
        borderRadius: 3,
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
      }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            How can we help you today?
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                bgcolor: 'background.paper'
              }
            }}
          />
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ 
            p: 3, 
            borderRadius: 3,
            position: 'sticky',
            top: 20
          }}>
            <Typography variant="h6" sx={{ 
              mb: 2, 
              fontWeight: 600,
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <ForumIcon color="primary" /> Categories
            </Typography>
            <List sx={{ p: 0 }}>
              {helpCategories.map((category) => (
                <ListItem 
                  button 
                  key={category.id}
                  selected={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    px: 2,
                    py: 1.5,
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      '& .MuiListItemIcon-root': {
                        color: 'primary.main'
                      }
                    },
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {category.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={category.title} 
                    primaryTypographyProps={{ fontWeight: 500 }} 
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ 
              mb: 2, 
              fontWeight: 600,
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <StarIcon color="warning" /> Popular Articles
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {popularArticles.map((article, index) => (
                <Paper 
                  key={index}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'primary.main',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={500}>
                    {article.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {article.views.toLocaleString()} views
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ 
                mb: 3,
                fontWeight: 700,
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}>
                {helpCategories.find(c => c.id === activeCategory)?.icon}
                {helpCategories.find(c => c.id === activeCategory)?.title || 'Help Articles'}
              </Typography>

              {filteredCategories.find(c => c.id === activeCategory)?.items.map((item, index) => (
                <Accordion 
                  key={index} 
                  expanded={expanded === `panel${index}`}
                  onChange={handleAccordionChange(`panel${index}`)}
                  sx={{ 
                    mb: 2,
                    borderRadius: 2,
                    '&:before': { display: 'none' },
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      bgcolor: expanded === `panel${index}` ? 'primary.light' : 'background.paper',
                      borderRadius: 2,
                      '&.Mui-expanded': {
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0
                      }
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }}>{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ 
                    bgcolor: 'background.default',
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8
                  }}>
                    <Typography>{item.answer}</Typography>
                    <Button 
                      size="small" 
                      sx={{ mt: 2 }}
                      startIcon={<CheckCircleIcon />}
                    >
                      Mark as helpful
                    </Button>
                  </AccordionDetails>
                </Accordion>
              ))}

              {filteredCategories.find(c => c.id === activeCategory)?.items.length === 0 && (
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 4,
                  bgcolor: 'background.default',
                  borderRadius: 3
                }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    No articles found
                  </Typography>
                  <Typography color="text.secondary">
                    Try adjusting your search or browse other categories
                  </Typography>
                </Box>
              )}

              <Box sx={{ 
                mt: 6,
                textAlign: 'center',
                bgcolor: 'primary.light',
                p: 4,
                borderRadius: 3
              }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Still need help?
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Our support team is available 24/7 to assist you with any questions.
                </Typography>
                <Button 
                  variant="contained" 
                  size="large"
                  startIcon={<ContactSupportIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem'
                  }}
                >
                  Contact Support Team
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Help;