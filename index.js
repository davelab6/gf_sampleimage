// var makerjs = require('makerjs');
// general functionss
var fonts
var fontlist 
var counter
var language_array=[]
var multi_string
var default_font_index
var default_font = 'Roboto'
var variants
var hasreg
var hasMedium
var hasLight

// extra functions
function exists(arr, search) {
    return arr.some(row => row.includes(search));
}
function hasClass( target, className ) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}



window.onload = function () {


$(".select_layout").click(function(e) {
    $('.select_layout').removeClass('active');
    $(this).addClass('active');
    $('.container').hide()
    $('#container_'+$(this).attr('id').split('_')[2]).show()
    console.log($('#container_'+$(this).attr('id').split('_')[2]))
    console.log('#container_'+$(this).attr('id').split('_')[2])
});

    var a_counter = 0
    getGoogleFonts('AIzaSyCxzLzCFosJX6B9rOiy3xBu0J2TAlRBzXg');
    fontlist = document.getElementsByClassName('fontlist')

// load font api
    function getGoogleFonts(apiKey){
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + apiKey, true);
        xhr.onloadend = function () {
            fonts = JSON.parse(xhr.responseText);
            objectarray(JSON.parse(xhr.responseText).items, fonts)
        };
        xhr.send();
    };


// set detault->roboto
    function init_font(){
        if(window.location.hash) {
            console.log(window.location.hash.split('#')[1])
            for (var i = fonts.items.length - 1; i >= 0; i--) {
                if(fonts.items[i].family == window.location.hash.split('#')[1].split('+').join(' ')){
                    select_font('<div id="index_'+i+'" class="fontlist">'+fonts.items[i].family+'</div>')  
                }
            }
        } else {
            select_font('<div id="index_779" class="fontlist">Roboto</div>')  
        }
    }


// load font dropdown list
    function objectarray(FontsInUseArray, fonts){
        init_font()  
        for (var i =  0; i < FontsInUseArray.length; i++) {
            var FontsInUseObject = document.createElement("div");
            FontsInUseObject.innerHTML += FontsInUseArray[i].family
            FontsInUseObject.setAttribute("id",'index_'+i)
            FontsInUseObject.setAttribute("class",'fontlist')
            document.getElementById("objectlist_wrapper").appendChild(FontsInUseObject);
            if(i == FontsInUseArray.length-1){
                $('.fontlist').click(function(){
                    select_font(this)
                })
            }
        }
    } 


// when user selects font step_1
    function select_font(selected){
            check_variant($(selected).attr('id').split('_')[1])
            $('#select_fonts').html(fonts.items[$(selected).attr('id').split('_')[1]].family)
            var defaultlink = 'https://fonts.google.com/specimen/'
            $('#googlefont').attr("href", defaultlink.concat(fonts.items[$(selected).attr('id').split('_')[1]].family.replace(/ /g, `+`)))
    }
// when user selects font step_2
    function check_variant(fontIndex){
        var family = fonts.items[fontIndex].family
        var category = fonts.items[fontIndex].category
        variants = fonts.items[fontIndex].variants

        var variant_array =[]
                hasLight = false
                hasMedium = false
                hasreg = false
        for (var i = variants.length - 1; i >= 0; i--) {
            if(variants[i] == '300'){
                hasLight = true
                variant_array.push('300')
            }else if(variants[i] == 'light'){
                hasLight = true
                variant_array.push('light')
            }else{
            }

            if(variants[i] == '400'){
                hasreg = true
                variant_array.push('400')
            }else if(variants[i] == 'regular'){
                hasreg = true
                variant_array.push('regular')
            }else{
            }
            
            if(variants[i] == '500'){
                hasMedium = true
                variant_array.push('500')
            }else if(variants[i] == 'medium'){
                hasMedium = true
                variant_array.push('medium')
            }else{
            }

            if(i == 0){
                variants = variant_array.join(',')
            }
        }
        var var_index
        var url
        change_font(url,family,category)
        // if singleapp
        sort_sketch(family,category)
        change_table(family,category)


        // if pattern
    }
// when user selects font step_4 -- change application font
    function change_font(url,family,category){
        window.location.hash = family.replace(/ /g, '+')
        var apiUrl = [];
        apiUrl.push(
            family.replace(/ /g, '+')
            +':'+variants + '&display=swap'
        );
        var joined = apiUrl.join('|')
        var url = 'https://fonts.googleapis.com/css?family=' + joined
        var fontlink = document.createElement('link'); 
        fontlink.href = url;
        fontlink.rel = "stylesheet"; 
        head = document.head || document.getElementsByTagName('head')[0],
        head.appendChild(fontlink);

        var SC = family.split(' ')[family.split(' ').length-1]
        var style = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(style);
        if(category === 'display' || category === 'handwriting' || SC === 'SC' || 
                exists(serif_subcat, family) ||
                exists(sansserif_subcat, family) ||
                exists(mono_subcat, family)
                    ) {
            $('.h1').css({'font-family':family})
            $('.h2').css({'font-family':family})
            $('.h3').css({'font-family':family})
            $('.h4').css({'font-family':family})
            $('.h5').css({'font-family':family})
            $('.h6').css({'font-family':family})
            $('.subtitle1').css({'font-family':default_font})
            $('.subtitle2').css({'font-family':default_font})
            $('.body1').css({'font-family':default_font})
            $('.body2').css({'font-family':default_font})
            $('.button').css({'font-family':default_font})
            $('.caption').css({'font-family':default_font})
            $('.overline').css({'font-family':default_font})
        }else{
            $('.h1').css({'font-family':family})
            $('.h2').css({'font-family':family})
            $('.h3').css({'font-family':family})
            $('.h4').css({'font-family':family})
            $('.h5').css({'font-family':family})
            $('.h6').css({'font-family':family})
            $('.subtitle1').css({'font-family':family})
            $('.subtitle2').css({'font-family':family})
            $('.body1').css({'font-family':family})
            $('.body2').css({'font-family':family})
            $('.button').css({'font-family':family})
            $('.caption').css({'font-family':family})
            $('.overline').css({'font-family':family})
        }
        setTimeout(function(){show_heading()},1000)
    }


// //////singleapp//////


// when user selects font step_3 -- change table font
    function change_table(family,category){
        $('td.x_3').html('Regular')
        $('td.x_2').html(family)
        var SC = family.split(' ')[family.split(' ').length-1]
        if(category === 'display' || category === 'handwriting' || SC === 'SC') {
            $('.y_7 .x_2').html(default_font)
            $('.y_8 .x_2').html(default_font)
            $('.y_9 .x_2').html(default_font)
            $('.y_10 .x_2').html(default_font)
            $('.y_11 .x_2').html(default_font)
            $('.y_12 .x_2').html(default_font)
            $('.y_13 .x_2').html(default_font)
            $('.y_8 .x_3').html('Medium')
            $('.y_11 .x_3').html('Medium')
        }else{
        }
        if(hasMedium){
            $('.y_6 .x_3').html('Medium')
            $('.y_8 .x_3').html('Medium')
            $('.y_11 .x_3').html('Medium')
        }
        if(hasLight){
            $('.y_1 .x_3').html('Light')
            $('.y_2 .x_3').html('Light')
        }
    }
// if table is too narrow(fond is superwide)remove 'heading'
    function show_heading(){
        console.log($('.y_1 .x_1').height())
        console.log($('.y_2 .x_1').outerHeight())
        if ($('.y_1 .x_1').height()/2>$('.y_2 .x_1').outerHeight()){
            $('.headline').hide()
        }else{
            $('.headline').show()
        }
    }



    function sort_sketch(family,category){
        $('.selected').removeClass('selected')
        $('.sketch').removeClass('selectable')
        $('.sketch').removeClass('selectable_sketch')
        $('.select_sketch').removeClass('selectable')
        $('.select_sketch').removeClass('selectable_select_sketch')
        if(category == 'handwriting'){
            for (var i = handwriting_subcat.length - 1; i >= 0; i--) {
                if(String(handwriting_subcat[i][0]) === String(family)){
                    console.log($('.sketch.display_'+handwriting_subcat[i][1]))
                    $('.sketch.display_'+handwriting_subcat[i][1]).addClass('selectable selectable_sketch')
                    $('.select_sketch.display_'+handwriting_subcat[i][1]).addClass('selectable selectable_select_sketch')
                }
            }
        }else if(category == 'display'){
            for (var i = display_subcat.length - 1; i >= 0; i--) {
                if(display_subcat[i][0] === family){
                    console.log($('.sketch.display_'+display_subcat[i][1]))
                    $('.sketch.display_'+display_subcat[i][1]).addClass('selectable selectable_sketch')
                    $('.select_sketch.display_'+display_subcat[i][1]).addClass('selectable selectable_select_sketch')
                }
            }
        }else if(category == 'serif'){
            if(exists(serif_subcat, family) || family.split(' ')[family.split(' ').length-1] === 'sc'){
                    $('.sketch.display_1').addClass('selectable selectable_sketch')
                    $('.select_sketch.display_1').addClass('selectable selectable_select_sketch')
            }else{
                $('.sketch.text').addClass('selectable selectable_sketch')
                $('.select_sketch.text').addClass('selectable selectable_select_sketch')
            }
        }else{
            if(exists(sansserif_subcat, family) || exists(mono_subcat,family) || family.split(' ')[family.split(' ').length-1] === 'sc'){
                    $('.sketch.display_1').addClass('selectable selectable_sketch')
                    $('.select_sketch.display_1').addClass('selectable selectable_select_sketch')
            }else{
                $('.sketch.text').addClass('selectable selectable_sketch')
                $('.select_sketch.text').addClass('selectable selectable_select_sketch')
                $('.sketch.utility').addClass('selectable selectable_sketch')
                $('.select_sketch.utility').addClass('selectable selectable_select_sketch')
            }
        }
        init_select_sketch()
    }

    function init_select_sketch(){
        if($('.selectable').length > 0){
            var selectable_sketch = document.getElementsByClassName('selectable_sketch')
            var selectable_select_sketch = document.getElementsByClassName('selectable_select_sketch')
            var random = Math.floor(Math.random() * selectable_sketch.length) 
            $('.selected').removeClass('selected')
            selectable_sketch[random].classList.add('selected');
            selectable_select_sketch[random].classList.add('selected');
        }else{
            setTimeout(function(){init_select_sketch()}, 500);
        }
    }

    select_sketch()
    function select_sketch(){
        $('#select_sketch_1').click(function(){
             $('.select_sketch').removeClass('selected')
             $(this).addClass('selected')
             $('.sketch').removeClass('selected')
             $('#sketch_1').addClass('selected')
        })
        $('#select_sketch_2').click(function(){
             $('.select_sketch').removeClass('selected')
             $(this).addClass('selected')
             $('.sketch').removeClass('selected')
             $('#sketch_2').addClass('selected')
        })
        $('#select_sketch_3').click(function(){
             $('.select_sketch').removeClass('selected')
             $(this).addClass('selected')
             $('.sketch').removeClass('selected')
             $('#sketch_3').addClass('selected')
        })
        $('#select_sketch_4').click(function(){
             $('.select_sketch').removeClass('selected')
             $(this).addClass('selected')
             $('.sketch').removeClass('selected')
             $('#sketch_4').addClass('selected')
        })
        $('#select_sketch_5').click(function(){
             $('.select_sketch').removeClass('selected')
             $(this).addClass('selected')
             $('.sketch').removeClass('selected')
             $('#sketch_5').addClass('selected')
        })
        $('#select_sketch_6').click(function(){
             $('.select_sketch').removeClass('selected')
             $(this).addClass('selected')
             $('.sketch').removeClass('selected')
             $('#sketch_6').addClass('selected')
        })
    }


fullload()
function fullload(){
    if($('#sketch_3').length > 0){
        grouping()
    }else{
        setTimeout(function(){fullload()}, 500);
    }
}
    function grouping(){
        $('#sketch_wrapper .h1').hover(function(){ 
            // $(this).addClass('hovered')
            $('.table .h1').parent().addClass('hovered') }, function(){ $('.hovered').removeClass('hovered') })
        $('#sketch_wrapper .h2').hover(function(){ 
            // $(this).addClass('hovered')
            $('.table .h2').parent().addClass('hovered') }, function(){ $('.hovered').removeClass('hovered') })
        $('#sketch_wrapper .h3').hover(function(){ 
            // $(this).addClass('hovered')
            $('.table .h3').parent().addClass('hovered') }, function(){ $('.hovered').removeClass('hovered') })
        $('#sketch_wrapper .h4').hover(function(){ 
            // $(this).addClass('hovered')
            $('.table .h4').parent().addClass('hovered') }, function(){ $('.hovered').removeClass('hovered') })
        $('#sketch_wrapper .h5').hover(function(){ 
            // $(this).addClass('hovered')
            $('.table .h5').parent().addClass('hovered') }, function(){ $('.hovered').removeClass('hovered') })
        $('#sketch_wrapper .h6').hover(function(){ 
            // $(this).addClass('hovered')
            $('.table .h6').parent().addClass('hovered') }, function(){ $('.hovered').removeClass('hovered') })

        $('#sketch_wrapper .subtitle1').hover(function(){ 
            // $(this).addClass('hovered')
            $('.table .subtitle1').parent().addClass('hovered') }, function(){ $('.hovered').removeClass('hovered') })
        $('#sketch_wrapper .subtitle2').hover(function(){ 
            // $(this).addClass('hovered')
            $('.table .subtitle2').parent().addClass('hovered') }, function(){ $('.hovered').removeClass('hovered') })

        $('#sketch_wrapper .body1').hover(function(){ 
            // $(this).addClass('hovered')
            $('.table .body1').parent().addClass('hovered') }, function(){ $('.hovered').removeClass('hovered') })
        $('#sketch_wrapper .body2').hover(function(){ 
            // $(this).addClass('hovered')
            $('.table .body2').parent().addClass('hovered') }, function(){ $('.hovered').removeClass('hovered') })
        $('#sketch_wrapper .button').hover(function(){ 
            // $(this).addClass('hovered')
            $('.table .button').parent().addClass('hovered') }, function(){ $('.hovered').removeClass('hovered') })
        $('#sketch_wrapper .caption').hover(function(){ 
            // $(this).addClass('hovered')
            $('.table .caption').parent().addClass('hovered') }, function(){ $('.hovered').removeClass('hovered') })
        $('#sketch_wrapper .overline').hover(function(){ 
            // $(this).addClass('hovered')
            $('.table .overline').parent().addClass('hovered') }, function(){ $('.hovered').removeClass('hovered') 
            })

        $('.table tr').hover(function(){ 
            var hoveredelement = $(this).find('.x_1').attr('class').split(' ')[1]
                // $(this).addClass('hovered')
                document.getElementById('sketch_wrapper').getElementsByClassName(hoveredelement)[0].classList.add("hovered");
            },function(){
                // $(this).removeClass('hovered') 
                $('.hovered').removeClass('hovered')
            })
        $('.table tr').click(function(){ 
            var hoveredelement = $(this).find('.x_1').attr('class').split(' ')[1]
            $('.selected').removeClass('selected')
            $('#select_sketch_'+document.getElementById('sketch_wrapper').getElementsByClassName(hoveredelement)[0].closest('.sketch').getAttribute('id').split('_')[1]).addClass('selected')
            $('.sketch').removeClass('selected')
            document.getElementById('sketch_wrapper').getElementsByClassName(hoveredelement)[0].closest('.sketch').classList.add('selected')
            document.getElementById('sketch_wrapper').getElementsByClassName(hoveredelement)[0].closest('.sketch').scrollTo(0,document.getElementById('sketch_wrapper').getElementsByClassName(hoveredelement)[0].offsetTop - 30)
        })
    }
};
    


