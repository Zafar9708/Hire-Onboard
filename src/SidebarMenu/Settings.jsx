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
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Tabs,
  Tab,
  TextField,
  Paper,
  Radio,
  RadioGroup,
  Badge,
  IconButton,
  Collapse,
  useTheme
} from '@mui/material';
import {
  Settings as SettingsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Notifications as NotificationsIcon,
  NotificationsActive as NotificationsActiveIcon,
  NotificationsOff as NotificationsOffIcon,
  Email as EmailIcon,
  Info as InfoIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircle as CheckCircleIcon,
  HelpOutline as HelpOutlineIcon
} from '@mui/icons-material';

const SettingsPanel = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    emailNotifications: 'important',
    fontSize: 16,
    autoSave: true,
    twoFactorAuth: false
  });
  const [expandedSection, setExpandedSection] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSettingChange = (name, value) => {
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleResetDefaults = () => {
    setSettings({
      theme: 'light',
      notifications: true,
      emailNotifications: 'important',
      fontSize: 16,
      autoSave: true,
      twoFactorAuth: false
    });
    setShowResetConfirm(false);
  };

  const SettingItem = ({ icon, title, description, action, helpText }) => {
    return (
      <ListItem sx={{ px: 0, py: 2 }}>
        <ListItemIcon sx={{ minWidth: 48, mr: 2 }}>
          <Avatar sx={{ 
            bgcolor: 'primary.light', 
            color: 'primary.dark',
            width: 40,
            height: 40
          }}>
            {icon}
          </Avatar>
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="subtitle1" fontWeight="medium">
              {title}
            </Typography>
          }
          secondary={
            <>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
              {helpText && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  <HelpOutlineIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                  {helpText}
                </Typography>
              )}
            </>
          }
          sx={{ my: 0 }}
        />
        <Box sx={{ ml: 2 }}>
          {action}
        </Box>
      </ListItem>
    );
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
        <Avatar sx={{ 
          bgcolor: 'primary.main', 
          width: 56, 
          height: 56,
          '& .MuiSvgIcon-root': { fontSize: 30 }
        }}>
          <SettingsIcon />
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Customize your application experience
          </Typography>
        </Box>
      </Box>

      <Card sx={{ 
        borderRadius: 3,
        boxShadow: theme.shadows[3],
        overflow: 'hidden',
        mb: 3
      }}>
        <Tabs 
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            bgcolor: 'background.paper',
            borderBottom: `1px solid ${theme.palette.divider}`,
            '& .MuiTabs-indicator': {
              height: 4,
              borderRadius: '4px 4px 0 0'
            }
          }}
        >
          <Tab 
            label="General" 
            value="general" 
            icon={<SettingsIcon sx={{ mb: 0 }} /> }
            iconPosition="start"
            sx={{ minHeight: 60 }}
          />
          <Tab 
          label="Appearance" 
          value="appearance" 
          icon={<PaletteIcon sx={{ mb: 0 }} />}  // Added closing bracket here
          iconPosition="start"
          sx={{ minHeight: 60 }}
        />
          <Tab 
            label="Notifications" 
            value="notifications" 
            icon={<NotificationsIcon sx={{ mb: 0 }} /> }
            iconPosition="start"
            sx={{ minHeight: 60 }}
          />
          <Tab 
            label="Security" 
            value="security" 
            icon={<SecurityIcon sx={{ mb: 0 }} /> }
            iconPosition="start"
            sx={{ minHeight: 60 }}
          />
        </Tabs>

        <CardContent sx={{ p: 0 }}>
          {/* General Settings Tab */}
          <Collapse in={activeTab === 'general'} unmountOnExit>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <SettingsIcon color="primary" sx={{ mr: 1 }} />
                General Preferences
              </Typography>
              
              <Paper elevation={0} sx={{ borderRadius: 2, mb: 3 }}>
                <ListItem button onClick={() => toggleSection('autoSave')} sx={{ px: 2 }}>
                  <ListItemText
                    primary="Auto Save"
                    secondary="Automatically save changes to your work"
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Switch
                      checked={settings.autoSave}
                      onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                      color="primary"
                    />
                    {expandedSection === 'autoSave' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </Box>
                </ListItem>
                <Collapse in={expandedSection === 'autoSave'}>
                  <Box sx={{ px: 3, pb: 2, pt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      When enabled, your changes will be saved automatically every few minutes.
                      You can still manually save at any time.
                    </Typography>
                  </Box>
                </Collapse>
                <Divider />
              </Paper>

              <Paper elevation={0} sx={{ borderRadius: 2 }}>
                <SettingItem
                  icon={<InfoIcon />}
                  title="Application Version"
                  description={`Current version: 2.3.1`}
                  action={
                    <Button variant="outlined" size="small" disabled>
                      Check for Updates
                    </Button>
                  }
                />
                <Divider />
              </Paper>
            </Box>
          </Collapse>

          {/* Appearance Settings Tab */}
          <Collapse in={activeTab === 'appearance'} unmountOnExit>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <PaletteIcon color="primary" sx={{ mr: 1 }} />
                Appearance
              </Typography>
              
              <Paper elevation={0} sx={{ borderRadius: 2, mb: 3 }}>
                <SettingItem
                  icon={settings.theme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                  title="Theme"
                  description={`Current theme: ${settings.theme === 'dark' ? 'Dark' : 'Light'} mode`}
                  action={
                    <Button
                      variant="outlined"
                      startIcon={settings.theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                      onClick={() => handleSettingChange('theme', settings.theme === 'dark' ? 'light' : 'dark')}
                      sx={{ textTransform: 'none' }}
                    >
                      Switch to {settings.theme === 'dark' ? 'Light' : 'Dark'} Mode
                    </Button>
                  }
                />
                <Divider />
              </Paper>

              <Paper elevation={0} sx={{ borderRadius: 2 }}>
                <SettingItem
                  icon={<Typography sx={{ fontWeight: 'bold' }}>A</Typography>}
                  title="Font Size"
                  description="Adjust the text size throughout the application"
                  action={
                    <FormControl size="small" sx={{ minWidth: 100 }}>
                      <InputLabel>Size</InputLabel>
                      <Select
                        value={settings.fontSize}
                        label="Size"
                        onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                      >
                        <MenuItem value={14}>Small</MenuItem>
                        <MenuItem value={16}>Medium</MenuItem>
                        <MenuItem value={18}>Large</MenuItem>
                        <MenuItem value={20}>Extra Large</MenuItem>
                      </Select>
                    </FormControl>
                  }
                />
              </Paper>
            </Box>
          </Collapse>

          {/* Notifications Settings Tab */}
          <Collapse in={activeTab === 'notifications'} unmountOnExit>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <NotificationsIcon color="primary" sx={{ mr: 1 }} />
                Notifications
              </Typography>
              
              <Paper elevation={0} sx={{ borderRadius: 2, mb: 3 }}>
                <SettingItem
                  icon={settings.notifications ? <NotificationsActiveIcon /> : <NotificationsOffIcon />}
                  title="Enable Notifications"
                  description="Receive system and application notifications"
                  action={
                    <Switch
                      checked={settings.notifications}
                      onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                      color="primary"
                    />
                  }
                />
                <Divider />
              </Paper>

              <Paper elevation={0} sx={{ borderRadius: 2 }}>
                <SettingItem
                  icon={<EmailIcon />}
                  title="Email Notifications"
                  description="Configure how often you receive email notifications"
                  action={
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel>Frequency</InputLabel>
                      <Select
                        value={settings.emailNotifications}
                        label="Frequency"
                        onChange={(e) => handleSettingChange('emailNotifications', e.target.value)}
                      >
                        <MenuItem value="all">All notifications</MenuItem>
                        <MenuItem value="important">Only important</MenuItem>
                        <MenuItem value="none">None</MenuItem>
                      </Select>
                    </FormControl>
                  }
                  helpText="Important notifications include security alerts and account updates"
                />
              </Paper>
            </Box>
          </Collapse>

          {/* Security Settings Tab */}
          <Collapse in={activeTab === 'security'} unmountOnExit>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <SecurityIcon color="primary" sx={{ mr: 1 }} />
                Security
              </Typography>
              
              <Paper elevation={0} sx={{ borderRadius: 2, mb: 3 }}>
                <SettingItem
                  icon={<Badge color="primary" badgeContent="!">2FA</Badge>}
                  title="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                  action={
                    <Switch
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                      color="primary"
                    />
                  }
                  helpText="Recommended for all users"
                />
                {settings.twoFactorAuth && (
                  <>
                    <Divider />
                    <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Two-Factor Authentication is enabled
                      </Typography>
                      <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                        Change Method
                      </Button>
                      <Button variant="outlined" size="small" color="error">
                        Disable
                      </Button>
                    </Box>
                  </>
                )}
                <Divider />
              </Paper>

              <Paper elevation={0} sx={{ borderRadius: 2 }}>
                <SettingItem
                  icon={<SecurityIcon />}
                  title="Password"
                  description="Last changed 3 months ago"
                  action={
                    <Button variant="outlined" size="small">
                      Change Password
                    </Button>
                  }
                  helpText="We recommend changing your password every 6 months"
                />
              </Paper>
            </Box>
          </Collapse>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<CheckCircleIcon />}
          onClick={() => console.log('Settings saved:', settings)}
        >
          Save Changes
        </Button>
        
        <Box>
          {showResetConfirm ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body2" sx={{ alignSelf: 'center' }}>
                Reset all settings to default?
              </Typography>
              <Button 
                variant="outlined" 
                color="error"
                size="small"
                onClick={handleResetDefaults}
              >
                Confirm
              </Button>
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Button 
              variant="text" 
              color="error"
              onClick={() => setShowResetConfirm(true)}
            >
              Reset to Defaults
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPanel;