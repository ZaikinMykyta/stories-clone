import { useEffect, useRef, useState } from 'react';
import StoriesList from '../StoriesList/StoriesList';
import changeFile from '../../services/changeFile';
import ShowStory from '../ShowStory/ShowStory';
import type { IStory } from '../../types/interfaces';

function App() {
    const [vidArr, setVidArr] = useState<IStory[]>([]);
    const [currentId, setCurrentId] = useState('');
    const [startId, setStartId] = useState('');
    const isFirstRender = useRef(true);

    useEffect(() => {
        const stories = localStorage.getItem('story');
        if (!stories) return;

        const DAY = 24 * 60 * 60 * 1000;
        const parsed: IStory[] = JSON.parse(stories);
        const validStories = parsed.filter(
            story => Date.now() - story.createdAt < DAY
        );

        setVidArr(validStories);
        localStorage.setItem('story', JSON.stringify(validStories));
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        localStorage.setItem('story', JSON.stringify(vidArr));
    }, [vidArr]);

    return (
        <div className="flex min-h-dvh flex-col">
            <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0a]/80 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
                <div className="mx-auto flex max-w-3xl items-center justify-between">
                    <h1 className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-lg font-bold tracking-tight text-transparent sm:text-xl">
                        Stories
                    </h1>
                    <span className="text-xs text-zinc-500 sm:text-sm">
                        {vidArr.length > 0
                            ? `${vidArr.length} ${vidArr.length === 1 ? 'story' : 'stories'}`
                            : 'Add your first story'}
                    </span>
                </div>
            </header>

            <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-5 sm:px-6 sm:py-8">
                <section className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 shadow-2xl shadow-purple-950/20 backdrop-blur-sm sm:p-6">
                    <p className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-500">
                        Your stories
                    </p>

                    <div className="stories-scroll flex items-center gap-3 overflow-x-auto pb-1 sm:gap-4">
                        <label
                            className="group flex shrink-0 cursor-pointer flex-col items-center gap-1.5 sm:gap-2"
                            aria-label="Add story"
                        >
                            <span className="story-ring-unwatched flex size-[4.25rem] items-center justify-center rounded-full p-[2.5px] transition-transform duration-200 group-hover:scale-105 group-active:scale-95 sm:size-[4.75rem]">
                                <span className="flex size-full items-center justify-center rounded-full bg-[#141414] transition-colors group-hover:bg-[#1a1a1a]">
                                    <span className="material-symbols-outlined text-2xl text-white sm:text-3xl">
                                        add
                                    </span>
                                </span>
                            </span>
                            <span className="max-w-[4.25rem] truncate text-[10px] font-medium text-zinc-400 sm:max-w-[4.75rem] sm:text-xs">
                                Add
                            </span>
                            <input
                                type="file"
                                accept=".png,.jpg,.jpeg"
                                className="hidden"
                                onChange={(e) => changeFile(e, setVidArr)}
                            />
                        </label>

                        <StoriesList
                            vidArr={vidArr}
                            setStartId={setStartId}
                            setCurrentId={setCurrentId}
                        />
                    </div>

                    {vidArr.length === 0 && (
                        <div className="mt-6 rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-8 text-center sm:py-10">
                            <p className="text-sm text-zinc-400 sm:text-base">
                                Tap <span className="font-medium text-zinc-300">+</span> to share a photo
                            </p>
                            <p className="mt-1 text-xs text-zinc-600">
                                Stories disappear after 24 hours
                            </p>
                        </div>
                    )}
                </section>
            </main>

            {currentId && (
                <ShowStory
                    id={currentId}
                    startId={startId}
                    setCurrentId={setCurrentId}
                    vidArr={vidArr}
                    setVidArr={setVidArr}
                />
            )}
        </div>
    );
}

export default App;
