// This file is an replica from https://www.ag-grid.com/react-data-grid/getting-started/

import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import environment from '../environment';
import MomentFormatter from '../helpers/MomentFormatter';
import TodosGridBtnCellRenderer from './CellRenderers/TodosGridBtnCellRenderer';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './Modals/ConfirmModal';

import { useDispatch } from 'react-redux';
import { update } from '../reducers/TodosReducer';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const TodosGrid = () => {

 const gridRef:any = useRef(); // Optional - for accessing Grid's API
 const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
 const [verify, setVerify]= useState(false);
 const [modalConfirmArgs, setModalConfirmArgs] = useState<any>({})
  const navigate = useNavigate();
  const dispatch = useDispatch();

 // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState([
   {field: 'id', headerName:'#', filter: true, maxWidth:60},
   {field: 'title', headerName:'Title', filter: true},
   {field: 'completed', headerName:'Status', filter: true,cellRenderer:(params:any)=>{
        return params.value?'Done':'Incomplete'
   }},
   {field: 'target', headerName: 'Target Date' ,cellRenderer:(params:any)=>{
    return MomentFormatter(params?.value)
}},
   {field: 'createdAt', headerName: 'Created At',cellRenderer:(params:any)=>{
    return MomentFormatter(params?.value)
}},
   {field: 'updatedAt', headerName: 'Updated At', flex:1,cellRenderer:(params:any)=>{
    return MomentFormatter(params?.value)
}},
{
  field: '',
  cellRenderer:TodosGridBtnCellRenderer,
  cellRendererParams: {
    clicked: (type:String, data:any)=>{
      switch(type){
        case 'edit':
          navigate('/todo/'+data.id)
        break;
        case 'delete':
          const args = {
            id:data.id,
            title: "Confirmation Required",
            text: `Are you sure you want to remove this title ${data.title}`
          }
          setModalConfirmArgs({...modalConfirmArgs, ...args});
          setVerify(true)
        break;
      }
    }
  }
}
 ]);

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({
     sortable: true
   }), []);

 // Example of consuming Grid Event
//  const cellClickedListener = useCallback( (event:any) => {
//    console.log('cellClicked', event);
//  }, []);

 // Example load data from sever
 useEffect(() => {
 getTodos();
 }, []);

 function getTodos(){
  const url = `${environment.api}/todos`
  fetch(url)
  .then(result => result.json())
  .then(rowData => {
    setRowData(rowData);
    dispatch(update({ count: rowData.length }))

  })
 }
 // Example using Grid's API
 const buttonListener = useCallback( (e:any) => {
   gridRef?.current?.api?.deselectAll();
 }, []);

 function onVerifyClose(){
  const url = `${environment.api}/todos/${modalConfirmArgs.id}`
  fetch(url, {method:'DELETE'})
    .then(response => response.json())
    .then(res => {
      setVerify(false);
      getTodos();

    })
    .catch(res =>{

    })
  
}

function onVerifyDismiss(){
  setModalConfirmArgs({});
  setVerify(false)

}

 return (
   <div>

     {/* Example using Grid's API */}
     {/* <button onClick={buttonListener}>Push Me</button> */}

     {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
     <div className="ag-theme-alpine" style={{width: '100%', height: 500}}>

       <AgGridReact
           ref={gridRef} // Ref for accessing Grid's API

           rowData={rowData} // Row Data for Rows

           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties

           animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           rowSelection='multiple' // Options - allows click selection of rows

         
           />
           {/*   onCellClicked={cellClickedListener} // Optional - registering for Grid Event */}
     </div>
     {verify? <ConfirmModal args={modalConfirmArgs} close={onVerifyClose} dismiss={onVerifyDismiss}/>:''}
   </div>
 );
};

export default TodosGrid;