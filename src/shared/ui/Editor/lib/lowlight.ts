import { common, createLowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import yaml from 'highlight.js/lib/languages/yaml'
import sql from 'highlight.js/lib/languages/sql'
import java from 'highlight.js/lib/languages/java'
import kotlin from 'highlight.js/lib/languages/kotlin'
import go from 'highlight.js/lib/languages/go'
import python from 'highlight.js/lib/languages/python'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import nginx from 'highlight.js/lib/languages/nginx'
import markdown from 'highlight.js/lib/languages/markdown'
import diff from 'highlight.js/lib/languages/diff'
import ini from 'highlight.js/lib/languages/ini'
import php from 'highlight.js/lib/languages/php'

export const lowlight = createLowlight(common)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
lowlight.register('bash', bash)
lowlight.register('json', json)
lowlight.register('yaml', yaml)
lowlight.register('sql', sql)
lowlight.register('java', java)
lowlight.register('kotlin', kotlin)
lowlight.register('go', go)
lowlight.register('python', python)
lowlight.register('dockerfile', dockerfile)
lowlight.register('nginx', nginx)
lowlight.register('markdown', markdown)
lowlight.register('diff', diff)
lowlight.register('ini', ini)
lowlight.register('php', php)

lowlight.registerAlias({
    javascript: ['js', 'jsx'],
    typescript: ['ts', 'tsx'],
})