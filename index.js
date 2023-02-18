const ejs = require('ejs');
let express = require('express')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://Ravi_Kumar:Ravi%40123@cluster0.bnkfpnx.mongodb.net/?retryWrites=true');
}
let isauthenticate=0;
let app = express();
app.set('view engine', "ejs")
app.use(express.urlencoded())
app.use('/static', express.static('static'))
app.get('/', (req, res) => {
    res.render('new_page')
})
app.get('/index.js', (req, res) => {
    if(isauthenticate==1)
    res.render('index')
    else{
        res.redirect('/')
    }
})
app.get('/admlogin', (req, res) => {
    res.render('admlogin')
})
app.get('/admlogin', (req, res) => {
    res.render('admlogin')
})
app.post('/admlogin', (req, res) => {
  if(req.body.givenUserName=="kravi21"&&req.body.givenPassword=="12345")
  {
   isauthenticate=1;
   res.render('index');
  }
  else{
    res.send("Invalid Request");
  }
})
app.use(express.urlencoded())
app.get('/add', (req, res) => {
    if(isauthenticate==1)
    res.render('add')
    else{
        res.redirect('/');
    }
})
const kittySchema = new mongoose.Schema({
    Roll: String,
    Name: String,
    Programme:String,
    Branch: String,
    Location:String,
    User_ID: String,
    Hall:String,
    Gender:String,
    Blood_Group:String,
    Room:String,
});

const Kitten = mongoose.model('StudentData', kittySchema);
app.post('/add', (req, res) => {

    const data = new Kitten(
        {
            Roll: req.body.givenRoll,
            Name: req.body.givenName,
            Userid: req.body.givenUser,
            Branch: req.body.givenBranch,
            Hall:req.body.givenHall,
            Room:req.body.givenRoom,
            Programme:req.body.givenProgramme,
            Gender:req.body.givenGender,
            Blood_Group:req.body.givenBlood_Group,
            Location:req.body.givenLocation
        });
    data.save()
    res.redirect('/add');
})
app.get('/find', (req, res) => {
    res.render('find',{data:[],message:""})
})
app.post('/find', (req, res) => {
    if (req.body.givenName !== '' && req.body.givenRoll == '' && req.body.givenUser_ID == '' && req.body.givenBranch == '') {
        Kitten.find({ Name: req.body.givenName }, (err, result) => {
           temp=  Object.keys(result).length +" results found!"
           res.render('find',{data:result,message:temp})
        })
    }
    else if (req.body.givenName == '' && req.body.givenRoll !== '' && req.body.givenUser_ID == '' && req.body.givenBranch == '') {
        Kitten.find({ Roll: req.body.givenRoll }, (err, result) => {
            temp=  Object.keys(result).length +" results found!"
            res.render('find',{data:result,message:temp})
        })
    } else if (req.body.givenName == '' && req.body.givenRoll == '' && req.body.givenUser_ID !== '' && req.body.givenBranch == '') {
        Kitten.find({ User_ID: req.body.givenUser_ID }, (err, result) => {
            temp=  Object.keys(result).length +" results found!"
            res.render('find',{data:result,message:temp})
        })
    } else if (req.body.givenName == '' && req.body.givenRoll== '' && req.body.givenUser_ID == '' && req.body.givenBranch !== '') {
        Kitten.find({ Branch: req.body.givenBranch }, (err, result) => {
            temp=  Object.keys(result).length +" results found!"
            res.render('find',{data:result,message:temp})
        })
        
    }
    else if(req.body.givenName!=='' &&req.body.givenRoll!=='' &&req.body.givenUser_ID=='' &&req.body.givenBranch=='' )
   {
    Kitten.find({Name:req.body.givenName,  Roll:req.body.givenRoll},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
           res.render('find',{data:result,message:temp})
      })
   }
   else if(req.body.givenName!=='' &&req.body.givenRoll=='' &&req.body.givenUser_ID!=='' &&req.body.givenBranch=='' )
   {
    Kitten.find({Name:req.body.givenName,User_ID:req.body.givenUser_ID},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('find',{data:result,message:temp})
      })
   }
   else if(req.body.givenName!=='' &&req.body.givenRoll=='' &&req.body.givenUser_ID=='' &&req.body.givenBranch!='' )
   {
    Kitten.find({Name:req.body.givenName,  Branch:req.body.givenBranch},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('find',{data:result,message:temp})
      })
   } else if(req.body.givenName=='' &&req.body.givenRoll!=='' &&req.body.givenUser_ID!=='' &&req.body.givenBranch=='' )
   {
    Kitten.find({Roll:req.body.givenRoll,User_ID:req.body.givenUser_ID},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
           res.render('find',{data:result,message:temp})
      })
   }
   else if(req.body.givenName=='' &&req.body.givenRoll!=='' &&req.body.givenUser_ID=='' &&req.body.givenBranch!=='' )
   {
    Kitten.find({Roll:req.body.givenRoll,Branch:req.body.givenBranch},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('find',{data:result,message:temp})
      })
   }
   else if(req.body.givenName=='' &&req.body.givenRoll=='' &&req.body.givenUser_ID!=='' &&req.body.givenBranch!=='' )
   {
    Kitten.find({User_ID:req.body.givenUser_ID,Branch:req.body.givenBranch},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
           res.render('find',{data:result,message:temp})
      })
   }
   else if(req.body.givenName!=='' &&req.body.givenRoll!=='' &&req.body.givenUser_ID!=='' &&req.body.givenBranch=='' )
   {
    Kitten.find({ Name:req.body.givenName, Roll:req.body.givenRoll,User_ID:req.body.givenUser_ID},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
           res.render('find',{data:result,message:temp})
      })
   }else if(req.body.givenName!=='' &&req.body.givenRoll!=='' &&req.body.givenUser_ID=='' &&req.body.givenBranch!=='' )
   {
    Kitten.find({ Name:req.body.givenName, Roll:req.body.givenRoll,Branch:req.body.givenBranch},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
           res.render('find',{data:result,message:temp})
      })
   }
   else if(req.body.givenName!=='' &&req.body.givenRoll=='' &&req.body.givenUser_ID!=='' &&req.body.givenBranch!=='' )
   {
    Kitten.find({ Name:req.body.givenName, Branch:req.body.givenBranch,User_ID:req.body.givenUser_ID},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('find',{data:result,message:temp})
      })
   }
   else if(req.body.givenName=='' &&req.body.givenRoll!=='' &&req.body.givenUser_ID!=='' &&req.body.givenBranch!=='' )
   {
    Kitten.find({ Branch:req.body.givenBranch, Roll:req.body.givenRoll,User_ID:req.body.givenUser_ID},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('find',{data:result,message:temp})
      })
   }else if(req.body.givenName==''&&req.body.givenRoll=='' &&req.body.givenUser_ID=='' &&req.body.givenBranch=='' )
   {
    Kitten.find({},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
           res.render('find',{data:result,message:temp})
      })
   }
})
app.get('/delete',(req,res)=>{
    if(isauthenticate==1)
    res.render('delete',{data:[],message:""})
    else{
        res.redirect('/');
    }
})
app.post('/delete',(req,res)=>{
    Kitten.deleteOne({Roll:req.body.givenRoll},(err,result)=>{
        // console.log(result)
       
    })
    res.redirect('/delete')
})
app.post('/deleteData',(req,res)=>{
    if(req.body.givenRoll!==""&&req.body.givenName=="")
    {
    Kitten.find({Roll:req.body.givenRoll},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('delete',{data:result,message:temp})
    })
}
else if(req.body.givenRoll==""&&req.body.givenName!=="")
{
    Kitten.find({Name:req.body.givenName},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('delete',{data:result,message:temp})
    })
}
else if(req.body.givenRoll!==""&&req.body.givenName!=="")
{
    Kitten.find({Name:req.body.givenName,Roll:req.body.givenRoll},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('delete',{data:result,message:temp})
    })
}
else{
    Kitten.find({},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('delete',{data:result,message:temp})
    })
}
})
app.get('/update',(req,res)=>{
    if(isauthenticate==1)
    res.render('update', {data:[],message:""})
    else{
        res.redirect('/')
    }
})
app.post('/updateData',(req,res)=>{
    // console.log(req.body)
    Kitten.updateOne({Roll:req.body.givenRoll},{Name:req.body.givenName,Roll:req.body.givenRoll,Branch:req.body.givenBranch,User_ID:req.body.givenUser_ID,Programme:req.body.givenProgramme,Hall:req.body.givenHall,Room:req.body.givenRoom,Gender:req.body.givenGender,Blood_Group:req.body.givenBlood_Group,Location:req.body.givenLocation},(err,result)=>{
        console.log(result)
    
    })
    res.redirect('/update')
})
app.post('/updateSearch',(req,res)=>{
    if(req.body.givenRoll!==""&&req.body.givenName=="")
    {
       
    Kitten.find({Roll:req.body.givenRoll},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('update',{data:result,message:temp})
    })
}else if(req.body.givenRoll==""&&req.body.givenName!=="")
{
    Kitten.find({Name:req.body.givenName},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('update',{data:result,message:temp})
    })
}else if(req.body.givenRoll!==""&&req.body.givenName!=="")
{
    Kitten.find({Name:req.body.givenName,Roll:req.body.givenRoll},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('update',{data:result,message:temp})
    })
}
else{
 
     Kitten.find({},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('update',{data:result,message:temp})
    })
}
})
app.listen(PORT, () => {
    console.log("the server is running at port 80")
})