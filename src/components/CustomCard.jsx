import * as React from 'react';
import { Typography, Grid, Card, CardContent, CardHeader } from '@mui/material';
import axios from 'axios';
import { baseURL } from '../_config/index'

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

  export const Home = () => {
    const [mutirao, setMutirao] = React.useState(0);

    React.useEffect(() => {
        const getMutirao = async () => {
            try{
                const response = await axios.get(baseURL + 'mutirao/');
                setMutiraoCount(response.data.length);
            } catch(err){
                console.error('Erro ao renderizar mutirão:', err);
            }
        };

        getMutirao();
  }, []);

  return (
    <div>
        <CustomCard title="Mutirões" value={mutiraoCount} color="primary"/>
    </div>
  )
};