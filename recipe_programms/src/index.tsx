import React from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import {Show, Hide} from '@chakra-ui/react'
import Tesseract from 'tesseract.js';

type InputProp = {
  read: () => void;
  dispImage : () => void;
}

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
        onChange={props.dispImage}
        hidden />
      <Button onClick={onClickInput}
        colorScheme='green'
        size='md'

      >画像を選択</Button>
      <br />

      <img id='DispImage'/>
      
    </ChakraProvider>
  );
}

type Pagestate = {
  data: File | undefined;  //受け取った画像入れる用
  text: string | undefined;   //画像から読み取ったの入れる用(未使用)
}

class Page extends React.Component<{}, Pagestate> {
  constructor(props: {}) {
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
        <Fileinput 
        read={() => this.read()} 
        dispImage={() => this.dispImage()}/>
        <Button colorScheme='teal' size='md' onClick={() => this.read()}>実行</Button>
      </ChakraProvider>
    )
  }

  dispImage() {
    const inputImage = document.getElementById('fileInput') as HTMLInputElement
    let filereader = new FileReader();
    filereader.onloadend = () => {
      const image = document.getElementById('DispImage') as HTMLImageElement;
      image.src = filereader.result as string
    }
    filereader.readAsDataURL(inputImage.files![0])
  }

  read() {
    //HTMLからデータを受け取る
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const buf = fileInput.files!;

    //受け取りに成功していたら、内容を取り出す
    if (buf[0] !== undefined) {
      let dataReader = new FileReader();
      dataReader.readAsDataURL(buf[0]);
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
  <Page />
);


