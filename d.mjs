import { MongoClient } from 'mongodb';

const dbName= 'Patient_Details';
const client = await MongoClient.connect(`mongodb://localhost:27017/${dbName}`);
console.log('Connected and created database!');

const db = client.db(dbName);

await db.createCollection(dbName); // Use same name as database for the collection
console.log('Created collection!\n');

const data = [
    {name: 'abc', age: 10, _id: 1, gender: 'M', address: 'India', marital_status: false, date_of_visit: '2021-01-01'},
    {name: 'xyz', age: 20, _id: 2, gender: 'F', address: 'China', marital_status: true, date_of_visit: '2021-06-02'},
    {name: 'def', age: 50, _id: 3, gender: 'M', address: 'USA', marital_status: false, date_of_visit: '2021-03-03'},
    {name: 'lmn', age: 33, _id: 4, gender: 'F', address: 'UK', marital_status: true, date_of_visit: '2021-04-04'},
];

const printDB = async () => {
    const search = await db.collection(dbName).find().toArray();
    console.log(`Current database: ${search.map((x) => `(${x._id})${x.name}`)}\n`);
}

const inserted = await db.collection(dbName).insertMany(data);
console.log(`Inserted ${inserted.insertedCount} documents!`);
await printDB()

const deleted = await db.collection(dbName).deleteOne({name: 'def'});
console.log(`Deleted ${deleted.deletedCount} documents!`);
await printDB()

const updated = await db.collection(dbName).updateOne({name: 'xyz'}, {$set: {name: 'pqr'}});
console.log(`Updated ${updated.modifiedCount} documents!`);
await printDB()

const search = await db.collection(dbName).find({age: {$gt: 18}}).toArray();
console.log(`Documents with 'age' over 18:`);
for (const res of search) {
    console.log(`ID:${res._id} Name:${res.name} Age:${res.age} Gender:${res.gender} Address:${res.address} Married?:${res.marital_status} DOV:${res.date_of_visit}`);
}

console.log('Exiting...')
process.exit(0);

/* Output:
Connected and created database!
Created collection!

Inserted 4 documents!
Current database: (1)abc,(2)xyz,(3)def,(4)lmn

Deleted 1 documents!
Current database: (1)abc,(2)xyz,(4)lmn

Updated 1 documents!
Current database: (1)abc,(2)pqr,(4)lmn

Documents with 'age' over 18:
ID:2 Name:pqr Age:20 Gender:F Address:China Married?:true DOV:2021-06-02
ID:4 Name:lmn Age:33 Gender:F Address:UK Married?:true DOV:2021-04-04
Exiting...
*/