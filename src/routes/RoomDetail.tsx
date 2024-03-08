import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom } from "../api";
import { IRoomDetail } from "../types";
import { Box, Grid, GridItem, Heading, Image, Skeleton, Text } from "@chakra-ui/react";

import { CiImageOff } from "react-icons/ci";

export default function RoomDetail() {
    const {roomPk} = useParams();
    const {isLoading, data} = useQuery<IRoomDetail>({queryKey:["rooms", roomPk], queryFn: getRoom})
    // useParams는 URL에 있는 모든 변수를 가져다 준다.
    return (
        <Box mt={10} px={{base:10, lg:40}}>
            <Skeleton height={"43px"} width={"auto"} isLoaded={!isLoading}>
            <Heading>{data?.name}</Heading>
            {/* ? : 옵셔널 체이닝, data 객체가 존재하고 그 안에 name 속성이 있다면, name의 값을 반환 */}
            {/* data가 없거나 name이 없으면 undefined를 반환 */}
            </Skeleton>

            <Grid 
            templateColumns={"repeat(4, 1fr)"} templateRows={"1fr 1fr"} height={"60vh"} gap={3} mt={8} rounded={""} overflow={"hidden"}>
                {[0, 1, 2, 3, 4].map((index) => (

                    <GridItem key={index} overflow={"hidden"} colSpan={index === 0 ? 2 : 1} rowSpan={index === 0 ? 2 : 1}>
                    {data && data.photos && data.photos[index] && data.photos[index].file ? (
                        <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                            <Image w={"100%"} h={"100%"} objectFit={"cover"} src={data.photos[index].file} />
                        </Skeleton>
                    ) : (
                        <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                            <CiImageOff size={"100%"} />
                            </Skeleton>
                    )}
                </GridItem>

                ))}
            </Grid>

        </Box>
    )
}