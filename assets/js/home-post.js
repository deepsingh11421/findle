{
    console.log("jsfile");
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        console.log("This is ajax request");
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log("Success");
                    let newPost = newPostDom(data.data.post);
                    $('#list-post').prepend(newPost);
                },error: function(error){
                    console.log("Error in ajax request",error.responseText);
                }
            });
        });
    }
    console.log("DOM");
    let newPostDom = function(post){
        return $(`
            <div class="post" id="post-${post._id}">
                <div class="post-top">
                    ${post.content}
                </div>
                <div class="post-mid no-ans">
                    <div class="mid-text">
                        No answers yet.
                    </div>
                </div>
                <div class="post-bottom">
                    <div>
                        <a href=""><button class="post-button"><i class="fa fa-edit"></i> Answer</button></a>
                        <a href=""><button class="post-button"><i class="fas fa-users"></i> Follow</button></a>
                    </div>
                </div>
            </div>
        `);
    }

    createPost();
}