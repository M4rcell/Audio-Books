//rafcp
import React, { useEffect, useState } from 'react'
import GridCards from './GridCards';
import { searchAudioBooks } from '../../services/getAudioBooks';
import SearchSVG from '../../icons/components/search';
import './style.scss'

const Home = ({}) => {

    const [inputvalue, setinputValue] = useState('');

    const [result, setresult] = useState({
        data:[],
        loading:true    
    });
    
    useEffect (()=>{

        searchAudioBooks(inputvalue)
        .then(data =>{
            setTimeout(()=>{
                
                setresult({
                    data:data.items,
                    loading:false
                });

            },1000);
           
        });

    },[inputvalue]);
    

    const handleInputChange=(e)=>{
        setinputValue(e.target.value);
    }
   

    const handleSubmit=(e)=>{

        e.preventDefault();  

        if (inputvalue.trim().length > 2) {
            
            searchAudioBooks(inputvalue).then( res =>{
                if (res.items.length>=1) {
                    console.log('hay datos') 
                }
                else{
                    console.log('no hay datos')
                }
            });
            
        }

    }
    return (
        <>
        <div className="serarch-container">
            <form
                onSubmit={handleSubmit}
                className="search"
                >
                <input className="search-input"
                    placeholder="Busca tu podcast favorito"
                    type="text"
                    name="search"
                    onChange={handleInputChange}
                    value={inputvalue}
                />
                <span className="search-icon">
                    <SearchSVG  size={35} color="#6f737c"/>
                </span>
            </form>
        </div>
         
         <GridCards data={result}/>
        </>
    )
}

Home.propTypes = {

}

export default Home
