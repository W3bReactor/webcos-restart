interface Article {
    title: string;
    description: string;
    content: string;
    bannerTitle: string;
    bannerSupTitle: string;
    bannerBtnText: string;
}
export const validateArticle= (body: Article) => {
    if(!body.title) {
        return 'Заполните заголовок'
    }

    if(!body.description) {
        return 'Заполните описание'
    }

    if(!body.content) {
        return 'Заполните контент статьи'
    }

    if(!body.bannerTitle) {
        return 'Заполните заголовок баннера'
    }

    if(!body.bannerSupTitle) {
        return 'Заполните надзаголовок баннера'
    }

    if(!body.bannerBtnText) {
        return 'Заполните текст кнопки'
    }
}