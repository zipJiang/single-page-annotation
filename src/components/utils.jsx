import Papa from "papaparse";

const parseCsvFromPublic = async (fileName) => {
  try {
    const response = await fetch(`/${fileName}`);
    if (!response.ok) {
      throw new Error("Failed to load the CSV file.");
    }

    const csvText = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true, // Assumes the first row contains column headers
        skipEmptyLines: true,
        complete: (result) => {
          try {
            const parsedData = result.data.map((row) => {
              if (row.payload) {
                // return {
                //   ...row,
                //   payload: JSON.parse(row.payload), // Parse the Python-dumped string
                // };
                return JSON.parse(row.payload);
              }
              return row;
            });
            resolve(parsedData);
          } catch (e) {
            reject(new Error("Error parsing the payload field. Ensure it's a valid Python-dumped JSON string."));
          }
        },
        error: (err) => {
          reject(new Error(`Error parsing the CSV file: ${err.message}`));
        },
      });
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

function applyProps(Fn, props) {
    return (e = {}) => <Fn {...e} {...props} />
}

function findSubArray(array, subArray) {
  /**
   * If subArray is in array (by element-wise equality (===)), return two-element array consisting
   * of start index (inclusive) and end index (exclusive) of subArray in array.  Otherwise, return
   * undefined.
   */
  let start = null;
  let end = null;
  if (array.length && subArray.length) {
    for (let i = 0; i < array.length; ++i) {
      if (array[i] === subArray[0]) {
        start = i;
        for (let offset = 0; offset < subArray.length; ++offset) {
          if (array[i + offset] !== subArray[offset]) {
            start = null;
            break;
          }
        }
        if (start !== null) {
          end = i + selectionTokens.length;
        }
      }
    }
  }
  return (start !== null && end !== null)
    ? [start, end]
    : undefined;
}

export { applyProps, parseCsvFromPublic, findSubArray };