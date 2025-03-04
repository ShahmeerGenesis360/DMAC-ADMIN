import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components'
import { loginAdmin } from '../../services/admin';
import { login } from '../../services/auth';
import { LoginContainer, LoginWrapper, StyledInput, StyledPassword } from './styles'

const Login = () => {
    const [auth, setAuth] = useState<IAdmin>({ email: "", password: "" });
    const navigate = useNavigate();
    const loginHandler = () => {
        if (auth?.email === "" || auth?.password === "") return;
        if (auth) {
            loginAdmin(auth).then((res) => {
                login(res.token)
                navigate('/')
            })
        }
    }
    return (
        <LoginContainer>
            <LoginWrapper>
                <StyledInput type="email" placeholder="Enter Email" value={auth?.email} onChange={(e: ChangeEvent<HTMLInputElement>) => setAuth((prev) => ({ ...prev, email: e.target.value }))} />
                <StyledPassword placeholder="Enter Password" value={auth?.password} onChange={(e: ChangeEvent<HTMLInputElement>) => setAuth((prev) => ({ ...prev, password: e.target.value }))} />
                <Button text="Login" htmlType="submit" onClick={loginHandler} />
            </LoginWrapper>
        </LoginContainer>
    )
}

export default Login