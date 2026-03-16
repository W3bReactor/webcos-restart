export const getDate = (date: Date): string => {
    return new Intl.DateTimeFormat('ru-RU', {  year: 'numeric', month: 'numeric', day: 'numeric'}).format(date)
}