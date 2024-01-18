// StartupCard.tsx
import React from 'react';
import { Startup } from '../../Types/Startup';
import { styled } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';

// Defining styled components for styling the card, header, label, and description
const StyledStartup = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
}));

const StartupHeader = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  color: theme.palette.text.primary,
}));

const StartupLabel = styled(Typography)(({ theme }) => ({
  display: 'block',
  marginTop: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}));

const StartupDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.text.primary,
}));

// The StartupCard component that renders a single startup
const StartupView: React.FC<Startup> = (props) => {
  const { name, dateFounded, employees, totalFunding, shortDescription, currentInvestmentStage } = props;

  // Rendering the startup card with styled components
  return (
    <StyledStartup>
      <StartupHeader>
        {name}
      </StartupHeader>
      <StartupLabel>
        Founded: {dateFounded.getFullYear()} | {employees} Employees | $ {totalFunding} Mio. | {currentInvestmentStage}
      </StartupLabel>
      <StartupDescription paragraph>
        {shortDescription}
      </StartupDescription>
    </StyledStartup>
  );
};

export default StartupView;