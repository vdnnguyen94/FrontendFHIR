import React, { useState } from 'react';
import { transferPatientAPI } from './apiService';
import StatusDashboard from './StatusDashboard'; // Import the new dashboard component
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  CircularProgress,
  Alert,
  Paper // This import is needed for the Paper component
} from '@mui/material';

function App() {
  const [patientId, setPatientId] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const handleInputChange = (event) => {
    setPatientId(event.target.value);
    if (apiResponse) {
      setApiResponse(null);
    }
  };

  const handleSubmit = async () => {
    setApiResponse(null);
    setIsLoading(true);
    const response = await transferPatientAPI(patientId);
    setApiResponse(response);
    setIsLoading(false);
    // Clear input field on successful transfer
    if (response.status === 'SUCCESS') {
      setPatientId('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 3, width: '100%', borderRadius: 2 }}>
          <Typography component="h1" variant="h4" gutterBottom align="center">
            EHR Transfer Service
          </Typography>
          
          {apiResponse && (
            <Alert 
              severity={apiResponse.status === 'SUCCESS' ? 'success' : 'error'} 
              sx={{ width: '100%', mb: 2 }}
            >
              {apiResponse.message}
            </Alert>
          )}

          <Box sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="patientId"
              label="Patient ID to Transfer"
              name="patientId"
              autoFocus
              value={patientId}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: '56px' }}
              onClick={handleSubmit}
              disabled={!patientId || isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Transfer Patient'}
            </Button>
          </Box>
        </Paper>

        {/* This is where we render the new Status Dashboard component */}
        <StatusDashboard />
        
      </Box>
    </Container>
  );
}

export default App;