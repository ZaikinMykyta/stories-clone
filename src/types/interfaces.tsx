export interface IStory {
    id: string,
    res: string,
    createdAt: number,
    watched: boolean
}

export interface StoryProps {
    id: string,
    startId: string,
    vidArr: IStory[],
    setCurrentId: React.Dispatch<React.SetStateAction<string>>,
    setVidArr: React.Dispatch<React.SetStateAction<IStory[]>>
}

export interface StoryListProps {
    vidArr: IStory[],
    setCurrentId: React.Dispatch<React.SetStateAction<string>>,
    setStartId: React.Dispatch<React.SetStateAction<string>>
}