async function main() {
    const MedalBuild = await ethers.getContractFactory("MedalBuild");
    
    // Start deployment, returning a promise that resolves to a contract object
    const medalBuild = await MedalBuild.deploy();
    console.log("Contract deployed to address:", medalBuild.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });