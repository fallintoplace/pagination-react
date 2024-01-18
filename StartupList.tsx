// StartupList.tsx
import { ReactElement, useState } from "react";
import { styled } from '@mui/material/styles';
import { Box, CircularProgress, Alert, Pagination, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useFetchStartups } from "./useFetchStartups";
import StartupCard from "./StartupCard";
import React from "react";

// Styled component for centering content
const CenteredBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

// The StartupList component that renders a list of startups
export default function StartupList(): ReactElement {
  const { startups, loading, error } = useFetchStartups();
  const [page, setPage] = useState(1);
  const [sliceSize, setSliceSize] = useState(20);
  const sliceSizes = [10, 20, 50, 100];
  
  const startupSlice = React.useMemo(() => 
    startups.slice((page - 1) * sliceSize, page * sliceSize),
    [page, startups, sliceSize]
  );
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }
  const handleSliceSizeChange = (event: SelectChangeEvent<number>) => {
    setSliceSize(event.target.value as number);
    setPage(1);
  }

  // Displaying a loading spinner when data is being fetched
  if (loading) {
    return (
      <CenteredBox>
        <CircularProgress />
      </CenteredBox>
    );
  }

  // Displaying an error message if there is an error in data fetching
  if (error) {
    return (
      <CenteredBox>
        <Alert severity="error">{error}</Alert>
      </CenteredBox>
    );
  }

  // Rendering the list of startups using the StartupCard component
  return (
    <Box id="startup-list">
      <Box display="flex" alignItems="center">
        <Pagination 
          count={Math.ceil(startups.length / sliceSize)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          showFirstButton
          showLastButton
        />
        <Select
          value={sliceSize}
          onChange={handleSliceSizeChange}
        >
          {sliceSizes.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {startupSlice.map((startup) => (
        <Box key={startup.id} className="MuiGrid-item">
          <StartupCard {...startup} />
        </Box>
      ))}
    </Box>
  );
}
