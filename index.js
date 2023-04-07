import * as NC from './src/nodicanvas.js';
import express from 'express'

const app = express()

app.use(express.static('src'));
app.listen(8080)
/*
export class CanvasExample extends NC.NodiView {
    constructor(canvas) {
        super(canvas, new NC.Vec2(8, 8), 1);
        this.hud = new NC.NodiHud("hud", this);
        this.reset();
        this.maxPoint = 0;
    }


    

}*/