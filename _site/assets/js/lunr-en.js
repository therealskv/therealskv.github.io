var idx = lunr(function () {
  this.field('title')
  this.field('excerpt')
  this.field('categories')
  this.field('tags')
  this.ref('id')

  
  
    
    
  
    
    
      this.add({
          title: "Hello World!",
          excerpt: "Welcome\n\nHello World! this is my first Jekyll blog post.\n\nI hope you like it!\n",
          categories: [],
          tags: [],
          id: 0
      })
      
    
      this.add({
          title: "Embedding a Gist in a Post",
          excerpt: "Gist is useful for sharing snippets of code. To embed a gist in a Jekyll post use the below format:...",
          categories: [],
          tags: [],
          id: 1
      })
      
    
      this.add({
          title: "Enterprise Territory Management",
          excerpt: "\n",
          categories: [],
          tags: ["salesforce","sharing","territory"],
          id: 2
      })
      
    
  
});

console.log( jQuery.type(idx) );

var store = [
  
    
    
    
  
    
    
    
      
      {
        "title": "Hello World!",
        "url": "http://localhost:4000/2021/03/17/hello-world.html",
        "excerpt": "Welcome\n\nHello World! this is my first Jekyll blog post.\n\nI hope you like it!\n",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Embedding a Gist in a Post",
        "url": "http://localhost:4000/2021/06/07/embedding-gists.html",
        "excerpt": "Gist is useful for sharing snippets of code. To embed a gist in a Jekyll post use the below format:...",
        "teaser":
          
            null
          
      },
    
      
      {
        "title": "Enterprise Territory Management",
        "url": "http://localhost:4000/2021/06/13/enterprise-territory-management.html",
        "excerpt": "\n",
        "teaser":
          
            null
          
      }
    
  ]

$(document).ready(function() {
  $('input#search').on('keyup', function () {
    var resultdiv = $('#results');
    var query = $(this).val().toLowerCase().replace(":", "");
    var result =
      idx.query(function (q) {
        query.split(lunr.tokenizer.separator).forEach(function (term) {
          q.term(term, {  boost: 100 })
          if(query.lastIndexOf(" ") != query.length-1){
            q.term(term, {  usePipeline: false, wildcard: lunr.Query.wildcard.TRAILING, boost: 10 })
          }
          if (term != ""){
            q.term(term, {  usePipeline: false, editDistance: 1, boost: 1 })
          }
        })
      });
    resultdiv.empty();
    resultdiv.prepend('<p class="results__found">'+result.length+' Result(s) found</p>');
    for (var item in result) {
      var ref = result[item].ref;
      if(store[ref].teaser){
        var searchitem =
          '<div class="list__item">'+
            '<article class="archive__item" itemscope itemtype="http://schema.org/CreativeWork">'+
              '<h2 class="archive__item-title" itemprop="headline">'+
                '<a href="'+store[ref].url+'" rel="permalink">'+store[ref].title+'</a>'+
              '</h2>'+
              '<div class="archive__item-teaser">'+
                '<img src="'+store[ref].teaser+'" alt="">'+
              '</div>'+
              '<p class="archive__item-excerpt" itemprop="description">'+store[ref].excerpt+'</p>'+
            '</article>'+
          '</div>';
      }
      else{
    	  var searchitem =
          '<div class="list__item">'+
            '<article class="archive__item" itemscope itemtype="http://schema.org/CreativeWork">'+
              '<h2 class="archive__item-title" itemprop="headline">'+
                '<a href="'+store[ref].url+'" rel="permalink">'+store[ref].title+'</a>'+
              '</h2>'+
              '<p class="archive__item-excerpt" itemprop="description">'+store[ref].excerpt+'</p>'+
            '</article>'+
          '</div>';
      }
      resultdiv.append(searchitem);
    }
  });
});
