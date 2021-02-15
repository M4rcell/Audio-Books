//rafcp

import React, { useEffect, useState } from 'react'

import { createAudioBooks, searchAudioBooks, updateAudioBook ,deleteAudioBook, getSingleAudioBook, getAudioBooks} from '../../services/getAudioBooks';

import Button from '@material-ui/core/Button';
import DataTable from './DataTable';
import './style.scss';

import TextField from '@material-ui/core/TextField';
import { useForm } from '../../hooks/useForm';

import Grid from '@material-ui/core/Grid';
import 'date-fns';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Modal from 'react-modal';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
Modal.setAppElement('#root')


const Admin = props => {

  //Modal
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#6e4593';
  }
 
  function closeModal(){
    setIsOpen(false);
  }

   const [error,setError] = useState(false);


    const [result, setresult] = useState({
      items:[],
      loading:true    
    });
   
  const [ formAddValues, handleInputAddChange ] = useForm( {        
    title         :'',
    is_original   :'',     
    street_date   :new Date(),     
    cost_per_play :'',       
    authors       :'', 
    narrators     :'',   
    duration      :'',  
    cover         :'',
  } );

  const {title ,is_original,street_date,cost_per_play, authors, narrators,duration,cover} = formAddValues;
       
  useEffect (()=>{

    getAudioBooks()
      .then(data =>{
          setTimeout(()=>{

            setresult({
                  items:data.items,
                  loading:false
              });

          },1000);
         
      });

  },[formAddValues]); 


  const {items,loading} = result;
    
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
        const id=   "5nyfI0mG1INtsbeVaSIbpm"  ; 
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
    

  
    const handleSubmitForm=(e)=>{

      e.preventDefault();
      console.log(title ,is_original,street_date,cost_per_play, authors, narrators,duration,cover);

     var original;

     if (isFormValid()) {
      
      if (is_original==='nuevo') {
          original=true;
          createAudioBooks(title ,original,street_date,parseInt(cost_per_play), authors, narrators,parseInt(duration),cover).then( res =>{
            console.log('respuesta de Guardado : ', res);
          });
          closeModal();
          
      }
      if (is_original==='conocido') {
          original=false;
          createAudioBooks(title ,original,street_date,parseInt(cost_per_play), authors, narrators,parseInt(duration),cover).then( res =>{
          console.log('respuesta de Guardado : ', res);
        });
        
        closeModal();
      } 
     
    }
     
    }

    const isFormValid=()=>{

      if (title.trim().length ===0 && is_original.trim().length ===0&&  cost_per_play.trim().length >0
         && authors.trim().length ===0 && narrators.trim().length ===0 && duration.trim().length >0 && cover.trim().length ===0 ) {
          setError(true);
          return false;
      }

      setError(true);
     return true;

    }

    return (
        <>
              {/*   
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
        </button> */}

      <button className="btn-add" onClick={openModal}>Agregar</button>
      
      <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Agregar</h2>

                 
          <form className="container-dialog"
                  onSubmit={handleSubmitForm}
            >
                 { 
                    error?
                    (<div className="error" >
                      Todo los campos son requeridos *
                    </div>)
                    :''
                 }

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField name="title" label="title" type="text" variant="outlined" autoComplete="off" fullWidth
                value={title}  onChange={handleInputAddChange}
                />
                <br/> <br/> 
            
                <TextField name="street_date" variant="outlined" id="date" label="street_date" type="date" defaultValue="2017-05-24" fullWidth
                value={street_date}  onChange={handleInputAddChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <br/> <br/> 
                <TextField name="cost_per_play" label="cost_per_play" type="number" variant="outlined" autoComplete="off" fullWidth
                value={cost_per_play}  onChange={handleInputAddChange}
                />
                <br/> <br/> 
                <TextField name="authors" label="authors" type="text" variant="outlined" autoComplete="off" fullWidth
                  value={authors}  onChange={handleInputAddChange}
                  />
                  <br/> <br/>
                </Grid>
                <Grid item xs={12} sm={6}>                 
                  
                  <TextField name="narrators" label="narrators" type="text" variant="outlined" autoComplete="off" fullWidth
                  value={narrators}  onChange={handleInputAddChange}
                  />
                  <br/> <br/> 
                  <TextField name="duration" label="duration" type="number" variant="outlined"  autoComplete="off" fullWidth
                  value={duration}  onChange={handleInputAddChange}
                  />
                  <br/> <br/> 
                  <TextField name="cover" label="cover" type="text" variant="outlined" autoComplete="off" fullWidth
                  value={cover}  onChange={handleInputAddChange}
                  />  
                  <br/> <br/> 
                  {/*  <p>is_original</p> */}            
                  <RadioGroup aria-label="gender" name="is_original"  value={is_original} onChange={handleInputAddChange}  >
                    <FormControlLabel style={{display:'flex'}} value="nuevo" control={<Radio />} label="Nuevo" />
                    <FormControlLabel style={{display:'flex'}} value="conocido" control={<Radio />} label="Conocido" />
                  </RadioGroup>
              </Grid>

              </Grid>
              <br/> <br/> 
              <div className="container-btn">        
                <Button onClick={closeModal} color="primary">
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                <span> Guardar</span>
                </Button> 
              </div>
                    
           </form>
        </Modal>

       <DataTable data={items} loading= {loading} /> 
        
        </>
    )
}
export default Admin

