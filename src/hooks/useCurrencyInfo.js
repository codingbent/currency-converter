import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                // 1️⃣ Try jsDelivr CDN
                const res = await fetch(
                    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
                );

                if (!res.ok) throw new Error("jsDelivr failed");

                const json = await res.json();
                setData(json[currency]);
            } catch (err) {
                try {
                    // 2️⃣ Fallback to Cloudflare
                    const fallbackRes = await fetch(
                        `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`
                    );

                    const fallbackJson = await fallbackRes.json();
                    setData(fallbackJson[currency]);
                } catch (fallbackErr) {
                    console.error("Currency API failed:", fallbackErr);
                    setError("Failed to load currency data");
                }
            }
        };

        fetchCurrency();
    }, [currency]);

    return { data, error };
}

export default useCurrencyInfo;
