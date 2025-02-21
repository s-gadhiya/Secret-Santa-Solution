const empList = [
	{
		name: 'emp1',
		email: 'emp1@gmail.com',
	},
	{
		name: 'emp2',
		email: 'emp2@gmail.com',
	},
	{
		name: 'emp3',
		email: 'emp3@gmail.com',
	},
	// {
	// 	name: 'emp4',
	// 	email: 'emp4@gmail.com',
	// },
];

const prevSantaChildList = [
	{
		name: 'emp1',
		email: 'emp1@gmail.com',
		santaName: 'emp2',
		santaEmail: 'emp2@gmail.com',
		// santaName: 'emp3',
		// santaEmail: 'emp3@gmail.com',
	},
	// {
	// 	name: 'emp3',
	// 	email: 'emp3@gmail.com',
	// 	santaName: 'emp2',
	// 	santaEmail: 'emp2@gmail.com',
	// },
	{
		name: 'emp2',
		email: 'emp2@gmail.com',
		santaName: 'emp1',
		santaEmail: 'emp1@gmail.com',
	},
];

const prevSantaEmailMapping = prevSantaChildList.reduce((acc, curr) => {
	acc[curr.email] = curr.santaEmail;
	return acc;
}, {});

let results = [];

const solve = (empList, prevSantaChildList, index = 0) => {
	if (index === empList.length) {
		console.log(empList);
		results = structuredClone(empList);
		return true;
	}

	// filter all invalid solutions 1. Santa of self 2. Santa of previous santa 3. Santa child is already assigned to other empoloyee
	const findingSantaForEmp = empList[index];
	const possibleSanta = empList.filter(
		(emp) =>
			emp.email !== findingSantaForEmp.email &&
			emp.email !== prevSantaEmailMapping[findingSantaForEmp.email] &&
			!emp.santaOf
	);
	console.log(
		`findingSanta  for: ${findingSantaForEmp.email}`,
		`curr representation:`,
		empList,
		JSON.stringify(possibleSanta.map((emp) => emp.email))
	);

	// Try brute force..
	// Each and every Possible solutions
	for (let i = 0; i < possibleSanta.length; i++) {
		const santa = possibleSanta[i];
		santa.santaOf = findingSantaForEmp.email;
		findingSantaForEmp.santaEmail = santa.email;
		const isAnswerFound = solve(empList, prevSantaChildList, index + 1);
		if (isAnswerFound) {
			return isAnswerFound;
		}

		findingSantaForEmp.santaEmail = null;
		santa.santaOf = null;
	}

	return false;
};

const isPossible = solve(empList, prevSantaChildList);
if (isPossible) {
	console.log('Possible');
	console.log(results);
} else {
	console.log('Not Possible');
}
