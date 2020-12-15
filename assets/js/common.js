let headerIcon = document.querySelector(".header-navbars-icon");

headerIcon.addEventListener("click", function() {
  let navBars = document.querySelector(".header-navbar");
  if(navBars.style.display === "none" || navBars.style.display === "") {
    navBars.style.display = "block";
  } else {
    navBars.style.display = "none";
  }
})


function getQueryString() { 
  let reg = new RegExp("(^|&)" + '?' + "=([^&]*)(&|$)", "i"); 
  let query = window.location.search.substr(1).match(reg); 
  if (query != null) {
    return decodeURIComponent(query[2]);
  }
  return null; 
}

let $query = getQueryString();

$(document).ready(function(){
  let $tagsBtnList = document.querySelectorAll(".tags-list-button");
  for (let i = 0; i < $tagsBtnList.length; i++) {
    if($tagsBtnList[i].dataset.encode == $query) {
      $tagsBtnList[i].classList.add("tags-list-active");
      toggleTags(getQueryString())
    }
  }

  let $root = $(".result-archives");

  $(".tags-list-button").each(function(index, el) {
    $(this).click(function(event) {
      $(this).addClass('tags-list-active').siblings().removeClass('tags-list-active');
      $encode = $(this).attr("data-encode");
      toggleTags($encode)
    });
  });

  function toggleTags($data) {
    if ($data != "") {
      searchBtnTag($data);
    } else {
      $(".result-archives-item-link").removeClass('result-archives-item-link-active');
    }
  }

  function searchBtnTag($data) {
    $(".result-archives-item").removeAttr("data-mark", "hide");
    $(".result-archives-item").removeClass('result-archives-item-active');
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
});
