import React from 'react';
import styles from './Header.module.css';
class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {companyName:this.props.companyName}
        }
        changeName = (new_name)=>{
            this.setState({companyName:new_name})
    }
         render(){
        return (
        <header className={styles.Header}>
            Welcome to {this.state.companyName}
        <button onClick={()=>this.changeName(document.getElementById('xyz123').value)}>Change Name</button>
         <input type="text" id="xyz123"/>
        </header>
        )
        }
    }

export default Header