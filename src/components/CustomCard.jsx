import * as React from 'react';
import { Typography, Grid, Card, CardContent, CardHeader } from '@mui/material';

export const CustomCard = ({ title, value, color }) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ height: '100%', borderLeft: `5px solid pink`, borderRadius: 'none' }} elevation={3}>
          <CardHeader
            title={<Typography variant="h6" sx={{ color: color }}>{title}</Typography>}
          />
          <CardContent>
            <Typography variant="h5" sx={{ color: color }}>{value}</Typography>
          </CardContent>
        </Card>
      </Grid>
    )
};