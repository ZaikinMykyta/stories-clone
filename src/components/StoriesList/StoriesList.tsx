import type { StoryListProps } from '../../types/interfaces';

const StoriesList = (props: StoryListProps) => {
    return (
        <>
            {props.vidArr.map((item) => (
                <button
                    key={item.id}
                    type="button"
                    className="group flex shrink-0 cursor-pointer flex-col items-center gap-1.5 border-none bg-transparent p-0 sm:gap-2"
                    onClick={() => {
                        props.setCurrentId(item.id);
                        props.setStartId(item.id);
                    }}
                    aria-label={`View story ${item.id.slice(0, 8)}`}
                >
                    <span
                        className={`flex size-[4.25rem] rounded-full p-[2.5px] transition-transform duration-200 group-hover:scale-105 group-active:scale-95 sm:size-[4.75rem] ${
                            item.watched ? 'story-ring-watched' : 'story-ring-unwatched'
                        }`}
                    >
                        <span className="size-full rounded-full bg-[#141414] p-[2.5px]">
                            <img
                                src={item.res}
                                alt=""
                                className="size-full rounded-full object-cover"
                            />
                        </span>
                    </span>
                    <span className="max-w-[4.25rem] truncate text-[10px] font-medium text-zinc-400 sm:max-w-[4.75rem] sm:text-xs">
                        {item.watched ? 'Seen' : 'New'}
                    </span>
                </button>
            ))}
        </>
    );
};

export default StoriesList;
