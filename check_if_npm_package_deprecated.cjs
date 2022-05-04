const { exec } = require("child_process");
async function main() {
  const packageNAme = process.argv[2];
  const currentVersion = process.argv[3];
  exec(`npm show ${packageNAme}@${currentVersion}`, (error, stdout, stderr) => {

      if (error) {
      console.log(`error: ${error.message}`);
      }
      if (stderr) {
      console.log(`stderr: ${stderr}`);
      }
      process.stdout.write(stdout.includes("DEPRECATED").toString());
  });
}
main();
