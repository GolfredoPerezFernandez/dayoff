import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
export function Budget({ diff, trend, sx, value }){

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Usuarios Pagando
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
          </Stack>
          
        </Stack>
      </CardContent>
    </Card>
  );
}
