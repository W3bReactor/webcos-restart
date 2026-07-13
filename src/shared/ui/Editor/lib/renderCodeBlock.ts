import {lowlight} from './lowlight'
import {toHtml} from 'hast-util-to-html'
import type { NodeProps } from '@tiptap/static-renderer'
import type { Node as PMNode } from '@tiptap/pm/model'

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
    console.log("Code: " + code)

    return `<pre class="article-code"><code class="language-${language}">${toHtml(tree)}</code></pre>`;
}