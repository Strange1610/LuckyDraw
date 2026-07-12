import { useState } from "react";

function useLottery() {
    const [winnerHistory, setWinnerHistory] = useState([]);

    /**
     * 抽奖函数
     * @param {Array} names 所有参与者
     * @param {Object} cheatConfig 暗门配置
     */
    const drawWinner = (names, cheatConfig) => {
        if (names.length === 0) {
            return null;
        }

        // 当前第几次抽奖
        const round = winnerHistory.length;


        let availableNames = [...names];


        // 开启防重复中奖
        if (cheatConfig.noRepeat) {
            availableNames = availableNames.filter(
                name => !winnerHistory.includes(name)
            );
        }


        // 如果没有可抽的人
        if (availableNames.length === 0) {
            return null;
        }


        let winner = "";


        /**
         * 暗门逻辑
         * round 从0开始
         * 第一次对应 winners[0]
         */
        if (
            cheatConfig.enabled &&
            cheatConfig.winners[round]
        ) {
            winner = cheatConfig.winners[round];
        }


        /**
         * 指定的人已经中过奖
         * 且开启防重复
         */
        if (
            winner &&
            cheatConfig.noRepeat &&
            winnerHistory.includes(winner)
        ) {
            winner = "";
        }


        /**
         * 随机抽取
         */
        if (!winner) {
            const randomIndex = Math.floor(
                Math.random() * availableNames.length
            );

            winner = availableNames[randomIndex];
        }


        // 保存中奖记录
        setWinnerHistory(prev => [
            ...prev,
            winner
        ]);


        return winner;
    };


    // 清空中奖记录
    const resetHistory = () => {
        setWinnerHistory([]);
    };


    return {
        winnerHistory,
        drawWinner,
        resetHistory
    };
}

export default useLottery;