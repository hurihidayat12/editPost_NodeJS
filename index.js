const express = require('express');

const app = express();
const PORT = 7000;

app.set('view engine', 'hbs');

app.use('/public', express.static(__dirname + '/public'));

app.use(express.urlencoded({extended : false}));

let isLogin = true;

let blogs = [ {
    title: "Database Teknologi data tek 2022",
    content: "freeCodeCamp adalah organisasi nirlaba yang terdiri dari platform web pembelajaran interaktif",
    author: "huri saguCOde",
    postAt: new Date(),
    }
]



function getfullTime(time) {
    let month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktobebr", "November", "Desember"];

    let date = time.getDate();
  
    let monthIndex = time.getMonth();
    
    let year = time.getFullYear();
   
    let hours = time.getHours();
  
    let minutes = time.getMinutes();
  
    return `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`
  }


// funtion memiliki2 parameter
app.get('/', function(request, response){
    response.render("index")
});

app.get('/blog', function(request, response){

    let dataBlogs = blogs.map(function(data) {
        return {
            ...data,
            isLogin: isLogin,
            
        }
    })

    response.render("blog", {isLogin : isLogin, blogs: dataBlogs})
     
});

app.get('/blog-detail/:id', function(request, response){
    // console.log(request.params);
    let blogId = request.params.id;

    response.render("blog-detail", {blog: {
        id: blogId,
        title: "Database Teknologi 2022",
        author: 'saguCode',
        content: 'freeCodeCamp adalah organisasi nirlaba yang terdiri dari platform web pembelajaran interaktif, forum komunitas online, ruang obrolan, publikasi online, dan organisasi lokal yang bermaksud membuat pengembangan web pembelajaran dapat diakses oleh siapa saja.'
    }});
});



app.get('/add-blog', function(request, response){
    response.render('add-blog');
});


//post blog
app.post('/blog', function(request, response){
    
     let data = request.body;
    //  console.log(data);
        // console.log(data.inputTitle);
        // console.log(data.inputContent);

    data = {
            title: data.inputTitle,
            content: data.inputContent,
            author: 'huri hidayat',
            postAt: getfullTime(new Date())
        }
            console.log(data); 
            blogs.push(data);
            console.log(data);

            response.redirect('/blog');
});

app.get('/update-blog/:index', function(request, response){

    let index = request.params.index;

    let editData = blogs[index]
    response.render('update-blog', {blog: editData, index: index})
   
});

//UPDATE BLOG
//post update blog
app.post('/update-blog/:index', function(request, response){

    let index = request.params.index
    blogs[index].title = request.body.editTitle
    blogs[index].content = request.body.editContent

    response.redirect('/blog');
      
});

//untuk delete blog
app.get('/delete-blog/:index', function(request, response){
    let index = request.params.index;
    blogs.splice(index, 1)

    console.log(index);
    response.redirect('/blog')
})

//contact
app.get('/contact', function(request, response){
    response.render("contact");
});

app.listen(PORT, function(){
    console.log(`server starting port ${PORT}`);
})