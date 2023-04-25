import Review from "./Review";
import React, { useEffect, useState } from "react";
import { PlaceDetailProps } from "../PlanTab/PlanTabTypes";
import { getPlanTabDispatch, getPlanTabState } from "../PlanTab/PlanTabContext";
import Stars from "@/components/Stars";
import CloseIcon from "@mui/icons-material/Close";

const PlaceDetail = (props: PlaceDetailProps) => {
    const { isBigScreen, placeData: data } = getPlanTabState();
    const [reviewData, setReviewData] = useState([]);
    const dispatch: any = getPlanTabDispatch();
    // const data = placeData;

    const fetchReview = async (loc_id: string) => {
        const res = await fetch(`/api/getReview/?loc_id=${loc_id}`);
        const plan = await res.json();
        return plan;
    };
    useEffect(() => {
        (async () => {
            fetchReview(data?.loc_id).then((result: any) => {
                setReviewData(result);
            });
        })();
    }, [data]);

    return (
        <>
            <div
                className={
                    isBigScreen
                        ? "bg-black rounded-full w-10 h-10 text-center text-white absolute flex items-center top-[13vh] left-[57%] z-50 cursor-pointer"
                        : "bg-black rounded-full w-10 h-10 text-center text-white absolute flex items-center top-[15vh] left-[89vw]  z-50 cursor-pointer  "
                }
                onMouseDown={() => {
                    dispatch({
                        type: "SET",
                        payload: { property: "openReview", value: false },
                    });
                }}
            >
                <div className="ml-4 text-center">x</div>
            </div>
            <div
                className={
                    isBigScreen
                        ? "bg-white rounded-xl h-[70%] w-[50%] absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2  overflow-y-scroll overflow-x-hide scrollbar-hide  animate-fade-in "
                        ? "absolute bg-white rounded-xl h-[70%] w-[50%] top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2  overflow-y-scroll overflow-x-hide scrollbar-hide  animate-fade-in "
                        : "bg-white rounded-xl h-[45vh] w-[85vw] absolute top-[17vh]  transform translate-x-[10%] overflow-y-scroll overflow-x-hide scrollbar-hide  animate-fade-in p-2"
                }
            >
                <button
                    className="absolute right-0 z-10 m-3 hover:bg-gray-100 h-8 w-8 p-2 rounded-full duration-300 text-[#45D8D0] text-sm flex justify-center items-center bg-none bg-opacity-50"
                    onClick={() => dispatch({ type: "TOGGLE_PLACE_DETAILS" })}
                >
                    <>
                        <CloseIcon sx={{ height: "20px" }} />
                    </>
                </button>
                {!isBigScreen && (
                    <img
                        src={data?.url}
                        className="rounded-xl border-2 bg-blue-100 w-[90%]  translate-x-[5.5vw]  "
                    />
                )}
                <div className="grid grid-cols-12 p-6 gap-6 ">
                    {isBigScreen && (
                        <img
                            src={data?.url.split(",")[0]}
                            className="rounded-xl border-2 bg-blue-100 col-span-7 "
                        />
                    )}

                    <div className="flex col-span-5 flex-col gap-2">
                        <div
                            className={
                                isBigScreen
                                    ? "text-2xl font-extrabold "
                                    : "text-2xl font-extrabold w-[80vw]"
                            }
                        >
                            {data?.loc_name}
                        </div>
                        <div className="text-xs">{props.address}</div>

                        <Stars rating={data?.rating} size={20} />

                        <div
                            className={
                                isBigScreen
                                    ? "text-[0.8rem] col-span-12 mt-2"
                                    : "text-[0.8rem] w-[80vw]"
                            }
                        >
                            <div className="text-[0.8rem] font-bold">
                                Description
                            </div>
                            {data?.description
                                ? data?.description
                                : "No description provided"}

                            <div className="text-[0.8rem] font-bold mt-2">
                                Address
                            </div>
                            {data?.address && data?.province
                                ? data?.address + " " + data?.province
                                : "No address provided"}
                        </div>
                        <div className="text-[0.8rem] col-span-12">
                            {"Price Level: " + data?.price_level}
                        </div>
                    </div>

                    {reviewData?.map((review: any) => {
                        return (
                            <>
                                <Review
                                    review={{
                                        ...review,
                                    }}
                                />
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default PlaceDetail;
