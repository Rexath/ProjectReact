import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserApiService from '../utils/APIUsers.js';

class AddUser extends Component {

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
        img2: '',
        message: null,
    }
    
    var thisIsMyTrueImg = '';

    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
    this.theimage = this.theimage.bind(this)
    this.saveImg = this.saveImg.bind(this)
    this.returnHome = this.returnHome.bind(this)
    this.returnHome2 = this.returnHome2.bind(this)
  }

  saveImg(){

    document.getElementById('file-id').click();
    //UserApiService.cancelloUser(user)
  }

  returnHome(){

    this.props.history.push(`/`)
  }

  returnHome2(){

    this.props.history.push(`/`)
  }

  theimage(){

    var filename = document.getElementById('file-id').files[0].name;
    document.getElementById('file-path').value = filename;
    document.getElementById('file-id').text = filename;
    //alert(filename);
    //alert(document.getElementById('file-path').value);

    this.thisIsMyTrueImg = document.getElementById('file-path').value

    alert("stampo thisIsMyTrueImg " + this.thisIsMyTrueImg)
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

    //alert("stampa i values " + JSON.stringify(values))
    //alert("stampa il valore del value img2 " + document.getElementById('file-path').value)
    //alert("stampa il valore del value img2 " + this.state.img2)

    alert("stampo thisIsMyTrueImg " + this.thisIsMyTrueImg)

    if(this.state.id == -1){

       user = {
        nome: values.nome,
        cognome: values.cognome,
        email: values.email,
        password: values.password,
        conto: values.conto,
        img: this.thisIsMyTrueImg,
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
        img: this.thisIsMyTrueImg,

        
      }
    
      //alert("STAMPO LO USER secondo if " + JSON.stringify(user));
    } 

    if (this.state.id == -1) {
        UserApiService.addUser(user)
            .then(() => this.props.history.push('/'))
    } else {
        UserApiService.saveUser(user)
            .then(() => this.props.history.push('/'))
    }

    console.log(values);
  }

  onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        
      let { nome, cognome, email, password, conto, img, id } = this.state

      //alert("STAMPO UN id " + this.state.id);

      if(this.state.id == -1){

        //alert("sono nel if new user");

        return (
          
            <div>
                <h3>New User</h3>
                <div className="container">
                    <Formik
                        initialValues={{ nome, cognome, email, password, conto, img}}
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
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="nome" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Surname</label>
                                        <Field className="form-control" type="text" name="cognome" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Email</label>
                                        <Field className="form-control" type="text" name="email" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Password</label>
                                        <Field className="form-control" type="text" name="password" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label onClick={this.saveImg}>Select Image</label>
                                        <Field className="form-control" id="file-id" style={{display:'none'}} type="file" name="img" onChange={this.theimage}/>
                                        <Field placeholder="non toccare" className="form-control" type="text" name="img" id="file-path" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                    <button className="btn btn-success" onClick={this.returnHome}>returnHome</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        );

      } 
      
      if(this.state.id != -1){

        //alert("sono nel if edit user");

        return (
          
          <div>
              <h3>Edit User</h3>
              <div className="container">
                  <Formik
                      initialValues={{ id, nome, cognome, email, password, conto, img }}
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
                                      <label>Name</label>
                                      <Field className="form-control" type="hidden" name="id" disabled />
                                      <Field className="form-control" type="text" name="nome" />
                                  </fieldset>
                                  <fieldset className="form-group">
                                      <label>Surname</label>
                                      <Field className="form-control" type="text" name="cognome" />
                                  </fieldset>
                                  <fieldset className="form-group">
                                      <label>Email</label>
                                      <Field className="form-control" type="text" name="email" />
                                  </fieldset>
                                  <fieldset className="form-group">
                                      <label>Password</label>
                                      <Field className="form-control" type="text" name="password" />
                                  </fieldset>
                                  <fieldset className="form-group">
                                      <label>Balance</label>
                                      <Field className="form-control" type="text" name="conto" />
                                  </fieldset>
                                  <fieldset className="form-group">
                                      <label onClick={this.saveImg}>img</label>
                                      
                                  </fieldset>
                                  <button className="btn btn-success" type="submit">Save</button>
                                  <button className="btn btn-success" onClick={this.returnHome2}>returnHome</button>
                              </Form>
                          )
                      }
                  </Formik>

              </div>
          </div>
      )
      }

    }
}

export default AddUser