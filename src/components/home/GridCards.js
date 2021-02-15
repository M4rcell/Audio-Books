import React from 'react';
import GridItemCard from './GridItemCard';

export default function GridCards({data}) {

  
  return (
    <>
    {
        data.loading?
        (<p>Loading</p>)
        :
        data.data.map(item =>(
          <GridItemCard 
            key={item.sys.id}
            {...item.fields} //mandas cada propiedad  de forma independiente
            />
        ))
    }         
       
    </>
  
  );
}
