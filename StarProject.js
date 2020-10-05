let canvasStars = document.getElementById("canvasStars"),
      ctx = canvasStars.getContext("2d"),
      canvasLine = document.getElementById("canvasLine"),
      ctxLine = canvasLine.getContext("2d"),
      globalPath = [],
      stars = [
        [50, 50, 5, 30, 15, 'red'],
        [150, 50, 5, 30, 15, 'blue'],
        [250, 50, 5, 30, 15, 'green'],  
        [350, 50, 5, 30, 15, 'orange'],
        [450, 50, 5, 30, 15,'purple']
      ];

ctxLine.rect(0, 0, 500, 50);
ctxLine.fillStyle = 'black';
ctxLine.fill();

const getParams = ([cx,cy,spikes,outerRadius,innerRadius, color]) => {
    return {cx, cy, spikes, outerRadius, innerRadius, color};
};


const drawStar = (starParam) => {

    let rot = Math.PI / 2 * 3,
        x = starParam.cx,
        y = starParam.cy,
        step = Math.PI / starParam.spikes,
        path = new Path2D();
    
    path.moveTo(starParam.cx, starParam.cy - starParam.outerRadius);

    for (let i = 0; i < starParam.spikes; i++) {
        x = starParam.cx + Math.cos(rot) * starParam.outerRadius;
        y = starParam.cy + Math.sin(rot) * starParam.outerRadius;
        path.lineTo(x, y);
        rot += step;

        x = starParam.cx + Math.cos(rot) * starParam.innerRadius;
        y = starParam.cy + Math.sin(rot) * starParam.innerRadius;
        path.lineTo(x, y);
        rot += step;
    }

    path.lineTo(starParam.cx, starParam.cy - starParam.outerRadius);
    ctx.lineWidth=5;
    ctx.fillStyle=starParam.color;
    ctx.fill(path);
    return path;
};

const drawPickers = (params) => {
        for (let i =0; i < params.length; i++){
            globalPath[i] = drawStar(getParams(params[i]));        
        }   
        console.log(globalPath);
    };
    

    console.log(globalPath);

addEventListener('click',(e) => {
    let clickOutside = true;
    for (let i = 0; i < globalPath.length; i++) {
        if (ctx.isPointInPath(globalPath[i], e.offsetX, e.offsetY) === true) {
            clickOutside = false;
            ctxLine.fillStyle = getParams(stars[i]).color;
            break;
            }
        }

   clickOutside && (ctxLine.fillStyle ='white');  
   ctxLine.fill();
});

drawPickers(stars);

