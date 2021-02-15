import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import Modal from 'react-modal';

import Grid from '@material-ui/core/Grid';
import 'date-fns';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import { deleteAudioBook,updateAudioBook, getAudioBooks } from '../../services/getAudioBooks';

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useForm } from '../../hooks/useForm';
function createData(name, calories, fat) {
  return { name, calories, fat };
}

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
export default function DataTable({data,loading}) {

  //modal
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const [modalIsOpenDelete,setIsOpenDelete] = React.useState(false);

  function openModal(item) {
    setIsOpen(true);

    handInputEditChange({
    id            : item.sys.id,
    title         : item.fields.title['es-MX'] ,
    is_original   :'' ,     // item.fields.is_original['es-MX']
    street_date   : item.fields.street_date['es-MX'] ,     
    cost_per_play : item.fields.cost_per_play['es-MX'] ,       
    authors       : item.fields.authors['es-MX'] , 
    narrators     : item.fields.narrators['es-MX'] ,   
    duration      : item.fields.duration['es-MX'] ,  
    cover         : item.fields.cover['es-MX'] ,
    });
   
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#6e4593';
  }
  function afterOpenModalDelete() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#6e4593';
  }
 
  function closeModal(){
    setIsOpen(false);
  }
  function closeModalDelete(){
    setIsOpenDelete(false);
  }
  

  const [error,setError] = useState(false);

    const [result, setresult] = useState({
      items:[],
      loading:true    
    });
   
  const [ formEditValues, handInputEditChange ] = useState({ 
    id            :'',
    title         :'',
    is_original   :'',     
    street_date   :'',     
    cost_per_play :'',       
    authors       :'', 
    narrators     :'',   
    duration      :'',  
    cover         :'',
  } );

  console.log('formEditValues : ',formEditValues)
  const {id ,title ,is_original,street_date,cost_per_play, authors, narrators,duration,cover} = formEditValues;
   
  
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

  },[]); 

  const handleSubmitForm=(e)=>{

    e.preventDefault();
    console.log(id,title ,is_original,street_date,cost_per_play, authors, narrators,duration,cover);
     
   var original;
   if (isFormValid()) {
    
    if (is_original==='nuevo') {
        original=true;
        updateAudioBook(id ,title ,original,street_date,parseInt(cost_per_play), authors, narrators,parseInt(duration),cover).then( res =>{
          console.log('respuesta de Guardado : ', res);
        });
        closeModal();
        resetForm();
    }
    if (is_original==='conocido') {
        original=false;
        updateAudioBook(id ,title ,original,street_date,parseInt(cost_per_play), authors, narrators,parseInt(duration),cover).then( res =>{
        console.log('respuesta de Guardado : ', res);

        resetForm();
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
  
  const resetForm=() => {
    handInputEditChange({ 
      id            :'',
      title         :'',
      is_original   :'',     
      street_date   :'',     
      cost_per_play :'',       
      authors       :'', 
      narrators     :'',   
      duration      :'',  
      cover         :'',
    })
  }


  //Table
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  /* menu */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  function openModalDelete(id) {
    setIsOpenDelete(true);

    deleteAudioBook(id).then( res =>{
      console.log('delete : ', res);
      const data =  res.json();
      console.log('data json: ',data )
    });
  }

  const deleteAudioBooks = (id)=>{
    deleteAudioBook(id).then( res =>{
        console.log('delete : ', res);
        const data =  res.json();
        console.log('data json: ',data )
      });
  }
  const editAudioBooks=(item)=>{
    console.log('item : ',item )
  }

  const handleOnChange = (userKey, value) => handInputEditChange({ ...formEditValues, [userKey]: value })

  return (
        <>
        
         <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Titulo</TableCell>
                    <TableCell align="right">Original</TableCell>
                    <TableCell align="right">Fecha </TableCell>
                    <TableCell align="right">Costo</TableCell>
                    <TableCell align="right">Autores</TableCell>
                    <TableCell align="right">Narradores</TableCell>
                    <TableCell align="right">Duraccion</TableCell>
                    <TableCell align="right">Imagen</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                </TableRow>
                </TableHead>
                
                    <TableBody>               
                    { 
                   loading?
                   (<p>Loading</p>)
                   :
                    (rowsPerPage > 0
                        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : data
                    ).map(item => (
                      
                        <TableRow key={item.sys.id}>
                        <TableCell component="th" scope="row">
                           {item.fields.title["es-MX"]}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          {item.fields.is_original["es-MX"]? 'Origanal':'Conocido' }
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                          {item.fields.street_date["es-MX"]}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                         $ {item.fields.cost_per_play["es-MX"]}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                           {item.fields.authors["es-MX"]}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                           {item.fields.narrators["es-MX"]} 
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                           {item.fields.duration["es-MX"]} min
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                           
                           <img className="img-table" src={item.fields.cover["es-MX"]} />

                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">

                          <IconButton  aria-label="delete" onClick={()=>openModal(item)}>
                            <EditOutlinedIcon/>
                          </IconButton>
                          <IconButton aria-label="delete" onClick={()=>openModalDelete(item.sys.id)}>
                            <DeleteForeverOutlinedIcon/>
                          </IconButton>

                        </TableCell>
                        </TableRow>

                    ))  
                    }
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                
                <TableFooter>
                <TableRow>
                    <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={9}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>


        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Editar</h2>

                 
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
                <TextField name="title" label="titulo" type="text" variant="outlined" autoComplete="off" fullWidth
                value={title}  onChange={(e) => handleOnChange('title', e.target.value)}
                />
                <br/> <br/> 
            
                <TextField name="street_date" variant="outlined" id="date" label="Fecha" type="date" defaultValue="2017-05-24" fullWidth
                value={street_date}  onChange={(e) => handleOnChange('street_date', e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <br/> <br/> 
                <TextField name="cost_per_play" label="costo" type="number" variant="outlined" autoComplete="off" fullWidth
                value={cost_per_play}  onChange={(e) => handleOnChange('cost_per_play', e.target.value)}
                />
                <br/> <br/> 
                <TextField name="authors" label="autores" type="text" variant="outlined" autoComplete="off" fullWidth
                  value={authors}  onChange={(e) => handleOnChange('authors', e.target.value)}
                  />
                  <br/> <br/>
                </Grid>
                <Grid item xs={12} sm={6}>                 
                  
                  <TextField name="narrators" label="narradores" type="text" variant="outlined" autoComplete="off" fullWidth
                  value={ narrators}  onChange={(e) => handleOnChange('narrators', e.target.value)}
                  />
                  <br/> <br/> 
                  <TextField name="duration" label="duracion" type="number" variant="outlined"  autoComplete="off" fullWidth
                  value={duration }  onChange={(e) => handleOnChange('duration', e.target.value)}
                  />
                  <br/> <br/> 
                  <TextField name="cover" label="imagen" type="text" variant="outlined" autoComplete="off" fullWidth
                  value={cover}  onChange={(e) => handleOnChange('cover', e.target.value)}
                  />  
                  <br/> <br/> 
                  {/* <input name="id" value={id}/> */}
                              
                  <RadioGroup aria-label="gender" name="is_original"  value={is_original} onChange={(e) => handleOnChange('is_original', e.target.value)}  >
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

       {/*  Modal Delete */}

       <Modal
          isOpen={modalIsOpenDelete}
          onAfterOpen={afterOpenModalDelete}
          onRequestClose={closeModalDelete}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Eliminar</h2>

                 
            <form>
               <h3>Se elimino correctamente</h3>
             
              <br/> <br/> 
              <div className="container-btn">     
                 <Button color="primary" type="submit">
                <span> Salir</span>
                </Button> 
              </div>
                    
           </form>
        </Modal>
      </>  
  );
}



const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});
