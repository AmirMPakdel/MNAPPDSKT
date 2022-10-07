const Page = require("../lib/Page");
const MyCourses = require("./myCourses");

class AddCrouse extends Page{

    async onStart(){

        setTimeout(()=>{
            let myCourses = new MyCourses(this.mainWindow, "myCourses");
            myCourses.load();
        }, 2000)
    }

    onDestroy(){

        console.log("AddCourse window destroyed!");
    }
}

module.exports = AddCrouse;