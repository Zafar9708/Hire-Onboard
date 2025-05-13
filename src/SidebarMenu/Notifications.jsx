import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Divider,
  Button,
  Chip,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
  List,
  TextField,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Paper,
  InputAdornment
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  NotificationsActive as ActiveNotificationsIcon,
  NotificationsOff as InactiveNotificationsIcon,
  Check as CheckIcon,
  Delete as DeleteIcon,
  MoreVert as MoreIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  MarkEmailRead as MarkReadIcon,
  ClearAll as ClearAllIcon
} from '@mui/icons-material';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      title: 'New candidate applied', 
      message: 'John Doe has applied for the Frontend Developer position', 
      time: '2 mins ago', 
      read: false, 
      type: 'application',
      priority: 'high'
    },
    { 
      id: 2, 
      title: 'Interview scheduled', 
      message: 'Interview with Sarah Williams has been scheduled for tomorrow at 10:00 AM', 
      time: '1 hour ago', 
      read: true, 
      type: 'interview',
      priority: 'medium'
    },
    { 
      id: 3, 
      title: 'System maintenance', 
      message: 'Scheduled maintenance tonight from 12:00 AM to 2:00 AM', 
      time: '3 hours ago', 
      read: true, 
      type: 'system',
      priority: 'low'
    },
    { 
      id: 4, 
      title: 'New message', 
      message: 'You have received a new message from the hiring team', 
      time: '5 hours ago', 
      read: false, 
      type: 'message',
      priority: 'high'
    },
    { 
      id: 5, 
      title: 'Profile update required', 
      message: 'Please update your profile information to complete your account setup', 
      time: '1 day ago', 
      read: true, 
      type: 'account',
      priority: 'medium'
    }
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => 
      ({ ...notification, read: true })
    ));
    handleMenuClose();
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
    handleMenuClose();
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread' 
      ? notifications.filter(n => !n.read) 
      : notifications.filter(n => n.type === filter);

  const searchedNotifications = filteredNotifications.filter(notification => 
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeColor = (type) => {
    switch(type) {
      case 'application': return 'primary';
      case 'interview': return 'secondary';
      case 'system': return 'warning';
      case 'message': return 'info';
      case 'account': return 'success';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Badge badgeContent={unreadCount} color="error" overlap="circular">
            <NotificationsIcon fontSize="large" color="primary" />
          </Badge>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Notifications
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 2 }
            }}
          />
          
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleFilterChange}
            size="small"
            sx={{ height: '40px' }}
          >
            <ToggleButton value="all" sx={{ textTransform: 'none', px: 2 }}>
              All
            </ToggleButton>
            <ToggleButton value="unread" sx={{ textTransform: 'none', px: 2 }}>
              Unread
            </ToggleButton>
            <ToggleButton value="application" sx={{ textTransform: 'none', px: 2 }}>
              Applications
            </ToggleButton>
            <ToggleButton value="interview" sx={{ textTransform: 'none', px: 2 }}>
              Interviews
            </ToggleButton>
          </ToggleButtonGroup>
          
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={handleMenuClick}
            sx={{ textTransform: 'none', height: '40px' }}
          >
            Actions
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={markAllAsRead}>
              <ListItemIcon>
                <MarkReadIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Mark all as read</ListItemText>
            </MenuItem>
            <MenuItem onClick={clearAll}>
              <ListItemIcon>
                <ClearAllIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Clear all notifications</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <Card sx={{ 
        boxShadow: 3,
        borderRadius: 3,
        overflow: 'hidden'
      }}>
        <CardContent sx={{ p: 0 }}>
          {searchedNotifications.length > 0 ? (
            <List sx={{ p: 0 }}>
              {searchedNotifications.map((notification) => (
                <React.Fragment key={notification.id}>
                  <ListItem
                    sx={{
                      p: 2.5,
                      backgroundColor: !notification.read ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                      borderLeft: !notification.read ? '4px solid #1976d2' : 'none',
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        backgroundColor: !notification.read ? 'rgba(25, 118, 210, 0.12)' : 'action.hover'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 48, mr: 2 }}>
                      <Avatar sx={{ 
                        bgcolor: `${getTypeColor(notification.type)}.light`,
                        color: `${getTypeColor(notification.type)}.dark`
                      }}>
                        <NotificationsIcon />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Typography 
                            variant="subtitle1" 
                            sx={{ 
                              fontWeight: !notification.read ? '600' : '500',
                              mr: 1
                            }}
                          >
                            {notification.title}
                          </Typography>
                          <Chip 
                            label={notification.priority} 
                            size="small" 
                            color={getPriorityColor(notification.priority)}
                            sx={{ height: 20, fontSize: '0.65rem' }}
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography 
                            variant="body2"
                            color="text.primary"
                            sx={{ mb: 0.5 }}
                          >
                            {notification.message}
                          </Typography>
                          <Typography 
                            variant="caption"
                            color={!notification.read ? 'primary.main' : 'text.secondary'}
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            {notification.time}
                          </Typography>
                        </>
                      }
                    />
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {!notification.read && (
                        <Tooltip title="Mark as read">
                          <IconButton 
                            size="small" 
                            onClick={() => markAsRead(notification.id)}
                            sx={{
                              color: 'text.secondary',
                              '&:hover': {
                                color: 'primary.main',
                                backgroundColor: 'rgba(25, 118, 210, 0.08)'
                              }
                            }}
                          >
                            <CheckIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Delete">
                        <IconButton 
                          size="small" 
                          onClick={() => deleteNotification(notification.id)}
                          sx={{
                            color: 'text.secondary',
                            '&:hover': {
                              color: 'error.main',
                              backgroundColor: 'rgba(244, 67, 54, 0.08)'
                            }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItem>
                  <Divider sx={{ my: 0 }} />
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Box sx={{ 
              p: 4, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <InactiveNotificationsIcon sx={{ 
                fontSize: 60, 
                color: 'text.disabled', 
                mb: 2,
                opacity: 0.5
              }} />
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                No notifications found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
                {filter === 'unread' 
                  ? "You're all caught up! No unread notifications." 
                  : searchQuery 
                    ? "No notifications match your search criteria."
                    : "There are no notifications for the selected filter."}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {searchedNotifications.length > 0 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          mt: 2
        }}>
          <Button 
            variant="text" 
            size="small"
            startIcon={<CheckIcon />}
            onClick={markAllAsRead}
            sx={{ textTransform: 'none' }}
          >
            Mark all as read
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Notifications;