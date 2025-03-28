import * as duckdb from '@duckdb/duckdb-wasm';

const initDB = async () => {
  const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();

  // Select a bundle based on browser checks
  const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);
  const worker_url = URL.createObjectURL(
    new Blob([`importScripts("${bundle.mainWorker!}");`], {type: 'text/javascript'})
  );

  // Instantiate the asynchronus version of DuckDB-Wasm
  const worker = new Worker(worker_url);
  const logger = new duckdb.ConsoleLogger();
  const db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
  URL.revokeObjectURL(worker_url); 
  const conn = await db.connect(); // Connect to db
  const file = await fetch('src/data/2009-01.parquet');//src/data/2009-01_medium_big.parquet
  const query = "SELECT * FROM '"+file.url+"'";
  let q = await conn.query(query); // Returns v = 101
  await conn.close();
  await db.terminate();
  await worker.terminate();
  return q;
};

export default initDB;