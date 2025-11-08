import { InteractiveViewer } from '../interactive-viewer';

function isValidJSON(str: string): boolean {
    try {
        const parsed = JSON.parse(str);
        return Array.isArray(parsed) && parsed.length > 0;
    } catch {
        return false;
    }
}

// Komponen untuk menampilkan deskripsi
export function DisplayDescription({ description }: { description: string }) {
    if (!isValidJSON(description)) {
        return <div className="whitespace-pre-wrap">{description}</div>;
    }

    const content = JSON.parse(description);

    return <InteractiveViewer value={content} />;
}
