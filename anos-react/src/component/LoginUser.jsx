import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import UserApiService from '../utils/APIUsers.js';

import $ from "jquery";

class LoginUser extends Component {

  constructor(props){
    super(props);
    this.state ={ 
        email: '',
        password: '',
        admin: false,
    }
    
    let stringa = "fuh43fe13frwc34vfd";

    //$("#cella-tastino").append("<button id='tastino'>Clickami!</button>")
    //$(document).on('click', '#tastino', this.codiceFiscale(stringa));
    //$("#tastino").attr("onclick", "{this.codiceFiscale('fuh43fe13frwc34vfd')}")

        this.loadHomeClicked = this.homeClicked.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.codiceFiscale = this.codiceFiscale.bind(this)
    }

    

    homeClicked() {
        alert("stai tornando alla home ")
         this.props.history.push(`/`)
    }
    

    componentDidMount() {//è l'equivalente del document ready di ajax, ovvero avvia le operazioni inserite all'interno solo quando la pagina viene caricata

    //$("#tastino").attr("onclick", "this.codiceFiscale('fuh43fe13frwc34vfd')")
        
        //$("#cella-tastino").append("<button id='tastino' onClick='{this.codiceFiscale(" + stringa + ")}'>Clickami!</button>")
        //$("#tastino").attr("onclick", "{() => {this.codiceFiscale('fuh43fe13frwc34vfd')}}")
        //$(document).on('click', '#tastino', "{() => {this.codiceFiscale(stringa)}}");
        
    }

    codiceFiscale(s){

      alert(s)
    }

  //validate(values) {

    //let errors = {}
    //if (!values.email) {
      //errors.description = 'Enter an email'
    //}
    //if (!values.password) {
      //errors.description = 'Enter a password'
    //}
    //if (values.password.length < 5) {
      //errors.description = 'Enter at least 5 Characters in Password'
    //}

    //return errors
    //}

    onSubmit(values) {

        let user = null;// con let imposto la vaqirabile di nome user a null 
    
        if(values != null){
    
           user = {
            email: values.email,
            password: values.password,
            admin: false,
          }
        }
        else{
    
          alert("HAI SBAGLIATO CORNUTO, SCRIVI QUALCOSA NEI CAMPI TESTO ");
        } 
    
        UserApiService.loginUser(user)


        .then(res => {

            alert("STAMPO IL RES " + JSON.stringify(res.data));

            if(res.data == "") {

              alert("STAMPO IL RES " + JSON.stringify(res.data));  
              this.setState({message : 'Credenziali Errate!!'});
              return
            } 

            else{
              
              alert("STAMPO IL RES " + JSON.stringify(res.data));

              localStorage.setItem("alfonso", JSON.stringify(res.data))// quando si setta un oggetto in localstorage,
               //nel settaggio bisogna OBLIGATORIAMENTE stringate il valore che si vuole far passare,
                //altrimenti leggeremo OBJECT OBJECT anche se cercheremo di stringarlo quando cercheremo di gettarlo 
                //da una qualsiasi parte.  

              alert("STAMPO IL MIO TOKEN " + JSON.stringify(localStorage.getItem("alfonso")));
              
                this.props.history.push({
                  pathname: '/',
            })
          }

        });

        console.log(values);
      }

    render() {
        let { email, password } = this.state
        return (
            <div>

              <table id ="tabella-home" className="table">
                <thead>
                  <tr>
                    <th>Tasto MaGGico</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td id="cella-tastino"><button id="tastino" className="btn btn-success">PROVAAA</button></td>
                  </tr>
                </tbody>
              </table>

            <h3>login user</h3>
            <div className="container">
                <Formik
                    initialValues={{email, password}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                    
                >
                    {
                        (props) => (
                            <Form>
                                <fieldset className="form-group">
                                    <label>Email</label>
                                    <Field className="form-control" type="text" name="email" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Password</label>
                                    <Field className="form-control" type="text" name="password" />
                                </fieldset>
                                <button className="btn btn-success" type="submit">LOGGATI</button>
                            </Form>
                        )
                    }
                </Formik>

            </div>
            <button className="btn btn-success" onClick={this.loadHomeClicked} type="submit">return home</button>
        </div>
        )
    }
}

export default LoginUser