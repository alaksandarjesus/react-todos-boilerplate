

function MaterialIcon(props:any){

    function getClassName(){
        if(props.family){
            return `material-icons-${props.type}`;
        }
        return `material-icons`;
    }

    return (
        <span className={getClassName()}>{props.icon}</span>
    )
}

export default MaterialIcon;