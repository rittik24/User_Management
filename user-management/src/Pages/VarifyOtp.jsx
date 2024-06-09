import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast({
          title: data.msg,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/login");
      } else {
        toast({
          title: data.msg,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
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
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Verify OTP
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          Enter the OTP sent to your email
        </Text>
        <FormControl id="otp">
          <Input
            placeholder="Enter your OTP"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={otp}
            onChange={handleOtpChange}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            bgGradient="linear(to-r, red.400,pink.400)"
            _hover={{
              bg: "#fd7c70",
            }}
            onClick={verifyOtp}
          >
            Verify OTP
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
