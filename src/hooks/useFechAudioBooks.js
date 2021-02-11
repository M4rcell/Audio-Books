import { useEffect, useState } from "react";
import { getAudioBooks } from "../services/getAudioBooks";

export const useFechAudioBooks = () => {
    
    const [state, setState] = useState({
        data:[],
        loading:true    
    });

         
    useEffect (()=>{

        getAudioBooks()
        .then(data =>{
            setTimeout(()=>{
                
                console.log(data);

                setState({
                    data:data,
                    loading:false
                });

            },3000);
           
        });

    },[]);

    

    return state;
}