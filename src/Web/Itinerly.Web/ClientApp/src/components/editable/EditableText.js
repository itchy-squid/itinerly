import React, { Fragment, useEffect, useState } from 'react';
import { Typography, TextField }from '@mui/material';
import styled from '@emotion/styled';

const StyledTextField = styled(TextField)`
  input {
    padding-top: 4px;
    padding-bottom: 4px;
  }
`;

export const EditableText = ({isEditing, value, ...props}) => {
  if(isEditing){
    return (
      <StyledTextField
        hiddenLabel
        fullWidth
        size='small' 
        variant='filled'
        value={value}
        {...props}/>);
  }
  
  return (
    <Typography>
      {value}
    </Typography>
  );
}