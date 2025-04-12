import React, { useEffect, useRef, useState, memo } from 'react';

function TradingViewWidget(props) {
  const container = useRef();
  const mounted = useRef(false);
  const [rendered, setRendered] = useState(false);

  useEffect(
    () => {
    if(!mounted.current){
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
            {
            "autosize": true,
            "symbol": "BSE:${props.symbol}",
            "interval": "D",
            "timezone": "Asia/Kolkata",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "allow_symbol_change": true,
            "calendar": false,
            "support_host": "https://www.tradingview.com"
            }`;
        container.current.appendChild(script);
        mounted.current=true;
        }
    },
    []
  );

  return (
    <div className="tradingview-widget-container w-full h-full" ref={container}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
}

export default memo(TradingViewWidget);
