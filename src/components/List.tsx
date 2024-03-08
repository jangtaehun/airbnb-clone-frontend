import { Box, Button, Grid, HStack, Image, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FaStar, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IListProps {
    pk: number;
    imageUrl: string;
    name: string;
    rating: number;
    country: string;
    city: string;
    price: number;
}

export default function List({pk, imageUrl, name, rating, country, city, price}:IListProps) {
    const gray = useColorModeValue("gray.600", "gray.300")
    return (
            <Link to ={`/rooms/${pk}`}>
                <VStack spacing={1} alignItems={"flex-start"}>

                    <Box position={"relative"} overflow={"hidden"} mb={3} rounded={"2xl"}>
                        <Image minH="280" src={imageUrl} />
                        <Button variant={"unstyled"} position={"absolute"} top={0} right={0} color={"white"}><FaRegHeart size={20} /></Button>
                    </Box>

                    <Box>
                        <Grid gap={2} templateColumns={"10fr 1fr"}>
                            <Text display={"block"} as="b" noOfLines={1} fontSize="md">{name}</Text>
                            <HStack spacing={1} alignItems={"center"} _hover={{color:"red.300"}}>
                                <FaStar size={14}/>
                                <Text fontSize={"sm"}>{rating}</Text>
                            </HStack>
                        </Grid>
                        <Text fontSize={"sm"} color={gray}>{country}, {city}</Text>
                    </Box>

                    <Text fontSize={"sm"} color={gray}>
                        <Text as={"b"}>${price}</Text>
                    </Text>

                </VStack>
            </Link>
            )
        }
    