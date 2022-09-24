import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import Tesseract from 'tesseract.js';
import { Button, ButtonGroup } from '@chakra-ui/react'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <div className="App">
          <p>hello React</p>
      </div>
      <Button colorScheme='blue'>こんにちわああああああ</Button>
      
  </React.StrictMode>
);




