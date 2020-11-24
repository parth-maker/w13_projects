import React from 'react';
class SelectList extends React.Component{
constructor(props){
super(props)
this.state = {array:this.props.array}
 }
render(){
return(
<select>
{this.props.array.map((oneItem,index)=>(
<option key={index} value={oneItem.code}>
{oneItem.name}
</option>
 ))}
</select>
 )
 }
}
export default SelectList;