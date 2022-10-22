import React, { useEffect, useState } from 'react'
import { Button, Pressable, Text, TextInput, View } from 'react-native'
import { io } from 'socket.io-client'
import axios from 'axios'

const axiosInstance = axios.create({ baseURL: 'http://localhost:3000' })

const socket = io('http://localhost:3000')

socket.on('ServerToClient', msg => console.log(msg))
socket.on('Room1', msg => console.log(`Room1 on ${msg}`))
socket.on('Room1All', msg => console.log(`Room1All on ${msg}`))

axiosInstance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  },
)

// 콜백으로 받아온 데이터를 상태관리에 넣는식으로 하면 될듯

function HelloWorldApp() {
  const buttonHandle2 = async () => {
    // console.log(await axiosInstance.get('/'))
    socket.emit('Room1', { user: a, message: 'hello!' }, (message: any) => {
      console.log(`callback ${message}`)
    })
    console.log('response ok!')
  }

  const [a, setA] = useState('')

  const buttonHandle = () => {
    setA('press')
    socket.emit('ClientToServer', { user: a })
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Pressable onPress={buttonHandle}>
        <Text>Hello, worasdsaadaddsadld!</Text>
      </Pressable>
      <Text>response :{a}</Text>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onChangeText={e => setA(e)}
      />
      <Button title="test" onPress={buttonHandle2} />
    </View>
  )
}
export default HelloWorldApp
