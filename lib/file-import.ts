import * as XLSX from 'xlsx';

export async function parseFileData(file: File): Promise<unknown[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        if (!event.target?.result) {
          throw new Error('Failed to read file');
        }

        if (file.name.endsWith('.csv')) {
          const text = event.target.result as string;
          const rows = parseCSV(text);
          resolve(rows);
        } else if (file.name.endsWith('.xlsx')) {
          const data = new Uint8Array(event.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const rows = parseXLSX(workbook);
          resolve(rows);
        } else {
          reject(new Error('Unsupported file format'));
        }
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
}

function parseCSV(text: string): unknown[] {
  const lines = text.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(value => value.trim());
    return headers.reduce((obj, header, index) => {
      obj[header.toLowerCase()] = values[index];
      return obj;
    }, {} as Record<string, string>);
  });
}

function parseXLSX(workbook: XLSX.WorkBook): unknown[] {
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  return XLSX.utils.sheet_to_json(worksheet);
}