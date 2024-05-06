
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { useMoralis } from 'react-moralis';
import Head from 'next/head';

import { useCallback, useEffect, useState } from 'react';
// ... (código anterior)
import { Box,  Button,CardContent,Container,  TextField,Stack ,Typography } from '@mui/material';
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CircularProgress from '@mui/material/CircularProgress';

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const ContractDetails = () => {
  const { Moralis } = useMoralis();

  const [values, setValues] = useState({
  
    jobDescription:"",
    weeklyHours:"",
    extraPayments:"",
    contractType:"",
    jornada:"",
    salary:"",
    pagasextras:"",
    jobTest:false,
    cotization:"",
    syndicate:""
  });
  
  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );
  const [success,setSuccess]=useState(false)

  async function handleErase(){ 
    
    setSuccess(true)
    let user=await Moralis.User.current()
    user.set("contractEnd",dateEnd.toString())

    user.set("contractInit",dateInit.toString())
    user.set("jobDescription",values.jobDescription)
    user.set("weeklyHours",values.weeklyHours)
    user.set("salaryBrute",values.salaryBrute)
    user.set("contractType",values.contractType)
    user.set("jornada",values.jornada)    
    user.set("salary",values.salary)
    user.set("jobTest",values.jobTest)

    user.set("pagasextras",values.pagasextras)
    
    user.set("cotization",values.cotization)
    user.set("syndicate",values.syndicate)

    await user.save()

    setSuccess(false)
  
  }
  const [dateInit, setDateInit] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  const typesValues2 = [
    { label: 'Indefinido', value: 'Indefinido' },    
    { label: 'Temporal', value: 'Temporal' },
    { label: 'Formación y Aprendizaje', value: 'Formación' },
    { label: 'Prácticas', value: 'Prácticas' },
  ];
  const jobCategories = [
    { label: 'Grupo 1: Ingenieros y Licenciados', value: 'Ingenieros y Licenciados' },
    { label: 'Grupo 2: Ingenieros Técnicos, Peritos y Ayudantes Titulados', value: 'Ingenieros Técnicos, Peritos y Ayudantes Titulados' },
    { label: 'Grupo 3: Jefes Administrativos y de Taller', value: 'Jefes Administrativos y de Taller' },
    { label: 'Grupo 4: Ayudantes no Titulados', value: 'Ayudantes no Titulados' },
    { label: 'Grupo 5: Oficiales Administrativos', value: 'Oficiales Administrativos' },
    { label: 'Grupo 6: Subalternos', value: 'Subalternos' },
    { label: 'Grupo 7: Auxiliares Administrativos', value: 'Auxiliares Administrativos' },
    { label: 'Grupo 8: Oficiales de Primera y Segunda', value: 'Oficiales de Primera y Segunda' },
    { label: 'Grupo 9: Oficiales de Tercera y Especialistas', value: 'Oficiales de Tercera y Especialistas' },
    { label: 'Grupo 10: Peones', value: 'Peones' },
    { label: 'Grupo 11: Trabajadores menores de dieciocho años, sea cual sea su categoría profesional', value: 'Trabajadores menores de dieciocho años, sea cual sea su categoría profesional' }
  ];
  const typesValues = [
    { label: 'si', value: 'si' },    
    { label: 'no', value: 'no' },
  ];
  
  const sectorsArray2 = [
    { label: '12 pagas', value: '12 pagas' },    
    { label: '14 pagas', value: '14 pagas' },
  ];
  const sectorsArray = [
    { label: 'Administración y gestión', value: 'Administración y gestión' },
    { label: 'Agricultura y ganadería', value: 'Agricultura y ganadería' },
    { label: 'Industria alimentaria', value: 'Industria alimentaria' },
    { label: 'Grandes almacenes', value: 'Grandes almacenes' },
    { label: 'Comercio', value: 'Comercio' },
    { label: 'Construcción', value: 'Construcción' },
    { label: 'Actividades físico-deportivas', value: 'Actividades físico-deportivas' },
    { label: 'Educación', value: 'Educación' },
    { label: 'Energía y agua', value: 'Energía y agua' },
    { label: 'Finanzas y seguros', value: 'Finanzas y seguros' },
    { label: 'Hostelería y turismo', value: 'Hostelería y turismo' },
    { label: 'Información, comunicación y artes gráficas', value: 'Información, comunicación y artes gráficas' },
    { label: 'Servicios medioambientales', value: 'Servicios medioambientales' },
    { label: 'Metal', value: 'Metal' },
    { label: 'Pesca y acuicultura', value: 'Pesca y acuicultura' },
    { label: 'Industria química y vidrio', value: 'Industria química y vidrio' },
    { label: 'Sanidad', value: 'Sanidad' },
    { label: 'Otros servicios', value: 'Otros servicios' },
    { label: 'Servicios a las empresas', value: 'Servicios a las empresas' },
    { label: 'Telecomunicaciones', value: 'Telecomunicaciones' },
    { label: 'Textil, confección y piel', value: 'Textil, confección y piel' },
    { label: 'Transporte y logística', value: 'Transporte y logística' },
    { label: 'Economía social', value: 'Economía social' }
  ];
  const typesValues3 = [
    { label: 'Completa', value: 'completa' },    
    { label: 'Media Jornada', value: 'media' },
    { label: 'Parcial', value: 'parcial' },
    { label: 'Reducida', value: 'reducida' },
    { label: 'Horario Partido', value: 'partido' },
    { label: 'Nocturno', value: 'nocturno' },

  ];

  
  useEffect(()=>{
    async function init(){
 console.log()
 
       let user=await Moralis.User.current()
       console.log(user.get("birthday"))
       console.log(dayjs( user.get("birthday")))
       setDateInit(dayjs(user.get("contractInit")));
       setDateEnd(dayjs(user.get("contractEnd")));

       setValues((prevState) => ({
         ...prevState,
         ["syndicate"]:user.get("syndicate")
       }));
       setValues((prevState) => ({
         ...prevState,
         ["cotization"]: user.get("cotization")
       })); 
   
       setValues((prevState) => ({
        ...prevState,
        ["salary"]: user.get("salary")
      })); 
  
       setValues((prevState) => ({
         ...prevState,
         ["jornada"]: user.get("jornada")
       })); 
       setValues((prevState) => ({
         ...prevState,
         ["contractType"]: user.get("contractType")
       })); 
       
       setValues((prevState) => ({
        ...prevState,
        ["salaryBrute"]: user.get("salaryBrute")
      })); 
       setValues((prevState) => ({
         ...prevState,
         ["jobTest"]: user.get("jobTest")
       })); 
       setValues((prevState) => ({
         ...prevState,
         ["weeklyHours"]: user.get("weeklyHours")
       })); 
       setValues((prevState) => ({
         ...prevState,
         ["jobDescription"]: user.get("jobDescription")
       })); 

       setValues((prevState) => ({
        ...prevState,
        ["pagasextra"]: user.get("pagasextra")
      })); 


   }
 init()
   },[])

  return (<>                   
      <Head>
        <title>
        Detalles del Contrato
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
                 Detalles del Contrato
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
         Agrega Detalles del Contrato
        
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Fecha de inicio del contrato"
                    value={dateInit}
                    onChange={(newValue) => setDateInit(newValue)}
                  />{" "}
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Fecha de finalizacion del contrato"
                    value={dateEnd}
                    onChange={(newValue) => setDateEnd(newValue)}
                  />{" "}
                </LocalizationProvider>

{/* 
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Fecha de fin del contrato"
                    value={dateEnd}
                    onChange={(newValue) => setDateEnd(newValue)}
                  />{" "}
                </LocalizationProvider> */}

              <TextField

                fullWidth
                label="Tipo de contrato"
                name="contractType"
                onChange={handleChange}
                required
                select
                defaultValue={"moa"}
                style={{
                  paddingTop:6,
                  marginBottom:10
                }}
                SelectProps={{ native: true }}
                value={values.contractType}
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
                label="Periodo de Prueba"
                name="jobTest"
                onChange={handleChange}
                required
                select
                defaultValue={"moa"}
                style={{
                  paddingTop:6,
                  marginBottom:10
                }}
                SelectProps={{ native: true }}
                value={values.jobTest}
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
                label="Tipo de jornada"
                name="jornada"
                onChange={handleChange}
                required
                select
                defaultValue={"moa"}
                style={{
                  paddingTop:6,
                  marginBottom:10
                }}
                SelectProps={{ native: true }}
                value={values.jornada}
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
                  label="Horas Semanales"
                  name="weeklyHours"
                  multiline={true}
                  onChange={handleChange}
                  required
                  rows={1}

                  style={{
                    marginTop:10,
                    marginBottom:10,
                  
                  }}
                  value={values.weeklyHours}
                />
       
       <TextField
                  fullWidth
                  label="Salario Neto"
                  name="salary"
                  multiline={true}
                  onChange={handleChange}
                  required
                  rows={1}

                  style={{
                    marginTop:10,
                    marginBottom:10,
                  
                  }}
                  value={values.salary}
                />
                     <TextField
                  fullWidth
                  label="Salario Bruto"
                  name="salaryBrute"
                  multiline={true}
                  onChange={handleChange}
                  required
                  rows={1}

                  style={{
                    marginTop:10,
                    marginBottom:10,
                  
                  }}
                  value={values.salaryBrute}
                /> 
                 <TextField
                fullWidth
                label="pagas extras"
                name="pagasextras"
                onChange={handleChange}
                required
                select
                style={{
                  paddingTop:6,
                  marginBottom:10
                }}
                SelectProps={{ native: true }}
                value={values.pagasextras}
              >
                {sectorsArray2.map((option) => (
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
                label="Sector / Sindicato"
                name="syndicate"
                onChange={handleChange}
                required
                select
                style={{
                  paddingTop:6,
                  marginBottom:10
                }}
                SelectProps={{ native: true }}
                value={values.syndicate}
              >
                {sectorsArray.map((option) => (
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
                label="Grupo de cotizacion"
                name="cotization"
                onChange={handleChange}
                required
                select
                style={{
                  paddingTop:6,
                  marginBottom:10
                }}
                SelectProps={{ native: true }}
                value={values.cotization}
              >
                {jobCategories.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
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

ContractDetails.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ContractDetails;

