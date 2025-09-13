import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';

export default function DiscountTimer({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
        const timer = setInterval(() => {
        const now = dayjs();
        const expiry = dayjs(expiryDate);
        const diff = expiry.diff(now, 'second');
        if (diff <= 0) {
            setTimeLeft('Expired');
            clearInterval(timer);
        } else {
            const hours = Math.floor(diff / 3600);
            const mins = Math.floor((diff % 3600) / 60);
            const secs = diff % 60;
            setTimeLeft(`${hours}h ${mins}m ${secs}s`);
        }
        }, 1000);

        return () => clearInterval(timer);
  }, [expiryDate]);

  return <Typography variant='subtitle2' sx={{ color : 'red' }}>{timeLeft}</Typography>;
}