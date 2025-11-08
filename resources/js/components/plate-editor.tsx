'use client';

import { Plate, usePlateEditor } from 'platejs/react';

import { EditorKit } from '@/components/editor-kit';
import { Editor, EditorContainer } from '@/components/ui/editor';

export function PlateEditor() {
    const editor = usePlateEditor({
        plugins: EditorKit,
    });

    return (
        <Plate editor={editor}>
            <EditorContainer className="rounded-md border border-input px-3 py-2">
                <Editor
                    className="min-h-[200px] p-0 sm:p-0"
                    variant="default"
                />
            </EditorContainer>
        </Plate>
    );
}
