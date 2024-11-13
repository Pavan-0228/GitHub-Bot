import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';

const file = 'data.json';

const makeCommit = async (n, points) => {
    if (n === 0) {
        return simpleGit().push();
    }

    const targetDate = points[n - 1]; 

    const data = {
        date: targetDate
    };

    jsonfile.writeFile(file, data, (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            simpleGit().add([file]).commit(targetDate, { '--date': targetDate }, () => makeCommit(n - 1, points));
        }
    });
};

const points = [
    '2024-10-10T12:00:00+05:30', // October 10, 2024
    '2024-10-16T12:00:00+05:30'  // October 16, 2024
];

makeCommit(points.length, points);
