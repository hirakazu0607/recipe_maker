import React from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Box, ChakraProvider, Stack } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import Tesseract from 'tesseract.js';

function Inputmode() {
  const [value, setValue] = React.useState('1')
  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction='row'>
        <Radio value='1'>画像入力</Radio>
        <Radio value='2'>文字入力</Radio>
      </Stack>
    </RadioGroup>
  )
}


type InputProps = {
  read: () => void;
  dispImage: () => void;
}

const Fileinput = (props: InputProps) => {
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

      <img id='DispImage' alt='' />
      <Box id='alt' backgroundColor='green.300' borderWidth={3} borderColor='green' height={250}>
        <Text fontSize='md' >選択した画像がここに表示されます</Text>
      </Box>
    </ChakraProvider>
  );
}

type Outputprops = {
  ingredient: Array<string> | undefined
  amount: Array<number> | undefined
  unit: Array<string> | undefined
  read: () => void
}

const Output = (props: Outputprops) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button colorScheme='teal' onClick={() => { props.read(); onOpen(); }} >
        実行
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size={'full'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>

          </DrawerHeader>

          <DrawerBody>
            <Input placeholder='レシピは何人前？' /><Input placeholder='作りたいのは何人前？' />
          </DrawerBody>

          <DrawerFooter>
            
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )

}

type Textinputprops = {
  ingredient: Array<string> | undefined
  amount: Array<number> | undefined
  unit: Array<string> | undefined
}

const Textinput = (props: Textinputprops) => {
  return (
    <ChakraProvider>
      <div id='textinputset'>
        <Input
        backgroundColor={'green.200'} 
        width='auto'
        placeholder='材料名' 
        id='ingredient' />
        <Input 
        type="number"  
        width='auto'
        backgroundColor={'green.200'}
        placeholder='数量'
        id='amount' />
        <Input 
        width='auto' 
        backgroundColor={'green.200'}
        placeholder='単位' 
        id='unit' />
      </div>

    </ChakraProvider>

  )
}

type Pagestate = {
  data: File | undefined;  //受け取った画像入れる用
  ingredient: Array<string> | undefined;
  amount: Array<number> | undefined;
  unit: Array<string> | undefined
}

class Page extends React.Component<{}, Pagestate> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: undefined,
      ingredient: undefined,
      amount: undefined,
      unit: undefined
    }
  }

  render() {
    return (
      <ChakraProvider>
        <h1>なんかタイトル</h1>
        
        <br />
        <Inputmode/>

        <Fileinput
          read={() => this.read()}
          dispImage={() => this.dispImage()} />

        <Textinput ingredient={this.state.ingredient}
          amount={this.state.amount}
          unit={this.state.unit} />
        <br />

        <Output
          read={() => this.read()}
          ingredient={this.state.ingredient}
          amount={this.state.amount}
          unit={this.state.unit}
        />
      </ChakraProvider>
    )
  }



  dispImage() {
    const alt = document.getElementById('alt') as HTMLElement;
    alt.style.display = "none";

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

    console.log("aiuwe");
    //受け取りに成功していたら、内容を取り出す
    if (buf[0] !== undefined) {
      this.setState({
        data: buf[0],
      })
    }
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Page />
);