import datasource from '../src/config/persistence/datasource';

async function runScript() {
	console.log(datasource.options);
}

runScript();