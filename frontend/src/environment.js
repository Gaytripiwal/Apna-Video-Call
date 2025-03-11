// let IS_PROD = true;
let IS_PROD = false;
const server = IS_PROD ?
   // "https://apnacollegebackend.onrender.com" :
   "https://apnavideocallbackend-4psg.onrender.com"

    :"http://localhost:1000"
    // const API_BASE_URL = "http://localhost:10000/api/v1";



export default server;