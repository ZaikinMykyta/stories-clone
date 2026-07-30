import {useEffect, useRef, useState} from 'react';
import StroiesList from '../StoriesList/StoriesList';
import changeFile from '../../services/changeFile';
import ShowStory from '../ShowStory/ShowStory';
import type { IStory } from '../../types/interfaces';

function App() {
    const [vidArr, setVidArr] = useState<IStory[]>([]);
    const [currentId, setCurrentId] = useState('');
    const [startId, setStartId] = useState("");
    const isFirstRender = useRef(true);

    useEffect(()=>{
        const stories = localStorage.getItem("story");

        if (!stories) return;

        const DAY = 24 * 60 * 60 * 1000;

        const parsed: IStory[] = JSON.parse(stories);

        const validStories = parsed.filter(
            story => Date.now() - story.createdAt < DAY
        );

        setVidArr(validStories);
        localStorage.setItem("story", JSON.stringify(validStories));
    }, [])

    useEffect(() => {
        if(isFirstRender.current) {
            isFirstRender.current = false;
            return
        }
        localStorage.setItem("story", JSON.stringify(vidArr));
    },[vidArr])

    const story = currentId ? <ShowStory id={currentId} startId={startId} setCurrentId={setCurrentId} vidArr={vidArr} setVidArr={setVidArr}/> : null;

    return (
        <div className="border-x-2 mt-[2vh] border-white rounded-sm flex justify-center w-[80vw] mx-auto h-[30vh]">
            <div className="border-y-1 border-white h-[6vh] flex gap-2 items-center w-[75vw] mt-[3vh]">
                <label className="rounded-full cursor-pointer flex justify-center items-center
                border-1 border-white text-white h-[50px] w-[50px] text-3xl">
                    <span className="material-symbols-outlined">
                    add
                    </span>
                    <input type="file" 
                    accept='.png,.jpg,.jpeg'
                    className="text-black hidden" 
                    onChange={(e) => {changeFile(e, setVidArr)}}>
                    </input>
                </label>
                <StroiesList vidArr={vidArr} setStartId={setStartId} setCurrentId={setCurrentId}/>
                {story}
            </div>
        </div>
    )
}

export default App