import type { IStory } from '../types/interfaces';

const changeFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    setVidArr: React.Dispatch<React.SetStateAction<IStory[]>>
) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && selectedFile.type.match(/^image/g)) {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result !== 'string') return;

            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                let width = img.width;
                let height = img.height;

                const MAX_WIDTH = 1080;
                const MAX_HEIGHT = 1920;

                if (width > MAX_WIDTH) {
                    height = height * (MAX_WIDTH / width);
                    width = MAX_WIDTH;
                }

                if (height > MAX_HEIGHT) {
                    width = width * (MAX_HEIGHT / height);
                    height = MAX_HEIGHT;
                }

                canvas.width = Math.round(width);
                canvas.height = Math.round(height);
                ctx.drawImage(img, 0, 0, width, height);

                const resized = canvas.toDataURL('image/jpeg', 0.8);

                const result: IStory = {
                    id: crypto.randomUUID(),
                    res: resized,
                    createdAt: Date.now(),
                    watched: false,
                };

                setVidArr((arr) => [result, ...arr]);
            };
        };
        reader.readAsDataURL(selectedFile);
    }
};

export default changeFile;
