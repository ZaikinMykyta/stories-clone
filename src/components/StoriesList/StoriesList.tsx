import type { StoryListProps } from "../../types/interfaces";

const StroiesList = (props: StoryListProps) => {
    return (
        <>
            {props.vidArr.map((item) => {
                return (
                    <div className={`w-13 h-13 cursor-pointer rounded-full ${ item.watched ? "bg-zinc-500" : "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"} p-[2px]`} 
                    key={item.id}
                    id={item.id}
                    onClick={() => {props.setCurrentId(item.id), props.setStartId(item.id)}}>
                        <div className="w-full h-full rounded-full bg-black p-[2px]">
                            <img
                                src={item.res}
                                alt=""
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default StroiesList;