
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { useMoralis } from 'react-moralis';
import Head from 'next/head';

import { useCallback, useEffect, useState } from 'react';
// ... (código anterior)
import { Box,  Button,CardContent,Container,  TextField,Stack ,Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
const ContractData = () => {
  const { Moralis } = useMoralis();

  const [values, setValues] = useState({
    gender:"",
    address:"",
    lastname:"",
    email:"",
    dni:"",
    province:"",
    job:""
  });
  const [dateBirthday, setDateBirtday] = useState(null);

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  async function handleErase(){ 
    
    setSuccess(true)
    let user=await Moralis.User.current()
    console.log(dateBirthday)
    console.log(values.address)
    console.log(values.community)
    console.log(values.job)
    console.log(values.provincia)
    console.log(values.gender)

    user.set("birthday",dateBirthday.toString())
    user.set("address",values.address)
    user.set("community",values.community)
    user.set("job",values.job)
    user.set("province",values.province)
    user.set("gender",values.gender)

    await user.save()

    setSuccess(false)
  }
  
  useEffect(()=>{
   async function init(){
console.log()

      let user=await Moralis.User.current()
      console.log(user.get("birthday"))
      console.log(dayjs( user.get("birthday")))
      setDateBirtday(dayjs(user.get("birthday")));

      setValues((prevState) => ({
        ...prevState,
        ["birthday"]:dayjs( user.get("birthday"))
      }));
      setValues((prevState) => ({
        ...prevState,
        ["address"]: user.get("address")
      })); 
  
      setValues((prevState) => ({
        ...prevState,
        ["community"]: user.get("community")
      })); 
      setValues((prevState) => ({
        ...prevState,
        ["job"]: user.get("job")
      })); 
      setValues((prevState) => ({
        ...prevState,
        ["province"]: user.get("province")
      })); 
      setValues((prevState) => ({
        ...prevState,
        ["gender"]: user.get("gender")
      })); 
  }
init()
  },[])

  const typesValues2 = [
    { label: 'Andalucía', value: 'Andalucía' },
    { label: 'Aragón', value: 'Aragón' },
    { label: 'Principado de Asturias', value: 'Principado de Asturias' },
    { label: 'Islas Baleares', value: 'Islas Baleares' },
    { label: 'Canarias', value: 'Canarias' },
    { label: 'Cantabria', value: 'Cantabria' },
    { label: 'Castilla y León', value: 'Castilla y León' },
    { label: 'Castilla-La Mancha', value: 'Castilla-La Mancha' },
    { label: 'Cataluña', value: 'Cataluña' },
    { label: 'Extremadura', value: 'Extremadura' },
    { label: 'Galicia', value: 'Galicia' },
    { label: 'Comunidad de Madrid', value: 'Comunidad de Madrid' },
    { label: 'Región de Murcia', value: 'Región de Murcia' },
    { label: 'Comunidad Foral de Navarra', value: 'Comunidad Foral de Navarra' },
    { label: 'País Vasco', value: 'País Vasco' },
    { label: 'La Rioja', value: 'La Rioja' },
    { label: 'Comunidad Valenciana', value: 'Comunidad Valenciana' },
    { label: 'Ciudad Autónoma de Ceuta', value: 'Ciudad Autónoma de Ceuta' },
    { label: 'Ciudad Autónoma de Melilla', value: 'Ciudad Autónoma de Melilla' }
  ];

  const typesValues = [
    { label: 'Masculino', value: 'masculino' },    
    { label: 'Femenino', value: 'femenino' },
    { label: 'No Binario', value: 'nobinario' },


  ];
  
  const typesValues3 = [
    { label: 'Conductor de mercancías por carretera', value: 'Conductor de mercancías por carretera' },
    { label: '⁠peletero', value: '⁠peletero' },
    { label: '⁠constructor', value: '⁠constructor' },
    { label: '⁠Sanitario', value: '⁠conductor de ambulancias' },
    { label: '⁠piloto', value: '⁠piloto' },
    { label: '⁠Futbolistas', value: '⁠Futbolistas' },
    { label: '⁠Mecanico', value: '⁠Mecanico' },
    { label: '⁠hostelero', value: '⁠hostelero' },
    { label: '⁠camarero', value: '⁠camarero' },
    ];

  const [success,setSuccess]=useState(false)
  return (<>                   
      <Head>
        <title>
          Informacion del contrato 
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          py: 8
        }}
      >
         
        <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      > 
         
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Contrato
                </Typography>
               
              </Stack>
            </Stack>
          
          </Stack>
          
        </Container>
        
      </Box>
      
      <CardContent>   
 <Container maxWidth="xl">
          <Stack spacing={3}>
          <div>
            
          <Typography variant="h6">
          Informacion del contrato 
              </Typography>
 
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Fecha de Nacimiento"
                    value={dateBirthday}
                    onChange={(newValue) => setDateBirtday(newValue)}
                  />{" "}
                </LocalizationProvider>

<TextField
                  fullWidth
                  label="Direccion"
                  name="address"
                  multiline={true}
                  onChange={handleChange}
                  required
                  rows={1}

                  style={{
                    marginTop:10,
                    marginBottom:10,
                  
                  }}
                  value={values.address}
                />

              <TextField
                fullWidth
                label="Genero"
                name="gender"
                onChange={handleChange}
                required
                select
                defaultValue={"moa"}
                style={{
                  paddingTop:6,
                  marginBottom:10
                }}
                SelectProps={{ native: true }}
                value={values.gender}
              >
                {typesValues.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
             
                     <TextField
                fullWidth
                label="Profesion"
                name="job"
                onChange={handleChange}
                required
                select
                style={{
                  paddingTop:6,
                  marginBottom:10
                }}
                SelectProps={{ native: true }}
                value={values.job}
              >
                {typesValues3.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>    
             
             <TextField
                fullWidth
                label="Comunidad autonoma"
                name="community"
                onChange={handleChange}
                required
                select
                style={{
                  paddingTop:6,
                  marginBottom:10
                }}
                SelectProps={{ native: true }}
                value={values.community}
              >
                {typesValues2.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            
             <TextField
                  fullWidth
                  label="Provincia donde trabaja"
                  name="province"
                  multiline={true}
                  onChange={handleChange}
                  required
                  rows={1}

                  style={{
                    marginTop:10,
                    marginBottom:10,
                  
                  }}
                  value={values.province}
                />
             
              </div>
       </Stack>
    
          
        </Container>


{success?<CircularProgress/>:<Button
                 
                  style={{marginLeft:30}}
                 onClick={handleErase}
                 variant="contained"
               >
                Guardar
               </Button>}
   </CardContent>  
      </Box>
      </>
  );
}

ContractData.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ContractData;

