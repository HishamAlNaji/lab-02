'use strict'

var animals = [];

var keywordsArr = [];

// animal objects constructor

function Animal(img, title, description, keyword, horns) {
    this.image_url = img;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    animals.push(this);
}

// getting the data from json file 

$.get('data/page-1.json').then(data => {
    data.forEach(animal => {
        let newAnimal = new Animal(animal.image_url, animal.title, animal.description, animal.keyword, animal.horns)
        newAnimal.render();
        newAnimal.options();
    });

});

renderSelected();

// Render the photos for animals 

Animal.prototype.render = function() {
    let photoTemplate = $('#photo-template');
    photoTemplate = $('#photo-template').clone();
    photoTemplate.removeAttr('id');
    photoTemplate.attr('class', this.keyword);
    photoTemplate.find('h2').text(this.title);
    photoTemplate.find('img').attr('src', this.image_url);
    photoTemplate.find('p').text(this.description);
    $('main').append(photoTemplate);
    // console.log(this);
}

Animal.prototype.options = function() {
    if (keywordsArr.includes(this.keyword) === false) {
        $('select').append(`<option>${this.keyword}</option>`);
        keywordsArr.push(this.keyword);
    }
};

function renderSelected() {

    $('select').change(function() {
        $('section').hide();
        var value = $(this).val();
        console.log(value);
        $(`.${value}`).show();
    });
};