import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedStockGraph = () => {
    const svgRef = useRef(null);

    const dataPoints = [
        20, 25, 22, 30, 28, 35, 32, 40, 38, 45,
        42, 50, 48, 55, 52, 60, 58, 65, 70, 68,
        75, 72, 80, 78, 85, 88, 82, 90, 92, 95
    ];

    const width = 500;
    const height = 300;
    const padding = { top: 20, right: 20, bottom: 40, left: 20 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const minVal = Math.min(...dataPoints) - 5;
    const maxVal = Math.max(...dataPoints) + 5;

    const points = dataPoints.map((val, i) => {
        const x = padding.left + (i / (dataPoints.length - 1)) * chartW;
        const y = padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
        return { x, y };
    });

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const areaPath = `${linePath} L${points[points.length - 1].x},${height - padding.bottom} L${points[0].x},${height - padding.bottom} Z`;

    const gridLines = [];
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (i / 4) * chartH;
        gridLines.push(y);
    }

    useEffect(() => {
        if (!svgRef.current) return;
        const svg = svgRef.current;
        const line = svg.querySelector('.graph-line');
        const area = svg.querySelector('.graph-area');
        const dots = svg.querySelectorAll('.graph-dot');
        const grids = svg.querySelectorAll('.grid-line');
        const pulse = svg.querySelector('.pulse-dot');

        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        tl.fromTo(grids, { opacity: 0 }, { opacity: 0.15, duration: 0.4, stagger: 0.08 }, 0);

        if (line) {
            const length = line.getTotalLength();
            gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
            tl.to(line, { strokeDashoffset: 0, duration: 2, ease: 'power1.inOut' }, 0.3);
        }

        tl.fromTo(area, { opacity: 0 }, { opacity: 1, duration: 1 }, 1.5);

        tl.fromTo(dots, { scale: 0, transformOrigin: 'center center' }, { scale: 1, duration: 0.3, stagger: 0.05 }, 1.0);

        if (pulse) {
            tl.fromTo(pulse, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, 2.3);
            gsap.to(pulse, {
                scale: 1,
                opacity: 0,
                duration: 1.5,
                repeat: -1,
                ease: 'power1.out',
                delay: 3
            });
        }

        return () => { tl.kill(); };
    }, []);

    // Show a subset of dots for visual clarity
    const dotIndices = [0, 4, 9, 14, 19, 24, 29];

    return (
        <div className="w-full max-w-lg xl:max-w-xl">
            <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-2xl">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a379d7" />
                        <stop offset="100%" stopColor="#905cce" />
                    </linearGradient>
                    <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#905cce" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#905cce" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Grid lines */}
                {gridLines.map((y, i) => (
                    <line key={i} className="grid-line" x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#4f4f4f" strokeWidth="0.5" opacity="0" />
                ))}

                {/* X-axis */}
                <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="#4f4f4f" strokeWidth="0.5" opacity="0.3" />

                {/* Area fill */}
                <path className="graph-area" d={areaPath} fill="url(#areaGrad)" opacity="0" />

                {/* Main line */}
                <path className="graph-line" d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Dots */}
                {dotIndices.map(i => (
                    <circle key={i} className="graph-dot" cx={points[i].x} cy={points[i].y} r="4" fill="#905cce" stroke="#181818" strokeWidth="2" />
                ))}

                {/* Pulsing last dot */}
                <circle className="pulse-dot" cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="6" fill="none" stroke="#905cce" strokeWidth="2" opacity="0" />
                <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="5" fill="#905cce" stroke="#181818" strokeWidth="2" className="graph-dot" />
            </svg>
        </div>
    );
};

export default AnimatedStockGraph;
