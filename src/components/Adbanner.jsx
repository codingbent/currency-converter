import { useEffect } from "react";

const AdBanner = () => {
    useEffect(() => {
        try {
            window.adsbygoogle = window.adsbygoogle || [];
            window.adsbygoogle.push({});
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block", marginTop: "20px" }}
            data-ad-client="ca-pub-5306204505953779"
            data-ad-slot="1234567890" // replace later
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    );
};

export default AdBanner;
