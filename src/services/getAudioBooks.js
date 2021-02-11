
/* 
Y estas serían tus credenciales para poder realizar tu prueba

API_TOKEN:          CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc 
SPACE_ID:           1t4hjzo7y0kb
ENVIRONMENT:        master
CONTENT_TYPE_ID:    audiocontent-v5 

{BASE_URL}/spaces/{SPACE_ID}/environments/{ENVIRONMENT}/entries?select=fields,sys.id,sys.version&locale=es-MX

*/
    const API_TOKEN  =        'CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc';
    const SPACE_ID   =        '1t4hjzo7y0kb';
    const ENVIRONMENT=        'master';
    const CONTENT_TYPE_ID=    'audiocontent-v5'; 
    const BASE_URL   =        'https://api.contentful.com';

export const getAudioBooks= async()=>{    

    const url =`${BASE_URL}/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries?select=fields,sys.id,sys.version&locale=es-MX&content_type=${CONTENT_TYPE_ID}`;
    //encodeURI renplaza los espacios  en dolares
            
     const resp = await fetch (url,{
         method:"GET",
         headers:{
             Authorization: `Bearer ${API_TOKEN}`
         }
        });
    console.log('resp : ',resp);

     const data = await resp.json();

     console.log('Data API : ' ,data);
     
    /*  const gifs = data.map(img =>{//para traer lo que quieras de un API
         return{
             id: img.id,
             title:img.title,
             url:img.images?.downsized_medium.url
         }
     })

     console.log(gifs);

    return  gifs; */
    //setimage(gifs);// lo asignas al arreglo de hook image

    return data;
    }

export const getSingleAudioBook= async(id)=>{    
  
    const url =`${BASE_URL}/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries?sys.id=${id}&select=fields,sys.id,sys.version&locale=es-MX`;
    //encodeURI renplaza los espacios  en dolares
            
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

    export const createAudioBooks= async()=>{ 

        const url =`${BASE_URL}/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries`;
    //encodeURI renplaza los espacios  en dolares
     const newdata ={                   
                    "title": {
                        "es-MX": "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future"
                    },
                    "is_original": {
                        "es-MX": false
                    },
                    "street_date": {
                        "es-MX": "2020-12-25T00:00-06:00"
                    },
                    "cost_per_play": {
                        "es-MX": 90
                    },
                    "authors": {
                        "es-MX": [
                        "Ashlee Vance"
                        ]
                    },
                    "narrators": {
                        "es-MX": [
                        "Fred Sanders"
                        ]
                    },
                    "duration": {
                        "es-MX": 589632
                    },
                    "cover": {
                        "es-MX": "https://images.findawayworld.com/v1/image/cover/CD059097"
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
       /*  console.log('resp: ',resp )
        const data = await resp.json();
        console.log('data: ',data ) */
        
        return resp;
    }

    export const updateAudioBook= async(id)=>{ 

        const url =`${BASE_URL}/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries/${id}`;

        const newdata = {
            "title": {
                "es-MX": "Elon Musk"
            },
            "is_original": {
                "es-MX": false
            },
            "street_date": {
                "es-MX": "2020-12-25T00:00-06:00"
            },
            "cost_per_play": {
                "es-MX": 90
            },
            "authors": {
                "es-MX": [
                    "Ashlee Vance"
                ]
            },
            "narrators": {
                "es-MX": [
                    "Fred Sanders"
                ]
            },
            "duration": {
                "es-MX": 589632
            },
            "cover": {
                "es-MX": "https://images.findawayworld.com/v1/image/cover/CD059097"
            }            
        };

        const resp = await fetch (url,{
        method:"PUT",
        headers:{
            Authorization: `Bearer ${API_TOKEN}`,
            'X-Contentful-Content-Type':`${CONTENT_TYPE_ID}`,
            'X-Contentful-Version': 1,
            
        },
        //body:JSON.stringify({fields:newdata})
        body:JSON.stringify({fields:newdata})
        });
        
        console.log('resp: ',resp )
        const data = await resp.json();
        console.log('data: ',data )
        
        return resp;
    }

/* 
export const getAudioBooksss= async()=>{

    const url =`https://api.giphy.com/v1/gifs/search?q=${encodeURI(category)}&limit=10&api_key=FwxBmIpYZo2fp4kc7WGTBDh2KlaYYgWi`;//encodeURI renplaza los espacios  en dolares
            
     const resp = await fetch (url);
     const {data} = await resp.json();
     
     const gifs = data.map(img =>{//para traer lo que quieras de un API
         return{
             id: img.id,
             title:img.title,
             url:img.images?.downsized_medium.url
         }
     })

     console.log(gifs);

    return  gifs;
    //setimage(gifs);// lo asignas al arreglo de hook image
    } */


    