import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function ProductSkeleton() {
  return (
    <Card
      sx={{
        maxWidth: { xs: 160, sm: 235, md: 300 },
        maxHeight: { xs: 300, sm: 450 },
        width: '100%',
        margin: 2,
        backgroundColor: '#fff',
      }}
    >
      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{
          width: '100%',
          height: { xs: 160, sm: 235, md: 300 },
        }}
      />
      <CardContent>
        <Skeleton animation="wave" width="80%" height={20} sx={{ mb: 1 }} />
        <Skeleton animation="wave" width="60%" height={15} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton animation="wave" width={30} height={15} />
          <Skeleton animation="wave" width={60} height={15} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Skeleton animation="wave" width={60} height={20} />
          <Skeleton animation="wave" width={40} height={30} />
        </Box>
      </CardContent>
    </Card>
  );
}