import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '/node_modules/@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import duckdb_worker from '/node_modules/@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?worker';

const getDB = async () => {
	try {
		// Instantiate worker
		const logger = new duckdb.ConsoleLogger(3);
		const worker = new duckdb_worker();
		// and asynchronous database
		const db = new duckdb.AsyncDuckDB(logger, worker);
		await db.instantiate(duckdb_wasm);
		return db;
	} catch (e) {
		console.log('Failed to create a DuckDB instance: ', e);
	}
};

const getConn = async (db: duckdb.AsyncDuckDB) => {
	return await db.connect();
};

export { getDB, getConn };
