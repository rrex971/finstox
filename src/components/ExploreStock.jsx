import React from "react";

const ExploreStock = () => {
    return (
        <div className="flex justify-between font-body font-bold text-mercury-200">
            <div className="imagecontainer flex">
                
                <img className="w-24 rounded-lg mr-8" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAb1BMVEXMIC7////MHizIAADFAADjnaDJABTJABDJAAvLEyXKDiHKABjfio713N334+T+/Pzuw8XOMz3ac3jjmZ3YaW7mpajy09XrurzehIj78vPWX2X57O3OLjnnq67POELqtbfUVFvRRk3cfIDvysvgkZRwo2MTAAABl0lEQVRIie1XyXKrMBBUS4A2QJgYsAy22f7/G9PEVXYOySHcXj36gEYz05pFKhAC6UmKP0KeUojU/JlHpknFsIO3xRS7eGIv7cCBA/8mpHX7eK6+/cCU7gscvbfbzFKSwm0Tb5S2QrWoFDWZdt9eN/L+kRMX5/PqMXqRp+esqaYkX85uuhWxqE0OtM1g5qVtvjFtjQ2lKrfhLICV0qMD+qRAoE5+Oahqe7bmTbwUC81jhZAHFAMJLRCLgF5dp0QB9QO45TPQFMD0DumSD0by1CctwhXoNBNIIpakXnouMDJVx4TKhEJtX0S9ArMioVYFStrulGcLpCvKtQH8AyFj5E4xwvVF9MyhutZ0zllfQydF8jQxiwjNIIFN7RMb0CYlwqtGO+JZewQ7EU1BJ9bkuJyI6G7PHgEXKukyv/bT1qEnCjX27NlJl7FSVSzVGntfx9A1od0yLCe3kDn79z5atUELqwehpTDKi0wZ4ZSRNsu8p4lRjJRaDNnPJ0/++hV6Wn63Hzhw4L/C7ovu7qv17sv8rt+He4pPCPcV/XGQRsAAAAAASUVORK5CYII=" alt="stock" />
                <div className="stockname">
                Zomato Ltd
                </div>
            </div>
            
            <div className="price text-mercury-400">
                <div>216.45 INR</div>
                <div className="onedaychange text-2xl text-emerald-400">+1.20 INR (+0.5%)</div> 
            </div>

        </div>
    )
}

export default ExploreStock;