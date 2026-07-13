import { renderToHTMLString } from '@tiptap/static-renderer/pm/html-string'
import { editorExtensions } from '@/shared/ui/Editor/lib/extensions'
import {JSONContent} from "@tiptap/core";
import {renderCodeBlock} from "@/shared/ui/Editor/lib/renderCodeBlock";

export function renderArticle(content: JSONContent) {
    return renderToHTMLString({
        content,
        extensions: editorExtensions,
        options: {
            nodeMapping: {
                codeBlock: renderCodeBlock,
            },
        },
    })
}