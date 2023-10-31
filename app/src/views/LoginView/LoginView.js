import React from 'react';
import styles from './LoginView.module.css';
import { LoginComponent } from './LoginComponent';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router';
import { Stack } from '@mui/system';

export const LoginView = () => {
  const { user, error } = useUser();
  const navigate = useNavigate();

  if(user)
  {
    navigate('/projects');
  }

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
              <Stack>
                {error && (
                  <Typography>
                    {error}
                  </Typography>
                )}
                <LoginComponent/>
              </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}