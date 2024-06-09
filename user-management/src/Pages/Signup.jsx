import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../Assets/client.webp";

export default function Signup() {
  const [cred, setCred] = useState({ name: "", email: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();

  const HandleInput = (e) => {
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value });
  };

  const Register = async () => {
    try {
      let r = await fetch(`https://userbackend-0yhs.onrender.com/user/register`, {
        method: "POST",
        body: JSON.stringify(cred),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let d = await r.json();
      if (r.status === 201) {
        toast({
          title: `${d.msg}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/varifyotp", { state: { email: cred.email } });
      } else {
        toast({
          title: `${d.msg}`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Please try again",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 3, sm: 20, lg: 20 }}
      >
        <Stack>
          <img src={client} alt="client" style={{ width: '80%', height: '90%' }}/>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"blue.500"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Sign Up
              <Text
                as={"span"}
                bgGradient="linear(to-r, blue.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
          </Stack>
          <Box as={"form"} mt={10}>
            <Stack spacing={4}>
              <Input
                onChange={HandleInput}
                name="name"
                placeholder="fullname"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                onChange={HandleInput}
                name="email"
                type="email"
                placeholder="email"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                onChange={HandleInput}
                name="password"
                placeholder="password"
                type="password"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
            </Stack>
            <Button
              onClick={Register}
              fontFamily={"heading"}
              isDisabled={
                cred.name === "" || cred.email === "" || cred.password === ""
                  ? true
                  : false
              }
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              size={"md"}
              borderRadius="5px"
              bg={"#ff6f61"}
              _hover={{
                bg: "#fd7c70",
              }}
              color="#fff"
            >
              Sign Up
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
