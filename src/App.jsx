import { useEffect, useState } from "react";
import "./App.css";

import ExcelImport from "./components/ExcelImport";
import LuckyMachine from "./components/LuckyMachine";
import AdminPanel from "./components/AdminPanel";
import useLottery from "./hooks/useLottery";

function App() {
    const [names, setNames] = useState([]);
    const [running, setRunning] = useState(false);
    const [adminOpen, setAdminOpen] = useState(false);

    // 当前中奖者
    const [currentWinner, setCurrentWinner] = useState("");

    // 抽奖逻辑
    const {
        // winnerHistory,
        drawWinner,
        resetHistory
    } = useLottery();

    // 暗门配置
    const [cheatConfig, setCheatConfig] = useState(() => {
        const cache = localStorage.getItem("lottery-config");

        if (cache) {
            try {
                return JSON.parse(cache);
            } catch (error) {
                console.error("读取配置失败：", error);
            }
        }

        return {
            enabled: true,
            noRepeat: true,
            winners: Array(10).fill("")
        };
    });


    // 保存配置
    useEffect(() => {
        localStorage.setItem(
            "lottery-config",
            JSON.stringify(cheatConfig)
        );
    }, [cheatConfig]);


    return (
        <div className="app">

            <div className="title-bar">
                <h1>🎉 幸运抽奖系统 🎉</h1>

                <span
                    className="admin-icon"
                    onClick={() => setAdminOpen(true)}
                >
                    ⚙
                </span>
            </div>


            {/* 导入 Excel */}
            <ExcelImport
                onImport={(list) => {
                    setNames(list);
                    resetHistory();
                    setCurrentWinner("");
                }}
            />


            {/* 滚动区域 */}
            <LuckyMachine
                names={names}
                running={running}
                winner={currentWinner}
            />

            <button
                className="start-btn"
                disabled={names.length === 0}
                onClick={() => {

                    if (!running) {

                        // 开始滚动
                        setCurrentWinner("");
                        setRunning(true);

                    } else {

                        // 停止并抽奖
                        const winner = drawWinner(
                            names,
                            cheatConfig
                        );

                        console.log("当前配置:", cheatConfig);
                        console.log("抽中的人:", winner);

                        setCurrentWinner(winner);
                        setRunning(false);
                    }

                }}
            >
                {
                    running
                        ? "停止抽奖"
                        : "开始抽奖"
                }
            </button>


            {/* 中奖记录 */}
            {/* {
                winnerHistory.length > 0 && (
                    <div className="winner-list">

                        <h3>
                            中奖记录
                        </h3>

                        {
                            winnerHistory.map(
                                (item,index)=>(
                                    <div key={index}>
                                        第 {index+1} 次：
                                        {item}
                                    </div>
                                )
                            )
                        }

                    </div>
                )
            } */}


            {/* 管理员设置 */}
            <AdminPanel
                open={adminOpen}
                onClose={() => setAdminOpen(false)}
                names={names}
                cheatConfig={cheatConfig}
                setCheatConfig={setCheatConfig}
            />

        </div>
    );
}

export default App;