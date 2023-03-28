import { useEffect, useMemo, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

function App() {
    const [numbers, setNumbers] = useState([]);
    const [maxValue, setMaxValue] = useState(100);
    const inpRef = useRef();

    useEffect(() => {
        const max = Math.max(...numbers);
        setMaxValue(Math.max(max, 100));
    }, []);

    const setValue = () => {
        const value = inpRef.current.value;

        if (!value) {
            toast("Please provide input value first!", {
                icon: "😐",
            });
            return;
        }

        const new_array = [...new Set([...numbers, Number(value)])];
        const max = Math.max(...new_array);
        setMaxValue(Math.max(max, 100));
        setNumbers(new_array);
    };

    const unsetValue = () => {
        const value = inpRef.current.value;

        if (!value) {
            toast("Please provide input value first!", {
                icon: "😐",
            });
            return;
        }

        const new_array = numbers.filter((n) => n !== Number(value));
        const max = Math.max(...new_array);
        setMaxValue(Math.max(max, 100));
        setNumbers(new_array);
    };

    const renderBox = useMemo(() => {
        const temp = Array.from({ length: maxValue }, (_, i) => i + 1);

        const items = temp.map((n) => {
            console.log(numbers.includes(n));
            return (
                <div
                    key={n}
                    className={`min-w-[100px] max-w-[200px] flex-1 w-full h-[100px] border flex items-center justify-center rounded-lg ${
                        numbers.includes(n) ? "bg-green-500 text-white" : ""
                    }`}
                >
                    <p className="text-[30px]">{n}</p>
                </div>
            );
        });

        return items;
    }, [numbers, maxValue]);

    return (
        <div className="p-10">
            <Toaster />
            <h1 className="text-[30px]">Tick the box</h1>
            <p>Select the number to set or unset the box</p>
            <div className="border-b py-4"></div>
            <div className="mt-3 flex items-center gap-4 flex-wrap">
                <input
                    ref={inpRef}
                    type="number"
                    className="border py-3 ring-0 ring-blue-500 focus:ring-1 px-4 rounded-lg outline-none"
                />
                <button
                    onClick={setValue}
                    className="border-blue-500 border px-3 py-2 rounded-md text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-all"
                >
                    Set
                </button>
                <button
                    onClick={unsetValue}
                    className="border-red-500 border px-3 py-2 rounded-md text-red-500 cursor-pointer hover:bg-red-500 hover:text-white transition-all"
                >
                    Unset
                </button>
            </div>

            <div className="py-3"></div>

            <div className="flex gap-4 flex-wrap">{renderBox}</div>
        </div>
    );
}

export default App;
