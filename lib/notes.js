const fs = require('fs');
const notesDir = './notes';

const readFiles = (dir, files) => files.map(file => {
	return new Promise((res, rej) => {
		fs.readFile(`${ dir }/${ file }`, (err, body) => res(body.toString()));
	});
});

const read = () => new Promise((res, rej) => {
	fs.readdir(notesDir, (err, files) => {
		Promise.all(readFiles(notesDir, files))
			.then(bodies => {
				const notes = bodies.map((body, i) => ({
					title: files[i].replace(/\.txt$/, ''),
					body
				}));
				res(notes);
			});
		});
	});

const save = () => {};

module.exports = { read, save };
