import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
const axios = require('axios');


class App extends React.Component {

  state={
    arr:[],
    coupencode:"",
    percent:"",
    expires:"",
    id:-1,
    arr2:String,
    buttonchange:true,
    currentid:Number
  }

  componentDidMount(){
    var self=this
    axios({
      method:"get",
      url:"https://5d662ab7520e1b00141ede90.mockapi.io/axiolearn",
      headers: { 'content-type': 'application/json' },
    })
    .then(function(response){
      if(response){
        const resvar=  response.data.length
        console.log(JSON.stringify(resvar)+"resvar")

        console.log(JSON.stringify(response.data[resvar-1].value[resvar])+"id")

      self.setState({
        arr:response.data[resvar-1].value,
      })}
    })

    .catch(function(error){
      console.log((error)+"error")
    })

  }


  add=()=>{
    const newarr=[]
    const newid=this.state.arr.length
    var addvar={
      "id":newid,
      "elem_one":this.state.coupencode,
      "elem_two":this.state.percent,
      "elem_three":this.state.expires
    }
    newarr.push(
      ...this.state.arr,addvar
    )
    this.setState({
      id:newid,
      coupencode:" ",
      percent:" ",
      expires:" ",
      arr:newarr,
    })

    axios({
      method:"post",
      url:"https://5d662ab7520e1b00141ede90.mockapi.io/axiolearn",
      headers: { 'content-type': 'application/json' },
      data: {
      value:newarr
    },

    })
    .then(function(response){
      console.log(response)
    })
    .catch(function(error){
      console.log(error)
    })

  }

formchange=(e)=>{
  this.setState({
    [e.target.name]:e.target.value,
  })

}

edit=(value)=>{
  this.setState({
    coupencode:this.state.arr[value].elem_one,
    percent:this.state.arr[value].elem_two,
    expires:this.state.arr[value].elem_three,
    buttonchange:false,
    currentid:value,
  })
}

update=()=>{
  this.state.arr[this.state.currentid].elem_one=this.state.coupencode
  this.state.arr[this.state.currentid].elem_two=this.state.percent
  this.state.arr[this.state.currentid].elem_three=this.state.expires
  this.setState({
    buttonchange:true,
    coupencode:" ",
    percent:" ",
    expires:" ",
  })
  axios({
    method:"post",
    url:"https://5d662ab7520e1b00141ede90.mockapi.io/axiolearn",
    headers: { 'content-type': 'application/json' },
    data: {
    value:this.state.arr
  },
  })
  .then(function(response){
    console.log(response)
  })
  .catch(function(error){
    console.log(error)
  })
}

delete=(value)=>{
  this.state.arr.splice(value,1)
  var i
  for (i = 0; i < this.state.arr.length; i++){
    this.state.arr[i].id=i
  }
  this.setState({
    id:i-1,
  })
  axios({
    method:"post",
    url:"https://5d662ab7520e1b00141ede90.mockapi.io/axiolearn",
    headers: { 'content-type': 'application/json' },
    data: {
    value:this.state.arr
  },
  })
  .then(function(response){
    console.log(response)
  })
  .catch(function(error){
    console.log(error)
  })
}

  render(){

    const newarr = this.state.arr.map((items) => {
      return(
        <div class="container card mt-5 height60 ">
  <div class="row">
  <div class="col-1 mt-3">
    {items.id+1+"."}
  </div>
    <div class="col mt-3">
      {items.elem_one}
    </div>
    <div class="col mt-3">
      {items.elem_two}
    </div>
    <div class="col mt-3">
      {items.elem_three}
    </div>
    <div className="col-2 mt-2">
    <button type="button" class="btn btn-info" onClick={()=>this.edit(items.id)}>Edit</button>
    </div>
    <div className="col-2  mt-2">
    <button type="button" class="btn btn-danger" onClick={()=>this.delete(items.id)}
    >Delete</button>
    </div>
  </div>
</div>
        )
        })

  return (
    <div className="col">
    <div className="card mt-5 flexdis">
    <div className="mt-4 ml-5 ">
    <Form>
    <Form.Group className="row " sm={2}>
    <Form.Label className="mt-2">Coupon Code:</Form.Label>
    <Col sm={2}>
    <Form.Control className="widtnsize" type="text" onChange={this.formchange} name="coupencode"
    value={this.state.coupencode}></Form.Control>
    </Col>
    </Form.Group>
    <Form.Group as={Row} sm={2}>
    <Form.Label className="mt-2 ">Offer Percent:</Form.Label>
    <Col sm={2}>
    <Form.Control className="widtnsize marginl" type="text" onChange={this.formchange} name="percent"
    value={this.state.percent}></Form.Control>
    </Col>
    </Form.Group>  <Form.Group as={Row} sm={2}>
      <Form.Label className="mt-2">Expires At:</Form.Label>
      <Col sm={2}>
      <Form.Control className="widtnsize ml-4" type="text" onChange={this.formchange} name="expires"
      value={this.state.expires}></Form.Control>
      </Col>
      </Form.Group>

      {this.state.buttonchange?<Button variant="primary mb-3 floatright mr-5" onClick={this.add}
    disabled={!this.state.coupencode || !this.state.percent || !this.state.expires}  >Add</Button>:<Button variant="primary mb-3 floatright mr-5" onClick={this.update}
      >update</Button>}

  </Form>
  </div>

  </div >
  <div className="col-8  changeposition">
  <span>{"Addons"}</span>
  {newarr}

  </div>

    </div>
  );
}
}

export default App;

// disabled={!this.state.coupencode || !this.state.percent || !this.state.expires}
