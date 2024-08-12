import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [picture, setPicture] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const postDetails = (pictures) => {
    setLoading(true);
    if (pictures === undefined) {
      toast({
        title: 'Please select an image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (pictures.type === "image/jpeg" || pictures.type === "image/png") {
      const data = new FormData();
      
      data.append("file", pictures);
      data.append("upload_preset", "chatme");
      data.append("cloud_name", "dfa6yikim");
      fetch("http://api.cloudinary.com/v1_1/dfa6yikim/image/upload", {
        method: 'post',
        body: data,
      })
      .then((res) => res.json())
      .then(data => {
        setPicture(data.url.toString());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    } else {
      toast({
        title: 'Please select a valid image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    const nameRegex = /^(?![\s-.]*$)(?!.*[\s-.]{2})[A-Za-z\s-.]{2,}$/;  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Please fill all the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (!nameRegex.test(name)) {
      toast({
          title: 'Invalid name',
          description: 'Name must have at least two characters, and not contain only symbols or spaces.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
      });
      setLoading(false);
      return;
  }

  // Validate email
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

  // Validate password
  if (!passwordRegex.test(password)) {
      toast({
          title: 'Invalid password format',
          description: 'Password must be at least 8 characters long and contain at least one uppercase letter and one symbol.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
      });
      setLoading(false);
      return;
  }

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
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
        "http://localhost:5000/api/user",
        { name, email, password, picture },
        config
      );

      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/chat');
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
  };

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="picture" isRequired>
        <FormLabel>Upload Profile Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="green"
        width="100%"
        style={{ marginTop: 10 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
