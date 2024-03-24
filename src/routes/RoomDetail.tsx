import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom, getRoomReviews } from "../api";
import { IRoomDetail, IRoomOwner } from "../types";
import { Avatar, AvatarBadge, Box, Container, Grid, GridItem, HStack, Heading, Image, Skeleton, Text, VStack } from "@chakra-ui/react";

import { CiImageOff } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

// types에 저장해야함
export interface IReview {
    payload: string,
    rating: number,
    user: IRoomOwner,
}


export default function RoomDetail() {
    const {roomPk} = useParams();
    const {isLoading, data} = useQuery<IRoomDetail>({queryKey:["rooms", roomPk], queryFn: getRoom})
    // useParams는 URL에 있는 모든 변수를 가져다 준다.

    const {data:reviewsData, isLoading:isReviewsLoading} = useQuery<IReview[]>({queryKey:["rooms", roomPk, "reviews"], queryFn: getRoomReviews})
    return (
        <Box mt={10} px={{base:10, lg:40}} height={"150vh"}>
            <Skeleton height={"43px"} width={"auto"} isLoaded={!isLoading}>
            <Heading fontSize={"xx-large"}>{data?.name}</Heading>
            {/* ? : 옵셔널 체이닝, data 객체가 존재하고 그 안에 name 속성이 있다면, name의 값을 반환 */}
            {/* data가 없거나 name이 없으면 undefined를 반환 */}
            </Skeleton>

            <Grid 
            templateColumns={"repeat(4, 1fr)"} templateRows={"1fr 1fr"} height={"60vh"} gap={3} mt={8} rounded={""} overflow={"hidden"}>
                {[0, 1, 2, 3, 4].map((index) => (

                    <GridItem key={index} overflow={"hidden"} colSpan={index === 0 ? 2 : 1} rowSpan={index === 0 ? 2 : 1}>
                    {data && data.photos && data.photos[index] && data.photos[index].file ? (
                        <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                            {data.photos && data.photos.length > 0 ? <Image w={"100%"} h={"100%"} objectFit={"cover"} src={data.photos[index].file} /> : null}
                        </Skeleton>
                    ) : (
                        <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                            <CiImageOff size={"100%"} />
                            </Skeleton>
                    )}
                </GridItem>

                ))}
            </Grid>

            <HStack mt={10} justifyContent={"space-between"} w={"50%"} >
                <VStack justifyContent={"flex-start"}>
                    <Skeleton isLoaded={!isLoading} height={"30px"} w={300} >
                        <Heading fontSize={"xl"}>House hosted by {data?.owner.name}</Heading>
                    </Skeleton>

                    <Skeleton isLoaded={!isLoading} height={"30px"} w={300} >
                        <HStack justifyContent={"flex-start"} w={"100%"}>
                            <Text>{data?.toilets} toilet{data?.toilets === 1 ? "":"s"}</Text>
                            <Text>∙</Text>
                            <Text>{data?.rooms} room{data?.rooms === 1 ? "":"s"}</Text>
                        </HStack>
                    </Skeleton>
                </VStack>

                <Avatar size={"lg"} src={data?.owner.avatar} name={data?.owner.name}>
                    <AvatarBadge borderColor={"papayawhip"} bg={"tomato"} boxSize={"1em"}/>
                </Avatar>

            </HStack>

            <Box mt={10}>
                <Heading fontSize={"2xl"} mb={"20px"}>
                    <Skeleton w={"20%"} isLoaded={!isReviewsLoading}>
                        <HStack>
                            <FaStar /> <Text>{data?.rating}</Text>
                            <Text>∙</Text>
                            <Text>{reviewsData?.length} Review{reviewsData?.length===1 ? "":"s"}</Text>
                        </HStack>
                    </Skeleton>
                </Heading>

                <Container maxW="container.lg" marginX={"none"} mt={5}>
                <Grid templateColumns={"1fr 1fr"} gap={10}>
                    {reviewsData?.map((review, pk) => (
                    <VStack key={pk} spacing={0} alignItems={"flex-start"}>
                        <HStack spacing={2} mb={"5px"} >
                            <Avatar name={review.user.name} src={review.user.avatar} size={"md"} />
                            <VStack alignItems={"flex-start"} ><Heading fontSize={"md"}>{review.user.name}</Heading><HStack><FaStar /><Text>{review.rating}</Text></HStack></VStack>
                        </HStack>
                        <Text>{review.payload}</Text>
                    </VStack>
                    ))}
                </Grid>
                </Container>
            </Box>

        </Box>
    )
}