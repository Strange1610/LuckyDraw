function AdminPanel({
    open,
    onClose,
    names,
    cheatConfig,
    setCheatConfig
}) {
    if (!open) return null;

    // 修改第 N 次中奖人
    const updateWinner = (index, value) => {
        const newWinners = [...cheatConfig.winners];

        newWinners[index] = value;

        setCheatConfig({
            ...cheatConfig,
            winners: newWinners
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>⚙ 管理员设置</h2>

                {/* 暗门开关 */}
                <div className="setting-row">
                    <label>启用暗门</label>

                    <input
                        type="checkbox"
                        checked={cheatConfig.enabled}
                        onChange={(e) => {
                            setCheatConfig({
                                ...cheatConfig,
                                enabled: e.target.checked
                            });
                        }}
                    />
                </div>

                {/* 防重复中奖 */}
                <div className="setting-row">
                    <label>防止重复中奖</label>

                    <input
                        type="checkbox"
                        checked={cheatConfig.noRepeat}
                        onChange={(e) => {
                            setCheatConfig({
                                ...cheatConfig,
                                noRepeat: e.target.checked
                            });
                        }}
                    />
                </div>

                <hr />

                <h3>指定中奖名单（前10次）</h3>

                {
                    cheatConfig.winners.map((winner, index) => (
                        <div
                            className="setting-row"
                            key={index}
                        >
                            <label>
                                第 {index + 1} 次
                            </label>

                            <select
                                value={winner}
                                onChange={(e) =>
                                    updateWinner(
                                        index,
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    🎲 随机
                                </option>

                                {
                                    names.map((name) => (
                                        <option
                                            key={name}
                                            value={name}
                                        >
                                            {name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    ))
                }

                <div className="button-group">
                    <button onClick={onClose}>
                        保存
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;