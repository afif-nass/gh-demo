import * as duckdb from '@duckdb/duckdb-wasm';

export async function insertData(
	db: duckdb.AsyncDuckDB,
	conn: duckdb.AsyncDuckDBConnection,
	data: any[]
) {
	await db.registerFileText('rows.json', JSON.stringify(data));
	await conn.insertJSONFromPath('rows.json', { name: 'rows' });
}
