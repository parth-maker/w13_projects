import React from 'react';
import styles from './Offices.module.css';
/**
* Offices components
* uses our dress server REST API http://localhost:3001/offices
* props inputs: none
*/
class Offices extends React.Component {
    constructor(props) {
      super(props);

      // set initial state
      // do not use setState in constructor, write state directly
      this.state = {
        offices_data : [], // will contain offices data array from server
        offices_index : 0, // the index of the dress currently shown, start at first in array
        offices_count : 0, // how many offices in data array from server
        isLoaded : false,  // will be true after data have been received from server
        error : null,       // no errors yet !
        newAdd : true
      };
    }
    increase = ()=>{
        if((this.state.offices_index+1)===this.state.offices_data.length)
        this.setState({offices_index:0})
        else
        this.setState({offices_index:this.state.offices_index+1})
    }
    decrease = ()=>{
        if((this.state.offices_index-1)===-1)
        this.setState({offices_index:this.state.offices_data.length-1})
        else
        this.setState({offices_index:this.state.offices_index-1})
    }

    save = ()=>{
        if (this.state.newAdd===false) {
            this.addData()
        } else {
            this.updateData()
        }
    }
    addData =()=>{
        let data ={
            officecode: document.getElementById("officecode").value,
            addressline1: document.getElementById("addressline1").value,
            addressline2: document.getElementById("addressline2").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
            country: document.getElementById("country").value,
            postalcode: document.getElementById("postalcode").value,
            phone: document.getElementById("phone").value,
            territory: document.getElementById("territory").value,

        }
        fetch("http://localhost:8000/offices/",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                //'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data)
        }
    )
        .then(res => res.json())//here server sends JSON response
        .then(
            (response) => {
                // TO DO how to handle code other than 200 because this gets
                // exeucted in all cases
                this.setState({error: {message:"Form Added"}})
                this.setState({newAdd: true})
            },

            (error) => {
                // only NO RESPONSE URL errors will trigger this code
                this.setState({error: {message:"AJAX error: URL wrong or unreachable, see console"}})
            }

        )
    }
     updateData =()=> {


        let data = {
            officecode: document.getElementById('officecode').value,
            addressline1: document.getElementById('addressline1').value,
            addressline2: document.getElementById('addressline2').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            country: document.getElementById('country').value,
            postalcode: document.getElementById('postalcode').value,
            phone: document.getElementById('phone').value,
            territory: document.getElementById('territory').value
        }

        fetch("http://localhost:8000/offices/" + document.getElementById('officecode').value,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(data)
            }
        )
            .then(res => res.json())//here server sends JSON response
            .then(
                (response) => {
                    // TO DO how to handle code other than 200 because this gets
                    // exeucted in all cases
                    this.setState({error: {message:"Form Saved"}})
                },

                (error) => {
                    // only NO RESPONSE URL errors will trigger this code
                    //document.getElementById("status").innerHTML = "AJAX error: URL wrong or unreachable, see console"
                    this.setState({error: {message:"AJAX error: URL wrong or unreachable, see console"}})

                }

            )

    }

    delete = () => {
        document.getElementById("status").innerHTML = "Waiting for server"

        fetch("http://localhost:8000/offices/" + document.getElementById('officecode').value,
            {
                method: 'DELETE'
                //,body: JSON.stringify(someData)// data to send in the body of the request
            }
        )

            .then(res => res.json())//here server sends JSON response
            .then(
                (response) => {
                    // TO DO how to handle code other than 200 because this gets
                    // exeucted in all cases
                    this.add()
                    this.setState({error: {message:"Form Saved"}})
                },

                (error) => {
                    // only NO RESPONSE URL errors will trigger this code
                    this.setState({error: {message:"AJAX error: URL wrong or unreachable, see console"}})
                }

            )
    }
    add=()=> {
        this.setState({newAdd: false})
        this.state.offices_data.push({

            officecode:"",

            addressline1:"",

            addressline2:"",

            city:"",

            state:"",

            country:"",

            postalcode:"",

            phone:"",

            territory:""

        })

        this.setState( {

            offices_index : this.state.offices_count,

            add_new:true

        })

    }

    updateArrayItem = (event) => {
                const i=this.state.offices_index
                this.setState(state => {
                  const list = state.offices_data.map((office, j) => {
                    if (j === i) {
                      // the new value of the form field beeing modified
                      // the input NAME must be the same as in the office object (and table colum)
                      office[event.target.name]=event.target.value
                      return office;
                    } else {
                      return office;
                    }
                  });
                  return {
                    list,
                  };
                });
              };
    // REACT component lifecycle for componentDidMount
    // https://www.w3schools.com/react/react_lifecycle.asp
    componentDidMount() {

       // AJAX call using fetch. Make sure the dress server is running !
       // see https://reactjs.org/docs/faq-ajax.html
      fetch('http://localhost:8000/offices')
        .then(
            (response)=> {
                // here full fetch response object
                //console.log(response)
                // fetch not like jQuery ! both ok code 200 and error code 404 will execute this .then code
                if (response.ok) {
                    // handle 2xx code success only
                    // get only JSON data returned from server with .json()
                    response.json().then(json_response => {
                        console.log(json_response)
                        this.setState({
                            offices_data:json_response.offices, // data received from server
                            offices_count:json_response.offices.length, // how many offices in array
                            offices_index:0,  // will first show the first dress in the array
                            isLoaded : true,  // we got data
                            error : null // no errors
                        })
                    }
                    )

                }else{
                    // handle errors, for example 404
                    response.json().then(json_response => {
                        this.setState({
                            isLoaded: false,
                            // result returned is case of error is like  {message: "dress not found"}
                            // save the error in state for display below
                            error:json_response,   // something in format  {message: "dress not found", offices:{}}
                            offices_data: {}, // no data received from server
                            offices_count:0,
                            offices_index:0,
                        });
                    })
                }
            },

            (error) => {
                // Basically fetch() will only reject a promise if the URL is wrong, the user is offline,
                // or some unlikely networking error occurs, such a DNS lookup failure.
                this.setState({
                    isLoaded: false,
                    error: {message:"AJAX error, URL wrong or unreachable, see console"}, // save the AJAX error in state for display below
                    offices_data: {}, // no data received from server
                    offices_count:0,
                    offices_index:0,
                });
            }
        )
    }


    // display the offices table
    render() {
        if(this.state.error){
            return <div><b>{this.state.error.message}</b></div>;
        }else if(this.state.isLoaded){
            if(this.state.offices_count!==0){
                // dress table not empty
                return (
                    <div>
                        <b>List of offices from server localhost:8000/offices</b>
                        <form id="officeform">    
                            <label class={styles.Label}>officecode</label> <input type="number" name="officecode" id="officecode" min="0" step="1" value={this.state.offices_data[this.state.offices_index].officecode} onChange={(event)=>this.updateArrayItem(event)} /><br/>
                            <label class={styles.Label}>Address Line 1</label> <input type="text" name="addressline1" id="addressline1" value={this.state.offices_data[this.state.offices_index].addressline1} onChange={(event)=>this.updateArrayItem(event)}/><br/>
                            <label class={styles.Label}>Address Line 2</label> <input type="text" name="addressline2" id="addressline2" value={this.state.offices_data[this.state.offices_index].addressline2} onChange={(event)=>this.updateArrayItem(event)}/><br/>
                            <label class={styles.Label}>City</label> <input type="text" name="city" id="city" value={this.state.offices_data[this.state.offices_index].city} onChange={(event)=>this.updateArrayItem(event)}/><br/>
                            <label class={styles.Label}>Phone</label> <input type="text" name="phone" id="phone" value={this.state.offices_data[this.state.offices_index].phone} onChange={(event)=>this.updateArrayItem(event)}/><br/>
                            <label class={styles.Label}>State</label> <input type="text" name="state" id="state" value={this.state.offices_data[this.state.offices_index].state} onChange={(event)=>this.updateArrayItem(event)}/><br/>
                            <label class={styles.Label}>Country</label> <input type="text" name="country" id="country" value={this.state.offices_data[this.state.offices_index].country} onChange={(event)=>this.updateArrayItem(event)}/><br/>
                            <label class={styles.Label}>Postalcode</label> <input type="text" name="postalcode" id="postalcode" value={this.state.offices_data[this.state.offices_index].postalcode} onChange={(event)=>this.updateArrayItem(event)}/><br/>
                            <label class={styles.Label}>Territory</label> <input type="text" name="territory" id="territory" value={this.state.offices_data[this.state.offices_index].territory} onChange={(event)=>this.updateArrayItem(event)}/><br/>
                            <button type="button" id="prev" onClick={()=>this.decrease()}>Previous</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button type="button" id="next" onClick={()=>this.increase()}>Next</button><br/>
                            <button type="button" id="save" onClick={()=>this.save()}>Save</button>
                            <button type="button" id="delete" onClick={()=>this.delete()}>Delete</button>
                            <button type="button" id="add" onClick={()=>this.add()}>Add New Office</button>
                        </form>
                        <p id="status"></p>
                        </div>

                )
            }else{
                return(<div><b>Dress table is empty</b></div>)
            }
        }else{
            return (<div><b>Waiting for server ...</b></div>)
        }
    }
  }

export default Offices;