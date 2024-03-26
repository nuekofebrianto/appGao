import { FormControl, FormControlLabel, FormControlHelper, FormControlHelperText, FormControlLabelText, Input, InputField, FormControlError, FormControlErrorIcon, FormControlErrorText, AlertCircleIcon, KeyboardAvoidingView } from '@gluestack-ui/themed';

export default CusFormControl = ({ isDisabled, isInvalid, isReadOnly, isRequired, label, placeholder, type, defaultValue, helperText, errorText, mb, w, onChangeText, value}) => {
    return            <FormControl size = "sm" isDisabled = {isDisabled} isInvalid = {isInvalid} isReadOnly = {isReadOnly} isRequired = {isRequired} marginBottom = {mb} w = {w}>
    <FormControlLabel mb                = "$1">
            <FormControlLabelText>{label}</FormControlLabelText>
        </FormControlLabel>
        <Input>
            <InputField
                type         = {type}
                defaultValue = {defaultValue}
                placeholder  = {placeholder}
                onChangeText = {onChangeText}
                value        = {value}
            />
        </Input>
        <FormControlHelper>
            <FormControlHelperText>
                {helperText}
            </FormControlHelperText>
        </FormControlHelper>
        <FormControlError>
            <FormControlErrorIcon as = {AlertCircleIcon} />
            <FormControlErrorText>
                {errorText}
            </FormControlErrorText>
        </FormControlError>
    </FormControl>
}