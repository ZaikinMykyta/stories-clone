import type { IStory } from '../types/interfaces';

const changeFile = (e: React.ChangeEvent<HTMLInputElement>, setVidArr: React.Dispatch<React.SetStateAction<IStory[]>>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && selectedFile.type.match(/^image/g)) {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result !== "string") return;

            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                const canvas = document.createElement("canvas");

                const ctx = canvas.getContext("2d");

                if (!ctx) return;

                let width = img.width;
                let height = img.height;

                const MAX_WIDTH = 1080;
                const MAX_HEIGHT = 1920;

                if(width > MAX_WIDTH) {
                    height = height * (MAX_WIDTH / width );
                    width = MAX_WIDTH
                }

                if(height > MAX_HEIGHT) {
                    width = width * (MAX_WIDTH / height);
                    height = MAX_HEIGHT;
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                const resized = canvas.toDataURL("image/jpeg", 1);

                const result = {
                    id: crypto.randomUUID(),
                    res: resized as string,
                    createdAt: Date.now(),
                    watched: false
                };

                setVidArr((arr) => {
                    const updated = [result, ...arr];

                    localStorage.setItem('story', JSON.stringify(updated))

                    return updated;
                });
            };
        };
        reader.readAsDataURL(selectedFile);
    }
}

export default changeFile;