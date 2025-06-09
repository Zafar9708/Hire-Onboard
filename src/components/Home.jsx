

import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  AppBar,
  Toolbar,
  Avatar,
  useMediaQuery,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Link
} from '@mui/material';
import { Business as BusinessIcon, Person as PersonIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      '@media (min-width:600px)': {
        fontSize: '3.5rem',
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
  },
});

const Home = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      title: "Candidate Management",
      description: "Track and manage all candidate applications in one place",
      icon: "👥",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Job Posting",
      description: "Create and publish new job openings effortlessly",
      icon: "📝",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Interview Scheduling",
      description: "Coordinate interviews with candidates and team members",
      icon: "📅",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Analytics Dashboard",
      description: "Get insights into your hiring pipeline",
      icon: "📊",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Resume Parser",
      description: "Automatically extract key information from resumes",
      icon: "📄",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Collaboration Tools",
      description: "Share feedback and notes with your hiring team",
      icon: "💬",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navigation Bar */}
        <AppBar position="static" color="primary" elevation={1}>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Avatar 
                src="https://via.placeholder.com/50" 
                alt="Logo"
                sx={{ width: 40, height: 40, mr: 2 }}
              />
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                HireOnBoard
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                color="inherit" 
                startIcon={<BusinessIcon />}
                component={RouterLink}
                to="/vendor-login"
                sx={{ textTransform: 'none' }}
              >
                Vendor Login
              </Button>
              <Button 
                variant="contained" 
                color="secondary"
                startIcon={<PersonIcon />}
                component={RouterLink}
                to="/login"
                sx={{ textTransform: 'none' }}
              >
                Employer Login
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box
          sx={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            py: 12,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh'
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h1" component="h1" gutterBottom sx={{mt:2}}> 
              Modern Hiring & Onboarding Platform
            </Typography>
            <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ mb: 4 }}>
              Streamline your recruitment process with our all-in-one solution
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button 
                variant="contained" 
                color="secondary"
                size="large"
                sx={{ px: 4 }}
                component={RouterLink}
                to="/register"
              >
                Get Started
              </Button>
              <Button 
                variant="outlined" 
                color="inherit"
                size="large"
              >
                Learn More
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            Our Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={feature.image}
                    alt={feature.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {feature.icon} {feature.title}
                    </Typography>
                    <Typography>
                      {feature.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      fullWidth
                      component={RouterLink}
                      to="/features"
                    >
                      Learn More
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Testimonials Section */}
        <Box sx={{ backgroundColor: 'primary.main', color: 'white', py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
              What Our Clients Say
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  quote: "HireOnBoard reduced our hiring time by 40% and improved our candidate experience dramatically.",
                  name: "Sarah Johnson",
                  position: "HR Director, TechCorp"
                },
                {
                  quote: "The onboarding automation saved us hundreds of hours in paperwork and manual processes.",
                  name: "Michael Chen",
                  position: "Talent Acquisition, StartUp Inc"
                },
                {
                  quote: "Best recruitment platform we've used. The analytics alone are worth the investment.",
                  name: "David Wilson",
                  position: "CEO, Growth Ventures"
                }
              ].map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="body1" fontStyle="italic" sx={{ mb: 3 }}>
                        "{testimonial.quote}"
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.position}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom sx={{ mb: 3 }}>
            Ready to Transform Your Hiring Process?
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Join thousands of companies who have streamlined their recruitment with HireOnBoard
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ px: 6, py: 2 }}
            component={RouterLink}
            to="/register"
          >
            Get Started for Free
          </Button>
        </Container>

        {/* Footer */}
        <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'white', py: 6 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src="https://via.placeholder.com/50" 
                    alt="Logo"
                    sx={{ width: 50, height: 50, mr: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    HireOnBoard
                  </Typography>
                </Box>
                <Typography variant="body2">
                  Revolutionizing recruitment and onboarding for modern businesses.
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Product
                </Typography>
                <Link href="#" variant="body2" display="block" sx={{ mb: 1 }}>Features</Link>
                <Link href="#" variant="body2" display="block" sx={{ mb: 1 }}>Pricing</Link>
                <Link href="#" variant="body2" display="block">Integrations</Link>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Company
                </Typography>
                <Link href="#" variant="body2" display="block" sx={{ mb: 1 }}>About Us</Link>
                <Link href="#" variant="body2" display="block" sx={{ mb: 1 }}>Contact</Link>
                <Link href="#" variant="body2" display="block">Careers</Link>
              </Grid>
            </Grid>
            <Typography variant="body2" align="center" sx={{ mt: 4 }}>
              © {new Date().getFullYear()} HireOnBoard. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;