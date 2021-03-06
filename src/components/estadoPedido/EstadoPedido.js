import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import "./estadoPedido.css";
import AppBarComponent from '../dashboard/appBar';
import Container from '@material-ui/core/Container';
import axios from "axios";
import Divider from "@material-ui/core/Divider";
import OrderList from "./OrderList";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexGrow: 1,
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        //color: theme.palette.text.secondary,
    },
    ImagePedido: {
        width: '10 %',
        height: '41 %',
        padding: '1em',
    }
}));

function getSteps() {
    return ['Producto Pagado', 'Producto Despachado', 'Producto entregado','Fin'];
}

/* function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Su pago fue realizado exitosamente ';
        case 1:
            return 'El producto fue despachado y llegara pronto';
        case 2:
            return 'El producto se entrego exitosamente';
        default:
            return 'Gracias';
    }
} */

export default function HorizontalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const steps = getSteps();

    const isStepOptional = (step) => {
        return step === 1;
    };



    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const [order,setOrder]=useState(
        {"id":"",
            "idProducts":[],
            "idEntity":"",
            "idClient":"",
            "quantity":""
        }
    );

    const getOrder = (idOrden) => {
        axios.get('https://salesbox-alpha-backend.herokuapp.com/orders/id/'+idOrden)
            .then(res => {
                setOrder(res.data);
                return (order.idProducts);
            })
    };

    const [clientOrder, setClientOrder] = useState(
        {"id":"",
            "name":"",
            "lastname":"",
            "email":"",
            "password":"",
            "coupons":"",
            "phone":"",
            "address":"",
            "age":"",
            "sizeUp":"",
            "sizeDown":"",
            "shoeSize":"",
            "cart":"",
            "favorites":"",
            "orders":[]
        });

    const getClient = () => {

        axios.get('https://salesbox-alpha-backend.herokuapp.com/clients/email/'+localStorage.getItem('emailClient'))
            .then(res => {
                setClientOrder(res.data);
            })
    };
    const [entityOrder, setEntityOrder] = useState(
        {"id":"",
            "name":"",
            "nit":"",
            "email":"",
            "password":"",
            "city":"",
            "address":"",
            "image":"",
            "publicity":"",
            "orders":[]
        });
    const getEntity = () => {

        axios.get('https://salesbox-alpha-backend.herokuapp.com/api/entity/name/'+localStorage.getItem('nameEntity'))
            .then(res => {
                setEntityOrder(res.data);
            })
    };
    const orders = Object.values(clientOrder.orders);
    return (
        <div>
        <AppBarComponent/>
        <br/>
            <br/>
            <Grid direction={"column"} justify={"center"} alignItems={"center"} container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        { localStorage.getItem('isLoggedIn') && !localStorage.getItem('isAdmin') && true ?
                        <Container maxWidth="md">
                            {getClient()}
                            {clientOrder.orders.map(item =>{
                                return(<OrderList currentItem={item} key={item}/>)
                            })
                            }
                            <Divider />
                        </Container>
                            :
                            null
                        }
                        {localStorage.getItem('isAdmin') ?
                            <Container maxWidth="md">
                                {getEntity()}
                                {entityOrder.orders.map(item =>{
                                    return(<OrderList currentItem={item} key={item}/>)
                                })
                                }
                                <Divider />
                            </Container>
                            :
                            null
                        }
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}