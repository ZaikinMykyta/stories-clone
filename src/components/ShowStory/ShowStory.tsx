import { useEffect, useState } from "react";
import type { StoryProps, IStory } from "../../types/interfaces";

const ShowStory = (props: StoryProps) => {
    const startIndex = props.vidArr.findIndex(item => item.id === props.startId);
    const currentIndex = props.vidArr.findIndex(
        item => item.id === props.id
    );

    const [progressbar, setProgressBar] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(()=>{
        if(props.id == "" || isPaused) return;
        
        const progressInterval = setInterval(() => {
            setProgressBar(num => num+1)
        }, 50);

        return () => {
            clearInterval(progressInterval)
        }
    }, [props.id, isPaused])

    useEffect(()=>{
        if (progressbar !== 100) return;

        setProgressBar(0);

        if(currentIndex + 1 < props.vidArr.length) {
            props.setCurrentId(props.vidArr[currentIndex+1].id);
        } else {
            props.setCurrentId("");
        }

        setWatched();
    }, [progressbar])

    const setWatched = () => {
        props.setVidArr((arr: IStory[]): IStory[] => {
            return arr.map((item, i) => {
                return i === currentIndex && item.watched === false ? { ...item, watched: true } : item
            });
        })
    }

    const nexStory = (i:number) => {
        setWatched();
        if(i + 1 < props.vidArr.length) {
            props.setCurrentId(props.vidArr[i+1].id)
            setProgressBar(0);
        } else if (i + 2 > props.vidArr.length) {
            props.setCurrentId('')
        }
    }

    const prevStory = (i:number) => {
        setWatched();
        if(i === startIndex) {
            props.setCurrentId('')
        } else if (i > 0 && i < props.vidArr.length) {
            props.setCurrentId(props.vidArr[i-1].id)
            setProgressBar(0);
        }
    }

    return(
        <>
            {props.vidArr.map((item,i) => {
                if(item.id === props.id) {
                    return (
                        <div
                            key={i}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                            onClick={() => props.setCurrentId("")}
                        >
                            <div
                                className="relative w-[420px] h-[760px] rounded-xl overflow-hidden bg-black"
                                onClick={(e) => {e.stopPropagation()}}
                            >
                                <div className="absolute top-0 left-0 right-0 z-20 p-3 bg-black/[0.25] gap-2 flex">
                                    {props.vidArr.slice(startIndex).map((_, i) => {
                                        let width = 0;
                                        const relativeIndex = currentIndex - startIndex;

                                        if(i < relativeIndex){
                                            width = 100;
                                        } else if (relativeIndex === i) {
                                            width = progressbar
                                        }

                                        return (
                                            <div 
                                            key={i}
                                            className={`h-1 w-[${100 / props.vidArr.length}%] flex-1 z-21 rounded-full bg-white/30`}>
                                                <div className="h-full rounded-full bg-white" 
                                                     style={{width: `${width}%`}}/>
                                            </div>
                                        )
                                    })}
                                </div>

                                <button
                                    className="absolute right-3 top-10 z-30 text-3xl text-white"
                                    onClick={() => props.setCurrentId("")}
                                >
                                    ✕
                                </button>

                                <button
                                    className="absolute left-0 top-0 z-20 flex h-full w-1/4 items-center justify-start pl-4 text-5xl text-white/70 hover:text-white"
                                    onClick={() => prevStory(i)}
                                >
                                    ‹
                                </button>

                                <button
                                    className="absolute right-0 top-0 z-20 flex h-full w-1/4 items-center justify-end pr-4 text-5xl text-white/70 hover:text-white"
                                    onClick={() => nexStory(i)}
                                >
                                    ›
                                </button>

                                <img
                                    onClick={() => setIsPaused((bool) => !bool)}
                                    src={item.res}
                                    alt=""
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        </div>
                    );
                }
            })}
        </>
    )
};

export default ShowStory;