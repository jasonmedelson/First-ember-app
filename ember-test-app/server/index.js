/*jshint node:true*/

// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

const bodyParser = require('body-parser');

module.exports = function(app) {
	app.use(bodyParser.urlencoded({ extended: true}));

	app.post('/token', function(req, res){
		console.log(res);
		
		if(req.body.username === 'Jason' && req.body.password === 'password'){
			res.send( { access_token: 'secretcode'});
		} 
		else {
			res.status(400).send({ error: 'invalid_login_key'});
		}
	});

	app.get('/api/students', function(req, res) {
		if( req.headers.authorization !== 'Bearer secretcode'){
			return res.status(401).send('Unauthorized');
		}
		return res.status(200).send({
			students: [
				{ id: 1, name: 'Erik', age: 13},
			    { id: 2, name: 'Jesse',  age: 22},
			    { id: 3, name: 'Lyci', age: 18},
			    { id: 4, name: 'Kalen', age: 20},
			    { id: 5, name: 'Jordan', age: 17},
			    { id: 6, name: 'Aja', age: 23}
			]
		});
	});
};