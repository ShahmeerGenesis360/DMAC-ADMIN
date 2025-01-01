import { ButtonProps } from 'antd'
import React from 'react'
import { StyledBtn } from './styles'

interface IProps extends ButtonProps {
    text: string
    icon?: React.ReactNode
}

const Button = ({ text, icon, ...rest }: IProps) => {
    return (
        <StyledBtn type="default" icon={icon} size={'large'} {...rest} >
            {text}
        </StyledBtn>
    )
}

export default Button