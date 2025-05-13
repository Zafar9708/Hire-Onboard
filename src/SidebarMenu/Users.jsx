import React from 'react';
import { 
    Box, 
    Typography, 
    Grid, 
    Card, 
    CardContent,
    Avatar,
    Button,
    Divider,
    TextField,
    InputAdornment,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ListItemIcon,
    ListItemText,
    Paper,
    Chip,
    Menu,
    MenuItem,
    Pagination,
    Stack
} from '@mui/material';
import {
    Search as SearchIcon,
    Add as AddIcon,
    MoreVert as MoreIcon,
    PersonAdd as PersonAddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    FilterList as FilterIcon
} from '@mui/icons-material';

const Users = () => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'active', lastActive: '2 hours ago' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Recruiter', status: 'active', lastActive: '30 minutes ago' },
        { id: 3, name: 'Michael Johnson', email: 'michael.j@example.com', role: 'Hiring Manager', status: 'active', lastActive: '1 day ago' },
        { id: 4, name: 'Sarah Williams', email: 'sarah.w@example.com', role: 'Interviewer', status: 'inactive', lastActive: '1 week ago' },
        { id: 5, name: 'David Brown', email: 'david.b@example.com', role: 'Recruiter', status: 'active', lastActive: '5 hours ago' },
        { id: 6, name: 'Emily Davis', email: 'emily.d@example.com', role: 'Interviewer', status: 'active', lastActive: '3 days ago' }
    ];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [currentUserId, setCurrentUserId] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event, userId) => {
        setAnchorEl(event.currentTarget);
        setCurrentUserId(userId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCurrentUserId(null);
    };

    const handleEdit = () => {
        console.log('Edit user:', currentUserId);
        handleClose();
    };

    const handleDelete = () => {
        console.log('Delete user:', currentUserId);
        handleClose();
    };

    return (
        <Box>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 3,
                mt:3,
                flexWrap: 'wrap',
                gap: 2
            }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    User Management
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        size="small"
                        placeholder="Search users..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ minWidth: 250 }}
                    />
                    <Button 
                        variant="contained" 
                        startIcon={<PersonAddIcon />}
                        sx={{ textTransform: 'none' }}
                    >
                        Add New User
                    </Button>
                </Box>
            </Box>

            <Card sx={{ 
                boxShadow: 2,
                borderRadius: 2
            }}>
                <CardContent sx={{ p: 0 }}>
                    <Box sx={{ 
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                    }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            All Users ({users.length})
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button 
                                size="small" 
                                variant="outlined" 
                                startIcon={<FilterIcon />}
                                sx={{ textTransform: 'none' }}
                            >
                                Filters
                            </Button>
                            <IconButton size="small">
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Last Active</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                                    {user.name.charAt(0)}
                                                </Avatar>
                                                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                                    {user.name}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={user.role} 
                                                size="small"
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    backgroundColor: user.role === 'Admin' ? '#e0f2fe' : 
                                                                  user.role === 'Recruiter' ? '#ecfdf5' : '#fef3c7',
                                                    color: user.role === 'Admin' ? '#0369a1' : 
                                                          user.role === 'Recruiter' ? '#059669' : '#92400e'
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={user.status} 
                                                size="small"
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    backgroundColor: user.status === 'active' ? '#ecfdf5' : '#fee2e2',
                                                    color: user.status === 'active' ? '#059669' : '#b91c1c'
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>{user.lastActive}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => handleClick(e, user.id)}
                                            >
                                                <MoreIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ 
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid',
                        borderColor: 'divider'
                    }}>
                        <Typography variant="body2" color="text.secondary">
                            Showing 1 to {users.length} of {users.length} entries
                        </Typography>
                        <Pagination 
                            count={5} 
                            size="small" 
                            shape="rounded" 
                            showFirstButton 
                            showLastButton 
                        />
                    </Box>
                </CardContent>
            </Card>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleEdit} dense>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit User</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDelete} dense>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete User</ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Users;