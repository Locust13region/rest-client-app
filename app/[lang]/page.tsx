import { Button, Grid, AppBar, Container, Box } from '@mui/material';
import ResponsiveAppBar from '@/components/main-page/NavBar';
import CentralArea from '@/components/main-page/CentralArea';
import FooterElement from '@/components/main-page/FooterElement';

export default function Home() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CentralArea />
    </Box>
  );
}
