//aqee
//ref: drawLine(...) in \pxt-common-packages\libs\screen\image.cpp 

const yList: number[][] = []

function init(X0: number, Y0: number, X1: number, Y1: number) {
    let x: number, y: number
    let x0: number, y0: number
    let x1: number, y1: number
    let dx: number, dy: number
    let yi: number, xi: number
    let D: number

    if (X1 < X0)
        x0 = X1, y0 = Y1, x1 = X0, y1 = Y0
    else
        x0 = X0, y0 = Y0, x1 = X1, y1 = Y1

    dx = x1 - x0
    dy = y1 - y0
    y = y0
    x = x0

    if (Math.abs(dy) < dx) {
        yi = 1
        if (dy < 0) {
            yi = -1
            dy = -dy
        }
        D = 2 * dy - dx
        dx <<= 1
        dy <<= 1
        while (x <= x1 && x < 160) {
            // console.log(x)
            if (y < yList[x][0]) yList[x][0] = y
            if (y > yList[x][1]) yList[x][1] = y
            if (D > 0) {
                y += yi;
                D -= dx;
            }
            D += dy;
            ++x
        }
    } else {
        xi = 1
        if (dx < 0) {//should not hit
            xi = -1
            dx = -dx
            game.showLongText("error dx<0 " + [x0, y0, x1, y1].join(), DialogLayout.Bottom)
        }
        if (dy < 0) {
            D = 2 * dx + dy
            dx <<= 1
            dy <<= 1
            while (y >= y1 && x < 160) {
                if (y < yList[x][0]) yList[x][0] = y
                if (y > yList[x][1]) yList[x][1] = y
                if (D > 0) {
                    x += xi;
                    D += dy;
                }
                D += dx;
                --y
            }
        } else {
            D = 2 * dx - dy
            dx <<= 1
            dy <<= 1
            while (y <= y1 && x < 160) {
                if (y < yList[x][0]) yList[x][0] = y
                if (y > yList[x][1]) yList[x][1] = y
                if (D > 0) {
                    x += xi;
                    D -= dy;
                }
                D += dx;
                ++y
            }
        }
    }

}

function fillTriangle(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, c: number, texture: Image) {

    for (let i = 0; i < 160; i++)
        yList[i] = [222, -1]

    init(x0, y0, x1, y1)
    init(x1, y1, x2, y2)
    init(x0, y0, x2, y2)

    const minX = Math.min(x0, Math.min(x1, x2))
    const maxX = Math.min(159, Math.max(x0, Math.max(x1, x2)))

    for (let x = minX; x <= maxX; x++) {
        if (texture)
            helpers.imageBlit(
                bg, x, yList[x][0], 1, yList[x][1] - yList[x][0],
                texture, x, yList[x][0], 1, yList[x][1] - yList[x][0], false, false)
        else
            bg.fillRect(x, yList[x][0], x, yList[x][1], c) // or blit image
    }
    // controller.pauseUntilAnyButtonIsPressed()
}
function fillPolygon4(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, c: number, texture: Image) {

    for (let i = 0; i < 160; i++)
        yList[i] = [222, -1]

    init(x0, y0, x1, y1)
    init(x1, y1, x2, y2)
    init(x2, y2, x3, y3)
    init(x3, y3, x0, y0)

    const minX = Math.min(x0, Math.min(x1, Math.min(x2, x3)))
    const maxX = Math.min(159, Math.max(x0, Math.max(x1, Math.max(x2, x3))))

    for (let x = minX; x <= maxX; x++) {
        if (texture)
            helpers.imageBlit(
                bg, x, yList[x][0], 1, yList[x][1] - yList[x][0],
                texture, x, yList[x][0], 1, yList[x][1] - yList[x][0], false, false)
        else
            bg.fillRect(x, yList[x][0], x, yList[x][1], c) // or blit image
    }
    // controller.pauseUntilAnyButtonIsPressed()
}
