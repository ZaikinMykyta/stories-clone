import type { IStory } from '../types/interfaces';

const STORAGE_KEY = 'story';
const DAY_MS = 24 * 60 * 60 * 1000;

export type StorageSaveResult =
    | { ok: true }
    | { ok: false; reason: 'quota' | 'unknown' };

export function isQuotaExceededError(error: unknown): boolean {
    return (
        error instanceof DOMException &&
        (error.name === 'QuotaExceededError' || error.code === 22)
    );
}

export function loadStories(): IStory[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];

        const parsed: unknown = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];

        const validStories = parsed.filter(isValidStory).filter(
            story => Date.now() - story.createdAt < DAY_MS
        );

        saveStories(validStories);
        return validStories;
    } catch {
        return [];
    }
}

export function saveStories(stories: IStory[]): StorageSaveResult {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
        return { ok: true };
    } catch (error) {
        if (isQuotaExceededError(error)) {
            return { ok: false, reason: 'quota' };
        }
        return { ok: false, reason: 'unknown' };
    }
}

function isValidStory(value: unknown): value is IStory {
    if (typeof value !== 'object' || value === null) return false;

    const story = value as Record<string, unknown>;
    return (
        typeof story.id === 'string' &&
        typeof story.res === 'string' &&
        typeof story.createdAt === 'number' &&
        typeof story.watched === 'boolean'
    );
}
