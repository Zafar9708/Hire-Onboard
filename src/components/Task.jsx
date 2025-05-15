import React, { useState, useEffect } from 'react';
import { 
  Checkbox, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton, 
  Typography, 
  Chip,
  Divider,
  Paper,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Badge
} from '@mui/material';
import {
  Today as TodayIcon,
  Assignment as AssignmentIcon,
  Person as ManagerIcon,
  CheckCircle as CompletedIcon,
  AccessTime as PendingIcon,
  Build as InProgressIcon,
  MoreVert as MoreIcon,
  Add as AddIcon,
  PriorityHigh as HighPriorityIcon,
  LowPriority as LowPriorityIcon,
  Schedule as MediumPriorityIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  header: {
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
    color: '#ffffff',
  },
  title: {
    fontWeight: '700',
    fontSize: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  listItem: {
    padding: '16px 24px',
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.04)',
    },
  },
  completedTask: {
    textDecoration: 'line-through',
    color: 'rgba(0, 0, 0, 0.38)',
  },
  managerInfo: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '8px',
    gap: '8px',
  },
  avatar: {
    width: '28px',
    height: '28px',
    backgroundColor: '#1976d2',
    fontSize: '0.875rem',
  },
  statusChip: {
    marginLeft: '12px',
    fontSize: '0.75rem',
    height: '24px',
  },
  emptyState: {
    padding: '40px 24px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  addButton: {
    marginLeft: 'auto',
    backgroundColor: '#ffffff',
    color: '#1976d2',
    borderRadius: '8px',
    padding: '8px 16px',
    fontWeight: '600',
    textTransform: 'none',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
  },
  taskActions: {
    display: 'flex',
    gap: '8px',
  },
  taskPriority: {
    marginLeft: '12px',
    '&.high': {
      color: '#d32f2f',
    },
    '&.medium': {
      color: '#ed6c02',
    },
    '&.low': {
      color: '#0288d1',
    },
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px 24px',
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
});

const Task = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignedBy: 'Current User',
    managerAvatar: 'CU',
  });

  // Mock data
  useEffect(() => {
    const mockTasks = [
      {
        id: 1,
        title: 'Review applications for Senior Developer position',
        description: '15 new applications received, need to shortlist top 5 candidates',
        assignedBy: 'Sarah Johnson',
        assignedDate: new Date(),
        dueDate: new Date(),
        completed: false,
        status: 'pending',
        priority: 'high',
        managerAvatar: 'SJ',
      },
      {
        id: 2,
        title: 'Schedule interviews for Marketing Manager',
        description: 'Coordinate with 5 candidates and hiring team for availability',
        assignedBy: 'Michael Chen',
        assignedDate: new Date(),
        dueDate: new Date(),
        completed: false,
        status: 'in-progress',
        priority: 'medium',
        managerAvatar: 'MC',
      },
      {
        id: 3,
        title: 'Prepare onboarding documents for new hire',
        description: 'John Doe - Frontend Developer starting next Monday',
        assignedBy: 'David Wilson',
        assignedDate: new Date(),
        dueDate: new Date(),
        completed: true,
        status: 'completed',
        priority: 'low',
        managerAvatar: 'DW',
      },
    ];
    setTasks(mockTasks);
  }, []);

  const handleToggle = (taskId) => () => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assignedBy: 'Current User',
      managerAvatar: 'CU',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    const task = {
      id: tasks.length + 1,
      ...newTask,
      assignedDate: new Date(),
      dueDate: new Date(),
      completed: false,
      status: 'pending',
    };
    setTasks([...tasks, task]);
    handleCloseDialog();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CompletedIcon color="success" fontSize="small" />;
      case 'in-progress':
        return <InProgressIcon color="warning" fontSize="small" />;
      default:
        return <PendingIcon color="action" fontSize="small" />;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <HighPriorityIcon fontSize="small" />;
      case 'medium':
        return <MediumPriorityIcon fontSize="small" />;
      default:
        return <LowPriorityIcon fontSize="small" />;
    }
  };

  const todayTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    const today = new Date();
    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    );
  });

  const pendingTasksCount = todayTasks.filter(task => !task.completed).length;

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <div className={classes.title}>
          <TodayIcon fontSize="large" />
          <div>
            <div>Today's Tasks</div>
            <Typography variant="caption" style={{ opacity: 0.9 }}>
              {format(new Date(), 'EEEE, MMMM d')} • {pendingTasksCount} pending tasks
            </Typography>
          </div>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className={classes.addButton}
          onClick={handleOpenDialog}
        >
          Add Task
        </Button>
      </div>
      
      {todayTasks.length === 0 ? (
        <div className={classes.emptyState}>
          <AssignmentIcon style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.3 }} />
          <Typography variant="h6" style={{ marginBottom: '8px' }}>No tasks for today</Typography>
          <Typography variant="body2" style={{ marginBottom: '24px' }}>
            You're all caught up! Add a new task to get started.
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
          >
            Create Today's Task
          </Button>
        </div>
      ) : (
        <List>
          {todayTasks.map((task) => (
            <React.Fragment key={task.id}>
              <ListItem className={classes.listItem}>
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  tabIndex={-1}
                  disableRipple
                  onChange={handleToggle(task.id)}
                  color="primary"
                />
                <ListItemText
                  primary={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className={task.completed ? classes.completedTask : ''}>
                        {task.title}
                      </span>
                      <Chip
                        label={task.status.replace('-', ' ')}
                        size="small"
                        className={classes.statusChip}
                        icon={getStatusIcon(task.status)}
                        variant="outlined"
                      />
                      <span className={`${classes.taskPriority} ${task.priority}`}>
                        {getPriorityIcon(task.priority)} {task.priority}
                      </span>
                    </div>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="textSecondary">
                        {task.description}
                      </Typography>
                      <div className={classes.managerInfo}>
                        <Avatar className={classes.avatar}>{task.managerAvatar}</Avatar>
                        <Typography variant="caption">
                          Assigned by {task.assignedBy} • {format(new Date(task.assignedDate), 'h:mm a')}
                        </Typography>
                      </div>
                    </>
                  }
                />
                <ListItemSecondaryAction className={classes.taskActions}>
                  <IconButton edge="end" aria-label="more">
                    <MoreIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}

      {/* Add Task Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <div className={classes.dialogTitle}>
          <Typography variant="h6">Create New Task</Typography>
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent className={classes.dialogContent}>
          <TextField
            fullWidth
            label="Task Title"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={4}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
              label="Priority"
            >
              <MenuItem value="high">High Priority</MenuItem>
              <MenuItem value="medium">Medium Priority</MenuItem>
              <MenuItem value="low">Low Priority</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions style={{ padding: '16px 24px', borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddTask}
            disabled={!newTask.title}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Task;