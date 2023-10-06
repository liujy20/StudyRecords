import * as ExcelJS from 'exceljs';

async function exportToExcel<T extends Record<string, any>>(data: T[]) {
  // 创建一个新的工作簿
  const workbook = new ExcelJS.Workbook();

  // 添加一个工作表
  const worksheet = workbook.addWorksheet('Sheet 1');

  // 定义表头
  const headers = Object.keys(data[0]);
  worksheet.addRow(headers);

  // 填充数据
  data.forEach(item => {
    const row:T[] = [];
    headers.forEach(key => {
      row.push(item[key]);
    });
    worksheet.addRow(row);
  });

  // 导出 Excel 文件
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'data.xlsx');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export {
  exportToExcel
}