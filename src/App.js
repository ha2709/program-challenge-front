import './App.css';
import { Button, ListGroup } from 'react-bootstrap';
import React, { useState } from 'react';
import FileSaver from 'file-saver';

function App() {
  const [integer, setInteger] = useState(0);
  const [alpha, setAlpha] = useState(0);
  const [real, setReal] = useState(0);
  const [alphaNumeric, setAlphaNumeric] = useState(0);
  const [link, setLink] = useState("");
  const generate = ( async () =>{

    fetch("http://127.0.0.1:5000/generate", {

    }).then(response => 
      response.json()).then(data => {
        console.log(data.url);
        setLink(data.url)
      })
      ;
  })

  const download = ( async () => {
    fetch("http://127.0.0.1:5000/download").then(response => {
    console.log(response.text); 
    console.log(response.blob);
      return response.blob();
      }).then(
        function(blob) {
          FileSaver.saveAs(blob, 'output.txt');        
        }).catch(err => {
          console.error(err);
        });
    }
  )
  const report = ( async() => {
    fetch("http://127.0.0.1:5000/report").then(response => 
    response.json()).then(data => {
      console.log(data)
      setInteger(data.integer);
      setAlpha(data.Alphabet);
      setReal(data.real);
      setAlphaNumeric(data.alphanumeric)
    })
    ;
  })

  return (
    <div className="App">
      <div className="mt-5 ml-3 col-md-12">
        <Button onClick={generate} variant="primary " className="mr-1" style ={{"margin-left":"10px"}}  size="lg">Generate</Button>{' '}
      </div>
      <div className="  col-md-12">
        <Button onClick={download} variant="link"   size="lg">Link: {link}</Button>{' '}
      </div>
      <div className="ml-3 col-md-12">
        <Button onClick={report} variant="info" className="ml-3" style ={{"margin-left":"10px"}}  size="lg">Report</Button>{' '}
      </div>
      <div className="mt-5 ml-10 col-md-12 ">

        <ListGroup>

          <ListGroup.Item>Alphabetical string: {alpha.toLocaleString('en')}   </ListGroup.Item>
          <ListGroup.Item>Real numbers: {real.toLocaleString('en')} </ListGroup.Item>
          <ListGroup.Item>Integers: {integer.toLocaleString('en')}</ListGroup.Item>
          <ListGroup.Item>Alphanumerics: {alphaNumeric.toLocaleString('en')}</ListGroup.Item>
        </ListGroup>
      </div>

        

    </div>
  );
}

export default App;
