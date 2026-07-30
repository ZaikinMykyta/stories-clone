import type { Story } from "../../types/interfaces";

interface StoryButtonProps {
    vidArr: Story[];
}

const StroiesList = (props: StoryButtonProps) => {
    return (
        <>
            {props.vidArr.map((item) => {
                return (
                    <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]" 
                    key={item.id}>
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