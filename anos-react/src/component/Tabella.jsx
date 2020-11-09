import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserApiService from '../utils/APIUsers.js';

class Tabella extends Component {

  constructor(props){
    super(props);
    this.state ={
        id: this.props.match.params.id,
        nome: '',
        cognome: '',
        email: '',
        password: '',
        conto: '',
        img: '',
        admin: this.props.location.admin,
        message: null,
    }
    
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)

  }

  componentDidMount() {

    console.log(this.state.id)

    // eslint-disable-next-line
    if (this.state.id == -1) {
        return 
    }

    UserApiService.fetchUserById(this.state.id)
  
        .then(response => this.setState({
            nome: response.data.nome,
            cognome: response.data.cognome,
            email: response.data.email,
            password: response.data.password,
            conto: response.data.conto,
            img: response.data.img 
        })
        )
              
      //  alert("STAMPO LO USER secondo if " + JSON.stringify(this.state));
  }

  validate(values) {

    let errors = {}
    if (!values.nome) {
      errors.description = 'Enter a name'
    } 
    if (!values.cognome) {
      errors.description = 'Enter a surname'
    }
    if (!values.email) {
      errors.description = 'Enter an email'
    }
    if (!values.password) {
      errors.description = 'Enter a password'
    }
    if (values.password.length < 5) {
        alert("...A FROCIO, password troppo corta")
      errors.description = 'Enter at least 5 Characters in Password'
      
    }

    return errors

  }

  onSubmit(values) {

    let user = null;// con let imposto la vaqirabile di nome user a null 

    if(this.state.id == -1){

       user = {
        nome: values.nome,
        cognome: values.cognome,
        email: values.email,
        password: values.password,
        conto: values.conto,
        img: values.img,
      }

      //alert("STAMPO LO USER primo if " + JSON.stringify(user));
    }
    else{

      user = {
        id: this.state.id,
        nome: values.nome,
        cognome: values.cognome,
        email: values.email,
        password: values.password,
        conto: values.conto,
        img: values.img,
      }

      //alert("STAMPO LO USER secondo if " + JSON.stringify(user));
    } 

    if (this.state.id == -1) {
        UserApiService.addUser(user)
            .then(() => this.props.history.push('/'))
    } else {
        UserApiService.editUser(this.state.id, user)
            .then(() => this.props.history.push('/'))
    }

    console.log(values);
  }

  onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        
    alert("stampo lo user " + this.state.admin)

      //alert("STAMPO UN id " + this.state.id);

      if(this.state.admin == true){

        //alert("sono nel if new user");

        return (
          
            <div>
                <h3>New User</h3>
                <div className="container">
                

              </div>
          </div>
      )
      }

    }
}

export default Tabella