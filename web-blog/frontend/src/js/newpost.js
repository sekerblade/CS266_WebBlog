showPosts();
async function getPosts() {
  const response = await fetch("http://127.0.0.1:3000/postsandcomments");
  const posts = await response.json();
  // console.log(posts);
  return posts;
}

function like(pid) {
  console.log(pid);
  fetch("http://127.0.0.1:3000/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pid: pid }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your like has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
  // reload smoothly
  window.setTimeout(function () {
    window.location.reload();
  }, 1500);
}

function dislike(pid) {
  console.log(pid);
  fetch("http://127.0.0.1:3000/dislike", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pid: pid }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your dislike has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
  // reload smoothly
  window.setTimeout(function () {
    window.location.reload();
  }, 1500);
}

function post() {
  const post = document.getElementById("post").value;
  console.log(post);
  fetch("http://127.0.0.1:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post: post }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your post has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
  // reload smoothly
  window.setTimeout(function () {
    window.location.reload();
  }, 1500);
}

async function showPosts() {
  const data = await getPosts();
  // console.log(data);
  // group post and comment post id is same
  const posts = data.reduce((acc, cur) => {
    const post = acc.find((post) => post.pid === cur.pid);
    if (post) {
      post.comments.push(cur);
    } else {
      acc.push({
        postby: cur.postby,
        pid: cur.pid,
        title: cur.title,
        content: cur.content,
        like: cur.like,
        dislike: cur.dislike,
        comments: [cur],
      });
    }
    return acc;
  }, []);
  // console.log(posts);
  // show posts
  const postContainer = document.getElementById("cm");
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
            <div class="postby">
            Post By: ${post.postby}
            </div>
            <div class="row">
            <div class="like col-2">
            <img src='../../assets/up.jpg' onclick="like(${post.pid
      })" class="img-fluid ladl"> 
            <img src='../../assets/down.jpg' onclick="dislike(${post.pid
      })" class="img-fluid ladl">
            </div>  
            <div class="posts  col-10">
            <div class="post-title">
            <br/>${post.title}
            </div>
            <div class="post-content col-5">${post.content}</div>
            </div>
            <div class="post-comments">
            <div class="dislike row">
            <div class="col-2 flx">
            <span class="lk">
            ${post.like}
            </span>
            <span class="lk">
            ${post.dislike}
            </span>
            </div>
            </div>
            </div>
            </div>
            
            <br/><div class="post-comments-title">Comments</div>
                <div class="post-comments-list">
                ${post.comments.map((comment) => {
        console.log(comment);
        // console.log(post.pid);
        return comment.comments
          .map(
            (item) =>
              `
                    
                        <div class="post-comment">
                          <span class="cmby">
                          ${item.commentby}
                          </span>
                            <ul> 
                            <li class="post-comment-content">${item.commentuser}</li>
                            </ul>
                        </div>
                        <hr/>
                    
                    `
          )
          .join("");
      })}
                </div>
                
            </div>

            <div class="row ct">
            <i class='far fa-comment-dots newpost' style='font-size:24px' data-toggle="modal" data-target="#comment${i}"></i> 
            </div>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
              <div class="modal-dialog" role="document">
                <div class="modal-content" style="background-color:#ffc4c4;">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add new post</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                      <form onclick="post()">
                          <div class="form-group">
                          <input type="text" name="title" class="form-control" id="title" placeholder="post title">
                          </div>
                          <div class="form-group">
                          <input type="text" name="title" class="form-control" id="title" value=${localStorage.email} placeholder="post title">
                          </div> 
                          <div class="form-group">
                          <textarea class="form-control" name="content" id="content" rows="3" placeholder="Write something....."></textarea>
                          </div>
                          
                          <div class="bt">
                              <button type="button" class="btn btn-secondary"style="background-color:#d93b07;" data-dismiss="modal">Close</button>
                          <button type="submit" class="btn btn-primary lf" style="background-color:#9ade0b;">Save</button>
                          </div>
                         
                      </form>
                  </div>
                  <div class="modal-footer">
                    
                  </div>
                </div>
              </div>
            </div>
            
            
                    
        `;
    spaceElement = document.createElement("div");
    spaceElement.className = "space";

    commentElement = document.createElement("div");
    commentElement.innerHTML = `
        <div class="modal fade" id="comment${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
              <div class="modal-dialog" role="document">
                <div class="modal-content" style="background-color:#ffc4c4;">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                      <form action="http://127.0.0.1:3000/comments" method="POST">
                            <div class="form-group
                            ">
                            <input type="hidden" name="pid" class="form-control pids" id="pid" value="${post.pid}"/>
                            </div>
                            <div class="form-group
                            ">
                            <input type="hidden" name="commentby" class="form-control" id="commenyby" value="${localStorage.email}"/>
                            </div>
                          <div class="form-group">
                          <textarea class="form-control" name="comment" id="comment" rows="3" placeholder="Write something....."></textarea>
                          </div>
                          <div class="bt">
                              <button type="button" class="btn btn-secondary"style="background-color:#d93b07;" data-dismiss="modal">Close</button>
                          <button type="submit" class="btn btn-primary lf" style="background-color:#9ade0b;">Save</button>
                          </div>
                      </form>
                  </div>
                  <div class="modal-footer">
                  </div>
                </div>
              </div>
              
            </div>
        `;
    postContainer.appendChild(commentElement);
    postContainer.appendChild(postElement);
    postContainer.appendChild(spaceElement);
  }
}
