$(document).ready(function() {
    const $images = $('#carrousel img');
    const $boutonPrecedent = $('.precedent');
    const $boutonSuivant = $('.suivant');
    
    let indexActuel = 0;
    const nombreImages = $images.length;
    let intervalleDefilement;
    
    function initialiserCarrousel() {//init du carrousel
        $images.hide();
        $images.eq(indexActuel).show();
        verifierBoutons();
        demarrerDefilementAutomatique();
    }
    
    function afficherImage(index) {//fnct pr affich imgs
        $images.eq(indexActuel).fadeOut(300);
        indexActuel = (index + nombreImages) % nombreImages;
        $images.eq(indexActuel).fadeIn(300, function() {
            verifierBoutons();
        });
    }
    
    function verifierBoutons() {//fnct verif btns
        $boutonPrecedent.prop('disabled', indexActuel === 0);
        $boutonSuivant.prop('disabled', indexActuel === nombreImages - 1);
    }

    function demarrerDefilementAutomatique() {//fnc pr defilement
        intervalleDefilement = setInterval(function() {
            afficherImage(indexActuel + 1);
        }, 5000);
    }
    
    $boutonSuivant.click(function() {//nxt btn
        afficherImage(indexActuel + 1);
        reinitialiserDefilement();
    });
    
    $boutonPrecedent.click(function() {//prec btn
        afficherImage(indexActuel - 1);
        reinitialiserDefilement();
    });
    
    function reinitialiserDefilement() {//reinit defilement
        clearInterval(intervalleDefilement);
        demarrerDefilementAutomatique();
    }
    
    $('.conteneur-carrousel').hover(
        function() {
            clearInterval(intervalleDefilement);
        },
        function() {
            demarrerDefilementAutomatique();
        }
    );
    
    initialiserCarrousel();
});