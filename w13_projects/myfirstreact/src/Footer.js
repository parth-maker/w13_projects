import React from 'react';
class Footer extends React.Component{
    constructor(props){
        super(props)
    }
     render(){        return ( <footer style={{backgroundColor:"black",color:"white"}}>&copy; {this.props.name}</footer>)
        }
    }
    export default Footer