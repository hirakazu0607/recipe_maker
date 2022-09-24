import React from 'react';
import {useRef} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import Tesseract from 'tesseract.js';

type InputProp = {
  read: () => void;
}


Tesseract.recognize(
  'https://tesseract.projectnaptha.com/img/eng_bw.png',
  'eng',
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
  console.log(text);
})

const Fileinput = (props: InputProp) => { 
  const inputRef = useRef<HTMLInputElement>(null);
  const onClickInput = () => {
    inputRef.current?.click();
  }

  return (
    <ChakraProvider>
      <p></p>
      <Input 
      ref={inputRef}  
      type='file'
      id='fileInput'
      hidden/>
      <Button onClick = {onClickInput} 
      colorScheme='green'
      size='md'

      >画像を選択</Button>
      <br />
    </ChakraProvider>
  );
}

type DispProp = {
  image: File | undefined,
}

const DispImage = (props: DispProp) =>{
  if(props.image !== undefined){
  return(
    <ChakraProvider>
    </ChakraProvider>
  )
  }
  else{
    return(
      <ChakraProvider>

      </ChakraProvider>
    )
  }
}

type Pagestate = {
  data: File | undefined;
  text: string | undefined;
}

class Page  extends React.Component<{}, Pagestate> {
  constructor(props: {}){
    super(props);
    this.state = {
      data: undefined,
      text: undefined,
    }
  }
  
  render() {
    return (
      <ChakraProvider>
        <h1>なんかタイトル</h1>
        <Fileinput read={() => this.read()}/>
        
        <DispImage image={this.state.data}/>
        <Button colorScheme='teal' size='md'>実行</Button>
      </ChakraProvider>
    )    
  }

  read() {
    //HTMLからデータを受け取る
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const buf = fileInput.files!;

    //受け取りに成功していたら、内容を取り出す
    if (buf[0] !== undefined) {
      let dataReader = new FileReader();
      dataReader.readAsText(buf[0]);
      dataReader.onloadend = () => {
        this.setState({
          data: buf[0],
          text: dataReader.result as string,
        })
      }
    }
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 <Page/>
);


