import {lowlight} from './lowlight'
import {toHtml} from 'hast-util-to-html'
import type { NodeProps } from '@tiptap/static-renderer'
import type { Node as PMNode } from '@tiptap/pm/model'
import {CopyIcon} from "@/shared/assets";

export function renderCodeBlock(
    {node}: NodeProps<PMNode, string | string[]>,
): string {
    const language =
        typeof node.attrs.language === 'string'
            ? node.attrs.language
            : 'plaintext'

    const code = node.textContent;

    const tree = lowlight.registered(language)
        ? lowlight.highlight(language, code)
        : lowlight.highlight('plaintext', code)

    return `<pre class="article-code"><button data-code="${encodeURIComponent(code)}" class="copy-btn"><img class="copy-image" src='${CopyIcon.src}' alt="Скопировать"></button><code class="language-${language}">${toHtml(tree)}</code></pre>`;
}