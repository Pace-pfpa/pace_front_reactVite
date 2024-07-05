import { baseURL } from '../_config'
import axios from 'axios'


export async function api_axios_getMutirao (){
    try {
        const response = await axios.get(baseURL + 'mutirao/')
       if(response.status === 200){
        return Promise.resolve(response.data)
       }else{
        return Promise.reject(new Error())
       }
    }catch(e){
        console.log(e)
        return e
    }
}