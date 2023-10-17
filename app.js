const express=require("express");
const b=require("body-parser");
const request=require("request");
const https=require("https");


const app=express();
app.use(b.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");

});
app.post("/",function(req,res){
    const fn=req.body.fname;
    const ln=req.body.lname;
    const email = req.body.email;
   var data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fn,
                LNAME:ln
            }
        }
    ]
   };

const jsonData= JSON.stringify(data);

const url="https://us14.api.mailchimp.com/3.0/lists/7dc49648d4";

const options={
    proxy: "PROXY URL",
    method:"POST",
    auth:"div:601babcc68e0931b5d00e6a203e4ba90-us14"
}


const request= https.request(url,options,function(response){

if(response.statusCode !== 200){
    res.sendFile(__dirname+"/failure.html");
}else{
   
    res.sendFile(__dirname+"/success.html");
}

    response.on("data",function(data){
    console.log(JSON.parse(data));
})
})

request.write(jsonData);
request.end();


});

app.post("/failure",function(req,res){
res.redirect("/");
});

app.listen(process.env.PORT || 3000);
//601babcc68e0931b5d00e6a203e4ba90-us14
// 7dc49648d4.
//https://us14.api.mailchimp.com/3.0/ 