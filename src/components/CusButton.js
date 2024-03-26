import { Button, ButtonText, ButtonIcon } from "@gluestack-ui/themed"

const CusButton = ({ size, variant, action, isDisabled, isFocusVisible, label, setIcon, backgroundColor, mt, mb, onPress }) => {
    return <Button
        size            = {size}
        variant         = {variant}
        action          = {action}
        isDisabled      = {isDisabled}
        isFocusVisible  = {isFocusVisible}
        backgroundColor = {backgroundColor}
        borderRadius    = {10}
        marginTop       = {mt}
        marginBottom    = {mb}
        onPress={onPress}

    >
        <ButtonIcon as = {setIcon} marginRight = {4} />
        <ButtonText>{label}</ButtonText>
    </Button>
}

export default CusButton