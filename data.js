    let urlPost = 'https://api.inrating.top/v1/users/posts/get',
    arrayOfUrls = [
                  'https://api.inrating.top/v1/users/posts/likers/all',
                  'https://api.inrating.top/v1/users/posts/commentators/all',
                  'https://api.inrating.top/v1/users/posts/mentions/all', 
                  'https://api.inrating.top/v1/users/posts/reposters/all',
                  'https://api.inrating.top/v1/users/posts/bookmarkers/all'
                  ];
       

      async function methodsAPI(url, params){
       try{
            let response = await fetch(url, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRiYTYzMGE0YzIxYWZlNzRhYTVlNTgwZjBiZjliMDQ1YThmYzY4NWViMjE0ZmFmZTY4ZDAzMGQzZjdiNThhMDg3M2M1MzU3MTNjNjIxNmE5In0.eyJhdWQiOiIyIiwianRpIjoiZGJhNjMwYTRjMjFhZmU3NGFhNWU1ODBmMGJmOWIwNDVhOGZjNjg1ZWIyMTRmYWZlNjhkMDMwZDNmN2I1OGEwODczYzUzNTcxM2M2MjE2YTkiLCJpYXQiOjE1Njg2MzI3MDEsIm5iZiI6MTU2ODYzMjcwMSwiZXhwIjoxNjAwMjU1MTAxLCJzdWIiOiIzMDQ2MTAiLCJzY29wZXMiOltdfQ.BB_dmBJDg-NO72-HSqudwt3Ql4kO7uyVjx4sMTpMURpJZfRpd1-7wUjfERWumhp1JcQzFwiRsihKTLN_rVeLNzspcXUHtp6OTRBEPowrzhQq3tB8-mQxTL-8KV2QPOaDmYufoowtCaxbTp7ciKs7Ybs4t9XYfGQoyBurWJsspOU_ikvWHlZViHZQjs82aAIblC-XyQh94sJz0_3mDHQPcGhlpBXp-RMi-hghGZsFS_ZhugSKvz5bKeR0bzDTui1baUoGnCFOWwSDn_tek1rSpAIdOe5WK1J2Opvjx7kjq7ycjbDy8ZNurWhEExa8rrFRRHlzN2AwiWkwAd6BmMHI_nVhgGbqUzDg88_393nX8T8Fdrek-IU1k461MzAycsRiKTj_vRXVyNie25v-wg3aQ9PciB-zQH1JbBM6wPmavwi-5zWD5Ab5m3FGijBviPCnN2Q-H9aBN3zPLYrYHG305Rmq6DHc_QoC_GYISk_BbbU3_DrvnUml2ey07B0bprVKJPZWYE9LHW5A3k4-yV3eAR5rf-JcQjCigONs0lkcA9uu91R-n3VxmtIyOIO76SLdkiZEebV8yvIC696zrxPMzNktoDUc-SP359MZDHIvmtL2uyy3s83n3LtgwgamZC4e6_-GmU89npACLD5hK7-lVXeVRGAKZuhTHKWuKbEqLJ8'
            },
            body: JSON.stringify(
               params
            )
               });
            let data = await response.json();

            return data;
          } 
         catch(error){
           throw new Error(error);
         }  
      }

   methodsAPI(urlPost, {'slug': 'LeBxOWT5zSemiSvkuqBLXFjXlaA0bJlX'})
      .then((data)=>{
            let id = data.id;

            let viewsCount = document.querySelector('.quantity_views');

               if(data['views_count'] === undefined){
                  viewsCount.innerHTML = '';
               }else{
                  viewsCount.innerHTML = data['views_count'];
               }

            let likesCount = document.querySelector('.quantity_likes'),
                personsWhoLikes = document.querySelector('.likes .persons');
                   
                   arrayOfUrls.map((elem, index)=>{
                     if(index == 0){
                        methodsAPI(elem, {'id': id}).then((response)=>{
                           if(response.data.length == 0){
                              likesCount.innerHTML = '0';
                             }
                           else{
                              if(response.data.length > 5){
                                 personsWhoLikes.style.overflow = 'scroll';
                                }
                              likesCount.innerHTML = response.data.length;
                                    createImages(response.data, personsWhoLikes);
                                  }
                               })      
                       }
                   });
                   return id;
            })
      .then((id)=>{
             
            let commentsCount = document.querySelector('.quantity_comments'),
                personsWhoComments = document.querySelector('.comments .persons');

                    arrayOfUrls.map((elem, index)=>{
                     if(index == 1){
                        methodsAPI(elem, {'id': id}).then((response)=>{
                        if(response.data.length == 0){
                           commentsCount.innerHTML = '0';
                           }
                        else{
                           if(response.data.length > 5){
                              personsWhoComments.style.overflow = 'scroll';
                              }
                           commentsCount.innerHTML = response.data.length;
                              createImages(response.data, personsWhoComments);
                           }
                        })  
                     }
                  });
               return id;  
            })
      .then((id)=>{

            let marksCount = document.querySelector('.quantity_marks'),
                personsWhoMentions = document.querySelector('.marks .persons');

             arrayOfUrls.map((elem, index)=>{
               if(index == 2){
                  methodsAPI(elem, {'id': id}).then((response)=>{
                     if(response.data.length == 0){
                        marksCount.innerHTML = '0';
                       }
                     else{
                        if(response.data.length > 5){
                           personsWhoMentions.style.overflow = 'scroll';
                          }
                          marksCount.innerHTML = response.data.length;
                              createImages(response.data, personsWhoMentions);
                            }
                         })
                  }
               });
               return id;

            })
      .then((id)=>{

             let repostsCount = document.querySelector('.quantity_repost'),
                 personsWhoReposts = document.querySelector('.marks .persons'); 
                 
             arrayOfUrls.map((elem, index)=>{
               if(index == 3){
                  methodsAPI(elem, {'id': id}).then((response)=>{
                     if(response.data.length == 0){
                        repostsCount.innerHTML = '0';
                     }
                     else{
                        if(response.data.length > 5){
                           personsWhoReposts.style.overflow = 'scroll';
                        }
                        repostsCount.innerHTML = response.data.length;
                              createImages(response.data, personsWhoReposts);
                           }
                        })
                 }
               });
               return id;
            })
      .then((id)=>{

             let bookMarksCount = document.querySelector('.quantity_bookmarks'),
                 personWhoBookmarks = document.querySelector('.bookmarks .persons');

             arrayOfUrls.map((elem, index)=>{
               if(index == 4){
                  methodsAPI(elem, {'id': id}).then((response)=>{
                     if(response.data.length == 0){
                        bookMarksCount.innerHTML = '0';
                     }
                     else{
                        if(response.data.length > 5){
                           personWhoBookmarks.style.overflow = 'scroll';
                        }
                        bookMarksCount.innerHTML = response.data.length;
                              createImages(response.data, personWhoBookmarks);
                           }
                        })
                 }
               });

            })
      .catch((error)=>{
         alert(error);
      });
            

        

      function createImages(arrayOfObjects, currentPlace){
         for(let elem of arrayOfObjects){
            let div = document.createElement('div');
                div.classList.add('for_photo');
            let img = new Image();
                img.src = `${elem['avatar_image']['url_small_origin']}`;
                div.append(img);
            let nickName = document.createElement('span');
                nickName.innerHTML = elem['nickname'];
                nickName.classList.add('nick');
                div.append(nickName);
                currentPlace.append(div);
             }
      }