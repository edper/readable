export function capitalize (str = '') {
    return typeof str !== 'string'
      ? ''
      : str[0].toUpperCase() + str.slice(1)
}

export function findElement (arraySearch, arrayField, searchValue) {
   const resultArray = arraySearch.filter((arr)=>arr[arrayField]===searchValue);
   console.log("Array", arraySearch);
   console.log("Value", searchValue);
   console.log("Result",resultArray);
   return resultArray.length;
}

export default {capitalize, findElement};

