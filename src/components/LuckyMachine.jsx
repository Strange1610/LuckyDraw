import { useEffect, useState } from "react";

function LuckyMachine({ names, running, winner }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!running || names.length === 0) return;

        const timer = setInterval(() => {
            setIndex(prev => (prev + 1) % names.length);
        }, 50);

        return () => clearInterval(timer);
    }, [running, names]);


    if (names.length === 0) {
        return (
            <div className="machine">
                请导入Excel
            </div>
        );
    }


    return (
        <div className="machine">
            <div>
                {winner || names[index]}
            </div>
        </div>
    );
}

export default LuckyMachine;