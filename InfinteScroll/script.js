const API_KEY = 'knj8ylk4sIZlfgLnladr1LXc_xAot1TCKcIeHpqnfXs';
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let imagesLoaded = 0;
let totalImages = 0;

function imageLoaded() {
    imagesLoaded++;
}

function setAttributes(element, attribute) {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key]);
    }
}

function displayPhotos(photosArr) {
    photosArr.forEach( photo => {
        /* Create an <a> element in html */
        const anchor = document.createElement('a');
        // anchor.setAttribute('href', photo.links.html);
        // anchor.setAttribute('target','_blank');
        setAttributes(anchor, {
            href: photo.links.html,
            target: '_blank'
        });

        /* Create an <img> element for each photo */
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        /* Image should be checked if the loading successes before setting for its source */
        img.addEventListener('load',imageLoaded);

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        /* Put the <img> in <a>, then put <img> + <a> into image container  */
        anchor.appendChild(img);
        imageContainer.appendChild(anchor);
    });
}

/*show loading*/
function showLoadingSpinner() {
    //console.log('starting');
    loader.hidden = false;
    //imageContainer.hidden = true;
}

/*hidding loading*/
function removeLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        //imageContainer.hidden = false;
        //console.log('ended');
    }
}

/* Get photos from API */
async function getPhotos() {
    showLoadingSpinner();
    try {
        const res = await fetch(apiUrl);
        const photosArr = await res.json();
        //console.log(photosArr);
        totalImages = photosArr.length;
        displayPhotos(photosArr);
        removeLoadingSpinner();
        
    } catch(err) {
        //Catch error here
        console.log(err);
    }
}

// Check to see if scrolling near bottom of the page,then load more photos
window.addEventListener('scroll', () => {
    // console.log(window.innerHeight);//const: 480
    // console.log(window.scrollY);//max = 10339, min = 0
    // console.log(document.body.offsetHeight); //const: 10807
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && imagesLoaded == totalImages) {
        console.log('load more');
        imagesLoaded = 0;
        getPhotos();
    }
});

getPhotos();