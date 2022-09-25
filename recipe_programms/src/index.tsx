import React from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Heading, propNames } from '@chakra-ui/react'
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
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import Tesseract from 'tesseract.js';

type Inputmodeprop = {
  swich: () => void
}

function Inputmode(props: Inputmodeprop) {
  const [value, setValue] = React.useState('1')
  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction='row'>
        <Radio value='1' id = 'imageinput'>画像入力</Radio>
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



type Textinputprops = {
  ingredient: Array<string> | null
  amount: Array<number> | null
  unit: Array<string> | null
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


type TableProps = {
  ingredient: Array<string> | null
  amount: Array<number> | null
  unit: Array<string> | null
  ratio: number | null
}

const ResultTable = (props: TableProps) => {
  if (props.ingredient != null
    && props.amount != null
    && props.unit != null
    && props.ratio != null) {
    let i: number = 0
    let tablebody: React.ReactNode = ''
    while (i < props.ingredient?.length) {
      tablebody = tablebody + '<Tr><Td>' + props.ingredient[i] + '</Td><Td>' + Number(props.amount[i]) * props.ratio + '</Td><Td>' + props.unit[i] + '</Td></Tr>'
      i++;
    }


    return (
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption></TableCaption>
          <Thead>
            <Tr>
              <Th>材料名</Th>
              <Th>量</Th>
              <Th isNumeric>単位</Th>
            </Tr>
          </Thead>
          <Tbody>

          </Tbody>
        </Table>
      </TableContainer>
    );
  }
  else {
    return (
      <></>
    )
  }
}

type Outputprops = {
  imagemode: boolean
  ingredient: Array<string> | null
  amount: Array<number> | null
  unit: Array<string> | null
  ratio: number | null
  read: () => void
  calcRatio: () => void
  recognize: () => void
}

const Output = (props: Outputprops) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  let button: React.ReactNode

  if (props.imagemode) {
    button = "<Button colorScheme='teal' onClick={() => {props.recognize(); onOpen(); }} >次へ</Button>"
  }
  else {
    button = "<Button colorScheme='teal' onClick={() => { props.read();onOpen(); }} >次へ</Button>"
  }

  return (
    <>
      <Button colorScheme='teal' onClick={() => {props.recognize(); onOpen(); }} >
        次へ
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
            <Input placeholder='レシピは何人前？' id='original' />
            <Input placeholder='作るのは何人前？' id='request' />
            <Button colorScheme='teal' onClick={() => { props.calcRatio() }} >
              次へ
            </Button>
            <br />

            <ResultTable
              ingredient={props.ingredient}
              amount={props.amount}
              unit={props.unit}
              ratio={props.ratio}
            />

          </DrawerBody>

          <DrawerFooter>
            <div id="output"></div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )

}



type Pagestate = {
  data: File | null;  //受け取った画像入れる用
  ingredient: Array<string> | null;
  amount: Array<number> | null;
  unit: Array<string> | null;
  ratio: number | null;
  imagemode: boolean
}

class Page extends React.Component<{}, Pagestate> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: null,
      ingredient: null,
      amount: null,
      unit: null,
      ratio: null,
      imagemode: true
    }
  }

  render() {
    return (
      <ChakraProvider>
        <Heading>レシパン</Heading>

        <br />
        <Inputmode swich={() => this.swich()} />

        <Fileinput
          read={() => this.read()}
          dispImage={() => this.dispImage()} />

        <Textinput ingredient={this.state.ingredient}
          amount={this.state.amount}
          unit={this.state.unit} />
        <br />

        <Output
          read={() => this.read()}
          calcRatio={() => this.calcRatio()}
          recognize={() => this.recognize()}
          imagemode={this.state.imagemode}
          ingredient={this.state.ingredient}
          amount={this.state.amount}
          unit={this.state.unit}
          ratio={this.state.ratio}
        />
      </ChakraProvider>
    )
  }

  swich() {
    const imageinput = document.getElementById('emageinput') as HTMLInputElement
    if (imageinput.checked) {
      this.setState({
        imagemode: true
      })
    }
    else {
      this.setState({
        imagemode: false
      })
    }
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

  recognize() {
    const imageZone = document.getElementById('fileInput') as HTMLInputElement
    //imageZone.addEventListener('click', resizePinnedImage, false)
    //function resizePinnedImage(e:any) {
    if (imageZone.files != null && imageZone.files != undefined) {
      const file = imageZone.files[0]
      if (!file.type.match('image.*')) { console.log('finish'); return }
      Tesseract.recognize(
        file,
        'jpn', // 言語設定
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        const out = document.getElementById('output')!
        out.innerHTML = text
      })
    }

  }

  read() {
    //HTMLからデータを受け取る
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const buf = fileInput.files!;

    //受け取りに成功していたら、内容を取り出す
    if (buf[0] !== null) {
      this.setState({
        data: buf[0],
      })
    }
  }

  calcRatio() {
    const original = document.getElementById('original') as HTMLInputElement
    const request = document.getElementById('request') as HTMLInputElement

    const orginalnum = original.value
    const requestnum = request.value

    this.setState({
      ratio: Number(requestnum) / Number(orginalnum)
    })
  }


}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Page />
);