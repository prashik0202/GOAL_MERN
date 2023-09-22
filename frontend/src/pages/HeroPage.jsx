import React from 'react';
import { Container , Typography , Button , Box , useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HeroPage() {

  const isNonMobile = useMediaQuery('(min-width : 600px)');
  const navigate = useNavigate()

  return (
    <Container sx={{ height : '100vh'}}>
      <Box maxWidth='100%' px={isNonMobile ? '10%' : '10%' } pt={isNonMobile ? '20%' : '30%' }>
        <Typography variant= { isNonMobile ? 'h1' : 'h3' }>Goal Setter</Typography>
      </Box>

      <Box mt={1}>
        <Typography variant='body1' >Setting Goals, Realizing Dreams: Unleash Your Potential with GoalSetter</Typography><br />
        <Button 
          onClick={() => navigate('/start')} 
          variant='contained' 
          size='large'
          sx={{ 
            backgroundColor : 'black',
            borderRadius : '0px',
            ':hover' : {
              backgroundColor : 'white',
              color : 'black'
            }
          }}
        >Get Started</Button>
      </Box>
    </Container>
  )
}
