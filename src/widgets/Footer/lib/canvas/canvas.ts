type InRad = (num: number) => number

export const inRad: InRad = (num) => {
    // Нахождение угла через радианы
    return num * Math.PI / 180;
}

type RoundRect = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, radius: number, color: string, rotate?: number) => void

export const roundRect: RoundRect = (ctx, x1, y1, x2, y2, radius, color, rotate = 0) => {
    // Вычисляем ширину и высоту прямоугольника
    const width = x2 - x1;
    const height = y2 - y1;

    // Центр прямоугольника (точка вращения)
    const centerX = x1 + width / 2;
    const centerY = y1 + height / 2;

    // Сохраняем текущее состояние канваса (чтобы не сломать другие рисования)
    ctx.save();

    // 1. Переносим начало координат в центр прямоугольника
    ctx.translate(centerX, centerY);

    // 2. Поворачиваем (если угол задан)
    if (rotate) {
        ctx.rotate(inRad(rotate));
    }

    // 3. Рисуем прямоугольник относительно центра
    radius = Math.min(radius, width / 2, height / 2); // Корректируем радиус, если он слишком большой
    ctx.beginPath();
    ctx.fillStyle = color;

    // Верхняя грань
    ctx.moveTo(-width / 2 + radius, -height / 2);
    ctx.lineTo(width / 2 - radius, -height / 2);
    ctx.arcTo(width / 2, -height / 2, width / 2, -height / 2 + radius, radius);

    // Правая грань
    ctx.lineTo(width / 2, height / 2 - radius);
    ctx.arcTo(width / 2, height / 2, width / 2 - radius, height / 2, radius);

    // Нижняя грань
    ctx.lineTo(-width / 2 + radius, height / 2);
    ctx.arcTo(-width / 2, height / 2, -width / 2, height / 2 - radius, radius);

    // Левая грань
    ctx.lineTo(-width / 2, -height / 2 + radius);
    ctx.arcTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2, radius);

    ctx.fill();
    ctx.closePath();

    // 4. Восстанавливаем состояние канваса (убираем трансформации)
    ctx.restore();
};

type DrawMountain = (ctx: CanvasRenderingContext2D, baseLeftX: number, baseLeftY: number, peakX: number, peakY: number, baseRightX: number, baseRightY: number, mountainColor: string, snowColor: string, snowWidth: number  ) => void

export const  drawMountain: DrawMountain = (ctx, baseLeftX, baseLeftY, peakX, peakY, baseRightX, baseRightY, mountainColor = '#572D5B', snowColor = '#CEEAF6', snowWidth = 130) => {
    // Рисуем основу горы
    ctx.beginPath();
    ctx.fillStyle = mountainColor;
    ctx.moveTo(baseLeftX, baseLeftY);
    ctx.lineTo(peakX, peakY);
    ctx.lineTo(baseRightX, baseRightY);
    ctx.fill();
    ctx.closePath();

    // Рисуем заснеженную вершину
    const snowHeight = peakY + 80; // Высота снежной шапки
    const snowPoints = [];

    // Генерируем зубцы снежной шапки
    for (let x = peakX - snowWidth/3; x <= peakX + snowWidth/3; x += 15) {
        const yOffset = Math.random() * 20 - 5; // Случайные колебания
        snowPoints.push({
            x: x,
            y: snowHeight + Math.abs(x - peakX) * 0.5 + yOffset
        });
    }

    ctx.beginPath();
    ctx.fillStyle = snowColor;
    ctx.moveTo(peakX - snowWidth/2, snowHeight);

    // Рисуем зубчатую линию снега
    for (const point of snowPoints) {
        ctx.lineTo(point.x, point.y);
    }

    ctx.lineTo(peakX + snowWidth/2, snowHeight);
    ctx.lineTo(peakX, peakY);

    ctx.fill();

    ctx.closePath();
}