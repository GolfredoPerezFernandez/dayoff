import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from './config';
import { Budget } from '../layouts/dashboard/overview/budget';
import { TotalCustomers } from '../layouts/dashboard/overview/total-customers';
import { TasksProgress } from '../layouts/dashboard/overview/tasks-progress';
import { TotalProfit } from '../layouts/dashboard/overview/total-profit';
import { Sales } from '../layouts/dashboard/overview/sales';
import { Traffic } from '../layouts/dashboard/overview/traffic';
import { LatestProducts } from '../layouts/dashboard/overview/latest-products';
import { LatestOrders } from '../layouts/dashboard/overview/latest-orders';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } 

const Page = () => {
  const [budget,setBudget]=React.useState("3128")
  const [users,setUsers]=React.useState("28.079")
  const [usersnew,setUsersNew]=React.useState("1.079")

  function setData(name){
    if(name==='Enero'){
setBudget("2.512")
setUsers('21.652')
setUsersNew('1.079')

    }else  if(name==='Marzo'){
      setBudget("3.128")
      setUsers('21.652')
      setUsersNew('1.403')

    }else  if(name==='Febrero'){
      setBudget("2.749")
      setUsers('28.079')
      setUsersNew('1.603')

    }else  if(name==='Abril'){
      setBudget("3.128")
      setUsers('28.079')
      setUsersNew('1.803')

    }
console.log(name)
  }
  return (
    <Grid style={{paddingLeft:10,paddingRight:10}} container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <Budget diff={12} trend="up" sx={{ height: '100%' }} value={budget} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value={users} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value={usersnew}  />
      </Grid>
      <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: 'This year', data: [21.6, 21.6, 28, 28,] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[63, 15, 22]} labels={['Madrid', 'Extremadura', 'Valencia']} sx={{ height: '100%' }} />
      </Grid>
     
      <Grid lg={12} md={12} xs={12}>
        <LatestOrders
        setData={setData}
          orders={[
            {
              id: '001',
              customer: { name: 'Enero' },
              amount: 30.5,
              status: 'Finished',
              createdAt: dayjs().subtract(3, 'months').toDate(),
            },
            {
              id: '002',
              customer: { name: 'Febrero' },
              amount: 25.1,
              status: 'Finished',
              createdAt: dayjs().subtract(2, 'months').toDate(),
            },
            {
              id: '003',
              customer: { name: 'Marzo' },
              amount: 10.99,
              status: 'Finished',
              createdAt: dayjs().subtract(1, 'months').toDate(),
            },
            {
              id: '004',
              customer: { name: 'Abril' },
              amount: 96.43,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
