import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserApiService from '../utils/APIUsers.js';
import $ from "jquery";

//import Img from '../../public/eiyuden_1_jpeg_1400x0_q85.jpg';

class HomePage extends Component {

  constructor(props){
    super(props);
    const token = localStorage.getItem("alfonso")

    this.state ={
        nome: '',
        cognome: '',
        email: '',
        password: '',
        message: null,
        admin: "",
        users: []
    }
        
   
    this.addUserClicked = this.addUserClicked.bind(this)
    this.loginClicked = this.loginClicked.bind(this)
    this.deleteClicked = this.delete.bind(this)
    this.hideTable = this.hideTable.bind(this)
    this.showTable = this.showTable.bind(this)
    this.editClicked = this.selectClicked.bind(this)
  }

  

  componentDidMount() {

    
    $("#giorgio").hide();
    $("#tabella-home").hide();

    
    UserApiService.fetchUsers()//HARDCODED
        .then(
            response => {
                //console.log(response);
                this.setState({ users: response.data })
            }
        )

  }
    
  hideTable(){

    $("#tabella-home").hide();
    $("#giorgio").hide();
    $("#giorgio2").show();
  }

  showTable(){
    
    $("#tabella-home").show();
    $("#giorgio").show();
    $("#giorgio2").hide();

  }

    selectClicked(id) {

        this.props.history.push(`/add-user/`+ id)
        
    }


    addUserClicked() {

        this.props.history.push(`/add-user/-1`)
    }
    loginClicked() {
      this.props.history.push(`/login`)
    }
    delete(id) {
      
        UserApiService.cancelloUser(id)
        $ ("#tabella-home").load( "slow", "fetchUsers()" );
       
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

       
    render() {
        
        return (

            
            <div id = "HomePage" className="container">
                <div id = "barra-pagina-web"></div>
                <h2>pagina HOME</h2>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addUserClicked}>Add</button>
                    <button className="btn btn-success" onClick={this.loginClicked}>login</button>
                    <button className="btn btn-success" id="giorgio" onClick={this.hideTable}>HideT</button>
                    <button className="btn btn-success" id="giorgio2" onClick={this.showTable}>showT</button>
                </div>
                <div className="container">
                   
                    <table id ="tabella-home" className="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Cognome</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Img</th>
                                <th>Cancella</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map(user =>
                        <tr key={user.id}>
                            <td>{user.nome}</td>
                            <td>{user.cognome}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>                          
                            <td><img width="100px" src={user.img}></img></td> {/*le immagini devono trovarsi dentro la cartella PUBLIC!!*/}
                         
                         
                            <td><button onClick={() => {this.deleteClicked(user.id)}}>Delete</button></td>
                            <td><button onClick={() => {this.editClicked(user.id)}}>Edit</button></td>
                           
                        </tr>
                        )}
                        </tbody>
                    </table>

                    
                
                </div>
            </div>
        )
    }
}

export default HomePage