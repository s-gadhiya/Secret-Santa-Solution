const fs = require('fs');
const FileReader = require('./fileReader');
const FileWriter = require('./fileWriter');
const SecretSanta = require('./secretSanta');

(async () => {
	// Reading the files
	const employeeReader = new FileReader('./input/employees.csv');
	const previousSantaReader = new FileReader('./input/previousSanta.csv');

	const employeeData = await employeeReader.readCSV();
	const previousSantaData = await previousSantaReader.readCSV();

	// If Not getting the data then return
	if (!employeeData || !previousSantaData) {
		console.log('Invalid file path');
		return;
	}

	const employeeList = employeeData.map((employee) => ({
		name: employee.Employee_Name,
		email: employee.Employee_EmailID,
	}));
	const previousSantaList = previousSantaData.map((employee) => ({
		name: employee.Employee_Name,
		email: employee.Employee_EmailID,
		santaEmail: employee.Secret_Child_Name,
		santaName: employee.Secret_Child_EmailID,
	}));

	// Creating the Secret Santa Solutions
	const secretSanta = new SecretSanta(employeeList, previousSantaList);

	const result = secretSanta.assignSanta();

	if (!result.isPossible) {
		console.log('Not possible to assign Secret Santa');
		return;
	}

	if (!fs.existsSync('./output')) {
		fs.mkdirSync('./output');
	}
	const fileWriter = new FileWriter('./output/result.csv');

	const employeeWithSantaDetails = result.employeeWithSanta.map((emp) => {
		return {
			Employee_Name: emp.name,
			Employee_EmailID: emp.email,
			Secret_Child_Name: emp.santaInfo.name,
			Secret_Child_EmailID: emp.santaInfo.email,
		};
	});

	// Creating the CSV file
	fileWriter.createCSV(employeeWithSantaDetails, [
		'Employee_Name',
		'Employee_EmailID',
		'Secret_Child_Name',
		'Secret_Child_EmailID',
	]);
})();
