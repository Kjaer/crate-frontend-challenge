const CRATE_PORT = "4200";

const crate = require('node-crate');
const schemes = require('./schemes');
const data = require('./data');


//connect the crate
crate.connect('localhost', CRATE_PORT);

async function createTables() {
  const tables = schemes.map(scheme => crate.create(scheme));

  try{
    const tableResults = await Promise.all(tables);

    return tableResults;
  } catch (e) {
    const errorTitle = `
    TABLE ERROR
    -------------
     - Tables are not created due to`;

    console.error(errorTitle, e);

    return e;
  }

}

async function importData(table, payload) {

  try{
    const result = await crate.insert(table, payload);

    return result;
  } catch (e) {
    const errorTitle = `
    DATA ERROR
    -------------
     - Given Data cannot persisted to the Table(${table})`;

    console.error(errorTitle, e);

    return e;
  }

}

function tableNames() {
  return schemes.map(scheme => Object.keys(scheme)[0]);
}

async function init() {
  const tables = tableNames();

  //crate tables
  try {
    await createTables();
  } catch (e) {
    console.error("a table cannot created,",  e);
  }

  //load the data
  tables.forEach(async (tableName) => {
    try{
      await Promise.all(data[tableName].map(data => importData(tableName, data)));
      console.log(`data for ${tableName} is persisted`);
    } catch (e) {
      console.error(`data for ${tableName} cannot persisted`)
    }
  });
}

init();
