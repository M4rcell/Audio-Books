//rafcp

import React from 'react'
import PropTypes from 'prop-types'
import { useFechAudioBooks } from '../../hooks/useFechAudioBooks';
import { createAudioBooks, searchAudioBooks, updateAudioBook ,deleteAudioBook, getSingleAudioBook} from '../../services/getAudioBooks';

const Home = props => {

    const {data:data,loading} = useFechAudioBooks();

    console.log('respuesta data : ',data);
    
    const handleclickButton = () => {
        createAudioBooks().then( res =>{
            console.log('respuesta de Guardado : ', res);
        });
    }
    
    const seachAudioBook = ()=>{
        const name = "Elon Musk";
        searchAudioBooks(name).then( res =>{
            console.log('Search : ', res);
        });
    }

    
    const deleteAudioBooks = ()=>{
        const id="7jWYqV3H1PieAYlXE9SyS1"; 
        deleteAudioBook(id).then( res =>{
            console.log('delete : ', res);
            const data =  res.json();
            console.log('data json: ',data )
        });
    }

    
    const updateAudioBooks = ()=>{
        const code = "16mDxMs6EOLagfR3X0cxo7";
        updateAudioBook(code).then( res =>{
            console.log('update : ', res);
        });
    }
    const getSingleAudioBooks = ()=>{
        const code = "16mDxMs6EOLagfR3X0cxo7";
        getSingleAudioBook(code).then( res =>{
            console.log('get single aoudio book : ', res);
        });
    }
    
    
    /* console.log('del : ')
    deleteAudioBook(id); */
    return (
        <>
        <div>
            <h1> Estas en Home </h1>
        </div>

        <button onClick={handleclickButton}>
            Guardar
        </button>
        <button style={{margin:20}} onClick={seachAudioBook}>
            Search
        </button>
        <button style={{margin:20}} onClick={deleteAudioBooks}>
            Delete
        </button>
        <button style={{margin:20}} onClick={updateAudioBooks}>
            Update
        </button>
        <button style={{margin:20}} onClick={getSingleAudioBooks}>
            Get single audio book
        </button>

        </>
    )
}



export default Home
