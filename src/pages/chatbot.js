import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from "@chatscope/chat-ui-kit-react";
import { useMoralis } from 'react-moralis';
import { AudioRecorder, useAudioRecorder, } from 'react-audio-voice-recorder';
import { async } from 'react-cloudinary-upload-widget';
import { CircularProgress, Avatar,Stack, Typography, TextField } from '@mui/material';
import user from '@mui/icons-material';
import { Box } from '@mui/system';
// pages/index.js
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import OpenAI from 'openai';

import dynamic from "next/dynamic";
import DID_API from './api.json' assert { type: 'json' };
import { SayButton } from 'react-say';
import { useEffect, useCallback, useState, useRef } from 'react';
const Vocal = dynamic(
  () => import("@untemps/react-vocal"),
  {
    ssr: false,
  }
);
import { useMediaQuery } from 'react-responsive'


// ... (código anterior)
const Chatbot = () => {

  const { Moralis } = useMoralis();

const [newstreamID,setStreamingID]=useState("")
const [newSessionId,setSessionId]=useState("")

const [values, setValues] = useState({
  userResponse: "",
  lenguage: "", 
   expert: "seguridadSocial",

});
let lenguageSelected="es-ES"
console.log(values.lenguage)
useEffect(()=>{
  lenguageSelected=values.lenguage
},[values.lenguage])
  let streamId;
  const handleChange = useCallback(
    async (event) => {
      setLoading(true)
      if(event.target.name=="lenguage"){
        let user= Moralis.User.current()
        user.set('chatbotLang',event.target.value)
      }
     await setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
      setLoading(false)

      console.log(values.expert)
    });
  const [history, setHistory] = useState([
    {role: "user", content: ``},
    {
      role: "assistant",
      content: "Bievenidos al asistente legal laboral de España",
    },
  ]);
  
  if (DID_API.key == '🤫') alert('Please put your API key inside ./api.json and restart.');
  const [isLoading, setLoading] = useState(false);
  const recorderControls = useAudioRecorder()
  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const [newfileId,setFileID]=useState()

const [textIA,setTextIA]=useState("Haz cualquier consulta que quieras")
  // Load the OpenAI API from file new 10/23 
  // OpenAI API endpoint set up new 10/23 

const uploadFile = async (buffer, type, purpose) => {
  try {
      const blob = new Blob([buffer], { type: type });
      const formData = new FormData();
      formData.append('file', blob);
      formData.append('purpose', purpose);

      const response = await fetch('https://api.openai.com/v1/files', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CHATGPT}`
          },
          body: formData
      });
      const result = await response.json();
      return result.id;
  } catch (error) {
      console.error('Error uploading file:', error);
      return null;
  }
};

  
  async function fetchOpenAIResponse(userMessage) {
  try{
    setValues({userResponse:""})
    let user=await Moralis.User.current()
  

const userInformation = {
  name: user.get('name'),
 lastname:  user.get('lastname'),
  email: user.get('email'),
  dni: user.get('dni'),
  birthday: user.get('birthday'),
  province: user.get('province'),
  gender: user.get('gender'),
  contractInit: user.get('contractInit'),
  salary: user.get('salary'),
  community: user.get('community'),

  contractEnd: user.get('contractEnd'),
  contractType: user.get('contractType'),
  salarioBruto: user.get('salaryBrute'),
  cotization:  user.get('cotization'),
  syndicate: user.get('syndicate'),
  weeklyHours: user.get('weeklyHours'),
  jobinTesting: user.get('jobTest'),
  job: user.get('job'),

 };
/*     let res=await Moralis.Cloud.run(
      "assistanceChatStream",
      { history:history, expert:values.expert,userResponse:"utiliza mi informacion personal para responder  "+JSON.stringify(userInformation)+" :"+userMessage}
    );
    let respuesta=res
    .filter(message => message.role === 'assistant')
    .map(message => message.content[0].text.value)
    .join('\n') */
    const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_CHATGPT,dangerouslyAllowBrowser: true  });

    const assistantIds= {
      "seguridadSocial": "asst_TQVFirGoqMQIvaAjHgZDqDPK",
      "trabajoAutonomo": "asst_APiNNWRn8V9Rl6GS4UJCujna",
      "convenios": "asst_EM9Cc720BWO7jAXCuwUqLC7X",
      "jubilacion": "asst_L20k2Jv4k6OEtHW3n5EyckRb",
      "salarios": "asst_chEufrNqQdRMxXaZteXTuzb6",
      "deberesDerechos": "asst_Wr2AjzojUjhRRSKHgcvV5q4i",
      "constitucionEspanola": "asst_2sWQtH5LsP0pNloixbWIxxRA",
      "derechoTributario": "asst_kLPnMxHhKxYkh2zAGuly10GL",
      "suspensionesDespidos": "asst_UVEVnc4duCVpoGq0pp3V2kG7",
      "representacionTrabajadores": "asst_8pQq8XTbKv7LURqXqmvCFEDB"
    };
    let threadId=""
    let asistenteID = assistantIds[values.expert] || assistantIds["seguridadSocial"];
  let  vectorId="vs_ESSFTv5fLrkhlceR9srzKVI3"
  console.log(" community "+user.get('community'))
  console.log(" community "+values.expert)

    if(values.expert==="convenios"){


      if(user.get('community')=="Aragón"){
        

    if(!user.get("threadIdConveniosAragon")){
      const thread = await openai.beta.threads.create();
user.set("threadIdConveniosAragon",thread.id)
threadId=thread.id
console.log("threadIdConveniosAragon "+threadId)

    } else {
      threadId=user.get("threadIdConveniosAragon")
console.log("threadId "+threadId)
    }
        console.log("Aragón")
        vectorId="asst_SzWrRCaCC7woGYrWLhtbReAL"
        asistenteID="asst_SzWrRCaCC7woGYrWLhtbReAL"
      }
      if(user.get('community')=="Extremadura"){
        console.log("Extremadura")
        vectorId="vs_ESSFTv5fLrkhlceR9srzKVI3"

        asistenteID="asst_DoBIPo3N64BoPC63Ms6TNaU2"
      }
      if(user.get('community')=="Comunidad de Madrid"){
        vectorId="asst_RHpDTvU7VbdfGdS2papFOKcG"

        asistenteID="asst_RHpDTvU7VbdfGdS2papFOKcG"
      }

      if(user.get('community')=="La Rioja"){
        vectorId="vs_qrUs690uDfjvCUobt7sq2ebg"

        asistenteID="asst_KuxbJbUWqxcjTF4sPhDzPN6q"
      }
      

      if(user.get('community')=="Canarias"){
        vectorId="vs_epziJroUC8KeP2KAR7DglcP0"

        asistenteID="asst_HCUtCsXW37AAQ8vRkbRhD19t"
      }

      if(user.get('community')=="Comunidad Valenciana"){
        vectorId="vs_UdX9eRcu7ugzZMzMBqICDUfR"

        asistenteID="asst_N8BECCEhAp9YncXlliJYt0f2"
      }
      
      if(user.get('community')=="Islas Baleares"){
        vectorId="vs_ODXtxEZ5A3hOxpuQRjTnt0po"

        asistenteID="asst_RP1Zz7s98rO2u9zqfRWZTelF"
      }
      if(user.get('community')=="Cantabria"){
        vectorId="vs_mIjY5Z4U6jBE5V1k9t9Q9mBR"

        console.log("Cantabria")

        asistenteID="asst_rQd9DNKGALLebwS4h6BOdURh"
      }

      if(user.get('community')=="Castilla La Mancha"){
        vectorId="vs_VgQFQ2ioUtLcpuy7h5ZfUI3Q"

        asistenteID="asst_IXwMcQ9MWCgDhWxdeVOlMmg7"
      }
    } 
    
    if(values.expert==="trabajoAutonomo"){

      vectorId="vs_bfn5BPbZsjQmgYr78dFpWvsN"
    }
    
    if(values.expert==="jubilacion"){
      vectorId="vs_soUZs7LFLGvw6oAenRb0TDl6"
    }
    
    
    if(values.expert==="salarios"){
      vectorId="vs_CTpUPbfX1Yuvi0thhHZfCTA8"


    }
    
    if(values.expert==="seguridadSocial"){
      
      vectorId="vs_TQeu6hIstinF3w4psLHphnFB"

    }
    if(values.expert==="deberesDerechos"){
      vectorId="vs_cYMswpq0Yqqu7qxqC2URl6X3"

      
    }

    if(values.expert==="suspensionesDespidos"){
      vectorId="vs_QSAtU7Nrw3Ol8tqxayRX5WkY"


    }
    if(values.expert==="representacionTrabajadores"){
      
      vectorId="vs_kp1s10I1RhDOhPwPvGV6RMu2"

    }
    
    if(values.expert==="derechoTributario"){

      vectorId="vs_M2VhM0PTE2BtXeOhwdAiZDuU"

    }
    if(values.expert==="constitucionEspanola"){
      vectorId="vs_eZoHrlSED9Mdfp7eE4HP9xRt"

    }
    console.log("newfileId "+newfileId)

  console.log("asistenteID "+asistenteID)
  let mensajes=[]
  /* 
  if(newfileId!==""&&newfileId){
  
mensajes= [
  { role: "user",      
  content: ` revisa bien el storage este archivo  antes de responder ${newfileId}`+" y mi pregunta es:"+userMessage }
]
  }else{

    mensajes= [
      { role: "user", content: "utiliza mi informacion personal `"+JSON.stringify(userInformation)+" :"+userMessage  }
    ]
  } */
  
  console.log(values.expert)
  
console.log("threadId "+threadId)
console.log("asistenteID "+asistenteID)

  const message = await openai.beta.threads.messages.create(
    threadId,
    {
      role: "user",
      content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
    }
  );
  console.log("entrooo ")

const stream = openai.beta.threads.runs.stream(threadId, {
  assistant_id: asistenteID
})
  .on('textCreated', (text) => console.log("textCreated",text))
  .on('textDelta', (textDelta, snapshot) => console.log("textDelta",textDelta))
  .on('toolCallCreated', (toolCall) => console.log("toolCall",toolCall))
  .on('toolCallDelta', (toolCallDelta, snapshot) => {
    if (toolCallDelta.type === 'code_interpreter') {
      if (toolCallDelta.code_interpreter.input) {
        console.log("toolCallDelta.code_interpreter.input",toolCallDelta.code_interpreter.input)
      }
      if (toolCallDelta.code_interpreter.outputs) {
        process.stdout.write("\noutput >\n");
        toolCallDelta.code_interpreter.outputs.forEach(output => {
          if (output.type === "logs") {
            console.log("logs",`\n${output.logs}\n`)
          }
        });
      }
    }
  });
  /* 
    const stream = openai.beta.threads.createAndRun({
      assistant_id: asistenteID,
      model: "gpt-4-turbo",
      instructions: `Eres un asistente virtual especializado en derecho laboral en España, con acceso completo al Estatuto de los Trabajadores y a todos los convenios colectivos sectoriales pertinentes. Debes utilizar esta documentación para responder de forma detallada y completa a todas las consultas, evitando sugerir al usuario que realice búsquedas adicionales o consulte documentos por su cuenta.

      Al enfrentarte a preguntas complejas, como complementos salariales por antigüedad, peligrosidad o condiciones específicas de trabajo en el sector de la construcción en Barcelona, revisa las cláusulas relevantes del convenio colectivo aplicable y proporciona una explicación clara, basada en los textos legales que tienes disponibles.
      
      Evita el uso de asteriscos o caracteres especiales entre palabras, así como recomendaciones externas como sugerir que el usuario confirme cálculos con el departamento de recursos humanos o consulte con un experto legal. Además, ofrece respuestas libres de terminología complicada, símbolos matemáticos complejos o citas. Realiza cálculos internos y presenta el resultado sin fórmulas o símbolos, utilizando palabras sencillas como “multiplicar” o “dividir”.
      
      Si un usuario proporciona el ID de un archivo, busca el contenido correspondiente en el sistema de almacenamiento para obtener la información necesaria y ofrecer una solución cerrada y definitiva.`,

      thread: {
        messages:mensajes
      },
      stream: true
    }); */
let words=''
    for await (const event of await stream) {

      if (event.data.object.toString() === 'thread.message.delta') {
        words=words+event.data.delta.content[0].text.value
        await setTextIA(words)
}

    }
    setFileID("")
    return words
  }catch (e){
    console.log(e)
  }
  }
    
  //same  - No edits from Github example for this whole section
  const RTCPeerConnection = (
    window.RTCPeerConnection ||
    window.webkitRTCPeerConnection ||
    window.mozRTCPeerConnection
  ).bind(window);
  
  let peerConnection;
  let sessionId;
  let sessionClientAnswer;
  
  let statsIntervalId;
  let videoIsPlaying;
  let lastBytesReceived;
  
  let talkVideo;

  let iceStatusLabel;
  let iceGatheringStatusLabel;
  let signalingStatusLabel;
  let streamingStatusLabel;
  let connectButton;
  let talkButton;
  let peerStatusLabel;


const [iniciando,setIniciando]=useState(false)

const genders = [
  {
    value: "en-US",
    label: "Inglés",
  },
  {
    value: "es-ES",
    label: "Español ",
  },
  
  {
    value: "it-IT",
    label: "Italiano",
  },
  
  {
    value: "pt-BR",
    label: "Portugues",
  },
];

const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })
const [connected,setConnected]=useState(false)

  useEffect(()=>{
    
     talkVideo = document.getElementById('talk-video');

    talkVideo.setAttribute('playsinline', '');
    peerStatusLabel = document.getElementById('peer-status-label');
    iceStatusLabel = document.getElementById('ice-status-label');
    iceGatheringStatusLabel = document.getElementById('ice-gathering-status-label');
    signalingStatusLabel = document.getElementById('signaling-status-label');
    streamingStatusLabel = document.getElementById('streaming-status-label');
     talkButton = document.getElementById('talk-button');

    connectButton = document.getElementById('connect-button');
    connectButton.onclick = async () => {
      if (peerConnection && peerConnection.connectionState === 'connected') {
       setConnected(true)
        return;
      }
      setIniciando(true)
    
      stopAllStreams();
      closePC();
    
      const sessionResponse = await fetch(`${DID_API.url}/talks/streams`, {
        method: 'POST',
        headers: {'Authorization': `Basic ${DID_API.key}`, 'Content-Type': 'application/json'},
        body: JSON.stringify({
          source_url: "https://i.postimg.cc/fLdQq0DW/thumbnail.jpg",
        }),

      });
    
      const { id: newStreamId, offer, ice_servers: iceServers, session_id: newSessionId } = await sessionResponse.json()
      streamId = newStreamId;
      sessionId = newSessionId;
      setStreamingID(streamId)
      setSessionId(sessionId)

      try {
        sessionClientAnswer = await createPeerConnection(offer, iceServers);
            setConnected(true)
            setIniciando(false)

      } catch (e) {
        console.log('error during streaming setup', e);
        stopAllStreams();
        closePC();
               setConnected(false)
               setIniciando(false)


        return;
      }
    
      const sdpResponse = await fetch(`${DID_API.url}/talks/streams/${streamId}/sdp`,
        {
          method: 'POST',
          headers: {Authorization: `Basic ${DID_API.key}`, 'Content-Type': 'application/json'},
          body: JSON.stringify({answer: sessionClientAnswer, session_id: sessionId})
        });
    };
  // This is changed to accept the ChatGPT response as Text input to D-ID #138 responseFromOpenAI 
  talkButton.onclick = async () => {
    setLoading(true)
    console.log("entro")
    if (peerConnection?.signalingState === 'stable' || peerConnection?.iceConnectionState === 'connected') {
      //
      // New from Jim 10/23 -- Get the user input from the text input field get ChatGPT Response
      const userInput = document.getElementById('user-input-field').value;
      document.getElementById('user-input-field').value = '';

      const responseFromOpenAI = await fetchOpenAIResponse(userInput);
setFileID("")

      //
      // Print the openAIResponse to the console
      //
      console.log("responseFromOpenAI "+JSON.stringify(responseFromOpenAI))
      console.log(" values.lenguage "+JSON.stringify(values.lenguage))
      let user=await Moralis.User.current()

      
        let providerList={ type: 'microsoft', voice_id: 'es-ES-AbrilNeural' }
    
  

      const talkResponse = await fetch(`${DID_API.url}/talks/streams/${streamId}`, {
        method: 'POST',
        headers: { 
          Authorization: `Basic ${DID_API.key}`, 
          'Content-Type': 'application/json'
       },
        body: JSON.stringify({
          session_id: sessionId,

          script: {
            type: 'text',
            subtitles: 'false',
            provider: providerList,
            ssml: false,
            input:responseFromOpenAI  //send the openAIResponse to D-id
          },
          config: {
            fluent: true,
            pad_audio: 0,
            driver_expressions: {
              expressions: [{ expression: 'neutral', start_frame: 0, intensity: 0 }],
              transition_frames: 0
            },
            align_driver: true,
            align_expand_factor: 0,
            auto_match: true,
            motion_factor: 0,
            normalization_factor: 0,
            sharpen: true,
            stitch: true,
            result_format: 'mp4'
          },   

          'driver_url': 'bank://lively/',
          'config': {
            'stitch': true,
          },

        }),

      });
      console.log("talkResponse "+JSON.stringify(talkResponse))
    }
  };
  
  },[])
  
useEffect(()=>{
async function connectionInit(){

  if (peerConnection && peerConnection.connectionState === 'connected') {
    setConnected(true)
     return;
   }
   setIniciando(true)
 
   stopAllStreams();
   closePC();
 
   const sessionResponse = await fetch(`${DID_API.url}/talks/streams`, {
     method: 'POST',
     headers: {'Authorization': `Basic ${DID_API.key}`, 'Content-Type': 'application/json'},
     body: JSON.stringify({
       source_url: "https://i.postimg.cc/fLdQq0DW/thumbnail.jpg",
     }),

   });
 
   const { id: newStreamId, offer, ice_servers: iceServers, session_id: newSessionId } = await sessionResponse.json()
   streamId = newStreamId;
   sessionId = newSessionId;
   setStreamingID(streamId)
   setSessionId(sessionId)

   try {
     sessionClientAnswer = await createPeerConnection(offer, iceServers);
         setConnected(true)
         setIniciando(false)

   } catch (e) {
     console.log('error during streaming setup', e);
     stopAllStreams();
     closePC();
            setConnected(false)
            setIniciando(false)


     return;
   }
 
   const sdpResponse = await fetch(`${DID_API.url}/talks/streams/${streamId}/sdp`,
     {
       method: 'POST',
       headers: {Authorization: `Basic ${DID_API.key}`, 'Content-Type': 'application/json'},
       body: JSON.stringify({answer: sessionClientAnswer, session_id: sessionId})
     });
}

connectionInit()
},[])
  
  // NOTHING BELOW THIS LINE IS CHANGED FROM ORIGNAL D-id File Example
  //
  
  
  function onIceGatheringStateChange() {
    iceGatheringStatusLabel.innerText = peerConnection.iceGatheringState;
    iceGatheringStatusLabel.className = 'iceGatheringState-' + peerConnection.iceGatheringState;
  }
  function onIceCandidate(event) {
    console.log('onIceCandidate', event);
    if (event.candidate) {
      const { candidate, sdpMid, sdpMLineIndex } = event.candidate;
  
      fetchWithRetries(`${DID_API.url}/talks/streams/${streamId}/ice`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${DID_API.key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidate,
          sdpMid,
          sdpMLineIndex,
          session_id: sessionId,
        }),
      });
    }
  }
  function onIceConnectionStateChange() {
    iceStatusLabel.innerText = peerConnection.iceConnectionState;
    iceStatusLabel.className = 'iceConnectionState-' + peerConnection.iceConnectionState;
    if (peerConnection.iceConnectionState === 'failed' || peerConnection.iceConnectionState === 'closed') {
      stopAllStreams();
      closePC();
    }
  }
  function onConnectionStateChange() {
    // not supported in firefox
    peerStatusLabel.innerText = peerConnection.connectionState;
    peerStatusLabel.className = 'peerConnectionState-' + peerConnection.connectionState;
  }
  function onSignalingStateChange() {
    signalingStatusLabel.innerText = peerConnection.signalingState;
    signalingStatusLabel.className = 'signalingState-' + peerConnection.signalingState;
  }
  
  function onVideoStatusChange(videoIsPlaying, stream) {
    let status;
    if (videoIsPlaying) {
      status = 'streaming';
      const remoteStream = stream;
      setVideoElement(remoteStream);
    } else {
      status = 'empty';
      playIdleVideo();
    }
    streamingStatusLabel.innerText = status;
    streamingStatusLabel.className = 'streamingState-' + status;
  }
  
  function onTrack(event) {
    /**
     * The following code is designed to provide information about wether currently there is data
     * that's being streamed - It does so by periodically looking for changes in total stream data size
     *
     * This information in our case is used in order to show idle video while no talk is streaming.
     * To create this idle video use the POST https://api.d-id.com/talks endpoint with a silent audio file or a text script with only ssml breaks 
     * https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html#break-tag
     * for seamless results use `config.fluent: true` and provide the same configuration as the streaming video
     */
  
    if (!event.track) return;
  
    statsIntervalId = setInterval(async () => {
      const stats = await peerConnection.getStats(event.track);
      stats.forEach((report) => {
        if (report.type === 'inbound-rtp' && report.mediaType === 'video') {
          const videoStatusChanged = videoIsPlaying !== report.bytesReceived > lastBytesReceived;
  
          if (videoStatusChanged) {
            videoIsPlaying = report.bytesReceived > lastBytesReceived;
            onVideoStatusChange(videoIsPlaying, event.streams[0]);
          }
          lastBytesReceived = report.bytesReceived;
        }
      });
    }, 500);
  }
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Simular un clic en el input real de tipo file
    fileInputRef.current.click();
  };

  const handleFileUpload = async (event) => {
    setLoading(true)

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
        const buffer = reader.result;
        const fileId = await uploadFile(buffer, file.type, 'assistants');
        console.log('Uploaded file ID:', fileId);
        setLoading(false)

       await setFileID(fileId.toString());
    };
    reader.onerror = (error) => {
      setLoading(false)

        console.log('Error reading file:', error);
    };
    reader.readAsArrayBuffer(file);
  };

  async function createPeerConnection(offer, iceServers) {
    if (!peerConnection) {
      peerConnection = new RTCPeerConnection({ iceServers });
      peerConnection.addEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
      peerConnection.addEventListener('icecandidate', onIceCandidate, true);
      peerConnection.addEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
      peerConnection.addEventListener('connectionstatechange', onConnectionStateChange, true);
      peerConnection.addEventListener('signalingstatechange', onSignalingStateChange, true);
      peerConnection.addEventListener('track', onTrack, true);
    }
  
    await peerConnection.setRemoteDescription(offer);
    console.log('set remote sdp OK');
  
    const sessionClientAnswer = await peerConnection.createAnswer();
    console.log('create local sdp OK');
  
    await peerConnection.setLocalDescription(sessionClientAnswer);
    console.log('set local sdp OK');
  
    return sessionClientAnswer;
  }
  
  function setVideoElement(stream) {
    if (!stream) return;
    talkVideo.srcObject = stream;
    talkVideo.loop = false;
  
    // safari hotfix
    if (talkVideo.paused) {
      talkVideo
        .play()
        .then((_) => {})
        .catch((e) => {});
    }
  }
  function playIdleVideo() {
    talkVideo.srcObject = undefined;
    talkVideo.src = 'prs_alice.idle.mp4';
    talkVideo.loop = true;
  }
  
  function stopAllStreams() {
    if (talkVideo.srcObject) {
      console.log('stopping video streams');
      talkVideo.srcObject.getTracks().forEach((track) => track.stop());
      talkVideo.srcObject = null;
    }
  }
  
  function closePC(pc = peerConnection) {
    if (!pc) return;
    console.log('stopping peer connection');
    pc.close();
    pc.removeEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
    pc.removeEventListener('icecandidate', onIceCandidate, true);
    pc.removeEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
    pc.removeEventListener('connectionstatechange', onConnectionStateChange, true);
    pc.removeEventListener('signalingstatechange', onSignalingStateChange, true);
    pc.removeEventListener('track', onTrack, true);
    clearInterval(statsIntervalId);
    iceGatheringStatusLabel.innerText = '';
    signalingStatusLabel.innerText = '';
    iceStatusLabel.innerText = '';
    peerStatusLabel.innerText = '';
    console.log('stopped peer connection');
    if (pc === peerConnection) {
      peerConnection = null;
    }
  }
  
  const maxRetryCount = 3;
  const maxDelaySec = 4;
  // Default of 1 moved to 5
  async function fetchWithRetries(url, options, retries = 3) {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (retries <= maxRetryCount) {
        const delay = Math.min(Math.pow(2, retries) / 4 + Math.random(), maxDelaySec) * 3000;
  
        await new Promise((resolve) => setTimeout(resolve, delay));
  
        console.log(`Request failed, retrying ${retries}/${maxRetryCount}. Error ${err}`);
        return fetchWithRetries(url, options, retries + 1);
      } else {
        throw new Error(`Max retries exceeded. error: ${err}`);
      }
    }
  }
  const [result, setResult] = useState('')
	const _onVocalError = (res) => {
		console.log(res)
	}
	const _onVocalStart = () => {
    console.log("entro")

		setResult('')
	}

	const _onVocalResult =async (result) => {
    console.log(result)

		setResult(result)
    
    let res=await Moralis.Cloud.run(
      "chatgpt",
      { history:history, userResponse:result }
    );


  setHistory([...history, { role: "user", content: result},{role:"assistant",content:res}])
  console.log("streamId "+newstreamID)
  console.log("sessionId "+newSessionId)
  console.log("123123123 ")
  let user=await Moralis.User.current()

  let lang=user.get("chatbotLang")

     providerList={ type: 'microsoft', voice_id: 'es-ES-AbrilNeural' }

  

  const talkResponse = await fetch(`${DID_API.url}/talks/streams/${newstreamID}`, {
    method: 'POST',
    headers: { 
      Authorization: `Basic ${DID_API.key}`, 
      'Content-Type': 'application/json'
   },
    body: JSON.stringify({
      session_id: newSessionId,

      script: {
        type: 'text',
        subtitles: 'false',
        provider: providerList,
        ssml: false,
        input:res  //send the openAIResponse to D-id
      },
      config: {
        fluent: true,
        pad_audio: 0,
        driver_expressions: {
          expressions: [{ expression: 'neutral', start_frame: 0, intensity: 0 }],
          transition_frames: 0
        },
        align_driver: true,
        align_expand_factor: 0,
        auto_match: true,
        motion_factor: 0,
        normalization_factor: 0,
        sharpen: true,
        stitch: true,
        result_format: 'mp4'
      },   

      'driver_url': 'bank://lively/',
      'config': {
        'stitch': true,
      },
    })
  });
	}
  const validKeyForPayment = [
    "Enter",
  ];
  const Play = () => (
    <div
      style={{
        width: 0,
        height: 0,
        marginLeft: 1,
        borderStyle: 'solid',
        borderWidth: '4px 0 4px 8px',
        borderColor: 'transparent transparent transparent black',
      }}
    />
  )
  
  const Stop = () => (
    <div
      style={{
        width: 8,
        height: 8,
        backgroundColor: 'black',
      }}
    />
  )
async function startTalk(){
  setLoading(true)
        // New from Jim 10/23 -- Get the user input from the text input field get ChatGPT Response
        const userInput = document.getElementById('user-input-field').value;
        document.getElementById('user-input-field').value = '';
        console.log("entro enter2")

        const responseFromOpenAI = await fetchOpenAIResponse(userInput);
        console.log("entro enter3"+responseFromOpenAI)

        setHistory([...history, {role:"user",content:userInput},{role:"assistant",content:responseFromOpenAI}])
  
        //
        // Print the openAIResponse to the console
        //
        console.log("responseFromOpenAI "+JSON.stringify(responseFromOpenAI))
        console.log(" values.lenguage "+JSON.stringify(values.lenguage))
        let user=await Moralis.User.current()
  
        let lang=user.get("chatbotLang")
        
         let  providerList={ type: 'microsoft', voice_id: 'es-ES-AbrilNeural' }
      

        const talkResponse = await fetch(`${DID_API.url}/talks/streams/${newstreamID}`, {
          method: 'POST',
          headers: { 
            Authorization: `Basic ${DID_API.key}`, 
            'Content-Type': 'application/json'
         },
          body: JSON.stringify({
            session_id: newSessionId,
  
            script: {
              type: 'text',
              subtitles: 'false',
              provider: providerList,
              ssml: false,
              input:responseFromOpenAI  //send the openAIResponse to D-id
            },
            config: {
              fluent: true,
              pad_audio: 0,
              driver_expressions: {
                expressions: [{ expression: 'neutral', start_frame: 0, intensity: 0 }],
                transition_frames: 0
              },
              align_driver: true,
              align_expand_factor: 0,
              auto_match: true,
              motion_factor: 0,
              normalization_factor: 0,
              sharpen: true,
              stitch: true,
              result_format: 'mp4'
            },   
  
            'driver_url': 'bank://lively/',
            'config': {
              'stitch': true,
            },
  
          }),
  
        });
        setLoading(false)

}

const typesValues = [
  { label: 'Seguridad Social', value: 'seguridadSocial' },
  { label: 'Trabajo Autonomo', value: 'trabajoAutonomo' },
  { label: 'Convenios', value: 'convenios' },
  { label: 'Jubilacion', value: 'jubilacion' },
  { label: 'Representacion de Trabajadores', value: 'representacionTrabajadores' },

  { label: 'Salarios', value: 'salarios' },
  { label: 'Derechos y Deberes de los Trabajadores', value: 'deberesDerechos' },
  { label: 'Constitucion Española', value: 'constitucionEspanola' },
  { label: 'Suspension De Contratos Y Despidos Colectivos', value: 'suspensionesDespidos' },
  { label: 'Derecho Tributario', value: 'derechoTributario' },
  
];
  async function handleKeyUp(event) {
    if (event.key === 'Enter') {
      console.log("entro enter")
      setLoading(true)
        //
        startTalk()
    }
  }
  return (
    <div style={{ 
      justifyContent:'center',
      alignItems:'center',position: "relative",justifyContent:"center",alignItems:"center", flexDirection:"row",height: "90%" }}>
        <button style={{backgroundColor:connected?'green':'blue'}} disabled={connected?true:false} id="connect-button" type="button">{connected?"Conectado":iniciando?"Cargando":"Iniciar Chatbot"}</button>

    <div id="status" >
      <Box style={{flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',position:"absolute",opacity:0}}>
             gathering : <label id="ice-gathering-status-label"></label>
            <br />
             status: <label id="ice-status-label"></label><br />
             connection : <label id="peer-status-label"></label><br />
            signaling : <label id="signaling-status-label"></label><br />
            streaming : <label id="streaming-status-label"></label><br />
            </Box>   </div>
      
        <div style={{ position: "relative", 
          alignSelf:'center',
            justifyContent:'center',flexDirection:"row",height: "70%" }}>
    

        <div style={{
          alignSelf:'center',
            justifyContent:'center',
            alignItems:'center',margin:10}}>
                   <video  id="talk-video" alignSelf='center'  width="200" height="200" autoPlay></video>
                   <TextField
                fullWidth
                label="Experto En"
                name="expert"

                onChange={handleChange}
                required
                select
                style={{
                  paddingTop:6,
                  width:240,
                  marginLeft:35,
                  marginBottom:10
                }}
                SelectProps={{ native: true }}
                value={values.expert}
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
                 </div>
               
                 <MainContainer style={{
            justifyContent:'center',
            alignSelf:'center',
            position:'fixed',
            width:isTabletOrMobile?"100%":"80%",

            paddingBottom:'450px',
            alignItems:'center', marginTop: 3 }}>
        
       <ChatContainer style={{}}>
        
          <MessageList style={{ 
            justifyContent:'center',
            alignItems:'center',flex:0.9, }}>
             
              <Stack style={{
                justifyContent:'center',
                alignItems:'center', marginTop:10,flexDirection:"row"}} key={1}>
               

                <Message
                  key={1}
                  name="userResponse"
                  style={{marginRight:20}}
                  model={{
                    sentTime: "just now",
                    message: "IA" + ": " + textIA,
                    sender: "IA",
                  }}
                />

    
              </Stack>
  
          </MessageList>
      {iniciando ? null : 
      <div as={MessageInput} className="fixed bottom-0 pb-safe w-full" style={{
        display: "flex",
        flexDirection: "row",
        position: "fixed",
        bottom: 15,
        width: "75%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 10,
      }}>
              
        <input  onKeyUp={handleKeyUp} type="text" id="user-input-field" placeholder="Pregunta cualquier duda" />
       
        <div tabIndex="0">
          {isLoading ? <CircularProgress style={{ marginLeft: 10 }} /> :
            <button style={{ marginLeft: 10 }} disabled={!connected} onClick={startTalk} id="talk-button" type="button">Send</button>
          } 
         
        </div>
        <div>
        {!isLoading ?    <button className={"w-15 h-15 "} onClick={handleButtonClick}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
</svg>
</button>: null   } 
         
      
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
        ref={fileInputRef}
      />
    </div>
      </div>
      }
    </ChatContainer>
  </MainContainer>
</div>
   
    </div>
  );
}

Chatbot.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Chatbot;
