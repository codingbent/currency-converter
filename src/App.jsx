import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import AdBanner from "./components/Adbanner";

function App() {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [convertedAmount, setConvertedAmount] = useState(0);

    const { data: currencyInfo } = useCurrencyInfo(from);
    const options = Object.keys(currencyInfo || {});

    const swap = () => {
        setFrom(to);
        setTo(from);
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    };

    const convert = () => {
        if (!currencyInfo[to]) return;
        setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
    };

    return (
        <>
            <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
                style={{
                    backgroundImage:
                        "url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg')",
                }}
            >
                <div className="w-full max-w-md bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-6">
                    {/* Header */}
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
                        💱 Currency Converter
                    </h1>
                    <p className="text-center text-gray-600 text-sm mb-6">
                        Real-time exchange rates using public API
                    </p>

                    {/* Form */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                        className="space-y-4"
                    >
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={setFrom}
                            selectCurrency={from}
                            onAmountChange={setAmount}
                        />

                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={swap}
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                🔄 Swap
                            </button>
                        </div>

                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={setTo}
                            selectCurrency={to}
                            amountDisable
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                            Convert {from.toUpperCase()} → {to.toUpperCase()}
                        </button>
                    </form>

                    {/* Result */}
                    {convertedAmount > 0 && (
                        <div className="mt-4 text-center text-lg font-semibold text-green-700">
                            {amount} {from.toUpperCase()} = {convertedAmount}{" "}
                            {to.toUpperCase()}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full flex justify-center my-6">
                <AdBanner />
            </div>
        </>
    );
}

export default App;
