const csvParser = require('csv-parser');
const fs = require('fs');

class FileReader {
	/**
	 * Creates an instance of FileReader.
	 * @constructor
	 * @param {string} filePath - The path to the CSV file to be read
	 */
	constructor(filePath) {
		this.filePath = filePath;
		this.data = [];
	}

	/**
	 * Reads and parses a CSV file asynchronously.
	 * @async
	 * @returns {Promise<Array>} A promise that resolves with the parsed CSV data
	 * @throws {Error} If the file path is invalid or doesn't end with .csv
	 */
	async readCSV() {
		try {
			// validate that the file path is exists and it is valid csv
			if (!this.filePath || !this.filePath.endsWith('.csv')) {
				throw new Error('Invalid file path');
			}

			return new Promise((resolve) => {
				fs.createReadStream(this.filePath)
					.pipe(csvParser())
					.on('data', (data) => this.data.push(data))
					.on('end', () => {
						resolve(this.data);
					});
			});
		} catch (error) {
			console.error('Error reading CSV file:', error);
		}
	}

	/**
	 * Returns the parsed CSV data.
	 * @returns {Array} The array containing parsed CSV data
	 */
	getData() {
		return this.data;
	}
}

module.exports = FileReader;
