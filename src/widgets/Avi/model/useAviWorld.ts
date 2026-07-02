'use client';

import {usePathname} from 'next/navigation';
import {useEffect} from 'react';

import {AviWorldEntity, AviWorldEntityType, useAviStore} from './aviStore';

const WORLD_SELECTOR=[
    'article',
    'button',
    'a[href]',
    'h1',
    'h2',
    'h3',
    '[class*="card" i]',
    '[class*="project" i]',
    '[class*="blog" i]',
].join(',');


const MAX_WORLD_ENTITIES = 28;

function getEntityType(element: Element): AviWorldEntityType {
    const tagName = element.tagName.toLowerCase();
    const role = element.getAttribute('role');
    const className = typeof element.className === 'string' ? element.className.toLowerCase() : '';

    if (tagName === 'nav' || role === 'navigation') {
        return 'navigation';
    }

    if (tagName === 'article') {
        return 'article';
    }

    if (tagName === 'button' || role === 'button' || ['input', 'textarea', 'select'].includes(tagName)) {
        return 'button';
    }

    if (tagName === 'a') {
        return 'link';
    }

    if (tagName === 'form') {
        return 'form';
    }

    if (tagName === 'img') {
        return 'media';
    }

    if (['h1', 'h2', 'h3'].includes(tagName)) {
        return 'heading';
    }

    if (
        className.includes('card') ||
        className.includes('item') ||
        className.includes('project') ||
        className.includes('blog') ||
        className.includes('banner')
    ) {
        return 'card';
    }

    return 'section';
}

function getElementLabel(element: Element, type: AviWorldEntityType) {
    const ariaLabel = element.getAttribute('aria-label');
    const title = element.getAttribute('title');
    const heading = element.querySelector('h1, h2, h3');
    const text = (ariaLabel || title || heading?.textContent || element.textContent || '').replace(/\s+/g, ' ').trim();

    if (text) {
        return text.slice(0, 72);
    }

    if (type === 'media') {
        return element.getAttribute('alt') || 'quiet image';
    }

    return type;
}

function scoreElement(element: Element, type: AviWorldEntityType, rect: DOMRect) {
    const viewportArea = Math.max(window.innerWidth * window.innerHeight, 1);
    const areaScore = Math.min((rect.width * rect.height) / viewportArea, 0.35);
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceFromCenter = Math.hypot(centerX - window.innerWidth / 2, centerY - window.innerHeight / 2);
    const centerScore = Math.max(0, 1 - distanceFromCenter / Math.max(window.innerWidth, window.innerHeight));

    const typeScore: Record<AviWorldEntityType, number> = {
        article: 0.95,
        card: 0.85,
        heading: 0.78,
        button: 0.76,
        form: 0.72,
        link: 0.62,
        navigation: 0.58,
        media: 0.52,
        section: 0.45,
    };

    const hasText = (element.textContent || '').trim().length > 12 ? 0.08 : 0;

    return typeScore[type] + areaScore + centerScore * 0.25 + hasText;
}

function isVisibleElement(element: Element, rect: DOMRect) {
    const style = window.getComputedStyle(element);

    if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) {
        return false;
    }

    if (rect.width < 24 || rect.height < 18) {
        return false;
    }

    const pageHeight=
        document.body.scrollHeight;

    const pageWidth=
        document.body.scrollWidth;

    if(
        rect.bottom+window.scrollY<0||
        rect.right+window.scrollX<0||
        rect.top+window.scrollY>pageHeight||
        rect.left+window.scrollX>pageWidth
    ){

        return false;

    }

    return true;
}

function buildEntity(
    element: Element,
    index: number
): AviWorldEntity | null {

    const rect =
        element.getBoundingClientRect();

    if(
        !isVisibleElement(
            element,
            rect
        )
    ){
        return null;
    }

    const type=
        getEntityType(
            element
        );

    const text=
        (
            element.textContent||''
        )
            .replace(/\s+/g,' ')
            .trim();

    // пропускаем огромные контейнеры
    if(
        rect.width >
        window.innerWidth*0.9 &&
        rect.height >
        window.innerHeight*0.6
    ){
        return null;
    }

    // пропускаем пустые
    if(
        text.length<3
    ){
        return null;
    }

    const label=
        getElementLabel(
            element,
            type
        );

    const href=
        element instanceof HTMLAnchorElement
            ? element.pathname
            : undefined;
    const stableId =

        element.id ||

        element.getAttribute(
            'data-avi-id'
        ) ||

        `${type}-${label}`;
    return{

        id: stableId,

        href,

        type,

        label,

        text,

        position:{

            x:
                rect.left+
                rect.width/2,

            y:
                rect.top+
                rect.height/2
        },

        rect:{

            width:
            rect.width,

            height:
            rect.height

        },

        score:
            scoreElement(
                element,
                type,
                rect
            )

    };
}

function scanWorld() {
    const seen = new Set<string>();

    return Array.from(document.querySelectorAll(WORLD_SELECTOR))
        .map(buildEntity)
        .filter((entity): entity is AviWorldEntity => Boolean(entity))
        .filter((entity) => {
            if (seen.has(entity.id)) {
                return false;
            }

            seen.add(entity.id);
            return true;
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_WORLD_ENTITIES);
}

export function useAviWorld() {
    const pathname = usePathname() ?? '/';
    const setWorld = useAviStore((state) => state.setWorld);

    useEffect(() => {
        let raf = 0;
        let timeout = 0;

        const updateWorld = () => {
            cancelAnimationFrame(raf);

            raf = requestAnimationFrame(() => {
                setWorld(scanWorld());
            });
        };

        updateWorld();
        timeout = window.setTimeout(updateWorld, 650);

        window.addEventListener('resize', updateWorld);
        window.addEventListener('scroll', updateWorld, {passive: true});

        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(timeout);
            window.removeEventListener('resize', updateWorld);
            window.removeEventListener('scroll', updateWorld);
        };
    }, [pathname, setWorld]);
}
