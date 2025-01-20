import type { AsyncDuckDBConnection } from '@duckdb/duckdb-wasm';

export async function runQuery(conn: AsyncDuckDBConnection, query: string) {
	try {
		const results = await conn.query(query);
		const result = await results;
		return result;
	} catch (e) {
		throw 'Bad query';
	}
}
