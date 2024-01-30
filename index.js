const fs = require('fs');
const solution = require('./solution')

const main = () => {
    try {
        const filedata = fs.readFileSync('./clicks.json');
        const clicks = JSON.parse(filedata);
        if (solution.validateClicksArray(clicks)) {
            const result = solution.getResultSet(clicks)
            const data = JSON.stringify(result)
            fs.writeFileSync('./resultSet.json', data)
            console.log('Output is shown on ./resultSet.json file')
        } else {
            console.log('Invalid input of clicks array!');
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

main()

