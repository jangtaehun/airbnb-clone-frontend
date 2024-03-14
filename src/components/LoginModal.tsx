import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useToast } from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import { FaUser, FaKey } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUsernameLoginError, IUsernameLoginSuccess, IUsernameLoginVariables, usernameLogIn } from "../api";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IForm {
    username: string
    password: string
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<IForm>();
    // register 함수를 호출하면 name, onBlur, onChange, ref 네 가지를 준다. 
    // console.log(register("zzone"))
    // console.log(watch())
    // handleSubmit() // datafmf 검증하는 함수

    const toast = useToast()
    const queryClient = useQueryClient()
    const mutation = useMutation<IUsernameLoginError, IUsernameLoginSuccess, IUsernameLoginVariables>({mutationFn:usernameLogIn ,
        onSuccess: () => {
            toast({
                title:"Welcome!",
                status: "success"
            })
            onClose()
            queryClient.refetchQueries({queryKey:['me']})
            reset()
        },
    });

    const onSubmit = ({username, password}:IForm) => {
        mutation.mutate({username, password})
    }
    console.log(errors)

    return (
        <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />

                <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400"><FaUser /></Box>} />
                            <Input isInvalid={Boolean(errors.username?.message)} {...register("username", {required:"Please write ID"})} variant={"filled"} placeholder="ID" />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement children={<Box color="gray.400"><FaKey /></Box>} />
                            <Input isInvalid={Boolean(errors.password?.message)} {...register("password", {required:"Please write Password"})} variant={"filled"} placeholder="Password" type="password" />                            
                        </InputGroup>
                    </VStack>
                    {mutation.isError ? <Text color={"red.400"} textAlign={"center"} fontSize={"sm"}>username or Password are wrong</Text>:null}
                    <Button isLoading={mutation.isPending} mt={5} mb={2} colorScheme="red" width="100%" type="submit" >Log in</Button>
                </ModalBody>

                {/* <ModalFooter pb={3} as={"form"} onSubmit={onSubmit as any}>
                    <Button colorScheme="red" width="100%" type="submit" >Log in</Button>
                </ModalFooter> */}

                {/* 다른 페이지 css import */}
                <SocialLogin />

            </ModalContent>
        </Modal>
    );
}