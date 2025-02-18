import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

const Dashboard = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">
            Welcome to the Admin Dashboard!
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
