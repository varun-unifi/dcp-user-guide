(function () {
    let firstMenu = document.querySelectorAll("ul.open")[0];
    firstMenu.style.maxHeight = firstMenu.scrollHeight + "px";

    let menuItems = document.getElementsByClassName("menu-item"),
        subMenuItems = document.getElementsByClassName("sub-menu-item"),
        contentItems = document.querySelectorAll("[data-content]"),
        arrowIcons = document.querySelectorAll(".menu-item span .icon-arrow-right"),
        menuSubMenuLen = Math.max(menuItems.length, subMenuItems.length),
        debouncer;

    for (let i=0; i<menuSubMenuLen; i++) {
        if (i < menuItems.length) {
            menuItems[i].addEventListener("click", function (e) {
                if (!(this.classList.contains("is-open") || this.classList.contains("active"))) {
                    if (this.querySelectorAll(".icon-arrow-right")[0]) {
                        slideToggle(this.querySelectorAll(".icon-arrow-right")[0]);
                    }
                }
                showContent(this);
                e.stopPropagation();
            });
        }
        if (i < subMenuItems.length) {
            subMenuItems[i].addEventListener("click", function (e) {
                showContent(this);
                e.stopPropagation();
            });
        }
    }

    for (let i=0; i<arrowIcons.length; i++) {
        arrowIcons[i].addEventListener("click", function (e) {
            slideToggle(this);
            e.stopPropagation();
        });
    }

    window.addEventListener("resize", function (e) {
        clearTimeout(debouncer);
        debouncer = setTimeout(() => {
                        let openElements = document.querySelectorAll(".open");
                        for (let i=0; i<openElements.length; i++) {
                            openElements[i].style.maxHeight = openElements[i].scrollHeight +  "px";
                        }
                    }, 300);
        
    });

    function showContent(ele) {
        let contentFor = ele.getAttribute("data-for");

        if (!ele.classList.contains("active")) {
            for (let i=0; i<menuItems.length; i++) {
                menuItems[i].classList.remove("active");
            }

            for (let i=0; i<subMenuItems.length; i++) {
                subMenuItems[i].classList.remove("active");
            }

            if (ele.classList.contains("active")) {
                ele.classList.remove("active");
            }
            else {
                ele.classList.add("active");
            }

            for (let i=0; i<contentItems.length; i++) {
                contentItems[i].classList.add("dontshow");
            }

            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });

            document.querySelectorAll("[data-content='" + contentFor + "']")[0].classList.remove("dontshow");
        }

        makeBreadcrumb(ele);
        
    }

    function triggerMenuClick () {
        let breadcrumbItems = document.querySelectorAll("[data-for].link");

        for (let i=0; i<breadcrumbItems.length; i++) {
            breadcrumbItems[i].addEventListener("click", function (e) {
                let contentFor = breadcrumbItems[i].getAttribute("data-for"),
                    navItem = document.querySelectorAll("[data-for='" + contentFor + "']")[0];

                showContent(navItem);
                e.stopPropagation();
            });

            
        }

    }

    function makeBreadcrumb (ele) {
        let breadcrumb = [],
        breadcrumbHtml = "";

        breadcrumb.push(ele.getAttribute("data-for"));

        while(ele.parentNode) {
            if (ele.parentNode && ele.parentNode.classList.contains("is-open")) {
                breadcrumb.unshift(ele.parentNode.getAttribute("data-for"));
            }
            if(ele.parentNode.classList.contains("ug-left-container")) {
                break;
            }
            ele = ele.parentNode;
        }
        breadcrumb.unshift("Boomi Data Catalog & Prep");
        for (let i=0; i<breadcrumb.length; i++) {
            if (i===0) {
                breadcrumbHtml += `<a href="https://help.boomi.com/" class="link">${breadcrumb[i]}</a>`;
            }
            else {
                breadcrumbHtml += `<span class="${(i < breadcrumb.length - 1) && 'link'}" data-for="${breadcrumb[i]}">${breadcrumb[i]}</span>`;
            }
        }
        let breadcrumbContainer = document.getElementsByClassName("ug-breadcrumb")[0];
        breadcrumbContainer.innerHTML = breadcrumbHtml;
        triggerMenuClick();
    }

    function slideToggle (ele) {
        let parent = ele.closest(".menu-item"),
            immediateChild = parent.getElementsByTagName("ul")[0],
            immediateChildHeight = immediateChild.scrollHeight + "px",
            openElements = document.querySelectorAll(".open");

            if (immediateChild.classList.contains("open")) {
                immediateChild.classList.remove("open");
                immediateChild.style.maxHeight = 0;
            }
            else {
                immediateChild.classList.add("open");
                immediateChild.style.maxHeight = immediateChildHeight;
                for (let i=0; i<openElements.length; i++) {
                    openElements[i].style.maxHeight = openElements[i].scrollHeight + immediateChild.scrollHeight + "px";
                }
            }


            if (parent.classList.contains("is-open")) {
                parent.classList.remove("is-open");
            }
            else {
                parent.classList.add("is-open");
            }
    }
})();