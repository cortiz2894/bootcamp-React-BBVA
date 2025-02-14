
import { useState } from 'react' //Hooks
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios'
import setLogin from '../../services/Login.service';
import SnackBarMessage from '../SnackBarMessage/SnackBarMessage'

const Login = () => {
    //State
    //Props
    //Ciclos de vida
    const [formData, setFormData] = useState({ email : '', password: '' })
    const [token, setToken] = useState()
    const [showMessage, setShowMessage] = useState({
        status: false,
        message: '',
        type: ''
    });

    const { status, message, type } = showMessage 

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLogin(formData)
        .then((res) => {
            console.log("Usuario logueado correctamente")
            setToken(res.data.token)
            setShowMessage({
                status: true,
                message: 'El usuario se logueo correctamente!',
                type: 'success'
            })
            localStorage.setItem("token", res.data.token)
            navigate('/')
        })
        .catch((err) => {
            console.log("Hubo un error en la llamada: ", err)
            setShowMessage({
                status: true,
                message: 'Ocurrio un error al loguearse.',
                type: 'error'
            })
        })
        .finally( () => {
           console.log("termino la llamada.") 
        })
    }
    const handleClose = () => {
        setShowMessage({
            ...showMessage,
            status: false
        })
    }
    
    const handleChange = (e) => {
        console.log(e.target.name)
        setFormData({ 
            ...formData,
            [e.target.name] : e.target.value 
        })
    }

    return(
        //JSX
        <div>
            <h2>Ingresar: </h2>
            <ValidatorForm onSubmit={handleSubmit} >
                <TextValidator id="outlined-basic" 
                    label="Correo Electronico" 
                    variant="outlined" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    validators={['required', 'isEmail']}
                    errorMessages={['Este campo es obligatorio', 'No es un mail valido']}
                />
                <TextValidator id="outlined-basic" 
                    label="Contraseña" 
                    variant="outlined" 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={['Este campo es obligatorio']}
                />
                <button type="submit">Ingresar</button>
            </ValidatorForm>
            <SnackBarMessage estado={status} handleClose={handleClose} type={type} message={message}/>
        </div>
    )
}

export default Login