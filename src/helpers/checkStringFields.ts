type ObjectWithStrings = {
    [key: string]: any; 
};
// note 
export function validateStringFields(obj: ObjectWithStrings): boolean {
    for (const key in obj) {
      if (typeof obj[key] === "string" && obj[key].trim() === "") {
        alert("Заповніть усі поля");
        return false;
      }
    }
  
    return true;
  }
  
