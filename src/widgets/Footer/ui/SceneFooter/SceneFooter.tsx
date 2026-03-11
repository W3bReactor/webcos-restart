'use client'
import React, {useEffect, useRef} from "react";
import {roundRect} from "@/widgets/Footer/lib/canvas/canvas";

export const SceneFooter = () => {
    const canvasRef = useRef<null | HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const pi = Math.PI
            const context = canvas.getContext('2d');
            if(context) {
                // Цвета для деревьев и кустов
                const colors = {
                    forestGreen: '#1B714B',
                    darkGreen: '#2B9D5E',
                    SeaGreen: '#2A9D5C',
                    mediumGreen: '#92C938',
                    lightGreen: '#ADD63A',
                    emeraldGreen: '#1CA166'
                };
                // Дом
                // Основание
                context.fillStyle = '#1A3A75';
                context.fillRect(190, 180, 400, 187);
                context.fillStyle = '#1A689C';
                context.fillRect(190, 170, 400, 10);
                // Трапеция крыши дома
                context.beginPath();
                context.fillStyle = '#8B33FF';
                context.moveTo(160, 170);
                context.lineTo(215, 70);
                context.lineTo(320, 70);
                context.lineTo(375, 170);
                context.fill();
                context.closePath()
                // Вторая трапеция дома (с тенью)
                context.beginPath();
                context.fillStyle = '#6D1CC9';
                context.moveTo(375, 170);
                context.lineTo(320, 70);
                context.lineTo(560, 70);
                context.lineTo(617, 170);
                context.fill();
                context.closePath()
                // Труба
                context.fillStyle = '#306ae5';
                context.fillRect(425, 56, 80, 90);
                context.fillStyle = '#3044e2';
                context.fillRect(420, 36, 90, 23);

                // Окно
                // Свет в окне
                context.beginPath()
                context.fillStyle = '#EEA624';
                context.ellipse(530, 260, 39, 39, 0, 0, 2*pi, true );
                context.fill()
                context.closePath()
                // Решетки в окне
                context.fillStyle = '#333333';
                context.fillRect(515, 224, 30, 2);
                context.fillRect(490, 244, 77, 2);
                context.fillRect(490, 264, 77, 2);
                context.fillRect(495, 284, 65, 2);
                context.fillRect(510, 225, 2, 70);
                context.fillRect(530, 225, 2, 75);
                context.fillRect(550, 225, 2, 70);

                // Линия вокруг окна
                context.beginPath()
                context.strokeStyle = '#4A4C4A'
                context.lineWidth = 5
                context.ellipse(530, 260, 40, 40, 0, 0, 2*pi, true );
                context.stroke()
                context.closePath()

                // Окно 2
                // Свет в окне
                context.beginPath()
                context.fillStyle = '#EEA624';
                context.ellipse(260, 247, 34, 29, 0, 0, pi, true );
                context.fill()
                context.closePath()

                context.fillStyle = '#EEA624';
                context.fillRect(225, 247, 70, 45);

                // Решетки в окне
                context.fillStyle = '#333333';
                context.fillRect(240, 220, 35, 2);
                context.fillRect(225, 241, 70, 2);
                context.fillRect(225, 268, 70, 2);
                context.fillRect(225, 288, 70, 2);

                context.fillRect(248, 215, 2, 80);
                context.fillRect(268, 215, 2, 80);


                // Линия вокруг окна
                context.beginPath()
                context.strokeStyle = '#4A4C4A'
                context.lineWidth = 5
                context.ellipse(260, 247, 35, 30, 0, 0, pi, true );
                context.stroke()
                context.closePath()

                context.beginPath();
                context.strokeStyle = '#4A4C4A'
                context.lineWidth = 5
                context.moveTo(225, 247);
                context.lineTo(225, 292);
                context.lineTo(295, 292);
                context.lineTo(295, 247);
                context.stroke();
                context.closePath()

                // Дверь
                context.beginPath()
                context.fillStyle = '#4D7FDC'
                context.ellipse(393, 280, 65, 60, 0, 0, pi, true );
                context.fill()
                context.closePath()
                context.fillRect(328, 280, 130, 87);



                // Куст
                context.beginPath()
                context.fillStyle = colors.forestGreen
                context.ellipse(125, 373, 50, 50, 0, 0, pi, true );
                context.fill()
                context.closePath()

                // Куст 2
                context.beginPath()
                context.fillStyle = colors.emeraldGreen
                context.ellipse(106, 373, 50, 50, 0, 0, pi, true );
                context.fill()
                context.closePath()
                // Базовое дерево
                // Ствол дерева
                roundRect(context,18, 330, 24,373, 7, '#9D5D5D' )
                // Задняя часть дерева
                context.beginPath()
                context.fillStyle = colors.SeaGreen
                context.ellipse(22, 310, 22, 22, 0, 0, 2*pi, true );
                context.fill()
                context.closePath()
                // Передняя часть дерева
                context.beginPath()
                context.fillStyle = colors.mediumGreen
                context.ellipse(24, 306, 17, 17, 0, 0, 2*pi, true );
                context.fill()
                context.closePath()

                // Базовое дерево 2
                // Ствол дерева
                roundRect(context,88, 264, 94,320, 7, '#9D5D5D' )
                // Задняя часть дерева
                context.beginPath()
                context.fillStyle = colors.mediumGreen
                context.ellipse(90, 243, 25, 25, 0, 0, 2*pi, true );
                context.fill()
                context.closePath()
                // Передняя часть дерева
                context.beginPath()
                context.fillStyle = colors.lightGreen
                context.ellipse(92, 240, 20, 20, 0, 0, 2*pi, true );
                context.fill()
                context.closePath()
                // Нестандартное дерево
                // Правые листья
                // 1 Лист
                roundRect(context, 623, 210, 663, 220, 7, colors.mediumGreen, 32);
                roundRect(context, 627, 207, 647, 217, 7, colors.lightGreen, 32);
                // 2 Лист
                roundRect(context, 623, 240, 670, 250, 7, colors.mediumGreen, 32);
                roundRect(context, 627, 236, 654, 246, 7, colors.lightGreen, 32);
                // 3 Лист
                roundRect(context, 623, 270, 677, 280, 7, colors.mediumGreen, 32);
                roundRect(context, 627, 265, 656, 275, 7, colors.lightGreen, 32);
                // 4 Лист
                roundRect(context, 623, 300, 684, 310, 7, colors.mediumGreen, 32);
                roundRect(context, 627, 294, 658, 304, 7, colors.lightGreen, 32);
                // 5 Лист
                roundRect(context, 623, 330, 694, 340, 7, colors.darkGreen, 32);
                roundRect(context, 623, 323, 670, 333, 7, colors.mediumGreen, 32);
                roundRect(context, 627, 318, 647, 328, 7, colors.lightGreen, 32);
                // 6 Лист
                roundRect(context, 623, 360, 701, 370, 7, colors.darkGreen, 32);
                roundRect(context, 623, 352, 673, 362, 7, colors.mediumGreen, 32);
                roundRect(context, 627, 347, 650, 357, 7, colors.lightGreen, 32);

                // Левые листья (зеркальные отражения)
                const mirrorX = 624; // Базовая точка симметрии (можно подкорректировать)

                // 1 Лист
                roundRect(context, mirrorX - (663 - 623), 211, mirrorX, 221, 7, colors.mediumGreen, -32);
                roundRect(context, mirrorX - (647 - 627), 206, mirrorX, 216, 7, colors.lightGreen, -32);
                // 2 Лист
                roundRect(context, mirrorX - (670 - 623), 241, mirrorX, 251, 7, colors.mediumGreen, -32);
                roundRect(context, mirrorX - (654 - 627), 235, mirrorX, 245, 7, colors.lightGreen, -32);
                // 3 Лист
                roundRect(context, mirrorX - (677 - 623), 271, mirrorX, 281, 7, colors.mediumGreen, -32);
                roundRect(context, mirrorX - (656 - 627), 264, mirrorX, 274, 7, colors.lightGreen, -32);
                // 4 Лист
                roundRect(context, mirrorX - (684 - 623), 301, mirrorX, 311, 7, colors.mediumGreen, -32);
                roundRect(context, mirrorX - (658 - 627), 293, mirrorX , 303, 7, colors.lightGreen, -32);
                // 5 Лист
                roundRect(context, mirrorX - (694 - 623), 331, mirrorX, 341, 7, colors.darkGreen, -32);
                roundRect(context, mirrorX - (670 - 623), 324, mirrorX, 334, 7, colors.mediumGreen, -32);
                roundRect(context, mirrorX - (647 - 627), 317, mirrorX, 327, 7, colors.lightGreen, -32);
                // 6 Лист
                roundRect(context, mirrorX - (701 - 623), 361, mirrorX, 371, 7, colors.darkGreen, -32);
                roundRect(context, mirrorX - (673 - 623), 353, mirrorX, 363, 7, colors.mediumGreen, -32);
                roundRect(context, mirrorX - (650 - 627), 346, mirrorX, 356, 7, colors.lightGreen, -32);
                // Ствол дерева
                roundRect(context,620, 200, 630,420, 7, '#C2653C' )

            }


        }

    }, []);

    return (
        <canvas width={1000} height={1000} ref={canvasRef}></canvas>
    );
}
