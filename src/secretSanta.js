/**
 * Class to handle Secret Santa assignment logic with constraints
 */
class SecretSanta {
	/**
	 * @param {Array<Object>} employeeList - List of employees with their email addresses
	 * @param {Array<Object>} previousSantaList - Previous year's santa assignments
	 */
	constructor(employeeList = [], previousSantaList = []) {
		this.employeeList = JSON.parse(JSON.stringify(employeeList));
		this.previousSantaList = JSON.parse(JSON.stringify(previousSantaList));
		this.prevSantaMapping = this.__createPrevSantaMapping();
		this.results = [];
	}

	/**
	 * @private
	 * Creates a mapping of employee emails to their previous santa's email
	 */
	__createPrevSantaMapping() {
		return this.previousSantaList.reduce((acc, curr) => {
			acc[curr.email] = curr.santaEmail;
			return acc;
		}, {});
	}

	/**
	 * @private
	 * Recursive helper method to assign santas using backtracking
	 */
	__assignSanta(index = 0) {
		// If reach to end means all the employees have been assigned a santa
		if (index === this.employeeList.length) {
			this.results = JSON.parse(JSON.stringify(this.employeeList));
			return true;
		}

		// Assume that csv contain the unique email address and filter all invalid solutions, conditions for valid solutions are
		// 1. Santa of self
		// 2. Santa of previous santa
		// 3. Santa child is already assigned to other employee
		const findingSantaForEmp = this.employeeList[index];
		const possibleSanta = this.employeeList.filter(
			(emp) =>
				emp.email !== findingSantaForEmp.email &&
				emp.email !== this.prevSantaMapping[findingSantaForEmp.email] &&
				!emp.santaOf
		);

		// Try Each and every Possible solutions
		for (let i = 0; i < possibleSanta.length; i++) {
			const santa = possibleSanta[i];
			santa.santaOf = findingSantaForEmp.email;
			findingSantaForEmp.santaInfo = { email: santa.email, name: santa.name };
			const isAnswerFound = this.__assignSanta(index + 1);
			if (isAnswerFound) {
				return isAnswerFound;
			}

			findingSantaForEmp.santaInfo = null;
			santa.santaOf = null;
		}

		return false;
	}

	/**
	 * @public
	 * Assigns Secret Santas to all employees while respecting previous year's constraints
	 * @returns {Object} Object containing assignment possibility and results if successful
	 */
	assignSanta() {
		const isPossible = this.__assignSanta();

		return {
			isPossible,
			...(isPossible && { employeeWithSanta: this.results }),
		};
	}
}

module.exports = SecretSanta;
