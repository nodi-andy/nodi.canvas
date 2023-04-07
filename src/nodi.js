export default class Nodi {

	constructor(canvasName) {
        this.canvasName = canvasName;
        this.state = "start";
        this.layers = {}
        this.canvas = document.getElementById("myCanvas")
        this.canvas.oncontextmenu = function (e) {e.preventDefault();}

    }

    
    setState(newState) {
        if (newState == "init") {
            for(let gameModule in this) {
              if (this[gameModule].init) this[gameModule].init(this);
            }
            this.state = "run"
        }
    };
}