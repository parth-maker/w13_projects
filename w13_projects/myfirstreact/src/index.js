import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './Header.js';
import Footer from './Footer.js';
import SelectList from './SelectList';
import Offices from './Offices.js';


const provinces=[ {code:'QC',name:'Quebec'},{code:'ON',name:'Ontario'},{code:'NB',name:'New-Brunswick'}]

const countries=[{code:'CA',name:'Canada'},{code:'US',name:'USA'},{code:'IN',name:'India'},{code:'MX',name:'Mexixo'}]

class Page extends React.Component{
  render(){
            return (
            <div>
                <Header companyName="blabla.com"/>
                <p>Hello World !</p>
                <SelectList array={provinces}/>
                 <SelectList array={countries}/>
                 <Offices></Offices>
                <Footer name="Parth"/>
            </div>
        )
    }
}

ReactDOM.render(<Page/>,document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();