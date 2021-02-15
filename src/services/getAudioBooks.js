
    const API_TOKEN  =        'CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc';
    const SPACE_ID   =        '1t4hjzo7y0kb';
    const ENVIRONMENT=        'master';
    const CONTENT_TYPE_ID=    'audiocontent-v5'; 
    const BASE_URL   =        'https://api.contentful.com';

export const getAudioBooks= async()=>{    

    const url =`${BASE_URL}/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries?select=fields,sys.id,sys.version&locale=es-MX&content_type=${CONTENT_TYPE_ID}`;
            
     const resp = await fetch (url,{
         method:"GET",
         headers:{
             Authorization: `Bearer ${API_TOKEN}`
         }
        });

     const data = await resp.json();
      return data;
    }

export const getSingleAudioBook= async(id)=>{    
  
    const url =`${BASE_URL}/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries?sys.id=${id}&select=fields,sys.id,sys.version&locale=es-MX`;
            
     const resp = await fetch (url,{
         method:"GET",
         headers:{
             Authorization: `Bearer ${API_TOKEN}`
         }
        });
    console.log('resp : ',resp);

     const data = await resp.json();

     console.log('Data API : ' ,data);

    return data;
    }

    export const createAudioBooks= async(title ,is_original,street_date,cost_per_play, authors, narrators,duration,cover)=>{ 

        const url =`${BASE_URL}/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries`;
    //encodeURI renplaza los espacios  en dolares
     const newdata ={                   
                    "title": {
                        "es-MX": `${title}`
                    },
                    "is_original": {
                        "es-MX": is_original
                    },
                    "street_date": {
                        "es-MX": `${street_date}`
                    },
                    "cost_per_play": {
                        "es-MX": cost_per_play
                    },
                    "authors": {
                        "es-MX":[`${authors}`]
                    },
                    "narrators": {
                        "es-MX": [`${narrators}`]
                    },
                    "duration": {
                        "es-MX": duration
                    },
                    "cover": {
                        "es-MX": `${cover}`
                    }                    
                };

     const resp = await fetch (url,{
         method:"POST",
         headers:{
             Authorization: `Bearer ${API_TOKEN}`,
             'X-Contentful-Content-Type':`${CONTENT_TYPE_ID}`,
         },
         //body:JSON.stringify({fields:newdata})
         body:JSON.stringify({fields:newdata})
        });

        getAudioBooks();

        return resp.json();
        //const body = await resp.json();
        /* console.log('body : ',body)
        return body; */
    }   

     // search for name an title
    export const searchAudioBooks= async(name)=>{ 
        
        const search=name;
        const url =`${BASE_URL}/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries?query=${search}&select=fields,sys.id&locale=es-MX&content_type=${CONTENT_TYPE_ID}`;
        
        const resp = await fetch (url,{
            method:"GET",
            headers:{
                Authorization: `Bearer ${API_TOKEN}`
            }
        });

        const data = await resp.json();

        return data;
    } 
    
    export const deleteAudioBook= async(id)=>{ 

        const url =`${BASE_URL}/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries/${id}`;
        
        const resp = await fetch (url,{
            method:"DELETE",
            headers:{
                Authorization: `Bearer ${API_TOKEN}`
            }
        });
        
        return resp;
    }

    export const updateAudioBook= async(id ,title ,is_original,street_date,cost_per_play, authors, narrators,duration,cover)=>{ 

        const url =`${BASE_URL}/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries/${id}`;

        const newdata ={                   
                    "title": {
                        "es-MX": `${title}`
                    },
                    "is_original": {
                        "es-MX": is_original
                    },
                    "street_date": {
                        "es-MX": `${street_date}`
                    },
                    "cost_per_play": {
                        "es-MX": cost_per_play
                    },
                    "authors": {
                        "es-MX":[`${authors}`]
                    },
                    "narrators": {
                        "es-MX": [`${narrators}`]
                    },
                    "duration": {
                        "es-MX": duration
                    },
                    "cover": {
                        "es-MX": `${cover}`
                    }                    
                };

        const resp = await fetch (url,{
        method:"PUT",
        headers:{
            Authorization: `Bearer ${API_TOKEN}`,
            'X-Contentful-Content-Type':`${CONTENT_TYPE_ID}`,
            'X-Contentful-Version': 1,
            
        },
        body:JSON.stringify({fields:newdata})
        });
        
        console.log('resp: ',resp )
        const data = await resp.json();
        console.log('data: ',data )
        
        return resp;
    }


    