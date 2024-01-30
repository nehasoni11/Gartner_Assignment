# Instructions

To fulfill the assignment, process an array of clicks and provide a subset adhering to the following criteria:

1. Only the most expensive click for each IP within a one-hour period should be included in the result set.
2. In case of a tie for the most expensive click from the same IP within a one-hour period, include only the earliest click in the result set.
3. Exclude clicks for an IP if there are more than 10 clicks in the overall array.

# Dependencies

- Installed Mocha testing library for testing and running test cases.


# Code Submission

- Navigate to the project directory.
- Execute `npm install` to install dependencies.
- Execute `npm run solution` to obtain the output.
- The output will be saved in the **resultSet.json** file.
- Run `npm run test` for executing test cases.
