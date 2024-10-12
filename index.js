import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';

const file = 'data.json';

const makeCommit = async (n, startDate, points) => {
    if (n === 0) {
        return simpleGit().push();
    }

    const [y, x] = points[n - 1]; 

    const DATA = moment(startDate).add(x, 'w').add(y, 'd').format();  

    const data = {
        date: DATA
    };

    jsonfile.writeFile(file, data, (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            simpleGit().add([file]).commit(DATA, { '--date': DATA }, () => makeCommit(n - 1, startDate, points));
        }
    });
};

const startDate = '2020-01-05T20:04:54+05:30';
const points = [
    
    [0, 1], [0, 2], [0, 3],
    [1, 0],
    [2, 0],
    [3, 1], [3, 2], [3, 3],
    [4, 4],
    [5, 4],
    [6, 1], [6, 2], [6, 3],

    [0, 14], [0, 15], [0, 19], [0, 20],
    [1, 13], [1, 16], [1, 18], [1, 21],
    [2, 12], [2, 22],
    [3, 12], [3, 22],
    [4, 13], [4, 21],
    [5, 14], [5, 20],
    [6, 15], [6, 19],
    [6, 16], [6, 17], [6, 18],

    [0, 31], [0, 32], [0, 33],
    [1, 30],
    [2, 30],
    [3, 31], [3, 32], [3, 33],
    [4, 34],
    [5, 34],
    [6, 31], [6, 32], [6, 33]
];



makeCommit(points.length, startDate, points);