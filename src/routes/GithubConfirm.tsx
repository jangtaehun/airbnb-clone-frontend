import { Heading, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function GithubConfirm() {
    // 있는 곳을 알려준다.
    const {search} =  useLocation();
    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({mutationFn:githubLogIn, 
        onSuccess: () => {
            toast({
                status: "success",
                title: "Welcome!",
                position: "bottom-right",
                description: "Happy to have you back!",
                });
                queryClient.refetchQueries({queryKey:["me"]});
                navigate("/");
            },
            onError: () => {
                toast({
                    status: "error",
                    title: "Login Failed",
                    position: "bottom-right",
                    description: "Please check kako account",
                })
                navigate("/");
            }
        })

    const confirmLogin = async() => {
        const params = new URLSearchParams(search);
        const code = params.get('code');
        if(code){
            mutation.mutate(code)
            }
        }
    

    // 리엑트 컴포넌트가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 하는 HOOK
    useEffect(() => {
        confirmLogin();
    }, [])
    return (
        <VStack bg={"gray.100"} justifyContent={"center"} minH="100vh">
            <Heading>Processing log in...</Heading>
            <Text>Please wait some minutes...</Text>
            <Spinner size={"lg"} />
        </VStack>
    )
}