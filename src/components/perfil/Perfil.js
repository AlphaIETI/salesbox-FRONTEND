import React,  { Component,useState} from 'react';

import './Perfil.css';
import Avatar from '@material-ui/core/Avatar';
import {AppBar,Toolbar,Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import {useEffect} from "react";
import axios from 'axios';


export default function Perfil (props){

	const useStyles = makeStyles((theme) => ({
		root: {
			width: '100%',
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			flexBasis: '33.33%',
			flexShrink: 0,
		},
		secondaryHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary,
		},
	}));
	const useStyless = makeStyles((theme) => ({
		root: {
			display: 'flex',
			'& > *': {
				margin: theme.spacing(1),
			},
		},
		small: {
			width: theme.spacing(3),
			height: theme.spacing(3),
		},
		medium: {
			width: theme.spacing(5),
			height: theme.spacing(5),
		},
		large: {
			width: theme.spacing(14),
			height: theme.spacing(14),
		},
	}));
	const classess = useStyless();
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	const [open, setOpen] = React.useState(false);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleLogout = () => {
		localStorage.clear();
	};
	const [jsonFull, setJSON] = useState({"id":"99999","name":"","lastname":"","email":"","password":"","coupons":"","phone":"","address":""});

	useEffect( () => {
		//axios.get('http://localhost:8080/clients/id/1')
		axios.get('https://salesbox-alpha-backend.herokuapp.com/clients/email/'+localStorage.getItem('emailClient'))
			.then(res => {
				//console.log("name");
				//console.log(res.data);
				setJSON(res.data)
				})
		}, []);
	//console.log(localStorage.getItem('emailClient'));
	//console.log(JSON.stringify(jsonFull));
	return (
			<Accordion >
				<Grid direction={"column"} justify={"center"} alignItems={"center"} container spacing={2}>
				<AccordionDetails className="imagenacordion">
					<div>

						<Typography align={"center"} variant="h4">
							Nombre
						</Typography>

						<Typography align={"center"} variant="h6">
							{jsonFull.name.toString()+"  "+ jsonFull.lastname.toString()}
						</Typography>

						<br/>

						<Grid direction={"column"} justify={"center"} alignItems={"center"} container spacing={2}>
							<Avatar className={classess.large}></Avatar>
						</Grid>

						<br/>

						<Typography align={"center"} variant="h4">
							Correo
						</Typography>

						<Typography align={"center"} variant="h6">
							{jsonFull.email.toString()}
						</Typography>

						<Typography align={"center"} variant="h4">
							Mis Cupones
						</Typography>

						<Typography align={"center"} variant="h6">
							{jsonFull.coupons.toString()}
						</Typography>

						<Typography align={"center"} variant="h4">
							INFORMACIÓN
						</Typography>

						<Typography align={"center"} variant="h4">
							Tel
						</Typography>

						<Typography align={"center"} variant="h6">
							{jsonFull.phone.toString()}
						</Typography>

						<Typography align={"center"} variant="h4">
							Dirección
						</Typography>

						<Typography align={"center"} variant="h6">
							{jsonFull.address.toString()}
						</Typography>

					</div>
				</AccordionDetails>
					<Button
						onClick={handleLogout}
						variant="contained"
						fullWidth
						color="primary"
						startIcon={<ExitToAppIcon />}
					>
						<Typography variant="h6">
							Logout
						</Typography>
					</Button>
				</Grid>
			</Accordion>
	);
}

