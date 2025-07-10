$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Jigar Sable";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "/assets/images/favhand.png");
        }
    });


function getProjectImageSrc(repoName) {
    const exts = ['png', 'jpg', 'jpeg'];
    for (let ext of exts) {
        const url = `/assets/images/projects/${repoName}.${ext}`;
        if (window.projectImageCache && window.projectImageCache[url]) {
            if (window.projectImageCache[url] === true) return url;
            continue;
        }
        const req = new XMLHttpRequest();
        req.open('HEAD', url, false);
        req.send();
        if (req.status !== 404) {
            window.projectImageCache = window.projectImageCache || {};
            window.projectImageCache[url] = true;
            return url;
        } else {
            window.projectImageCache = window.projectImageCache || {};
            window.projectImageCache[url] = false;
        }
    }
    return '/assets/images/projects/default.png';
}

function showGitHubProjects(repos) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";
    repos.forEach(repo => {
        const imageUrl = getProjectImageSrc(repo.name);
        projectsHTML += `
        <div class="grid-item">
        <div class="box tilt" style="width: 380px; margin: 1rem">
      <img draggable="false" src="${imageUrl}" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${repo.name}</h3>
        </div>
        <div class="desc">
          <p>${repo.description ? repo.description : "No description provided."}</p>
          <div class="btns">
            <a href="${repo.html_url}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            ${repo.homepage ? `<a href="${repo.homepage}" class="btn" target="_blank">Live <i class="fas fa-external-link-alt"></i></a>` : ""}
          </div>
        </div>
      </div>
    </div>
    </div>`
    });
    projectsContainer.innerHTML = projectsHTML;

    // Isotope filter products (if you want to keep filtering)
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        masonry: {
            columnWidth: 200
        }
    });

    // filter items on button click
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

    // VanillaTilt effect
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
    }
}

function fetchGitHubProjects() {
    fetch('https://api.github.com/users/harsha1803/repos?sort=updated')
        .then(response => response.json())
        .then(data => {
            const filtered = data.filter(repo => !repo.fork);
            showGitHubProjects(filtered);
        });
}

// Fetch and display GitHub projects on page load
fetchGitHubProjects();

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}