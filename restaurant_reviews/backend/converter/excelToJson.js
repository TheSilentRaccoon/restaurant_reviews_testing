import fs from "fs";
import xlsx from "xlsx";

export default class excelToJson{
    static async excelToJsonConverter(){
        const file = "C:/Users/ACER/Desktop/webpage_node_testing/restaurant_reviews/backend/Book.xlsx";
        //Working 1
        //const obj = xlsx.parse(file);

        //const obj = xlsx.parse(fs.readFileSync(file));

        //console.log(obj);

        //Work 2
        const wb = xlsx.readFile(file, {cellDates:true});
        //console.log(wb);
        //console.log(wb.SheetNames);

        const ws = wb.Sheets["Sheet1"];

        //console.log(ws);

        const data = xlsx.utils.sheet_to_json(ws, {raw: false});
        console.log(data);


        /*
        fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
        });
        */
    }
}


