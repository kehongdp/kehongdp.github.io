let headerIcon = document.querySelector(".header-navbars-icon");

headerIcon.addEventListener("click", function() {
  let navBars = document.querySelector(".header-navbar");
  if(navBars.style.display === "none" || navBars.style.display === "") {
    navBars.style.display = "block";
  } else {
    navBars.style.display = "none";
  }
})

// 获取URL ？后的值
function getQueryString() { 
  let reg = new RegExp("(^|&)" + '?' + "=([^&]*)(&|$)", "i"); 
  let query = window.location.search.substr(1).match(reg); 
  if (query != null) {
    return decodeURIComponent(query[2]);
  }
  return null; 
}
let $query = getQueryString();

// 获取随机数
let chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
function getRandom() {
  let res = "";
  for(let i = 0; i < 6 ; i ++) {
    let x = Math.ceil(Math.random()*35);
    let y = Math.ceil(Math.random()*35);
    res += chars[x] + "-" + chars[y];
  }
  return res;
}

$(document).ready(function(){
  function searchBtnTag($data) {
    let item = $(".result-archives-item");

    for(let i = 0; i < item.length; i++) {
      let itemLink = item.eq(i).children(".result-archives-item-link");

      for(let j = 0; j < itemLink.length; j++) {
        let data = itemLink.eq(j).data("tags").split(",");
        itemLink.eq(j).addClass('result-archives-item-link-active');

        if(data.indexOf($data) != -1) {
          itemLink.eq(j).removeClass('result-archives-item-link-active');
          item.eq(i).attr("data-mark", "show");
        }
      }
    }

    for(let i = 0; i < item.length; i++) {
      let item = $(".result-archives-item");
      if (item.eq(i).attr("data-mark") != "show") {
        item.eq(i).addClass('result-archives-item-active');
      }
    }
  }

  function toggleTags($data) {
    $(".result-archives-item").removeAttr("data-mark", "hide");
    $(".result-archives-item").removeClass('result-archives-item-active');
    if ($data != "") {
      searchBtnTag($data);
    } else {
      $(".result-archives-item-link").removeClass('result-archives-item-link-active');
    }
  }

  // 根据URL Tags 切换列表
  let $tagsBtnList = document.querySelectorAll(".tags-list-button");
  for (let i = 0; i < $tagsBtnList.length; i++) {
    if($tagsBtnList[i].dataset.encode == $query) {
      $tagsBtnList[i].classList.add("tags-list-active");
      toggleTags(getQueryString())
    }
  }

  // 点击Tags 切换列表
  let $root = $(".result-archives");
  $(".tags-list-button").each(function(index, el) {
    $(this).click(function(event) {
      $(this).addClass('tags-list-active').siblings().removeClass('tags-list-active');
      $encode = $(this).attr("data-encode");
      toggleTags($encode)
    });
  });



  // 设置锚点
  let anchorList = $(".articles-left-content h2");
  if (anchorList.length != 0) {
    document.querySelector(".articles-right").style.display = "block";
    for(let i = 0; i < anchorList.length; i++) {
      let link = "<a href='#"+getRandom()+"' class='articles-right-anchor'>"+anchorList.eq(i).text()+"</a>";
      $(".articles-left-content h2").eq(i).attr({
        "id": getRandom(),
        "class": "articles-left-content-h2"
      });
      $(".articles-right-anchors").append(link);
    }
    
    // 锚点滚到某点
    let h2Item = document.querySelectorAll('.articles-left-content-h2');
    let anchorItem = document.querySelectorAll('.articles-right-anchor');
    for (let i = 0; i < anchorItem.length; i++) {
      anchorItem[i].onclick = function() {
        h2Item[i].scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'center'});
      };
    }

    // 目录跟随屏幕
    $(window).on('scroll', ()=>{
      let scrollTop = $(window).scrollTop();
      let marginLeft = $(".articles-container").css('marginLeft');

      if(scrollTop > 540){
        $(".articles-right").css({
          position: 'fixed',
          top: '50px',
          left: 720 + parseInt(marginLeft)+"px"
        });
      } else {
        $(".articles-right").css({
          position: 'unset',
          top: 'unset',
          left: 'unset'
        });
      }
    })
  } 
});
