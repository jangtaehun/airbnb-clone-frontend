import {Grid, useEditable} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ListSkeleton from "../components/ListSkeleton";
import List from "../components/List";
import { getRooms } from "../api";
import { IRoomList } from "../types";


// interface IPhoto {
//     pk: string;
//     file: string;
//     description: string;
// }
// interface IRoom {
//     pk: number;
//     name: string;
//     country: string;
//     city: string;
//     price: number;
//     rating: number;
//     is_owner:boolean;
//     photos: IPhoto[];
// }

export default function Home() {
    const {isLoading, data} = useQuery<IRoomList[]>({queryKey:["rooms"], queryFn: getRooms});

    return (
        <Grid mt={10} px={{sm:10, lg:40}} columnGap={5} rowGap={10} templateColumns={{
            sm:"1fr", 
            md:"1fr 1fr",
            lg:"repeat(3, 1fr)",
            xl:"repeat(4, 1fr)", 
            "2xl":"repeat(5, 1fr)"
        }}>
            {/* base는 핸드폰 사용자를 보기 위한 value */}

            {/* 로딩 에니메이션을 가진 컴포넌트 = Skeleton */}
            {/* <ListSkeleton /> */}

            {isLoading ? <>
            <ListSkeleton />
            <ListSkeleton />
            <ListSkeleton />
            <ListSkeleton />
            <ListSkeleton />
            <ListSkeleton />
            <ListSkeleton />
            </>
            :null }

            {data?.map((room) => <List 
                key = {room.pk}
                pk = {room.pk}
                imageUrl={room.photos[0]?.file}
                name={room.name}
                rating={room.rating}
                country={room.country}
                city={room.city}
                price={room.price}
            />)}

        </Grid>
    )
}