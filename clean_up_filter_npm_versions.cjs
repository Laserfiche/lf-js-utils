const { exec } = require("child_process");
async function main() {
  const packageNAme = process.argv[2];
  const currentVersion = process.argv[3];
  exec(`npm view ${packageNAme} versions -json`, (error, stdout, stderr) => {
      if (error) {
      console.log(`error: ${error.message}`);
      }
      if (stderr) {
      console.log(`stderr: ${stderr}`);
      }
      var newArray = JSON.parse(stdout).filter(function (el) {
          return el.includes('preview') && el.includes(currentVersion)
      })
    process.stdout.write(JSON.stringify(newArray));
  });

}
main();
