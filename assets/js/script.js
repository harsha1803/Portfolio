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

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

    // Load and display all skills from skills.json
    fetchData("skills").then(showSkills);
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | M Harshavardhan";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            // $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["full stack development", "AI ML practices" , "web designing", "android development", "IOS development", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function imageExists(url, callback) {
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = url;
}

function getProjectImageSrc(repoName) {
    const exts = ['png', 'jpg', 'jpeg'];
    for (let ext of exts) {
        const url = `/assets/images/projects/${repoName}.${ext}`;
        console.log(url);
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
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    repos.forEach(repo => {
        const imageUrl = getProjectImageSrc(repo.name);
        projectHTML += `
        <div class="box tilt">
            <img class="project-img" src="${imageUrl}" alt="${repo.name}" />
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
        </div>`;
    });
    projectsContainer.innerHTML = projectHTML;
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
    }
}

function fetchGitHubProjects() {
    fetch('https://api.github.com/users/harsha1803/repos?sort=updated')
        .then(response => response.json())
        .then(data => {
            // Optionally filter out forked repos or customize further
            const filtered = data.filter(repo => !repo.fork);
            showGitHubProjects(filtered);
        });
}

// Replace old fetchData for projects
fetchGitHubProjects();

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->

// Silver lines animation at the top
(function() {
  const linesContainer = document.getElementById('silver-lines');
  if (!linesContainer) return;
  const numLines = 12;
  for (let i = 0; i < numLines; i++) {
    const line = document.createElement('div');
    line.className = 'line';
    line.style.left = `${Math.random() * 100}%`;
    line.style.width = `${1 + Math.random() * 2}px`;
    line.style.animationDuration = `${2 + Math.random() * 2}s`;
    line.style.animationDelay = `${Math.random() * 2}s`;
    linesContainer.appendChild(line);
  }
})();


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

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