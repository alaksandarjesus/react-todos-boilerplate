import Button from 'react-bootstrap/Button';
import MaterialIcon from '../MaterialIcon';


function TodosGridBtnCellRenderer(props:any){

        return (
            <>
              <Button  onClick={(event)=>props.clicked('edit', props.data)} variant="warning" size="sm" className=" me-2 btn-icon">
            <MaterialIcon icon="edit" type="outlined"/>
          </Button>
          <Button variant="danger" size="sm" className="btn-icon" onClick={()=>props.clicked('delete', props.data)}>
            <MaterialIcon icon="delete" type="outlined"/>
          </Button>
            </>
          )
    

}

export default TodosGridBtnCellRenderer