import * as XLSX from "xlsx";

/**
 * 读取 Excel 文件第一列姓名
 * @param {File} file
 * @returns {Promise<string[]>}
 */
export function readExcel(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);

                const workbook = XLSX.read(data, {
                    type: "array",
                });

                const sheet = workbook.Sheets[workbook.SheetNames[0]];

                const json = XLSX.utils.sheet_to_json(sheet, {
                    header: 1,
                });

                // 去掉空行，只读取第一列
                const names = json
                    .map((row) => row[0])
                    .filter((name) => name);

                resolve(names);
            } catch (err) {
                reject(err);
            }
        };

        reader.readAsArrayBuffer(file);
    });
}