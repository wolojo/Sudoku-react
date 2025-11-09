import { Hints } from '../Components/components.types';

// Return a shallow clone of hints typed as Hints
export function cloneHints(h: Hints): Hints {
    return [...h] as Hints;
}

// Toggle a hint at index (0..8) and return new Hints
export function toggleHint(h: Hints, i: number): Hints {
    const next = cloneHints(h);
    next[i] = !next[i];
    return next;
}

// Clear a specific hint (set to false) and return new Hints
export function clearHint(h: Hints, i: number): Hints {
    const next = cloneHints(h);
    next[i] = false;
    return next;
}
