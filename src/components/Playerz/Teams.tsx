import React from "react";
import teamImage from "@/Assets/team.webp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { get, imageUrl } from "@/ApisRequests/server";
import SetTemParams from "./Client/SetTemParams";
interface teamsType {
  _id: string;
  name: string;
  team_bg_image: string;
  sport: string;
}
import bg from "@/Assets/bg.webp";
import { Tooltip } from "antd";
const Teams = async () => {
  const [data, meta] = await getTeam();
  return (
    <Carousel className="w-full">
      <CarouselPrevious className={`md:-left-4 left-0 z-50`} />
      <CarouselContent className="flex items-center justify-center">
        {data &&
          Array.isArray(data) &&
          data?.map((team: teamsType) => (
            <CarouselItem
              key={team._id}
              className="basis-1/4  cursor-pointer md:basis-1/7 lg:basis-1/12 "
            >
              <Tooltip placement="top" title={team?.name}>
                <div className="relative hover:bg-slate-100 flex items-center justify-center flex-col">
                  <Image
                    src={
                      team?.team_bg_image ? imageUrl(team?.team_bg_image) : bg
                    } 
                    alt={team.name}
                    className=" w-[80px] h-[80px] object-contain"
                    height={100}
                    width={100}
                  />
                  <p className="text-sm">{team?.name?.slice(0, 10)}..</p>
                  <SetTemParams ParamKey="team" value={team?._id} />
                </div>
              </Tooltip>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselNext className={`md:-right-4 right-0`} />
    </Carousel>
  );
};

export default Teams;
const getTeam = async () => {
  const res = await get("/team/get-all?limit=999999999");
  return [res.data?.result, res.data?.meta];
};
