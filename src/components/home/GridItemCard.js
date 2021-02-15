import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import './style.scss'


export default function GridItemCard({title,is_original,street_date,cost_per_play,authors,narrators,duration,cover}) {

 
  return (
      <>
       <div className="container-card">
           
            <div className="card">
                <div className="card_list">
                     <img className="card_item" src={cover['es-MX']} />
                </div>
                <div className="card_info">
                    <h3>{title['es-MX']}</h3>                                
                </div>
                <div className="item-card-info">
                  <p>Autor     {authors['es-MX']}</p>
                  
                  <p>Narracion de  {narrators['es-MX']} </p>
                  <p>  {street_date['es-MX']} </p>
                </div>
                <div className="card-actions">
                        <CardActions disableSpacing>
                            <IconButton  aria-label="add to favorites">
                            <FavoriteIcon className="btn-card" />
                            </IconButton> 
                            <IconButton aria-label="share">
                            <ShareIcon className="btn-card"/>
                            </IconButton> 
                            <p className="duration">{duration['es-MX']} min</p>                  
                        </CardActions>
                </div>
            </div>
        </div>
      </>
  );
}