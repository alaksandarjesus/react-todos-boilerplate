import environment from '../environment';
import moment from 'moment';

function MomentFormatter(dateString:any, inputFormat=environment.serverDateFormat, outputFormat=environment.dateFormat){

    const dateMomented = moment(dateString, inputFormat);
    if(!dateMomented.isValid){
        return 'Invalid Date'
    }
    return dateMomented.format(outputFormat);
}

export default MomentFormatter;