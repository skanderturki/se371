const { writeFileSync } = require('fs');

const users = require('./users');

console.log('Starting generating script...');

const writeScript = (script, flag) => {
  writeFileSync('./generated/script.sql', script, flag,
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  )
}

const generateUsersScript = () => {
  users.forEach(user => {
    const query = `CREATE USER '${user}'@'localhost' IDENTIFIED BY '${user}pwd';\n\n`;
    writeScript(query, { flag: 'a' });
  
  });
}

const generateDatabasesScript = () => {
  users.forEach(user => {
    const query = `CREATE DATABASE ${user}db;\n\n`;
    writeScript(query, { flag: 'a' });
  });
}

const generatePriviledgesScript = () => {
  users.forEach(user => {
    const query = `GRANT ALL PRIVILEGES ON ${user}db.* TO '${user}'@'localhost';\n\n`;
    writeScript(query, { flag: 'a' });
  });
  writeScript(`FLUSH PRIVILEGES;\n`, { flag: 'a' });
  
}

const generateAllScripts = async () => {
  await writeScript("## SQL script to generate users and databases\n\n\n");
  await generateUsersScript();
  await generateDatabasesScript();
  await generatePriviledgesScript();
}

generateAllScripts();

console.log('Generation completed!');