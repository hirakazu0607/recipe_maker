import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import Tesseract from 'tesseract.js';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Input placeholder="file" type="file"/>
    <div><Button colorScheme='teal' size='md'>
    Button
  </Button></div>
  </React.StrictMode>
);


