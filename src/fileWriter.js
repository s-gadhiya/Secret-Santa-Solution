const fs = require('fs');

/**
 * FileWriter class for creating CSV files
 * @class FileWriter
 */
class FileWriter {
	/**
	 * Creates an instance of FileWriter
	 * @constructor
	 * @param {string} fileName - The name/path of the CSV file to be created
	 */
	constructor(fileName) {
		this.fileName = fileName;
	}

	/**
	 * Creates a CSV file with the provided data and header row
	 * @async
	 * @param {Array<Object>} data - Array of objects containing the data to be written
	 * @param {Array<string>} headerRow - Array of strings representing the CSV header columns
	 * @returns {Promise<Object>} Returns an object with either {success: true} or {error: Error}
	 */
	async createCSV(data, headerRow) {
		try {
			const writeStream = fs.createWriteStream(this.fileName, 'utf-8');

			if (!headerRow || !headerRow.length) {
				throw new Error('Invalid header row provided');
			}
			// Write header row
			writeStream.write(`${headerRow.join(',')}\n`);

			data.forEach((row) => {
				const fields = headerRow.map((fields) => row[fields]);
				writeStream.write(`${fields.join(',')}\n`);
			});

			writeStream.on('error', (error) => {
				throw error;
			});

			writeStream.end(() => {
				console.log('[FileWriter]: CSV written successfully');
			});

			return {
				success: true,
			};
		} catch (error) {
			console.log(error);
			return {
				error,
			};
		}
	}
}

module.exports = FileWriter;
