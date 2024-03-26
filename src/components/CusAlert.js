import { Alert, AlertIcon, AlertText } from "react-native"

const CusAlert = ({action,variant,text,setIcon}) => {

    return <Alert     mx = '$2.5' action = {action} variant = {variant} >
    <AlertIcon as = {setIcon} mr = "$3" />
        <AlertText>
            {text}
        </AlertText>
    </Alert>

}

export default CusAlert