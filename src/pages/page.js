import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';
import { TotalProfit2 } from '../layouts/dashboard/overview/total-profit2';
import { TotalProfit3 } from '../layouts/dashboard/overview/total-profit3';
import { TotalProfit4 } from '../layouts/dashboard/overview/total-profit4';

import { Budget } from '../layouts/dashboard/overview/budget';
import { TotalCustomers } from '../layouts/dashboard/overview/total-customers';
import { TotalProfit } from '../layouts/dashboard/overview/total-profit';
import { Sales } from '../layouts/dashboard/overview/sales';
import { Traffic } from '../layouts/dashboard/overview/traffic';
import { LatestOrders } from '../layouts/dashboard/overview/latest-orders';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { Typography } from '@mui/material';


 const config = {
  site: { name: 'Devias Kit', description: '', themeColor: '#090a0b',  },
};

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Chart } from '../components/core/chart';
import { TotalProfit5 } from '../layouts/dashboard/overview/total-profit5';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } 

const Page = () => {
  const [budget,setBudget]=React.useState("3.128")
  const [users,setUsers]=React.useState("28.079")
  const [usersnew,setUsersNew]=React.useState("1.079")
  const [usersnew2,setUsersNew2]=React.useState("284")
  const [month,setMonth]=React.useState("Enero")
  const notify = () => toast('Mes Cambio');
  const [usersnew3,setUsersNew3]=React.useState("16")
  const [usersnew4,setUsersNew4]=React.useState("84")
  const [usersnew5,setUsersNew5]=React.useState("84")

  function setData(name){
    setMonth(name)
    if(name==='Enero'){
      setBudget("2.512")
      setUsers('21.652')
      setUsersNew('1.079')
      setUsersNew2('284')
      setUsersNew3('16')
      setUsersNew4('84')
      setUsersNew5('15')

    }else  if(name==='Marzo'){
      setBudget("3.128")
      setUsers('21.652')
      setUsersNew('1.403')
      setUsersNew2('540')
      setUsersNew5('20')

      setUsersNew3('46')
      setUsersNew4('139')
    }else  if(name==='Febrero'){
      setBudget("2.749")
      setUsers('28.079')
      setUsersNew('1.603')
      setUsersNew2('724')
      setUsersNew5('25')

      setUsersNew3('76')
      setUsersNew4('169')
    }else  if(name==='Abril'){
      setBudget("3.128")
      setUsers('28.079')
      setUsersNew('1.803')
      setUsersNew2('613')

      setUsersNew3('90')
      setUsersNew4('249')
      
      setUsersNew5('40')
    }
    notify()
  }

  return (
    <div>
      <Typography style={{marginLeft:40}} color="text.secondary" variant="overline">
      {"Mes: "+month}    
                </Typography>

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
      
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit2 sx={{ height: '100%' }} value={usersnew2}  />
      </Grid>
      
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit3 sx={{ height: '100%' }} value={usersnew3}  />
      </Grid>

      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit4 sx={{ height: '100%' }} value={usersnew4}  />
      </Grid>
      
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit5 sx={{ height: '100%' }} value={usersnew5}  />
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
      <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: 'Este Mes', data: [21.6, 21.6, 28, 28,] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[63, 15, 22]} labels={['Madrid', 'Extremadura', 'Valencia']} sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={12} md={12} xs={12}>

      <Chart height={350} options={
          {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            title: {
              text: 'Tokens Usados por IA',
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr'],
            }
          }
         } series={[{
          name: "Tokens IA",
          data: [832, 984, 1415, 1286]
      }]} type="line" width="100%" />
      </Grid>

       
    </Grid>
    <ToastContainer />
    <div id="html-dist"></div>

    </div>
  );
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
