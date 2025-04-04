import * as d3 from 'd3';

export class MobileRenderer {
    constructor(canvas, width = 500, height = 500, radius = 20) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.circles = d3.range(324).map((i) => ({
            x: (i % 25) * (radius + 1) * 2,
            y: Math.floor(i / 25) * (radius + 1) * 2,
        }));

        this.simulation = d3.forceSimulation(this.circles)
            .force('collide', d3.forceCollide(radius + 1).iterations(4))
            .on('tick', () => this.draw());

        d3.select(canvas).call(
            d3.drag()
                .subject((event) => this.subject(event))
                .on('start', (event) => this.started(event))
                .on('drag', (event) => this.dragged(event))
                .on('end', (event) => this.ended(event))
        );
    }

    subject(event) {
        return this.simulation.find(event.x, event.y, this.radius);
    }

    started(event) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }


    dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    ended(event) {
        if (!event.active) this.simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    draw() {
        const { context, width, height, radius } = this;
        context.clearRect(0, 0, width, height);
        context.save();

        this.circles.forEach((d) => {
            context.beginPath();
            context.fillStyle = d.type || '#000';
            context.moveTo(d.x + radius, d.y);
            context.arc(d.x, d.y, radius, 0, 2 * Math.PI);
            context.fill();
        });

        context.strokeStyle = '#fff';
        context.stroke();
        context.restore();
    }

    destroy() {
        this.simulation.stop();
    }
}
