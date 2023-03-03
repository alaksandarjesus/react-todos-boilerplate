
import MomentFormatter from '../helpers/MomentFormatter';
import environment from '../environment';
function DateFormat(props:any){


    function renderDate(){
        if(!props.date){
            return 'Date string cannot be empty'
        }
        return MomentFormatter(props.date)
       
    }


    return(
        <>
            <span>{renderDate()}</span>
        </>
    )

}

export default DateFormat;