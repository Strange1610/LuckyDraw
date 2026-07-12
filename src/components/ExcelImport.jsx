import { readExcel } from "../utils/excel";

function ExcelImport({ onImport }) {

    const handleFile = async (event) => {

        const file = event.target.files[0];

        if (!file) return;

        try {

            const names = await readExcel(file);

            onImport(names);

        } catch {

            alert("Excel读取失败");

        }

    };

    return (
        <div>

            <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFile}
            />

        </div>
    );

}

export default ExcelImport;