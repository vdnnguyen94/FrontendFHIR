import React, { useState, useEffect } from 'react';
import { getSystemStatusAPI } from './apiService';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Chip,
  Paper
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

function StatusDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      const data = await getSystemStatusAPI();
      setServices(data);
      setLoading(false);
    };

    fetchStatus(); // Fetch status on initial component load
    const interval = setInterval(fetchStatus, 15000); // And then refresh every 15 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Box sx={{ mt: 4, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        System Status
      </Typography>
      <Paper elevation={2}>
        <List dense>
          {loading && services.length === 0 ? (
            <ListItem>
              <ListItemText primary="Checking system status..." />
            </ListItem>
          ) : (
            services.map((service, index) => (
              <ListItem key={index} divider={index < services.length - 1}>
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  {service.status === 'AVAILABLE' ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <ErrorIcon color="error" />
                  )}
                </ListItemIcon>
                <ListItemText 
                  primary={service.name} 
                  secondary={service.url}
                />
                <Chip 
                  label={service.status}
                  color={service.status === 'AVAILABLE' ? 'success' : 'error'}
                  size="small"
                />
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
}

export default StatusDashboard;
