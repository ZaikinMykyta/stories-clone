import { useEffect, useState } from 'react';
import type { StoryProps, IStory } from '../../types/interfaces';

const ShowStory = (props: StoryProps) => {
    const startIndex = props.vidArr.findIndex(item => item.id === props.startId);
    const currentIndex = props.vidArr.findIndex(item => item.id === props.id);
    const story = props.vidArr.find(item => item.id === props.id);

    const [progressbar, setProgressBar] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        setProgressBar(0);
        setIsPaused(false);
    }, [props.id]);

    useEffect(() => {
        if (props.id === '' || isPaused) return;

        const progressInterval = setInterval(() => {
            setProgressBar(num => num + 1);
        }, 50);

        return () => clearInterval(progressInterval);
    }, [props.id, isPaused]);

    useEffect(() => {
        if (progressbar !== 100) return;

        setProgressBar(0);

        if (currentIndex + 1 < props.vidArr.length) {
            props.setCurrentId(props.vidArr[currentIndex + 1].id);
        } else {
            props.setCurrentId('');
        }

        setWatched();
    }, [progressbar, props.id, currentIndex, props.vidArr]);

    const setWatched = () => {
        props.setVidArr((arr: IStory[]): IStory[] =>
            arr.map((item, i) =>
                i === currentIndex && !item.watched ? { ...item, watched: true } : item
            )
        );
    };

    const nextStory = (i: number) => {
        setWatched();
        if (i + 1 < props.vidArr.length) {
            props.setCurrentId(props.vidArr[i + 1].id);
            setProgressBar(0);
        } else {
            props.setCurrentId('');
        }
    };

    const prevStory = (i: number) => {
        setWatched();
        if (i === startIndex) {
            props.setCurrentId('');
        } else if (i > 0) {
            props.setCurrentId(props.vidArr[i - 1].id);
            setProgressBar(0);
        }
    };

    if (!story || currentIndex < 0) return null;

    const segmentCount = props.vidArr.length - startIndex;

    return (
        <div
            className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-0 backdrop-blur-md sm:p-4 md:p-6"
            onClick={() => props.setCurrentId('')}
            role="dialog"
            aria-modal="true"
            aria-label="Story viewer"
        >
            <div
                className="animate-scale-in relative h-dvh w-full max-w-none overflow-hidden bg-black sm:aspect-[9/16] sm:h-auto sm:max-h-[90dvh] sm:max-w-[420px] sm:rounded-2xl sm:shadow-2xl sm:shadow-black/60 sm:ring-1 sm:ring-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Progress bars */}
                <div className="absolute inset-x-0 top-0 z-20 flex gap-1 px-3 pb-8 pt-[max(0.75rem,env(safe-area-inset-top))] sm:gap-1.5 sm:px-4 sm:pt-4">
                    <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"
                        aria-hidden
                    />
                    {props.vidArr.slice(startIndex).map((_, segIndex) => {
                        const relativeIndex = currentIndex - startIndex;
                        let width = 0;

                        if (segIndex < relativeIndex) {
                            width = 100;
                        } else if (relativeIndex === segIndex) {
                            width = progressbar;
                        }

                        return (
                            <div
                                key={segIndex}
                                className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/25 sm:h-1"
                            >
                                <div
                                    className="h-full rounded-full bg-white transition-[width] duration-75 ease-linear"
                                    style={{ width: `${width}%` }}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Header */}
                <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-3 pt-[max(2.5rem,calc(env(safe-area-inset-top)+1.75rem))] sm:px-4 sm:pt-12">
                    <div className="flex items-center gap-2.5">
                        <div className="story-ring-unwatched size-9 rounded-full p-[2px] sm:size-10">
                            <img
                                src={story.res}
                                alt=""
                                className="size-full rounded-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white sm:text-base">Your story</p>
                            <p className="text-[10px] text-white/60 sm:text-xs">
                                {currentIndex - startIndex + 1} / {segmentCount}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:size-10"
                        onClick={() => props.setCurrentId('')}
                        aria-label="Close story"
                    >
                        <span className="material-symbols-outlined text-xl sm:text-2xl">close</span>
                    </button>
                </div>

                {/* Tap zones */}
                <button
                    type="button"
                    className="absolute bottom-0 left-0 top-0 z-20 w-1/3 cursor-pointer border-none bg-transparent p-0 sm:w-1/4"
                    onClick={() => prevStory(currentIndex)}
                    aria-label="Previous story"
                />
                <button
                    type="button"
                    className="absolute bottom-0 right-0 top-0 z-20 w-1/3 cursor-pointer border-none bg-transparent p-0 sm:w-1/4"
                    onClick={() => nextStory(currentIndex)}
                    aria-label="Next story"
                />

                {/* Story image */}
                <button
                    type="button"
                    className="relative z-10 flex size-full cursor-pointer items-center justify-center border-none bg-black p-0"
                    onClick={() => setIsPaused(prev => !prev)}
                    aria-label={isPaused ? 'Resume story' : 'Pause story'}
                >
                    <img
                        src={story.res}
                        alt="Story content"
                        className="size-full object-contain"
                        draggable={false}
                    />

                    {isPaused && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30">
                            <span className="flex size-16 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm sm:size-20">
                                <span className="material-symbols-outlined text-4xl sm:text-5xl">play_arrow</span>
                            </span>
                        </div>
                    )}
                </button>

                {/* Desktop nav hints */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-1/4 items-center justify-start pl-3 sm:flex">
                    <span className="rounded-full bg-black/40 px-2 py-1 text-2xl text-white/50 backdrop-blur-sm">
                        ‹
                    </span>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-1/4 items-center justify-end pr-3 sm:flex">
                    <span className="rounded-full bg-black/40 px-2 py-1 text-2xl text-white/50 backdrop-blur-sm">
                        ›
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ShowStory;
