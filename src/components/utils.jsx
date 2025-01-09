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

export { applyProps, parseCsvFromPublic };