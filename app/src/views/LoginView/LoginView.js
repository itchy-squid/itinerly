import React from 'react';
import styles from './LoginView.module.css';

import { FirebaseAuth } from '../../components/FirebaseAuth';
import { Box, Card, CardContent, Grid, Paper } from '@mui/material';
import { Container } from '@mui/system';

export const LoginView = () => {
  return (
    <Grid container 
      justifyContent='center'
      alignItems='center'
      className={styles.container}
      >

      <Paper sx={{ width: '100%', maxWidth: '800px', p: 4 }}>
        <Grid 
          container
          justifyContent='center'
          alignItems='center'
          >
          <Grid item xs={12} sm={6} md={6}>
            <Box className={styles.graphic}/>
          </Grid>

          <Grid className={styles.loginOptionsContainer}
            item xs={12} sm={8} md={6} py={0} px={2}>
            <FirebaseAuth/>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}