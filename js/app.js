document.addEventListener('DOMContentLoaded', function() {

    //menu rozwijalne
    var dropDownMenu = document.querySelector(".drop_down_menu");
    var droppable = document.querySelector(".droppable");

    dropDownMenu.hidden = true;

    function toggleMenu() {
        dropDownMenu.hidden = !dropDownMenu.hidden
    }

    droppable.addEventListener("mouseover", toggleMenu);

    droppable.addEventListener("mouseout", toggleMenu);


    //chowanie opisu zdjęć

    var photosBox = document.querySelectorAll(".photos__box");
    var descriptions = document.querySelectorAll(".photos__box .photos__description");

    photosBox.forEach(function(photo, index) {

        function toggleDescription() {
            descriptions[index].hidden = !descriptions[index].hidden;
        }

        photo.addEventListener("mouseover", toggleDescription);

        photo.addEventListener("mouseout", toggleDescription);
    });


    //slider

    var photosLi = document.querySelectorAll(".slider li");
    var prev = document.querySelector(".about .container div:first-child");
    var next = document.querySelector(".about .container > div:last-child");

    var counter = 0;

    photosLi[counter].classList.add("visible");

    next.addEventListener("click", function() {
        photosLi[counter].classList.remove("visible");

        counter++;

        if(counter > photosLi.length - 1)
            counter = 0;

        photosLi[counter].classList.add("visible");
    });

    prev.addEventListener("click", function() {
        photosLi[counter].classList.remove("visible");

        counter--;

        if(counter < 0)
            counter = photosLi.length - 1;

        photosLi[counter].classList.add("visible");
    });

});