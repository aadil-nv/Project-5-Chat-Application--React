import React from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const [show, setShow] = useState(false)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()


  const handleClick = () => setShow(!show)

  const submitHandler = async () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please fill all the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (!emailRegex.test(email)) {
      toast({
          title: 'Invalid email format',
          status: 'warning',
          duration: 5000,
          isClosable: true,
      });
      setLoading(false);
      return;
  }

  if (!passwordRegex.test(password)) {
      toast({
          title: 'Invalid password format',
          description: 'Password must be at least 8 characters long and contain at least one uppercase letter and one symbol',
          status: 'warning',
          duration: 5000,
          isClosable: true,
      });
      setLoading(false);
      return;
  }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/user/login',
        { email, password },
        config
      );

      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate("/chat");

    } catch (error) {
      toast({
        title: 'Error occurred',
        description: error.response ? error.response.data.message : 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }


  }

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>



      <Button
        colorScheme="green"
        width="100%"
        style={{ marginTop: 10 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme='red'
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("Guest@123");
        }}
      >
        Get User Credentials
      </Button>
    </VStack>
  );


}

export default Login
