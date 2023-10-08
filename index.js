const express = require('express'); 
const port = 8000;  //initialising port

const db= require('./config/mongoose');
const tasks = require('./models/tasks'); //model that stores tasks created by user
const app = express();
app.set('views engine','ejs'); 
app.set('views','./views'); // setting our views to be fetched from ./views

app.use(express.urlencoded());
app.use(express.static('assets')); // setting where to locate our static files


// checking whether the app is working on the port designated
app.listen(port,function(err){ 
    if(err){
        console.log('error in loading localhost');
        return;
    }
    console.log("To do list app running on port ",port);
})

//home page
app.get('/', function(req,res){
    tasks.find({}).then((tasksList)=>{console.log("documents fetched");
        return res.render('../views/home.ejs',{
            title:"My to do App",
            taskslist_ejs:tasksList
        });
    }).catch(console.log("error while trying to fetch"));
    
})

// tasks created by user getting stored in db
app.post('/create-task',function(req,res){
    tasks.create({
        description:req.body.description_data,
        date:req.body.date_data,
        category:req.body.category_data
        
    }).then(console.log("data updated successfully",req.body))
    .catch(console.log("data not correct"))
    console.log(req.body);
    return res.redirect('back');

});


//deleting the task that is selected by user
app.get('/delete-task',function(req,res){

    let query_arr = req.query.playerName;
    console.log("query",query_arr);
    console.log("type",typeof(query_arr));
    if(typeof(query_arr)=="undefined"){ //checking whether atleast one task is selected 
        console.log("select one item")
    }
    else if(typeof(query_arr)==="string"){ // checking whether the query_arr is aving more than one items
        tasks.findByIdAndRemove(query_arr).then((query_arr)=>{console.log("single item removed")});
        console.log("length is one")
    }
    else{ // this condition is entered when there are more than one tasks that has to be deleted

    for(let i=0; i<query_arr.length;i++){
        console.log("two items selected",typeof(query_arr[i]));
        tasks.findByIdAndRemove(query_arr[i]).then(()=>{
            console.log("id deleted");
        }).catch(console.log("unable to find id"))
    }
    }

    return res.redirect('back');
})

